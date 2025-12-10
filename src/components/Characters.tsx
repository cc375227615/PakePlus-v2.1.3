import React from 'react';

// Common props for flexibility
interface IconProps {
  className?: string;
}

export const TangSeng: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 200 220" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="skin-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFF0E0" />
        <stop offset="100%" stopColor="#FFE0BD" />
      </linearGradient>
      <linearGradient id="robe-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#E31837" />
        <stop offset="100%" stopColor="#B91C1C" />
      </linearGradient>
      <filter id="soft-glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="2" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>

    {/* --- BODY --- */}
    <g transform="translate(0, 10)">
        {/* Outer Robe (Red) */}
        <path d="M40 140 Q 30 220 20 220 L 180 220 Q 170 220 160 140 Z" fill="url(#robe-gradient)" stroke="#8B0000" strokeWidth="2" />
        
        {/* Inner Robe (Mustard/Orange) */}
        <path d="M60 140 L 100 220 L 140 140 Z" fill="#F59E0B" />
        <path d="M100 140 L 100 220" stroke="#B45309" strokeWidth="1" />

        {/* Kasaya (Gold Sash with Grid) */}
        <path d="M40 140 Q 60 220 90 220 L 40 220 Z" fill="#FCD34D" stroke="#B45309" strokeWidth="1.5" />
        <path d="M160 140 Q 140 220 110 220 L 160 220 Z" fill="#FCD34D" stroke="#B45309" strokeWidth="1.5" />
        {/* Grid Lines */}
        <path d="M50 160 L 80 160" stroke="#B45309" strokeWidth="1" opacity="0.6"/>
        <path d="M45 190 L 85 190" stroke="#B45309" strokeWidth="1" opacity="0.6"/>
        <path d="M150 160 L 120 160" stroke="#B45309" strokeWidth="1" opacity="0.6"/>
        <path d="M155 190 L 115 190" stroke="#B45309" strokeWidth="1" opacity="0.6"/>
    </g>

    {/* --- HEAD --- */}
    <g transform="translate(0, 5)">
        {/* Ears */}
        <ellipse cx="50" cy="95" rx="12" ry="16" fill="#FFE0BD" />
        <ellipse cx="150" cy="95" rx="12" ry="16" fill="#FFE0BD" />

        {/* Face Shape */}
        <rect x="58" y="60" width="84" height="75" rx="40" ry="40" fill="url(#skin-gradient)" stroke="#E6C0A0" strokeWidth="2" />

        {/* Facial Features */}
        <path d="M85 110 Q 100 120 115 110" fill="none" stroke="#5A3A29" strokeWidth="3" strokeLinecap="round" /> {/* Smile */}
        
        {/* Cheeks */}
        <circle cx="70" cy="102" r="7" fill="#FFB6C1" opacity="0.5" />
        <circle cx="130" cy="102" r="7" fill="#FFB6C1" opacity="0.5" />

        {/* Eyes (Cute Ovals) */}
        <ellipse cx="80" cy="90" rx="6" ry="8" fill="#2D1810" />
        <circle cx="82" cy="88" r="2" fill="white" />
        
        <ellipse cx="120" cy="90" rx="6" ry="8" fill="#2D1810" />
        <circle cx="122" cy="88" r="2" fill="white" />
        
        {/* Bindi */}
        <circle cx="100" cy="75" r="3" fill="#DC2626" />
    </g>

    {/* --- HAT (Five Buddha Crown) --- */}
    <g transform="translate(0, -5)">
        {/* Back fan part */}
        <path d="M40 60 L 40 20 Q 75 -5 100 15 Q 125 -5 160 20 L 160 60 Z" fill="#DC2626" stroke="#F59E0B" strokeWidth="2" />
        
        {/* Front band */}
        <path d="M50 60 Q 100 80 150 60 L 150 40 Q 100 55 50 40 Z" fill="#FCD34D" stroke="#B45309" strokeWidth="1.5" />
        
        {/* Petals */}
        <g transform="translate(0, 5)">
            <path d="M65 40 L 65 15 Q 72 5 80 15 L 80 40" fill="#FCD34D" stroke="#B45309" strokeWidth="1" />
            <circle cx="72.5" cy="15" r="4" fill="#FFFFFF" />
            
            <path d="M92 40 L 92 10 Q 100 0 108 10 L 108 40" fill="#FCD34D" stroke="#B45309" strokeWidth="1" />
            <circle cx="100" cy="10" r="5" fill="#FFFFFF" />
            
            <path d="M120 40 L 120 15 Q 128 5 135 15 L 135 40" fill="#FCD34D" stroke="#B45309" strokeWidth="1" />
            <circle cx="127.5" cy="15" r="4" fill="#FFFFFF" />
        </g>
    </g>

    {/* --- HANDS (Praying) --- */}
    <g transform="translate(0, 15)">
        <path d="M85 140 Q 100 120 115 140 L 115 160 L 85 160 Z" fill="#FFE0BD" stroke="#E6C0A0" strokeWidth="1" />
        <path d="M100 130 L 100 160" stroke="#E6C0A0" strokeWidth="1" />
    </g>
  </svg>
);

