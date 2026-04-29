import React, { useEffect, useState } from 'react';
import './theme-toggle.css';

export default function ThemeToggle() {
  // Default to Light mode (checked = true in this toggle's logic means Light Mode / Day)
  const [isLight, setIsLight] = useState(true);

  useEffect(() => {
    // Standard Tailwind dark mode logic
    if (isLight) {
      document.documentElement.classList.remove('dark');
      // Set background colors as requested by user JS (can also be handled by Tailwind)
      document.body.style.backgroundColor = '#E3FFE1';
    } else {
      document.documentElement.classList.add('dark');
      document.body.style.backgroundColor = '#9AB5EC';
    }

    // Update SVG Gradients
    const stop1 = document.getElementById('stop1');
    const stop2 = document.getElementById('stop2');
    const stop1Circle = document.getElementById('stop1-circle');
    const stop2Circle = document.getElementById('stop2-circle');
    const stop1Mountain1 = document.getElementById('mountain1-stop1');
    const stop2Mountain1 = document.getElementById('mountain1-stop2');
    const stop1Mountain2 = document.getElementById('mountain2-stop1');
    const stop2Mountain2 = document.getElementById('mountain2-stop2');
    const stop1Mountain3 = document.getElementById('mountain3-stop1');
    const stop2Mountain3 = document.getElementById('mountain3-stop2');
    const stop1Mountain4 = document.getElementById('mountain4-stop1');
    const stop2Mountain4 = document.getElementById('mountain4-stop2');

    if (isLight) {
      stop1?.setAttribute('stop-color', '#9FDEF2');
      stop2?.setAttribute('stop-color', '#A8FFAC');
      stop1Circle?.setAttribute('stop-color', '#F6F061');
      stop2Circle?.setAttribute('stop-color', '#61EDF6');
      stop1Mountain1?.setAttribute('stop-color', '#86D2A0');
      stop2Mountain1?.setAttribute('stop-color', '#517D91');
      stop1Mountain2?.setAttribute('stop-color', '#86D2A0');
      stop2Mountain2?.setAttribute('stop-color', '#517D91');
      stop1Mountain3?.setAttribute('stop-color', '#86D2A0');
      stop2Mountain3?.setAttribute('stop-color', '#517D91');
      stop1Mountain4?.setAttribute('stop-color', '#86D2A0');
      stop2Mountain4?.setAttribute('stop-color', '#517D91');
    } else {
      stop1?.setAttribute('stop-color', '#6A86EB');
      stop2?.setAttribute('stop-color', '#010203');
      stop1Circle?.setAttribute('stop-color', '#A5C5EB'); 
      stop2Circle?.setAttribute('stop-color', '#51EAFF');
      stop1Mountain1?.setAttribute('stop-color', '#6783CA');
      stop2Mountain1?.setAttribute('stop-color', '#271B59');
      stop1Mountain2?.setAttribute('stop-color', '#6783CA');
      stop2Mountain2?.setAttribute('stop-color', '#271B59');
      stop1Mountain3?.setAttribute('stop-color', '#6783CA');
      stop2Mountain3?.setAttribute('stop-color', '#271B59');
      stop1Mountain4?.setAttribute('stop-color', '#6783CA');
      stop2Mountain4?.setAttribute('stop-color', '#271B59');
    }
  }, [isLight]);

  return (
    <div className="theme-switch-container">
      <label className="theme-switch">
        <input 
          id="theme-toggle" 
          type="checkbox" 
          checked={isLight}
          onChange={(e) => setIsLight(e.target.checked)}
        />
        <span className="theme-slider"></span>
        <svg className="theme-slider-bg" width="221" height="97" viewBox="0 0 221 97" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 13.5V28.5L8.5 68C23.6667 73.5 55.1 84.8 59.5 86C65 87.5 113.5 95.5 116 96.5C118 97.3 186.5 72.1667 220.5 59.5L209.5 17.5L165.5 10.5L121.5 6.5L105 8.5L79.5 0L0 13.5Z" fill="url(#paint0_linear_208_217)"/>
          <defs>
            <linearGradient id="paint0_linear_208_217" x1="110.25" y1="0" x2="110.25" y2="96.5187" gradientUnits="userSpaceOnUse">
              <stop id="stop1" stopColor="#6A86EB"/>
              <stop id="stop2" offset="0.553516" stopColor="#010203"/>
            </linearGradient>
          </defs>
        </svg>
        <svg className="theme-slider-circle" width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="21" cy="21" r="21" fill="url(#paint0_linear_204_96)"/>
          <defs>
            <linearGradient id="paint0_linear_204_96" x1="21" y1="-4.5" x2="21" y2="42" gradientUnits="userSpaceOnUse">
              <stop id="stop1-circle" offset="0.261829" stopColor="#A5C5EB"/>
              <stop id="stop2-circle" offset="0.699362" stopColor="#51EAFF" stopOpacity="0"/>
            </linearGradient>
          </defs>
        </svg>
        <div className="theme-circle theme-circle-1 theme-size-2"></div>
        <div className="theme-circle theme-circle-2 theme-size-1"></div>
        <div className="theme-circle theme-circle-3 theme-size-4"></div>
        <div className="theme-circle theme-circle-4 theme-size-1"></div>
        <div className="theme-circle theme-circle-5 theme-size-3"></div>
        <div className="theme-circle theme-circle-6 theme-size-3"></div>
        <div className="theme-circle theme-circle-7 theme-size-2"></div>
        <div className="theme-circle theme-circle-8 theme-size-2"></div>
        <div className="theme-circle theme-circle-9 theme-size-4"></div>
        <div className="theme-circle theme-circle-10 theme-size-1"></div>
        <div className="theme-circle theme-circle-11 theme-size-3"></div>
        <svg className="theme-cloud theme-cloud-1" width="21" height="7" viewBox="0 0 21 7" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M21 6.86046H0C0.252123 4.92493 1.90727 3.43021 3.91152 3.43021C4.06622 3.43021 4.21883 3.43912 4.36888 3.45644C5.37417 1.40919 7.47974 0 9.91444 0C12.6817 0 15.0237 1.82039 15.8084 4.32896C16.2197 4.19101 16.6601 4.11626 17.1179 4.11626C18.9102 4.11626 20.4349 5.2617 21 6.86046Z" fill="url(#paint0_linear_204_62)"/>
          <defs>
            <linearGradient id="paint0_linear_204_62" x1="10.5" y1="0" x2="10.5" y2="6.86046" gradientUnits="userSpaceOnUse">
              <stop stopColor="#A8E0FF"/>
              <stop offset="1" stopColor="#7FE0FF" stopOpacity="0"/>
            </linearGradient>
          </defs>
        </svg>
        <svg className="theme-cloud theme-cloud-2" width="41" height="14" viewBox="0 0 41 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M41 13.3943H0C0.492246 9.61538 3.72371 6.69713 7.63678 6.69713C7.93879 6.69713 8.23674 6.71451 8.52968 6.74833C10.4924 2.7513 14.6033 0 19.3567 0C24.7594 0 29.332 3.55411 30.8639 8.45182C31.6671 8.18248 32.5269 8.03655 33.4207 8.03655C36.9199 8.03655 39.8967 10.2729 41 13.3943Z" fill="url(#paint0_linear_204_68)"/>
          <defs>
            <linearGradient id="paint0_linear_204_68" x1="20.5" y1="0" x2="20.5" y2="13.3943" gradientUnits="userSpaceOnUse">
              <stop stopColor="#94DFFF"/>
              <stop offset="1" stopColor="#7FE0FF" stopOpacity="0"/>
            </linearGradient>
          </defs>
        </svg>
        <svg className="theme-cloud theme-cloud-3" width="21" height="7" viewBox="0 0 21 7" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M21 6.86046H0C0.252123 4.92493 1.90727 3.43021 3.91152 3.43021C4.06622 3.43021 4.21883 3.43912 4.36888 3.45644C5.37417 1.40919 7.47974 0 9.91444 0C12.6817 0 15.0237 1.82039 15.8084 4.32896C16.2197 4.19101 16.6601 4.11626 17.1179 4.11626C18.9102 4.11626 20.4349 5.2617 21 6.86046Z" fill="url(#paint0_linear_204_56)"/>
          <defs>
            <linearGradient id="paint0_linear_204_56" x1="10.5" y1="0" x2="10.5" y2="6.86046" gradientUnits="userSpaceOnUse">
              <stop stopColor="#A8E0FF"/>
              <stop offset="1" stopColor="#7FE0FF" stopOpacity="0"/>
            </linearGradient>
          </defs>
        </svg>
        <svg className="theme-mountain theme-mountain-1" width="115" height="72" viewBox="0 0 115 72" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.8763 34.7586L0 68.8965L115 72L88.414 44.069H85.3226L72.3387 24.2069H66.1559L49.4624 0L30.914 34.7586H22.8763Z" fill="url(#paint0_linear_217_219)"/>
          <defs>
            <linearGradient id="paint0_linear_217_219" x1="57.5" y1="0" x2="57.5" y2="72" gradientUnits="userSpaceOnUse">
              <stop id="mountain1-stop1" offset="0.290234" stopColor="#6783CA"/>
              <stop id="mountain1-stop2" offset="1" stopColor="#271B59"/>
            </linearGradient>
          </defs>
        </svg>
        <svg className="theme-mountain theme-mountain-2" width="93" height="58" viewBox="0 0 93 58" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18.5 28L0 55.5L93 58L71.5 35.5H69L58.5 19.5H53.5L40 0L25 28H18.5Z" fill="url(#paint0_linear_217_220)"/>
          <defs>
            <linearGradient id="paint0_linear_217_220" x1="46.5" y1="0" x2="46.5" y2="58" gradientUnits="userSpaceOnUse">
              <stop id="mountain2-stop1" offset="0.290234" stopColor="#6783CA"/>
              <stop id="mountain2-stop2" offset="1" stopColor="#271B59"/>
            </linearGradient>
          </defs>
        </svg>
        <svg className="theme-mountain theme-mountain-3" width="93" height="58" viewBox="0 0 93 58" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18.5 28L0 55.5L93 58L71.5 35.5H69L58.5 19.5H53.5L40 0L25 28H18.5Z" fill="url(#paint0_linear_217_221)"/>
          <defs>
            <linearGradient id="paint0_linear_217_221" x1="46.5" y1="0" x2="46.5" y2="58" gradientUnits="userSpaceOnUse">
              <stop id="mountain3-stop1" offset="0.290234" stopColor="#6783CA"/>
              <stop id="mountain3-stop2" offset="1" stopColor="#271B59"/>
            </linearGradient>
          </defs>
        </svg>
        <svg className="theme-mountain theme-mountain-4" width="115" height="72" viewBox="0 0 115 72" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.8763 34.7586L0 68.8965L115 72L88.414 44.069H85.3226L72.3387 24.2069H66.1559L49.4624 0L30.914 34.7586H22.8763Z" fill="url(#paint0_linear_217_222)"/>
          <defs>
            <linearGradient id="paint0_linear_217_222" x1="57.5" y1="0" x2="57.5" y2="72" gradientUnits="userSpaceOnUse">
              <stop id="mountain4-stop1" offset="0.290234" stopColor="#6783CA"/>
              <stop id="mountain4-stop2" offset="1" stopColor="#271B59"/>
            </linearGradient>
          </defs>
        </svg>
      </label>
    </div>
  );
}
