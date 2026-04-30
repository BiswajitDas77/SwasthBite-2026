import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

interface AuthContextType {
  user: User | null;
  profile: any | null;
  loading: boolean;
  signIn: () => Promise<void>;
  logOut: () => Promise<void>;
  refreshProfile: (newProfile?: any) => Promise<void>;
  mealLogs: any[];
  addMealLog: (meal: any) => Promise<void>;
  aarogyaScore: number;
  recommendations: string[];
  stats: {
    streak: number;
    co2Saved: number;
    mandiMeals: number;
    totalProtein: number;
    totalCalories: number;
    totalFibre: number;
    varietyScore: number;
    waterIntake: number;
    micronutrients: number;
  };
  addWater: (amount: number) => void;
  stickyNotes: string[];
  addStickyNotes: (notes: string[]) => void;
  removeStickyNote: (index: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [mealLogs, setMealLogs] = useState<any[]>([]);
  const [aarogyaScore, setAarogyaScore] = useState(82);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [stickyNotes, setStickyNotes] = useState<string[]>([]);
  const [stats, setStats] = useState({
    streak: 12,
    co2Saved: 0,
    mandiMeals: 0,
    totalProtein: 0,
    totalCalories: 0,
    totalFibre: 0,
    varietyScore: 0,
    waterIntake: 5,
    micronutrients: 70
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        // Load user profile from Firestore
        const docRef = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setProfile(docSnap.data());
        } else {
          setProfile(null);
        }

        // Load meal logs from Firestore
        const logsRef = doc(db, 'meal_logs', currentUser.uid);
        const logsSnap = await getDoc(logsRef);
        if (logsSnap.exists()) {
          const logs = logsSnap.data().logs || [];
          setMealLogs(logs);
          calculateScore(logs);
        }
      } else {
        setProfile(null);
        setMealLogs([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const calculateScore = (logs: any[]) => {
    if (logs.length === 0) {
      setAarogyaScore(82); // Default
      return;
    }
    const proteinTotal = logs.reduce((acc, log) => acc + (log.protein_g || 0), 0);
    const fibreTotal = logs.reduce((acc, log) => acc + (log.fibre_g || 0), 0);
    const caloriesTotal = logs.reduce((acc, log) => acc + (log.calories_kcal || 0), 0);
    const uniqueFoods = new Set(logs.map(l => l.name_en || l.name)).size;
    
    const newScore = Math.min(100, 70 + (proteinTotal / 2) + (logs.length * 2));
    setAarogyaScore(Math.round(newScore));

    setStats(prev => ({
      ...prev,
      co2Saved: logs.length * 1.2,
      mandiMeals: logs.length,
      totalProtein: proteinTotal,
      totalCalories: caloriesTotal,
      totalFibre: fibreTotal,
      varietyScore: Math.min(10, uniqueFoods),
      micronutrients: Math.min(100, 60 + (uniqueFoods * 5))
    }));

    const recs = [];
    if (proteinTotal < 50) recs.push("Eat more Dal or Paneer to help your muscles grow.");
    if (fibreTotal < 15) recs.push("Add some Green Salad to your next meal for better digestion.");
    if (caloriesTotal > 2000) recs.push("You've had a big day! Try a light dinner like clear soup.");
    if (logs.length < 2) recs.push("Try not to skip meals. Small, regular bites keep you active.");
    
    setRecommendations(recs.length > 0 ? recs : ["You are doing great! Keep eating fresh local food."]);
  };

  const addMealLog = async (meal: any) => {
    const newLog = {
      ...meal,
      id: Date.now().toString(),
      logged_at: new Date().toISOString()
    };
    
    const updatedLogs = [newLog, ...mealLogs];
    setMealLogs(updatedLogs);
    calculateScore(updatedLogs);
    
    if (user) {
      await setDoc(doc(db, 'meal_logs', user.uid), { logs: updatedLogs }, { merge: true });
    }
  };

  const refreshProfile = async (newProfile?: any) => {
    if (newProfile) {
      setProfile(newProfile);
      if (user) {
        await setDoc(doc(db, 'users', user.uid), newProfile, { merge: true });
      }
      return;
    }
  };

  const signIn = async () => {
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Google Sign-In Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const logOut = async () => {
    await signOut(auth);
    setUser(null);
    setProfile(null);
    setMealLogs([]);
    setAarogyaScore(82);
  };

  const addWater = (amount: number) => {
    setStats(prev => ({ ...prev, waterIntake: prev.waterIntake + amount }));
  };

  const addStickyNotes = (notes: string[]) => {
    setStickyNotes(prev => [...prev, ...notes]);
  };

  const removeStickyNote = (index: number) => {
    setStickyNotes(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <AuthContext.Provider value={{ 
        user, 
        profile, 
        loading, 
        signIn, 
        logOut, 
        refreshProfile,
        mealLogs,
        addMealLog,
        aarogyaScore,
        recommendations,
        stats,
        addWater,
        stickyNotes,
        addStickyNotes,
        removeStickyNote
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
