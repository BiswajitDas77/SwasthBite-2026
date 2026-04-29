import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Coffee,
  Sun,
  Utensils,
  Moon,
  Clock,
  ChevronRight,
  Sparkles,
  Download,
  Calendar as CalendarIcon,
  ShoppingBag,
  Info,
  MessageCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../lib/utils';

const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

const MEAL_PLANS: Record<string, any[]> = {
  "MON": [
    { type: 'BREAKFAST', time: '08:30 AM', name: 'Poha with Sprouts', kcal: 320, prot: 12, cost: 25, icon: Coffee, color: 'text-yellow-500', bg: 'bg-yellow-50', fast: true },
    { type: 'LUNCH', time: '01:30 PM', name: 'Dal Tadka & 2 Missi Rotis', kcal: 540, prot: 22, cost: 45, icon: Sun, color: 'text-orange-500', bg: 'bg-orange-50', fast: false },
    { type: 'SNACK', time: '05:00 PM', name: 'Roasted Makhana', kcal: 120, prot: 4, cost: 15, icon: Utensils, color: 'text-emerald-500', bg: 'bg-emerald-50', fast: true },
    { type: 'DINNER', time: '08:30 PM', name: 'Lauki Kofta & 1 Roti', kcal: 380, prot: 14, cost: 35, icon: Moon, color: 'text-indigo-500', bg: 'bg-indigo-50', fast: true },
  ],
  "TUE": [
    { type: 'BREAKFAST', time: '08:30 AM', name: 'Idli Sambhar', kcal: 280, prot: 10, cost: 30, icon: Coffee, color: 'text-yellow-500', bg: 'bg-yellow-50', fast: false },
    { type: 'LUNCH', time: '01:30 PM', name: 'Baingan Bharta & Bajra Roti', kcal: 490, prot: 15, cost: 40, icon: Sun, color: 'text-orange-500', bg: 'bg-orange-50', fast: true },
    { type: 'SNACK', time: '05:00 PM', name: 'Buttermilk (Chaas)', kcal: 80, prot: 3, cost: 10, icon: Utensils, color: 'text-emerald-500', bg: 'bg-emerald-50', fast: true },
    { type: 'DINNER', time: '08:30 PM', name: 'Moong Dal Khichdi', kcal: 420, prot: 18, cost: 25, icon: Moon, color: 'text-indigo-500', bg: 'bg-indigo-50', fast: true },
  ],
  "WED": [
    { type: 'BREAKFAST', time: '08:30 AM', name: 'Besan Chilla', kcal: 310, prot: 14, cost: 20, icon: Coffee, color: 'text-yellow-500', bg: 'bg-yellow-50', fast: false },
    { type: 'LUNCH', time: '01:30 PM', name: 'Chole & 2 Multigrain Rotis', kcal: 580, prot: 24, cost: 50, icon: Sun, color: 'text-orange-500', bg: 'bg-orange-50', fast: false },
    { type: 'SNACK', time: '05:00 PM', name: 'Sprouts Salad', kcal: 150, prot: 12, cost: 20, icon: Utensils, color: 'text-emerald-500', bg: 'bg-emerald-50', fast: false },
    { type: 'DINNER', time: '08:30 PM', name: 'Paneer Bhurji & 1 Roti', kcal: 450, prot: 20, cost: 55, icon: Moon, color: 'text-indigo-500', bg: 'bg-indigo-50', fast: false },
  ],
  "THU": [
    { type: 'BREAKFAST', time: '08:30 AM', name: 'Dalia with Veggies', kcal: 290, prot: 11, cost: 25, icon: Coffee, color: 'text-yellow-500', bg: 'bg-yellow-50', fast: true },
    { type: 'LUNCH', time: '01:30 PM', name: 'Aloo Methi & 2 Rotis', kcal: 480, prot: 12, cost: 35, icon: Sun, color: 'text-orange-500', bg: 'bg-orange-50', fast: true },
    { type: 'SNACK', time: '05:00 PM', name: 'Apple with Peanut Butter', kcal: 180, prot: 5, cost: 30, icon: Utensils, color: 'text-emerald-500', bg: 'bg-emerald-50', fast: true },
    { type: 'DINNER', time: '08:30 PM', name: 'Rajma & Steamed Rice (Small)', kcal: 520, prot: 22, cost: 40, icon: Moon, color: 'text-indigo-500', bg: 'bg-indigo-50', fast: false },
  ],
  "FRI": [
    { type: 'BREAKFAST', time: '08:30 AM', name: 'Upma with Peanuts', kcal: 330, prot: 9, cost: 20, icon: Coffee, color: 'text-yellow-500', bg: 'bg-yellow-50', fast: false },
    { type: 'LUNCH', time: '01:30 PM', name: 'Palak Paneer & 2 Rotis', kcal: 560, prot: 25, cost: 60, icon: Sun, color: 'text-orange-500', bg: 'bg-orange-50', fast: false },
    { type: 'SNACK', time: '05:00 PM', name: 'Walnuts & Almonds', kcal: 200, prot: 6, cost: 40, icon: Utensils, color: 'text-emerald-500', bg: 'bg-emerald-50', fast: true },
    { type: 'DINNER', time: '08:30 PM', name: 'Tinda Ki Sabzi & 1 Roti', kcal: 310, prot: 10, cost: 20, icon: Moon, color: 'text-indigo-500', bg: 'bg-indigo-50', fast: true },
  ],
  "SAT": [
    { type: 'BREAKFAST', time: '09:30 AM', name: 'Paneer Paratha (Medium)', kcal: 420, prot: 18, cost: 45, icon: Coffee, color: 'text-yellow-500', bg: 'bg-yellow-50', fast: false },
    { type: 'LUNCH', time: '02:00 PM', name: 'Mixed Veg Handi & 2 Rotis', kcal: 450, prot: 16, cost: 50, icon: Sun, color: 'text-orange-500', bg: 'bg-orange-50', fast: true },
    { type: 'SNACK', time: '06:00 PM', name: 'Bhelpuri (Healthy Version)', kcal: 180, prot: 5, cost: 20, icon: Utensils, color: 'text-emerald-500', bg: 'bg-emerald-50', fast: false },
    { type: 'DINNER', time: '09:00 PM', name: 'Yellow Dal & Rice', kcal: 390, prot: 15, cost: 25, icon: Moon, color: 'text-indigo-500', bg: 'bg-indigo-50', fast: true },
  ],
  "SUN": [
    { type: 'BREAKFAST', time: '09:30 AM', name: 'Fruit Bowl with Seeds', kcal: 240, prot: 6, cost: 40, icon: Coffee, color: 'text-yellow-500', bg: 'bg-yellow-50', fast: true },
    { type: 'LUNCH', time: '02:00 PM', name: 'Veg Pulao & Raita', kcal: 480, prot: 14, cost: 35, icon: Sun, color: 'text-orange-500', bg: 'bg-orange-50', fast: true },
    { type: 'SNACK', time: '06:00 PM', name: 'Green Tea & Cookies', kcal: 150, prot: 2, cost: 15, icon: Utensils, color: 'text-emerald-500', bg: 'bg-emerald-50', fast: false },
    { type: 'DINNER', time: '09:00 PM', name: 'Sabudana Khichdi (Light)', kcal: 350, prot: 6, cost: 30, icon: Moon, color: 'text-indigo-500', bg: 'bg-indigo-50', fast: true },
  ],
};

