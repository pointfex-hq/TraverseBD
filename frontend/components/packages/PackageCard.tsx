import React from 'react';
import Link from 'next/link';
import { Package } from '@backend/types/database.types';
import { formatCurrencyBDT } from '@backend/services/pricing.service';
import { generateWhatsAppInquiryUrl } from '@backend/services/whatsapp.service';

interface PackageCardProps {
  pkg: Package & {
    destination?: { name_en?: string; name_bn?: string };
    category?: { name_en?: string; name_bn?: string };
  };
  locale?: 'en' | 'bn';
}

export default function PackageCard({ pkg, locale = 'en' }: PackageCardProps) {
  const formattedPrice = formatCurrencyBDT(pkg.price_bdt, pkg.price_mode, locale);
  const waUrl = generateWhatsAppInquiryUrl({
    packageTitle: locale === 'bn' ? pkg.title_bn : pkg.title_en,
    packageSlug: pkg.slug,
    packagePrice: pkg.price_bdt,
    priceMode: pkg.price_mode,
    locale,
  });

  return (
    <div className="css-tilt-card bg-surface-container-lowest rounded-2xl border border-surface-container-high overflow-hidden flex flex-col justify-between group shadow-sm hover:shadow-glass-hover">
      {/* Card Image Area */}
      <div>
        <div className="relative h-56 w-full overflow-hidden bg-surface-container">
          <img
            src={pkg.cover_image_url}
            alt={pkg.title_en}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
            <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-white/90 backdrop-blur text-primary shadow-sm">
              {pkg.category?.name_en || 'Tour'}
            </span>
            <div className="flex gap-1.5">
              {pkg.is_trending && (
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500 text-white shadow-sm flex items-center gap-1">
                  <span>🔥</span> Trending
                </span>
              )}
              {pkg.is_featured && (
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
              <span>{pkg.destination?.name_en || 'Bangladesh'}</span>
            </span>
            <span className="bg-black/40 backdrop-blur px-2.5 py-1 rounded-md text-[11px] font-semibold">
              {pkg.duration_days}D / {pkg.duration_nights}N
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 space-y-2">
          <Link href={`/packages/${pkg.slug}`} className="block group-hover:text-primary transition">
            <h3 className="font-extrabold text-base text-on-surface line-clamp-1">
              {locale === 'bn' ? pkg.title_bn : pkg.title_en}
            </h3>
            {locale === 'en' && pkg.title_bn && (
              <p className="text-xs text-secondary/80 font-bengali line-clamp-1">
                {pkg.title_bn}
              </p>
            )}
          </Link>
          <p className="text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
            {locale === 'bn' ? pkg.short_description_bn : pkg.short_description_en}
          </p>
        </div>
      </div>

      {/* Card Footer: Pricing & Action Buttons */}
      <div className="p-5 pt-3 border-t border-surface-container flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] uppercase font-bold text-outline block">
            {pkg.price_mode === 'starting_from' ? (locale === 'bn' ? 'শুরু' : 'Starts from') : (locale === 'bn' ? 'নির্ধারিত' : 'Total Price')}
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
            title="Book via WhatsApp"
            className="h-9 w-9 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white border border-emerald-200 flex items-center justify-center transition-all hover:scale-105"
          >
            <span className="material-symbols-outlined text-lg">chat</span>
          </a>

          {/* View Details */}
          <Link
            href={`/packages/${pkg.slug}`}
            className="px-3.5 py-2 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-bold transition-all shadow-sm"
          >
            {locale === 'bn' ? 'বিস্তারিত' : 'View Tour'}
          </Link>
        </div>
      </div>
    </div>
  );
}
