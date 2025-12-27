
import React, { useState } from 'react';
import { HOME_VIDEOS, DISCOVERY_CATEGORIES } from '../constants';
import { VideoData } from '../types';

interface HomeProps {
  onSelectVideo: (v: VideoData) => void;
}

const Home: React.FC<HomeProps> = ({ onSelectVideo }) => {
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <div className="space-y-8 animate-in fade-in duration-700 h-full overflow-y-auto pr-2">
      {/* Category Pills */}
      <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
        {DISCOVERY_CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeCategory === cat 
                ? 'bg-white text-black' 
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {HOME_VIDEOS.map((video) => (
          <div 
            key={video.id}
            onClick={() => onSelectVideo(video)}
            className="group cursor-pointer space-y-3"
          >
            <div className="relative aspect-video rounded-3xl overflow-hidden bg-slate-800 border border-slate-700/50">
              <img 
                src={video.thumbnail} 
                alt={video.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute bottom-3 right-3 bg-black/80 px-2 py-1 rounded text-[10px] font-black text-white">
                {video.duration}
              </div>
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center shadow-xl shadow-blue-600/40">
                  <i className="fa-solid fa-play text-white ml-1"></i>
                </div>
              </div>
            </div>
            <div className="flex gap-3 px-1">
              <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 shrink-0 overflow-hidden flex items-center justify-center">
                 <i className="fa-solid fa-user text-slate-600"></i>
              </div>
              <div className="space-y-1 overflow-hidden">
                <h3 className="text-sm font-bold text-slate-100 leading-tight line-clamp-2 group-hover:text-blue-400 transition-colors">
                  {video.title}
                </h3>
                <div className="flex flex-col">
                   <p className="text-[11px] text-slate-500 font-medium">{video.channel}</p>
                   <p className="text-[10px] text-slate-600">{video.views} views • 4K ULTRA HD</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
