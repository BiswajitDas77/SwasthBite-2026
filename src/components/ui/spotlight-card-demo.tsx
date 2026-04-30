import { GlowCard } from "./spotlight-card";

export function SpotlightCardDemo(){
  return(
    <div className="w-full h-screen flex flex-wrap items-center justify-center gap-10 bg-[#0d0d14] p-10">
      <GlowCard glowColor="blue">
        <div className="flex flex-col items-center justify-center h-full text-white p-6 text-center">
            <h3 className="text-2xl font-black mb-2">Ocean Glow</h3>
            <p className="text-xs text-white/60">Dynamic blue spotlight effect.</p>
        </div>
      </GlowCard>
      
      <GlowCard glowColor="purple">
         <div className="flex flex-col items-center justify-center h-full text-white p-6 text-center">
            <h3 className="text-2xl font-black mb-2">Royal Purple</h3>
            <p className="text-xs text-white/60">Mystical purple aura.</p>
        </div>
      </GlowCard>
      
      <GlowCard glowColor="green">
         <div className="flex flex-col items-center justify-center h-full text-white p-6 text-center">
            <h3 className="text-2xl font-black mb-2">Emerald Forest</h3>
            <p className="text-xs text-white/60">Natural green radiance.</p>
        </div>
      </GlowCard>
    </div>
  );
};
