
import React, { useState } from 'react';
import { Table } from '../types';
import { XMarkIcon, CalculatorIcon } from '@heroicons/react/24/outline';

interface BookingModalProps {
  table: Table;
  onClose: () => void;
  onProceed: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ table, onClose, onProceed }) => {
  const [splitCount, setSplitCount] = useState(1);
  const [specialRequest, setSpecialRequest] = useState('');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="p-6 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/50">
          <div>
            <div className="text-[10px] text-theme-primary uppercase tracking-[0.2em] mb-1">Reservation</div>
            <h2 className="text-2xl text-white font-thin uppercase tracking-wide">{table.label}</h2>
          </div>
          <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8 space-y-8">
           {/* Stats Row */}
           <div className="grid grid-cols-2 gap-4">
              <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl text-center">
                 <div className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Capacity</div>
                 <div className="text-xl font-light text-white">{table.capacity} Guests</div>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl text-center border-b-2 border-b-theme-primary">
                 <div className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Min Spend</div>
                 <div className="text-xl font-light text-theme-primary">€{table.minSpend.toLocaleString()}</div>
              </div>
           </div>

           {/* Feature: Split Bill Calculator */}
           <div className="bg-zinc-900/30 p-4 rounded-xl border border-zinc-800/50">
              <div className="flex items-center gap-2 mb-4">
                 <CalculatorIcon className="w-4 h-4 text-theme-primary" />
                 <span className="text-xs uppercase tracking-widest text-zinc-400">Split Calculator</span>
              </div>
              <div className="flex items-center justify-between">
                 <div className="flex items-center gap-3 bg-zinc-950 rounded-lg p-1 border border-zinc-800">
                    <button 
                      onClick={() => setSplitCount(Math.max(1, splitCount-1))}
                      className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 rounded"
                    >-</button>
                    <span className="text-sm font-mono w-4 text-center">{splitCount}</span>
                    <button 
                      onClick={() => setSplitCount(splitCount+1)}
                      className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 rounded"
                    >+</button>
                 </div>
                 <div className="text-right">
                    <div className="text-[10px] text-zinc-500 uppercase">Per Person</div>
                    <div className="text-lg font-light text-white">€{Math.round(table.minSpend / splitCount).toLocaleString()}</div>
                 </div>
              </div>
           </div>

           {/* Feature: Special Requests */}
           <div>
             <label className="text-[10px] text-zinc-500 uppercase tracking-widest block mb-2">Concierge Request</label>
             <textarea 
               value={specialRequest}
               onChange={e => setSpecialRequest(e.target.value)}
               placeholder="Need sparklers? Birthday cake? Specific mixers?"
               className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-sm text-white placeholder-zinc-700 focus:outline-none focus:border-theme-primary min-h-[80px]"
             />
           </div>
        </div>

        <div className="p-6 border-t border-zinc-800 flex gap-4 bg-zinc-900/50">
           <button onClick={onClose} className="flex-1 py-4 text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">
             Cancel
           </button>
           <button 
             onClick={onProceed}
             className="flex-1 py-4 bg-theme-primary text-black text-xs font-bold uppercase tracking-widest rounded hover:bg-white transition-colors shadow-[0_0_20px_rgba(212,175,55,0.3)]"
           >
             Start Tab
           </button>
        </div>
      </div>
    </div>
  );
};
