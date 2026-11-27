'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function AdminSidebar({ isOpen = false, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  const navItems = [
    { label: 'Dashboard', href: '/admin', icon: 'dashboard' },
    { label: 'Tour Packages', href: '/admin/packages', icon: 'tour' },
    { label: 'Destinations', href: '/admin/destinations', icon: 'location_on' },
    { label: 'Categories', href: '/admin/categories', icon: 'category' },
    { label: 'Reviews & Testimonials', href: '/admin/testimonials', icon: 'rate_review' },
    { label: 'Gallery Media', href: '/admin/gallery', icon: 'photo_library' },
    { label: 'Travel Blogs', href: '/admin/blogs', icon: 'article' },
    { label: 'Site Settings', href: '/admin/settings', icon: 'tune' },
    { label: 'User Management', href: '/admin/users', icon: 'manage_accounts', superOnly: true },
  ];

  const renderNavContent = (isMobile = false) => (
    <>
      {/* Brand & Overline */}
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <Link href="/admin" onClick={() => isMobile && onClose?.()} className="flex items-center gap-3 group">
            <div className="h-11 w-11 rounded-2xl bg-slate-800/90 border border-slate-700/80 p-1.5 flex items-center justify-center shrink-0 shadow-md group-hover:border-primary/50 transition-colors">
              <img
                alt="Traverse BD Logo"
                className="h-full w-auto object-contain"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXJry_084FVvaamK2wzFARSx0govYR3D9JvwW4cvnnywmeoQWr_MN_fdOW25FZ9ucz0-zZSsepESRyonG0FsaNv5kagA7IeMNNWgJFZRV-3766QFRhRWRPL1SBZN1aacv_3zVrGgQSUB_Y04t_73bKrRFsZrOg78wq7xGhWAYwqw-aB_FwI1RfsUGCvWUgcgeXSlk1EXvoiUpmD2FOJsGcOy73vsHaIVUNHjojvCy6uI9LkXmC85zKEQ"
              />
            </div>
            <div className="flex flex-col justify-center min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-tight text-white whitespace-nowrap">
                  Traverse <span className="text-primary-fixed">BD</span>
                </span>
                <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-primary/20 text-primary-fixed border border-primary/30">
                  Admin
                </span>
              </div>
              <span className="text-[9.5px] text-slate-400 font-semibold tracking-wider uppercase truncate">
                Journeys Across Bangladesh
              </span>
            </div>
          </Link>

          {isMobile && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              aria-label="Close menu"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          )}
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider px-3 mb-2 block">
            Core Modules
          </span>

          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => isMobile && onClose?.()}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                  <span>{item.label}</span>
                </div>
                {item.superOnly && (
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold">
                    SUPER
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer / Version Branding */}
      <div className="p-5 border-t border-slate-800 flex items-center justify-between">
        <span className="text-[11px] font-bold text-slate-400 tracking-wide">
          TraverseBD v1.2
        </span>
        <span className="text-[9.5px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          Online
        </span>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:flex w-64 bg-slate-900 border-r border-slate-800 flex-col justify-between shrink-0 min-h-screen text-slate-300">
        {renderNavContent(false)}
      </aside>

      {/* Mobile Drawer (Visible on < lg screens when toggled) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden animate-fadeIn">
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Slide-out Drawer */}
          <aside className="fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] bg-slate-900 border-r border-slate-800 flex flex-col justify-between text-slate-300 shadow-2xl overflow-y-auto overscroll-contain">
            {renderNavContent(true)}
          </aside>
        </div>
      )}
    </>
  );
}
