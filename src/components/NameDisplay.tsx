import React from 'react';
import { AppState } from '../types';

interface NameDisplayProps {
  currentName: string;
  state: AppState;
}

export const NameDisplay: React.FC<NameDisplayProps> = ({ currentName, state }) => {
  return (
    <div className="w-full aspect-[16/9] md:aspect-[2/1] bg-[#FFF8E7] rounded-lg border-[12px] md:border-[16px] border-[#EDA545] shadow-2xl flex items-center justify-center relative overflow-hidden ring-4 ring-orange-800/20">
      
      {/* Inner Frame Line */}
      <div className="absolute inset-2 border-2 border-orange-200 pointer-events-none"></div>

      {/* The Name */}
      <div className="relative z-10 w-full text-center px-4">
        <span className={`
          block font-sans font-extrabold text-[#1a1a1a] leading-none
          transition-all duration-100
          ${currentName.length > 3 ? 'text-6xl md:text-8xl' : 'text-7xl md:text-9xl'}
          ${state === AppState.ROLLING ? 'opacity-80 blur-[2px] scale-95' : 'opacity-100 blur-0 scale-100'}
          ${state === AppState.SELECTED ? 'scale-110 drop-shadow-2xl' : ''}
        `}>
          {currentName}
        </span>
      </div>

      {/* Shine/Reflection effect on the "Glass" or surface */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/30 to-transparent pointer-events-none"></div>
      
    </div>
  );
};
