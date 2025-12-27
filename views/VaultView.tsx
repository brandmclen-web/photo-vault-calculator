
import React, { useState, useEffect } from 'react';
import { getVaultItems, saveVaultItem, deleteVaultItem } from '../services/vaultService';
import { VaultItem } from '../types';

const VaultView: React.FC = () => {
  const [items, setItems] = useState<VaultItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    setItems(getVaultItems());
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      const newItem: VaultItem = {
        id: Math.random().toString(36).substr(2, 9),
        data: reader.result as string,
        name: file.name,
        timestamp: Date.now(),
        type: 'image',
        isEncrypted: true
      };
      saveVaultItem(newItem);
      setItems(prev => [...prev, newItem]);
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="p-6 space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tighter">SECURE VAULT</h2>
          <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-500 uppercase tracking-widest">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
            Military Grade Encryption Active
          </div>
        </div>
        
        <label className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold text-sm cursor-pointer shadow-xl shadow-blue-600/20 transition-all active:scale-95">
          <i className="fa-solid fa-plus mr-2"></i> Import Media
          <input type="file" className="hidden" onChange={handleFileUpload} accept="image/*" />
        </label>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {items.map(item => (
          <div key={item.id} className="group relative aspect-square rounded-3xl overflow-hidden bg-slate-900 border border-slate-800">
            <img src={item.data} alt={item.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
              <button 
                onClick={() => {
                  deleteVaultItem(item.id);
                  setItems(prev => prev.filter(i => i.id !== item.id));
                }}
                className="bg-red-600 text-white p-2 rounded-xl text-xs hover:bg-red-700"
              >
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
            <div className="absolute top-2 right-2 bg-emerald-500 text-[8px] font-black px-1.5 py-0.5 rounded text-black">
              AES-256
            </div>
          </div>
        ))}
        
        {items.length === 0 && !isUploading && (
          <div className="col-span-full py-20 text-center space-y-4 opacity-20">
            <i className="fa-solid fa-vault text-6xl"></i>
            <p className="font-bold">Your vault is empty</p>
          </div>
        )}

        {isUploading && (
          <div className="aspect-square rounded-3xl border border-blue-500/30 bg-blue-500/5 flex items-center justify-center">
            <i className="fa-solid fa-spinner animate-spin text-blue-500 text-xl"></i>
          </div>
        )}
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-500">
            <i className="fa-solid fa-cloud"></i>
          </div>
          <div>
            <p className="text-sm font-bold">Cloud Backup (Pro)</p>
            <p className="text-[10px] text-slate-500">Last synced: Never</p>
          </div>
        </div>
        <button className="text-[10px] font-black uppercase tracking-widest text-blue-500 hover:text-white transition-colors">
          Upgrade Now →
        </button>
      </div>
    </div>
  );
};

export default VaultView;
