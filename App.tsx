
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Calculator from './components/Calculator';
import VaultView from './views/VaultView';
import Deploy from './views/Deploy';
import Billing from './views/Billing';
import GeminiChat from './components/GeminiChat';
import { AppView, AppSettings } from './types';
import { getAppSettings, saveAppSettings } from './services/vaultService';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppView>('calculator');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [settings, setSettings] = useState<AppSettings>(getAppSettings());
  const [setupStep, setSetupStep] = useState(0);

  // Setup state handlers
  const [newPin, setNewPin] = useState('');
  const [recoveryQ, setRecoveryQ] = useState('');
  const [recoveryA, setRecoveryA] = useState('');

  const handleUnlock = () => {
    setIsUnlocked(true);
    setActiveTab('vault');
  };

  const completeSetup = () => {
    const finalSettings: AppSettings = {
      pin: newPin,
      recoveryQuestion: recoveryQ,
      recoveryAnswer: recoveryA,
      isSetupComplete: true,
      stealthMode: true
    };
    saveAppSettings(finalSettings);
    setSettings(finalSettings);
    setSetupStep(0);
  };

  const renderContent = () => {
    if (!settings.isSetupComplete) {
      return (
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto space-y-8 animate-in fade-in duration-500">
          <div className="w-16 h-16 rounded-3xl bg-blue-600/10 flex items-center justify-center text-blue-500 mb-4">
            <i className="fa-solid fa-shield-halved text-3xl"></i>
          </div>
          {setupStep === 0 && (
            <>
              <h2 className="text-3xl font-black text-white">Initialization</h2>
              <p className="text-slate-500 text-sm">Configure your secondary access layer. This PIN will be used in the calculator interface.</p>
              <input 
                type="password" 
                maxLength={8}
                placeholder="Set Secret PIN" 
                value={newPin}
                onChange={e => setNewPin(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 p-4 rounded-2xl text-center text-2xl tracking-[1em]"
              />
              <button onClick={() => setSetupStep(1)} disabled={!newPin} className="w-full bg-blue-600 py-4 rounded-2xl font-bold">Next Step</button>
            </>
          )}
          {setupStep === 1 && (
            <>
              <h2 className="text-3xl font-black text-white">Recovery</h2>
              <p className="text-slate-500 text-sm">Set a recovery question in case you lose your memory hash.</p>
              <input 
                type="text" 
                placeholder="Question (e.g. Pet Name?)" 
                value={recoveryQ}
                onChange={e => setRecoveryQ(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 p-4 rounded-2xl"
              />
              <input 
                type="text" 
                placeholder="Answer" 
                value={recoveryA}
                onChange={e => setRecoveryA(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 p-4 rounded-2xl"
              />
              <button onClick={completeSetup} disabled={!recoveryQ || !recoveryA} className="w-full bg-blue-600 py-4 rounded-2xl font-bold">Finish Setup</button>
            </>
          )}
        </div>
      );
    }

    switch (activeTab) {
      case 'calculator': 
        return (
          <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-12">
            <div className="text-center space-y-1">
              <h1 className="text-xl font-bold tracking-widest text-slate-700">SCIENTIFIC</h1>
              <p className="text-[10px] uppercase tracking-[0.4em] text-slate-800">Precision Engine v4.2</p>
            </div>
            <Calculator onUnlock={handleUnlock} />
          </div>
        );
      case 'vault': return <VaultView />;
      case 'deploy': return <Deploy />;
      case 'billing': return <Billing />;
      default: return <Calculator onUnlock={handleUnlock} />;
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#0B0E14] text-slate-200">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} isVisible={isUnlocked} />
      
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {!isUnlocked && settings.isSetupComplete && (
          <div className="absolute top-6 left-6 text-[10px] font-bold text-slate-800 flex items-center gap-2">
            <i className="fa-solid fa-cpu"></i>
            SYSTEM STATUS: OPERATIONAL
          </div>
        )}

        <div className="flex-1 flex flex-col p-6 pt-0 relative overflow-hidden">
          {renderContent()}
        </div>

        {/* Ambient Glow */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/5 blur-[150px] rounded-full pointer-events-none"></div>
      </main>

      {isUnlocked && <GeminiChat />}
    </div>
  );
};

export default App;
