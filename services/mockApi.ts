

import { Club, Table, TableStatus, ZoneType, Bottle, RevenueStats, UserProfile, ClubEvent } from '../types';

const EVENTS_MOCK: ClubEvent[] = [
  { id: 'e1', title: 'Neon Nights', date: 'Tonight', dj: 'DJ Solomun', tags: ['Deep House', 'Techno'] },
  { id: 'e2', title: 'Gold Rush', date: 'Tomorrow', dj: 'Black Coffee', tags: ['Afro House'] },
  { id: 'e3', title: 'Retro Future', date: 'Fri, 15 Oct', dj: 'Disclosure', tags: ['House', 'Garage'] },
];

export const CLUBS: Club[] = [
  {
    id: 'eclipse',
    name: 'ECLIPSE',
    description: 'Underground Techno Cathedral',
    musicGenre: 'Techno',
    capacity: 2000,
    priceRange: '€€€€',
    theme: { primary: '#6366f1', secondary: '#06b6d4', bg: '#030303', text: '#ffffff' },
    manager: { id: 'm1', name: 'Sven', whatsapp: '123456', responseRate: 'Fast', isOnline: true },
    events: EVENTS_MOCK,
    coordinates: { lat: 40.7128, lng: -74.0060 }
  },
  {
    id: 'velvet',
    name: 'VELVET',
    description: 'Rooftop Luxury Lounge',
    musicGenre: 'R&B / Hip Hop',
    capacity: 1500,
    priceRange: '€€€€€',
    theme: { primary: '#D4AF37', secondary: '#ec4899', bg: '#050505', text: '#ffffff' },
    manager: { id: 'm2', name: 'Marcus', whatsapp: '123456', responseRate: 'Instant', isOnline: true },
    events: EVENTS_MOCK,
    coordinates: { lat: 34.0522, lng: -118.2437 }
  },
  {
    id: 'void',
    name: 'VOID',
    description: 'Industrial Warehouse Rave',
    musicGenre: 'Hard Techno',
    capacity: 3000,
    priceRange: '€€',
    theme: { primary: '#ef4444', secondary: '#000000', bg: '#000000', text: '#ffffff' },
    manager: { id: 'm3', name: 'Klaus', whatsapp: '123456', responseRate: 'Slow', isOnline: false },
    events: EVENTS_MOCK,
    coordinates: { lat: 52.5200, lng: 13.4050 }
  }
];

const BOTTLES: Bottle[] = [
  { id: 'b1', name: 'Grey Goose 0.7L', category: 'VODKA', price: 350 },
  { id: 'b2', name: 'Belvedere 1.75L', category: 'VODKA', price: 750 },
  { id: 'b3', name: 'Dom Pérignon', category: 'CHAMPAGNE', price: 600 },
  { id: 'b4', name: 'Ace of Spades', category: 'CHAMPAGNE', price: 900 },
  { id: 'b5', name: 'Clase Azul Reposado', category: 'TEQUILA', price: 550 },
  { id: 'b6', name: 'Don Julio 1942', category: 'TEQUILA', price: 800 },
];

let tablesStore: Record<string, Table[]> = {};

CLUBS.forEach(club => {
  const t: Table[] = [];
  // DJ
  t.push({ id: `${club.id}-dj`, clubId: club.id, label: 'DJ', zoneId: ZoneType.DJ_DECK, x: 400, y: 50, status: TableStatus.LOCKED, minSpend: 0, capacity: 0, shape: 'rect', width: 140, height: 40 });
  
  // Dancefloor
  for(let i=0; i<8; i++) {
    const angle = (i/8)*Math.PI*2;
    t.push({
      id: `${club.id}-df-${i}`, clubId: club.id, label: `DF${i+1}`, zoneId: ZoneType.DANCE_FLOOR,
      x: 400 + Math.cos(angle)*160, y: 300 + Math.sin(angle)*130,
      status: Math.random() > 0.7 ? TableStatus.OCCUPIED : TableStatus.AVAILABLE,
      minSpend: 1000, capacity: 6, shape: 'circle'
    });
  }
  
  // VIP
  for(let i=0; i<6; i++) {
    t.push({
      id: `${club.id}-vip-${i}`, clubId: club.id, label: `VIP${i+1}`, zoneId: ZoneType.VIP_LOUNGE,
      x: i < 3 ? 80 : 720, y: 150 + (i%3)*120,
      status: Math.random() > 0.5 ? TableStatus.RESERVED : TableStatus.AVAILABLE,
      minSpend: 2500, capacity: 10, shape: 'rect', width: 100, height: 80
    });
  }
  tablesStore[club.id] = t;
});

export const api = {
  getClubs: () => Promise.resolve(CLUBS),
  getTables: (id: string) => Promise.resolve(tablesStore[id]),
  getBottles: (clubId?: string) => Promise.resolve(BOTTLES),
  registerUser: (name: string, phone: string, instagram?: string) => Promise.resolve({
    id: 'u1', name, phone, instagram, isAdmin: name === 'Admin', loyaltyTier: 'GOLD', loyaltyPoints: 12500
  } as UserProfile),
  reserveTable: (tableId: string, clubId: string) => {
    const tbls = tablesStore[clubId];
    const t = tbls.find(x => x.id === tableId);
    if(t) t.status = TableStatus.RESERVED;
    return Promise.resolve(true);
  },
  getStats: () => Promise.resolve({ totalRevenue: 150000, occupancyRate: 85, bottlesSold: 320, activeTables: 14 } as RevenueStats)
};