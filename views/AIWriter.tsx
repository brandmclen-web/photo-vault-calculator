
import React, { useState } from 'react';
import { generateStoreListing } from '../services/geminiService';

const AIWriter: React.FC = () => {
  const [appName, setAppName] = useState('');
  const [features, setFeatures] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const handleGenerate = async () => {
    if (!appName || !features) return;
    setLoading(true);
    try {
      const output = await generateStoreListing(appName, features);
      setResult(output || '');
    } catch (err) {
      console.error(err);
      setResult("Error generating content. Please check your API key.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight text-center">AI Store Copywriter</h2>
        <p className="text-slate-500 mt-1 text-center">Let Gemini Pro craft high-converting copy for your Play Store listing.</p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">App Name</label>
            <input 
              type="text" 
              value={appName}
              onChange={(e) => setAppName(e.target.value)}
              placeholder="e.g., TaskFlow Pro"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Key Features</label>
            <textarea 
              rows={6}
              value={features}
              onChange={(e) => setFeatures(e.target.value)}
              placeholder="List features like: Dark mode, Real-time sync, Offline support..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all resize-none"
            />
          </div>
          <button 
            onClick={handleGenerate}
            disabled={loading}
            className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all ${
              loading ? 'bg-slate-400' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/20'
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <i className="fa-solid fa-spinner animate-spin"></i> Writing...
              </span>
            ) : 'Generate Listing'}
          </button>
        </div>

        <div className="bg-slate-900 rounded-3xl p-8 text-slate-300 overflow-y-auto max-h-[600px] border border-slate-800 shadow-2xl">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Generated Output</h3>
          {result ? (
            <div className="prose prose-invert prose-sm max-w-none">
              <pre className="whitespace-pre-wrap font-sans leading-relaxed">{result}</pre>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center opacity-30 text-center">
              <i className="fa-solid fa-wand-magic-sparkles text-5xl mb-4"></i>
              <p>Output will appear here...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIWriter;
