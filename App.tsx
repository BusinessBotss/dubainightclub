
import React, { useEffect, useState } from 'react';
import { TableMap } from './components/TableMap';
import { BottleMenu } from './components/BottleMenu';
import { Analytics } from './components/Analytics';
import { BookingModal } from './components/BookingModal';
import { Registration } from './components/Registration';
import { ClubSelector } from './components/ClubSelector';
import { ManagerContact } from './components/ManagerContact';
import { api, subscribeToTableUpdates } from './services/mockApi';
import { Table, ViewState, UserProfile, CartItem, Club } from './types';
import { 
  MapIcon, 
  ChartBarIcon, 
  SparklesIcon,
  ArrowLeftOnRectangleIcon,
  ChatBubbleBottomCenterTextIcon
} from '@heroicons/react/24/outline';

const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [view, setView] = useState<ViewState>('CLUBS_OVERVIEW');
  const [clubs, setClubs] = useState<Club[]>([]);
  const [selectedClub, setSelectedClub] = useState<Club | null>(null);
  const [tables, setTables] = useState<Table[]>([]);
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showManagerChat, setShowManagerChat] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  
  useEffect(() => {
    api.getClubs().then(setClubs);
  }, []);

  // Theme Injection
  useEffect(() => {
    const root = document.documentElement;
    if (selectedClub) {
        root.style.setProperty('--primary', selectedClub.theme.primary);
        root.style.setProperty('--secondary', selectedClub.theme.secondary);
        root.style.setProperty('--bg', selectedClub.theme.bg);
        root.style.setProperty('--text', selectedClub.theme.text);
    } else {
        // Default Landing Theme
        root.style.setProperty('--primary', '#D4AF37');
        root.style.setProperty('--secondary', '#000000');
        root.style.setProperty('--bg', '#050505');
        root.style.setProperty('--text', '#ffffff');
    }
  }, [selectedClub]);

  // Real-time updates subscription when a club is selected
  useEffect(() => {
    if (selectedClub && view === 'CLUB_MAP') {
        const unsubscribe = subscribeToTableUpdates(selectedClub.id, setTables);
        return () => unsubscribe();
    }
  }, [selectedClub, view]);

  if (!user) {
    return <Registration onRegister={setUser} />;
  }

  const handleSelectClub = (club: Club) => {
    setSelectedClub(club);
    setView('CLUB_MAP');
  };

  const handleBackToClubs = () => {
      setSelectedClub(null);
      setView('CLUBS_OVERVIEW');
      setCart([]);
      setSelectedTable(null);
  };

  const handleTableClick = (table: Table) => {
    setSelectedTable(table);
    setShowBookingModal(true);
  };

  const handleStartTab = () => {
    setShowBookingModal(false);
    setView('BOTTLES');
  };

  const handleConfirmReservation = async () => {
      if (selectedTable && selectedClub) {
        await api.reserveTable(selectedTable.id, selectedClub.id);
        alert(`Reservation Confirmed for ${user.name} at ${selectedClub.name} - Table ${selectedTable.label}!`);
        // Reset
        setView('CLUB_MAP');
        setCart([]);
        setSelectedTable(null);
      }
  };

  // --- Render Club Selection ---
  if (view === 'CLUBS_OVERVIEW') {
      return (
          <div className="min-h-screen bg-bg text-white bg-noise flex flex-col">
              <header className="p-6 flex justify-between items-center z-10">
                  <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gold-500 text-black flex items-center justify-center font-bold text-lg">
                            {user.name[0]}
                        </div>
                        <div>
                            <div className="text-sm font-bold text-white">{user.name}</div>
                            <div className="text-xs text-zinc-500 uppercase tracking-wider">{user.isAdmin ? 'Super Admin (777)' : 'Member'}</div>
                        </div>
                  </div>
                  {user.isAdmin && (
                      <button onClick={() => setView('ANALYTICS')} className="px-4 py-2 border border-zinc-700 rounded text-xs uppercase hover:bg-white hover:text-black transition-colors">
                          Admin Dashboard
                      </button>
                  )}
              </header>
              <ClubSelector clubs={clubs} onSelectClub={handleSelectClub} />
          </div>
      );
  }

  // --- Render Club Specific View ---
  return (
    <div className="flex h-screen w-full bg-bg text-white font-sans overflow-hidden bg-noise transition-colors duration-500">
      
      {/* Sidebar Navigation */}
      <aside className="hidden lg:flex w-80 border-r border-zinc-800 flex-col bg-charcoal/50 backdrop-blur-xl p-8 z-20">
        <div className="mb-8">
            <button onClick={handleBackToClubs} className="flex items-center gap-2 text-zinc-500 hover:text-white mb-6 text-xs uppercase tracking-widest transition-colors">
                <ArrowLeftOnRectangleIcon className="w-4 h-4" /> Change Club
            </button>
            <h1 className="text-3xl font-montserrat font-bold text-transparent bg-clip-text bg-gradient-to-r from-theme-primary to-white drop-shadow-theme mb-2 leading-tight">
                {selectedClub?.name}
            </h1>
            <div className="text-[10px] uppercase tracking-[0.2em] text-theme-primary opacity-80">{selectedClub?.musicGenre}</div>
        </div>
        
        <div className="space-y-6 flex-1">
          {/* Manager Info */}
          {selectedClub && (
            <div className="p-4 bg-zinc-900/80 rounded-xl border border-zinc-800/50 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-theme-primary"></div>
                <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Your Host</span>
                    {selectedClub.manager.isOnline && <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>}
                </div>
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-theme-primary border border-zinc-700">
                        {selectedClub.manager.name[0]}
                    </div>
                    <div>
                        <div className="font-bold text-white">{selectedClub.manager.name}</div>
                        <div className="text-[10px] text-zinc-500">Rep: {selectedClub.manager.responseRate}</div>
                    </div>
                </div>
                <button 
                    onClick={() => setShowManagerChat(true)}
                    className="w-full py-2 bg-theme-primary/10 hover:bg-theme-primary/20 text-theme-primary border border-theme-primary/30 rounded text-xs font-bold uppercase transition-colors flex items-center justify-center gap-2"
                >
                    <ChatBubbleBottomCenterTextIcon className="w-4 h-4" /> Contact Manager
                </button>
            </div>
          )}

          <nav className="flex flex-col gap-3 mt-8">
            <button 
              onClick={() => setView('CLUB_MAP')}
              className={`p-4 text-left rounded-xl border border-transparent transition-all group ${view === 'CLUB_MAP' ? 'bg-zinc-800/80 border-theme-primary/30 shadow-lg' : 'hover:bg-zinc-900/50'}`}
            >
              <div className="flex items-center justify-between mb-1">
                 <span className={`text-[10px] uppercase tracking-widest ${view === 'CLUB_MAP' ? 'text-white' : 'text-zinc-600 group-hover:text-zinc-400'}`}>Step 1</span>
                 <MapIcon className={`w-4 h-4 ${view === 'CLUB_MAP' ? 'text-theme-primary' : 'text-zinc-700'}`} />
              </div>
              <span className={`text-lg font-display ${view === 'CLUB_MAP' ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-300'}`}>Select Table</span>
            </button>
            
            <button 
              onClick={() => { if(selectedTable) setView('BOTTLES'); }}
              disabled={!selectedTable}
              className={`p-4 text-left rounded-xl border border-transparent transition-all group ${view === 'BOTTLES' ? 'bg-zinc-800/80 border-theme-primary/30 shadow-lg' : 'hover:bg-zinc-900/50 disabled:opacity-50 disabled:cursor-not-allowed'}`}
            >
               <div className="flex items-center justify-between mb-1">
                 <span className={`text-[10px] uppercase tracking-widest ${view === 'BOTTLES' ? 'text-white' : 'text-zinc-600 group-hover:text-zinc-400'}`}>Step 2</span>
                 <SparklesIcon className={`w-4 h-4 ${view === 'BOTTLES' ? 'text-theme-primary' : 'text-zinc-700'}`} />
              </div>
              <span className={`text-lg font-display ${view === 'BOTTLES' ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-300'}`}>Bottle Service</span>
            </button>

            {user.isAdmin && (
                <button 
                onClick={() => setView('ANALYTICS')}
                className={`p-4 text-left rounded-xl border border-transparent transition-all mt-auto group ${view === 'ANALYTICS' ? 'bg-zinc-800/80 border-zinc-700' : 'hover:bg-zinc-900/50'}`}
                >
                <div className="flex items-center justify-between mb-1">
                    <span className={`text-[10px] uppercase tracking-widest ${view === 'ANALYTICS' ? 'text-white' : 'text-zinc-600 group-hover:text-zinc-400'}`}>Admin</span>
                    <ChartBarIcon className={`w-4 h-4 ${view === 'ANALYTICS' ? 'text-theme-primary' : 'text-zinc-700'}`} />
                </div>
                <span className={`text-lg font-display ${view === 'ANALYTICS' ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-300'}`}>Analytics</span>
                </button>
            )}
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 relative overflow-hidden flex flex-col">
        {/* Mobile Header */}
        <header className="h-16 border-b border-zinc-800 flex items-center justify-between px-6 lg:hidden bg-obsidian z-30">
            <button onClick={handleBackToClubs} className="text-zinc-400"><ArrowLeftOnRectangleIcon className="w-6 h-6" /></button>
            <span className="font-display font-bold text-lg tracking-wider text-white">{selectedClub?.name}</span>
            <button onClick={() => setShowManagerChat(true)} className="text-theme-primary"><ChatBubbleBottomCenterTextIcon className="w-6 h-6" /></button>
        </header>

        <div className="flex-1 relative overflow-y-auto">
          {view === 'CLUB_MAP' && (
             <div className="h-full w-full">
                <TableMap 
                   tables={tables} 
                   onTableClick={handleTableClick}
                   selectedTableId={selectedTable?.id}
                />
             </div>
          )}

          {view === 'BOTTLES' && selectedTable && selectedClub && (
            <div className="p-8">
               <BottleMenu 
                  minSpend={selectedTable.minSpend} 
                  currentTab={cart}
                  setTab={setCart}
                  onConfirm={handleConfirmReservation}
               />
            </div>
          )}

          {view === 'ANALYTICS' && <Analytics />}
        </div>
      </main>

      {/* Modals */}
      {showBookingModal && selectedTable && (
        <BookingModal 
          table={selectedTable} 
          onClose={() => { setShowBookingModal(false); setSelectedTable(null); }} 
          onProceed={handleStartTab}
        />
      )}

      {showManagerChat && selectedClub && (
        <ManagerContact 
            manager={selectedClub.manager}
            clubName={selectedClub.name}
            isOpen={showManagerChat}
            onClose={() => setShowManagerChat(false)}
        />
      )}
    </div>
  );
};

export default App;
