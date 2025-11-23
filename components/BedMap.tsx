import React, { useMemo } from 'react';
import { Bed, BedStatus, ZoneType } from '../types';

interface BedMapProps {
  beds: Bed[];
  onBedClick: (bed: Bed) => void;
  selectedBedId?: string;
  isAdminMode: boolean;
}

const getStatusColor = (status: BedStatus) => {
  switch (status) {
    case BedStatus.AVAILABLE: return '#22c55e'; // green-500
    case BedStatus.BOOKED: return '#f97316'; // orange-500
    case BedStatus.OCCUPIED: return '#ef4444'; // red-500
    case BedStatus.MAINTENANCE: return '#64748b'; // slate-500
    default: return '#94a3b8';
  }
};

export const BedMap: React.FC<BedMapProps> = ({ beds, onBedClick, selectedBedId, isAdminMode }) => {
  
  const mapContent = useMemo(() => {
    return (
      <svg viewBox="0 0 800 600" className="w-full h-full bg-[#f8fafc] border border-slate-200 rounded-lg shadow-sm overflow-hidden select-none">
        <defs>
          <pattern id="sandPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
             <circle cx="1" cy="1" r="1" fill="#e2e8f0" />
          </pattern>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="1" dy="2" stdDeviation="2" floodOpacity="0.15"/>
          </filter>
        </defs>
        
        {/* Background - Sand/Floor */}
        <rect width="800" height="600" fill="#fdfbf7" />
        <rect width="800" height="600" fill="url(#sandPattern)" opacity="0.3" />

        {/* Zones */}
        {/* Water Area */}
        <path d="M 0 500 C 200 480, 400 520, 800 500 L 800 600 L 0 600 Z" fill="#bae6fd" />
        <text x="50" y="580" className="text-sm font-semibold fill-blue-800 opacity-50">THE OCEAN</text>

        {/* Pool Area */}
        <g transform="translate(250, 150)">
          <rect x="0" y="0" width="250" height="150" rx="10" fill="#e0f2fe" stroke="#7dd3fc" strokeWidth="2" />
          <text x="125" y="75" textAnchor="middle" className="text-xl font-bold fill-blue-300 pointer-events-none select-none">POOL</text>
        </g>

        {/* VIP Deck */}
        <path d="M 550 100 L 780 100 L 780 250 L 550 250 Z" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="5,5" />
        <text x="665" y="130" textAnchor="middle" className="text-sm font-bold fill-slate-400 pointer-events-none">VIP DECK</text>

        {/* Beds */}
        {beds.map((bed) => (
          <g
            key={bed.id}
            transform={`translate(${bed.x}, ${bed.y}) rotate(${bed.rotation || 0})`}
            onClick={() => onBedClick(bed)}
            className={`cursor-pointer transition-transform duration-200 hover:scale-110 ${selectedBedId === bed.id ? 'scale-110' : ''}`}
            style={{ transformOrigin: 'center' }}
          >
            {/* Bed Shadow */}
            <rect x="-20" y="-12" width="40" height="24" rx="4" fill="black" opacity="0.1" transform="translate(2, 2)" />
            
            {/* Bed Body */}
            <rect 
              x="-20" 
              y="-12" 
              width="40" 
              height="24" 
              rx="4" 
              fill="white" 
              stroke={selectedBedId === bed.id ? '#0ea5e9' : '#94a3b8'} 
              strokeWidth={selectedBedId === bed.id ? 2 : 1}
            />
            
            {/* Pillow */}
            <rect x="-16" y="-8" width="8" height="16" rx="2" fill="#e2e8f0" />
            
            {/* Status Indicator */}
            <circle cx="12" cy="0" r="4" fill={getStatusColor(bed.status)} />
            
            {/* Label - visible on hover or high zoom, here simplified */}
            <text 
              x="0" 
              y="22" 
              textAnchor="middle" 
              className="text-[10px] fill-slate-500 font-medium select-none pointer-events-none"
            >
              {bed.label}
            </text>
          </g>
        ))}

        {isAdminMode && (
             <text x="10" y="20" className="text-xs fill-red-500 font-bold">ADMIN MODE ACTIVE - DRAG ENABLED (Simulated)</text>
        )}
      </svg>
    );
  }, [beds, onBedClick, selectedBedId, isAdminMode]);

  return (
    <div className="w-full h-full relative">
       {mapContent}
    </div>
  );
};