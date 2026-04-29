import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../../context/AuthContext';
import { getSwasthaChatResponse } from '../../services/aiService';
import { 
  Send, 
  MessageSquare, 
  Sparkles, 
  Bot, 
  User, 
  RefreshCw,
  Zap,
  Target,
  Leaf
} from 'lucide-react';
import { cn } from '../../lib/utils';

export default function ChatSubpage() {
  const { profile, mealLogs, aarogyaScore } = useAuth();
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const stats = { 
      calories: 1450, 
      protein: 45, 
      aarogyaScore,
      mealCount: mealLogs.length 
    };

    try {
      const response = await getSwasthaChatResponse(messages, profile, stats, input);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Mafi chahta hu, mera system thoda busy hai. Please try again later!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestions = [
    "Dinner ke liye kya healthy rahega?",
    "Protein badhane ke liye tips do",
    "Ekadashi fasting diet plan batao",
    "Aarogya score kaise improve kare?"
  ];

  return (
    <div className="max-w-7xl mx-auto h-[calc(100vh-100px)] lg:h-[calc(100vh-120px)] p-2 md:p-6">
      {/* Chat Area */}
      <div className="w-full h-full flex flex-col bg-[#050508] rounded-[48px] border border-white/5 shadow-2xl shadow-indigo-900/20 overflow-hidden relative">
        {/* Glow Effects */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
           <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/10 rounded-full blur-[120px]"></div>
           <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[120px]"></div>
           <div className="absolute top-[40%] left-[20%] w-[60%] h-[20%] bg-emerald-600/5 rounded-full blur-[100px]"></div>
        </div>

        {/* Chat Header */}
        <div className="px-6 md:px-10 py-4 md:py-6 border-b border-white/5 flex justify-between items-center bg-black/40 backdrop-blur-3xl sticky top-0 z-20">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-[24px] flex items-center justify-center bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-white/10 shadow-[0_0_30px_rgba(99,102,241,0.15)] text-3xl">
               🚀
            </div>
            <div>
              <h3 className="font-display text-3xl tracking-tight leading-none uppercase text-white">Swastha AI</h3>
              <div className="flex items-center gap-2 mt-2">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
                <span className="text-[0.65rem] font-black tracking-[0.2em] text-emerald-400 uppercase">Live Assistance</span>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setMessages([])}
            className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
          >
            <RefreshCw size={18} />
          </button>
        </div>

        {/* Message Thread */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-4 md:p-10 space-y-6 md:space-y-8 scroll-smooth z-10"
        >
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-8">
               <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-[32px] flex items-center justify-center text-indigo-400 shadow-[0_0_50px_rgba(99,102,241,0.15)] relative">
                  <div className="absolute inset-0 bg-indigo-500/20 rounded-[32px] animate-ping opacity-20"></div>
                  <MessageSquare size={48} />
               </div>
               <div className="space-y-3">
                  <h4 className="text-2xl font-black tracking-tight text-white uppercase drop-shadow-lg">Namaste {profile?.name?.split(' ')[0]}!</h4>
                  <p className="text-sm text-gray-400 font-bold max-w-xs leading-relaxed uppercase tracking-widest">I am your Vedic nutrition guide. Ask me anything about your diet, regional recipes, or health goals.</p>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md w-full mt-8">
                  {suggestions.map((s, i) => (
                    <button 
                      key={i}
                      onClick={() => setInput(s)}
                      className="p-3 md:p-4 bg-white/5 hover:bg-indigo-500/20 border border-white/10 hover:border-indigo-500/50 rounded-2xl text-[0.65rem] font-bold tracking-widest uppercase transition-all text-gray-300 hover:text-white backdrop-blur-sm"
                    >{s}</button>
                  ))}
               </div>
            </div>
          )}

          <AnimatePresence>
            {messages.map((m, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={cn(
                  "flex items-start gap-4",
                  m.role === 'user' ? "flex-row-reverse" : ""
                )}
              >
                <div className={cn(
                  "w-12 h-12 rounded-[20px] flex items-center justify-center shrink-0 text-xl shadow-lg border",
                  m.role === 'user' 
                    ? "bg-gradient-to-tr from-emerald-500/20 to-green-400/20 border-emerald-500/30 text-emerald-400" 
                    : "bg-white/5 border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                )}>
                  {m.role === 'user' ? <User size={20} /> : "🚀"}
                </div>
                <div className={cn(
                  "max-w-[85%] md:max-w-[75%] p-4 md:p-6 rounded-[28px] text-sm font-medium leading-relaxed shadow-2xl backdrop-blur-md",
                  m.role === 'user' 
                    ? "bg-gradient-to-br from-emerald-600 to-emerald-800 text-white rounded-tr-sm border border-emerald-500/30" 
                    : "bg-white/10 text-gray-100 rounded-tl-sm border border-white/10"
                )}>
                  {m.content}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isLoading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-4">
              <div className="w-10 h-10 bg-indigo-500/20 border border-indigo-500/30 rounded-xl flex items-center justify-center text-indigo-400">
                 <Sparkles size={20} className="animate-spin" />
              </div>
              <div className="bg-white/5 backdrop-blur-md px-6 py-4 rounded-[24px] border border-white/10 italic text-xs text-gray-400">
                Swastha AI is thinking...
              </div>
            </motion.div>
          )}
        </div>

        {/* Input Area: Gemini Style */}
        <div className="p-4 md:p-10 bg-[#0a0a0f] border-t border-white/10 flex justify-center z-10">
          <div className="gemini w-full max-w-2xl">
            <div className="inner !bg-[#12121a] !text-white !border !border-white/10 !shadow-[0_0_30px_rgba(0,0,0,0.5)]">
              <button className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                <span className="text-2xl font-light">+</span>
              </button>
              <input 
                placeholder="Ask Swastha AI..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleSend()}
                className="!text-white placeholder:text-gray-500"
              />
              <button 
                onClick={handleSend}
                className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
              >
                <Send size={20} />
              </button>
            </div>
            <div className="border"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
