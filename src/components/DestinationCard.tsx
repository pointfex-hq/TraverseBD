import React from 'react';
import { Link } from 'react-router-dom';
import { Destination } from '../types';
import { useApp } from '../context/AppContext';
import { MapPin, ArrowRight, Sparkles } from 'lucide-react';

interface DestinationCardProps {
  destination: Destination;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
  const { publishedPackages } = useApp();
  const packageCount = publishedPackages.filter(p => p.destination_id === destination.id).length;

  return (
    <Link
      to={`/destinations/${destination.slug}`}
      className="group relative rounded-3xl overflow-hidden aspect-[4/5] bg-slate-900 border border-slate-200/60 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-end p-6"
    >
      {/* Background Image */}
      <img
        src={destination.cover_image_url}
        alt={destination.name}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-95 group-hover:brightness-90"
        loading="lazy"
      />

      {/* Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-black/20" />

      {/* Top Badges */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
        <span className="bg-white/90 backdrop-blur-md text-slate-800 text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
          {packageCount} {packageCount === 1 ? 'Tour' : 'Tours'}
        </span>

        {destination.is_featured && (
          <span className="bg-amber-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
            <Sparkles className="w-3 h-3 fill-white" />
            <span>Featured</span>
          </span>
        )}
      </div>

      {/* Card Content */}
      <div className="relative z-10 space-y-2">
        <div className="flex items-center gap-1.5 text-emerald-300 text-xs font-semibold">
          <MapPin className="w-3.5 h-3.5" />
          <span>{destination.region}</span>
        </div>

        <h3 className="text-2xl font-black text-white group-hover:text-emerald-300 transition-colors">
          {destination.name}
        </h3>

        <p className="text-slate-300 text-xs leading-relaxed line-clamp-2">
          {destination.short_description}
        </p>

        <div className="pt-2 flex items-center gap-2 text-xs font-bold text-white group-hover:text-emerald-300 group-hover:translate-x-1 transition-all">
          <span>Explore Destination</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </Link>
  );
};
