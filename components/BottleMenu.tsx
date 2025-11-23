
import React, { useEffect, useState } from 'react';
import { Bottle, CartItem } from '../types';
import { api } from '../services/mockApi';
import { PlusIcon, MinusIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';

interface BottleMenuProps {
  minSpend: number;
  currentTab: CartItem[];
  setTab: React.Dispatch<React.SetStateAction<CartItem[]>>;
  onConfirm: () => void;
}

export const BottleMenu: React.FC<BottleMenuProps> = ({ minSpend, currentTab, setTab, onConfirm }) => {
  const [bottles, setBottles] = useState<Bottle[]>([]);

  // In a real app we would pass clubId to get specific menu
  useEffect(() => {
    // Mock passing 'eclipse' for now, ideally passed from props
    api.getBottles('eclipse').then(setBottles);
  }, []);

  const totalSpent = currentTab.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const progress = Math.min((totalSpent / minSpend) * 100, 100);
  const remaining = Math.max(minSpend - totalSpent, 0);

  const addToTab = (bottle: Bottle) => {
    setTab(prev => {
      const existing = prev.find(i => i.id === bottle.id);
      if (existing) {
        return prev.map(i => i.id === bottle.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...bottle, quantity: 1 }];
    });
  };

  const removeFromTab = (bottleId: string) => {
    setTab(prev => {
      const existing = prev.find(i => i.id === bottleId);
      if (existing && existing.quantity > 1) {
        return prev.map(i => i.id === bottleId ? { ...i, quantity: i.quantity - 1 } : i);
      }
      return prev.filter(i => i.id !== bottleId);
    });
  };

  return (
    <div className="max-w-6xl mx-auto pb-20 animate-fade-in">
       {/* Min Spend Header */}
       <div className="sticky top-0 z-30 glass border-b border-white/10 p-6 mb-8 -mx-8 px-8 backdrop-blur-xl">
          <div className="flex justify-between items-end mb-2">
             <div>
                <h2 className="text-xl font-display font-bold text-white">Table Minimum Spend</h2>
                <p className="text-zinc-400 text-sm">Add bottles to your pre-order to meet the minimum requirement.</p>
             </div>
             <div className="text-right">
                <div className="text-2xl font-bold text-theme-primary font-display">€{totalSpent.toLocaleString()}</div>
                <div className="text-xs text-zinc-500 uppercase tracking-wider">Target: €{minSpend.toLocaleString()}</div>
             </div>
          </div>
          
          {/* Progress Bar */}
          <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
             <div 
                className={`h-full transition-all duration-500 ${remaining === 0 ? 'bg-green-500 shadow-glow' : 'bg-theme-primary'}`} 
                style={{ width: `${progress}%` }}
             ></div>
          </div>
          {remaining > 0 ? (
             <div className="text-xs text-right text-red-400 mt-2 font-medium">
                Add €{remaining.toLocaleString()} more to confirm
             </div>
          ) : (
             <div className="text-xs text-right text-green-400 mt-2 font-medium flex justify-end items-center gap-1">
                Minimum Met
             </div>
          )}
       </div>

       {/* Grid */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bottles.map(bottle => {
             const inCart = currentTab.find(i => i.id === bottle.id);
             return (
                <div key={bottle.id} className="bg-zinc-900/80 border border-zinc-800 p-6 rounded-xl hover:border-theme-primary/50 transition-colors group">
                   <div className="flex justify-between items-start mb-4">
                      <div className="h-24 w-24 bg-zinc-800 rounded flex items-center justify-center text-zinc-600 border border-zinc-700">
                         <span className="text-xs uppercase font-bold">{bottle.category}</span>
                      </div>
                      <div className="bg-zinc-950 px-3 py-1 rounded border border-zinc-800 text-theme-primary font-bold text-sm">
                         €{bottle.price.toLocaleString()}
                      </div>
                   </div>
                   
                   <h3 className="text-lg font-bold text-white mb-1 group-hover:text-theme-primary transition-colors">{bottle.name}</h3>
                   <p className="text-xs text-zinc-500 uppercase tracking-widest mb-6">{bottle.category}</p>
                   
                   <div className="flex items-center justify-between">
                      {inCart ? (
                         <div className="flex items-center gap-4 bg-zinc-950 rounded-lg p-1 border border-zinc-800">
                            <button onClick={() => removeFromTab(bottle.id)} className="p-2 hover:bg-zinc-800 rounded text-zinc-400 hover:text-white">
                               <MinusIcon className="w-4 h-4" />
                            </button>
                            <span className="font-bold text-white min-w-[20px] text-center">{inCart.quantity}</span>
                            <button onClick={() => addToTab(bottle)} className="p-2 hover:bg-zinc-800 rounded text-zinc-400 hover:text-white">
                               <PlusIcon className="w-4 h-4" />
                            </button>
                         </div>
                      ) : (
                         <button 
                            onClick={() => addToTab(bottle)}
                            className="text-sm font-semibold text-zinc-400 hover:text-white flex items-center gap-2 px-4 py-2 hover:bg-zinc-800 rounded-lg transition-colors ml-auto border border-transparent hover:border-zinc-700"
                         >
                            Add to Tab <PlusIcon className="w-4 h-4" />
                         </button>
                      )}
                   </div>
                </div>
             );
          })}
       </div>

       {/* Confirm Footer */}
       <div className="fixed bottom-0 left-0 lg:left-80 right-0 p-6 bg-zinc-950/90 backdrop-blur-xl border-t border-zinc-800 flex justify-between items-center z-40">
           <div className="hidden md:block">
              <div className="text-sm text-zinc-400">Total Pre-order</div>
              <div className="text-2xl font-display font-bold text-white">€{totalSpent.toLocaleString()}</div>
           </div>
           
           <button 
              onClick={onConfirm}
              disabled={remaining > 0}
              className="w-full md:w-auto px-12 py-4 bg-theme-primary text-black font-bold uppercase tracking-widest rounded hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-theme"
           >
              Confirm Reservation
           </button>
       </div>
    </div>
  );
};
