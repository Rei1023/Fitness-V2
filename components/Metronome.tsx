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

  // ... (unchanged code) ...

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
      </div >
    </div >
  );
};

export default Metronome;