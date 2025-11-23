
export enum TableStatus {
  AVAILABLE = 'AVAILABLE', // Theme Primary outline
  RESERVED = 'RESERVED',   // Theme Primary filled
  OCCUPIED = 'OCCUPIED',   // Red/Secondary filled
  LOCKED = 'LOCKED'        // Grey (Needs higher tier)
}

export enum BedStatus {
  AVAILABLE = 'AVAILABLE',
  BOOKED = 'BOOKED',
  OCCUPIED = 'OCCUPIED',
  MAINTENANCE = 'MAINTENANCE'
}

export enum ZoneType {
  DJ_DECK = 'DJ_DECK',
  DANCE_FLOOR = 'DANCE_FLOOR',
  VIP_LOUNGE = 'VIP_LOUNGE',
  TERRACE = 'TERRACE',
  BOOTH = 'BOOTH',
  GENERAL = 'GENERAL'
}

export interface ClubTheme {
  primary: string;   // Main accent (e.g., Gold, Neon Pink)
  secondary: string; // Secondary accent (e.g., Cyan, Green)
  bg: string;        // Background base color
  text: string;
}

export interface Manager {
  id: string;
  name: string;
  photoUrl?: string;
  whatsapp: string;
  responseRate: string; // e.g. "Usually replies in 2 mins"
  isOnline: boolean;
}

export interface Club {
  id: string;
  name: string;
  description: string;
  musicGenre: string;
  capacity: number;
  theme: ClubTheme;
  manager: Manager;
  priceRange: string;
}

export interface Table {
  id: string;
  clubId: string;
  label: string;
  zoneId: ZoneType;
  x: number;
  y: number;
  status: TableStatus;
  minSpend: number; // in EUR
  capacity: number;
  shape?: 'circle' | 'rect';
  rotation?: number;
  width?: number;
  height?: number;
}

export interface Bed {
  id: string;
  label: string;
  x: number;
  y: number;
  rotation?: number;
  status: BedStatus;
}

export interface Bottle {
  id: string;
  name: string;
  category: 'CHAMPAGNE' | 'VODKA' | 'TEQUILA' | 'WHISKEY' | 'GIN' | 'RUM';
  price: number; // EUR
  image?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  instagram?: string;
  isVerified: boolean;
  totalSpendHistory: number;
  isAdmin?: boolean;
}

export interface CartItem extends Bottle {
  quantity: number;
}

export interface RevenueStats {
  totalRevenue: number;
  occupancyRate: number;
  bottlesSold: number;
  activeTables: number;
}

export type ViewState = 'CLUBS_OVERVIEW' | 'CLUB_MAP' | 'BOTTLES' | 'ANALYTICS';
