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
  { slug: 'wildlife-forest', label: 'Mangroves & Wildlife', icon: 'forest' },
  { slug: 'tea-nature', label: 'Tea Estates & Rain Forests', icon: 'eco' },
  { slug: 'cultural-heritage', label: 'Heritage & Archaeology', icon: 'account_balance' },
];

export default function PackagesView({
  initialPackages,
  initialCategory = '',
  initialDestination = '',
  initialQuery = '',
}: PackagesViewProps) {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [maxPrice, setMaxPrice] = useState<number>(25000);
  const [selectedDuration, setSelectedDuration] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  // Client-side filtering on packages
  const filteredPackages = useMemo(() => {
    return initialPackages
      .filter((pkg) => {
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle =
            pkg.title_en.toLowerCase().includes(q) || pkg.title_bn.toLowerCase().includes(q);
          const matchDesc = pkg.short_description_en.toLowerCase().includes(q);
          if (!matchTitle && !matchDesc) return false;
        }

        // Category
        if (selectedCategory) {
          if (pkg.category?.slug !== selectedCategory && pkg.category_id !== selectedCategory) {
            return false;
          }
        }

        // Price
        if (pkg.price_bdt > maxPrice) return false;

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
        return 0; // newest / default
      });
  }, [initialPackages, searchQuery, selectedCategory, maxPrice, selectedDuration, sortBy]);

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setMaxPrice(25000);
    setSelectedDuration('');
    setSortBy('newest');
  };

  return (
    <main className="space-y-16 pb-20">
      {/* 1. HERO & CATEGORY TABS (Stitch Tour Packages 1 Design) */}
      <section className="relative overflow-hidden bg-surface-container-low/60 pt-12 pb-14 px-6 lg:px-12 border-b border-surface-container">
        <div className="absolute -top-32 right-1/4 w-96 h-96 bg-primary-fixed/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-12 left-10 w-72 h-72 bg-secondary-fixed/30 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10 space-y-4">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-lowest shadow-sm border border-outline-variant/30">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs uppercase tracking-wider text-primary font-bold">
              Curated Expeditions 2025
            </span>
            <span className="text-outline-variant">•</span>
            <span className="text-xs text-on-surface-variant">Traverse BD Catalog</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-on-surface tracking-tight max-w-3xl">
            Tour Packages & Expeditions Across Bangladesh
          </h1>

          <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl leading-relaxed">
            From floating cloud kingdoms in Sajek and coral shores of Saint Martin to untamed mangrove waterways. Handcrafted itineraries backed by dedicated local guides and verified transport.
          </p>

          {/* Quick Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4 max-w-4xl">
            {CATEGORY_TABS.map((tab) => {
              const isActive = selectedCategory === tab.slug;
              return (
                <button
                  key={tab.slug}
                  onClick={() => setSelectedCategory(tab.slug)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-primary text-white shadow-md shadow-primary/20 scale-105'
                      : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container border border-surface-container-high'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. MAIN CATALOG: FILTERS + GRID */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Sidebar */}
          <div className="lg:col-span-1">
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

          {/* Package Grid */}
          <div className="lg:col-span-3 space-y-6">
            {/* Header / Sort Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-container-lowest p-4 rounded-2xl border border-surface-container shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold text-on-surface-variant">
                <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
                <span>
                  Showing <strong className="text-primary">{filteredPackages.length}</strong> available packages
                </span>
              </div>

              <div className="flex items-center gap-3">
                <label htmlFor="sortSelect" className="text-xs text-on-surface-variant font-medium">
                  Sort By:
                </label>
                <select
                  id="sortSelect"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-surface-container-low text-on-surface text-xs font-semibold px-3 py-2 rounded-xl border border-surface-container-high focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
                >
                  <option value="newest">Featured & Newest</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="duration_asc">Duration: Short to Long</option>
                </select>
              </div>
            </div>

            {/* Results Grid */}
            {filteredPackages.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredPackages.map((pkg) => (
                  <PackageCard key={pkg.id} pkg={pkg} />
                ))}
              </div>
            ) : (
              <div className="bg-surface-container-lowest rounded-2xl p-12 text-center border border-dashed border-surface-container-high space-y-4">
                <span className="material-symbols-outlined text-4xl text-outline">search_off</span>
                <h3 className="text-lg font-bold text-on-surface">No packages found</h3>
                <p className="text-xs text-on-surface-variant max-w-sm mx-auto">
                  Try adjusting your search criteria, price range, or category filter to discover more itineraries.
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

      {/* 3. SEAMLESS BOOKING PROCESS (Stitch Section 2) */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pt-8">
        <div className="rounded-3xl bg-surface-container-lowest border border-surface-container p-8 md:p-12 shadow-sm space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-wider text-primary font-bold">
              Seamless Booking Process
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
              Zero Complicated Forms, Just Direct Travel Design
            </h2>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              We stripped down tedious multi-step checkouts. Connect directly with our trip architects on WhatsApp to finalize your custom schedule, departure date, and group arrangements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="p-6 rounded-2xl bg-surface-container-low/70 border border-surface-container flex flex-col items-start hover:-translate-y-1 transition-transform">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-extrabold text-base mb-4">
                01
              </div>
              <h3 className="text-base font-bold text-on-surface">Select Your Destination</h3>
              <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
                Browse our verified packages above or request a completely bespoke route tailored to your group size, budget, and travel dates.
              </p>
              <div className="mt-4 flex items-center gap-1.5 text-primary text-xs font-semibold">
                <span>Fast response guarantee</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-2xl bg-surface-container-low/70 border border-surface-container flex flex-col items-start hover:-translate-y-1 transition-transform">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-extrabold text-base mb-4">
                02
              </div>
              <h3 className="text-base font-bold text-on-surface">Chat On WhatsApp</h3>
              <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
                Click any package to generate a tailored WhatsApp inquiry with your preferred dates, traveler count, and custom notes. Instant confirmation.
              </p>
              <div className="mt-4 flex items-center gap-1.5 text-primary text-xs font-semibold">
                <span>Direct operator link</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-2xl bg-surface-container-low/70 border border-surface-container flex flex-col items-start hover:-translate-y-1 transition-transform">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-extrabold text-base mb-4">
                03
              </div>
              <h3 className="text-base font-bold text-on-surface">Confirmed Voucher & Travel Kit</h3>
              <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
                Receive your official trip itinerary, hotel vouchers, assigned guide contact, and packing advisory directly on your phone.
              </p>
              <div className="mt-4 flex items-center gap-1.5 text-primary text-xs font-semibold">
                <span>Peace of mind travel</span>
                <span className="material-symbols-outlined text-[14px]">check_circle</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
