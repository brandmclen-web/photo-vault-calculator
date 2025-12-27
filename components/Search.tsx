
import React, { useState } from 'react';
import { VideoData } from '../types';

interface SearchProps {
  onSelect: (v: VideoData) => void;
}

const Search: React.FC<SearchProps> = ({ onSelect }) => {
  const [query, setQuery] = useState('');

  const demos: VideoData[] = [
    { id: 'LXb3EKWsInQ', title: 'Costa Rica 4K Wildlife', channel: 'Nature', thumbnail: '', views: '20M' },
    { id: '1La4QzGeaaQ', title: 'Switzerland 4K Drone', channel: 'Dji', thumbnail: '', views: '12M' },
    { id: 'vX2vsvdq8nw', title: 'NYC 4K Night Walk', channel: 'Urban', thumbnail: '', views: '5M' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would call YouTube Search API
    // For now, let's extract ID if it's a URL or use a demo
    const match = query.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/);
    if (match) {
      onSelect({
        id: match[1],
        title: "Streaming Content",
        channel: "YouTube Network",
        thumbnail: "",
        views: "1M+"
      });
    } else {
      // Pick a random demo for flavor
      onSelect(demos[Math.floor(Math.random() * demos.length)]);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-xl group">
      <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
        <i className="fa-solid fa-magnifying-glass text-slate-500 group-focus-within:text-blue-500 transition-colors"></i>
      </div>
      <input 
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for 4K videos or paste URL..."
        className="w-full bg-[#0F1219] border border-slate-800 rounded-2xl py-3.5 pl-14 pr-4 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all shadow-xl"
      />
      <div className="absolute right-4 inset-y-0 flex items-center gap-2">
        <kbd className="hidden md:inline-flex items-center px-2 py-1 bg-slate-800 border border-slate-700 rounded-md text-[10px] font-bold text-slate-500">⌘ K</kbd>
      </div>
    </form>
  );
};

export default Search;
