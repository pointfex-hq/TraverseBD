'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Do not render public Navbar on admin routes
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const phoneDisplay = '01627444330';
  const phoneTel = 'tel:01627444330';
  const whatsappUrl = 'https://wa.me/8801627444330';

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Tour Packages', href: '/packages' },
    { name: 'Services', href: '/services' },
    { name: 'Why Us', href: '/why-us' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-surface-container-high transition-all shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-3">
          {/* Brand Logo & Text */}
          <Link className="flex items-center gap-3 shrink-0 group" href="/">
            <img
              alt="Traverse BD Logo"
              className="h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXJry_084FVvaamK2wzFARSx0govYR3D9JvwW4cvnnywmeoQWr_MN_fdOW25FZ9ucz0-zZSsepESRyonG0FsaNv5kagA7IeMNNWgJFZRV-3766QFRhRWRPL1SBZN1aacv_3zVrGgQSUB_Y04t_73bKrRFsZrOg78wq7xGhWAYwqw-aB_FwI1RfsUGCvWUgcgeXSlk1EXvoiUpmD2FOJsGcOy73vsHaIVUNHjojvCy6uI9LkXmC85zKEQ"
            />
            <div className="flex flex-col justify-center">
              <span className="text-[19px] leading-tight text-primary font-bold tracking-tight whitespace-nowrap">
                Traverse BD
              </span>
              <span className="text-[10px] text-on-surface-variant font-semibold tracking-widest uppercase whitespace-nowrap">
                Journeys Across Bangladesh
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links - Strictly Single Line */}
          <nav className="hidden lg:flex items-center gap-2.5 xl:gap-5 shrink-0 whitespace-nowrap">
            {navLinks.map((link) => {
              const isActive =
                link.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-xs xl:text-sm font-semibold transition-colors relative py-1.5 whitespace-nowrap ${isActive
                    ? 'text-primary font-bold'
                    : 'text-on-surface-variant hover:text-primary'
                    }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full transition-all" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5 xl:gap-3 shrink-0 whitespace-nowrap">
            {/* Phone Call Pill */}
            <a
              href={phoneTel}
              className="hidden xl:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-surface-container-low text-on-surface hover:bg-surface-container transition-all border border-outline-variant/40 whitespace-nowrap"
              title="Call Traverse BD Customer Care"
            >
              <span className="material-symbols-outlined text-primary text-[17px]">call</span>
              <span className="font-semibold text-[13px] tracking-tight">{phoneDisplay}</span>
            </a>

            {/* Direct WhatsApp CTA Button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 xl:px-4 py-2 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-bold shadow-md shadow-primary/20 transition-all hover:scale-102 whitespace-nowrap"
              title="Inquire via WhatsApp"
            >
              <span className="material-symbols-outlined text-base text-primary-fixed">chat</span>
              <span>WhatsApp Us</span>
            </a>

            {/* Admin Access Shortcut */}
            <Link
              href="/admin/login"
              title="Admin Portal"
              className="w-8 h-8 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors flex items-center justify-center shrink-0 border border-primary/20"
            >
              <span className="material-symbols-outlined text-[18px]">person</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href="/admin/login"
              title="Admin Portal"
              className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center border border-primary/20"
            >
              <span className="material-symbols-outlined text-[17px]">person</span>
            </Link>
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
        <div className="lg:hidden bg-white border-b border-surface-container-high px-6 pt-3 pb-6 space-y-4 shadow-xl">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const isActive =
                link.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-3 py-2.5 rounded-lg text-sm font-semibold transition whitespace-nowrap ${isActive
                    ? 'bg-surface-container text-primary font-bold'
                    : 'text-on-surface-variant hover:bg-surface-container-low'
                    }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="pt-2 flex flex-col gap-2.5 border-t border-surface-container">
            <a
              href={phoneTel}
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-surface-container-low text-on-surface text-xs font-bold border border-outline-variant/30"
            >
              <span className="material-symbols-outlined text-primary text-base">call</span>
              <span>Call {phoneDisplay}</span>
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-primary text-white text-xs font-bold shadow-md shadow-primary/20"
            >
              <span className="material-symbols-outlined text-base">chat</span>
              <span>WhatsApp Us Directly</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
