'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
  currentUser?: {
    email: string;
    name: string;
    role: string;
  };
  onToggleMobileSidebar?: () => void;
}

export default function AdminHeader({
  title,
  subtitle,
  currentUser = { name: 'Hafizur Rahman', email: 'hafizur@traversebd.com', role: 'SUPER_ADMIN' },
  onToggleMobileSidebar,
}: AdminHeaderProps) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } finally {
      router.push('/admin/login');
    }
  };

  return (
    <header className="h-16 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md px-3 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
        {onToggleMobileSidebar && (
          <button
            onClick={onToggleMobileSidebar}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition lg:hidden shrink-0 border border-slate-800 cursor-pointer active:scale-95"
            aria-label="Toggle navigation menu"
          >
            <span className="material-symbols-outlined text-[20px]">menu</span>
          </button>
        )}
        <div className="min-w-0">
          <h1 className="text-sm sm:text-base font-extrabold text-white tracking-tight truncate">{title}</h1>
          {subtitle && <p className="text-[10px] sm:text-[11px] text-slate-400 truncate hidden xs:block">{subtitle}</p>}
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        {/* Live Portal Shortcut */}
        <Link
          href="/"
          target="_blank"
          className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700 transition"
        >
          <span className="material-symbols-outlined text-[15px] text-primary-fixed">open_in_new</span>
          <span>View Public Site</span>
        </Link>

        {/* User Pill */}
        <div className="flex items-center gap-2.5 sm:gap-3 pl-2 sm:pl-4 border-l border-slate-800">
          <div className="w-8 h-8 rounded-full bg-primary/20 text-primary-fixed border border-primary/40 flex items-center justify-center font-bold text-xs shrink-0">
            {currentUser.name
              ? currentUser.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
              : 'AD'}
          </div>
          <div className="hidden sm:block text-left">
            <span className="text-xs font-bold text-white block leading-tight">
              {currentUser.name}
            </span>
            <span className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider">
              {currentUser.role}
            </span>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          title="Sign Out"
          className="p-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition border border-slate-800 shrink-0 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">logout</span>
        </button>
      </div>
    </header>
  );
}
