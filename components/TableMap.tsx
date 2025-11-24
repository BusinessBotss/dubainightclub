
import React, { useState } from 'react';
import { Table, TableStatus } from '../types';

interface TableMapProps {
  tables: Table[];
  onTableClick: (table: Table) => void;
  selectedTableId?: string;
  isHeatmapMode: boolean;
}

export const TableMap: React.FC<TableMapProps> = ({ tables, onTableClick, selectedTableId, isHeatmapMode }) => {
  const [is3D, setIs3D] = useState(false);

  const getStatusColor = (status: TableStatus) => {
    if (isHeatmapMode) {
      // Heatmap logic: Occupied = Hot (Red), Reserved = Warm (Orange), Available = Cool (Blue)
      switch(status) {
        case TableStatus.OCCUPIED: return '#ef4444'; 
        case TableStatus.RESERVED: return '#f97316';
        default: return '#3b82f6';
      }
    }
    switch (status) {
      case TableStatus.AVAILABLE: return 'var(--primary)';
      case TableStatus.RESERVED: return '#ffffff';
      case TableStatus.OCCUPIED: return '#ef4444';
      case TableStatus.LOCKED: return '#27272a';
      default: return '#27272a';
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
      {/* 3D Toggle Control */}
      <div className="absolute top-6 right-6 z-20 flex gap-2">
         <button 
           onClick={() => setIs3D(!is3D)}
           className={`px-3 py-1 text-[10px] uppercase tracking-widest border transition-all ${is3D ? 'bg-theme-primary text-black border-theme-primary' : 'text-zinc-400 border-zinc-700 hover:text-white'}`}
         >
           3D View
         </button>
      </div>

      <div className={`relative transition-all duration-1000 ease-in-out ${is3D ? 'perspective-1000' : ''} w-full h-full flex items-center justify-center`}>
        <div 
          className={`relative w-[800px] h-[600px] transition-transform duration-1000 preserve-3d ${is3D ? 'rotate-x-30 scale-75' : ''}`}
        >
          <svg 
            viewBox="0 0 800 600" 
            className="w-full h-full drop-shadow-2xl overflow-visible"
            style={{ filter: is3D ? 'drop-shadow(0 25px 25px rgba(0,0,0,0.5))' : '' }}
          >
            {/* Floor Base */}
            <rect width="800" height="600" rx="30" fill="#09090b" stroke="#27272a" strokeWidth="1" />
            <path d="M 0 0 L 800 600" stroke="#27272a" strokeWidth="0.5" opacity="0.1" />
            <path d="M 800 0 L 0 600" stroke="#27272a" strokeWidth="0.5" opacity="0.1" />
            
            {/* Grid Pattern */}
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#27272a" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="800" height="600" fill="url(#grid)" rx="30" opacity="0.3" />

            {/* Central Glow (Dance Floor) */}
            <circle cx="400" cy="300" r="150" fill="var(--primary)" opacity="0.05" className="animate-pulse-slow" />
            <circle cx="400" cy="300" r="148" fill="none" stroke="var(--primary)" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.3" />

            {/* Tables */}
            {tables.map(table => {
              const isSelected = selectedTableId === table.id;
              const color = getStatusColor(table.status);
              
              return (
                <g 
                  key={table.id}
                  transform={`translate(${table.x}, ${table.y}) rotate(${table.rotation || 0})`}
                  onClick={() => table.status !== TableStatus.LOCKED && onTableClick(table)}
                  className={`${table.status !== TableStatus.LOCKED ? 'cursor-pointer hover:opacity-80' : 'cursor-not-allowed'} transition-all duration-300`}
                  style={{ transformOrigin: 'center' }}
                >
                  {/* Table Shadow for 3D effect */}
                  {is3D && (
                    <g transform="translate(0, 10)" opacity="0.5">
                       {table.shape === 'circle' 
                         ? <circle r="22" fill="#000" />
                         : <rect x={-(table.width||60)/2} y={-(table.height||60)/2} width={table.width||60} height={table.height||60} rx="4" fill="#000" />
                       }
                    </g>
                  )}

                  {/* Main Shape */}
                  {table.shape === 'circle' ? (
                    <circle 
                      r="22" 
                      fill={table.status === TableStatus.RESERVED && !isHeatmapMode ? color : '#18181b'} 
                      stroke={color} 
                      strokeWidth={isSelected ? 3 : 1} 
                    />
                  ) : (
                    <rect 
                      x={-(table.width||60)/2} 
                      y={-(table.height||60)/2} 
                      width={table.width||60} 
                      height={table.height||60} 
                      rx="4"
                      fill={table.status === TableStatus.RESERVED && !isHeatmapMode ? color : '#18181b'} 
                      stroke={color} 
                      strokeWidth={isSelected ? 3 : 1}
                    />
                  )}

                  {/* 3D Height Extrusion Mockup */}
                  {is3D && (
                    <path 
                      d={table.shape === 'circle' 
                        ? "M -22 0 A 22 22 0 0 0 22 0 L 22 5 A 22 22 0 0 1 -22 5 Z"
                        : `M ${-(table.width||60)/2} ${(table.height||60)/2} L ${(table.width||60)/2} ${(table.height||60)/2} L ${(table.width||60)/2} ${(table.height||60)/2 + 5} L ${-(table.width||60)/2} ${(table.height||60)/2 + 5} Z`
                      }
                      fill={color}
                      opacity="0.5"
                    />
                  )}

                  <text 
                    y="4" 
                    textAnchor="middle" 
                    className="text-[8px] font-mono fill-zinc-400 pointer-events-none select-none tracking-wider"
                    style={{ transform: is3D ? 'rotateX(-30deg)' : '' }}
                  >
                    {table.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
};
