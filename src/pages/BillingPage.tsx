import { Calculator, Check, Cloud, DownloadSimple, Gauge, Lightbulb, Microphone, SlidersHorizontal, Sparkle, Wallet } from "@phosphor-icons/react";
import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader, ProgressBar, Toast } from "../components/Ui";
import { useAppStore } from "../store";

const plans = [
  { id: "premium", name: "Premium", model: "Whisper + GPT-4o", speech: 0.006, llm: 0.004, icon: Gauge },
  { id: "balanced", name: "Bilanciato", model: "Whisper + GPT-4o mini", speech: 0.006, llm: 0.00035, icon: Sparkle },
  { id: "google", name: "Google", model: "Whisper + Gemini Flash", speech: 0.006, llm: 0.0002, icon: Cloud },
];

export function BillingPage() {
  const { monthlyBudget, setMonthlyBudget } = useAppStore();
  const navigate = useNavigate();
  const [minutes, setMinutes] = useState(24);
  const [episodes, setEpisodes] = useState(12);
  const [selected, setSelected] = useState("balanced");
  const [toast, setToast] = useState("");

  const calculations = useMemo(() => plans.map((plan) => {
    const perEpisode = minutes * plan.speech + minutes * plan.llm;
    return { ...plan, perEpisode, monthly: perEpisode * episodes };
  }), [episodes, minutes]);
  const active = calculations.find((plan) => plan.id === selected)!;
  const premium = calculations[0];
  const savings = premium.monthly ? Math.round((1 - active.monthly / premium.monthly) * 100) : 0;
  const budgetPercent = Math.min(100, Math.round((active.monthly / monthlyBudget) * 100));

  const exportReport = () => {
    const rows = ["Piano,Modello,Costo episodio,Costo mensile", ...calculations.map((plan) => `${plan.name},${plan.model},${plan.perEpisode.toFixed(3)},${plan.monthly.toFixed(2)}`)];
    const url = URL.createObjectURL(new Blob([rows.join("\n")], { type: "text/csv;charset=utf-8" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "inuscribe-stima-costi.csv";
    anchor.click();
    URL.revokeObjectURL(url);
    setToast("Report costi esportato in CSV.");
  };
  const closeToast = useCallback(() => setToast(""), []);

  return (
    <div className="page billing-page">
      <PageHeader
        eyebrow="Analisi finanziaria"
        title="Stima costi per episodio"
        description="Confronta tre configurazioni e adatta la previsione alla durata reale della tua stagione."
        actions={<button className="button button-secondary" onClick={exportReport}><DownloadSimple /> Esporta report</button>}
      />

      <section className="cost-config panel">
        <div className="config-title"><Calculator /><div><h2>Parametri simulazione</h2><p>I valori restano modificabili e vengono ricalcolati in tempo reale.</p></div></div>
        <label className="field"><span>Durata episodio</span><div className="number-input"><input type="number" min="1" max="180" value={minutes} onChange={(event) => setMinutes(Math.max(1, Number(event.target.value)))} /><small>minuti</small></div></label>
        <label className="field"><span>Episodi al mese</span><div className="number-input"><input type="number" min="1" max="500" value={episodes} onChange={(event) => setEpisodes(Math.max(1, Number(event.target.value)))} /><small>episodi</small></div></label>
        <label className="field"><span>Budget mensile</span><div className="number-input"><input type="number" min="1" value={monthlyBudget} onChange={(event) => setMonthlyBudget(Math.max(1, Number(event.target.value)))} /><small>USD</small></div></label>
      </section>

      <section className="plan-grid">
        {calculations.map(({ id, name, model, perEpisode, monthly, icon: Icon }) => (
          <button className={`plan-card ${selected === id ? "selected" : ""}`} key={id} onClick={() => setSelected(id)}>
            <span className="plan-icon"><Icon /></span>
            {selected === id && <span className="selected-mark"><Check weight="bold" /></span>}
            <h2>{name}</h2><p>{model}</p><strong>${perEpisode.toFixed(2)}</strong><small>per episodio</small><div><span>Stima mensile</span><b>${monthly.toFixed(2)}</b></div>
          </button>
        ))}
      </section>

      <div className="billing-columns">
        <section className="panel breakdown-panel">
          <div className="panel-heading"><div><h2>Breakdown del piano</h2><p>{active.model}</p></div><span className="currency-chip">USD</span></div>
          <div className="breakdown-list">
            <div><span><Microphone /> Trascrizione audio</span><strong>${(minutes * active.speech).toFixed(3)}</strong></div>
            <div><span><Sparkle /> Raffinamento LLM</span><strong>${(minutes * active.llm).toFixed(3)}</strong></div>
            <div className="breakdown-total"><span>Totale per episodio</span><strong>${active.perEpisode.toFixed(2)}</strong></div>
          </div>
          <div className="budget-block"><div><span><Wallet /> Uso budget previsto</span><strong>{budgetPercent}%</strong></div><ProgressBar value={budgetPercent} /><small>${active.monthly.toFixed(2)} su ${monthlyBudget.toFixed(2)} disponibili</small></div>
        </section>

        <aside className="savings-panel">
          <img src="/images/source-7.jpg" alt="Scrivania di studio con quaderno e computer" />
          <div className="savings-copy"><Lightbulb /><span><strong>{selected === "premium" ? "Massima qualità" : `${Math.max(0, savings)}% di risparmio`}</strong><small>{selected === "premium" ? "Configurazione orientata alla precisione." : "Rispetto alla configurazione Premium."}</small></span></div>
        </aside>
      </div>

      <section className="billing-footer"><div><SlidersHorizontal /><span><strong>Configurazione pronta</strong><small>Puoi salvare la chiave API nella schermata di importazione.</small></span></div><button className="button button-primary" onClick={() => navigate("/new")}>Configura API</button></section>
      {toast && <Toast message={toast} onClose={closeToast} />}
    </div>
  );
}
