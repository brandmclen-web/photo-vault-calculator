
import React, { useState, useEffect } from 'react';

const Billing: React.FC = () => {
  const [hasKey, setHasKey] = useState(false);

  useEffect(() => {
    checkKey();
  }, []);

  const checkKey = async () => {
    // @ts-ignore
    if (window.aistudio && typeof window.aistudio.hasSelectedApiKey === 'function') {
      // @ts-ignore
      const selected = await window.aistudio.hasSelectedApiKey();
      setHasKey(selected);
    }
  };

  const handleOpenSelect = async () => {
    // @ts-ignore
    if (window.aistudio && typeof window.aistudio.openSelectKey === 'function') {
      // @ts-ignore
      await window.aistudio.openSelectKey();
      // Assume success as per guidelines to avoid race condition
      setHasKey(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="text-center">
        <h2 className="text-4xl font-black text-white mb-4 tracking-tighter">Billing & AI Configuration</h2>
        <p className="text-slate-500 max-w-lg mx-auto">
          High-quality features like 4K AI Smart Tune and Cinematic Store Generation require a paid Google Cloud project.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-10 space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-blue-600/20 flex items-center justify-center text-blue-500">
            <i className="fa-solid fa-key text-2xl"></i>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">Google Cloud API Key</h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              Veloce 4K uses Gemini 3 Pro for advanced audio processing. To enable this, you must select an API key from a project with active billing.
            </p>
            <div className="flex flex-col gap-3">
              <button 
                onClick={handleOpenSelect}
                className={`py-4 px-6 rounded-2xl font-bold transition-all shadow-xl flex items-center justify-center gap-3 ${
                  hasKey 
                  ? 'bg-green-600/10 text-green-500 border border-green-500/30' 
                  : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-600/20'
                }`}
              >
                <i className={`fa-solid ${hasKey ? 'fa-check-circle' : 'fa-bolt'}`}></i>
                {hasKey ? 'Key Selected' : 'Link Billing Account'}
              </button>
              <a 
                href="https://ai.google.dev/gemini-api/docs/billing" 
                target="_blank" 
                rel="noreferrer"
                className="text-xs text-blue-500 hover:underline text-center font-bold"
              >
                Learn about Google Cloud Billing →
              </a>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-10 space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-purple-600/20 flex items-center justify-center text-purple-500">
            <i className="fa-solid fa-microchip text-2xl"></i>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">Usage Statistics</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">AI Audio Tokens</span>
                <span className="text-white font-mono">1.2k / 50k</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 w-[15%]"></div>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Store Listings Generated</span>
                <span className="text-white font-mono">3 / 10</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 w-[30%]"></div>
              </div>
            </div>
            <p className="mt-8 text-xs text-slate-500 italic">
              "Selecting a paid key unlocks Gemini 3 Pro reasoning capabilities for all modules."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;
