import { Check, CloudArrowUp, Eye, EyeSlash, FileAudio, Key, LockKey, Sparkle, Translate, X } from "@phosphor-icons/react";
import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader, ProgressBar, Toast } from "../components/Ui";
import { initialEpisodes } from "../data";
import { useAppStore } from "../store";
import type { JlptLevel } from "../types";

const stages = ["Preparazione audio", "Trascrizione", "Analisi didattica", "Salvataggio"];

export function NewEpisodePage() {
  const { addEpisode, apiKey, setApiKey } = useAppStore();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [showKey, setShowKey] = useState(false);
  const [keyDraft, setKeyDraft] = useState(apiKey);
  const [sourceLanguage, setSourceLanguage] = useState("Giapponese");
  const [targetLanguage, setTargetLanguage] = useState("Italiano");
  const [level, setLevel] = useState<JlptLevel>("N3");
  const [dragging, setDragging] = useState(false);
  const [ingesting, setIngesting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(0);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");

  const fileSize = useMemo(() => file ? `${(file.size / 1024 / 1024).toFixed(1)} MB` : "", [file]);

  const acceptFile = (candidate?: File) => {
    if (!candidate) return;
    if (!candidate.type.startsWith("audio/") && !candidate.name.match(/\.(mp3|wav|aac|m4a)$/i)) {
      setError("Seleziona un file audio MP3, WAV, AAC o M4A.");
      return;
    }
    if (candidate.size > 500 * 1024 * 1024) {
      setError("Il file supera il limite di 500 MB.");
      return;
    }
    setError("");
    setFile(candidate);
  };

  const saveKey = () => {
    setApiKey(keyDraft.trim());
    setToast(keyDraft.trim() ? "Chiave salvata solo in questo browser." : "Chiave rimossa dal browser.");
  };

  const startIngestion = async () => {
    if (!file) {
      setError("Aggiungi un file audio prima di avviare l'elaborazione.");
      return;
    }
    setIngesting(true);
    setError("");
    for (let value = 8; value <= 100; value += 4) {
      await new Promise((resolve) => window.setTimeout(resolve, 85));
      setProgress(value);
      setStage(Math.min(3, Math.floor(value / 26)));
    }
    const id = `episode-${Date.now()}`;
    const cleanName = file.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ");
    addEpisode({
      id,
      number: initialEpisodes.length + Math.floor(Date.now() / 1000) % 90,
      title: cleanName.charAt(0).toUpperCase() + cleanName.slice(1),
      series: "Nuova importazione",
      level,
      characters: ["Da identificare"],
      image: "/images/source-5.jpg",
      status: "completed",
      progress: 100,
      duration: 24 * 60,
      updatedAt: "adesso",
      accuracy: 89,
      newKanji: 38,
      vocabulary: 104,
      transcript: initialEpisodes[3].transcript,
    });
    navigate(`/studio/${id}`);
  };

  return (
    <div className="page new-episode-page">
      <PageHeader title="Importa un nuovo episodio" description="Carica l'audio e configura il motore didattico. La demo elabora il file localmente e crea una sessione completa." />
      <div className="ingest-layout">
        <section
          className={`upload-zone ${dragging ? "upload-zone-active" : ""} ${file ? "upload-zone-filled" : ""}`}
          onDragOver={(event) => { event.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={(event) => { event.preventDefault(); setDragging(false); acceptFile(event.dataTransfer.files[0]); }}
        >
          <input ref={inputRef} type="file" accept="audio/*,.mp3,.wav,.aac,.m4a" hidden onChange={(event) => acceptFile(event.target.files?.[0])} />
          {file ? (
            <div className="selected-file">
              <span className="file-icon"><FileAudio /></span>
              <div><strong>{file.name}</strong><small>{fileSize} · pronto per l'elaborazione</small></div>
              <button onClick={() => setFile(null)} aria-label="Rimuovi file"><X /></button>
            </div>
          ) : (
            <>
              <span className="upload-icon"><CloudArrowUp /></span>
              <h2>Carica la sorgente audio</h2>
              <p>Trascina qui un file MP3, WAV, AAC o M4A. Dimensione massima 500 MB.</p>
              <button className="button button-primary" onClick={() => inputRef.current?.click()}>Seleziona file</button>
            </>
          )}
          {error && <p className="field-error">{error}</p>}
        </section>

        <aside className="config-column">
          <section className="panel config-panel">
            <div className="config-title"><Key /><h2>Credenziali motore</h2></div>
            <label className="field"><span>OpenAI API key (facoltativa)</span><div className="password-field"><input type={showKey ? "text" : "password"} value={keyDraft} onChange={(event) => setKeyDraft(event.target.value)} placeholder="sk-proj-..." /><button onClick={() => setShowKey((value) => !value)} aria-label="Mostra o nascondi chiave">{showKey ? <EyeSlash /> : <Eye />}</button></div></label>
            <button className="button button-secondary button-full" onClick={saveKey}>Salva nel browser</button>
            <p className="privacy-note"><LockKey /> La chiave non viene inviata da questa demo e resta nel localStorage del browser.</p>
          </section>

          <section className="panel config-panel">
            <div className="config-title"><Translate /><h2>Configurazione linguistica</h2></div>
            <label className="field"><span>Lingua sorgente</span><select value={sourceLanguage} onChange={(event) => setSourceLanguage(event.target.value)}><option>Giapponese</option><option>Inglese</option><option>Italiano</option></select></label>
            <label className="field"><span>Lingua di studio</span><select value={targetLanguage} onChange={(event) => setTargetLanguage(event.target.value)}><option>Italiano</option><option>Inglese</option><option>Spagnolo</option></select></label>
            <fieldset className="level-picker"><legend>Livello JLPT</legend>{(["N5", "N4", "N3", "N2", "N1"] as JlptLevel[]).map((item) => <button type="button" key={item} className={level === item ? "active" : ""} onClick={() => setLevel(item)}>{item}</button>)}</fieldset>
          </section>
        </aside>
      </div>

      <section className="ingest-footer">
        <div className="feature-notes"><span><Check /> Allineamento temporale</span><span><Sparkle /> Analisi grammaticale</span><span><LockKey /> File non caricato su server</span></div>
        {ingesting ? (
          <div className="ingestion-progress"><div><strong>{stages[stage]}</strong><span>{progress}%</span></div><ProgressBar value={progress} /><small>Stiamo preparando la sessione di studio.</small></div>
        ) : <button className="button button-primary button-large" onClick={startIngestion}><CloudArrowUp /> Avvia elaborazione</button>}
      </section>
      {toast && <Toast message={toast} onClose={() => setToast("")} />}
    </div>
  );
}
