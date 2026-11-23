import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  Compass, Phone, Mail, MapPin, Clock, MessageSquare, 
  ShieldCheck, Heart, ExternalLink, ArrowUpRight 
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { settings, destinations, getWhatsAppLink } = useApp();

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#005f49] to-[#0d7a5f] flex items-center justify-center text-white shadow-md shadow-[#005f49]/30">
                <Compass className="w-5 h-5" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-black text-white tracking-tight">TRAVERSE</span>
                <span className="text-2xl font-black text-[#7cd8b8]">BD</span>
              </div>
            </div>
            
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Discover the untamed beauty of Bangladesh with curated expeditions across cloud-kissed mountain peaks, ancient mangrove forests, and pristine coral islands.
            </p>

            <div className="pt-2">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-[#005f49] hover:bg-[#0d7a5f] text-white px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-sm group"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>Quick WhatsApp Inquiry</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-emerald-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">Explore Portal</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-emerald-400 transition-colors">Home Page</Link>
              </li>
              <li>
                <Link to="/destinations" className="hover:text-emerald-400 transition-colors">All Destinations</Link>
              </li>
              <li>
                <Link to="/packages" className="hover:text-emerald-400 transition-colors">Tour Packages</Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-emerald-400 transition-colors">Visual Gallery</Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-emerald-400 transition-colors">Gazette & Guides</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-emerald-400 transition-colors">About Us & Team</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-emerald-400 transition-colors">Contact Support</Link>
              </li>
            </ul>
          </div>

          {/* Featured Destinations */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">Top Destinations</h4>
            <ul className="space-y-2.5 text-sm">
              {destinations.slice(0, 5).map(dest => (
                <li key={dest.id}>
                  <Link 
                    to={`/destinations/${dest.slug}`} 
                    className="hover:text-emerald-400 transition-colors flex items-center justify-between"
                  >
                    <span>{dest.name}</span>
                    <span className="text-[11px] text-slate-500">{dest.region.split(',')[0]}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details (Admin Configured via settings - FR-10) */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">Contact & Office</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="leading-snug">{settings.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`tel:${settings.contact_phone}`} className="hover:text-emerald-400 transition-colors">
                  {settings.contact_phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`mailto:${settings.contact_email}`} className="hover:text-emerald-400 transition-colors">
                  {settings.contact_email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-xs text-slate-400">{settings.office_hours}</span>
              </li>
            </ul>

            <div className="pt-2">
              <Link 
                to="/admin" 
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 hover:border-slate-700"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>Protected Admin CMS</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {settings.organization_name}. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Prepared by <span className="text-emerald-400 font-semibold">Team Lithium</span> for <span className="text-slate-300 font-medium">Pointfex</span> client project.
          </p>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span>•</span>
            <Link to="/admin" className="text-emerald-400 hover:underline">Admin Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
