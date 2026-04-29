import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  ShoppingBag,
  TrendingDown,
  TrendingUp,
  MapPin,
  Search,
  Info,
  ChevronRight,
  Leaf,
  Droplets,
  Zap,
  RefreshCw,
  X,
  BarChart3
} from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';

export default function MandiSubpage() {
  const [prices, setPrices] = useState([
    { name: 'Moong Dal', price: 95, prev: 115, unit: 'kg', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=400&q=80', status: 'low' },
    { name: 'Basmati Rice', price: 110, prev: 92, unit: 'kg', image: 'https://images.unsplash.com/photo-1586201375761-83865001e8ac?auto=format&fit=crop&w=400&q=80', status: 'high' },
    { name: 'Mustard Oil', price: 145, prev: 155, unit: 'L', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=400&q=80', status: 'low' },
    { name: 'Paneer', price: 380, prev: 380, unit: 'kg', image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=400&q=80', status: 'normal' },
    { name: 'Toor Dal', price: 150, prev: 130, unit: 'kg', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=400&q=80', status: 'high' },
    { name: 'Wheat Flour', price: 40, prev: 45, unit: 'kg', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80', status: 'low' },
    { name: 'Onion', price: 80, prev: 30, unit: 'kg', image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=400&q=80', status: 'high' },
    { name: 'Tomato', price: 20, prev: 60, unit: 'kg', image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=400&q=80', status: 'low' },
    { name: 'Potato', price: 25, prev: 35, unit: 'kg', image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=400&q=80', status: 'low' },
    { name: 'Ghee', price: 650, prev: 600, unit: 'kg', image: 'https://images.unsplash.com/photo-1627447959082-f470cdbb8b66?auto=format&fit=crop&w=400&q=80', status: 'high' },
    { name: 'Sugar', price: 45, prev: 45, unit: 'kg', image: 'https://images.unsplash.com/photo-1581441363689-1f3c3c414635?auto=format&fit=crop&w=400&q=80', status: 'normal' },
    { name: 'Chickpeas', price: 120, prev: 100, unit: 'kg', image: 'https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&w=400&q=80', status: 'high' }
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const refreshPrices = () => {
    setPrices(prev => prev.map(p => {
      const change = (Math.random() - 0.5) * 15;
      const newPrice = Math.round(p.price + change);
      let status = 'normal';
      if (newPrice > p.prev + 10) status = 'high';
      if (newPrice < p.prev - 10) status = 'low';
      return {
        ...p,
        prev: p.price,
        price: newPrice,
        status: status
      };
    }));
  };

  const filteredPrices = prices.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-12 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <h2 className="font-display text-5xl uppercase tracking-tighter">Market Prices</h2>
          <p className="text-[0.65rem] font-black tracking-[0.3em] text-gray-400 uppercase">Live Mandi Rates for Your Region</p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={refreshPrices}
            className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-100 rounded-2xl text-[0.6rem] font-black tracking-widest uppercase text-gray-500 hover:bg-gray-50 transition-all"
          >
            <RefreshCw size={14} /> <span className="hidden sm:inline">Refresh Rates</span>
          </button>
          <div className="flex items-center gap-3 bg-white/40 backdrop-blur-xl px-5 py-3 rounded-2xl border border-white/20 shadow-sm w-full sm:w-auto">
            <MapPin size={16} className="text-[#3a6e00]" />
            <span className="text-[0.6rem] font-black tracking-widest uppercase text-gray-500 line-clamp-1">Delhi, Azadpur Mandi</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Price List */}
        <div className="col-span-1 lg:col-span-8 space-y-8">
          <div className="relative group">
            <input
              className="w-full bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl border border-white/20 dark:border-gray-700 rounded-3xl p-6 pl-14 outline-none focus:ring-2 focus:ring-[#3a6e00]/20 text-sm font-bold shadow-xl shadow-gray-200/20 dark:shadow-black/20 dark:text-white placeholder:text-gray-400"
              placeholder="Search ingredients (e.g. Rice, Dal)..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pb-32">
            {filteredPrices.map((item, i) => {
              const isHigh = item.status === 'high';
              const isLow = item.status === 'low';

              let cardBgClass = "bg-white dark:bg-[#1a1c23] border-gray-100 dark:border-gray-800";
              let textClass = "text-[#0d0d14] dark:text-white";
              let priceClass = "text-[#3a6e00] dark:text-emerald-400";
              let badgeClass = "bg-gray-100 dark:bg-gray-800 text-gray-500 border-gray-200 dark:border-gray-700";
              let shadowClass = "shadow-lg shadow-gray-200/50 dark:shadow-black/20";

              if (isHigh) {
                cardBgClass = "bg-red-50/50 dark:bg-red-900/10 border-red-200 dark:border-red-800/50";
                textClass = "text-red-950 dark:text-red-50";
                priceClass = "text-red-600 dark:text-red-400";
                badgeClass = "bg-red-100 dark:bg-red-900/50 text-red-600 border-red-200 dark:border-red-800";
                shadowClass = "shadow-xl shadow-red-200/50 dark:shadow-red-900/20";
              } else if (isLow) {
                cardBgClass = "bg-emerald-50/50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-800/50";
                textClass = "text-emerald-950 dark:text-emerald-50";
                priceClass = "text-emerald-600 dark:text-emerald-400";
                badgeClass = "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 border-emerald-200 dark:border-emerald-800";
                shadowClass = "shadow-xl shadow-emerald-200/50 dark:shadow-emerald-900/20";
              }

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setSelectedItem(item)}
                  className={cn("rounded-[32px] p-6 border group cursor-pointer relative overflow-hidden transition-all duration-300", cardBgClass, shadowClass)}
                >
                  {/* Background Glow */}
                  <div className={cn("absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[50px] opacity-20 pointer-events-none transition-colors", isHigh ? "bg-red-500" : isLow ? "bg-emerald-500" : "bg-gray-400")}></div>

                  <div className="flex justify-between items-start mb-6">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-md relative">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="text-right flex flex-col items-end">
                      <div className={cn("flex items-center gap-1 px-3 py-1 rounded-full border mb-2", badgeClass)}>
                        {isHigh ? <TrendingUp size={12} /> : isLow ? <TrendingDown size={12} /> : <Info size={12} />}
                        <span className="text-[0.6rem] font-black tracking-widest uppercase">
                          {isHigh ? 'Price High' : isLow ? 'Price Low' : 'Stable'}
                        </span>
                      </div>
                      <p className="text-[0.6rem] font-bold text-gray-500 uppercase">Prev: ₹{item.prev}/{item.unit}</p>
                    </div>
                  </div>

                  <h4 className={cn("text-2xl font-black tracking-tight", textClass)}>{item.name}</h4>

                  <div className="mt-4 flex items-end gap-2 relative">
                    <span className={cn("text-5xl font-display", priceClass)}>₹{item.price}</span>
                    <span className="text-sm font-bold text-gray-400 dark:text-gray-500 mb-2 uppercase">/ {item.unit}</span>
                  </div>

                  <div className="mt-8 pt-4 border-t border-black/5 dark:border-white/5 flex items-center justify-between opacity-50 group-hover:opacity-100 transition-opacity">
                    <span className={cn("text-xs font-bold uppercase", priceClass)}>View Market Trend</span>
                    <ChevronRight size={16} className={priceClass} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Info Sidebar */}
        <div className="col-span-1 lg:col-span-4 space-y-8">
          <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0d0d14] rounded-[40px] p-8 text-white relative overflow-hidden shadow-2xl">
            <h4 className="text-[0.6rem] font-black tracking-[0.3em] uppercase text-white/40 mb-6">Mandi Insights</h4>
            <div className="space-y-6 relative z-10">
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-500 shrink-0"><TrendingUp size={14} /></div>
                <div>
                  <p className="text-sm font-bold leading-tight mb-1">Onion prices spiked 150%</p>
                  <p className="text-[0.65rem] text-white/50 uppercase tracking-widest font-bold">Due to unseasonal rains</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500 shrink-0"><TrendingDown size={14} /></div>
                <div>
                  <p className="text-sm font-bold leading-tight mb-1">Tomato rates stabilized</p>
                  <p className="text-[0.65rem] text-white/50 uppercase tracking-widest font-bold">New harvest arrived</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>

      {/* 3D Trend Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-3xl bg-white dark:bg-[#1a1c23] rounded-[40px] p-10 shadow-2xl border border-gray-100 dark:border-gray-800 relative overflow-hidden"
            >
              <button onClick={() => setSelectedItem(null)} className="absolute top-8 right-8 w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-500 hover:text-black dark:hover:text-white transition-colors z-10">
                <X size={20} />
              </button>

              <div className="mb-12">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 rounded-[16px] overflow-hidden shadow-md">
                    <img src={selectedItem.image} alt={selectedItem.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-4xl font-display uppercase tracking-tight dark:text-white">{selectedItem.name} Trend</h3>
                </div>
                <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">30 Day Price Simulation</p>
              </div>

              {/* Modern 2D Bar Chart */}
              <div className="h-64 flex items-end justify-between gap-1 sm:gap-2 px-2 pb-10 border-b border-gray-100 dark:border-gray-800 relative">
                 {/* Y-axis reference lines */}
                 <div className="absolute inset-0 pointer-events-none flex flex-col justify-between pb-10">
                    <div className="w-full h-px bg-gray-100 dark:bg-gray-800/50"></div>
                    <div className="w-full h-px bg-gray-100 dark:bg-gray-800/50"></div>
                    <div className="w-full h-px bg-gray-100 dark:bg-gray-800/50"></div>
                    <div className="w-full h-px bg-gray-100 dark:bg-gray-800/50"></div>
                 </div>

                 {[...Array(15)].map((_, idx) => {
                   const target = Number(selectedItem?.price) || 0;
                   const start = Number(selectedItem?.prev) || target || 10;
                   // Simulating a realistic curve towards the current price
                   const val = start + ((target - start) * (Math.pow(idx / 14, 2))) + (Math.sin(idx) * 5);
                   const maxVal = Math.max(target, start) + 20;
                   const heightPercent = maxVal === 0 ? 0 : Math.min(100, Math.max(5, (val / maxVal) * 100));
                   const isLast = idx === 14;
                   
                   let barColor = "bg-gray-200 dark:bg-gray-700/50";
                   
                   if (isLast) {
                     barColor = selectedItem.status === 'high' ? "bg-red-500" : selectedItem.status === 'low' ? "bg-emerald-500" : "bg-indigo-500";
                   }

                   return (
                     <div key={idx} className="w-full h-full flex flex-col justify-end items-center gap-3 relative group z-10">
                        <span className="opacity-0 group-hover:opacity-100 absolute -top-8 text-xs font-black dark:text-white transition-opacity bg-[#0d0d14] dark:bg-white text-white dark:text-[#0d0d14] px-3 py-1.5 rounded-lg shadow-xl z-20 whitespace-nowrap">₹{Math.round(val)}</span>
                        
                        {/* Clean Flat Bar */}
                        <motion.div 
                          initial={{ height: 0 }}
                          animate={{ height: `${heightPercent}%` }}
                          transition={{ duration: 0.8, delay: idx * 0.03, ease: "easeOut" }}
                          className={cn("w-full rounded-t-lg transition-colors hover:opacity-80", barColor)}
                        />
                        {idx % 3 === 0 && <span className="text-[0.5rem] font-bold text-gray-400 uppercase absolute -bottom-6">Day {idx * 2 + 1}</span>}
                     </div>
                   );
                 })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

{/* Sidebar Info */ }
<div className="col-span-4 space-y-8">
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="bg-gradient-to-br from-[#1a1a1a] to-[#0d0d14] rounded-[40px] p-10 text-white relative overflow-hidden shadow-2xl shadow-gray-400"
  >
    <div className="relative z-10 space-y-6">
      <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
        <ShoppingBag size={24} className="text-emerald-400" />
      </div>
      <h4 className="text-3xl font-display uppercase leading-tight">Weekly <br /> Grocery Goal</h4>
      <p className="text-white/40 text-[0.6rem] font-bold uppercase tracking-widest leading-relaxed">Save up to ₹250 this week by shopping at the local Azadpur market for your lentils.</p>
      <button className="w-full py-4 bg-white text-[#0d0d14] rounded-2xl font-black text-[0.65rem] tracking-[0.2em] uppercase shadow-xl shadow-black/20">Check List</button>
    </div>
    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#3a6e00]/10 rounded-full blur-3xl" />
  </motion.div>

  <div className="bg-white/40 backdrop-blur-xl rounded-[40px] p-8 border border-white/20 shadow-xl shadow-gray-200/20">
    <div className="flex items-center gap-3 mb-6">
      <Info size={16} className="text-[#3a6e00]" />
      <h4 className="text-[0.6rem] font-black tracking-widest uppercase text-gray-400">Shopping Tip</h4>
    </div>
    <p className="text-sm font-bold text-gray-800 leading-relaxed italic">
      "Moong Dal prices are at their lowest this month. Stock up for your protein needs!"
    </p>
  </div>
</div>

