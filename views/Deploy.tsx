
import React, { useState } from 'react';
import { DEPLOY_CHECKLIST } from '../constants';
import { generateStoreListing } from '../services/geminiService';

const Deploy: React.FC = () => {
  const [checklist, setChecklist] = useState(DEPLOY_CHECKLIST);
  const [loadingListing, setLoadingListing] = useState(false);
  const [listingText, setListingText] = useState('');

  const toggleItem = (id: string) => {
    setChecklist(prev => prev.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const handleGenerateListing = async () => {
    setLoadingListing(true);
    try {
      // Prompt optimized for stealth app
      const text = await generateStoreListing("CipherCalc Pro", "Scientific Calculator, Floating point math, Discrete UI, Privacy focused, Local storage only");
      setListingText(text || '');
    } catch (err) {
      console.error(err);
      setListingText("Error generating listing. Check connection.");
    } finally {
      setLoadingListing(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 p-6 overflow-y-auto">
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
          <h3 className="text-xl font-bold mb-6 text-white">Integrity Check</h3>
          <div className="space-y-4">
            {checklist.map((item) => (
              <div 
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className={`flex items-start gap-4 p-4 rounded-2xl border transition-all cursor-pointer ${
                  item.completed ? 'bg-blue-500/5 border-blue-500/20' : 'bg-slate-800/50 border-slate-700/50'
                }`}
              >
                <div className={`mt-1 w-5 h-5 rounded-lg border flex items-center justify-center ${
                  item.completed ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-600'
                }`}>
                  {item.completed && <i className="fa-solid fa-check text-[10px]"></i>}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-200">{item.title}</h4>
                  <p className="text-[10px] text-slate-500 mt-0.5">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-blue-600 rounded-3xl p-8 text-white shadow-xl">
          <h3 className="text-xl font-black mb-2">Build Production</h3>
          <p className="text-xs text-blue-100 mb-6 opacity-80">
            Export signed .aab via Trusted Web Activity (TWA).
          </p>
          <button className="w-full py-4 bg-white text-blue-700 rounded-2xl font-bold text-sm">
            Generate Manifest
          </button>
        </div>
      </div>

      <div className="lg:col-span-2 space-y-6">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 min-h-[500px] flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-2xl font-black text-white tracking-tighter">ASO Optimizer</h3>
              <p className="text-xs text-slate-500 uppercase tracking-widest">Powered by Gemini 3 Pro</p>
            </div>
            <button 
              onClick={handleGenerateListing}
              disabled={loadingListing}
              className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-blue-700 transition-all flex items-center gap-2"
            >
              {loadingListing ? <i className="fa-solid fa-spinner animate-spin"></i> : <i className="fa-solid fa-wand-magic-sparkles"></i>}
              Rewrite Listing
            </button>
          </div>

          <div className="flex-1 bg-black/40 border border-slate-800 rounded-2xl p-6 overflow-y-auto">
            {listingText ? (
              <pre className="text-slate-300 font-sans whitespace-pre-wrap text-sm leading-relaxed">{listingText}</pre>
            ) : (
              <div className="h-full flex flex-col items-center justify-center opacity-10 text-center space-y-4">
                <i className="fa-solid fa-robot text-6xl"></i>
                <p className="font-bold">Awaiting Input</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deploy;
