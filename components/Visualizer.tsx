
import React from 'react';

const Visualizer: React.FC = () => {
  return (
    <div className="flex items-end justify-between h-16 w-full gap-1 px-2">
      {[...Array(20)].map((_, i) => (
        <div 
          key={i}
          className="w-1.5 bg-gradient-to-t from-blue-600 to-cyan-400 rounded-full animate-pulse"
          style={{
            height: `${Math.random() * 80 + 20}%`,
            animationDuration: `${Math.random() * 1 + 0.5}s`,
            animationDelay: `${i * 0.05}s`
          }}
        ></div>
      ))}
    </div>
  );
};

export default Visualizer;
