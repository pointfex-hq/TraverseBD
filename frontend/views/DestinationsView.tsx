'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import DestinationCard from '@frontend/components/destinations/DestinationCard';
import { Destination } from '@backend/types/database.types';

interface DestinationsViewProps {
  destinations: Destination[];
}

export default function DestinationsView({ destinations }: DestinationsViewProps) {
  const [selectedDivision, setSelectedDivision] = useState<string>('all');

  const divisions = [
    { key: 'all', label: 'All Destinations' },
    { key: 'Chittagong', label: 'Chittagong & Hill Tracts' },
    { key: 'Sylhet', label: 'Sylhet & Tea Valleys' },
    { key: 'Khulna', label: 'Khulna & Sundarbans' },
  ];

  const filtered =
    selectedDivision === 'all'
      ? destinations
      : destinations.filter((d) => d.region.toLowerCase().includes(selectedDivision.toLowerCase()));

  return (
    <main className="space-y-14 pb-20">
      {/* 1. HERO HEADER */}
      <section className="relative overflow-hidden bg-surface-container-low/70 border-b border-surface-container py-14 px-6 lg:px-12 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-lowest shadow-sm border border-surface-container">
            <span className="material-symbols-outlined text-primary text-[16px]">location_on</span>
            <span className="text-xs uppercase tracking-wider text-primary font-bold">
              Regional Tourism Catalog
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-on-surface tracking-tight">
            Discover Bangladesh’s Premier Travel Corridors
          </h1>

          <p className="text-sm text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            From the world’s longest natural sandy beach in Cox’s Bazar to misty tribal ridges in Sajek and ancient mangrove labyrinths in the Sundarbans.
          </p>

          {/* Division Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {divisions.map((div) => (
              <button
                key={div.key}
                onClick={() => setSelectedDivision(div.key)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  selectedDivision === div.key
                    ? 'bg-primary text-white shadow-md shadow-primary/20 scale-105'
                    : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container border border-surface-container'
                }`}
              >
                {div.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. DESTINATION GRID */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((dest) => (
            <div
              key={dest.id}
              className="group rounded-3xl bg-surface-container-lowest border border-surface-container overflow-hidden shadow-sm hover:shadow-glass-hover transition-all duration-300 flex flex-col"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={dest.cover_image_url}
                  alt={dest.name_en}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=1200&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-white text-[11px] font-bold border border-white/20">
                    {dest.region}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-2xl font-extrabold tracking-tight">{dest.name_en}</h3>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs text-on-surface-variant line-clamp-3 leading-relaxed">
                  {dest.short_description_en}
                </p>

                <div className="pt-2 border-t border-surface-container flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-on-surface-variant font-medium">
                    <span className="material-symbols-outlined text-[16px] text-primary">
                      calendar_month
                    </span>
                    <span>Best Season: Oct — Mar</span>
                  </div>

                  <Link
                    href={`/packages?destination=${dest.slug}`}
                    className="inline-flex items-center gap-1 font-bold text-primary hover:text-primary/80 transition"
                  >
                    <span>View Tours</span>
                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
