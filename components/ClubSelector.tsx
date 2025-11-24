
import React, { useEffect, useState } from 'react';
import { Club } from '../types';

interface ClubSelectorProps {
  clubs: Club[];
  onSelectClub: (club: Club) => void;
}

export const ClubSelector: React.FC<ClubSelectorProps> = ({ clubs, onSelectClub }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="h-full w-full overflow-y-auto p-4 md:p-12 relative z-10">
      <div className={`transition-all duration-1000 ease-out transform ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="flex flex-col items-center justify-center mb-16 space-y-2">
          <div className="h-px w-20 bg-theme-primary opacity-50 mb-4"></div>
          <h1 className="text-4xl md:text-7xl text-white font-thin tracking-widest text-center uppercase">
            ClubNight<span className="font-bold text-theme-primary">OS</span>
          </h1>
          <p className="text-zinc-500 font-extralight tracking-[0.5em] text-xs md:text-sm uppercase mt-4">
            Global Nightlife Architecture
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {clubs.map((club, i) => (
            <div 
              key={club.id}
              onClick={() => onSelectClub(club)}
              className="group relative h-[450px] bg-zinc-900/40 border border-zinc-800 hover:border-theme-primary/60 transition-all duration-500 cursor-pointer overflow-hidden backdrop-blur-sm"
            >
              <div 
                className="absolute inset-0 opacity-40 group-hover:opacity-20 transition-opacity duration-700 bg-cover bg-center grayscale group-hover:grayscale-0"
                style={{ backgroundImage: `url('https://source.unsplash.com/random/800x600/?club,nightlife,${i}')` }}
              ></div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-90"></div>
              
              <div className="absolute inset-0 p-8 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                   <span className="text-[10px] text-zinc-400 font-mono border border-zinc-800 px-2 py-1 uppercase tracking-widest">
                     {club.id.substring(0,3).toUpperCase()} // 00{i+1}
                   </span>
                   <div className="flex flex-col items-end">
                      <span className="text-theme-primary text-xs font-bold tracking-widest uppercase">Open</span>
                      <span className="text-[10px] text-zinc-600 uppercase tracking-widest">Live Now</span>
                   </div>
                </div>

                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h2 className="text-4xl font-thin text-white uppercase tracking-wider mb-2 group-hover:text-theme-primary transition-colors">
                    {club.name}
                  </h2>
                  <div className="h-px w-12 bg-white/20 mb-4 group-hover:w-full transition-all duration-700"></div>
                  <p className="text-zinc-400 font-extralight text-sm tracking-wide mb-6 line-clamp-2">
                    {club.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 border-t border-zinc-800/50 pt-4">
                    <div>
                      <div className="text-[10px] text-zinc-600 uppercase tracking-widest mb-1">Genre</div>
                      <div className="text-xs text-zinc-300 font-light uppercase tracking-widest">{club.musicGenre}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-zinc-600 uppercase tracking-widest mb-1">Exclusivity</div>
                      <div className="text-xs text-theme-primary font-light tracking-widest">{club.priceRange}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
