import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  Compass, Menu, X, Phone, MessageSquare, ShieldCheck, 
  MapPin, Package as PackageIcon, Image as ImageIcon, BookOpen, 
  Users, Headset, ChevronRight 
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { settings, getWhatsAppLink, isAuthenticated } = useApp();
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Destinations', path: '/destinations' },
    { name: 'Tour Packages', path: '/packages' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Blog & Guides', path: '/blog' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Top Banner Notice */}
      <div className="bg-[#005f49] text-white text-xs py-2 px-4 border-b border-white/10 hidden sm:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 opacity-90">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Official Tourism Portal of Bangladesh
            </span>
            <span className="opacity-40">|</span>
            <span className="opacity-80">Instant WhatsApp Booking Desk Active</span>
          </div>
          <div className="flex items-center gap-4">
            <a 
              href={`tel:${settings.contact_phone}`} 
              className="hover:text-emerald-200 transition-colors flex items-center gap-1"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{settings.contact_phone}</span>
            </a>
            <span className="opacity-40">|</span>
            <Link 
              to="/admin" 
              className="bg-white/15 hover:bg-white/25 px-2.5 py-0.5 rounded-full transition-all flex items-center gap-1 font-medium"
            >
              <ShieldCheck className="w-3 h-3 text-amber-300" />
              <span>{isAuthenticated ? 'Admin Dashboard' : 'Admin Portal'}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#005f49] to-[#0d7a5f] flex items-center justify-center text-white shadow-md shadow-[#005f49]/20 group-hover:scale-105 transition-transform">
                <Compass className="w-6 h-6 animate-[spin_20s_linear_infinite]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-2xl font-extrabold tracking-tight text-slate-900">TRAVERSE</span>
                  <span className="text-2xl font-black text-[#0d7a5f]">BD</span>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block -mt-1">
                  Bengal Expeditions
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                      active
                        ? 'text-[#005f49] bg-emerald-50/80 font-bold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Buttons */}
            <div className="hidden sm:flex items-center gap-3">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>WhatsApp Desk</span>
              </a>

              <Link
                to="/packages"
                className="inline-flex items-center gap-1.5 bg-[#005f49] hover:bg-[#0a4b3b] text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-md shadow-[#005f49]/20 hover:shadow-lg transition-all hover:-translate-y-0.5"
              >
                <span>Book a Tour</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Mobile menu trigger */}
            <div className="flex lg:hidden items-center gap-2">
              <Link 
                to="/admin" 
                className="p-2 text-slate-600 hover:text-slate-900 sm:hidden"
                title="Admin Portal"
              >
                <ShieldCheck className="w-5 h-5 text-[#005f49]" />
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-2 shadow-2xl animate-in slide-in-from-top-4 duration-200">
            <div className="grid grid-cols-1 gap-1">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                      active
                        ? 'bg-emerald-50 text-[#005f49] font-bold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{link.name}</span>
                    <ChevronRight className={`w-4 h-4 ${active ? 'text-[#005f49]' : 'text-slate-400'}`} />
                  </Link>
                );
              })}
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 rounded-xl font-bold text-sm shadow-sm"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>Chat on WhatsApp ({settings.whatsapp_number})</span>
              </a>

              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 py-3 rounded-xl font-bold text-sm transition-colors"
              >
                <ShieldCheck className="w-4 h-4 text-[#005f49]" />
                <span>Admin CMS Portal</span>
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
