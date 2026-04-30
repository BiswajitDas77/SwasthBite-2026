import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Apple, Flame, Utensils, Clock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function RecommendationsSubpage() {
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState<'diet' | 'workout'>('diet');
  const [workoutCategory, setWorkoutCategory] = useState<'yoga' | 'gym' | 'cardio'>('yoga');

  const meals = [
    {
      time: "Breakfast",
      name: "Protein-Packed Poha & Sprouts",
      calories: "320 kcal",
      carbs: "45g",
      protein: "15g",
      fat: "8g",
      desc: "Light and highly nutritious start to your day. Sprouts add essential amino acids.",
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      time: "Lunch",
      name: "Multigrain Roti with Palak Paneer",
      calories: "450 kcal",
      carbs: "50g",
      protein: "22g",
      fat: "16g",
      desc: "Iron-rich spinach combined with paneer for a heavy protein boost.",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      time: "Dinner",
      name: "Light Quinoa Khichdi",
      calories: "280 kcal",
      carbs: "40g",
      protein: "10g",
      fat: "5g",
      desc: "Easy to digest, perfect for maintaining steady glucose levels overnight.",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    }
  ];

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

  return (
    <div className="p-10 max-w-6xl mx-auto pb-32">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-black mb-2 dark:text-white transition-colors">Personalized Recommendations</h1>
          <p className="text-gray-500 dark:text-gray-400">Curated by Swastha AI specifically for your body type and goals.</p>
        </div>
        
        {/* Toggle Switch */}
        <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-full flex shadow-inner transition-colors">
          <button
            onClick={() => setActiveTab('diet')}
            className={`px-8 py-3 rounded-full font-bold text-sm transition-all ${
              activeTab === 'diet' ? 'bg-white shadow-md text-[#3a6e00]' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700'
            }`}
          >
            Diet Plan
          </button>
          <button
            onClick={() => setActiveTab('workout')}
            className={`px-8 py-3 rounded-full font-bold text-sm transition-all ${
              activeTab === 'workout' ? 'bg-white shadow-md text-red-600' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700'
            }`}
          >
            Workout Plan
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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              <div className="bg-white dark:bg-[#1a1c23] rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 flex items-center gap-4 transition-colors">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center text-[#3a6e00] dark:text-green-400">
                  <Flame size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-bold">Daily Target</p>
                  <p className="text-xl font-black dark:text-white">1,850 kcal</p>
                </div>
              </div>
              <div className="bg-white dark:bg-[#1a1c23] rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 flex items-center gap-4 transition-colors">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-2xl flex items-center justify-center text-orange-600 dark:text-orange-400">
                  <Utensils size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-bold">Protein Goal</p>
                  <p className="text-xl font-black dark:text-white">85g</p>
                </div>
              </div>
              <div className="bg-white dark:bg-[#1a1c23] rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 flex items-center gap-4 transition-colors">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Apple size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-bold">Diet Type</p>
                  <p className="text-xl font-black capitalize dark:text-white">{profile?.health_goal || 'Stay Fit'}</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {meals.filter(m => {
                if (profile?.health_goal === 'GAIN MUSCLE') return m.protein.includes('g') && parseInt(m.protein) > 15;
                if (profile?.health_goal === 'LOSE WEIGHT') return parseInt(m.calories) < 350;
                return true;
              }).map((meal, idx) => (
                <div key={idx} className="bg-white dark:bg-[#1a1c23] rounded-[32px] p-6 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col md:flex-row gap-8 transition-colors">
                  <div className="w-full md:w-64 h-48 rounded-2xl overflow-hidden shrink-0">
                    <img src={meal.image} alt={meal.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 py-2">
                    <div className="inline-block px-4 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full text-xs font-bold uppercase tracking-wider mb-4 transition-colors">
                      {meal.time}
                    </div>
                    <h3 className="text-2xl font-black mb-2 dark:text-white transition-colors">{meal.name}</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-6">{meal.desc}</p>
                    
                    <div className="flex flex-wrap gap-4 md:gap-6">
                      <div>
                        <p className="text-xs text-gray-400 font-bold uppercase">Calories</p>
                        <p className="font-bold dark:text-white">{meal.calories}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 font-bold uppercase">Carbs</p>
                        <p className="font-bold dark:text-white">{meal.carbs}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 font-bold uppercase">Protein</p>
                        <p className="font-bold dark:text-white">{meal.protein}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 font-bold uppercase">Fat</p>
                        <p className="font-bold dark:text-white">{meal.fat}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
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
            {/* Workout Category Tabs */}
            <div className="flex overflow-x-auto hide-scrollbar gap-4 mb-8 pb-2">
              {(['yoga', 'gym', 'cardio'] as const).map(category => (
                <button
                  key={category}
                  onClick={() => setWorkoutCategory(category)}
                  className={`px-6 py-2 rounded-xl font-bold text-sm capitalize transition-all ${
                    workoutCategory === category
                      ? 'bg-red-500 text-white shadow-lg shadow-red-200'
                      : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  {category} Workouts
                </button>
              ))}
            </div>

            <div className="space-y-10">
              {workouts[workoutCategory].map((workout, idx) => (
                <div key={idx} className="bg-white dark:bg-[#1a1c23] rounded-[40px] overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col md:flex-row transition-colors">
                  <div className="w-full md:w-1/2 h-[300px] bg-black">
                    <iframe 
                      className="w-full h-full pointer-events-auto"
                      src={`https://www.youtube-nocookie.com/embed/${workout.embedId}?modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&fs=0`}
                      title={workout.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    ></iframe>
                  </div>
                  
                  <div className="p-8 md:w-1/2 flex flex-col justify-center">
                    <h3 className="text-3xl font-black mb-4 dark:text-white transition-colors">{workout.title}</h3>
                    <div className="flex gap-6 text-sm text-gray-500 dark:text-gray-400 font-bold mb-8 transition-colors">
                      <span className="flex items-center gap-2"><Clock size={16} className="text-red-500" /> {workout.duration}</span>
                      <span className="flex items-center gap-2"><Flame size={16} className="text-orange-500" /> {workout.calories}</span>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 transition-colors">
                      <h4 className="font-bold text-gray-400 uppercase tracking-wider text-xs mb-4">Exercises Included</h4>
                      <div className="flex flex-wrap gap-3">
                        {workout.exercises.map((ex, i) => (
                          <span key={i} className="bg-white dark:bg-gray-800 px-4 py-2 rounded-xl text-sm font-bold border border-gray-100 dark:border-gray-700 shadow-sm text-gray-700 dark:text-gray-300 transition-colors">
                            {ex}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
