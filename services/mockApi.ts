
import { Table, TableStatus, ZoneType, Bottle, RevenueStats, UserProfile, Club } from '../types';

// --- CLUB DATA ---
export const CLUBS: Club[] = [
  {
    id: 'eclipse',
    name: 'Eclipse Club',
    description: 'Underground Techno & Electronic Haven',
    musicGenre: 'Techno / Progressive',
    capacity: 2000,
    priceRange: '€250 - €800',
    theme: { primary: '#6366f1', secondary: '#06b6d4', bg: '#000000', text: '#ffffff' }, // Indigo/Cyan
    manager: { id: 'm1', name: 'Sven', whatsapp: '+34600000001', responseRate: '< 2 min', isOnline: true }
  },
  {
    id: 'velvet',
    name: 'Velvet Lounge',
    description: 'Urban Luxury & Hip-Hop Culture',
    musicGenre: 'Hip-Hop / R&B',
    capacity: 1500,
    priceRange: '€300 - €1800',
    theme: { primary: '#fbbf24', secondary: '#ec4899', bg: '#121212', text: '#ffffff' }, // Gold/Pink
    manager: { id: 'm2', name: 'Marcus', whatsapp: '+34600000002', responseRate: '< 5 min', isOnline: true }
  },
  {
    id: 'neon',
    name: 'Neon Pulse',
    description: 'High Energy EDM Festival Vibes',
    musicGenre: 'EDM / Big Room',
    capacity: 3000,
    priceRange: '€280 - €1500',
    theme: { primary: '#ff0080', secondary: '#00ff80', bg: '#050505', text: '#ffffff' }, // Neon Pink/Green
    manager: { id: 'm3', name: 'Sarah', whatsapp: '+34600000003', responseRate: 'Instant', isOnline: true }
  },
  {
    id: 'underground',
    name: 'The Underground',
    description: 'Alternative Indie & Intimate Sessions',
    musicGenre: 'Indie / Alternative',
    capacity: 800,
    priceRange: '€200 - €1000',
    theme: { primary: '#f97316', secondary: '#9ca3af', bg: '#1f1f1f', text: '#ffffff' }, // Orange/Grey
    manager: { id: 'm4', name: 'Alex', whatsapp: '+34600000004', responseRate: '< 10 min', isOnline: false }
  },
  {
    id: 'skyline',
    name: 'Skyline Terrace',
    description: 'Rooftop Luxury with Panoramic Views',
    musicGenre: 'House / Deep House',
    capacity: 1200,
    priceRange: '€350 - €2000',
    theme: { primary: '#0ea5e9', secondary: '#fb7185', bg: '#0f172a', text: '#f1f5f9' }, // Sky Blue/Coral
    manager: { id: 'm5', name: 'Isabella', whatsapp: '+34600000005', responseRate: '< 1 min', isOnline: true }
  }
];

const BOTTLE_MENU: Bottle[] = [
  { id: 'b1', name: 'Grey Goose 0.7L', category: 'VODKA', price: 280 },
  { id: 'b2', name: 'Belvedere 0.7L', category: 'VODKA', price: 270 },
  { id: 'b3', name: 'Dom Pérignon Luminous', category: 'CHAMPAGNE', price: 550 },
  { id: 'b4', name: 'Moët & Chandon', category: 'CHAMPAGNE', price: 220 },
  { id: 'b5', name: 'Don Julio 1942', category: 'TEQUILA', price: 420 },
  { id: 'b6', name: 'Patrón XO Cafe', category: 'TEQUILA', price: 220 },
  { id: 'b7', name: 'Johnnie Walker Blue', category: 'WHISKEY', price: 400 },
  { id: 'b8', name: 'Macallan 18Y', category: 'WHISKEY', price: 450 },
];

