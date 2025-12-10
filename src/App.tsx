import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Play, ArrowLeft, Settings2, Target } from 'lucide-react';
import { NameDisplay } from './components/NameDisplay';
import { StudentManager } from './components/StudentManager';
import { TangSeng, SunWukong, ZhuBajie } from './components/Characters';
import { Student, AppState } from './types';
import confetti from 'canvas-confetti';

// --- CONFIGURATION ---
// CHANGED: Switched to an MP3 file for better cross-browser compatibility (Safari/iOS).
// Replace this with your specific "Journey to the West" music URL.
const BGM_URL = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"; 

// Default list to show initially if empty
const DEFAULT_STUDENTS: Student[] = [
  { id: '1', name: '刘雨欣', active: true },
  { id: '2', name: '陈思明', active: true },
  { id: '3', name: '章宇贤', active: true },
  { id: '4', name: '马琦玉', active: true },
  { id: '5', name: '范思量', active: true },
];

const App: React.FC = () => {
  const [students, setStudents] = useState<Student[]>(DEFAULT_STUDENTS);
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [currentName, setCurrentName] = useState<string>("准备");
  const [isManagerOpen, setIsManagerOpen] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  
  const timerRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize Audio
  useEffect(() => {
    // Create Audio instance only once
    const audio = new Audio(BGM_URL);
    audio.loop = true;      // Loop the music
    audio.volume = 0.5;     // 50% volume
    audio.preload = 'auto'; // Preload for instant playback
    
    audioRef.current = audio;
    
    return () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current = null;
        }
    };
  }, []);

  // Filter active students
  const activeStudents = students.filter(s => s.active);

  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#FFD700', '#FF0000', '#FFFFFF']
      });
      confetti({
        particleCount: 5,
        angle: 120, spread: 55,
        origin: { x: 1 },
        colors: ['#FFD700', '#FF0000', '#FFFFFF']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  const startAutoDraw = useCallback(() => {
    if (activeStudents.length === 0) {
      alert("没有可抽取的学生！请先点击“范围”导入或选择学生。");
      setIsManagerOpen(true);
      return;
    }
    
    // Transition to active view
    setShowIntro(false);
    setAppState(AppState.ROLLING);
    
    // --- MUSIC START ---
    if (audioRef.current) {
        audioRef.current.currentTime = 0; // Start from beginning
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.warn("Audio playback prevented:", error);
                // Auto-play policy might block this if not directly triggered by user
            });
        }
    }

    // Clear any existing timers
    if (timerRef.current) clearInterval(timerRef.current);

    // Fast rolling effect - Infinite loop until stopped manually
    timerRef.current = window.setInterval(() => {
      const randomIndex = Math.floor(Math.random() * activeStudents.length);
      setCurrentName(activeStudents[randomIndex].name);
    }, 50); 

  }, [activeStudents]);

  const stopDraw = useCallback(() => {
    if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
    }

    // --- MUSIC STOP ---
    if (audioRef.current) {
        audioRef.current.pause();
    }
    
    // Ensure we land on a valid name (re-pick to be safe)
    if (activeStudents.length > 0) {
        const finalIndex = Math.floor(Math.random() * activeStudents.length);
        setCurrentName(activeStudents[finalIndex].name);
    }
    
    setAppState(AppState.SELECTED);
    triggerConfetti();
  }, [activeStudents]);

  const handleBack = () => {
    // Clear any running timers
    if (timerRef.current) clearInterval(timerRef.current);

    // --- MUSIC RESET ---
    if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0; // Reset to start for next time
    }
    
    setAppState(AppState.IDLE);
    setShowIntro(true);
    setCurrentName("准备");
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#C82E26] relative overflow-hidden flex flex-col font-sans selection:bg-yellow-300 selection:text-red-900">
      
      {/* ==================== SCREEN 1: INTRO (TANG SENG) ==================== */}
      {showIntro && (
        <div className="flex-1 w-full h-full flex flex-col md:flex-row animate-in fade-in duration-500">
          
          {/* LEFT SIDE: Text & Controls */}
          <div className="flex-1 flex flex-col justify-center px-8 md:pl-24 z-20 pt-10 md:pt-0">
             <div className="space-y-4 md:space-y-6 text-left">
               <h1 className="text-6xl md:text-8xl font-bold text-[#FFFDD0] tracking-wide drop-shadow-md font-festive leading-tight">
                 徒儿们，<br/>书背了吗
               </h1>
               <h2 className="text-3xl md:text-5xl font-bold text-[#FFD700] tracking-wider drop-shadow-sm font-festive">
                 我要开始抽背了哦
               </h2>
             </div>

             <div className="mt-12 md:mt-20 flex flex-wrap gap-6">
               {/* Start Button */}
               <button 
                 onClick={startAutoDraw}
                 className="group relative bg-white text-[#C82E26] text-2xl md:text-3xl font-black py-4 px-10 rounded-full border-b-[6px] border-red-900 shadow-xl active:border-b-0 active:translate-y-2 transition-all hover:bg-gray-50 flex items-center gap-2 font-festive min-w-[200px] justify-center"
               >
                 <Play className="w-6 h-6 fill-current" />
                 开始抽背
               </button>

               {/* Scope Button */}
               <button 
                 onClick={() => setIsManagerOpen(true)}
                 className="group relative bg-white text-[#C82E26] text-2xl md:text-3xl font-black py-4 px-10 rounded-full border-b-[6px] border-red-900 shadow-xl active:border-b-0 active:translate-y-2 transition-all hover:bg-gray-50 flex items-center gap-2 font-festive min-w-[160px] justify-center"
               >
                 <Settings2 className="w-6 h-6" />
                 范围
               </button>
             </div>
          </div>

          {/* RIGHT SIDE: Character Image */}
          <div className="flex-1 flex justify-center md:justify-end items-end relative overflow-hidden md:overflow-visible mt-4 md:mt-0">
             {/* Character anchored to bottom right, lifted up slightly */}
             <div className="w-[85%] md:w-[95%] max-w-[800px] relative translate-y-0 md:-translate-y-[10%] md:mr-[-5%] lg:mr-0 pointer-events-none">
               <TangSeng className="w-full h-auto drop-shadow-2xl" />
             </div>
          </div>
        </div>
      )}

      {/* ==================== SCREEN 2: ACTIVE (TRIO HOLDING BOARD) ==================== */}
      {!showIntro && (
        <div className="fixed inset-0 flex flex-col z-10 animate-in fade-in slide-in-from-right duration-500">
           
           {/* Header Area */}
           <div className="absolute top-0 left-0 right-0 p-4 md:p-8 flex justify-between items-start z-50">
              {/* Left: Title */}
              <h1 className="text-3xl md:text-5xl font-serif font-bold text-[#FFFDD0] drop-shadow-md whitespace-nowrap font-festive mt-2">
                今天背书的是
              </h1>
              
              {/* Right: Controls Stack */}
              <div className="flex flex-col gap-4 items-end">
                  {/* Back Button */}
                  <button 
                    onClick={handleBack}
                    className="cursor-pointer bg-white/90 hover:bg-white text-red-700 text-lg md:text-xl font-bold py-2 px-6 rounded-full border-2 border-red-800 shadow-md transition-transform active:scale-95 flex items-center gap-2 pointer-events-auto font-festive"
                  >
                    <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
                    返回
                  </button>

                  {/* Manual Stop Button (Only visible when rolling) */}
                  {appState === AppState.ROLLING && (
                    <button 
                        onClick={stopDraw}
                        className="cursor-pointer bg-[#FFD700] hover:bg-[#FFC200] text-red-900 text-2xl md:text-3xl font-black py-3 px-8 rounded-full border-b-[4px] border-red-900 shadow-xl active:border-b-0 active:translate-y-1 transition-all flex items-center gap-2 pointer-events-auto font-festive animate-bounce-slight"
                    >
                        <Target className="w-6 h-6" />
                        就是TA
                    </button>
                  )}
              </div>
           </div>

           {/* Center Content: Characters Group + Name Board */}
           <div className="flex-1 flex items-center justify-center w-full h-full relative">
              
              <div className="relative w-full max-w-4xl flex flex-col items-center justify-center scale-90 md:scale-100 mt-10">
                  
                  {/* The Characters (Behind) */}
                  <div className="flex items-end justify-center -mb-24 sm:-mb-32 md:-mb-40 z-0 space-x-[-30px] sm:space-x-[-10px]">
                     {/* Sun Wukong (Left) */}
                     <div className="w-32 sm:w-44 md:w-56 transform -rotate-12 translate-y-8 origin-bottom-right">
                        <SunWukong className="w-full h-full drop-shadow-lg" />
                     </div>

                     {/* Tang Seng (Center) */}
                     <div className="w-48 sm:w-64 md:w-80 z-10 -translate-y-6">
                        <TangSeng className="w-full h-full drop-shadow-xl" />
                     </div>

                     {/* Zhu Bajie (Right) */}
                     <div className="w-32 sm:w-44 md:w-56 transform rotate-12 translate-y-8 origin-bottom-left">
                        <ZhuBajie className="w-full h-full drop-shadow-lg" />
                     </div>
                  </div>

                  {/* The Board (In Front) */}
                  <div className="relative z-20 w-[90%] md:w-full max-w-xl px-4">
                     <NameDisplay currentName={currentName} state={appState} />
                  </div>
                  
                  {/* Celebration Text */}
                  <div className="h-20 mt-6 flex justify-center items-center">
                    {appState === AppState.SELECTED && (
                       <div className="text-[#FFFDD0] text-5xl md:text-6xl font-bold animate-bounce drop-shadow-lg font-festive stroke-black stroke-2">
                          🎉 抽中啦！ 🎉
                       </div>
                    )}
                  </div>

              </div>
           </div>
        </div>
      )}

      {/* Modals */}
      <StudentManager 
        isOpen={isManagerOpen} 
        onClose={() => setIsManagerOpen(false)}
        students={students}
        setStudents={setStudents}
      />

    </div>
  );
};

export default App;