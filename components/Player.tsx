
import React, { useEffect, useRef } from 'react';
import { VideoData } from '../types';

interface PlayerProps {
  video: VideoData;
}

const Player: React.FC<PlayerProps> = ({ video }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex-1 flex flex-col gap-6 animate-in fade-in duration-700">
      <div className="flex-1 relative rounded-[2rem] overflow-hidden shadow-2xl border border-slate-800 bg-black group">
        <iframe
          id="yt-player"
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube.com/embed/${video.id}?autoplay=1&enablejsapi=1&rel=0&showinfo=0&iv_load_policy=3&vq=hd2160&color=white`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        
        {/* Overlay Controls Simulation */}
        <div className="absolute bottom-0 inset-x-0 p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="flex justify-between items-end">
            <div>
              <span className="bg-red-600 text-[10px] font-black px-2 py-0.5 rounded text-white mb-2 inline-block">LIVE 4K</span>
              <h2 className="text-2xl font-black text-white">{video.title}</h2>
              <p className="text-sm text-slate-400 font-medium">{video.channel} • {video.views} viewers</p>
            </div>
            <div className="flex gap-4 pointer-events-auto">
              <button className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white hover:text-black transition-all">
                <i className="fa-solid fa-heart"></i>
              </button>
              <button className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white hover:text-black transition-all">
                <i className="fa-solid fa-share"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mini details below */}
      <div className="glass rounded-[2rem] p-6 border border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
            <i className="fa-solid fa-user text-slate-400"></i>
          </div>
          <div>
            <h4 className="font-bold text-white">{video.channel}</h4>
            <p className="text-xs text-slate-500">2.4M Subscribers</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="px-6 py-2.5 bg-white text-black font-bold rounded-xl text-sm hover:bg-slate-200 transition-colors">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Player;