export default function MealPlanSubpage() {
  const { profile } = useAuth();
  const [activeDay, setActiveDay] = useState("MON");
  const meals = MEAL_PLANS[activeDay] || [];

  const totalCals = meals.reduce((acc, m) => acc + m.kcal, 0);
  const totalProt = meals.reduce((acc, m) => acc + m.prot, 0);
  const totalCost = meals.reduce((acc, m) => acc + m.cost, 0);

  const handleExport = () => {
    // Simple mock export logic
    const printContent = `
      SWASTHBITE - 7 DAY VEDIC PLATE
      -----------------------------
      Exported for: ${profile?.name || 'User'}
      
      ${DAYS.map(day => `
      ${day}:
      ${MEAL_PLANS[day].map((m: any) => `- ${m.type}: ${m.name} (${m.kcal} kcal)`).join('\n')}
      `).join('\n')}
    `;

    // In a real app, we'd use a PDF library. Here we'll trigger print.
    window.print();
  };


  return (
    <>
      <div className="space-y-10 max-w-6xl pb-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <h2 className="font-display text-5xl uppercase tracking-tighter">Your Vedic Plate</h2>
            <p className="text-[0.65rem] font-black tracking-[0.3em] text-gray-400 uppercase">Personalized 7-Day Satvik Nutrition</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-100 rounded-2xl text-[0.6rem] font-black tracking-widest uppercase text-gray-500 hover:bg-gray-50 transition-all"
            >
              <Download size={14} /> Export PDF
            </button>
          </div>
        </div>

        {/* Day Selector */}
        <div className="bg-white/50 backdrop-blur-md p-2 rounded-[32px] border border-gray-100 flex overflow-x-auto hide-scrollbar gap-2 shadow-sm">
          {DAYS.map(day => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={cn(
                "flex-1 shrink-0 px-6 py-4 rounded-3xl text-[0.7rem] font-black tracking-widest transition-all",
                activeDay === day
                  ? "bg-[#0d0d14] text-white shadow-xl scale-105"
                  : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
              )}
            >
              {day}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="col-span-1 lg:col-span-8 space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDay}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {meals.map((meal, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.01, x: 5 }}
                    className="bg-white rounded-[32px] p-6 lg:p-8 border border-gray-100 shadow-xl shadow-gray-200/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 group cursor-pointer"
                  >
                    <div className="flex items-center gap-4 lg:gap-8 w-full md:w-auto">
                      <div className={cn("w-16 h-16 rounded-[24px] flex items-center justify-center relative overflow-hidden", meal.bg)}>
                        <meal.icon size={28} className={meal.color} />
                        <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="text-[0.6rem] font-black tracking-widest text-gray-300 uppercase">{meal.type} • {meal.time}</span>
                          {meal.fast && (
                            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-600 text-[0.5rem] font-black rounded-full uppercase tracking-tighter">Fasting OK</span>
                          )}
                        </div>
                        <h4 className="text-xl font-black tracking-tight text-[#0d0d14] mt-1">{meal.name}</h4>
                      </div>
                    </div>
                    <div className="flex items-center justify-between w-full md:w-auto gap-4 md:gap-12 mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-gray-100">
                      <div className="text-left md:text-right">
                        <p className="text-lg font-display text-gray-800">{meal.kcal} <span className="text-[0.6rem] font-black text-gray-400 tracking-widest ml-1">KCAL</span></p>
                        <p className="text-[0.6rem] font-black text-indigo-600 tracking-widest uppercase mt-1">₹{meal.cost} EST.</p>
                      </div>
                      <button className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-300 group-hover:text-indigo-600 group-hover:bg-indigo-50 transition-all">
                        <ChevronRight size={24} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="col-span-1 lg:col-span-4 space-y-8">
            <div className="bg-[#0d0d14] rounded-[40px] p-8 lg:p-10 text-white relative overflow-hidden shadow-2xl">
              <h3 className="text-[0.7rem] font-black tracking-[0.3em] uppercase text-white/40 mb-10">Day Breakdown</h3>
              <div className="space-y-8">
                <div className="space-y-2">
                  <div className="flex justify-between text-[0.6rem] font-black tracking-widest uppercase">
                    <span>Total Calories</span>
                    <span className="text-[#a3e635]">{totalCals} / 2100</span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${(totalCals / 2100) * 100}%` }} className="h-full bg-[#a3e635]" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-[0.6rem] font-black tracking-widest uppercase">
                    <span>Total Protein</span>
                    <span className="text-indigo-400">{totalProt}G / 80G</span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${(totalProt / 80) * 100}%` }} className="h-full bg-indigo-400" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-[0.6rem] font-black tracking-widest uppercase">
                    <span>Daily Budget</span>
                    <span className="text-yellow-400">₹{totalCost} / ₹300</span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${(totalCost / 300) * 100}%` }} className="h-full bg-yellow-400" />
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-10 border-t border-white/5 space-y-4">
                <div className="flex items-center gap-3">
                  <Sparkles size={18} className="text-indigo-400" />
                  <p className="text-[0.6rem] font-black tracking-widest uppercase text-white/50">AI OPTIMIZATION</p>
                </div>
                <p className="text-xs font-medium leading-relaxed italic text-white/80">
                  "Your protein intake for {activeDay} is within target. We added Missi Roti to your lunch to ensure slow-releasing energy for your afternoon work."
                </p>
              </div>

              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl" />
            </div>

            <div className="bg-white rounded-[40px] p-8 border border-gray-100 shadow-xl shadow-gray-200/50 space-y-6">
              <div className="flex items-center gap-3">
                <Info size={16} className="text-indigo-500" />
                <h4 className="text-[0.6rem] font-black tracking-widest uppercase text-gray-400">Nutrient Insights</h4>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-yellow-50 rounded-xl flex items-center justify-center text-yellow-600"><Coffee size={18} /></div>
                  <div>
                    <p className="text-xs font-black text-gray-800 uppercase tracking-tight">Focus Energy</p>
                    <p className="text-[0.55rem] text-gray-400 font-bold uppercase tracking-widest">Complex carbs for 08:30 AM</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600"><Moon size={18} /></div>
                  <div>
                    <p className="text-xs font-black text-gray-800 uppercase tracking-tight">Restorative Sleep</p>
                    <p className="text-[0.55rem] text-gray-400 font-bold uppercase tracking-widest">Light protein for 08:30 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* HIDDEN PRINTABLE REPORT */}
      <div className="report-print-container">
        <div className="text-center mb-10 pb-6 border-b-4 border-[#3a6e00]">
          <h1 className="text-5xl font-display uppercase tracking-tight text-[#3a6e00]">SwasthBite Health Report</h1>
          <p className="text-[0.7rem] font-black tracking-[0.4em] uppercase text-gray-400 mt-2">Personalized 7-Day Vedic Nutrition Plan</p>
        </div>

        <div className="grid grid-cols-2 gap-10 mb-10 p-6 bg-gray-50 rounded-3xl">
          <div>
            <p className="text-[0.6rem] font-black tracking-widest uppercase text-gray-400">Patient / User</p>
            <h2 className="text-2xl font-black">{profile?.name || 'Guest User'}</h2>
          </div>
          <div className="text-right">
            <p className="text-[0.6rem] font-black tracking-widest uppercase text-gray-400">Primary Goal</p>
            <h2 className="text-2xl font-black uppercase">{profile?.health_goal || 'General Health'}</h2>
          </div>
        </div>

        <div className="space-y-12">
          {DAYS.map(day => (
            <div key={day} className="print-card border border-gray-100">
              <h3 className="text-3xl font-display uppercase tracking-tight text-[#3a6e00] mb-6 border-b pb-2">{day} - MEAL SCHEDULE</h3>
              <div className="grid grid-cols-2 gap-6">
                {MEAL_PLANS[day].map((m: any, i: number) => (
                  <div key={i} className="p-4 bg-white border border-gray-50 rounded-2xl">
                    <p className="text-[0.5rem] font-black tracking-widest uppercase text-gray-300">{m.type} • {m.time}</p>
                    <h4 className="text-lg font-black mt-1">{m.name}</h4>
                    <div className="flex gap-4 mt-2">
                      <span className="text-[0.6rem] font-bold text-gray-500 uppercase">{m.kcal} KCAL</span>
                      <span className="text-[0.6rem] font-bold text-indigo-500 uppercase">{m.prot}G PROT</span>
                      {m.fast && <span className="text-[0.5rem] font-black text-emerald-600 bg-emerald-50 px-2 rounded-full">SATVIK</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 pt-10 border-t border-gray-100 text-center">
          <p className="text-[0.6rem] font-bold text-gray-300 uppercase tracking-[0.5em]">Digital Vedic Platform © 2026 • swasthbite.com</p>
        </div>
      </div>
    </>
  );
}
