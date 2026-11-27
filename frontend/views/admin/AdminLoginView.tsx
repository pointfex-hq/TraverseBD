'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLoginView() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-slate-100 relative overflow-hidden">
      {/* Subtle ambient gradient highlights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-emerald-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10 space-y-6">
        {/* Main Glassmorphic Login Card */}
        <div className="rounded-3xl bg-slate-900/90 backdrop-blur-xl border border-slate-800/90 p-8 sm:p-10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] space-y-7">
          {/* Header with Official Traverse BD Logo */}
          <div className="text-center space-y-3">
            <Link href="/" className="inline-block group">
              <div className="h-16 w-16 rounded-2xl bg-slate-800/90 border border-slate-700/80 p-2.5 flex items-center justify-center mx-auto shadow-xl shadow-primary/10 group-hover:border-primary/40 transition-all group-hover:scale-105">
                <img
                  alt="Traverse BD Logo"
                  className="h-full w-auto object-contain"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXJry_084FVvaamK2wzFARSx0govYR3D9JvwW4cvnnywmeoQWr_MN_fdOW25FZ9ucz0-zZSsepESRyonG0FsaNv5kagA7IeMNNWgJFZRV-3766QFRhRWRPL1SBZN1aacv_3zVrGgQSUB_Y04t_73bKrRFsZrOg78wq7xGhWAYwqw-aB_FwI1RfsUGCvWUgcgeXSlk1EXvoiUpmD2FOJsGcOy73vsHaIVUNHjojvCy6uI9LkXmC85zKEQ"
                />
              </div>
            </Link>
            <div>
              <div className="flex items-center justify-center gap-2">
                <h1 className="text-2xl font-extrabold text-white tracking-tight">
                  Traverse <span className="text-primary-fixed">BD</span>
                </h1>
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-primary/20 text-primary-fixed border border-primary/30">
                  Operations Portal
                </span>
              </div>
              <p className="text-[11.5px] text-slate-400 font-semibold tracking-wide uppercase mt-1">
                Executive Control Center • Staff Sign In
              </p>
            </div>
          </div>

          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2.5 animate-fadeIn">
              <span className="material-symbols-outlined text-[19px] shrink-0">error</span>
              <span className="leading-snug">{errorMsg}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[15px] text-slate-400">mail</span>
                <span>Administrator Email</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  autoComplete="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@traversebd.com"
                  className="w-full bg-slate-950/80 text-white text-xs px-4 py-3 rounded-xl border border-slate-700/80 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary placeholder-slate-500 transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[15px] text-slate-400">lock</span>
                <span>Password</span>
              </label>
              <div className="relative flex items-center">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-slate-950/80 text-white text-xs px-4 py-3 pr-11 rounded-xl border border-slate-700/80 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary placeholder-slate-500 transition-all font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 p-1 text-slate-400 hover:text-slate-200 transition"
                  title={showPassword ? 'Hide password' : 'Show password'}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-bold shadow-lg shadow-primary/25 hover:shadow-primary/35 transition-all transform active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <span className="material-symbols-outlined text-[16px] animate-spin">
                      progress_activity
                    </span>
                    <span>Authenticating Staff...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[16px]">login</span>
                    <span>Sign In to Operations Portal</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Security Notice */}
          <div className="pt-3 border-t border-slate-800/80 text-center space-y-2">
            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
              <span className="material-symbols-outlined text-[15px] text-emerald-400">verified_user</span>
              <span>Encrypted Session • Role-Based Access Control</span>
            </div>
            <p className="text-[10px] text-slate-500 leading-relaxed">
              Super Admin credentials are authenticated via production environment secrets. Additional staff accounts are managed through the Governance Center.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center space-y-1">
          <p className="text-[11px] text-slate-500">
            Traverse BD Operations & Security Systems • Authorized Personnel Only
          </p>
          <Link
            href="/"
            className="text-[11px] text-primary-fixed hover:text-white transition inline-flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[14px]">arrow_back</span>
            <span>Return to Public Portal</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
