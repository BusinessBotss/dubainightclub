

import React, { useEffect, useState } from 'react';
import { ClubSelector } from './components/ClubSelector';
import { TableMap } from './components/TableMap';
import { BottleMenu } from './components/BottleMenu';
import { BookingModal } from './components/BookingModal';
import { Registration } from './components/Registration';
import { api } from './services/mockApi';
import { Table, ViewState, UserProfile, CartItem, Club } from './types';
import { 
  MapIcon, SparklesIcon, CalendarDaysIcon, 
  QrCodeIcon, UserGroupIcon, MusicalNoteIcon,
  ArrowLeftOnRectangleIcon, FireIcon
} from '@heroicons/react/24/outline';

// Mock Component for Pass (New Feature)
const EntryPass = ({ club, user }: { club: Club, user: UserProfile }) => (
  <div className="p-8 flex flex-col items-center animate-fade-in">
    <div className="bg-white text-black p-8 rounded-3xl max-w-sm w-full text-center relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-theme-primary"></div>
      <h2 className="text-3xl font-thin tracking-widest uppercase mb-1">{club.name}</h2>
      <div className="text-xs font-bold tracking-[0.3em] uppercase mb-8 text-zinc-500">Access Granted</div>
      <div className="bg-black p-4 rounded-xl mb-6 mx-auto w-48 h-48 flex items-center justify-center">
         <QrCodeIcon className="w-32 h-32 text-white" />
      </div>
      <div className="text-sm font-mono mb-2">{user.name}</div>
      <div className="text-xs text-zinc-500 uppercase tracking-wider">{user.loyaltyTier} Member</div>
      <div className="mt-8 pt-8 border-t border-zinc-200 flex justify-between text-[10px] uppercase font-bold tracking-widest text-zinc-400">
         <span>{new Date().toLocaleDateString()}</span>
         <span>REF: #88392</span>
      </div>
    </div>
    <div className="mt-8 flex gap-4">
       <button className="px-6 py-3 border border-zinc-700 rounded-full text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors">Save to Wallet</button>
       <button className="px-6 py-3 border border-zinc-700 rounded-full text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors">Share</button>
    </div>
  </div>
);

// Persistent Music Player (New Feature)
const MusicPlayer = () => (
  <div className="fixed bottom-0 left-0 right-0 h-12 bg-zinc-950 border-t border-zinc-900 flex items-center px-6 justify-between z-50">
     <div className="flex items-center gap-4">
        <div className="w-2 h-2 rounded-full bg-theme-primary animate-pulse"></div>
        <div className="text-[10px] text-zinc-400 uppercase tracking-widest">
           Live: <span className="text-white font-bold ml-1">Solomun @ Eclipse</span>
        </div>
     </div>
     <div className="flex items-center gap-2">
        <div className="flex gap-1 items-end h-4">
           {[1,2,3,4,5].map(i => (
              <div key={i} className="w-0.5 bg-theme-primary animate-pulse" style={{ height: `${Math.random()*100}%`, animationDelay: `${i*0.1}s` }}></div>
           ))}
        </div>
        <MusicalNoteIcon className="w-4 h-4 text-zinc-500" />
     </div>
  </div>
);

