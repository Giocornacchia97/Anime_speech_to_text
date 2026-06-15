import { CheckCircle, Info, WarningCircle, X } from "@phosphor-icons/react";
import { useEffect, type ReactNode } from "react";

export function PageHeader({ title, description, actions, eyebrow }: { title: string; description?: string; actions?: ReactNode; eyebrow?: string }) {
  return (
    <header className="page-header">
      <div>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
      {actions && <div className="page-actions">{actions}</div>}
    </header>
  );
}

export function ProgressBar({ value }: { value: number }) {
  return <div className="progress-track" aria-label={`Avanzamento ${value}%`}><span style={{ width: `${Math.min(100, Math.max(0, value))}%` }} /></div>;
}

export function EmptyState({ icon, title, children, action }: { icon: ReactNode; title: string; children: ReactNode; action?: ReactNode }) {
  return <div className="empty-state"><span>{icon}</span><h3>{title}</h3><p>{children}</p>{action}</div>;
}

export function Toast({ message, kind = "success", onClose }: { message: string; kind?: "success" | "info" | "error"; onClose: () => void }) {
  useEffect(() => {
    const timer = window.setTimeout(onClose, 3200);
    return () => window.clearTimeout(timer);
  }, [onClose]);
  const Icon = kind === "success" ? CheckCircle : kind === "error" ? WarningCircle : Info;
  return <div className={`toast toast-${kind}`} role="status"><Icon size={21} weight="fill" /><span>{message}</span><button onClick={onClose} aria-label="Chiudi"><X /></button></div>;
}
