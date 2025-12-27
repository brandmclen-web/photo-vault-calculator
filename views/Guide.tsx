
import React from 'react';

const Guide: React.FC = () => {
  const steps = [
    { title: 'Create Developer Account', content: 'Register at play.google.com/console ($25 one-time fee).' },
    { title: 'Set Up PWA', content: 'Ensure your web app has a manifest.json and a registered Service Worker.' },
    { title: 'Bundle with Bubblewrap', content: 'Use the CLI tool to wrap your PWA into an Android App Bundle (.aab).' },
    { title: 'Internal Testing', content: 'Upload your .aab to a test track to verify on physical devices.' },
    { title: 'Review & Publish', content: 'Submit for review. First apps take 3-7 days; subsequent updates are faster.' }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in zoom-in-95 duration-500">
      <div className="text-center">
        <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tighter">The Complete Roadmap</h2>
        <p className="text-slate-500 max-w-lg mx-auto">From localhost to 2.5 billion devices. Follow these critical steps to ensure your app gets approved.</p>
      </div>

      <div className="space-y-4 relative before:absolute before:left-8 before:top-4 before:bottom-4 before:w-1 before:bg-slate-100">
        {steps.map((step, idx) => (
          <div key={idx} className="relative pl-16 group">
            <div className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-blue-500 ring-8 ring-blue-50 group-hover:scale-125 transition-transform z-10"></div>
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em]">Step {idx + 1}</span>
              <h3 className="text-xl font-bold text-slate-900 mt-1 mb-2">{step.title}</h3>
              <p className="text-slate-600 leading-relaxed">{step.content}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 text-white rounded-[3rem] p-12 text-center relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-2xl font-bold mb-4">Need personalized help?</h3>
          <p className="text-slate-400 mb-8 max-w-md mx-auto">Our AI consultant is trained on latest Play Store policies and TWA documentation.</p>
          <button className="bg-blue-600 px-8 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20">
            Open ShipBot Chat
          </button>
        </div>
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <i className="fa-solid fa-graduation-cap text-[12rem]"></i>
        </div>
      </div>
    </div>
  );
};

export default Guide;
