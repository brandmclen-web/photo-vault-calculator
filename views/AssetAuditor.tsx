
import React, { useState } from 'react';

const AssetAuditor: React.FC = () => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Visual Asset Auditor</h2>
        <p className="text-slate-500 mt-1">Verify your icons and graphics for Play Store guidelines.</p>
      </div>

      <div className="max-w-2xl mx-auto bg-white rounded-3xl p-12 border-2 border-dashed border-slate-200 text-center">
        {!preview ? (
          <div className="space-y-6">
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto text-blue-500">
              <i className="fa-solid fa-cloud-arrow-up text-3xl"></i>
            </div>
            <div>
              <p className="text-lg font-bold">Upload an icon or banner</p>
              <p className="text-slate-500 text-sm">PNG or JPEG format (Max 5MB)</p>
            </div>
            <input 
              type="file" 
              id="asset-upload" 
              className="hidden" 
              onChange={handleFile}
              accept="image/*"
            />
            <label 
              htmlFor="asset-upload"
              className="inline-block px-8 py-3 bg-blue-600 text-white rounded-xl font-bold cursor-pointer hover:bg-blue-700 transition-colors"
            >
              Select Image
            </label>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="relative group inline-block">
              <img src={preview} alt="Preview" className="max-h-64 rounded-2xl shadow-lg mx-auto" />
              <button 
                onClick={() => setPreview(null)}
                className="absolute -top-2 -right-2 bg-red-500 text-white w-8 h-8 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-green-50 rounded-2xl border border-green-100">
                <p className="text-[10px] font-bold text-green-600 uppercase">Transparency</p>
                <p className="text-lg font-bold text-green-800">Pass</p>
              </div>
              <div className="p-4 bg-green-50 rounded-2xl border border-green-100">
                <p className="text-[10px] font-bold text-green-600 uppercase">Aspect Ratio</p>
                <p className="text-lg font-bold text-green-800">1:1 OK</p>
              </div>
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100">
                <p className="text-[10px] font-bold text-amber-600 uppercase">Resolution</p>
                <p className="text-lg font-bold text-amber-800">Fair</p>
              </div>
            </div>
            <button className="text-blue-600 font-bold text-sm hover:underline">
              Run AI Detailed Analysis →
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
        {[
          { title: 'App Icon', dim: '512 x 512', desc: 'No rounded corners, 32-bit PNG.' },
          { title: 'Feature Graphic', dim: '1024 x 500', desc: 'Keep core visual at center.' },
          { title: 'Screenshots', dim: '16:9 / 9:16', desc: 'Min. 2, Max. 8 per type.' },
          { title: 'Tablet Assets', dim: 'Optional', desc: 'Improve store ranking.' }
        ].map(item => (
          <div key={item.title} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-blue-600 font-bold text-sm">{item.title}</p>
            <p className="text-slate-900 font-bold text-lg mt-1">{item.dim}</p>
            <p className="text-slate-500 text-xs mt-2">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssetAuditor;
