import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Home as HomeIcon, 
  Activity, 
  Calendar, 
  ShoppingCart, 
  Award, 
  MessageSquare, 
  Settings,
  LogOut,
  Bell,
  Stethoscope,
  X,
  User as UserIcon,
  Search,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import HomeSubpage from './subpages/HomeSubpage';
import AarogyaSubpage from './subpages/AarogyaSubpage';
import MealPlanSubpage from './subpages/MealPlanSubpage';
import MandiSubpage from './subpages/MandiSubpage';
import RewardsSubpage from './subpages/RewardsSubpage';
import ChatSubpage from './subpages/ChatSubpage';
import PrescriptionSubpage from './subpages/PrescriptionSubpage';
import ProfileSubpage from './subpages/ProfileSubpage';
import RecommendationsSubpage from './subpages/RecommendationsSubpage';
import ThemeToggle from './ThemeToggle';
import Logo from './Logo';
import { cn } from '../lib/utils';
import * as THREE from 'three';

function Dashboard3DBackground() {
  const mountRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Organic Floating Bubbles
    const particlesCount = 20;
    const posArray = new Float32Array(particlesCount * 3);
    const bubbles: THREE.Mesh[] = [];

    for(let i=0; i<particlesCount; i++) {
      const geometry = new THREE.SphereGeometry(Math.random() * 2, 32, 32);
      const material = new THREE.MeshPhongMaterial({
        color: i % 2 === 0 ? '#a3e635' : '#8a2be2',
        transparent: true,
        opacity: 0.05,
        shininess: 100,
      });
      const bubble = new THREE.Mesh(geometry, material);
      
      bubble.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10
      );
      
      scene.add(bubble);
      bubbles.push(bubble);
    }

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    camera.position.z = 15;

    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      
      bubbles.forEach((b, i) => {
        b.position.y += Math.sin(Date.now() * 0.001 + i) * 0.005;
        b.position.x += Math.cos(Date.now() * 0.001 + i) * 0.005;
        b.rotation.x += 0.002;
      });

      renderer.render(scene, camera);
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      bubbles.forEach(b => {
        b.geometry.dispose();
        (b.material as THREE.Material).dispose();
      });
      renderer.dispose();
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="fixed inset-0 pointer-events-none z-0 opacity-40" />;
}
export default function Dashboard() {
  const { profile, logOut, aarogyaScore } = useAuth();
  const [activeTab, setActiveTab] = useState('home');
  const [dismissFastingBanner, setDismissFastingBanner] = useState(false);

  const isFastingTomorrow = profile?.is_fasting_enabled && profile?.upcoming_fasting_dates?.length > 0;

  const navItems = [
    { id: 'home', icon: HomeIcon, label: 'Home', color: 'bg-[#3a6e00]' },
    { id: 'aarogya', icon: Activity, label: 'Aarogya Score', color: 'bg-purple-500' },
    { id: 'mealplan', icon: Calendar, label: 'Meal Plan', color: 'bg-orange-500' },
    { id: 'recommendations', icon: Sparkles, label: 'Recommendations', color: 'bg-green-500' },
    { id: 'mandi', icon: ShoppingCart, label: 'Mandi Prices', color: 'bg-blue-500' },
    { id: 'prescription', icon: Stethoscope, label: 'Prescription', color: 'bg-red-500' },
    { id: 'rewards', icon: Award, label: 'Rewards', color: 'bg-yellow-500' },
    { id: 'swastha', icon: MessageSquare, label: 'Swastha AI', color: 'bg-indigo-500' },
    { id: 'profile', icon: UserIcon, label: 'Profile', color: 'bg-pink-500' },
  ];

  return (
    <div className="flex min-h-screen bg-[#f8faff] text-[#0d0d14] font-body overflow-hidden">
      <Dashboard3DBackground />
      {/* Sidebar */}
      <aside className="w-72 bg-white/80 backdrop-blur-xl border-r border-gray-100 hidden lg:flex flex-col fixed h-screen z-50">
        <div className="p-8">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <Logo size={40} />
          </motion.h1>
        </div>

        <nav className="flex-1 px-6 space-y-2 overflow-y-auto pb-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center justify-between px-4 py-4 text-sm font-bold transition-all rounded-2xl group relative overflow-hidden",
                activeTab === item.id 
                  ? "bg-white shadow-xl shadow-gray-200/50 text-[#0d0d14]" 
                  : "text-gray-400 hover:text-gray-600 hover:bg-gray-50/50"
              )}
            >
              <div className="flex items-center gap-4 relative z-10">
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                  activeTab === item.id ? `${item.color} text-white shadow-lg` : "bg-gray-100 text-gray-400 group-hover:bg-gray-200"
                )}>
                  <item.icon size={20} />
                </div>
                <span className="tracking-wide">{item.label}</span>
              </div>
              {activeTab === item.id && <ChevronRight size={16} className="text-gray-300 relative z-10" />}
              {activeTab === item.id && <motion.div layoutId="nav-glow" className="absolute left-0 w-1 h-6 bg-[#3a6e00] rounded-r-full" />}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-gray-50 space-y-2">
          <button 
            onClick={logOut}
            className="w-full flex items-center gap-4 px-4 py-4 text-sm font-bold text-red-500 hover:bg-red-50 transition-all rounded-2xl"
          >
            <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
              <LogOut size={20} />
            </div>
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 w-full bg-white/90 backdrop-blur-xl border-t border-gray-100 flex lg:hidden items-center justify-start overflow-x-auto px-4 py-3 z-50 safe-area-bottom pb-6 gap-6 hide-scrollbar">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "flex flex-col items-center gap-1 p-2 rounded-xl transition-all shrink-0 min-w-[70px]",
              activeTab === item.id ? `${item.color.replace('bg-', 'text-').replace('-500', '-600')} scale-110` : "text-gray-400"
            )}
          >
            <item.icon size={22} className={activeTab === item.id ? "drop-shadow-md" : ""} />
            <span className="text-[0.65rem] font-bold tracking-tight whitespace-nowrap">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Main Content */}
      <main className="w-full lg:ml-72 flex-1 relative pb-24 lg:pb-0">
        {/* Top Bar */}
        <header className="h-20 lg:h-24 bg-white/40 backdrop-blur-2xl border-b border-gray-100/50 px-4 lg:px-10 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-3 lg:gap-6">
             {/* Mobile Logo */}
             <div className="lg:hidden scale-75 origin-left">
               <Logo showText={false} />
             </div>
             <motion.div 
               whileHover={{ scale: 1.05 }}
               className="px-4 lg:px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-[0.6rem] lg:text-[0.7rem] font-black rounded-full tracking-widest uppercase shadow-xl shadow-indigo-200 cursor-pointer"
             >
               <span className="hidden sm:inline">AAROGYA: </span>{aarogyaScore || 0}%
             </motion.div>
             <div className="text-[0.6rem] lg:text-[0.7rem] font-bold tracking-[0.2em] text-gray-400 bg-white/50 px-3 lg:px-5 py-2 rounded-full border border-gray-100 flex items-center gap-1 lg:gap-2">
               <span className="text-sm lg:text-lg">🔥</span>
               <span className="hidden sm:inline">STREAK: </span><span className="text-orange-600 font-black">12D</span>
             </div>
          </div>

          <div className="flex items-center gap-4 lg:gap-8">
            <div className="flex items-center gap-3 lg:gap-4 pl-4 lg:pl-8 border-l border-gray-100">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-black leading-none uppercase tracking-tight">{profile?.name || 'User'}</p>
                <p className="text-[0.6rem] text-indigo-500 font-bold mt-1 uppercase tracking-widest">Premium Member</p>
              </div>
              <button onClick={() => setActiveTab('profile')} className="w-10 h-10 lg:w-12 lg:h-12 p-0.5 rounded-2xl bg-gradient-to-tr from-purple-500 to-pink-500 shadow-lg shadow-pink-200 hover:scale-105 transition-transform">
                <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center text-[#0d0d14] font-display text-xl lg:text-xl">
                  {profile?.name?.[0]?.toUpperCase() || 'U'}
                </div>
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-4 lg:p-10">
           <AnimatePresence mode="wait">
             <motion.div
               key={activeTab}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -20 }}
               transition={{ duration: 0.3 }}
             >
                {activeTab === 'home' && <HomeSubpage onNavigate={setActiveTab} />}
                {activeTab === 'aarogya' && <AarogyaSubpage onNavigate={setActiveTab} />}
                {activeTab === 'mealplan' && <MealPlanSubpage onNavigate={setActiveTab} />}
                {activeTab === 'recommendations' && <RecommendationsSubpage />}
                {activeTab === 'mandi' && <MandiSubpage onNavigate={setActiveTab} />}
                {activeTab === 'prescription' && <PrescriptionSubpage onNavigate={setActiveTab} />}
                {activeTab === 'rewards' && <RewardsSubpage onNavigate={setActiveTab} />}
                {activeTab === 'swastha' && <ChatSubpage onNavigate={setActiveTab} />}
                {activeTab === 'profile' && <ProfileSubpage onNavigate={setActiveTab} />}
             </motion.div>
           </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
