import React, { useState } from 'react';
import { UserProfile } from '../types';
import { api } from '../services/mockApi';

interface RegistrationProps {
  onRegister: (user: UserProfile) => void;
}

export const Registration: React.FC<RegistrationProps> = ({ onRegister }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [instagram, setInstagram] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const user = await api.registerUser(name, phone, instagram);
    setLoading(false);
    onRegister(user);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-obsidian bg-noise">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
         <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-neon-purple rounded-full blur-[120px] opacity-20 animate-pulse-slow"></div>
         <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-gold-500 rounded-full blur-[120px] opacity-10 animate-pulse-slow" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative w-full max-w-md p-8 glass rounded-2xl border border-zinc-800 shadow-2xl backdrop-blur-xl">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-display font-bold text-white mb-2 drop-shadow-glow">NOCTURNE</h1>
          <p className="text-gold-500 text-xs tracking-[0.3em] uppercase">Members Only Access</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider text-zinc-500 font-semibold">Full Name</label>
            <input 
              required
              type="text" 
              value={name} 
              onChange={e => setName(e.target.value)}
              className="w-full bg-zinc-900/50 border border-zinc-700 rounded p-4 text-white focus:outline-none focus:border-gold-500 transition-colors placeholder-zinc-700"
              placeholder="Enter your name"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider text-zinc-500 font-semibold">Mobile Number</label>
            <input 
              required
              type="tel" 
              value={phone} 
              onChange={e => setPhone(e.target.value)}
              className="w-full bg-zinc-900/50 border border-zinc-700 rounded p-4 text-white focus:outline-none focus:border-gold-500 transition-colors placeholder-zinc-700"
              placeholder="+971 50 000 0000"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider text-zinc-500 font-semibold">Instagram (For Verification)</label>
            <input 
              required
              type="text" 
              value={instagram} 
              onChange={e => setInstagram(e.target.value)}
              className="w-full bg-zinc-900/50 border border-zinc-700 rounded p-4 text-white focus:outline-none focus:border-gold-500 transition-colors placeholder-zinc-700"
              placeholder="@username"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gold-500 hover:bg-gold-400 text-black font-bold py-4 rounded transition-all transform hover:scale-[1.02] shadow-gold disabled:opacity-50 disabled:cursor-not-allowed mt-4"
          >
            {loading ? 'VERIFYING...' : 'REQUEST ACCESS'}
          </button>
        </form>

        <p className="text-center text-zinc-600 text-[10px] mt-8 uppercase tracking-wide">
           Strict door policy applies • Minimum spend required
        </p>
      </div>
    </div>
  );
};