// Generate tables helper
const generateTables = (clubId: string): Table[] => {
  const tables: Table[] = [];
  const club = CLUBS.find(c => c.id === clubId);
  if (!club) return [];

  // DJ BOOTH
  tables.push({ id: `${clubId}-dj`, clubId, label: 'DJ BOOTH', zoneId: ZoneType.DJ_DECK, x: 400, y: 50, status: TableStatus.LOCKED, minSpend: 0, capacity: 5, shape: 'rect', width: 120, height: 40 });

  // DANCE FLOOR RING (Circular)
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    const x = 400 + Math.cos(angle) * 150;
    const y = 300 + Math.sin(angle) * 120;
    tables.push({
      id: `${clubId}-df-${i}`,
      clubId,
      label: `DF-${i+1}`,
      zoneId: ZoneType.DANCE_FLOOR,
      x,
      y,
      status: Math.random() > 0.7 ? TableStatus.OCCUPIED : TableStatus.AVAILABLE,
      minSpend: clubId === 'velvet' ? 600 : 400,
      capacity: 6,
      shape: 'circle',
      rotation: (angle * 180) / Math.PI
    });
  }

  // VIP BOOTHS (Sides)
  for (let i = 0; i < 4; i++) {
    tables.push({
      id: `${clubId}-vip-l-${i}`,
      clubId,
      label: `VIP-L${i+1}`,
      zoneId: ZoneType.VIP_LOUNGE,
      x: 80,
      y: 150 + (i * 100),
      status: Math.random() > 0.6 ? TableStatus.RESERVED : TableStatus.AVAILABLE,
      minSpend: 800,
      capacity: 10,
      shape: 'rect',
      width: 100,
      height: 80
    });
    tables.push({
      id: `${clubId}-vip-r-${i}`,
      clubId,
      label: `VIP-R${i+1}`,
      zoneId: ZoneType.VIP_LOUNGE,
      x: 720,
      y: 150 + (i * 100),
      status: Math.random() > 0.8 ? TableStatus.LOCKED : TableStatus.AVAILABLE,
      minSpend: 800,
      capacity: 10,
      shape: 'rect',
      width: 100,
      height: 80
    });
  }

  // SKY/PREMIUM (Top for Skyline/Velvet)
  if (clubId === 'skyline' || clubId === 'velvet') {
     tables.push({ id: `${clubId}-sky-1`, clubId, label: 'SKY VIP 1', zoneId: ZoneType.TERRACE, x: 200, y: 100, status: TableStatus.AVAILABLE, minSpend: 1500, capacity: 15, shape: 'rect', width: 140, height: 80 });
     tables.push({ id: `${clubId}-sky-2`, clubId, label: 'SKY VIP 2', zoneId: ZoneType.TERRACE, x: 600, y: 100, status: TableStatus.AVAILABLE, minSpend: 1500, capacity: 15, shape: 'rect', width: 140, height: 80 });
  }

  return tables;
};

// --- STORE ---
let tablesStore: Record<string, Table[]> = {};
CLUBS.forEach(club => {
  tablesStore[club.id] = generateTables(club.id);
});

let listeners: ((tables: Table[]) => void)[] = [];

// --- REAL-TIME SIMULATION ---
const broadcastUpdate = (clubId: string) => {
  listeners.forEach(cb => cb([...tablesStore[clubId]]));
};

export const subscribeToTableUpdates = (clubId: string, callback: (tables: Table[]) => void) => {
  listeners.push(callback);
  callback([...tablesStore[clubId]]);
  return () => {
    listeners = listeners.filter(l => l !== callback);
  };
};

export const api = {
  getClubs: async (): Promise<Club[]> => {
    return Promise.resolve(CLUBS);
  },

  getClubDetails: async (id: string): Promise<Club | undefined> => {
    return Promise.resolve(CLUBS.find(c => c.id === id));
  },

  getTables: async (clubId: string): Promise<Table[]> => {
    return Promise.resolve([...tablesStore[clubId]]);
  },

  getBottles: async (clubId: string): Promise<Bottle[]> => {
    // Basic price variation per club simulation
    const multiplier = clubId === 'velvet' || clubId === 'skyline' ? 1.2 : 1.0;
    return Promise.resolve(BOTTLE_MENU.map(b => ({...b, price: Math.round(b.price * multiplier) })));
  },

  registerUser: async (name: string, phone: string, instagram: string): Promise<UserProfile> => {
     return new Promise(resolve => {
        setTimeout(() => {
           resolve({
              id: Date.now().toString(),
              name,
              phone,
              instagram,
              isVerified: true,
              totalSpendHistory: 0,
              isAdmin: name.toLowerCase() === 'admin' 
           });
        }, 800);
     });
  },

  reserveTable: async (tableId: string, clubId: string): Promise<boolean> => {
    const clubTables = tablesStore[clubId];
    const idx = clubTables.findIndex(t => t.id === tableId);
    if (idx !== -1 && clubTables[idx].status === TableStatus.AVAILABLE) {
      clubTables[idx] = { ...clubTables[idx], status: TableStatus.RESERVED };
      broadcastUpdate(clubId);
      return true;
    }
    return false;
  },

  getStats: async (): Promise<RevenueStats> => {
    // Aggregate stats across all clubs roughly
    return {
      totalRevenue: 1088000,
      occupancyRate: 72,
      bottlesSold: 450,
      activeTables: 85
    };
  }
};
