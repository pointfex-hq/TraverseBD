'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import PackageCard from '@frontend/components/packages/PackageCard';
import PackageFilterSidebar from '@frontend/components/packages/PackageFilterSidebar';
import { Package } from '@backend/types/database.types';

interface PackagesViewProps {
  initialPackages: (Package & {
    destination?: { name_en?: string; name_bn?: string };
    category?: { slug?: string; name_en?: string; name_bn?: string };
  })[];
  initialCategory?: string;
  initialDestination?: string;
  initialQuery?: string;
}

const CATEGORY_TABS = [
  { slug: '', label: 'All Expeditions', icon: 'explore' },
  { slug: 'hill-mountain', label: 'Hill Tracts & Valleys', icon: 'terrain' },
  { slug: 'beach-coastal', label: 'Coastal & Coral Islands', icon: 'beach_access' },
  { slug: 'forest-wildlife', label: 'Mangroves & Wildlife', icon: 'forest' },
  { slug: 'heritage-culture', label: 'Heritage & Tea Estates', icon: 'eco' },
];

export default function PackagesView({
  initialPackages,
  initialCategory = '',
  initialQuery = '',
}: PackagesViewProps) {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [maxPrice, setMaxPrice] = useState<number>(80000);
  const [selectedDuration, setSelectedDuration] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  // Client-side filtering on packages
  const filteredPackages = useMemo(() => {
    return initialPackages
      .filter((pkg) => {
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = pkg.title_en.toLowerCase().includes(q);
          const matchDesc = pkg.short_description_en.toLowerCase().includes(q);
          const matchDest = pkg.destination?.name_en?.toLowerCase().includes(q) || false;
          if (!matchTitle && !matchDesc && !matchDest) return false;
        }

        // Category
        if (selectedCategory) {
          if (pkg.category?.slug !== selectedCategory && pkg.category_id !== selectedCategory) {
            return false;
          }
        }

        // Duration
        if (selectedDuration) {
          if (selectedDuration === '2-3' && (pkg.duration_days < 2 || pkg.duration_days > 3)) return false;
          if (selectedDuration === '4-5' && (pkg.duration_days < 4 || pkg.duration_days > 5)) return false;
          if (selectedDuration === '6+' && pkg.duration_days < 6) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price_asc') return a.price_bdt - b.price_bdt;
        if (sortBy === 'price_desc') return b.price_bdt - a.price_bdt;
        if (sortBy === 'duration_asc') return a.duration_days - b.duration_days;
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      });
  }, [initialPackages, searchQuery, selectedCategory, maxPrice, selectedDuration, sortBy]);

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setMaxPrice(80000);
    setSelectedDuration('');
    setSortBy('newest');
  };

  return (
    <main className="space-y-12 pb-24 pt-24 bg-surface">
      {/* 1. HERO & CATEGORY TABS */}
      <section className="relative overflow-hidden bg-surface-container-low/60 pt-10 pb-12 px-6 lg:px-12 border-b border-surface-container">
        <div className="absolute -top-32 right-1/4 w-96 h-96 bg-primary-fixed/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-12 left-10 w-72 h-72 bg-secondary-fixed/30 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-lowest shadow-sm border border-outline-variant/30">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs uppercase tracking-wider text-primary font-bold">
              Curated Expeditions 2025–2026
            </span>
            <span className="text-outline-variant">•</span>
            <span className="text-xs text-on-surface-variant font-medium">Journeys Across Bangladesh</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-on-surface tracking-tight max-w-3xl">
            Tour Packages &amp; Handcrafted Expeditions
          </h1>

          <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl leading-relaxed">
            From floating cloud kingdoms in Sajek and coral shores of Saint Martin to ancient Sundarbans mangrove waterways. Handcrafted itineraries backed by dedicated on-ground guides.
          </p>

          {/* Quick Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4 max-w-4xl">
            {CATEGORY_TABS.map((tab) => {
              const isActive = selectedCategory === tab.slug;
              return (
                <button
                  key={tab.slug}
                  onClick={() => setSelectedCategory(tab.slug)}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition ${isActive
                    ? 'bg-primary text-white font-bold shadow-sm'
                    : 'bg-surface-container-lowest text-on-surface-variant hover:text-primary border border-surface-container'
                    }`}
                >
                  <span className="material-symbols-outlined text-[15px]">{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. MAIN LAYOUT: SIDEBAR + PACKAGE CARDS */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Filter Sidebar */}
          <div className="lg:col-span-4 xl:col-span-3">
            <PackageFilterSidebar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              selectedDuration={selectedDuration}
              setSelectedDuration={setSelectedDuration}
              onReset={handleReset}
            />
          </div>

          {/* Right Package Grid */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-6">
            {/* Results Topbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-surface-container">
              <div>
                <h2 className="text-lg font-bold text-on-surface">Available Expeditions</h2>
                <p className="text-xs text-on-surface-variant">
                  Showing <strong className="text-primary font-bold">{filteredPackages.length}</strong> active tours across Bangladesh
                </p>
              </div>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-2">
                <label className="text-xs text-on-surface-variant font-medium">Sort By:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-surface-container-low text-xs text-on-surface font-semibold px-3 py-1.5 rounded-xl border border-surface-container-high focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
                >
                  <option value="newest">Featured &amp; Newest</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="duration_asc">Duration: Short to Long</option>
                </select>
              </div>
            </div>

            {/* Packages Grid */}
            {filteredPackages.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredPackages.map((pkg) => (
                  <PackageCard key={pkg.id} pkg={pkg} packageData={pkg} />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="rounded-3xl bg-surface-container-lowest border border-surface-container p-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-surface-container-low text-on-surface-variant flex items-center justify-center mx-auto">
                  <span className="material-symbols-outlined text-3xl">travel_explore</span>
                </div>
                <h3 className="text-base font-bold text-on-surface">No packages match your criteria</h3>
                <p className="text-xs text-on-surface-variant max-w-sm mx-auto">
                  Try adjusting your price range, clearing filters, or contacting our team for a custom itinerary.
                </p>
                <button
                  onClick={handleReset}
                  className="px-5 py-2.5 rounded-full bg-primary text-white text-xs font-bold hover:bg-primary/90 transition shadow-sm"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
