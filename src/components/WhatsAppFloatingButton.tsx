import React from 'react';
import { useApp } from '../context/AppContext';
import { MessageSquare } from 'lucide-react';

export const WhatsAppFloatingButton: React.FC = () => {
  const { getWhatsAppLink, settings } = useApp();

  return (
    <aside aria-label="WhatsApp Travel Concierge" className="fixed bottom-6 right-6 z-40 group">
      <a
        href={getWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="relative flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 shadow-emerald-500/30"
      >
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white"></span>
        </span>
        <MessageSquare className="w-7 h-7 fill-white" />

        {/* Hover Tooltip */}
        <div className="absolute right-16 px-3.5 py-2 bg-slate-900 text-white text-xs font-semibold rounded-xl whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none flex items-center gap-1.5">
          <span>Chat on WhatsApp</span>
          <span className="text-[10px] text-emerald-400 font-mono">({settings.whatsapp_number})</span>
        </div>
      </a>
    </aside>
  );
};
