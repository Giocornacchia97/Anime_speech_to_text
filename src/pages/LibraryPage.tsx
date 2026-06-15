import { ArrowRight, BookOpenText, CheckCircle, Funnel, Hourglass, MagnifyingGlass, Plus, X } from "@phosphor-icons/react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EmptyState, PageHeader, ProgressBar } from "../components/Ui";
import { useAppStore } from "../store";

export function LibraryPage() {
  const { episodes } = useAppStore();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState("all");
  const [character, setCharacter] = useState("all");
  const [status, setStatus] = useState("all");

  const characters = useMemo(() => Array.from(new Set(episodes.flatMap((episode) => episode.characters))).sort(), [episodes]);
  const filtered = useMemo(() => episodes.filter((episode) => {
    const haystack = `${episode.title} ${episode.series} ${episode.characters.join(" ")}`.toLowerCase();
    return haystack.includes(query.toLowerCase())
      && (level === "all" || episode.level === level)
      && (character === "all" || episode.characters.includes(character))
      && (status === "all" || episode.status === status);
  }), [character, episodes, level, query, status]);

  const completed = episodes.filter((episode) => episode.status === "completed");
  const clearFilters = () => { setQuery(""); setLevel("all"); setCharacter("all"); setStatus("all"); };

  return (
    <div className="page library-page">
      <PageHeader
        title="La tua libreria"
        description="Cerca, filtra e riprendi ogni episodio trasformato in materiale di studio."
        actions={<button className="button button-primary" onClick={() => navigate("/new")}><Plus /> Aggiungi episodio</button>}
      />

      <section className="filter-bar" aria-label="Filtri libreria">
        <label className="search-field"><MagnifyingGlass /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cerca episodi, serie o personaggi" />{query && <button onClick={() => setQuery("")} aria-label="Cancella ricerca"><X /></button>}</label>
        <label><span>Livello</span><select value={level} onChange={(event) => setLevel(event.target.value)}><option value="all">Tutti</option>{["N5", "N4", "N3", "N2", "N1"].map((item) => <option key={item}>{item}</option>)}</select></label>
        <label><span>Personaggio</span><select value={character} onChange={(event) => setCharacter(event.target.value)}><option value="all">Tutti</option>{characters.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label><span>Stato</span><select value={status} onChange={(event) => setStatus(event.target.value)}><option value="all">Tutti</option><option value="completed">Completati</option><option value="processing">In elaborazione</option></select></label>
        <span className="results-count"><Funnel /> {filtered.length} risultati</span>
      </section>

      {filtered.length ? (
        <section className="episode-grid">
          {filtered.map((episode) => (
            <article className="episode-card" key={episode.id}>
              <div className="episode-image-wrap">
                <img src={episode.image} alt={`Scena di ${episode.title}`} />
                <span className="level-badge">JLPT {episode.level}</span>
                <span className={`image-status status-${episode.status}`}>{episode.status === "completed" ? <CheckCircle weight="fill" /> : <Hourglass />}</span>
              </div>
              <div className="episode-card-body">
                <span className="episode-kicker">Episodio {String(episode.number).padStart(2, "0")} · {episode.series}</span>
                <h2>{episode.title}</h2>
                <p>Aggiornato {episode.updatedAt}</p>
                <div className="tag-row">{episode.characters.map((name) => <span key={name}>{name}</span>)}</div>
                {episode.status === "processing" ? (
                  <div className="processing-block"><div><span>Trascrizione in corso</span><strong>{episode.progress}%</strong></div><ProgressBar value={episode.progress} /></div>
                ) : (
                  <div className="episode-stats"><span>{episode.newKanji} kanji</span><span>{episode.vocabulary} vocaboli</span><span>{episode.accuracy}% accuratezza</span></div>
                )}
                <button className="card-action" disabled={episode.status === "processing"} onClick={() => navigate(`/studio/${episode.id}`)}>
                  {episode.status === "completed" ? "Apri lo studio" : "In elaborazione"}<ArrowRight />
                </button>
              </div>
            </article>
          ))}
          <button className="add-episode-card" onClick={() => navigate("/new")}><span><Plus /></span><strong>Aggiungi episodio</strong><small>Carica una nuova sorgente audio.</small></button>
        </section>
      ) : (
        <EmptyState icon={<BookOpenText />} title="Nessun episodio trovato" action={<button className="button button-secondary" onClick={clearFilters}>Azzera filtri</button>}>Prova una ricerca diversa o rimuovi uno dei filtri applicati.</EmptyState>
      )}

      <section className="summary-strip">
        <div><span>Episodi pronti</span><strong>{completed.length}</strong></div>
        <div><span>Kanji appresi</span><strong>{completed.reduce((sum, episode) => sum + episode.newKanji, 0)}</strong></div>
        <div><span>Vocaboli revisionati</span><strong>{completed.reduce((sum, episode) => sum + episode.vocabulary, 0)}</strong></div>
        <div><span>Accuratezza media</span><strong>{completed.length ? Math.round(completed.reduce((sum, episode) => sum + episode.accuracy, 0) / completed.length) : 0}%</strong></div>
      </section>
    </div>
  );
}
