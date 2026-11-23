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
}

export default function AdminHeader({
  title,
  subtitle,
  currentUser = { name: 'Hafizur Rahman', email: 'hafizur@traversebd.com', role: 'SUPER_ADMIN' },
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
    <header className="h-16 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-30">
      <div>
        <h1 className="text-base font-extrabold text-white tracking-tight">{title}</h1>
        {subtitle && <p className="text-[11px] text-slate-400">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-4">
        {/* User Pill */}
        <div className="flex items-center gap-3 pl-4 border-l border-slate-800">
          <div className="w-8 h-8 rounded-full bg-primary/20 text-primary-fixed border border-primary/40 flex items-center justify-center font-bold text-xs">
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
          className="p-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition border border-slate-800"
        >
          <span className="material-symbols-outlined text-[18px]">logout</span>
        </button>
      </div>
    </header>
  );
}
