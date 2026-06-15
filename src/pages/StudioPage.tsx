import { BookOpen, BookmarkSimple, CaretDown, CaretUp, DownloadSimple, FloppyDisk, Pause, Play, Rewind, SpeakerHigh, SpeakerSlash } from "@phosphor-icons/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PageHeader, Toast } from "../components/Ui";
import { useAppStore } from "../store";

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, "0");
  return `${minutes}:${Math.floor(seconds % 60).toString().padStart(2, "0")}`;
}

export function StudioPage() {
  const { episodeId } = useParams();
  const { episodes } = useAppStore();
  const navigate = useNavigate();
  const episode = episodes.find((item) => item.id === episodeId);
  const [currentTime, setCurrentTime] = useState(episode?.transcript[0]?.time ?? 0);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [notesOpen, setNotesOpen] = useState(true);
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (!playing || !episode) return;
    const timer = window.setInterval(() => setCurrentTime((value) => value >= episode.duration ? 0 : value + 1), 1000);
    return () => window.clearInterval(timer);
  }, [episode, playing]);

  const activeIndex = useMemo(() => {
    if (!episode) return 0;
    let index = -1;
    episode.transcript.forEach((line, lineIndex) => {
      if (line.time <= currentTime) index = lineIndex;
    });
    return Math.max(0, index);
  }, [currentTime, episode]);

  const exportSession = () => {
    if (!episode) return;
    const content = episode.transcript.map((line) => `${formatTime(line.time)}\n${line.japanese}\n${line.italian}\n${line.grammar}`).join("\n\n");
    const url = URL.createObjectURL(new Blob([`${episode.title}\n${episode.series}\n\n${content}`], { type: "text/plain;charset=utf-8" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${episode.id}-studio.txt`;
    anchor.click();
    URL.revokeObjectURL(url);
    setToast("Sessione esportata in formato testo.");
  };

  const closeToast = useCallback(() => setToast(""), []);

  if (!episode) {
    return <div className="page"><PageHeader title="Episodio non trovato" description="La sessione richiesta non è disponibile." actions={<button className="button button-primary" onClick={() => navigate("/library")}>Torna alla libreria</button>} /></div>;
  }

  const activeLine = episode.transcript[activeIndex];

  return (
    <div className="page studio-page">
      <PageHeader
        eyebrow={`Episodio ${String(episode.number).padStart(2, "0")} · JLPT ${episode.level}`}
        title={episode.title}
        description={`${episode.series}. Seleziona una frase per sincronizzare il player e leggere l'analisi.`}
        actions={<><button className="button button-secondary" onClick={exportSession}><DownloadSimple /> Esporta</button><button className="button button-primary" onClick={() => setToast("Sessione salvata nel browser.")}><FloppyDisk /> Salva sessione</button></>}
      />

      <div className="studio-grid">
        <aside className="media-column">
          <div className="video-frame"><img src={episode.image} alt={`Scena di ${episode.title}`} /><button className="video-play" onClick={() => setPlaying((value) => !value)} aria-label={playing ? "Pausa" : "Riproduci"}>{playing ? <Pause weight="fill" /> : <Play weight="fill" />}</button></div>
          <div className="waveform" aria-hidden="true">{Array.from({ length: 34 }, (_, index) => <span key={index} className={index / 34 < currentTime / episode.duration ? "played" : ""} style={{ height: `${18 + ((index * 17) % 43)}px` }} />)}</div>
          <input className="time-slider" type="range" min="0" max={episode.duration} value={currentTime} onChange={(event) => setCurrentTime(Number(event.target.value))} />
          <div className="player-row"><span>{formatTime(currentTime)}</span><div><button onClick={() => setCurrentTime((value) => Math.max(0, value - 10))}><Rewind /></button><button className="primary-player" onClick={() => setPlaying((value) => !value)}>{playing ? <Pause weight="fill" /> : <Play weight="fill" />}</button><button onClick={() => setMuted((value) => !value)}>{muted ? <SpeakerSlash /> : <SpeakerHigh />}</button></div><span>{formatTime(episode.duration)}</span></div>
          <div className="study-tip"><BookOpen /><div><strong>Suggerimento di studio</strong><p>Ascolta due volte senza leggere, poi confronta la frase originale con la parafrasi italiana.</p></div></div>
        </aside>

        <section className="transcript-panel">
          <div className="studio-section-title"><h2>Trascrizione originale</h2><span>{episode.transcript.length} segmenti</span></div>
          <div className="transcript-list">
            {episode.transcript.map((line, index) => (
              <button key={line.time} className={index === activeIndex ? "active" : ""} onClick={() => { setCurrentTime(line.time); setPlaying(false); }}>
                <time>{formatTime(line.time)}</time><span lang="ja">{line.japanese}</span>
              </button>
            ))}
          </div>
        </section>

        <aside className="analysis-panel">
          <div className="studio-section-title"><h2>Parafrasi didattica</h2><span>Livello {episode.level}</span></div>
          <div className="translation-card"><small>Traduzione semplice</small><p>{activeLine.italian}</p></div>
          <div className="analysis-copy"><small>Analisi grammaticale</small><p>{activeLine.grammar}</p></div>
          <div className="analysis-copy"><small>Struttura frase</small><p lang="ja">{activeLine.japanese}</p></div>
          <button className="bookmark-button" onClick={() => setToast("Frase aggiunta ai preferiti.")}><BookmarkSimple /> Salva questa frase</button>
        </aside>
      </div>

      <section className={`notes-panel ${notesOpen ? "notes-open" : ""}`}>
        <button className="notes-heading" onClick={() => setNotesOpen((value) => !value)}><span><BookOpen /> Note didattiche e vocabolario</span>{notesOpen ? <CaretUp /> : <CaretDown />}</button>
        {notesOpen && <div className="notes-grid"><article><h3>Vocabolario chiave</h3><dl><div><dt>Sussurro</dt><dd>囁き (sasayaki)</dd></div><div><dt>Favola</dt><dd>おとぎ話 (otogibanashi)</dd></div><div><dt>Tuttavia</dt><dd>しかし (shikashi)</dd></div></dl></article><article><h3>Punto grammaticale</h3><p><strong>ようだ</strong> segnala una percezione o un'apparenza basata su ciò che il parlante osserva.</p></article><article><h3>Contesto culturale</h3><p>Nel folklore giapponese il vento spesso anticipa la presenza di spiriti o un cambiamento invisibile.</p></article></div>}
      </section>
      {toast && <Toast message={toast} onClose={closeToast} />}
    </div>
  );
}
