import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [mealLogs, setMealLogs] = useState<any[]>([]);
  const [aarogyaScore, setAarogyaScore] = useState(82);
  const [recommendations, setRecommendations] = useState<string[]>([]);

  // Load guest data from localStorage on mount
  useEffect(() => {
    if (user?.uid === 'guest-user') {
      const savedLogs = localStorage.getItem('guest_meal_logs');
      if (savedLogs) {
        const parsed = JSON.parse(savedLogs);
        setMealLogs(parsed);
        calculateScore(parsed);
      }
      const savedProfile = localStorage.getItem('guest_profile');
      if (savedProfile) {
        setProfile(JSON.parse(savedProfile));
      }
    }
  }, [user]);

  const calculateScore = (logs: any[]) => {
    if (logs.length === 0) {
      setAarogyaScore(82); // Default
      return;
    }
    // Simple logic: higher variety and more protein adequacy increases score
    const proteinTotal = logs.reduce((acc, log) => acc + (log.protein_g || 0), 0);
    const fibreTotal = logs.reduce((acc, log) => acc + (log.fibre_g || 0), 0);
    const caloriesTotal = logs.reduce((acc, log) => acc + (log.calories_kcal || 0), 0);
    
    const newScore = Math.min(100, 70 + (proteinTotal / 2) + (logs.length * 2));
    setAarogyaScore(Math.round(newScore));

    // Generate dynamic simple English recommendations
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
    
    if (user?.uid === 'guest-user') {
      localStorage.setItem('guest_meal_logs', JSON.stringify(updatedLogs));
    }
  };

  const refreshProfile = async (newProfile?: any) => {
    if (newProfile) {
      setProfile(newProfile);
      if (user?.uid === 'guest-user') {
        localStorage.setItem('guest_profile', JSON.stringify(newProfile));
      }
      return;
    }

    if (user && user.uid === 'guest-user') {
       const saved = localStorage.getItem('guest_profile');
       if (saved) {
         setProfile(JSON.parse(saved));
       } else {
         setProfile({
           name: 'Guest User',
           age: 30,
           gender: 'other',
           region: 'North India',
           preferences: ['Vegetarian'],
           budget_range: 'moderate',
           health_goals: ['Maintain Weight'],
           dietary_constraints: [],
         });
       }
    }
  };

  const updateProfile = async (newProfile: any) => {
    setProfile(newProfile);
    if (user?.uid === 'guest-user') {
      localStorage.setItem('guest_profile', JSON.stringify(newProfile));
    }
  };

  useEffect(() => {
    // Bypassing real auth check on mount
    setLoading(false);
  }, []);

  const signIn = async () => {
    try {
      setLoading(true);
      console.log('Logging in as Guest...');
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockUser = {
        uid: 'guest-user',
        email: 'guest@swasthbite.com',
        displayName: 'Guest User',
      } as User;
      
      setUser(mockUser);
      
      // Clear previous guest session to force a fresh onboarding/demo experience
      localStorage.removeItem('guest_profile');
      localStorage.removeItem('guest_meal_logs');
      
      setProfile(null); 
      setMealLogs([]);
      setAarogyaScore(82);
      
      console.log('Guest login success - Session cleared for fresh onboarding');
    } catch (error) {
      console.error('Sign in error:', error);
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
        recommendations
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
