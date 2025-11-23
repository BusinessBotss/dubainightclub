
import React from 'react';
import { Table } from '../types';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface BookingModalProps {
  table: Table;
  onClose: () => void;
  onProceed: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ table, onClose, onProceed }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-zinc-900 rounded-2xl border border-theme-primary/30 shadow-2xl w-full max-w-md overflow-hidden relative">
        
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-zinc-500 hover:text-white z-10">
            <XMarkIcon className="w-6 h-6" />
        </button>

        {/* Decorative Top Glow */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-theme-primary to-transparent opacity-70"></div>

        <div className="p-8 text-center">
            <h3 className="text-theme-primary text-xs tracking-[0.3em] uppercase mb-2">{table.zoneId.replace('_', ' ')}</h3>
            <h2 className="text-4xl font-display font-bold text-white mb-6 text-shadow-glow">{table.label}</h2>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-zinc-950 p-4 rounded-lg border border-zinc-800">
                    <div className="text-zinc-500 text-xs uppercase mb-1">Guests</div>
                    <div className="text-xl font-bold text-white">{table.capacity}</div>
                </div>
                <div className="bg-zinc-950 p-4 rounded-lg border border-zinc-800">
                    <div className="text-zinc-500 text-xs uppercase mb-1">Min Spend</div>
                    <div className="text-xl font-bold text-theme-primary">€{table.minSpend.toLocaleString()}</div>
                </div>
            </div>

            <div className="text-sm text-zinc-400 mb-8 leading-relaxed">
                You are requesting access to a <span className="text-white font-semibold">Prime Location</span> table. 
                A minimum spend applies. Please proceed to select your bottle service to confirm.
            </div>

            <div className="flex gap-4">
                <button 
                    onClick={onClose}
                    className="flex-1 py-3 border border-zinc-700 text-zinc-300 rounded hover:bg-zinc-800 hover:text-white transition-colors uppercase text-xs font-bold tracking-widest"
                >
                    Cancel
                </button>
                <button 
                    onClick={onProceed}
                    className="flex-1 py-3 bg-theme-primary text-black rounded hover:opacity-90 transition-colors uppercase text-xs font-bold tracking-widest shadow-theme"
                >
                    Start Tab
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};
