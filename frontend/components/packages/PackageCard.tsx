import React from 'react';
import Link from 'next/link';
import { Package } from '@backend/types/database.types';
import { formatCurrencyBDT } from '@backend/services/pricing.service';
import { generateWhatsAppInquiryUrl } from '@backend/services/whatsapp.service';

export interface PackageCardProps {
  pkg?: Package & {
    destination?: { name_en?: string; name_bn?: string };
    category?: { name_en?: string; name_bn?: string };
  };
  packageData?: Package & {
    destination?: { name_en?: string; name_bn?: string };
    category?: { name_en?: string; name_bn?: string };
  };
}

export default function PackageCard({ pkg, packageData }: PackageCardProps) {
  const p = pkg || packageData;
  if (!p) return null;

  const formattedPrice = formatCurrencyBDT(p.price_bdt, p.price_mode, 'en');
  const waUrl = generateWhatsAppInquiryUrl({
    packageTitle: p.title_en,
    packageSlug: p.slug,
    packagePrice: p.price_bdt,
    priceMode: p.price_mode,
    locale: 'en',
  });

  return (
    <div className="css-tilt-card bg-surface-container-lowest rounded-2xl border border-surface-container-high overflow-hidden flex flex-col justify-between group shadow-sm hover:shadow-glass-hover">
      {/* Card Image Area */}
      <div>
        <div className="relative h-56 w-full overflow-hidden bg-surface-container">
          <img
            src={p.cover_image_url}
            alt={p.title_en}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
            <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-white/90 backdrop-blur text-primary shadow-sm">
              {p.category?.name_en || 'Domestic Tour'}
            </span>
            <div className="flex gap-1.5">
              {p.is_trending && (
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500 text-white shadow-sm flex items-center gap-1">
                  <span>🔥</span> Trending
                </span>
              )}
              {p.is_featured && (
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-primary text-white shadow-sm">
                  Featured
                </span>
              )}
            </div>
          </div>

          {/* Bottom Overlay Info (Duration & Destination) */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
            <span className="flex items-center gap-1 font-medium drop-shadow">
              <span className="material-symbols-outlined text-sm text-primary-fixed">location_on</span>
              <span>{p.destination?.name_en || 'Expedition'}</span>
            </span>
            <span className="bg-black/40 backdrop-blur px-2.5 py-1 rounded-md text-[11px] font-semibold">
              {p.duration_days}D / {p.duration_nights}N
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 space-y-2">
          <Link href={`/packages/${p.slug}`} className="block group-hover:text-primary transition">
            <h3 className="font-extrabold text-base text-on-surface line-clamp-1">
              {p.title_en}
            </h3>
          </Link>
          <p className="text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
            {p.short_description_en}
          </p>
        </div>
      </div>

      {/* Card Footer: Pricing & Action Buttons */}
      <div className="p-5 pt-3 border-t border-surface-container flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] uppercase font-bold text-outline block">
            {p.price_mode === 'starting_from' ? 'Starts from' : 'Total Price'}
          </span>
          <span className="text-base font-extrabold text-primary">
            {formattedPrice}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick WhatsApp Inquiry */}
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Inquire on WhatsApp"
            className="w-9 h-9 rounded-xl bg-primary/10 hover:bg-primary text-primary hover:text-white flex items-center justify-center transition shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">chat</span>
          </a>

          {/* View Details */}
          <Link
            href={`/packages/${p.slug}`}
            className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-bold transition shadow-sm"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}
