

export enum TableStatus {
  AVAILABLE = 'AVAILABLE',
  RESERVED = 'RESERVED',
  OCCUPIED = 'OCCUPIED',
  LOCKED = 'LOCKED'
}

export enum ZoneType {
  DJ_DECK = 'DJ_DECK',
  DANCE_FLOOR = 'DANCE_FLOOR',
  VIP_LOUNGE = 'VIP_LOUNGE',
  TERRACE = 'TERRACE',
  BOOTH = 'BOOTH'
}

export interface ClubTheme {
  primary: string;
  secondary: string;
  bg: string;
  text: string;
}

export interface Manager {
  id: string;
  name: string;
  whatsapp: string;
  responseRate: string;
  isOnline: boolean;
}

export interface ClubEvent {
  id: string;
  title: string;
  date: string;
  dj: string;
  tags: string[];
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
  events: ClubEvent[];
  coordinates: { lat: number, lng: number }; // For Uber/Maps
}

export interface Table {
  id: string;
  clubId: string;
  label: string;
  zoneId: ZoneType;
  x: number;
  y: number;
  status: TableStatus;
  minSpend: number;
  capacity: number;
  shape?: 'circle' | 'rect';
  width?: number;
  height?: number;
  rotation?: number;
}

export interface Bottle {
  id: string;
  name: string;
  category: string;
  price: number;
}

export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  instagram?: string;
  isAdmin?: boolean;
  loyaltyTier: 'SILVER' | 'GOLD' | 'PLATINUM' | 'BLACK';
  loyaltyPoints: number;
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

export interface Track {
  title: string;
  artist: string;
  duration: string;
  isPlaying: boolean;
}

export type ViewState = 
  | 'CLUBS_OVERVIEW' 
  | 'CLUB_MAP' 
  | 'BOTTLES' 
  | 'ANALYTICS' 
  | 'EVENTS' 
  | 'GUESTLIST' 
  | 'PASS';

export enum BedStatus {
  AVAILABLE = 'AVAILABLE',
  BOOKED = 'BOOKED',
  OCCUPIED = 'OCCUPIED',
  MAINTENANCE = 'MAINTENANCE'
}

export interface Bed {
  id: string;
  label: string;
  x: number;
  y: number;
  rotation?: number;
  status: BedStatus;
}
