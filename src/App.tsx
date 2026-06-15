import { Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "./components/AppShell";
import { AppStoreProvider } from "./store";
import { BillingPage } from "./pages/BillingPage";
import { DashboardPage } from "./pages/DashboardPage";
import { LibraryPage } from "./pages/LibraryPage";
import { NewEpisodePage } from "./pages/NewEpisodePage";
import { StudioPage } from "./pages/StudioPage";

export default function App() {
  return (
    <AppStoreProvider>
      <AppShell>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/new" element={<NewEpisodePage />} />
          <Route path="/studio/:episodeId" element={<StudioPage />} />
          <Route path="/billing" element={<BillingPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppShell>
    </AppStoreProvider>
  );
}
