import React from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../../context/AuthContext';
import { 
  Zap, 
  Target, 
  Droplets, 
  Leaf, 
  Info,
  TrendingUp,
  Activity,
  Award,
  ChevronRight,
  ShieldCheck,
  Flame,
  Brain
} from 'lucide-react';
import { cn } from '../../lib/utils';

export default function AarogyaSubpage({ onNavigate }: { onNavigate: (id: string) => void }) {
  const { profile, aarogyaScore, recommendations } = useAuth();

  const metrics = [
    { label: 'PROTEIN ADEQUACY', val: 45, target: 80, unit: 'g', color: 'bg-indigo-500', icon: Target, grad: 'from-indigo-600 to-purple-600', desc: 'Critical for muscle repair and enzyme production.' },
    { label: 'FIBRE ADEQUACY', val: 12, target: 25, unit: 'g', color: 'bg-emerald-500', icon: Leaf, grad: 'from-emerald-500 to-teal-600', desc: 'Essential for gut microbiome health.' },
    { label: 'MICRONUTRIENTS', val: 70, target: 100, unit: '%', color: 'bg-yellow-500', icon: Zap, grad: 'from-yellow-400 to-orange-500', desc: 'Vitamin & mineral diversity based on your regional diet.' },
    { label: 'HYDRATION', val: 5, target: 8, unit: 'L', color: 'bg-blue-500', icon: Droplets, grad: 'from-blue-400 to-sky-600', desc: 'Optimal water intake for metabolic efficiency.' },
    { label: 'CALORIE BALANCE', val: 1450, target: 2100, unit: 'kcal', color: 'bg-red-500', icon: Flame, grad: 'from-red-500 to-rose-600', desc: 'Energy intake relative to your BMR and activity.' },
    { label: 'VARIETY SCORE', val: 6, target: 10, unit: '/10', color: 'bg-pink-500', icon: Brain, grad: 'from-pink-500 to-rose-400', desc: 'Diversity of food groups consumed today.' },
  ];

  return (
    <div className="space-y-12 max-w-6xl">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <h2 className="font-display text-5xl uppercase tracking-tighter text-[#0d0d14] dark:text-white">
            <span className="highlight-curvy text-4xl mr-2">Health</span> Intelligence
          </h2>
          <p className="text-[0.7rem] font-bold tracking-[0.3em] text-gray-400 uppercase">AI Powered Aarogya Analytics</p>
        </div>
        <div className="flex flex-wrap gap-4 w-full md:w-auto">
          <button className="flex-1 md:flex-none px-6 py-3 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl text-[0.6rem] font-black tracking-widest uppercase text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all text-center">Download Report</button>
          <button 
            onClick={() => onNavigate('swastha')}
            className="flex-1 md:flex-none px-6 py-3 bg-[#3a6e00] text-white rounded-2xl text-[0.6rem] font-black tracking-widest uppercase shadow-lg shadow-[#3a6e00]/20 hover:scale-105 transition-all text-center"
          >
            Consult Expert
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Large Score Card */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="col-span-1 lg:col-span-5 bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl rounded-[40px] p-8 lg:p-12 border border-white/20 dark:border-gray-700 shadow-2xl shadow-gray-200/20 dark:shadow-black/20 relative overflow-hidden flex flex-col items-center justify-center text-center"
        >
           <div className="relative w-64 h-64">
              <svg className="w-full h-full -rotate-90">
                <circle cx="128" cy="128" r="110" fill="transparent" stroke="#f8fafc" strokeWidth="16" />
                <motion.circle 
                   cx="128" cy="128" r="110" 
                   fill="transparent" 
                   stroke="url(#aarogyaGrad)" 
                   strokeWidth="16" 
                   strokeDasharray="690.8"
                   initial={{ strokeDashoffset: 690.8 }}
                   animate={{ strokeDashoffset: 690.8 * (1 - aarogyaScore / 100) }}
                   transition={{ duration: 2, ease: "circOut" }}
                   strokeLinecap="round"
                 />
                 <defs>
                   <linearGradient id="aarogyaGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                     <stop offset="0%" stopColor="#3a6e00" />
                     <stop offset="50%" stopColor="#a3e635" />
                     <stop offset="100%" stopColor="#3a6e00" />
                   </linearGradient>
                 </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.span 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-8xl font-display text-[#0d0d14] leading-none"
                >
                  {aarogyaScore}
                </motion.span>
                <div className="flex items-center gap-2 mt-[-5px]">
                  <Activity size={14} className="text-[#3a6e00]" />
                  <span className="text-[0.65rem] font-black tracking-[0.4em] text-gray-300 uppercase">Aarogya Score</span>
                </div>
              </div>
           </div>

           <div className="mt-12 space-y-4">
              <div className="px-6 py-2 bg-gradient-to-r from-[#3a6e00] to-[#a3e635] text-white rounded-full text-[0.7rem] font-black tracking-[0.2em] uppercase shadow-xl shadow-lime-200">GRADE: OPTIMAL (A+)</div>
              <p className="text-sm font-bold text-gray-400 max-w-[280px] leading-relaxed mx-auto italic">
                "{recommendations[0]}"
              </p>
           </div>
           
           <div className="absolute top-[-10%] left-[-10%] w-48 h-48 bg-[#a3e635]/5 rounded-full blur-3xl" />
           <div className="absolute bottom-[-10%] right-[-10%] w-48 h-48 bg-indigo-500/5 rounded-full blur-3xl" />
        </motion.div>

        {/* Insight Section */}
        <div className="col-span-1 lg:col-span-7 space-y-8">
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-[#1a1a1a] to-[#0d0d14] rounded-[40px] p-8 text-white relative overflow-hidden"
              >
                 <div className="relative z-10">
                    <ShieldCheck size={32} className="text-indigo-400 mb-6" />
                    <h4 className="text-xl font-bold mb-2">Immunity Shield</h4>
                    <p className="text-white/40 text-xs font-medium leading-relaxed uppercase tracking-widest">Based on your recent Vitamin C and Zinc intake through seasonal Amla and Guava.</p>
                    <div className="mt-8 flex items-center gap-2">
                       <span className="text-2xl font-display">88%</span>
                       <span className="text-[0.6rem] font-black tracking-widest text-white/30 uppercase">Protected</span>
                    </div>
                 </div>
                 <div className="absolute -right-8 -bottom-8 opacity-10">
                    <ShieldCheck size={160} />
                 </div>
              </motion.div>

              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white/40 backdrop-blur-xl rounded-[40px] p-8 border border-white/20 shadow-xl shadow-gray-200/20 flex flex-col justify-between"
              >
                 <div className="flex justify-between items-start">
                    <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600">
                       <TrendingUp size={24} />
                    </div>
                    <div className="text-right">
                       <p className="text-[0.6rem] font-black tracking-widest text-gray-300 uppercase">VITALITY</p>
                       <p className="text-2xl font-display text-emerald-500">+12%</p>
                    </div>
                 </div>
                 <div>
                    <h4 className="text-lg font-black tracking-tight text-gray-800">Metabolic Speed</h4>
                    <p className="text-[0.65rem] text-gray-400 font-bold leading-relaxed uppercase tracking-widest mt-1">Your energy levels are peaking during morning hours.</p>
                 </div>
              </motion.div>
           </div>

           <div className="bg-white/40 backdrop-blur-xl rounded-[40px] border border-white/20 shadow-xl shadow-gray-200/20 overflow-hidden">
              <div className="p-8 border-b border-gray-50 bg-gray-50/30 flex justify-between items-center">
                 <h3 className="text-[0.7rem] font-black tracking-[0.3em] uppercase text-gray-400">Nutrient Breakdown</h3>
                 <button className="text-indigo-600 text-[0.65rem] font-black tracking-widest uppercase">Deep Analysis</button>
              </div>
              <div className="p-8 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
                 {metrics.slice(0, 4).map((m, i) => (
                   <div key={i} className="space-y-4">
                      <div className="flex justify-between items-center">
                         <div className="flex items-center gap-3">
                            <div className={cn("w-8 h-8 rounded-xl flex items-center justify-center text-white shadow-sm", m.color)}>
                               <m.icon size={14} />
                            </div>
                            <span className="text-[0.6rem] font-black tracking-widest text-gray-500 uppercase">{m.label}</span>
                         </div>
                         <span className="text-xs font-black text-gray-800 uppercase tracking-tighter">{m.val}{m.unit} / {m.target}{m.unit}</span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                         <motion.div 
                           initial={{ width: 0 }}
                           animate={{ width: `${(m.val/m.target)*100}%` }}
                           transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                           className={cn("h-full bg-gradient-to-r shadow-lg", m.grad)} 
                         />
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>

      {/* Detailed Analysis Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
        {metrics.map((m, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.1 }}
            className="bg-white/40 backdrop-blur-xl rounded-[32px] p-8 border border-white/20 shadow-xl shadow-gray-200/20 group hover:border-indigo-500/20 transition-all cursor-pointer"
          >
             <div className="flex items-center justify-between mb-6">
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-white", m.color)}>
                   <m.icon size={28} />
                </div>
                <div className="text-right">
                   <p className="text-2xl font-display text-gray-800">{Math.round((m.val/m.target)*100)}%</p>
                   <p className="text-[0.55rem] font-black tracking-widest text-gray-300 uppercase">ADEQUACY</p>
                </div>
             </div>
             <h4 className="text-sm font-black text-gray-800 uppercase tracking-tighter mb-2">{m.label}</h4>
             <p className="text-[0.65rem] text-gray-400 font-bold leading-relaxed uppercase tracking-widest">{m.desc}</p>
             
             <div className="mt-8 pt-6 border-t border-gray-50 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-[0.6rem] font-black text-indigo-600 tracking-widest uppercase">View Recommendations</span>
                <ChevronRight size={16} className="text-indigo-600" />
             </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
