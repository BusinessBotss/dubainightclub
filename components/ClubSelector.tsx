import React, { useEffect, useState } from 'react';
import { Club } from '../types';

interface ClubSelectorProps {
  clubs: Club[];
  onSelectClub: (club: Club) => void;
}

export const ClubSelector: React.FC<ClubSelectorProps> = ({ clubs, onSelectClub }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <div className="p-8 h-full overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-12 transition-all duration-700 transform ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-5xl font-display font-bold text-white mb-4 tracking-tighter">CLUBNIGHT<span className="text-gold-500">OS</span></h1>
            <p className="text-zinc-400 text-sm tracking-[0.3em] uppercase">Select Your Experience</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clubs.map((club, idx) => (
                <div
                    key={club.id}
                    onClick={() => onSelectClub(club)}
                    className={`group relative h-80 rounded-2xl overflow-hidden cursor-pointer border border-zinc-800 hover:border-white/50 transition-all duration-700 transform ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                    style={{
                        background: `linear-gradient(135deg, ${club.theme.bg} 0%, #18181b 100%)`,
                        transitionDelay: `${idx * 100}ms`
                    }}
                >
                    {/* Club Accent Glow */}
                    <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                        style={{ background: `radial-gradient(circle at center, ${club.theme.primary}, transparent 70%)` }}
                    ></div>

                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                        <div className="absolute top-6 right-6">
                            <span className="text-xs font-bold px-3 py-1 rounded-full border border-white/20 text-white/80 bg-black/40 backdrop-blur-md">
                                {club.musicGenre}
                            </span>
                        </div>
                        
                        <div className="transform group-hover:-translate-y-2 transition-transform duration-300">
                            <h2 
                                className="text-3xl font-montserrat font-bold text-white mb-2"
                                style={{ textShadow: `0 0 20px ${club.theme.primary}` }}
                            >
                                {club.name}
                            </h2>
                            <p className="text-zinc-400 text-sm mb-4 line-clamp-2">{club.description}</p>
                            
                            <div className="flex items-center gap-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider group-hover:text-white transition-colors">
                                <span>Cap: {club.capacity}</span>
                                <span className="w-1 h-1 bg-zinc-600 rounded-full"></span>
                                <span style={{ color: club.theme.primary }}>{club.priceRange}</span>
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