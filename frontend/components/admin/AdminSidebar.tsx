'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminSidebar() {
  const pathname = usePathname();

  const navItems = [
    { label: 'Dashboard', href: '/admin', icon: 'dashboard' },
    { label: 'Tour Packages', href: '/admin/packages', icon: 'tour' },
    { label: 'Destinations', href: '/admin/destinations', icon: 'location_on' },
    { label: 'Categories', href: '/admin/categories', icon: 'category' },
    { label: 'Gallery Media', href: '/admin/gallery', icon: 'photo_library' },
    { label: 'User Management', href: '/admin/users', icon: 'manage_accounts', superOnly: true },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between shrink-0 min-h-screen text-slate-300">
      {/* Brand & Overline */}
      <div className="p-6 space-y-6">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-md shadow-primary/20">
            <span className="material-symbols-outlined text-xl">admin_panel_settings</span>
          </div>
          <div>
            <span className="font-extrabold text-base tracking-tight text-white block">
              TRAVERSE <span className="text-primary-fixed">BD</span>
            </span>
            <span className="text-[10px] text-slate-400 font-bold tracking-wider uppercase">
              Control Center
            </span>
          </div>
        </Link>

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

      {/* Footer / Public Link */}
      <div className="p-6 border-t border-slate-800 space-y-3">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <span className="material-symbols-outlined text-[18px] text-primary-fixed">
            open_in_new
          </span>
          <span>View Live Portal</span>
        </Link>
        <p className="text-[10px] text-slate-500 px-3">
          TraverseBD CMS v1.2 • Team Lithium
        </p>
      </div>
    </aside>
  );
}
