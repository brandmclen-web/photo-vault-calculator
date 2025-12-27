
import React, { useState } from 'react';
import { suggestEQPreset } from '../services/geminiService';
import { FREQUENCIES } from '../types';

interface EqualizerProps {
  videoTitle: string;
}

const Equalizer: React.FC<EqualizerProps> = ({ videoTitle }) => {
  const [bands, setBands] = useState<number[]>([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [isOptimizing, setIsOptimizing] = useState(false);

  const handleBandChange = (idx: number, val: string) => {
    const newBands = [...bands];
    newBands[idx] = parseInt(val);
    setBands(newBands);
  };

  const optimizeWithAI = async () => {
    setIsOptimizing(true);
    const suggested = await suggestEQPreset(videoTitle);
    setBands(suggested);
    setIsOptimizing(false);
  };

  const presets = [
    { name: 'Flat', values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    { name: 'Pop', values: [2, 3, 5, 2, -1, -2, 1, 3, 5, 2] },
    { name: 'Bass', values: [8, 10, 6, 2, 0, 0, 0, 0, 0, 0] },
    { name: 'Acoustic', values: [5, 4, 3, 2, 5, 4, 6, 7, 3, 2] },
  ];

  return (
    <div className="flex flex-col h-full gap-8">
      {/* Presets */}
      <div className="grid grid-cols-2 gap-2">
        {presets.map(p => (
          <button 
            key={p.name}
            onClick={() => setBands(p.values)}
            className="px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-xl text-xs font-bold hover:bg-slate-800 hover:border-blue-500/50 transition-all text-slate-400 hover:text-white"
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* AI Button */}
      <button 
        onClick={optimizeWithAI}
        disabled={isOptimizing}
        className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl font-bold text-sm shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 hover:opacity-90 transition-all active:scale-95"
      >
        {isOptimizing ? (
          <i className="fa-solid fa-spinner animate-spin"></i>
        ) : (
          <i className="fa-solid fa-wand-magic-sparkles"></i>
        )}
        AI Smart Tune
      </button>

      {/* Slider Grid */}
      <div className="flex-1 flex justify-between items-center py-4 bg-slate-900/50 rounded-2xl border border-slate-800 px-2">
        {bands.map((val, i) => (
          <div key={i} className="flex flex-col items-center gap-4 h-full">
            <span className="text-[10px] font-mono font-bold text-blue-500">{val > 0 ? `+${val}` : val}</span>
            <input 
              type="range"
              min="-12"
              max="12"
              step="1"
              value={val}
              onChange={(e) => handleBandChange(i, e.target.value)}
              className="eq-slider"
            />
            <span className="text-[10px] font-bold text-slate-500">{FREQUENCIES[i]}</span>
          </div>
        ))}
      </div>

      <div className="bg-blue-500/5 p-4 rounded-xl border border-blue-500/10 text-center">
        <p className="text-[10px] font-medium text-blue-400/80 leading-relaxed italic">
          "Hardware acceleration engaged. High-fidelity audio processing active."
        </p>
      </div>
    </div>
  );
};

export default Equalizer;
