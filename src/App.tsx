import { AuthProvider, useAuth } from "./context/AuthContext";
import LandingPage from "./components/LandingPage";
import Onboarding from "./components/Onboarding";
import Dashboard from "./components/Dashboard";

function AppContent() {
  const { user, profile, loading, refreshProfile } = useAuth();

    if (loading) {
      return (
        <div className="min-h-screen bg-[#f8faff] flex flex-col items-center justify-center space-y-6">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-tr from-[#3a6e00] to-[#a3e635] rounded-3xl animate-pulse shadow-2xl shadow-lime-200"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-full animate-ping"></div>
            </div>
          </div>
          <p className="text-[0.6rem] font-black tracking-[0.4em] text-gray-300 uppercase">Entering SwasthBite</p>
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
