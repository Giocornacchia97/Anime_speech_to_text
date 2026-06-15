import { ArrowRight, BookOpenText, Brain, CheckCircle, Clock, Plus, Target } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import { PageHeader, ProgressBar } from "../components/Ui";
import { useAppStore } from "../store";

export function DashboardPage() {
  const { episodes } = useAppStore();
  const navigate = useNavigate();
  const completed = episodes.filter((episode) => episode.status === "completed");
  const active = episodes.find((episode) => episode.status === "processing") ?? completed.at(-1);
  const stats = {
    episodes: completed.length,
    kanji: completed.reduce((sum, episode) => sum + episode.newKanji, 0),
    vocabulary: completed.reduce((sum, episode) => sum + episode.vocabulary, 0),
    accuracy: completed.length ? Math.round(completed.reduce((sum, episode) => sum + episode.accuracy, 0) / completed.length) : 0,
  };

  return (
    <div className="page dashboard-page">
      <PageHeader
        eyebrow="Bentornato"
        title="Il tuo laboratorio linguistico"
        description="Riprendi lo studio, importa un episodio o controlla i progressi della tua collezione."
        actions={<button className="button button-primary" onClick={() => navigate("/new")}><Plus size={18} /> Nuovo episodio</button>}
      />

      <section className="dashboard-hero">
        <div className="dashboard-hero-copy">
          <span className="status-label"><Target size={17} /> Obiettivo della settimana</span>
          <h2>Porta a termine due sessioni N3</h2>
          <p>Hai completato una sessione su due. Il prossimo episodio è già pronto per essere studiato.</p>
          <div className="goal-progress"><ProgressBar value={50} /><strong>1 / 2 sessioni</strong></div>
          <button className="button button-secondary" onClick={() => navigate("/library")}>Apri la libreria <ArrowRight /></button>
        </div>
        <img src="/images/source-10.jpg" alt="Paesaggio giapponese per la sessione di studio" />
      </section>

      <section className="metrics-grid" aria-label="Riepilogo progressi">
        <article><CheckCircle size={22} /><span>Episodi completati</span><strong>{stats.episodes}</strong><small>pronti per il ripasso</small></article>
        <article><Brain size={22} /><span>Nuovi kanji</span><strong>{stats.kanji}</strong><small>estratti dalle trascrizioni</small></article>
        <article><BookOpenText size={22} /><span>Vocaboli</span><strong>{stats.vocabulary}</strong><small>nelle note didattiche</small></article>
        <article><Target size={22} /><span>Accuratezza media</span><strong>{stats.accuracy}%</strong><small>sulle sessioni completate</small></article>
      </section>

      <div className="dashboard-columns">
        <section className="panel recent-panel">
          <div className="panel-heading"><div><h2>Sessioni recenti</h2><p>Gli ultimi episodi su cui hai lavorato.</p></div><button className="text-button" onClick={() => navigate("/library")}>Vedi tutto</button></div>
          <div className="recent-list">
            {episodes.slice(0, 4).map((episode) => (
              <button key={episode.id} className="recent-row" onClick={() => navigate(episode.status === "completed" ? `/studio/${episode.id}` : "/library")}>
                <img src={episode.image} alt="" />
                <span className="recent-copy"><strong>{episode.title}</strong><small>{episode.series} · JLPT {episode.level}</small></span>
                <span className={`status-chip status-${episode.status}`}>{episode.status === "completed" ? "Pronto" : `${episode.progress}%`}</span>
                <ArrowRight />
              </button>
            ))}
          </div>
        </section>

        <aside className="panel focus-panel">
          <div className="panel-heading"><div><h2>In primo piano</h2><p>La prossima azione utile.</p></div><Clock size={22} /></div>
          {active ? (
            <>
              <img src={active.image} alt="" />
              <span className="episode-kicker">Episodio {String(active.number).padStart(2, "0")}</span>
              <h3>{active.title}</h3>
              <p>{active.status === "processing" ? "La trascrizione è in elaborazione e sarà presto pronta." : "Continua dalla tua ultima sessione di studio."}</p>
              {active.status === "processing" && <ProgressBar value={active.progress} />}
              <button className="button button-primary button-full" onClick={() => navigate(active.status === "completed" ? `/studio/${active.id}` : "/library")}>{active.status === "completed" ? "Riprendi studio" : "Controlla avanzamento"}</button>
            </>
          ) : <p>Nessun episodio disponibile.</p>}
        </aside>
      </div>
    </div>
  );
}
