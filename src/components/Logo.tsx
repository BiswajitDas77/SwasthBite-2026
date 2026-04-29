import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export default function Logo({ className = "", size = 48, showText = true }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 120 120" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-sm"
      >
        {/* Outer Circular Swirls (Green Leaves) */}
        <path d="M60 110C32.3858 110 10 87.6142 10 60C10 32.3858 32.3858 10 60 10" stroke="#165B33" strokeWidth="6" strokeLinecap="round" />
        <path d="M20 60C20 82.0914 37.9086 100 60 100C82.0914 100 100 82.0914 100 60C100 37.9086 82.0914 20 60 20" stroke="#146B3A" strokeWidth="4" strokeLinecap="round" />
        <path d="M30 60C30 76.5685 43.4315 90 60 90C76.5685 90 90 76.5685 90 60" stroke="#71C055" strokeWidth="3" strokeLinecap="round" />
        
        {/* Main Leaves */}
        <path d="M10 60C10 60 20 40 40 40C40 40 30 60 10 60Z" fill="#165B33" />
        <path d="M40 40C40 40 60 10 90 20C90 20 70 50 40 40Z" fill="#146B3A" />
        
        {/* Carrot / Veggie Icon */}
        <path d="M80 30L90 45L75 40Z" fill="#71C055" />
        
        {/* AI Tech Core (Gear/Aperture) */}
        <circle cx="60" cy="45" r="12" stroke="#165B33" strokeWidth="2" strokeDasharray="4 2" fill="none" />
        <circle cx="60" cy="45" r="4" fill="#165B33" />
        <path d="M60 37V33M60 57V53M52 45H48M72 45H68M54 39L51 36M66 51L69 54M54 51L51 54M66 39L69 36" stroke="#165B33" strokeWidth="2" strokeLinecap="round" />

        {/* Plate / Food (Dal & Roti) */}
        <ellipse cx="45" cy="75" rx="10" ry="6" fill="#F4B41A" stroke="#165B33" strokeWidth="2" />
        <circle cx="70" cy="75" r="12" fill="#F4D35E" stroke="#165B33" strokeWidth="2" />
        {/* Roti Dots */}
        <circle cx="67" cy="72" r="1" fill="#165B33" />
        <circle cx="73" cy="74" r="1" fill="#165B33" />
        <circle cx="69" cy="78" r="1" fill="#165B33" />
      </svg>
      
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-baseline">
            <span className="font-display font-bold text-2xl text-[#165B33] leading-none tracking-tight">Swasth</span>
            <span className="font-display font-bold text-2xl text-[#71C055] leading-none tracking-tight">Bite</span>
          </div>
          <span className="text-[0.55rem] font-bold text-gray-500 uppercase tracking-widest mt-0.5">AI Nutritionist for Indian Diets</span>
        </div>
      )}
    </div>
  );
}
