import React from 'react';
import { motion } from 'motion/react';
import { 
  Award, 
  Zap, 
  Gift, 
  Star, 
  TrendingUp, 
  ChevronRight,
  Sparkles,
  Trophy,
  Rocket,
  Crown,
  CheckCircle2
} from 'lucide-react';
import { cn } from '../../lib/utils';

export default function RewardsSubpage() {
  const [coins, setCoins] = React.useState(2450);
  const [claimed, setClaimed] = React.useState<Record<number, string>>({});

  const handleClaim = (index: number, cost: number) => {
    if (coins >= cost && !claimed[index]) {
      setCoins(prev => prev - cost);
      // Generate a unique 8-character alphanumeric code
      const uniqueCode = Math.random().toString(36).substring(2, 10).toUpperCase();
      setClaimed(prev => ({ ...prev, [index]: uniqueCode }));
    } else if (coins < cost) {
      alert("Not enough Swastha Coins!");
    }
  };

  const badges = [
    { name: 'Ancient Roots', desc: 'Log 10 Satvik meals', progress: 80, icon: Star, color: 'text-yellow-500', bg: 'bg-yellow-50', grad: 'from-yellow-400 to-orange-500' },
    { name: 'Mandi Master', desc: 'Shop within budget 5 times', progress: 40, icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-50', grad: 'from-emerald-500 to-teal-600' },
    { name: 'Health Warrior', desc: 'Keep a 12-day streak', progress: 100, icon: Zap, color: 'text-orange-500', bg: 'bg-orange-50', grad: 'from-orange-500 to-red-500' },
    { name: 'Thali Pro', desc: 'Scan 50 diverse dishes', progress: 65, icon: Award, color: 'text-indigo-500', bg: 'bg-indigo-50', grad: 'from-indigo-600 to-purple-600' },
  ];

  const coupons = [
    { brand: 'Zepto', offer: '25% OFF Groceries', coins: 500, theme: 'ticket-indigo' },
    { brand: 'Blinkit', offer: 'FREE Delivery', coins: 400, theme: 'ticket-amber' },
    { brand: 'BigBasket', offer: 'Buy 1 Get 1', coins: 800, theme: 'ticket-emerald' },
    { brand: 'Instamart', offer: 'Flat ₹100 Off', coins: 600, theme: 'ticket-amber' },
  ];

  return (
    <div className="space-y-12 max-w-6xl pb-20 dark:text-white transition-colors">
      {/* Header & Balance */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <h2 className="font-display text-5xl uppercase tracking-tighter">Swastha Rewards</h2>
          <p className="text-[0.65rem] font-black tracking-[0.3em] text-gray-400 uppercase">Earn Coins for Healthy Habits</p>
        </div>
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-br from-[#1a1a1a] to-[#0d0d14] p-8 rounded-[40px] text-white flex items-center gap-8 shadow-2xl shadow-gray-300 dark:shadow-black/50"
        >
          <div className="flex items-center gap-4">
             <div className="w-16 h-16 bg-gradient-to-tr from-yellow-400 to-orange-500 rounded-[24px] flex items-center justify-center shadow-lg shadow-orange-500/20">
                <Crown size={32} className="text-white" />
             </div>
             <div>
                <p className="text-4xl font-display leading-none">{coins.toLocaleString()}</p>
                <p className="text-[0.6rem] font-black tracking-widest text-white/30 uppercase mt-1">SWASTHA COINS</p>
             </div>
          </div>
          <button className="px-8 py-4 bg-white/10 hover:bg-white/20 rounded-2xl text-[0.65rem] font-black tracking-widest uppercase border border-white/10 transition-all">Redeem All</button>
        </motion.div>
      </div>

      {/* Badges Section */}
      <div className="space-y-8">
         <div className="flex items-center gap-4 px-4">
            <Trophy size={20} className="text-yellow-500" />
            <h3 className="text-[0.7rem] font-black tracking-[0.3em] uppercase text-gray-400">Milestone Badges</h3>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {badges.map((badge, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-800 rounded-[40px] p-8 border border-gray-100 dark:border-gray-700 shadow-xl shadow-gray-200/30 dark:shadow-black/20 group cursor-pointer relative overflow-hidden transition-colors"
              >
                 <div className="flex justify-between items-start mb-6">
                    <div className={cn("w-16 h-16 rounded-[24px] flex items-center justify-center", badge.bg, "dark:bg-opacity-20")}>
                       <badge.icon size={28} className={badge.color} />
                    </div>
                    <div className="text-right">
                       <p className="text-2xl font-display text-[#0d0d14] dark:text-white">{badge.progress}%</p>
                       <p className="text-[0.55rem] font-black tracking-widest text-gray-300 dark:text-gray-500 uppercase">Complete</p>
                    </div>
                 </div>
                 <h4 className="text-lg font-black tracking-tight text-[#0d0d14] dark:text-white">{badge.name}</h4>
                 <p className="text-[0.65rem] text-gray-400 font-bold uppercase tracking-widest mt-1 mb-8 leading-relaxed">{badge.desc}</p>
                 
                 <div className="h-1.5 bg-gray-50 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${badge.progress}%` }}
                      className={cn("h-full bg-gradient-to-r shadow-lg", badge.grad)} 
                    />
                 </div>
                 
                 {/* Background Elements */}
                 <badge.icon size={120} className="absolute -bottom-6 -right-6 text-gray-50 dark:text-gray-700/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
         </div>
      </div>

      {/* Perks Section (Vertical List) */}
      <div className="space-y-8 mt-12">
         <div className="flex items-center gap-4 px-4">
            <Rocket size={20} className="text-indigo-500" />
            <h3 className="text-[0.7rem] font-black tracking-[0.3em] uppercase text-gray-400">
              Exclusive <span className="highlight-curvy text-xs">Perks</span>
            </h3>
         </div>
         
         <div className="flex flex-col gap-10">
            {coupons.map((c, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex justify-center md:justify-start w-full max-w-2xl mx-auto"
              >
                <div className={cn("ticket-container", c.theme)}>
                  <article className="ticket-main">
                    <div className="ticket-content">
                      <header className="ticket-header">
                        <span className="eyebrow">Valid 2026</span>
                        <span className="serial">No. 00{i+49}</span>
                      </header>

                      <div className="ticket-body">
                        <h1 className="title">{c.brand.split(' ')[0]}<br />{c.brand.split(' ')[1] || 'OFFER'}</h1>
                        <p className="subtitle">{c.offer}</p>
                      </div>

                      <footer className="ticket-footer">
                        <div className="info-block">
                          <span className="label">Coins</span>
                          <span className="value">{c.coins}</span>
                        </div>
                        <div className="info-block">
                          <span className="label">Code</span>
                          <span className={cn("value", claimed[i] ? "text-emerald-500" : "text-gray-400")}>{claimed[i] ? claimed[i] : 'CLAIM TO REVEAL'}</span>
                        </div>
                      </footer>
                    </div>
                    <div className="perforation-line"></div>
                  </article>

                  {claimed[i] ? (
                    <motion.aside 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="ticket-stub flex flex-col items-center justify-center gap-2 bg-emerald-50 dark:bg-emerald-900/20 !border-emerald-200 dark:!border-emerald-800"
                    >
                      <CheckCircle2 size={32} className="text-emerald-500 mb-2" />
                      <p className="stub-text !text-emerald-600 dark:!text-emerald-400">CLAIMED</p>
                    </motion.aside>
                  ) : (
                    <aside 
                      onClick={() => handleClaim(i, c.coins)}
                      className="ticket-stub cursor-pointer hover:brightness-95 active:scale-95 transition-all group"
                    >
                      <div className="foil-seal group-hover:scale-110 transition-transform"></div>
                      <div className="barcode"></div>
                      <p className="stub-text group-hover:text-black dark:group-hover:text-white transition-colors">TAP TO TEAR</p>
                    </aside>
                  )}
                </div>
              </motion.div>
            ))}
         </div>
         
         <motion.div 
           whileHover={{ scale: 1.01 }}
           className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-[40px] p-10 text-white relative overflow-hidden mt-10"
         >
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
               <div className="space-y-4">
                 <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                    <Sparkles size={24} className="text-yellow-300" />
                 </div>
                 <h4 className="text-3xl font-display uppercase leading-tight">Refer a Friend, <br /> Earn 500 Coins</h4>
               </div>
               <button className="px-10 py-5 bg-white text-indigo-700 rounded-2xl font-black text-sm tracking-[0.2em] uppercase hover:bg-gray-50 transition-colors shadow-2xl">Copy Link</button>
            </div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
         </motion.div>
      </div>
    </div>
  );
}
