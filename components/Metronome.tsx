import React, { useEffect, useRef, useState, useCallback } from 'react';

interface MetronomeProps {
  isPlaying: boolean;
  onBpmChange?: (bpm: number) => void;
}

const Metronome: React.FC<MetronomeProps> = ({ isPlaying }) => {
  const [bpm, setBpm] = useState(60); // 60 BPM = 1 Hz
  const [isMuted, setIsMuted] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const nextNoteTimeRef = useRef<number>(0);
  const timerIDRef = useRef<number | null>(null);
  const lookahead = 25.0;
  const scheduleAheadTime = 0.1;

  // Initialize Audio Context
  useEffect(() => {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioContextRef.current = new AudioContextClass();
    }
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const playTone = useCallback((time: number) => {
    if (!audioContextRef.current || isMuted) return;
    const osc = audioContextRef.current.createOscillator();
    const gain = audioContextRef.current.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(432, time); // Prototype uses 432Hz

    osc.connect(gain);
    gain.connect(audioContextRef.current.destination);

    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(0.6, time + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.2);

    osc.start(time);
    osc.stop(time + 0.2);
  }, [isMuted]);

  const scheduler = useCallback(() => {
    if (!audioContextRef.current) return;

    while (nextNoteTimeRef.current < audioContextRef.current.currentTime + scheduleAheadTime) {
      playTone(nextNoteTimeRef.current);
      const secondsPerBeat = 60.0 / bpm;
      nextNoteTimeRef.current += secondsPerBeat;
    }

    if (isPlaying) {
      timerIDRef.current = window.setTimeout(scheduler, lookahead);
    }
  }, [bpm, isPlaying, playTone]);

  useEffect(() => {
    if (isPlaying) {
      if (audioContextRef.current?.state === 'suspended') {
        audioContextRef.current.resume();
      }
      if (!timerIDRef.current) {
        nextNoteTimeRef.current = audioContextRef.current!.currentTime + 0.05;
        scheduler();
      }
    } else {
      if (timerIDRef.current) {
        window.clearTimeout(timerIDRef.current);
        timerIDRef.current = null;
      }
    }
    return () => {
      if (timerIDRef.current) {
        window.clearTimeout(timerIDRef.current);
        timerIDRef.current = null;
      }
    }
  }, [isPlaying, scheduler]);

  // Convert Hz to BPM for display logic (1Hz = 60BPM)
  const hz = Math.round((bpm / 60) * 10) / 10;

  return (
    <div className="glass-btn p-3 rounded-2xl w-full flex items-center gap-4 mt-4">
      <button
        onClick={() => setIsMuted(!isMuted)}
        className={`w-12 h-12 rounded-xl flex-none flex items-center justify-center bg-ui-surface active:scale-95 transition-colors shadow-inner border border-ui-border ${!isMuted ? 'text-brand border-brand' : 'text-ui-sub'}`}
      >
        {!isMuted ? (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
        )}
      </button>

      <div className="flex-1 flex flex-col justify-center h-full">
        <div className="flex justify-between items-center mb-1">
          <span className="text-[8px] font-bold text-ui-sub uppercase tracking-wider">節拍頻率</span>
          <span className="text-[9px] font-mono font-bold text-brand-text bg-brand-bg px-1.5 rounded">{hz} Hz</span>
        </div>
        <input
          type="range"
          min="30" // 0.5 Hz
          max="120" // 2.0 Hz
          step="30"
          value={bpm}
          onChange={(e) => setBpm(Number(e.target.value))}
          className="w-full"
        />
        <div className="flex justify-between text-[8px] text-ui-sub opacity-50 mt-1 px-1 font-medium">
          <span>0.5Hz</span>
          <span>2.0Hz</span>
        </div>
      </div>
    </div>
  );
};

export default Metronome;