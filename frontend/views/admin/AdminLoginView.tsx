'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginView() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMsg(data.error?.message || 'Invalid administrator credentials');
        return;
      }

      router.push('/admin');
    } catch {
      setErrorMsg('Failed to connect to authentication service.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setIsLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isDemo: true }),
      });
      const data = await res.json();

      if (data.success) {
        router.push('/admin');
      }
    } catch {
      setErrorMsg('Demo login failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 text-slate-100">
      <div className="w-full max-w-md rounded-3xl bg-slate-900 border border-slate-800 p-8 sm:p-10 shadow-2xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-white mx-auto shadow-lg shadow-primary/30 mb-4">
            <span className="material-symbols-outlined text-3xl">admin_panel_settings</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            TraverseBD Admin Portal
          </h1>
          <p className="text-xs text-slate-400">
            Internal Operations, CMS & Package Management
          </p>
        </div>

        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">error</span>
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Regular Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300">Admin Email Address:</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. hafizur@traversebd.com"
              className="w-full bg-slate-800 text-white text-xs px-4 py-3 rounded-xl border border-slate-700 focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300">Password:</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-slate-800 text-white text-xs px-4 py-3 rounded-xl border border-slate-700 focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-bold shadow-md shadow-primary/20 transition disabled:opacity-50"
          >
            {isLoading ? 'Verifying...' : 'Sign In to Control Center'}
          </button>
        </form>

        <div className="relative py-2 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-800" />
          </div>
          <span className="relative px-3 bg-slate-900 text-[10px] text-slate-500 uppercase font-bold">
            Or For Local Testing
          </span>
        </div>

        {/* Quick Demo Login Button */}
        <button
          onClick={handleDemoLogin}
          disabled={isLoading}
          className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-emerald-500/30 text-xs font-bold flex items-center justify-center gap-2 transition"
        >
          <span className="material-symbols-outlined text-[16px]">bolt</span>
          <span>⚡ One-Click Demo Super Admin Login</span>
        </button>

        <p className="text-center text-[10px] text-slate-500">
          Super Admin: Hafizur Rahman • Pointfex / Team Lithium
        </p>
      </div>
    </div>
  );
}
