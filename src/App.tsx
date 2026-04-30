import { AuthProvider, useAuth } from "./context/AuthContext";
import LandingPage from "./components/LandingPage";
import Onboarding from "./components/Onboarding";
import Dashboard from "./components/Dashboard";

import { Loader } from "./components/ui/Loader";

function AppContent() {
  const { user, profile, loading, refreshProfile } = useAuth();

    if (loading) {
      return (
        <div className="min-h-screen bg-[#f8faff] flex flex-col items-center justify-center space-y-12">
          <div className="rgb-border"></div>
          <Loader />
          <p className="text-[0.65rem] font-black tracking-[0.4em] text-gray-300 uppercase">Syncing Vedic Intelligence</p>
        </div>
      );
    }

  if (!user) {
    return <LandingPage />;
  }

  if (!profile) {
    return <Onboarding onComplete={() => refreshProfile()} />;
  }

  return <Dashboard />;
}

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen">
        <AppContent />
      </div>
    </AuthProvider>
  );
}
