import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { initialEpisodes } from "./data";
import type { Episode } from "./types";

interface AppStoreValue {
  episodes: Episode[];
  apiKey: string;
  monthlyBudget: number;
  addEpisode: (episode: Episode) => void;
  updateEpisode: (id: string, update: Partial<Episode>) => void;
  setApiKey: (value: string) => void;
  setMonthlyBudget: (value: number) => void;
  resetDemo: () => void;
}

const StoreContext = createContext<AppStoreValue | null>(null);

function readValue<T>(key: string, fallback: T): T {
  try {
    const value = localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function AppStoreProvider({ children }: { children: ReactNode }) {
  const [episodes, setEpisodes] = useState<Episode[]>(() => readValue("inuscribe-episodes", initialEpisodes));
  const [apiKey, setApiKey] = useState(() => readValue("inuscribe-api-key", ""));
  const [monthlyBudget, setMonthlyBudget] = useState(() => readValue("inuscribe-budget", 120));

  useEffect(() => localStorage.setItem("inuscribe-episodes", JSON.stringify(episodes)), [episodes]);
  useEffect(() => localStorage.setItem("inuscribe-api-key", JSON.stringify(apiKey)), [apiKey]);
  useEffect(() => localStorage.setItem("inuscribe-budget", JSON.stringify(monthlyBudget)), [monthlyBudget]);

  const value = useMemo<AppStoreValue>(
    () => ({
      episodes,
      apiKey,
      monthlyBudget,
      addEpisode: (episode) => setEpisodes((current) => [episode, ...current]),
      updateEpisode: (id, update) =>
        setEpisodes((current) => current.map((episode) => (episode.id === id ? { ...episode, ...update } : episode))),
      setApiKey,
      setMonthlyBudget,
      resetDemo: () => {
        setEpisodes(initialEpisodes);
        setApiKey("");
        setMonthlyBudget(120);
      },
    }),
    [apiKey, episodes, monthlyBudget],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useAppStore() {
  const store = useContext(StoreContext);
  if (!store) throw new Error("useAppStore must be used inside AppStoreProvider");
  return store;
}
