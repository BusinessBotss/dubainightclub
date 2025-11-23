import React, { useEffect, useState } from 'react';
import { api } from '../services/mockApi';
import { RevenueStats } from '../types';

const hourlyData = [
  { label: '22:00', value: 12000, height: '15%' },
  { label: '23:00', value: 35000, height: '40%' },
  { label: '00:00', value: 68000, height: '75%' },
  { label: '01:00', value: 92000, height: '100%' },
  { label: '02:00', value: 54000, height: '60%' },
  { label: '03:00', value: 20000, height: '25%' },
];

const pieData = [
  { name: 'Champagne', value: 65, color: '#D4AF37' },
  { name: 'Vodka', value: 25, color: '#8B5CF6' },
  { name: 'Tequila', value: 10, color: '#10b981' },
];

export const Analytics: React.FC = () => {
  const [stats, setStats] = useState<RevenueStats | null>(null);

  useEffect(() => {
    api.getStats().then(setStats);
  }, []);

  if (!stats) return <div className="p-8 text-zinc-500">Loading analytics...</div>;

  return (
    <div className="p-8 h-full overflow-y-auto animate-fade-in">
      <h2 className="text-3xl font-display font-bold text-white mb-8">Nightly Performance</h2>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
          <div className="text-xs text-zinc-500 uppercase tracking-widest">Total Revenue</div>
          <div className="text-3xl font-bold text-gold-500 mt-2 text-shadow-gold">{stats.totalRevenue.toLocaleString()} AED</div>
        </div>
        <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
          <div className="text-xs text-zinc-500 uppercase tracking-widest">Occupancy</div>
          <div className="text-3xl font-bold text-white mt-2">{stats.occupancyRate}%</div>
        </div>
        <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
          <div className="text-xs text-zinc-500 uppercase tracking-widest">Bottles Sold</div>
          <div className="text-3xl font-bold text-white mt-2">{stats.bottlesSold}</div>
        </div>
        <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
           <div className="text-xs text-zinc-500 uppercase tracking-widest">Active Tables</div>
           <div className="text-3xl font-bold text-theme-primary mt-2 text-shadow-theme">{stats.activeTables}</div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Simple Bar Chart */}
        <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 h-80 flex flex-col">
          <h3 className="text-sm font-bold text-zinc-400 mb-6 uppercase">Hourly Revenue</h3>
          <div className="flex-1 flex items-end justify-between gap-2">
            {hourlyData.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center justify-end h-full group">
                    <div 
                        className="w-full bg-gold-500/80 rounded-t-sm hover:bg-gold-500 transition-all duration-500 relative"
                        style={{ height: d.height }}
                    >
                        {/* Tooltip */}
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-zinc-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-zinc-700 pointer-events-none">
                            AED {d.value.toLocaleString()}
                        </div>
                    </div>
                    <div className="text-[10px] text-zinc-600 mt-2 font-mono">{d.label}</div>
                </div>
            ))}
          </div>
        </div>

        {/* Simple Pie Chart Representation */}
        <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 h-80 flex flex-col">
           <h3 className="text-sm font-bold text-zinc-400 mb-6 uppercase">Sales Mix</h3>
           <div className="flex-1 flex items-center justify-center gap-8">
               {/* CSS Conic Gradient Pie Chart */}
               <div 
                className="w-40 h-40 rounded-full relative"
                style={{
                    background: `conic-gradient(
                        ${pieData[0].color} 0% 65%, 
                        ${pieData[1].color} 65% 90%, 
                        ${pieData[2].color} 90% 100%
                    )`
                }}
               >
                   <div className="absolute inset-0 m-8 bg-zinc-900 rounded-full flex items-center justify-center">
                       <span className="text-xs font-bold text-zinc-500 uppercase">Mix</span>
                   </div>
               </div>

               {/* Legend */}
               <div className="space-y-3">
                    {pieData.map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                            <div className="flex flex-col">
                                <span className="text-xs font-bold text-white">{item.name}</span>
                                <span className="text-[10px] text-zinc-500">{item.value}%</span>
                            </div>
                        </div>
                    ))}
               </div>
           </div>
        </div>
      </div>
    </div>
  );
};