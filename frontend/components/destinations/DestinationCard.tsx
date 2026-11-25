import React from 'react';
import Link from 'next/link';
import { Destination } from '@backend/types/database.types';

interface DestinationCardProps {
  destination: Destination;
  locale?: 'en' | 'bn';
}

export default function DestinationCard({ destination, locale = 'en' }: DestinationCardProps) {
  return (
    <Link
      href={`/packages?destination=${destination.slug}`}
      className="css-tilt-card group relative h-72 rounded-2xl overflow-hidden shadow-sm hover:shadow-glass-hover block"
    >
      <img
        src={destination.cover_image_url}
        alt={destination.name_en}
        className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
        loading="lazy"
      />
      {/* Gradient Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      {/* Floating Region Pill */}
      <div className="absolute top-3 left-3">
        <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-white/90 backdrop-blur text-secondary shadow-sm">
          {destination.region}
        </span>
      </div>

      {/* Destination Name & Info */}
      <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
        <h3 className="font-extrabold text-xl tracking-tight leading-tight group-hover:text-primary-fixed transition">
          {destination.name_en}
        </h3>
        <p className="text-xs text-slate-200 line-clamp-2 leading-relaxed opacity-90 pt-1">
          {destination.short_description_en}
        </p>

        <span className="inline-flex items-center gap-1 text-xs font-bold text-primary-fixed pt-2 group-hover:translate-x-1 transition-transform">
          <span>Explore Packages</span>
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </span>
      </div>
    </Link>
  );
}
