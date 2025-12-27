
import React, { useState } from 'react';
import { ChecklistItem } from '../types';
// Fix: Import DEPLOY_CHECKLIST as INITIAL_CHECKLIST is not defined in constants.tsx
import { DEPLOY_CHECKLIST } from '../constants';

const Dashboard: React.FC = () => {
  // Fix: Use DEPLOY_CHECKLIST for initial state
  const [checklist, setChecklist] = useState<ChecklistItem[]>(DEPLOY_CHECKLIST);

  const toggleItem = (id: string) => {
    setChecklist(prev => prev.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const completedCount = checklist.filter(i => i.completed).length;
  const progress = Math.round((completedCount / checklist.length) * 100);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Project Status</h2>
          <p className="text-slate-500 mt-1">Track your progress toward a successful Play Store launch.</p>
        </div>
        <div className="text-right">
          <p className="text-4xl font-black text-blue-600">{progress}%</p>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Readiness Score</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <i className="fa-solid fa-list-check text-blue-500"></i>
              Launch Checklist
            </h3>
            <div className="space-y-4">
              {checklist.map((item) => (
                <div 
                  key={item.id}
                  className={`flex items-start gap-4 p-4 rounded-2xl border transition-all duration-200 ${
                    item.completed ? 'bg-slate-50 border-slate-100' : 'bg-white border-slate-200 hover:border-blue-300'
                  }`}
                >
                  <button 
                    onClick={() => toggleItem(item.id)}
                    className={`mt-1 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors ${
                      item.completed ? 'bg-blue-500 border-blue-500 text-white' : 'border-slate-300'
                    }`}
                  >
                    {item.completed && <i className="fa-solid fa-check text-[10px]"></i>}
                  </button>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className={`font-semibold ${item.completed ? 'text-slate-500 line-through' : 'text-slate-900'}`}>
                        {item.title}
                      </h4>
                      <span className="text-[10px] font-bold uppercase px-2 py-1 rounded bg-slate-100 text-slate-500">
                        {item.category}
                      </span>
                    </div>
                    <p className={`text-sm mt-1 ${item.completed ? 'text-slate-400' : 'text-slate-600'}`}>
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-blue-600 rounded-3xl p-8 text-white shadow-xl shadow-blue-600/20 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-4">Quick Deployment</h3>
              <p className="text-blue-100 text-sm mb-6 leading-relaxed">
                TWA (Trusted Web Activity) is the best way to bring your web app to Android.
              </p>
              <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold text-sm w-full hover:bg-blue-50 transition-colors">
                Start TWA Wizard
              </button>
            </div>
            <i className="fa-solid fa-android text-8xl absolute -bottom-4 -right-4 opacity-10"></i>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
            <h3 className="text-lg font-bold mb-4">Market Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Global Reach</span>
                <span className="text-sm font-bold text-slate-900">2.5B+ Devices</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">PWA Support</span>
                <span className="text-sm font-bold text-green-500">Native Level</span>
              </div>
              <div className="pt-4 border-t border-slate-100">
                <p className="text-xs text-slate-400 leading-relaxed italic">
                  "Google Play apps see 3x more engagement than standard browser bookmarks."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
