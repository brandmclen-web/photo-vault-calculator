
import React, { useState } from 'react';

const TWAGenerator: React.FC = () => {
  const [domain, setDomain] = useState('');
  const [packageId, setPackageId] = useState('');
  const [sha256, setSha256] = useState('');

  const assetLinksJson = JSON.stringify([{
    "relation": ["delegate_permission/common.handle_all_urls"],
    "target": {
      "namespace": "android_app",
      "package_name": packageId || "com.example.app",
      "sha256_cert_fingerprints": [sha256 || "00:11:22..."]
    }
  }], null, 2);

  return (
    <div className="space-y-8 animate-in slide-in-from-left-4 duration-500">
      <div>
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">TWA Link Configurator</h2>
        <p className="text-slate-500 mt-1">Establish the secure link between your website and Android app.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 space-y-6">
          <h3 className="text-lg font-bold mb-4">Identity Details</h3>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Web Domain</label>
            <input 
              type="text" 
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="https://yourapp.com"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Android Package ID</label>
            <input 
              type="text" 
              value={packageId}
              onChange={(e) => setPackageId(e.target.value)}
              placeholder="com.company.appname"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">SHA-256 Fingerprint</label>
            <input 
              type="text" 
              value={sha256}
              onChange={(e) => setSha256(e.target.value)}
              placeholder="AA:BB:CC:DD..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex gap-3">
            <i className="fa-solid fa-circle-info text-blue-500 mt-1"></i>
            <p className="text-xs text-blue-800 leading-relaxed">
              Find your SHA-256 fingerprint in the Google Play Console under 
              <strong> Setup > App Integrity</strong>.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 rounded-3xl p-8 text-white relative">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">assetlinks.json</h3>
              <button 
                onClick={() => navigator.clipboard.writeText(assetLinksJson)}
                className="text-xs bg-slate-800 px-3 py-1 rounded hover:bg-slate-700 transition-colors"
              >
                Copy JSON
              </button>
            </div>
            <pre className="text-blue-400 font-mono text-sm overflow-x-auto">
              {assetLinksJson}
            </pre>
          </div>
          
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold mb-4">Next Steps</h3>
            <ol className="list-decimal list-inside space-y-3 text-sm text-slate-600">
              <li>Upload this file to your web server.</li>
              <li>Path: <code className="bg-slate-100 px-1 rounded">/.well-known/assetlinks.json</code></li>
              <li>Ensure the Content-Type is <code className="bg-slate-100 px-1 rounded">application/json</code>.</li>
              <li>Test the link in the Play Console.</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TWAGenerator;
