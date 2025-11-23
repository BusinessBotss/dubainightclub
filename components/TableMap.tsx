
import React from 'react';
import { Table, TableStatus } from '../types';

interface TableMapProps {
  tables: Table[];
  onTableClick: (table: Table) => void;
  selectedTableId?: string;
}

const getStatusColor = (status: TableStatus) => {
  switch (status) {
    case TableStatus.AVAILABLE: return 'var(--primary)'; // Theme Color
    case TableStatus.RESERVED: return '#ffffff'; // White for reserved in dark mode often looks better or gold? Spec says Gold Filled.
    case TableStatus.OCCUPIED: return '#ef4444'; // Red for Occupied
    case TableStatus.LOCKED: return '#3f3f46'; // Zinc Locked
    default: return '#3f3f46';
  }
};

export const TableMap: React.FC<TableMapProps> = ({ tables, onTableClick, selectedTableId }) => {
  
  return (
    <div className="w-full h-full relative flex items-center justify-center p-4">
      <svg viewBox="0 0 800 600" className="w-full h-full max-w-5xl bg-black/40 border border-white/10 rounded-3xl shadow-2xl overflow-hidden select-none backdrop-blur-sm">
        <defs>
          <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
             <feGaussianBlur stdDeviation="4" result="coloredBlur" />
             <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
             </feMerge>
          </filter>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeOpacity="0.05" strokeWidth="1" className="text-white" />
          </pattern>
          <radialGradient id="dancefloor-glow" cx="0.5" cy="0.5" r="0.5">
             <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.2" />
             <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Floor Grid */}
        <rect width="800" height="600" fill="url(#grid)" />

        {/* Zones Layout (Generic) */}
        
        {/* Center Zone (Dance Floor) */}
        <circle cx="400" cy="300" r="120" fill="url(#dancefloor-glow)" />
        <circle cx="400" cy="300" r="118" fill="none" stroke="var(--primary)" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
        
        {/* DJ Area */}
        <g transform="translate(340, 40)">
           <path d="M 0 0 L 120 0 L 110 60 L 10 60 Z" fill="#121212" stroke="var(--primary)" strokeWidth="2" />
           <text x="60" y="35" textAnchor="middle" className="text-xs font-bold fill-white tracking-widest">DJ BOOTH</text>
           {/* Visualizer bars */}
           <rect x="20" y="45" width="5" height="10" fill="var(--primary)" className="animate-pulse" />
           <rect x="30" y="40" width="5" height="15" fill="var(--primary)" className="animate-pulse" style={{animationDelay: '0.1s'}} />
           <rect x="40" y="48" width="5" height="7" fill="var(--primary)" className="animate-pulse" style={{animationDelay: '0.2s'}} />
           <rect x="80" y="45" width="5" height="10" fill="var(--primary)" className="animate-pulse" />
           <rect x="90" y="40" width="5" height="15" fill="var(--primary)" className="animate-pulse" style={{animationDelay: '0.1s'}} />
        </g>

        {/* Tables */}
        {tables.map((table) => {
            const isSelected = selectedTableId === table.id;
            const color = getStatusColor(table.status);
            const isAvailable = table.status === TableStatus.AVAILABLE;
            const isReserved = table.status === TableStatus.RESERVED;
            
            return (
              <g
                key={table.id}
                transform={`translate(${table.x}, ${table.y}) rotate(${table.rotation || 0})`}
                onClick={() => table.status !== TableStatus.LOCKED && onTableClick(table)}
                className={`transition-all duration-300 ${table.status !== TableStatus.LOCKED ? 'cursor-pointer' : 'cursor-not-allowed opacity-40'}`}
                style={{ filter: isSelected ? 'drop-shadow(0 0 10px var(--primary))' : 'none' }}
              >
                {/* Table Shape */}
                {table.shape === 'circle' ? (
                    <circle 
                        r="22" 
                        fill={isReserved ? color : '#18181b'} 
                        stroke={color} 
                        strokeWidth={isSelected ? 3 : 2}
                        className="transition-colors duration-300"
                    />
                ) : (
                    <rect 
                        x={-(table.width || 60)/2} 
                        y={-(table.height || 60)/2} 
                        width={table.width || 60} 
                        height={table.height || 60} 
                        rx="4"
                        fill={isReserved ? color : '#18181b'} 
                        stroke={color}
                        strokeWidth={isSelected ? 3 : 2}
                        className="transition-colors duration-300"
                    />
                )}

                {/* Status Indicator / Inner Glow */}
                {isAvailable && (
                     table.shape === 'circle' ? (
                        <circle r="22" fill={color} opacity="0.1" className="animate-pulse-slow" />
                     ) : (
                        <rect 
                            x={-(table.width || 60)/2} 
                            y={-(table.height || 60)/2} 
                            width={table.width || 60} 
                            height={table.height || 60}
                            rx="4" 
                            fill={color} 
                            opacity="0.1"
                            className="animate-pulse-slow" 
                        />
                     )
                )}

                {/* Label */}
                <text 
                  x="0" 
                  y="4" 
                  textAnchor="middle" 
                  className={`text-[9px] font-bold pointer-events-none select-none ${isReserved ? 'fill-black' : 'fill-white'}`}
                >
                  {table.label}
                </text>
                
                {/* Hover Min Spend (Simplified) */}
                {isSelected && (
                    <g transform="translate(0, -35)">
                         <rect x="-40" y="-20" width="80" height="20" rx="4" fill="var(--primary)" />
                         <text x="0" y="-6" textAnchor="middle" className="text-[10px] font-bold fill-black">
                            €{table.minSpend}
                         </text>
                         <path d="M -5 0 L 5 0 L 0 5 Z" fill="var(--primary)" transform="translate(0, 0)" />
                    </g>
                )}
              </g>
            );
        })}

      </svg>
    </div>
  );
};
