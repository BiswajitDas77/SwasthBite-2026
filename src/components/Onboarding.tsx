import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { db } from '../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { ArrowRight, ArrowLeft, Check, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';
import CatWidget from './CatWidget';

const STEPS = [
  "PERSONAL INFO",
  "LOCATION",
  "HEALTH GOALS",
  "CONDITIONS",
  "DIET TYPE",
  "BUDGET"
];

const CUISINES = ["South Indian", "North Indian", "Bengali", "Gujarati", "Maharashtrian", "Punjabi", "Rajasthani", "Keralite"];
const GOALS = ["Stay healthy", "Lose weight", "Gain muscle", "Manage diabetes"];
const CONDITIONS = ["None", "Diabetes", "Hypertension", "Anaemia", "Thyroid"];
const DIETS = ["Pure Vegetarian", "Eggetarian", "Non-Vegetarian", "Jain", "Satvik"];

export default function Onboarding({ onComplete }: { onComplete: () => void }) {
  const { user, profile, refreshProfile } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: profile?.name || '', 
    age: profile?.age || 25, 
    sex: profile?.sex || 'Male', 
    weight_kg: profile?.weight_kg || 70, 
    height_cm: profile?.height_cm || 170, 
    state: profile?.state || '', 
    city: profile?.city || '', 
    cuisine_prefs: profile?.cuisine_prefs || [] as string[],
    health_goal: profile?.health_goal || 'Stay healthy',
    health_conditions: profile?.health_conditions || [] as string[],
    diet_type: profile?.diet_type || 'Pure Vegetarian',
    budget_per_day: profile?.budget_per_day || 300,
    max_prep_time_min: profile?.max_prep_time_min || 30,
  });

  const nextStep = () => {
    if (step === 1 && !formData.name) {
       alert("Please enter your name to continue!");
       return;
    }
    setStep(s => Math.min(s + 1, 6));
  };
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const handleFinish = async () => {
    // Calculate targets
    let bmr = 0;
    if (formData.sex === 'Male') {
      bmr = (10 * formData.weight_kg) + (6.25 * formData.height_cm) - (5 * formData.age) + 5;
    } else {
      bmr = (10 * formData.weight_kg) + (6.25 * formData.height_cm) - (5 * formData.age) - 161;
    }
    const calTarget = Math.round(bmr * 1.4); // Moderate activity
    
    const healthProfile = {
      ...formData,
      daily_cal_target: calTarget,
      daily_protein_g: Math.round(formData.weight_kg * (formData.health_goal === 'Gain muscle' ? 1.6 : 1.0)),
      daily_fibre_g: 25,
      aarogya_score: 82,
      updated_at: new Date().toISOString()
    };

    await refreshProfile(healthProfile);
    onComplete();
  };

  const toggleChip = (field: string, val: string) => {
    setFormData(prev => {
      const arr = (prev as any)[field] as string[];
      if (arr.includes(val)) {
        return { ...prev, [field]: arr.filter(x => x !== val) };
      } else {
        return { ...prev, [field]: [...arr, val] };
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#f0f4f8] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-xl bg-white rounded-[40px] shadow-2xl p-10 border border-white relative mt-16">
        
        {/* Cat sitting on the top edge of the card */}
        <div className="absolute -top-[52px] right-10">
           <CatWidget />
        </div>
        
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between text-[0.6rem] font-black tracking-widest text-gray-400 mb-3 uppercase">
            <span className="text-[#3a6e00]">STEP {step} OF 6</span>
            <span>{STEPS[step-1]}</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-[#3a6e00]" 
              initial={{ width: 0 }}
              animate={{ width: `${(step/6)*100}%` }}
            />
          </div>
        </div>



        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="min-h-[300px]"
          >
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="font-display text-4xl text-[#0d0d14] uppercase leading-none">Who are you?</h2>
                <div className="space-y-6">
                  <div>
                    <label className="text-[0.65rem] font-bold text-gray-400 block mb-2 uppercase tracking-widest">Full Name</label>
                    <input 
                      autoFocus
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-5 outline-none focus:ring-2 focus:ring-[#3a6e00]/20 text-lg font-bold"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      placeholder="e.g. Rahul Sharma"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[0.65rem] font-bold text-gray-400 block mb-2 uppercase tracking-widest">Age</label>
                      <input 
                        type="number"
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-5 outline-none font-bold"
                        value={formData.age}
                        onChange={e => setFormData({...formData, age: parseInt(e.target.value)})}
                      />
                    </div>
                    <div>
                      <label className="text-[0.65rem] font-bold text-gray-400 block mb-2 uppercase tracking-widest">Sex</label>
                      <div className="flex gap-2">
                        {["Male", "Female"].map(s => (
                          <button 
                            key={s}
                            onClick={() => setFormData({...formData, sex: s})}
                            className={cn("flex-1 p-5 rounded-2xl font-bold text-xs transition-all", formData.sex === s ? "bg-[#3a6e00] text-white shadow-lg" : "bg-gray-50 text-gray-400")}
                          >{s}</button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h2 className="font-display text-4xl text-[#0d0d14] uppercase leading-none">Your Roots</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input 
                      className="bg-gray-50 border border-gray-100 rounded-2xl p-5 outline-none font-bold"
                      value={formData.city}
                      onChange={e => setFormData({...formData, city: e.target.value})}
                      placeholder="City"
                    />
                    <input 
                      className="bg-gray-50 border border-gray-100 rounded-2xl p-5 outline-none font-bold"
                      value={formData.state}
                      onChange={e => setFormData({...formData, state: e.target.value})}
                      placeholder="State"
                    />
                  </div>
                  <label className="text-[0.65rem] font-bold text-gray-400 block mt-4 uppercase tracking-widest">Regional Cuisines</label>
                  <div className="flex flex-wrap gap-2">
                    {CUISINES.map(c => (
                      <button 
                        key={c}
                        onClick={() => toggleChip('cuisine_prefs', c)}
                        className={cn("px-4 py-2 rounded-full text-[0.65rem] font-bold uppercase transition-all", formData.cuisine_prefs.includes(c) ? "bg-[#3a6e00] text-white" : "bg-gray-50 text-gray-400 border border-gray-100")}
                      >{c}</button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h2 className="font-display text-4xl text-[#0d0d14] uppercase leading-none">Your Goal</h2>
                <div className="grid grid-cols-1 gap-3">
                  {GOALS.map(g => (
                    <button 
                      key={g}
                      onClick={() => setFormData({...formData, health_goal: g})}
                      className={cn("w-full p-6 rounded-2xl text-left flex justify-between items-center border-2 transition-all", formData.health_goal === g ? "border-[#3a6e00] bg-[#3a6e00]/5" : "border-gray-50 bg-gray-50")}
                    >
                      <span className="font-bold text-sm text-gray-800">{g}</span>
                      {formData.health_goal === g && <Check size={18} className="text-[#3a6e00]" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <h2 className="font-display text-4xl text-[#0d0d14] uppercase leading-none">Conditions</h2>
                <div className="flex flex-wrap gap-3">
                  {CONDITIONS.map(c => (
                    <button 
                      key={c}
                      onClick={() => toggleChip('health_conditions', c)}
                      className={cn("px-6 py-4 rounded-2xl font-bold text-sm transition-all", formData.health_conditions.includes(c) ? "bg-[#3a6e00] text-white shadow-lg" : "bg-gray-50 text-gray-400")}
                    >{c}</button>
                  ))}
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="space-y-6">
                <h2 className="font-display text-4xl text-[#0d0d14] uppercase leading-none">Diet Type</h2>
                <div className="grid grid-cols-2 gap-3">
                  {DIETS.map(d => (
                    <button 
                      key={d}
                      onClick={() => setFormData({...formData, diet_type: d})}
                      className={cn("p-5 rounded-2xl font-bold text-sm transition-all border-2", formData.diet_type === d ? "border-[#3a6e00] bg-[#3a6e00]/5 text-[#3a6e00]" : "border-gray-50 bg-gray-50 text-gray-400")}
                    >{d}</button>
                  ))}
                </div>
              </div>
            )}

            {step === 6 && (
              <div className="space-y-8">
                <h2 className="font-display text-4xl text-[#0d0d14] uppercase leading-none">Daily Budget</h2>
                <div className="bg-gray-50 p-8 rounded-3xl text-center border border-gray-100">
                   <p className="text-5xl font-display text-[#3a6e00]">₹{formData.budget_per_day}</p>
                   <p className="text-[0.6rem] font-bold text-gray-400 uppercase tracking-widest mt-2">Maximum daily food expense</p>
                   <input 
                    type="range" min="100" max="2000" step="50"
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#3a6e00] mt-8"
                    value={formData.budget_per_day}
                    onChange={e => setFormData({...formData, budget_per_day: parseInt(e.target.value)})}
                  />
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Footer Buttons */}
        <div className="mt-12 flex justify-between items-center">
          <button 
            onClick={prevStep}
            disabled={step === 1}
            className="flex items-center gap-2 text-[0.65rem] font-black tracking-widest text-gray-300 disabled:opacity-0 transition-all uppercase"
          >
            <ArrowLeft size={16} /> Back
          </button>
          
          {step < 6 ? (
            <button 
              onClick={nextStep}
              className="bg-[#3a6e00] text-white px-10 py-5 rounded-full font-bold text-[0.7rem] tracking-[0.2em] uppercase shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
            >
              Next <ArrowRight size={18} />
            </button>
          ) : (
            <button 
              onClick={handleFinish}
              className="bg-[#3a6e00] text-white px-12 py-5 rounded-full font-bold text-[0.7rem] tracking-[0.2em] uppercase shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
            >
              Build My Plan <Check size={18} />
            </button>
          )}
        </div>
      </div>
      
      <div className="mt-8 flex items-center gap-2 opacity-30">
         <Sparkles size={14} className="text-[#3a6e00]" />
         <span className="text-[0.6rem] font-bold tracking-[0.4em] uppercase text-gray-500">Curated Aarogya Experience</span>
      </div>
    </div>
  );
}