export const SunWukong: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 200 220" className={className} xmlns="http://www.w3.org/2000/svg">
     {/* Body */}
     <path d="M60 150 Q 50 220 40 220 L 160 220 Q 150 220 140 150 Z" fill="#F59E0B" stroke="#B45309" strokeWidth="2" />
     {/* Scarf */}
     <path d="M70 150 Q 100 180 130 150 L 115 180 L 85 180 Z" fill="#DC2626" />

     {/* Head/Fur */}
     <path d="M60 80 Q 50 50 100 40 Q 150 50 140 80 Q 150 110 120 130 Q 100 140 80 130 Q 50 110 60 80" fill="#92400E" stroke="#78350F" strokeWidth="2" />

     {/* Face Mask (Heart Shapeish) */}
     <path d="M70 75 Q 70 55 90 65 Q 100 70 110 65 Q 130 55 130 75 Q 135 95 120 110 Q 100 125 80 110 Q 65 95 70 75" fill="#FFE4C4" />

     {/* Eyes */}
     <ellipse cx="85" cy="85" rx="6" ry="8" fill="white" />
     <circle cx="85" cy="85" r="3" fill="black" />
     <ellipse cx="115" cy="85" rx="6" ry="8" fill="white" />
     <circle cx="115" cy="85" r="3" fill="black" />

     {/* Mouth */}
     <path d="M90 105 Q 100 110 110 105" fill="none" stroke="#5A3A29" strokeWidth="2" />

     {/* Golden Headband (Fillet) */}
     <path d="M65 60 Q 100 45 135 60" fill="none" stroke="#FCD34D" strokeWidth="6" strokeLinecap="round" />
     <circle cx="100" cy="52" r="6" fill="#FCD34D" stroke="#B45309" strokeWidth="1" />
     
     {/* Hands */}
     <circle cx="50" cy="180" r="15" fill="#FFE4C4" stroke="#D97706" strokeWidth="1" />
     <circle cx="150" cy="180" r="15" fill="#FFE4C4" stroke="#D97706" strokeWidth="1" />
  </svg>
);

export const ZhuBajie: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 200 220" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* Ears */}
    <path d="M30 70 Q 10 50 20 90 Q 30 130 50 110" fill="#FECDD3" stroke="#F43F5E" strokeWidth="2" />
    <path d="M170 70 Q 190 50 180 90 Q 170 130 150 110" fill="#FECDD3" stroke="#F43F5E" strokeWidth="2" />

    {/* Body */}
    <path d="M50 150 Q 30 220 20 220 L 180 220 Q 170 220 150 150 Z" fill="#1F2937" stroke="#000" strokeWidth="2" />
    {/* Belly */}
    <ellipse cx="100" cy="220" rx="40" ry="30" fill="#000" opacity="0.3" />

    {/* Head */}
    <circle cx="100" cy="100" r="50" fill="#FFE4E6" stroke="#F43F5E" strokeWidth="2" />

    {/* Hat */}
    <path d="M65 65 L 135 65 L 125 35 L 75 35 Z" fill="#1F2937" stroke="#000" strokeWidth="2" />
    <rect x="70" y="35" width="60" height="5" fill="#374151" />

    {/* Snout */}
    <ellipse cx="100" cy="110" rx="18" ry="14" fill="#FDA4AF" stroke="#BE123C" strokeWidth="2" />
    <circle cx="94" cy="110" r="3.5" fill="#BE123C" />
    <circle cx="106" cy="110" r="3.5" fill="#BE123C" />

    {/* Eyes */}
    <path d="M80 85 Q 88 80 96 85" fill="none" stroke="#000" strokeWidth="2" />
    <path d="M104 85 Q 112 80 120 85" fill="none" stroke="#000" strokeWidth="2" />

    {/* Mouth */}
    <path d="M90 135 Q 100 140 110 135" fill="none" stroke="#BE123C" strokeWidth="2" />
  </svg>
);
