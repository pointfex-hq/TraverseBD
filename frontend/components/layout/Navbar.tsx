'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentLocale, setCurrentLocale] = useState<'en' | 'bn'>('en');
  const pathname = usePathname();

  const navLinks = [
    { name: currentLocale === 'en' ? 'Destinations' : 'গন্তব্য', href: '/destinations' },
    { name: currentLocale === 'en' ? 'Tour Packages' : 'ট্যুর প্যাকেজ', href: '/packages' },
    { name: currentLocale === 'en' ? 'Gallery' : 'গ্যালারি', href: '/gallery' },
    { name: currentLocale === 'en' ? 'Stories & Guides' : 'গল্প ও গাইড', href: '/blog' },
    { name: currentLocale === 'en' ? 'About Us' : 'আমাদের সম্পর্কে', href: '/about' },
    { name: currentLocale === 'en' ? 'Contact' : 'যোগাযোগ', href: '/contact' },
  ];

  const defaultWaNumber = process.env.NEXT_PUBLIC_DEFAULT_WHATSAPP_NUMBER || '8801700000000';
  const defaultWaUrl = `https://wa.me/${defaultWaNumber}?text=${encodeURIComponent(
    currentLocale === 'en'
      ? 'Hello Traverse BD! I am looking for tour packages and travel advice.'
      : 'নমস্কার / আসসালামু আলাইকুম Traverse BD! আমি ট্যুর প্যাকেজ ও ভ্রমণ তথ্য সম্পর্কে জানতে চাই।'
  )}`;

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-surface-container-high transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-md shadow-primary/20 group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-2xl">explore</span>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight text-on-surface">
                TRAVERSE <span className="text-primary font-bold">BD</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-secondary -mt-1">
                Tourism & Travel
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-semibold transition-colors relative py-1 ${
                    isActive
                      ? 'text-primary'
                      : 'text-on-surface-variant hover:text-primary'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Language Toggle */}
            <button
              onClick={() => setCurrentLocale(currentLocale === 'en' ? 'bn' : 'en')}
              className="px-3 py-1.5 text-xs font-bold rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container-low transition flex items-center gap-1.5"
              title="Toggle Language"
            >
              <span className="material-symbols-outlined text-base">language</span>
              <span>{currentLocale === 'en' ? 'বাংলা' : 'EN'}</span>
            </button>

            {/* Direct WhatsApp CTA Button */}
            <a
              href={defaultWaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-bold shadow-md shadow-primary/20 transition-all hover:scale-102"
            >
              <span className="material-symbols-outlined text-base text-primary-fixed">chat</span>
              <span>{currentLocale === 'en' ? 'WhatsApp Inquiry' : 'হোয়াটসঅ্যাপ বার্তা'}</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setCurrentLocale(currentLocale === 'en' ? 'bn' : 'en')}
              className="px-2.5 py-1 text-xs font-bold rounded-lg border border-outline-variant text-on-surface-variant"
            >
              {currentLocale === 'en' ? 'বাং' : 'EN'}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-on-surface hover:bg-surface-container-high transition"
              aria-label="Toggle Navigation"
            >
              <span className="material-symbols-outlined text-2xl">
                {isMobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-surface-container-high px-4 pt-2 pb-6 space-y-3">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-3 py-2.5 rounded-lg text-sm font-semibold transition ${
                  pathname === link.href
                    ? 'bg-surface-container text-primary font-bold'
                    : 'text-on-surface-variant hover:bg-surface-container-low'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-2">
            <a
              href={defaultWaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-primary text-white text-xs font-bold shadow-md shadow-primary/20"
            >
              <span className="material-symbols-outlined text-base">chat</span>
              <span>WhatsApp Inquiry</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
