import React from 'react';
import { Link } from 'react-router-dom';
import { Package } from '../types';
import { useApp } from '../context/AppContext';
import { 
  Calendar, MapPin, Clock, ArrowRight, MessageSquare, 
  Sparkles, Flame, CheckCircle2 
} from 'lucide-react';

interface PackageCardProps {
  pkg: Package;
}

export const PackageCard: React.FC<PackageCardProps> = ({ pkg }) => {
  const { getWhatsAppLink } = useApp();

  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Image & Badges */}
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
          <img
            src={pkg.cover_image_url}
            alt={pkg.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
            <span className="bg-white/90 backdrop-blur-md text-slate-800 text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
              {pkg.category_name}
            </span>

            <div className="flex gap-1.5">
              {pkg.is_trending && (
                <span className="bg-rose-500/95 text-white text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                  <Flame className="w-3 h-3 fill-white" />
                  <span>Trending</span>
                </span>
              )}
              {pkg.is_featured && (
                <span className="bg-amber-500/95 text-white text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                  <Sparkles className="w-3 h-3 fill-white" />
                  <span>Featured</span>
                </span>
              )}
            </div>
          </div>

          {/* Bottom Destination Tag over image */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white text-xs font-semibold drop-shadow-md">
            <MapPin className="w-3.5 h-3.5 text-emerald-300" />
            <span>{pkg.destination_name}</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5">
          {/* Duration Badge */}
          <div className="flex items-center gap-3 text-xs text-slate-500 font-semibold mb-2.5">
            <span className="flex items-center gap-1 bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg">
              <Clock className="w-3.5 h-3.5 text-[#005f49]" />
              {pkg.duration_days} Days / {pkg.duration_nights} Nights
            </span>
            <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md text-[11px]">
              Available Batch
            </span>
          </div>

          <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#005f49] transition-colors line-clamp-1 mb-2">
            <Link to={`/packages/${pkg.slug}`}>{pkg.title}</Link>
          </h3>

          <p className="text-slate-600 text-xs leading-relaxed line-clamp-2 mb-4">
            {pkg.short_description}
          </p>

          {/* Key Inclusions preview */}
          {pkg.items && pkg.items.length > 0 && (
            <div className="space-y-1.5 mb-4">
              {pkg.items.slice(0, 2).map((item) => (
                <div key={item.id} className="flex items-center gap-2 text-xs text-slate-500">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="truncate">{item.text}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer Price & CTAs */}
      <div className="px-5 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
        <div>
          <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block">From</span>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-extrabold text-[#005f49]">৳{pkg.price.toLocaleString()}</span>
            <span className="text-[11px] text-slate-500 font-medium">/ person</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Direct WhatsApp CTA (FR-16) */}
          <a
            href={getWhatsAppLink(pkg)}
            target="_blank"
            rel="noopener noreferrer"
            title="Instant WhatsApp Inquiry"
            className="p-2.5 rounded-xl bg-emerald-50 hover:bg-[#25D366] text-[#005f49] hover:text-white transition-all shadow-xs"
          >
            <MessageSquare className="w-4 h-4 fill-current" />
          </a>

          <Link
            to={`/packages/${pkg.slug}`}
            className="inline-flex items-center gap-1.5 bg-[#005f49] hover:bg-[#0a4b3b] text-white text-xs font-bold px-3.5 py-2.5 rounded-xl shadow-sm transition-all hover:gap-2"
          >
            <span>Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
