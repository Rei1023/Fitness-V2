import React, { useState, useEffect } from 'react';
import { BodyPart, ViewState, WorkoutPlan, HistoryRecord, ExerciseCategory } from './types';
import { PARTS_DISPLAY } from './constants';
import { generateWorkout } from './services/workoutGenerator';
import Metronome from './components/Metronome';

// --- Icons (Matching Prototype SVGs) ---
const Icons = {
  Moon: () => <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>,
  Sun: () => <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>,
  History: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>,
  Back: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"></path></svg>,
  Play: () => <span className="text-xl">▶</span>,
  Pause: () => <span className="text-xl">⏸</span>,
  Check: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>,
  Trash: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>,
  Search: () => <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>,
  Timer: () => <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"/></svg>,
  Swap: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>,
  Plus: () => <span className="text-xl sm:text-2xl font-bold">+</span>,
  Minus: () => <span className="text-xl sm:text-2xl font-bold">−</span>
}

const App = () => {
  // State
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [view, setView] = useState<ViewState>(ViewState.SETUP);
  const [selectedParts, setSelectedParts] = useState<BodyPart[]>([]);
  const [duration, setDuration] = useState<number>(45);
  const [workout, setWorkout] = useState<WorkoutPlan | null>(null);
  const [activeExerciseIndex, setActiveExerciseIndex] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [history, setHistory] = useState<HistoryRecord[]>([]);
  
  // Effects
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) setTheme(savedTheme as 'light' | 'dark');
    
    const savedHistory = localStorage.getItem('history');
    if (savedHistory) setHistory(JSON.parse(savedHistory));
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.getElementById('meta-theme-color')?.setAttribute("content", '#0F172A');
    } else {
      document.documentElement.classList.remove('dark');
      document.getElementById('meta-theme-color')?.setAttribute("content", '#F3F4F6');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Actions
  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  
  const togglePart = (part: BodyPart) => {
    setSelectedParts(prev => 
      prev.includes(part) ? prev.filter(p => p !== part) : [...prev, part]
    );
  };

  const handleCreateWorkout = () => {
    if (selectedParts.length === 0) return;
    const newWorkout = generateWorkout(selectedParts, duration);
    setWorkout(newWorkout);
    setActiveExerciseIndex(0);
    setView(ViewState.PLAN);
  };

  const startFocusMode = (index?: number) => {
    if (typeof index === 'number') setActiveExerciseIndex(index);
    setIsTimerRunning(false);
    setView(ViewState.FOCUS);
  };

  const closeFocusMode = () => {
    setIsTimerRunning(false);
    setView(ViewState.PLAN);
  };

  const completeCurrentExercise = () => {
     if (!workout) return;
     const isLast = activeExerciseIndex === workout.exercises.length - 1;
     if (isLast) {
       finishWorkout();
     } else {
       setActiveExerciseIndex(prev => prev + 1);
       setIsTimerRunning(false);
     }
  };

  const finishWorkout = () => {
    if (!workout) return;
    const record: HistoryRecord = {
      id: workout.id,
      date: Date.now(),
      duration: workout.totalDuration,
      parts: workout.selectedParts,
      completedRate: Math.round(((activeExerciseIndex + 1) / workout.exercises.length) * 100),
      exercises: workout.exercises
    };
    const newHistory = [record, ...history];
    setHistory(newHistory);
    localStorage.setItem('history', JSON.stringify(newHistory));
    setWorkout(null);
    setSelectedParts([]);
    setView(ViewState.SETUP);
    alert('訓練完成！已儲存至歷史紀錄。');
  };

  const deleteHistory = (id: string) => {
    if (confirm('確定要刪除此紀錄嗎？')) {
      const newHistory = history.filter(h => h.id !== id);
      setHistory(newHistory);
      localStorage.setItem('history', JSON.stringify(newHistory));
    }
  };

  // --- Components ---

  const Header = ({ title, showHistory = true, onBack }: { title?: string, showHistory?: boolean, onBack?: () => void }) => (
    <header className="flex-none px-4 py-3 sm:px-6 sm:py-5 flex items-center justify-between glass-header z-20 sticky top-0">
        <div className="flex-1 flex justify-start z-10 min-w-[40px]">
            {onBack && (
                <button onClick={onBack} className="glass-btn w-10 h-10 rounded-full flex items-center justify-center text-ui-sub hover:text-ui-text active:scale-95 transition-colors">
                    <Icons.Back />
                </button>
            )}
        </div>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 flex items-center gap-2 pointer-events-none">
            <span className="text-2xl filter drop-shadow-sm">🏐</span>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-ui-text drop-shadow-sm">{title || 'Fitness'}</h1>
        </div>

        <div className="flex-1 flex justify-end z-10 gap-2 items-center">
             <button onClick={toggleTheme} className="glass-btn w-10 h-10 rounded-full flex items-center justify-center text-xl hover:text-brand-text active:scale-95 transition-colors">
                {theme === 'dark' ? <Icons.Moon /> : <Icons.Sun />}
             </button>
             {showHistory && (
                 <button onClick={() => setView(ViewState.HISTORY)} className="glass-btn w-10 h-10 rounded-full flex items-center justify-center text-ui-sub hover:text-brand-text active:scale-95 transition-colors">
                    <Icons.History />
                 </button>
             )}
        </div>
    </header>
  );

  // Reusable Layout Wrapper for Scrollable Content
  const MainLayout = ({ children, title, onBack, showHistory = true }: any) => (
    <div className="flex flex-col h-full w-full">
        <Header title={title} onBack={onBack} showHistory={showHistory} />
        <main className="flex-1 overflow-y-auto no-scrollbar relative w-full p-4 sm:p-6">
            {children}
        </main>
    </div>
  );

  const SetupView = () => (
    <MainLayout>
      <div className="flex flex-col gap-4 sm:gap-6 min-h-full pb-20 fade-in">
        <div className="space-y-1 mt-1 sm:mt-2 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-ui-text tracking-tight drop-shadow-md">今日訓練</h2>
            <p className="text-ui-sub text-xs sm:text-sm font-medium opacity-80">打造您的專屬菜單</p>
        </div>

        {/* Body Parts */}
        <div className="space-y-3 sm:space-y-4">
            <label className="text-xl sm:text-2xl font-bold text-brand uppercase tracking-widest ml-1 flex items-center gap-2 opacity-90 drop-shadow-sm">
                <span className="w-1.5 h-1.5 bg-brand rounded-full shadow-glow"></span> 訓練部位
            </label>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
               {PARTS_DISPLAY.map(part => {
                 const isSelected = selectedParts.includes(part.id);
                 return (
                   <div 
                      key={part.id}
                      onClick={() => togglePart(part.id)}
                      className={`
                        ${isSelected ? 'glass-btn-primary border-brand/50 shadow-glow ring-2 ring-brand ring-opacity-50' : 'glass-btn hover:bg-white/10'}
                        rounded-2xl p-4 transition-all duration-300 cursor-pointer active:scale-95 flex flex-row items-center justify-start gap-4 pl-6 h-24 relative overflow-hidden group border border-white/20
                      `}
                   >
                        <div className="z-10 flex flex-row items-center gap-3 w-full">
                            <span className={`text-3xl filter drop-shadow-sm transition-all duration-300 flex-shrink-0 ${isSelected ? 'scale-110 opacity-100' : 'opacity-70 grayscale'}`}>{part.icon}</span>
                            <div className={`font-bold tracking-wide uppercase leading-tight ${isSelected ? 'text-white' : 'text-ui-sub'} ${part.label.length > 5 && !part.label.includes('/') ? 'text-sm' : 'text-lg'}`}>
                              {part.label.includes('/') ? (
                                <div className="flex flex-col items-start">
                                  <span>{part.label.split('/')[0]}</span>
                                  <span>{part.label.split('/')[1]}</span>
                                </div>
                              ) : (
                                part.label
                              )}
                            </div>
                        </div>
                        {isSelected && <div className="absolute top-4 right-4 w-2 h-2 bg-white rounded-full shadow-glow"></div>}
                   </div>
                 )
               })}
            </div>
        </div>

        {/* Duration */}
        <div className="space-y-3 sm:space-y-4">
            <label className="text-xl sm:text-2xl font-bold text-brand uppercase tracking-widest ml-1 flex items-center gap-2 opacity-90 drop-shadow-sm">
                <span className="w-1.5 h-1.5 bg-brand rounded-full shadow-glow"></span> 訓練時間
            </label>
            <div className="glass-panel p-2 rounded-[1.5rem] sm:rounded-[2rem] flex items-center justify-between h-16 sm:h-20 relative overflow-hidden">
                <button 
                  onClick={() => setDuration(Math.max(20, duration - 5))}
                  className="w-14 sm:w-16 h-full rounded-[1.2rem] sm:rounded-[1.5rem] bg-ui-surface hover:bg-ui-card flex items-center justify-center active:scale-95 text-brand font-bold transition-colors border border-ui-border"
                >
                    <Icons.Minus />
                </button>
                <div className="flex flex-col items-center">
                    <span className="text-2xl sm:text-3xl font-bold text-ui-text tabular-nums tracking-tight drop-shadow-sm">{duration}</span>
                    <span className="text-[9px] sm:text-[10px] text-ui-sub uppercase font-bold tracking-widest">MINUTES</span>
                </div>
                <button 
                  onClick={() => setDuration(Math.min(120, duration + 5))}
                  className="w-14 sm:w-16 h-full rounded-[1.2rem] sm:rounded-[1.5rem] bg-ui-surface hover:bg-ui-card flex items-center justify-center active:scale-95 text-brand font-bold transition-colors border border-ui-border"
                >
                    <Icons.Plus />
                </button>
            </div>
        </div>

        <div className="flex-1"></div>

        {/* Generate Button - Always Visible if scroll is correct */}
        <button 
            onClick={handleCreateWorkout} 
            disabled={selectedParts.length === 0}
            className={`w-full glass-btn-primary font-bold py-4 sm:py-5 rounded-2xl active:scale-95 text-lg sm:text-xl flex items-center justify-center gap-2 sm:gap-3 mb-2 transition-all ${selectedParts.length === 0 ? 'opacity-50 cursor-not-allowed grayscale' : 'shadow-glow'}`}
        >
            <Icons.Check />
            <span>{selectedParts.length === 0 ? '請選擇今天想要練哪吧 !' : '生成訓練計畫'}</span>
        </button>
      </div>
    </MainLayout>
  );

  const PlanView = () => {
    const totalExercises = workout?.exercises.length || 0;
    const progress = Math.round((activeExerciseIndex / (totalExercises || 1)) * 100);

    return (
      <MainLayout title="訓練課表" onBack={() => setView(ViewState.SETUP)} showHistory={false}>
        <div className="space-y-6 pb-32 fade-in">
            {/* Dashboard Cards */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
                <div className="glass-panel p-4 rounded-2xl sm:rounded-[2rem] flex flex-col items-center justify-center relative group">
                    <span className="text-[9px] sm:text-[10px] font-bold text-ui-sub uppercase tracking-wider mb-0.5">總時長</span>
                    <span className="text-lg sm:text-xl font-bold text-ui-text">{workout?.totalDuration}<span className="text-[10px] ml-0.5 text-ui-sub font-medium">m</span></span>
                </div>
                <div className="glass-panel p-4 rounded-2xl sm:rounded-[2rem] flex flex-col items-center justify-center">
                    <span className="text-[9px] sm:text-[10px] font-bold text-ui-sub uppercase tracking-wider mb-0.5">動作數</span>
                    <span className="text-lg sm:text-xl font-bold text-ui-text">{totalExercises}</span>
                </div>
                <div className="glass-panel p-4 rounded-2xl sm:rounded-[2rem] flex flex-col items-center justify-center relative overflow-hidden border-brand/20">
                    <div className="absolute inset-0 bg-brand opacity-[0.08]"></div>
                    <span className="text-[9px] sm:text-[10px] font-bold text-brand-text uppercase tracking-wider mb-0.5">完成度</span>
                    <span className="text-lg sm:text-xl font-bold text-brand-text">{progress}<span className="text-[10px] ml-0.5">%</span></span>
                </div>
            </div>

            {/* List */}
            <div className="space-y-4">
                <div className="flex justify-between items-end px-1">
                    <h3 className="text-lg sm:text-xl font-bold text-ui-sub uppercase tracking-widest flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-ui-sub rounded-full"></span> 訓練流程
                    </h3>
                </div>
                <div className="space-y-4">
                    {workout?.exercises.map((ex, idx) => {
                       let accentClass = 'bg-gray-400';
                       if (ex.category === ExerciseCategory.WARMUP) accentClass = 'bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.6)]';
                       if (ex.category === ExerciseCategory.MAIN) {
                           if (ex.bodyParts?.includes(BodyPart.LEGS)) accentClass = 'bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.6)]';
                           else if (ex.bodyParts?.includes(BodyPart.CHEST)) accentClass = 'bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.6)]';
                           else if (ex.bodyParts?.includes(BodyPart.BACK)) accentClass = 'bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.6)]';
                           else if (ex.bodyParts?.includes(BodyPart.SHOULDERS)) accentClass = 'bg-violet-500 shadow-[0_0_10px_rgba(139,92,246,0.6)]';
                           else if (ex.bodyParts?.includes(BodyPart.CORE)) accentClass = 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)]';
                           else if (ex.bodyParts?.includes(BodyPart.FUNCTIONAL)) accentClass = 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.6)]';
                           else accentClass = 'bg-brand shadow-glow';
                       }
                       if (ex.category === ExerciseCategory.COOLDOWN) accentClass = 'bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.6)]';

                       const isDone = idx < activeExerciseIndex;
                       const isActive = idx === activeExerciseIndex;
                       
                       return (
                        <div key={idx} className={`glass-panel rounded-2xl p-0 transition-all overflow-hidden shadow-ios flex items-stretch min-h-[5.5rem] relative group mb-3 ${isDone ? 'opacity-50 grayscale' : 'hover:bg-ui-surface'} ${isActive ? 'ring-1 ring-brand/50' : ''}`}>
                             <div className={`w-1.5 ${accentClass}`}></div>
                             <div className="flex-1 p-4 flex flex-col justify-center cursor-pointer" onClick={() => startFocusMode(idx)}>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-[9px] font-bold uppercase tracking-wider text-ui-sub opacity-70">{ex.category}</span>
                                    {isDone && <span className="text-brand-text font-bold text-[10px] flex items-center gap-1">✓ Done</span>}
                                </div>
                                <h3 className="font-bold text-base text-ui-text leading-tight pr-2 group-hover:text-brand transition-colors">{ex.name}</h3>
                                <p className="text-ui-sub text-xs mt-1 truncate font-medium">{ex.reps || 'Duration based'}</p>
                             </div>
                             <div className="flex flex-col border-l border-ui-border w-14">
                                <button className="flex-1 flex items-center justify-center text-ui-sub hover:text-brand-text hover:bg-ui-surface transition-colors active:scale-95 border-b border-ui-border">
                                    <Icons.Swap />
                                </button>
                                <button onClick={() => startFocusMode(idx)} className="flex-1 flex items-center justify-center text-ui-text hover:text-white hover:bg-brand transition-colors active:scale-95">
                                    <Icons.Timer />
                                </button>
                            </div>
                        </div>
                       );
                    })}
                </div>
            </div>
            
            <button onClick={finishWorkout} className="w-full glass-btn-primary font-bold py-4 rounded-2xl active:scale-95 text-lg flex items-center justify-center gap-2 shadow-glow">
                <Icons.Check />
                <span>完成訓練</span>
            </button>
        </div>
      </MainLayout>
    );
  };

  const FocusView = () => {
    const currentEx = workout?.exercises[activeExerciseIndex];
    if (!currentEx) return null;

    return (
      <div className="fixed inset-0 z-50 flex flex-col h-[100dvh] bg-ui-bg/90 backdrop-blur-[40px]">
        {/* Modal Header */}
        <div className="flex-none flex justify-between items-center px-5 py-4 bg-white/5 border-b border-ui-border backdrop-blur-md">
             <button onClick={closeFocusMode} className="glass-btn w-10 h-10 rounded-full flex items-center justify-center text-ui-sub hover:text-ui-text active:scale-95 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"></path></svg>
             </button>
             <span className="text-[9px] font-bold text-brand-text uppercase tracking-[0.25em] px-3 py-1.5 rounded-full bg-brand-bg border border-brand/20 shadow-glow">FOCUS</span>
             <div className="w-10"></div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 flex flex-col items-center justify-center w-full px-6 relative overflow-hidden overflow-y-auto">
             {/* Ambient Glow */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand rounded-full blur-[100px] opacity-15 pointer-events-none animate-pulse-slow"></div>

             {/* Info */}
             <div className="space-y-3 text-center z-10 mb-6 shrink-0 w-full mt-4">
                <span className="inline-block px-3 py-0.5 rounded-full text-[8px] font-bold tracking-wider uppercase text-ui-sub border border-ui-border bg-ui-surface shadow-sm">{currentEx.category}</span>
                <h2 className="text-xl sm:text-2xl font-bold text-ui-text leading-tight px-2 drop-shadow-md">{currentEx.name}</h2>
                <div className="flex justify-center mt-3">
                     <a 
                       href={`https://www.google.com/search?q=${currentEx.name.replace(' ', '+')}+training`} 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="glass-btn px-3 py-1.5 rounded-full text-[9px] font-bold text-brand-text flex items-center gap-1 active:scale-95 border border-brand/20 shadow-sm hover:bg-brand-bg"
                     >
                         <Icons.Search /> 動作查詢
                     </a>
                </div>
                <div className="text-6xl mt-4 filter drop-shadow-lg">{currentEx.emoji}</div>
             </div>

             {/* SVG Circle Progress */}
             <div className="relative w-52 h-52 sm:w-64 sm:h-64 flex items-center justify-center shrink-0 z-10 mb-6">
                 <svg className="w-full h-full transform -rotate-90 drop-shadow-xl">
                    <circle cx="50%" cy="50%" r="46%" strokeWidth="3" fill="transparent" className="stroke-ui-border opacity-40" />
                    {isTimerRunning && <circle cx="50%" cy="50%" r="46%" stroke="currentColor" strokeWidth="3" fill="transparent" className="text-brand filter drop-shadow-[0_0_15px_var(--color-brand)] animate-[pulse-slow_3s_ease-in-out_infinite]" strokeDasharray="100 100" />}
                 </svg>
                 <div className="absolute flex flex-col items-center">
                     <span className="text-5xl sm:text-6xl font-mono font-bold tracking-tighter text-ui-text tabular-nums drop-shadow-md">
                        {isTimerRunning ? 'ACTIVE' : 'READY'}
                     </span>
                     <span className={`text-[8px] uppercase tracking-[0.3em] mt-2 font-bold ${isTimerRunning ? 'text-brand-text animate-pulse' : 'text-ui-sub'}`}>
                         {isTimerRunning ? 'WORKING' : 'PAUSED'}
                     </span>
                 </div>
             </div>

             {/* Controls Row */}
             <div className="flex flex-col items-center gap-4 z-10 w-full max-w-xs mb-4">
                 <div className="glass-panel px-5 py-3 rounded-xl border-brand/20 shadow-sm w-full text-center">
                    <p className="text-[10px] text-ui-sub text-center tracking-wide font-medium">目標: <span className="font-bold text-brand ml-1">{currentEx.reps}</span></p>
                 </div>
                 
                 <Metronome isPlaying={isTimerRunning} />
             </div>
        </div>

        {/* Footer Controls */}
        <div className="flex-none p-5 pb-8 bg-white/5 border-t border-ui-border z-20 backdrop-blur-md">
             <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                 <button 
                   onClick={() => setIsTimerRunning(!isTimerRunning)} 
                   className={isTimerRunning 
                     ? "glass-btn col-span-1 bg-ui-surface hover:bg-ui-card border border-ui-border text-ui-text font-bold py-3.5 rounded-2xl active:scale-95 text-base transition-colors flex items-center justify-center gap-2"
                     : "glass-btn-primary col-span-1 text-white font-bold py-3.5 rounded-2xl active:scale-95 text-base transition-all flex items-center justify-center gap-2"
                   }
                 >
                     {isTimerRunning ? <><Icons.Pause /> 暫停</> : <><Icons.Play /> 開始</>}
                 </button>
                 <button onClick={() => { setIsTimerRunning(false); alert('Rest timer logic would go here'); }} className="glass-btn col-span-1 text-ui-text border border-ui-border font-bold py-3.5 rounded-2xl active:scale-95 text-base hover:bg-ui-surface transition-colors shadow-sm">
                    休息 / 下一組
                 </button>
                 <button onClick={completeCurrentExercise} className="glass-btn col-span-2 text-brand-text font-bold py-3.5 rounded-2xl active:scale-95 mt-1 text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 hover:bg-brand-bg border border-brand/20 shadow-sm">
                    <span>完成此動作</span> <Icons.Check />
                 </button>
             </div>
        </div>
      </div>
    );
  };

  const HistoryView = () => (
    <MainLayout title="歷史紀錄" onBack={() => setView(ViewState.SETUP)} showHistory={false}>
      <div className="flex flex-col gap-4 min-h-full pb-20 fade-in">
         <div className="space-y-1 mt-1 text-center">
            <h2 className="text-2xl font-bold text-ui-text tracking-tight drop-shadow-sm">歷史紀錄</h2>
            <p className="text-ui-sub text-xs font-medium opacity-80">您的訓練軌跡</p>
         </div>

         <div className="space-y-3">
             {history.length === 0 && <div className="text-center py-10 text-ui-sub text-sm">尚無訓練紀錄</div>}
             {history.map((record) => (
               <div key={record.id} className="glass-panel p-4 rounded-2xl flex items-center justify-between shadow-sm cursor-pointer active:scale-95 transition-transform hover:bg-white/5 relative group">
                  <div>
                      <div className="text-[10px] text-ui-sub font-bold uppercase tracking-wide mb-1">{new Date(record.date).toLocaleDateString()}</div>
                      <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-ui-text">{record.duration} min</span>
                      </div>
                  </div>
                  <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-brand-text bg-brand-bg px-2 py-1 rounded-full border border-brand/20">{record.completedRate}% 完成</span>
                      <button onClick={(e) => { e.stopPropagation(); deleteHistory(record.id); }} className="glass-btn w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-500/10 active:scale-90 transition-all border border-transparent hover:border-red-500/20">
                          <Icons.Trash />
                      </button>
                  </div>
               </div>
             ))}
         </div>
      </div>
    </MainLayout>
  );

  return (
    <>
      {view === ViewState.SETUP && <SetupView />}
      {view === ViewState.PLAN && <PlanView />}
      {view === ViewState.FOCUS && <FocusView />}
      {view === ViewState.HISTORY && <HistoryView />}
    </>
  );
};

export default App;