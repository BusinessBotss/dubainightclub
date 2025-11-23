import React, { useState, useEffect } from 'react';
import { Manager } from '../types';
import { XMarkIcon, PaperAirplaneIcon, PhoneIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

interface ManagerContactProps {
  manager: Manager;
  clubName: string;
  isOpen: boolean;
  onClose: () => void;
}

export const ManagerContact: React.FC<ManagerContactProps> = ({ manager, clubName, isOpen, onClose }) => {
  const [message, setMessage] = useState('');
  const [chatLog, setChatLog] = useState<{sender: 'user'|'manager', text: string}[]>([
      { sender: 'manager', text: `Hi! I'm ${manager.name}, the VIP Manager at ${clubName}. How can I help you today?` }
  ]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
        setIsVisible(true);
    } else {
        const timer = setTimeout(() => setIsVisible(false), 300);
        return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleSend = () => {
      if (!message.trim()) return;
      setChatLog(prev => [...prev, { sender: 'user', text: message }]);
      setMessage('');
      
      // Auto reply simulation
      setTimeout(() => {
          setChatLog(prev => [...prev, { sender: 'manager', text: "Thanks for reaching out. I'm checking availability for you now. 🥂" }]);
      }, 1500);
  };

  if (!isVisible && !isOpen) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        {/* Backdrop */}
        <div 
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        
        {/* Modal Content */}
        <div 
            className={`relative w-full max-w-md bg-zinc-900 border border-zinc-700 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 transform ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}
        >
            {/* Header */}
            <div className="p-6 border-b border-zinc-800 flex items-center justify-between bg-zinc-950">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-theme-primary/20 flex items-center justify-center text-theme-primary font-bold text-xl border border-theme-primary">
                            {manager.name[0]}
                        </div>
                        {manager.isOnline && (
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-zinc-950"></div>
                        )}
                    </div>
                    <div>
                        <h3 className="font-bold text-white">{manager.name}</h3>
                        <p className="text-xs text-theme-primary font-medium">VIP Manager • {manager.responseRate}</p>
                    </div>
                </div>
                <button onClick={onClose} className="text-zinc-500 hover:text-white">
                    <XMarkIcon className="w-6 h-6" />
                </button>
            </div>

            {/* Quick Actions */}
            <div className="flex border-b border-zinc-800">
                <a 
                    href={`https://wa.me/${manager.whatsapp}`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex-1 py-3 flex items-center justify-center gap-2 text-sm font-medium hover:bg-zinc-800 transition-colors text-green-500"
                >
                    <ChatBubbleLeftRightIcon className="w-4 h-4" /> WhatsApp
                </a>
                <button className="flex-1 py-3 flex items-center justify-center gap-2 text-sm font-medium hover:bg-zinc-800 transition-colors text-white">
                    <PhoneIcon className="w-4 h-4" /> Call Direct
                </button>
            </div>

            {/* Chat Area */}
            <div className="h-80 overflow-y-auto p-4 space-y-4 bg-zinc-900/50">
                {chatLog.map((msg, i) => (
                    <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div 
                            className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                                msg.sender === 'user' 
                                ? 'bg-theme-primary text-black rounded-tr-none font-medium' 
                                : 'bg-zinc-800 text-zinc-200 rounded-tl-none'
                            }`}
                        >
                            {msg.text}
                        </div>
                    </div>
                ))}
            </div>

            {/* Input */}
            <div className="p-4 bg-zinc-950 border-t border-zinc-800 flex gap-2">
                <input 
                    type="text" 
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSend()}
                    placeholder="Type a message..."
                    className="flex-1 bg-zinc-900 border border-zinc-700 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-theme-primary transition-colors"
                />
                <button 
                    onClick={handleSend}
                    className="w-10 h-10 rounded-full bg-theme-primary text-black flex items-center justify-center hover:opacity-90 transition-opacity"
                >
                    <PaperAirplaneIcon className="w-5 h-5" />
                </button>
            </div>
        </div>
    </div>
  );
};