const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [view, setView] = useState<ViewState>('CLUBS_OVERVIEW');
  const [clubs, setClubs] = useState<Club[]>([]);
  const [selectedClub, setSelectedClub] = useState<Club | null>(null);
  const [tables, setTables] = useState<Table[]>([]);
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isHeatmap, setIsHeatmap] = useState(false);

  useEffect(() => {
    api.getClubs().then(setClubs);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (selectedClub) {
        root.style.setProperty('--primary', selectedClub.theme.primary);
        root.style.setProperty('--bg', selectedClub.theme.bg);
    }
  }, [selectedClub]);

  useEffect(() => {
    if (selectedClub && view === 'CLUB_MAP') {
        api.getTables(selectedClub.id).then(setTables);
    }
  }, [selectedClub, view]);

  if (!user) return <Registration onRegister={setUser} />;

  const NavButton = ({ icon: Icon, label, active, onClick }: any) => (
    <button 
      onClick={onClick}
      className={`p-4 w-full flex items-center gap-4 rounded-xl transition-all group ${active ? 'bg-zinc-800/50 border border-theme-primary/30' : 'hover:bg-zinc-900/30 border border-transparent'}`}
    >
      <Icon className={`w-5 h-5 ${active ? 'text-theme-primary' : 'text-zinc-600 group-hover:text-zinc-400'}`} />
      <span className={`text-xs font-light uppercase tracking-widest ${active ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-300'}`}>
        {label}
      </span>
    </button>
  );

  return (
    <div className="flex h-screen w-full bg-bg text-white font-sans overflow-hidden bg-noise transition-colors duration-700">
      
      {/* Sidebar - Only visible inside a club */}
      {selectedClub && (
        <aside className="w-80 border-r border-zinc-900 flex-col bg-charcoal/80 backdrop-blur-xl hidden lg:flex z-20">
          <div className="p-8 pb-4">
             <button onClick={() => { setSelectedClub(null); setView('CLUBS_OVERVIEW'); }} className="flex items-center gap-2 text-[10px] text-zinc-500 hover:text-white uppercase tracking-widest mb-8 transition-colors">
                <ArrowLeftOnRectangleIcon className="w-3 h-3" /> Exit Club
             </button>
             <h1 className="text-3xl font-thin uppercase tracking-wider text-white mb-1">{selectedClub.name}</h1>
             <div className="text-[10px] text-theme-primary tracking-[0.3em] uppercase">{selectedClub.musicGenre}</div>
             
             {/* Loyalty Badge (New Feature) */}
             <div className="mt-8 p-4 bg-gradient-to-r from-zinc-900 to-zinc-950 rounded border border-zinc-800 flex items-center justify-between">
                <div>
                   <div className="text-[9px] text-zinc-500 uppercase">Your Status</div>
                   <div className="text-xs font-bold text-white uppercase tracking-wider">{user.loyaltyTier}</div>
                </div>
                <div className="w-8 h-8 rounded-full border border-theme-primary flex items-center justify-center text-[10px] text-theme-primary">
                   {user.loyaltyTier[0]}
                </div>
             </div>
          </div>

          <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
             <div className="text-[9px] text-zinc-600 uppercase tracking-widest px-4 py-2 mt-4">Experience</div>
             <NavButton icon={MapIcon} label="Floor Map" active={view === 'CLUB_MAP'} onClick={() => setView('CLUB_MAP')} />
             <NavButton icon={SparklesIcon} label="Bottle Service" active={view === 'BOTTLES'} onClick={() => { if(selectedTable) setView('BOTTLES'); }} />
             <NavButton icon={CalendarDaysIcon} label="Events" active={view === 'EVENTS'} onClick={() => setView('EVENTS')} />
             <NavButton icon={UserGroupIcon} label="Guest List" active={view === 'GUESTLIST'} onClick={() => setView('GUESTLIST')} />
             
             <div className="text-[9px] text-zinc-600 uppercase tracking-widest px-4 py-2 mt-6">My Night</div>
             <NavButton icon={QrCodeIcon} label="Entry Pass" active={view === 'PASS'} onClick={() => setView('PASS')} />
          </nav>

          <div className="p-4 border-t border-zinc-900">
             {/* Uber Integration (New Feature) */}
             <a href={`https://m.uber.com/ul/?action=setPickup&client_id=123&pickup=my_location&dropoff[latitude]=${selectedClub.coordinates.lat}&dropoff[longitude]=${selectedClub.coordinates.lng}`} target="_blank" rel="noreferrer" className="block w-full py-3 bg-black border border-zinc-800 text-center text-[10px] font-bold uppercase tracking-widest hover:border-white transition-colors">
                Request Ride
             </a>
          </div>
        </aside>
      )}

      {/* Main Content */}
      <main className="flex-1 relative flex flex-col h-full">
         {/* Mobile Header */}
         <header className="h-16 border-b border-zinc-900 flex items-center justify-between px-6 lg:hidden bg-zinc-950 z-30">
             <div className="text-sm font-bold tracking-widest uppercase">{selectedClub ? selectedClub.name : 'ClubNightOS'}</div>
             {selectedClub && <button onClick={() => { setSelectedClub(null); setView('CLUBS_OVERVIEW'); }} className="text-zinc-500"><ArrowLeftOnRectangleIcon className="w-5 h-5" /></button>}
         </header>

         <div className="flex-1 relative overflow-hidden">
            {view === 'CLUBS_OVERVIEW' && <ClubSelector clubs={clubs} onSelectClub={(c) => { setSelectedClub(c); setView('CLUB_MAP'); }} />}
            
            {view === 'CLUB_MAP' && (
              <>
                 <TableMap 
                   tables={tables} 
                   onTableClick={(t) => { setSelectedTable(t); setShowBookingModal(true); }}
                   selectedTableId={selectedTable?.id}
                   isHeatmapMode={isHeatmap}
                 />
                 {/* Heatmap Toggle (New Feature) */}
                 <button 
                   onClick={() => setIsHeatmap(!isHeatmap)} 
                   className={`absolute bottom-20 right-6 p-3 rounded-full border transition-all z-20 ${isHeatmap ? 'bg-red-500/20 text-red-500 border-red-500' : 'bg-black text-zinc-500 border-zinc-800'}`}
                 >
                    <FireIcon className="w-5 h-5" />
                 </button>
              </>
            )}

            {view === 'BOTTLES' && selectedTable && (
               <BottleMenu minSpend={selectedTable.minSpend} currentTab={cart} setTab={setCart} onConfirm={() => { setView('PASS'); setCart([]); }} />
            )}

            {view === 'PASS' && selectedClub && <EntryPass club={selectedClub} user={user} />}
            
            {view === 'EVENTS' && (
               <div className="p-8 animate-fade-in">
                  <h2 className="text-3xl font-thin uppercase tracking-wide mb-8">Upcoming</h2>
                  <div className="space-y-4">
                     {selectedClub?.events.map(e => (
                        <div key={e.id} className="p-6 bg-zinc-900/50 border border-zinc-800 hover:border-theme-primary/50 transition-colors flex justify-between items-center group cursor-pointer">
                           <div>
                              <div className="text-theme-primary text-xs uppercase tracking-widest mb-1">{e.date}</div>
                              <div className="text-2xl font-light text-white group-hover:text-theme-primary transition-colors">{e.title}</div>
                              <div className="text-sm text-zinc-500 mt-2">Feat. {e.dj}</div>
                           </div>
                           <button className="px-4 py-2 border border-zinc-700 text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-colors">RSVP</button>
                        </div>
                     ))}
                  </div>
               </div>
            )}

            {view === 'GUESTLIST' && (
               <div className="p-8 animate-fade-in flex flex-col items-center justify-center h-full">
                  <div className="max-w-md w-full text-center">
                     <h2 className="text-3xl font-thin uppercase tracking-wide mb-4">Guest List</h2>
                     <p className="text-zinc-500 font-light mb-8">Join the general entry queue for expedited access before 11:00 PM.</p>
                     <button 
                        onClick={() => setView('PASS')} 
                        className="w-full py-4 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-theme-primary transition-colors"
                     >
                        Join List for Tonight
                     </button>
                  </div>
               </div>
            )}
         </div>

         <MusicPlayer />
      </main>

      {showBookingModal && selectedTable && (
        <BookingModal 
          table={selectedTable} 
          onClose={() => setShowBookingModal(false)}
          onProceed={() => { setShowBookingModal(false); setView('BOTTLES'); }}
        />
      )}
    </div>
  );
};

export default App;