import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { 
  Package, MapPin, Image as ImageIcon, BookOpen, 
  Settings, Plus, ArrowRight, ShieldCheck, CheckCircle2, 
  AlertCircle, Sparkles, Flame, Clock, MessageSquare 
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const { 
    packages, destinations, gallery, blogs, 
    auditLogs, settings, adminUser 
  } = useApp();

  // Counts (published and draft as per FR-21)
  const publishedPackages = packages.filter(p => p.status === 'published').length;
  const draftPackages = packages.filter(p => p.status === 'draft').length;

  const publishedDestinations = destinations.filter(d => d.status === 'published').length;
  const draftDestinations = destinations.filter(d => d.status === 'draft').length;

  const publishedGallery = gallery.filter(g => g.status === 'published').length;
  const draftGallery = gallery.filter(g => g.status === 'draft').length;

  const publishedBlogs = blogs.filter(b => b.status === 'published').length;
  const draftBlogs = blogs.filter(b => b.status === 'draft').length;

  const statCards = [
    {
      title: 'Tour Packages',
      total: packages.length,
      published: publishedPackages,
      draft: draftPackages,
      icon: Package,
      color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      link: '/admin/packages',
      createLink: '/admin/packages?action=new'
    },
    {
      title: 'Destinations',
      total: destinations.length,
      published: publishedDestinations,
      draft: draftDestinations,
      icon: MapPin,
      color: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      link: '/admin/destinations'
    },
    {
      title: 'Gallery Photos',
      total: gallery.length,
      published: publishedGallery,
      draft: draftGallery,
      icon: ImageIcon,
      color: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      link: '/admin/gallery'
    },
    {
      title: 'Blog Articles',
      total: blogs.length,
      published: publishedBlogs,
      draft: draftBlogs,
      icon: BookOpen,
      color: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
      link: '/admin/blog'
    }
  ];

  return (
    <div className="p-6 sm:p-10 space-y-10 max-w-7xl mx-auto">
      
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-950 p-8 rounded-3xl border border-slate-800 shadow-xl">
        <div className="space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            Administrative Control Panel
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Welcome back, {adminUser?.name || 'Administrator'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Manage packages, destinations, media inventory, and WhatsApp routing in real-time.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/admin/packages"
            className="inline-flex items-center gap-2 bg-[#005f49] hover:bg-[#0a4b3b] text-white px-5 py-3 rounded-2xl text-xs font-bold shadow-lg transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Package</span>
          </Link>

          <Link
            to="/admin/settings"
            className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-3 rounded-2xl text-xs font-bold transition-all border border-slate-700"
          >
            <Settings className="w-4 h-4 text-emerald-400" />
            <span>Site Settings</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid (FR-21) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="bg-slate-950 p-6 rounded-3xl border border-slate-800 shadow-md flex flex-col justify-between space-y-4 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{card.title}</span>
                <div className={`w-10 h-10 rounded-2xl ${card.color} border flex items-center justify-center`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              <div>
                <span className="text-4xl font-black text-white font-mono">{card.total}</span>
                <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-2 font-medium">
                  <span className="text-emerald-400 font-bold">{card.published} Published</span>
                  <span>•</span>
                  <span className="text-amber-400">{card.draft} Draft</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <Link to={card.link} className="text-emerald-400 hover:underline font-bold flex items-center gap-1">
                  <span>Manage</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Live System Configuration Overview (FR-16, FR-28) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* WhatsApp & Contact Routing Info */}
        <div className="lg:col-span-2 bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-[#25D366] flex items-center justify-center">
                <MessageSquare className="w-4 h-4 fill-current" />
              </div>
              <h3 className="font-bold text-base text-white">Active WhatsApp Inquiry Channel</h3>
            </div>
            <Link to="/admin/settings" className="text-xs text-emerald-400 hover:underline font-bold">
              Edit Settings
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-slate-400 block font-bold">Inquiry Target Number:</span>
              <span className="text-white font-mono font-bold text-sm">+{settings.whatsapp_number}</span>
              <p className="text-[10px] text-emerald-400 pt-1">✓ Instant click-to-chat active on all public pages</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-slate-400 block font-bold">Organization Phone & Email:</span>
              <span className="text-white font-mono block">{settings.contact_phone}</span>
              <span className="text-slate-400 block truncate">{settings.contact_email}</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-slate-300">Default WhatsApp Message Template (FR-16):</span>
            <p className="text-xs text-emerald-200 font-mono bg-slate-950 p-3 rounded-xl border border-slate-800/80 leading-relaxed">
              "{settings.whatsapp_message}"
            </p>
            <p className="text-[10px] text-slate-400">
              Variables <code className="text-amber-300">{'{packageName}'}</code> and <code className="text-amber-300">{'{packageUrl}'}</code> are dynamically replaced on click.
            </p>
          </div>
        </div>

        {/* Quick Audit / Activity Feed (FR-33) */}
        <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400" />
              <h3 className="font-bold text-base text-white">Recent Activity Log</h3>
            </div>
            <Link to="/admin/audit" className="text-xs text-emerald-400 hover:underline font-bold">
              All Logs
            </Link>
          </div>

          <div className="space-y-3">
            {auditLogs.slice(0, 5).map(log => (
              <div key={log.id} className="p-3 rounded-xl bg-slate-900 border border-slate-800/80 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-400 text-[10px] uppercase tracking-wider">{log.action}</span>
                  <span className="text-[9px] text-slate-500 font-mono">{log.timestamp.split('BST')[0]}</span>
                </div>
                <p className="text-slate-300 truncate">{log.target}</p>
                <span className="text-[10px] text-slate-500 block truncate font-mono">{log.admin_email}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
