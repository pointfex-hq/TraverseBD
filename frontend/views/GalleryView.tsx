'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { GalleryItem } from '@backend/data/admin-mock-data';

interface GalleryViewProps {
  initialItems?: GalleryItem[];
}

const CATEGORIES = [
  { key: 'all', label: 'All Photos' },
  { key: 'coastal', label: 'Coastal & Marine' },
  { key: 'hills', label: 'Hill Tracts & Clouds' },
  { key: 'forests', label: 'Forests & Wildlife' },
  { key: 'riverine', label: 'Riverine & Haors' },
  { key: 'cultural', label: 'Cultural & Heritage' },
];

export default function GalleryView({ initialItems = [] }: GalleryViewProps) {
  const [items, setItems] = useState<GalleryItem[]>(initialItems);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    if (initialItems && initialItems.length > 0) {
      setItems(initialItems);
    }
  }, [initialItems]);

  const filteredItems = items.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  const activePhoto = lightboxIndex !== null && filteredItems[lightboxIndex] ? filteredItems[lightboxIndex] : null;

  const nextLightbox = useCallback(() => {
    if (lightboxIndex !== null && filteredItems.length > 0) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  }, [lightboxIndex, filteredItems.length]);

  const prevLightbox = useCallback(() => {
    if (lightboxIndex !== null && filteredItems.length > 0) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  }, [lightboxIndex, filteredItems.length]);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextLightbox();
      if (e.key === 'ArrowLeft') prevLightbox();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, closeLightbox, nextLightbox, prevLightbox]);

  return (
    <main className="w-full bg-surface min-h-[calc(100vh-20rem)]">
      <div className="flex flex-col w-full">
        {/* 1. DYNAMIC HERO & ATMOSPHERE SCRIM */}
        <section className="relative w-full overflow-hidden bg-surface-container-low py-10 lg:py-14 px-6 lg:px-12 border-b border-surface-container">
          <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-secondary-container/40 blur-3xl pointer-events-none" />
          <div className="absolute left-1/3 -bottom-20 w-80 h-80 rounded-full bg-primary-fixed/30 blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto flex flex-col gap-6 relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-3xl flex flex-col gap-2">
                <div className="inline-flex items-center gap-2 w-fit px-3.5 py-1.5 rounded-full bg-surface-container text-primary font-bold text-xs shadow-sm">
                  <span className="material-symbols-outlined text-[18px]">photo_library</span>
                  <span className="tracking-wider uppercase">CURATED EXPEDITION ARCHIVES</span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-extrabold text-on-surface tracking-tight leading-tight">
                  Traveler Stories &amp; <span className="text-primary">Visual Journey</span>
                </h1>

                <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl leading-relaxed">
                  High-resolution moments captured by intrepid explorers, field naturalists, and local storytellers traversing the riverine deltas, primeval mangroves, and cloud-draped ranges of Bangladesh.
                </p>
              </div>

              {/* Curated Stats Mini Badges */}
              <div className="flex items-center gap-3 bg-surface-container-lowest/80 backdrop-blur-md p-3 rounded-2xl shadow-sm self-start md:self-end border border-surface-container">
                <div className="flex -space-x-2">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold ring-2 ring-surface-container-lowest shadow-sm">
                    <span className="material-symbols-outlined text-[20px]">lens</span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white font-bold ring-2 ring-surface-container-lowest shadow-sm">
                    <span className="material-symbols-outlined text-[20px]">shutter_speed</span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-tertiary flex items-center justify-center text-white font-bold ring-2 ring-surface-container-lowest shadow-sm">
                    <span className="material-symbols-outlined text-[20px]">verified</span>
                  </div>
                </div>
                <div className="flex flex-col pl-1">
                  <span className="font-bold text-xs sm:text-sm text-on-surface">Curated by Photographers</span>
                  <span className="text-[11px] text-on-surface-variant font-medium">4K RAW Archive Standard</span>
                </div>
              </div>
            </div>

            {/* Filter Tabs Navigation */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-2 scrollbar-none">
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.key;
                return (
                  <button
                    key={cat.key}
                    type="button"
                    onClick={() => setActiveCategory(cat.key)}
                    className={`shrink-0 px-5 py-2 rounded-full text-xs font-bold transition-all duration-200 ${isActive
                      ? 'bg-primary text-white shadow-sm'
                      : 'bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                      }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* 2. MASONRY PHOTO GRID SECTION */}
        <section className="max-w-7xl mx-auto w-full px-6 lg:px-12 py-10">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredItems.map((item, index) => {
              const aspectClass = item.aspect || 'aspect-[4/5]';
              return (
                <div
                  key={item.id}
                  onClick={() => setLightboxIndex(index)}
                  className="break-inside-avoid rounded-2xl overflow-hidden bg-surface-container group relative cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className={`relative w-full ${aspectClass} overflow-hidden bg-surface-container`}>
                    <img
                      src={item.imageUrl}
                      alt={item.alt || item.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80';
                      }}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-on-surface/90 via-on-surface/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                      <div className="flex justify-between items-start">
                        <span className="px-3.5 py-1 rounded-full bg-surface-container-lowest/80 backdrop-blur-md text-[11px] font-bold text-primary uppercase tracking-wider">
                          {item.badge || item.category}
                        </span>
                        <div className="w-10 h-10 rounded-full bg-surface-container-lowest/90 backdrop-blur-md flex items-center justify-center text-primary shadow-sm group-hover:scale-110 transition-transform">
                          <span className="material-symbols-outlined text-[20px]">zoom_in</span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1 text-white">
                        <div className="flex items-center gap-1.5 text-secondary-fixed text-xs font-semibold">
                          <span className="material-symbols-outlined text-[16px]">location_on</span>
                          <span>{item.location}</span>
                        </div>
                        <h3 className="font-bold text-lg leading-snug">{item.title}</h3>
                        <div className="flex items-center justify-between pt-1 text-surface-variant text-xs">
                          <span>By {item.author}</span>
                          <span className="text-[11px] bg-surface-container/20 px-2 py-0.5 rounded font-mono">
                            {item.gear}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-20 bg-surface-container-lowest rounded-3xl border border-surface-container p-8 space-y-3">
              <span className="material-symbols-outlined text-4xl text-outline">photo_camera</span>
              <h3 className="text-lg font-bold text-on-surface">No photographs found in this category</h3>
              <p className="text-xs text-on-surface-variant">
                Select another filter or check back as our photographers upload new field archives.
              </p>
              <button
                onClick={() => setActiveCategory('all')}
                className="px-4 py-2 rounded-full bg-primary text-white text-xs font-bold"
              >
                View All Photos
              </button>
            </div>
          )}
        </section>

        {/* 3. COMMUNITY PHOTO STATS BANNER */}
        <section className="max-w-7xl mx-auto w-full px-6 lg:px-12 py-10">
          <div className="bg-surface-container rounded-3xl p-8 lg:p-12 shadow-sm relative overflow-hidden border border-surface-container-high/60">
            <div className="absolute -right-16 -bottom-16 w-64 h-64 rounded-full bg-primary-fixed/30 blur-2xl pointer-events-none" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
              <div className="flex flex-col gap-1 border-b md:border-b-0 md:border-r border-outline-variant/30 pb-6 md:pb-0 md:pr-6">
                <div className="flex items-center gap-2 text-primary">
                  <span className="material-symbols-outlined text-[32px]">photo_camera</span>
                  <span className="text-3xl sm:text-4xl font-extrabold text-primary">12,000+</span>
                </div>
                <span className="font-bold text-base text-on-surface">Photos Submitted</span>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Archived across 64 districts by our travel photography guild and verified travelers.
                </p>
              </div>

              <div className="flex flex-col gap-1 border-b md:border-b-0 md:border-r border-outline-variant/30 pb-6 md:pb-0 md:pr-6">
                <div className="flex items-center gap-2 text-secondary">
                  <span className="material-symbols-outlined text-[32px]">groups</span>
                  <span className="text-3xl sm:text-4xl font-extrabold text-secondary">48</span>
                </div>
                <span className="font-bold text-base text-on-surface">Community Photo Walks</span>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Field workshops conducted in deep mangrove channels, hill trails, and historical settlements.
                </p>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-tertiary">
                  <span className="material-symbols-outlined text-[32px]">award_star</span>
                  <span className="text-3xl sm:text-4xl font-extrabold text-tertiary">Featured</span>
                </div>
                <span className="font-bold text-base text-on-surface">Nat Geo Traveler BD</span>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Showcasing the untouched ecological frontiers and community narratives of Bangladesh to the world.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. INSTAGRAM / UGC FEED CALLOUT BANNER */}
        <section className="max-w-7xl mx-auto w-full px-6 lg:px-12 pb-14">
          <div className="bg-surface-container-high rounded-3xl p-8 lg:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm border border-surface-container">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-white shrink-0 shadow-md">
                <span className="material-symbols-outlined text-[32px]">travel_explore</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-primary font-bold uppercase tracking-wider">
                  COMMUNITY VISUAL FEED
                </span>
                <h2 className="text-2xl font-bold text-on-surface">
                  Tag <span className="text-primary font-extrabold">#TraverseBD</span> to get featured
                </h2>
                <p className="text-xs sm:text-sm text-on-surface-variant">
                  We highlight traveler perspectives weekly in our official gallery curation and seasonal travel zine.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
              <a
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary hover:bg-primary-container text-white font-bold text-xs shadow-md hover:shadow-lg transition-all"
                href="https://instagram.com"
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="material-symbols-outlined text-[20px]">open_in_new</span>
                <span>Submit Your Story</span>
              </a>
            </div>
          </div>
        </section>

        {/* 5. INTERACTIVE LIGHTBOX MODAL */}
        {activePhoto && lightboxIndex !== null && (
          <div
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 lg:p-12 transition-opacity duration-300"
            onClick={closeLightbox}
          >
            <div
              className="relative w-full max-w-5xl bg-surface-container-lowest rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-surface-container-lowest/80 backdrop-blur-md flex items-center justify-center text-on-surface hover:bg-surface-container transition-all shadow-sm border border-surface-container"
                onClick={closeLightbox}
                aria-label="Close modal"
              >
                <span className="material-symbols-outlined text-[24px]">close</span>
              </button>

              {/* Content Layout */}
              <div className="flex flex-col lg:flex-row flex-1 overflow-y-auto">
                {/* Visual Presentation */}
                <div className="lg:w-2/3 bg-black flex items-center justify-center min-h-[300px] lg:min-h-[560px] relative">
                  <img
                    src={activePhoto.imageUrl}
                    alt={activePhoto.alt}
                    className="w-full h-full max-h-[70vh] object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80';
                    }}
                  />
                </div>

                {/* Metadata Sidebar */}
                <div className="lg:w-1/3 p-6 sm:p-8 flex flex-col justify-between bg-surface-container-lowest gap-6 border-t lg:border-t-0 lg:border-l border-surface-container">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-1.5 text-primary text-xs font-bold uppercase tracking-wider">
                      {activePhoto.badge || activePhoto.category}
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-on-surface">
                      {activePhoto.title}
                    </h3>

                    <div className="flex items-center gap-1.5 text-on-surface-variant text-xs">
                      <span className="material-symbols-outlined text-secondary text-[18px]">
                        location_on
                      </span>
                      <span>{activePhoto.location}</span>
                    </div>

                    <div className="bg-surface-container-low rounded-2xl p-4 flex flex-col gap-1 mt-2 border border-surface-container">
                      <span className="text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">
                        PHOTOGRAPHER
                      </span>
                      <span className="text-sm font-bold text-on-surface">{activePhoto.author}</span>
                      <span className="text-xs text-outline font-mono">{activePhoto.gear}</span>
                    </div>

                    <p className="text-xs text-on-surface-variant leading-relaxed mt-1">
                      {activePhoto.desc}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-outline-variant/30">
                    <button
                      className="flex items-center gap-1 text-on-surface hover:text-primary transition-colors text-xs font-bold"
                      onClick={prevLightbox}
                    >
                      <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                      <span>Previous</span>
                    </button>

                    <span className="text-xs text-on-surface-variant font-bold font-mono">
                      {lightboxIndex + 1} / {filteredItems.length}
                    </span>

                    <button
                      className="flex items-center gap-1 text-on-surface hover:text-primary transition-colors text-xs font-bold"
                      onClick={nextLightbox}
                    >
                      <span>Next</span>
                      <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
