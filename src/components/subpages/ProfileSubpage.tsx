import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  User, 
  Target, 
  MapPin, 
  DollarSign, 
  Check, 
  Settings, 
  ShieldCheck, 
  Bell, 
  Lock,
  ChevronRight,
  Sparkles,
  Zap,
  Leaf
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';

export default function ProfileSubpage() {
  const { profile, refreshProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...profile });

  const handleSave = async () => {
    await refreshProfile(formData);
    setIsEditing(false);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20">
      {/* Profile Header Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-[#1a1a1a] to-[#0d0d14] rounded-[50px] p-12 text-white relative overflow-hidden shadow-2xl shadow-gray-400"
      >
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
          <div className="relative group">
             <div className="w-40 h-40 rounded-[40px] bg-gradient-to-tr from-[#3a6e00] to-[#a3e635] p-1 shadow-2xl shadow-[#3a6e00]/40">
                <div className="w-full h-full bg-[#1a1a1a] rounded-[38px] flex items-center justify-center text-7xl font-display text-white">
                   {profile?.name?.[0]?.toUpperCase()}
                </div>
             </div>
             <button className="absolute -bottom-2 -right-2 w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#0d0d14] shadow-xl hover:scale-110 transition-all">
                <Settings size={20} />
             </button>
          </div>
          
          <div className="text-center md:text-left space-y-4">
             <div className="space-y-1">
                <h2 className="text-5xl font-display uppercase tracking-tight">{profile?.name}</h2>
                <div className="flex items-center justify-center md:justify-start gap-4">
                   <div className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full border border-white/5">
                      <ShieldCheck size={12} className="text-[#a3e635]" />
                      <span className="text-[0.6rem] font-black tracking-widest uppercase">Verified Swasth User</span>
                   </div>
                   <div className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full border border-white/5">
                      <Sparkles size={12} className="text-indigo-400" />
                      <span className="text-[0.6rem] font-black tracking-widest uppercase">Premium</span>
                   </div>
                </div>
             </div>
             <p className="text-white/40 text-sm font-medium tracking-wide max-w-md">
                Active since April 2026 • Focused on <span className="text-white">{profile?.health_goal}</span> with a regional <span className="text-white">{profile?.cuisine_prefs?.[0]}</span> diet.
             </p>
          </div>

          <div className="ml-auto flex gap-4">
             <button 
               onClick={() => isEditing ? handleSave() : setIsEditing(true)}
               className={cn(
                 "px-10 py-5 rounded-[24px] text-[0.7rem] font-black tracking-[0.2em] uppercase transition-all shadow-xl",
                 isEditing ? "bg-white text-[#0d0d14]" : "bg-[#3a6e00] text-white shadow-[#3a6e00]/20"
               )}
             >
               {isEditing ? 'Save Changes' : 'Edit Identity'}
             </button>
          </div>
        </div>

        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-[#3a6e00]/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px]" />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Settings Grid */}
        <div className="col-span-1 lg:col-span-8 space-y-8">
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {[
                { label: 'CALORIE GOAL', val: profile?.daily_cal_target, icon: Zap, grad: 'from-orange-500 to-red-500' },
                { label: 'PROTEIN GOAL', val: `${profile?.daily_protein_g}G`, icon: Target, grad: 'from-indigo-600 to-purple-600' },
                { label: 'BUDGET', val: `₹${profile?.budget_per_day}`, icon: DollarSign, grad: 'from-emerald-500 to-teal-600' },
                { label: 'LOCATION', val: profile?.city, icon: MapPin, grad: 'from-blue-500 to-sky-600' },
              ].map((stat, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-[40px] p-8 border border-gray-100 shadow-xl shadow-gray-200/30 flex items-center justify-between"
                >
                   <div className="space-y-4">
                      <p className="text-[0.6rem] font-black text-gray-300 tracking-[0.3em] uppercase">{stat.label}</p>
                      <p className="text-4xl font-display text-[#0d0d14] leading-none">{stat.val}</p>
                   </div>
                   <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg", `bg-gradient-to-br ${stat.grad}`)}>
                      <stat.icon size={24} />
                   </div>
                </motion.div>
              ))}
           </div>

           <div className="bg-white rounded-[40px] p-10 border border-gray-100 shadow-xl shadow-gray-200/40">
              <div className="flex justify-between items-center mb-10">
                 <h3 className="text-[0.7rem] font-black tracking-[0.3em] uppercase text-gray-400">Dietary Roots</h3>
                 <button className="text-indigo-600 text-[0.65rem] font-black tracking-widest uppercase">Manage Preferences</button>
              </div>
              <div className="space-y-10">
                 <div>
                    <label className="text-[0.6rem] font-black text-gray-300 uppercase tracking-widest block mb-4">Cuisine Palette</label>
                    <div className="flex flex-wrap gap-3">
                       {profile?.cuisine_prefs?.map((c: string) => (
                         <span key={c} className="px-6 py-3 bg-gray-50 border border-gray-100 text-[#0d0d14] rounded-2xl text-[0.65rem] font-black uppercase tracking-widest">{c}</span>
                       ))}
                    </div>
                 </div>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                    <div>
                       <label className="text-[0.6rem] font-black text-gray-300 uppercase tracking-widest block mb-4">Lifestyle Type</label>
                       <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center gap-4">
                          <Leaf className="text-emerald-500" size={24} />
                          <span className="text-sm font-black text-emerald-700 uppercase tracking-tight">{profile?.diet_type || 'Satvik'}</span>
                       </div>
                    </div>
                    <div>
                       <label className="text-[0.6rem] font-black text-gray-300 uppercase tracking-widest block mb-4">Cooking Time</label>
                       <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center gap-4 text-gray-400">
                          <Target size={24} />
                          <span className="text-sm font-black text-gray-800 uppercase tracking-tight">{profile?.max_prep_time_min} Minutes</span>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Account Sidebar */}
        <div className="col-span-1 lg:col-span-4 space-y-8">
           <div className="bg-white rounded-[40px] p-8 border border-gray-100 shadow-xl shadow-gray-200/40 divide-y divide-gray-50">
              <div className="pb-6">
                 <h4 className="text-[0.7rem] font-black tracking-[0.3em] uppercase text-gray-400 mb-6">Security & Prefs</h4>
                 <div className="space-y-4">
                    <button className="w-full flex items-center justify-between p-4 bg-gray-50/50 rounded-2xl hover:bg-gray-50 transition-all">
                       <div className="flex items-center gap-4 text-gray-400"><Lock size={18} /><span className="text-xs font-bold text-gray-800 uppercase">Privacy Settings</span></div>
                       <ChevronRight size={16} className="text-gray-300" />
                    </button>
                    <button className="w-full flex items-center justify-between p-4 bg-gray-50/50 rounded-2xl hover:bg-gray-50 transition-all">
                       <div className="flex items-center gap-4 text-gray-400"><Bell size={18} /><span className="text-xs font-bold text-gray-800 uppercase">Notifications</span></div>
                       <ChevronRight size={16} className="text-gray-300" />
                    </button>
                 </div>
              </div>
              <div className="pt-6">
                 <h4 className="text-[0.7rem] font-black tracking-[0.3em] uppercase text-gray-400 mb-6">Expert Access</h4>
                 <div className="p-6 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl text-white space-y-6 shadow-xl shadow-indigo-100">
                    <p className="text-[0.65rem] font-bold leading-relaxed uppercase tracking-widest">Connect your SwasthBite data with your personal nutritionist.</p>
                    <button className="w-full py-4 bg-white text-indigo-700 rounded-2xl font-black text-[0.65rem] tracking-[0.2em] uppercase">Link Expert</button>
                 </div>
              </div>
           </div>
           
           <div className="bg-emerald-600 rounded-[40px] p-8 text-white relative overflow-hidden shadow-2xl shadow-emerald-100">
              <div className="relative z-10 space-y-4">
                 <h4 className="font-display text-3xl uppercase leading-none">Sustainability <br /> Impact</h4>
                 <p className="text-white/60 text-[0.6rem] font-bold uppercase tracking-widest">By choosing local Mandi produce, you saved 12kg of CO2 this month.</p>
                 <div className="pt-4 flex items-center gap-2">
                    <div className="px-3 py-1 bg-white/20 rounded-full text-[0.6rem] font-black uppercase">Level 4 Eco-Chef</div>
                 </div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
           </div>
        </div>
      </div>
    </div>
  );
}
