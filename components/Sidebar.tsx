
import React from 'react';
import { AppView } from '../types';

interface SidebarProps {
  activeTab: AppView;
  setActiveTab: (id: AppView) => void;
  isVisible: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isVisible }) => {
  if (!isVisible) return null;

  const items: { id: AppView; label: string; icon: string }[] = [
    { id: 'vault', label: 'Archived Memory', icon: 'fa-box-archive' },
    { id: 'logs', label: 'Processing Logs', icon: 'fa-terminal' },
    { id: 'deploy', label: 'Compiler', icon: 'fa-code' },
    { id: 'billing', label: 'License Settings', icon: 'fa-shield-halved' },
  ];

  return (
    <div className="w-20 lg:w-64 bg-[#0F1219] flex flex-col border-r border-slate-800/50 z-40 shrink-0 animate-in slide-in-from-left duration-500">
      <div className="p-6 flex items-center gap-3">
        <div className="bg-slate-800 w-10 h-10 rounded-xl flex items-center justify-center border border-slate-700">
          <i className="fa-solid fa-calculator text-slate-400 text-sm"></i>
        </div>
        <div className="hidden lg:block">
          <h1 className="text-sm font-bold tracking-widest text-slate-500 uppercase">System Core</h1>
        </div>
      </div>

      <nav className="mt-10 flex-1 px-4 space-y-2">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all ${
              activeTab === item.id 
                ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' 
                : 'text-slate-500 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <i className={`fa-solid ${item.icon} w-5 text-center`}></i>
            <span className="hidden lg:block font-bold text-xs uppercase tracking-wider">{item.label}</span>
          </button>
        ))}
        
        <button
          onClick={() => window.location.reload()}
          className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-red-500 hover:bg-red-500/10 mt-10"
        >
          <i className="fa-solid fa-power-off w-5 text-center"></i>
          <span className="hidden lg:block font-bold text-xs uppercase tracking-wider">Flush Cache</span>
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
