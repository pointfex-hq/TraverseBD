import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { 
  Compass, ShieldCheck, Heart, Award, Users, 
  MapPin, CheckCircle2, Star, ArrowRight, MessageSquare 
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { publishedTestimonials, getWhatsAppLink, settings } = useApp();

  const team = [
    {
      name: 'Hafizur Rahman',
      role: 'Project Manager & Technical Lead',
      bio: 'Architecting robust backend pipelines, database reliability, and expedition logistics planning for Traverse BD.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      badge: 'Technical Lead'
    },
    {
      name: 'Kazi Azmainur Rahman',
      role: 'UI/UX Designer & Deployment Engineer',
      bio: 'Crafting the modern Lush Horizon design system, intuitive visitor flows, and lightning-fast Vercel deployment setups.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
      badge: 'UI/UX Lead'
    },
    {
      name: 'Sifat Mazib',
      role: 'Admin Panel Developer',
      bio: 'Engineering the comprehensive administrative CMS, package inventory management, and role-based access control.',
      avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=300&q=80',
      badge: 'CMS Lead'
    },
    {
      name: 'Janntun Nahar Soha',
      role: 'Technical Documentation & QA Tester',
      bio: 'Authoring formal software requirements specifications, exhaustive acceptance criteria, test suites, and field gazette guides.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      badge: 'QA & Docs Lead'
    }
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative bg-slate-950 text-white pt-20 pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=2000&q=80"
            alt="Sreemangal Tea Estates"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-black/40" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-white/10 px-4 py-1.5 rounded-full border border-white/20">
            About Traverse BD
          </span>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
            Crafting Meaningful Journeys Across the Land of Rivers & Clouds
          </h1>
          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Born from a vision to reveal Bangladesh's biodiversity and cultural richness through responsible, comfortable, and friction-free expeditions.
          </p>
        </div>
      </section>

      {/* 2. THE STORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="text-xs font-bold text-[#005f49] uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full">
            Our Mission & Roots
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
            The Traverse BD Story
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Travel information in Bangladesh was fragmented across social media posts, outdated photo albums, and scattered contacts. Travelers had to negotiate on multiple apps just to get basic tour details, leaving first-time visitors uncertain about safety, accommodation quality, and vehicle reliability.
          </p>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Traverse BD was built to solve this: a unified, modern travel portal where travelers can explore curated itineraries, inspect day-by-day schedules, review authentic field photography, and start inquiries on WhatsApp with a single tap.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
              <span className="block text-2xl font-black text-[#005f49]">100%</span>
              <span className="text-xs text-slate-600 font-semibold">Local Indigenous Guides</span>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
              <span className="block text-2xl font-black text-[#005f49]">Zero</span>
              <span className="text-xs text-slate-600 font-semibold">Complicated Booking Walls</span>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl bg-slate-100">
            <img
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"
              alt="Bangladesh Landscape"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-[#005f49] text-white p-6 rounded-2xl shadow-xl hidden sm:block max-w-xs">
            <Compass className="w-8 h-8 text-emerald-300 mb-2" />
            <p className="text-xs font-semibold leading-relaxed">
              Curated by passionate travelers for travelers who care about authenticity, safety, and cultural preservation.
            </p>
          </div>
        </div>
      </section>

      {/* 3. MILESTONES OF TRUST & SCALE */}
      <section className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 rounded-3xl max-w-7xl mx-auto shadow-xl">
        <div className="max-w-3xl mx-auto text-center space-y-2 mb-12">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
            Milestones of Trust & Scale
          </span>
          <h2 className="text-3xl font-extrabold text-white">Proven Travel Operations</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-1">
            <div className="text-4xl sm:text-5xl font-black text-emerald-400 font-mono">12,000+</div>
            <p className="text-xs text-slate-300 font-medium">Happy Travelers Hosted</p>
          </div>
          <div className="space-y-1">
            <div className="text-4xl sm:text-5xl font-black text-emerald-400 font-mono">45+</div>
            <p className="text-xs text-slate-300 font-medium">Curated Expeditions</p>
          </div>
          <div className="space-y-1">
            <div className="text-4xl sm:text-5xl font-black text-emerald-400 font-mono">99.4%</div>
            <p className="text-xs text-slate-300 font-medium">Satisfaction Rating</p>
          </div>
          <div className="space-y-1">
            <div className="text-4xl sm:text-5xl font-black text-emerald-400 font-mono">100%</div>
            <p className="text-xs text-slate-300 font-medium">Verified Safety & Convoys</p>
          </div>
        </div>
      </section>

      {/* 4. THE TEAM (TEAM LITHIUM / POINTFEX) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold text-[#005f49] uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full">
            Project Leadership
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            The Architects Behind Every Route
          </h2>
          <p className="text-slate-600 text-sm">
            Developed by Team Lithium for the Pointfex client engagement, uniting design, engineering, documentation, and quality assurance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between text-center space-y-4"
            >
              <div className="space-y-4 flex flex-col items-center">
                <div className="relative w-28 h-28 rounded-3xl overflow-hidden shadow-md">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 border-2 border-emerald-500/20 rounded-3xl" />
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider bg-emerald-50 text-[#005f49] px-2.5 py-0.5 rounded-full">
                    {member.badge}
                  </span>
                  <h4 className="text-base font-bold text-slate-900 pt-1">{member.name}</h4>
                  <p className="text-xs text-slate-500 font-medium">{member.role}</p>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. TESTIMONIALS SECTION (FR-09) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-[#005f49] uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full">
            Customer Trust
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900">
            Client Testimonials
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {publishedTestimonials.map(t => (
            <div key={t.id} className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex gap-1 text-amber-400">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed">
                "{t.quote}"
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center gap-3">
                <img
                  src={t.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{t.name}</h4>
                  <p className="text-[10px] text-slate-500">{t.role} • {t.organization}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
