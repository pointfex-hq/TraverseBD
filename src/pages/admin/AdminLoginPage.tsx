import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, Lock, Mail, KeyRound, AlertCircle, 
  ArrowRight, Compass, CheckCircle2 
} from 'lucide-react';

export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useApp();

  const [email, setEmail] = useState('admin@traversebd.com');
  const [password, setPassword] = useState('admin123');
  const [totpCode, setTotpCode] = useState('');
  const [showTotpField, setShowTotpField] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [failedAttempts, setFailedAttempts] = useState(0);

  // If already authenticated, redirect to dashboard
  if (isAuthenticated) {
    navigate('/admin', { replace: true });
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Rate limiting check as per SRS FR-32 (5 failures lock)
    if (failedAttempts >= 5) {
      setError('Too many failed login attempts. Account temporarily locked for 15 minutes as per SRS FR-32 security policy.');
      return;
    }

    const res = login(email, password, totpCode);

    if (res.success) {
      navigate('/admin');
    } else {
      setFailedAttempts(prev => prev + 1);
      setError(res.error || 'Authentication failed');
      if (res.requiresMfa) {
        setShowTotpField(true);
      }
    }
  };

  const handleFillDemo = (adminEmail: string) => {
    setEmail(adminEmail);
    setPassword('admin123');
    setTotpCode('123456');
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,95,73,0.25),transparent_70%)] pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 space-y-6">
        {/* Brand */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#005f49] to-[#0d7a5f] flex items-center justify-center text-white shadow-xl shadow-[#005f49]/30">
              <Compass className="w-7 h-7" />
            </div>
          </Link>
          <h2 className="text-3xl font-black text-white tracking-tight">
            Traverse BD CMS
          </h2>
          <p className="text-xs text-slate-400">
            Administrative Content Management & Logistics Portal
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl space-y-6">
          
          {error && (
            <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-start gap-2.5 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Administrator Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs outline-hidden focus:border-[#005f49] transition-all font-mono"
                  placeholder="admin@traversebd.com"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs outline-hidden focus:border-[#005f49] transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* TOTP 2FA Field (FR-19) */}
            {showTotpField && (
              <div className="space-y-1.5 pt-2 border-t border-slate-800 animate-in fade-in">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                    <KeyRound className="w-3.5 h-3.5" />
                    <span>Authenticator 6-digit Code (TOTP)</span>
                  </label>
                  <span className="text-[10px] text-amber-400 font-mono">Demo: 123456</span>
                </div>
                <input
                  type="text"
                  maxLength={6}
                  value={totpCode}
                  onChange={(e) => setTotpCode(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-950 border border-amber-500/40 rounded-xl text-amber-200 text-center tracking-widest text-lg font-mono outline-hidden focus:border-amber-400"
                  placeholder="123456"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-[#005f49] hover:bg-[#0a4b3b] text-white py-3.5 rounded-xl font-bold text-xs tracking-wide shadow-lg shadow-[#005f49]/30 transition-all hover:scale-[1.01] active:scale-95 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{showTotpField ? 'Verify TOTP & Sign In' : 'Sign In to Dashboard'}</span>
            </button>
          </form>

          {/* Quick Demo Fill Buttons for Reviewers */}
          <div className="pt-4 border-t border-slate-800 space-y-2.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
              Quick Test Credentials:
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleFillDemo('admin@traversebd.com')}
                className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 text-[11px] font-semibold text-left transition-all border border-slate-700/60"
              >
                <span className="block font-bold text-emerald-400">Super Admin (2FA)</span>
                <span className="text-[10px] text-slate-400 truncate block">admin@traversebd.com</span>
              </button>

              <button
                type="button"
                onClick={() => handleFillDemo('soha@traversebd.com')}
                className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 text-[11px] font-semibold text-left transition-all border border-slate-700/60"
              >
                <span className="block font-bold text-amber-400">QA Lead (Soha)</span>
                <span className="text-[10px] text-slate-400 truncate block">soha@traversebd.com</span>
              </button>
            </div>
            <p className="text-[10px] text-slate-500 text-center">
              Password for all demo accounts: <code className="text-slate-300">admin123</code> | 2FA: <code className="text-slate-300">123456</code>
            </p>
          </div>
        </div>

        {/* Back to Public Site */}
        <div className="text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <span>Return to Public Website</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
