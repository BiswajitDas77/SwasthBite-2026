import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Apple, Flame, Utensils, Clock, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function RecommendationsSubpage() {
  const { profile, stickyNotes, removeStickyNote } = useAuth();
  const [activeTab, setActiveTab] = useState<'diet' | 'workout'>('diet');
  const [workoutCategory, setWorkoutCategory] = useState<'yoga' | 'gym' | 'cardio'>('yoga');

  const workouts = {
    yoga: [
      { title: "20 Minute Beginner Yoga", duration: "20 min", calories: "120 kcal", embedId: "CM43AZaRXNw", exercises: ["Child's Pose", "Downward Dog", "Warrior I"] },
      { title: "Morning Yoga for Flexibility", duration: "15 min", calories: "90 kcal", embedId: "sTANio_2E0Q", exercises: ["Cat-Cow", "Cobra Pose", "Seated Forward Bend"] },
      { title: "Yoga For Full Body Stretch", duration: "30 min", calories: "180 kcal", embedId: "s-1vMbAgYWU", exercises: ["Sun Salutation", "Triangle Pose", "Pigeon Pose"] },
      { title: "Yoga For Lower Back Pain", duration: "25 min", calories: "150 kcal", embedId: "3t50Sr-FATo", exercises: ["Bridge Pose", "Sphinx Pose", "Thread the Needle"] },
      { title: "Gentle Evening Yoga", duration: "20 min", calories: "110 kcal", embedId: "glONapH5flo", exercises: ["Corpse Pose", "Happy Baby", "Spinal Twist"] },
      { title: "Yoga For Strength", duration: "40 min", calories: "250 kcal", embedId: "POcJjoDzJ9k", exercises: ["Plank", "Boat Pose", "Chair Pose"] },
      { title: "Power Vinyasa Flow", duration: "45 min", calories: "320 kcal", embedId: "qsqyZb_Sn8M", exercises: ["Chaturanga", "Upward Dog", "Warrior III"] },
      { title: "Yoga For Digestion", duration: "15 min", calories: "80 kcal", embedId: "b1H3xO3x_Js", exercises: ["Knees to Chest", "Seated Twist", "Garland Pose"] },
      { title: "Yoga For Anxiety", duration: "20 min", calories: "100 kcal", embedId: "UoHk0DHHGyQ", exercises: ["Legs Up the Wall", "Supported Bridge", "Easy Pose"] },
      { title: "Deep Core Yoga", duration: "30 min", calories: "200 kcal", embedId: "eP6habJpue8", exercises: ["Forearm Plank", "Side Plank", "Locust Pose"] }
    ],
    gym: [
      { title: "Full Body Dumbbell Workout", duration: "30 min", calories: "300 kcal", embedId: "l0gDqsSUtWo", exercises: ["Goblet Squats", "Dumbbell Rows", "Overhead Press"] },
      { title: "Upper Body Hypertrophy", duration: "45 min", calories: "400 kcal", embedId: "0zhvUV1bAVQ", exercises: ["Bench Press", "Lat Pulldown", "Bicep Curls"] },
      { title: "Lower Body Strength", duration: "40 min", calories: "350 kcal", embedId: "0A3EgOztptQ", exercises: ["Squats", "Deadlifts", "Lunges"] },
      { title: "Push Workout", duration: "50 min", calories: "420 kcal", embedId: "ToXQ2D3Ptq4", exercises: ["Incline Press", "Lateral Raises", "Tricep Pushdowns"] },
      { title: "Pull Workout", duration: "50 min", calories: "400 kcal", embedId: "U9pVNnMSUmI", exercises: ["Pull-ups", "Barbell Rows", "Face Pulls"] },
      { title: "Leg Day Intense", duration: "60 min", calories: "500 kcal", embedId: "EFqMkb4ACGg", exercises: ["Hack Squats", "Leg Press", "Calf Raises"] },
      { title: "Core & Abs Blast", duration: "15 min", calories: "120 kcal", embedId: "x-XVCNb449o", exercises: ["Crunches", "Leg Raises", "Russian Twists"] },
      { title: "Back & Biceps", duration: "45 min", calories: "380 kcal", embedId: "-igJpCtTLgU", exercises: ["Seated Cable Rows", "Hammer Curls", "Preacher Curls"] },
      { title: "Chest & Triceps", duration: "45 min", calories: "370 kcal", embedId: "3LpJxpvrclw", exercises: ["Chest Flyes", "Skull Crushers", "Dips"] },
      { title: "Shoulders Builder", duration: "40 min", calories: "300 kcal", embedId: "LYvKEi-I_fs", exercises: ["Arnold Press", "Front Raises", "Shrugs"] }
    ],
    cardio: [
      { title: "30 Minute Fat Burning HIIT", duration: "30 min", calories: "350 kcal", embedId: "cZyHgKtK75A", exercises: ["Jumping Jacks", "Burpees", "Mountain Climbers"] },
      { title: "Low Impact Cardio", duration: "25 min", calories: "200 kcal", embedId: "rosIwQajcaA", exercises: ["Step Jacks", "Skater Taps", "Standing Crunches"] },
      { title: "No Equipment Cardio", duration: "40 min", calories: "450 kcal", embedId: "s5BJ30AIErM", exercises: ["High Knees", "Jump Squats", "Skaters"] },
      { title: "Standing Cardio", duration: "20 min", calories: "180 kcal", embedId: "neC5uzi7UTM", exercises: ["Marching", "Side Steps", "Arm Circles"] },
      { title: "Cardio Kickboxing", duration: "35 min", calories: "380 kcal", embedId: "jNatVDcTBYQ", exercises: ["Jabs", "Hooks", "Front Kicks"] },
      { title: "Dance Cardio Workout", duration: "30 min", calories: "300 kcal", embedId: "mn7l3xIJdK4", exercises: ["Grapevine", "Mambo", "V-Step"] },
      { title: "Intense Tabata", duration: "20 min", calories: "250 kcal", embedId: "18QOLZT_CQg", exercises: ["Speed Skaters", "Tuck Jumps", "Fast Feet"] },
      { title: "Indoor Walking Workout", duration: "30 min", calories: "150 kcal", embedId: "nIiYquMguZM", exercises: ["Brisk Walk", "Knee Lifts", "Side Taps"] },
      { title: "Stair Stepper Workout", duration: "25 min", calories: "280 kcal", embedId: "-dOngL-hwB4", exercises: ["Step Ups", "Alternating Taps", "Speed Steps"] },
      { title: "Jump Rope Routine", duration: "15 min", calories: "220 kcal", embedId: "DCpar5QDo6E", exercises: ["Basic Bounce", "Alternate Foot", "High Knees"] }
    ]
  };

  const meals = [
    {
      time: "Breakfast",
      name: "Protein-Packed Poha & Sprouts",
      calories: "320 kcal",
      carbs: "45g",
      protein: "15g",
      fat: "8g",
      desc: "Light and highly nutritious start to your day. Sprouts add essential amino acids.",
      insight: "Sprouts give you strength for your morning without making you feel heavy.",
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      time: "Lunch",
      name: "Multigrain Roti with Palak Paneer",
      calories: "450 kcal",
      carbs: "50g",
      protein: "22g",
      fat: "16g",
      desc: "Spinach and paneer to give you a big protein boost at noon.",
      insight: "Lunch is the best time for a big meal to keep your energy high.",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      time: "Dinner",
      name: "Light Quinoa Khichdi",
      calories: "280 kcal",
      carbs: "40g",
      protein: "10g",
      fat: "5g",
      desc: "Easy to digest, perfect for a good night's sleep.",
      insight: "A light dinner helps your body rest and recover while you sleep.",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <div className="p-10 max-w-6xl mx-auto pb-32">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-black mb-2 dark:text-white transition-colors">Your Food Plan</h1>
          <p className="text-gray-500 dark:text-gray-400">Simple tips to help you eat better every day.</p>
        </div>
        
        {/* Toggle Switch */}
        <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-full flex shadow-inner transition-colors">
          <button
            onClick={() => setActiveTab('diet')}
            className={`px-8 py-3 rounded-full font-bold text-sm transition-all ${
              activeTab === 'diet' ? 'bg-white shadow-md text-[#3a6e00]' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700'
            }`}
          >
            Daily Food
          </button>
          <button
            onClick={() => setActiveTab('workout')}
            className={`px-8 py-3 rounded-full font-bold text-sm transition-all ${
              activeTab === 'workout' ? 'bg-white shadow-md text-red-600' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700'
            }`}
          >
            Easy Exercise
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'diet' && (
          <motion.div
            key="diet"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {/* 3D STICKY NOTES AREA */}
            {stickyNotes && stickyNotes.length > 0 && (
              <div className="flex flex-wrap gap-8 mb-16 px-4">
                {stickyNotes.map((note, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, rotate: -10 }}
                    animate={{ scale: 1, rotate: (i % 2 === 0 ? 3 : -3) }}
                    whileHover={{ scale: 1.05, rotate: 0, zIndex: 50 }}
                    className="relative w-64 h-64 p-8 bg-gradient-to-br from-yellow-100 to-yellow-200 shadow-xl border-t border-white/40 flex flex-col justify-between group transition-all cursor-default"
                    style={{ 
                      boxShadow: '10px 10px 25px rgba(0,0,0,0.1)',
                      transformStyle: 'preserve-3d'
                    }}
                  >
                    {/* Tape Effect */}
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 bg-white/30 backdrop-blur-sm border border-white/20 rotate-1 shadow-sm" />
                    
                    <p className="text-gray-800 font-bold text-sm leading-relaxed italic">
                       "{note}"
                    </p>
                    
                    <div className="flex justify-between items-center mt-4">
                       <span className="text-[0.6rem] font-black uppercase tracking-widest text-yellow-700/50">Dr. Note</span>
                       <button 
                         onClick={() => removeStickyNote(i)}
                         className="w-6 h-6 rounded-full bg-black/5 flex items-center justify-center text-xs hover:bg-red-500 hover:text-white transition-colors"
                       >
                         ✕
                       </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* SIMPLE ANALYSIS CARD */}
            <div className="bg-white/40 backdrop-blur-xl rounded-[40px] p-10 border border-white/20 shadow-2xl shadow-green-100/20 mb-12 relative overflow-hidden black-glow-card">
               <div className="max-w-2xl">
                  <div className="inline-block px-4 py-1 bg-green-100 text-green-700 rounded-full text-[0.65rem] font-black uppercase tracking-widest mb-6">
                    Food Helper
                  </div>
                  <h2 className="text-3xl font-black mb-6 dark:text-white">Health Check</h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                    You're doing a good job! Your health score is <span className="font-bold text-black dark:text-white">82</span>. 
                    To get even better, try to eat a bit more protein to reach your goal.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex gap-4">
                       <div className="w-1.5 h-12 bg-green-500 rounded-full" />
                       <div>
                          <p className="text-xs font-black text-gray-400 uppercase">Top Tip</p>
                          <p className="font-bold text-sm">Eat more sprouts for strength.</p>
                       </div>
                    </div>
                    <div className="flex gap-4">
                       <div className="w-1.5 h-12 bg-blue-500 rounded-full" />
                       <div>
                          <p className="text-xs font-black text-gray-400 uppercase">Best Time</p>
                          <p className="font-bold text-sm">Have a big lunch at 1 PM.</p>
                       </div>
                    </div>
                    <div className="flex gap-4">
                       <div className="w-1.5 h-12 bg-orange-500 rounded-full" />
                       <div>
                          <p className="text-xs font-black text-gray-400 uppercase">Local Choice</p>
                          <p className="font-bold text-sm">Use fresh local cooking oils.</p>
                       </div>
                    </div>
                  </div>
               </div>
            </div>

            <h2 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em] mb-8">Your Meals for Today</h2>
            <div className="space-y-6 mb-16">
              {meals.map((meal, idx) => (
                <div key={idx} className="bg-white dark:bg-[#1a1c23] rounded-[32px] p-6 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col md:flex-row gap-8 transition-colors hover:border-green-100 group transition-all duration-300">
                  <div className="w-full md:w-64 h-48 rounded-2xl overflow-hidden shrink-0">
                    <img src={meal.image} alt={meal.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="flex-1 py-2">
                    <div className="flex items-center justify-between mb-4">
                      <div className="inline-block px-4 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full text-[0.6rem] font-black uppercase tracking-wider transition-colors">
                        {meal.time}
                      </div>
                      <div className="text-xs font-bold text-green-600 flex items-center gap-1 bg-green-50 px-3 py-1 rounded-full">
                         Good Choice
                      </div>
                    </div>
                    <h3 className="text-2xl font-black mb-2 dark:text-white transition-colors">{meal.name}</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm leading-relaxed">{meal.desc}</p>
                    
                    <div className="bg-gray-50/50 dark:bg-gray-800/30 p-4 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700 mb-6">
                        <p className="text-[0.6rem] font-black text-green-600 uppercase mb-2">Why this is good</p>
                        <p className="text-xs italic text-gray-600 dark:text-gray-400 leading-relaxed">{meal.insight}</p>
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <p className="text-[0.6rem] text-gray-400 font-black uppercase">Calories</p>
                        <p className="font-bold text-sm dark:text-white">{meal.calories}</p>
                      </div>
                      <div>
                        <p className="text-[0.6rem] text-gray-400 font-black uppercase">Carbs</p>
                        <p className="font-bold text-sm dark:text-white">{meal.carbs}</p>
                      </div>
                      <div>
                        <p className="text-[0.6rem] text-gray-400 font-black uppercase">Protein</p>
                        <p className="font-bold text-sm dark:text-white">{meal.protein}</p>
                      </div>
                      <div>
                        <p className="text-[0.6rem] text-gray-400 font-black uppercase">Fat</p>
                        <p className="font-bold text-sm dark:text-white">{meal.fat}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* DAILY HABITS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="p-8 bg-gray-50 dark:bg-gray-800/50 rounded-[40px] border border-gray-100 dark:border-gray-700">
                  <h3 className="text-lg font-black mb-6 uppercase tracking-wider">Daily Habits</h3>
                  <ul className="space-y-4">
                     <li className="flex items-start gap-4">
                        <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-1">
                           <span className="text-[10px] font-black">01</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400"><span className="font-bold text-black dark:text-white">Water:</span> Drink warm water in the morning to clean your stomach.</p>
                     </li>
                     <li className="flex items-start gap-4">
                        <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-1">
                           <span className="text-[10px] font-black">02</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400"><span className="font-bold text-black dark:text-white">Chewing:</span> Chew your food slowly. It helps you digest better.</p>
                     </li>
                  </ul>
               </div>
               <div className="p-8 bg-gray-50 dark:bg-gray-800/50 rounded-[40px] border border-gray-100 dark:border-gray-700">
                  <h3 className="text-lg font-black mb-6 uppercase tracking-wider">Things to Avoid</h3>
                  <ul className="space-y-4">
                     <li className="flex items-start gap-4">
                        <div className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 mt-1 text-[10px]">✕</div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Don't drink very cold water while eating.</p>
                     </li>
                     <li className="flex items-start gap-4">
                        <div className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 mt-1 text-[10px]">✕</div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Don't use your phone while eating. Focus on your food.</p>
                     </li>
                  </ul>
               </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'workout' && (
          <motion.div
            key="workout"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
          >
             {/* Workout Tabs */}
             <div className="flex gap-4 mb-12">
               {['yoga', 'gym', 'cardio'].map((cat) => (
                 <button
                   key={cat}
                   onClick={() => setWorkoutCategory(cat as any)}
                   className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
                     workoutCategory === cat 
                      ? 'bg-black text-white shadow-lg' 
                      : 'bg-white text-gray-400 border border-gray-100 hover:border-gray-200'
                   }`}
                 >
                   {cat}
                 </button>
               ))}
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {workouts[workoutCategory].map((w, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ y: -5 }}
                    className="bg-white dark:bg-[#1a1c23] rounded-[32px] overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 transition-colors"
                  >
                     <div className="aspect-video w-full bg-gray-100">
                        <iframe
                          width="100%"
                          height="100%"
                          src={`https://www.youtube.com/embed/${w.embedId}`}
                          title={w.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                     </div>
                     <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                           <Clock size={14} className="text-gray-400" />
                           <span className="text-[0.6rem] font-black text-gray-400 uppercase tracking-widest">{w.duration} • {w.calories}</span>
                        </div>
                        <h4 className="text-xl font-black mb-4 dark:text-white">{w.title}</h4>
                        <div className="flex flex-wrap gap-2">
                           {w.exercises.map((ex, j) => (
                             <span key={j} className="px-3 py-1 bg-gray-50 dark:bg-gray-800 text-[0.6rem] font-bold text-gray-500 rounded-lg">{ex}</span>
                           ))}
                        </div>
                     </div>
                  </motion.div>
                ))}
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
