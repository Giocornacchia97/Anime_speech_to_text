import {
  Bell,
  BookOpenText,
  ChartBar,
  Gear,
  Headphones,
  House,
  Lifebuoy,
  List,
  PlusCircle,
  Receipt,
  SignOut,
  X,
} from "@phosphor-icons/react";
import { useState, type ReactNode } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const links = [
  { to: "/", label: "Dashboard", icon: House },
  { to: "/new", label: "Nuovo episodio", icon: PlusCircle },
  { to: "/library", label: "Libreria", icon: BookOpenText },
  { to: "/billing", label: "Costi API", icon: Receipt },
];

export function AppShell({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="app-shell">
      <aside className={`sidebar ${menuOpen ? "sidebar-open" : ""}`}>
        <div className="brand" onClick={() => navigate("/")} role="button" tabIndex={0}>
          <span className="brand-mark"><Headphones weight="bold" /></span>
          <span><strong>InuScribe</strong><small>Italian Learning Lab</small></span>
        </div>
        <nav className="sidebar-nav" aria-label="Navigazione principale">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} end={to === "/"} onClick={() => setMenuOpen(false)}>
              <Icon size={20} weight={location.pathname === to ? "fill" : "regular"} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-footer">
          <button className="sidebar-cta" onClick={() => navigate("/new")}><PlusCircle size={18} /> Avvia progetto</button>
          <button><Lifebuoy size={20} /> Supporto</button>
          <button><SignOut size={20} /> Esci</button>
        </div>
      </aside>
      {menuOpen && <button className="sidebar-backdrop" aria-label="Chiudi menu" onClick={() => setMenuOpen(false)} />}
      <div className="app-main">
        <header className="topbar">
          <button className="menu-button" onClick={() => setMenuOpen((value) => !value)} aria-label="Apri menu">
            {menuOpen ? <X /> : <List />}
          </button>
          <div className="topbar-context">
            <ChartBar size={18} />
            <span>Laboratorio di studio</span>
          </div>
          <div className="topbar-actions">
            <button aria-label="Notifiche"><Bell size={20} /></button>
            <button aria-label="Impostazioni"><Gear size={20} /></button>
            <span className="avatar">GC</span>
          </div>
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
}
