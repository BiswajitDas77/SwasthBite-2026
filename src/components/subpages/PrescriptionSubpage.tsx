import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Upload, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  ChevronRight,
  Stethoscope,
  Info,
  Check
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAuth } from '../../context/AuthContext';

export default function PrescriptionSubpage() {
  const { addStickyNotes } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const mockInstructions = [
    { text: "Eat more protein to help your body recover", type: "add" },
    { text: "Use less salt in your food", type: "limit" },
    { text: "Eat more green vegetables like Palak", type: "add" }
  ];

  const handleAddNotes = () => {
    addStickyNotes(mockInstructions.map(i => i.text));
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      setShowResult(false);
    }, 2000);
  };

  const handleUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setShowResult(true);
    }, 2500);
  };

  return (
    <div className="space-y-12 max-w-6xl pb-20">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div className="space-y-2">
          <h2 className="font-display text-5xl uppercase tracking-tighter">Doctor's Advice</h2>
          <p className="text-[0.65rem] font-black tracking-[0.3em] text-gray-400 uppercase">Read what your doctor says about your food</p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-10">
        {/* Upload Area */}
        <div className="col-span-7 space-y-8">
           {!showResult ? (
             <motion.div 
               whileHover={{ scale: 1.01 }}
               onClick={() => fileInputRef.current?.click()}
               className="bg-white/40 backdrop-blur-xl border-4 border-dashed border-white/20 rounded-[50px] p-20 flex flex-col items-center justify-center text-center cursor-pointer hover:border-[#3a6e00]/30 transition-all shadow-2xl shadow-gray-200/20"
             >
                <div className="w-24 h-24 bg-gray-50 rounded-[32px] flex items-center justify-center text-gray-300 mb-8 group-hover:text-[#3a6e00] transition-colors">
                   {isUploading ? <Plus className="animate-spin" size={48} /> : <Upload size={48} />}
                </div>
                <div className="space-y-2">
                   <h3 className="text-2xl font-black tracking-tight text-gray-800">
                     {isUploading ? 'Reading Notes...' : 'Add Doctor\'s Note'}
                   </h3>
                   <p className="text-xs text-gray-400 font-bold uppercase tracking-[0.2em] max-w-xs leading-relaxed">
                     We will find the food tips in your doctor's note for you.
                   </p>
                </div>
                <input type="file" ref={fileInputRef} className="hidden" onChange={handleUpload} />
             </motion.div>
           ) : (
             <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               className="bg-white/40 backdrop-blur-xl rounded-[40px] border border-white/20 shadow-2xl shadow-gray-200/20 overflow-hidden"
             >
                <div className="p-10 border-b border-white/10 bg-[#3a6e00]/5 flex items-center gap-4">
                   <div className="w-12 h-12 bg-[#3a6e00] text-white rounded-2xl flex items-center justify-center">
                      <FileText size={24} />
                   </div>
                   <div>
                      <p className="text-[0.6rem] font-black text-[#3a6e00] tracking-widest uppercase">Finished Reading</p>
                      <h4 className="text-lg font-black tracking-tight text-gray-800">Food Tips Found</h4>
                   </div>
                </div>
                <div className="p-10 space-y-6">
                   {mockInstructions.map((item, i) => (
                     <div key={i} className="flex items-center justify-between p-6 bg-white/40 border border-white/10 rounded-3xl group hover:border-[#3a6e00]/20 transition-all">
                        <div className="flex items-center gap-6">
                           <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", item.type === 'add' ? "bg-emerald-100 text-emerald-600" : "bg-red-100 text-red-600")}>
                              {item.type === 'add' ? <Plus size={20} /> : <AlertCircle size={20} />}
                           </div>
                           <p className="text-sm font-bold text-gray-800">{item.text}</p>
                        </div>
                        <CheckCircle2 className="text-gray-200 group-hover:text-emerald-500 transition-colors" size={20} />
                     </div>
                   ))}
                   <button 
                     onClick={handleAddNotes}
                     className={cn(
                       "w-full py-5 rounded-2xl font-black text-[0.65rem] tracking-[0.2em] uppercase shadow-xl transition-all flex items-center justify-center gap-2",
                       isAdded ? "bg-emerald-500 text-white shadow-emerald-500/20" : "bg-[#3a6e00] text-white shadow-[#3a6e00]/20"
                     )}
                   >
                      {isAdded ? (
                        <>
                          <Check size={16} /> Added To Plan
                        </>
                      ) : (
                        "Add To My Plan"
                      )}
                   </button>
                </div>
             </motion.div>
           )}
        </div>

        {/* Info Sidebar */}
        <div className="col-span-5 space-y-8">
           <motion.div 
             whileHover={{ y: -5 }}
             className="bg-gradient-to-br from-[#1a1a1a] to-[#0d0d14] rounded-[40px] p-10 text-white relative overflow-hidden shadow-2xl shadow-gray-400"
           >
              <div className="relative z-10 space-y-6">
                 <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                    <FileText size={24} className="text-indigo-400" />
                 </div>
                 <h4 className="text-3xl font-display uppercase leading-tight">Your Private <br /> Health Safe</h4>
                 <p className="text-white/40 text-[0.6rem] font-bold uppercase tracking-widest leading-relaxed">A safe place for your health notes. We only read the food tips to help you eat better.</p>
                 <div className="flex -space-x-4">
                    {[1,2,3].map(i => <div key={i} className="w-12 h-12 rounded-full border-4 border-[#0d0d14] bg-white/20 flex items-center justify-center text-[0.6rem] font-black tracking-widest">SAFE</div>)}
                    <div className="w-12 h-12 rounded-full border-4 border-[#0d0d14] bg-indigo-600 flex items-center justify-center text-[0.6rem] font-black">+2</div>
                 </div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl" />
           </motion.div>

           <div className="bg-white/40 backdrop-blur-xl rounded-[40px] p-8 border border-white/20 shadow-xl shadow-gray-200/20">
              <div className="flex items-center gap-3 mb-6">
                 <Info size={16} className="text-[#3a6e00]" />
                 <h4 className="text-[0.6rem] font-black tracking-widest uppercase text-gray-400">Why Use This?</h4>
              </div>
              <p className="text-sm font-bold text-gray-800 leading-relaxed italic">
                "Doctors often give food tips that are hard to follow. We turn those notes into easy rules for your daily meals."
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
