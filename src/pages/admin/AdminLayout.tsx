import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { 
  LayoutDashboard, Package, MapPin, Image as ImageIcon, 
  BookOpen, Settings, ShieldAlert, LogOut, ExternalLink, 
  Compass, RotateCcw, User, Check 
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { adminUser, logout, resetToDefaults, packages, destinations, gallery, blogs } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  // If not logged in, redirect to login (FR-18)
  if (!adminUser) {
    navigate('/admin/login', { replace: true });
    return null;
  }

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Tour Packages', path: '/admin/packages', icon: Package, badge: packages.length },
    { name: 'Destinations', path: '/admin/destinations', icon: MapPin, badge: destinations.length },
    { name: 'Gallery Media', path: '/admin/gallery', icon: ImageIcon, badge: gallery.length },
    { name: 'Blog & Gazette', path: '/admin/blog', icon: BookOpen, badge: blogs.length },
    { name: 'System Settings', path: '/admin/settings', icon: Settings },
    { name: 'Security & Access', path: '/admin/audit', icon: ShieldAlert },
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const handleResetData = () => {
    if (window.confirm('Reset all content (packages, destinations, settings) to default seed data?')) {
      resetToDefaults();
      alert('Data reset successfully to default state.');
    }
  };

  const isActive = (path: string) => {
    if (path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col md:flex-row font-sans">
      
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-950 border-r border-slate-800 flex flex-col justify-between shrink-0">
        <div>
          {/* Brand header */}
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <Link to="/admin" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#005f49] to-[#0d7a5f] flex items-center justify-center text-white shadow-md">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <span className="font-extrabold text-base tracking-tight text-white block">Traverse BD</span>
                <span className="text-[10px] uppercase font-bold text-emerald-400 block -mt-1">Admin CMS</span>
              </div>
            </Link>
          </div>

          {/* User profile card */}
          <div className="p-4 mx-3 my-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
              {adminUser.name.charAt(0)}
            </div>
            <div className="overflow-hidden">
              <h4 className="text-xs font-bold text-white truncate">{adminUser.name}</h4>
              <p className="text-[10px] text-slate-400 truncate">{adminUser.email}</p>
              <span className="inline-block mt-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded-sm">
                {adminUser.role === 'super_admin' ? 'Super Admin' : 'Editor'}
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="px-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    active
                      ? 'bg-[#005f49] text-white shadow-md shadow-[#005f49]/30'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                      active ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          {/* Quick link to public site */}
          <Link
            to="/"
            target="_blank"
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold transition-colors border border-slate-800"
          >
            <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
            <span>View Public Site</span>
          </Link>

          {/* Reset seed data button */}
          <button
            type="button"
            onClick={handleResetData}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-slate-900/60 hover:bg-slate-900 text-slate-400 hover:text-slate-200 text-xs font-semibold transition-colors"
            title="Reset data to default state"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Demo Seed Data</span>
          </button>

          {/* Logout button (FR-20) */}
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs font-bold transition-colors border border-rose-500/20 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 bg-slate-900 overflow-y-auto min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};
