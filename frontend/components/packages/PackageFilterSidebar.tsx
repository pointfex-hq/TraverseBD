'use client';

import React from 'react';

interface PackageFilterSidebarProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string;
  setSelectedCategory: (c: string) => void;
  maxPrice: number;
  setMaxPrice: (p: number) => void;
  selectedDuration: string;
  setSelectedDuration: (d: string) => void;
  onReset: () => void;
}

const CATEGORIES = [
  { slug: '', label: 'All Categories' },
  { slug: 'beach-coastal', label: 'Beach & Coastal' },
  { slug: 'hill-mountain', label: 'Hill & Mountain' },
  { slug: 'forest-wildlife', label: 'Forest & Wildlife' },
  { slug: 'heritage-culture', label: 'Heritage & Culture' },
];

export default function PackageFilterSidebar({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  maxPrice,
  setMaxPrice,
  selectedDuration,
  setSelectedDuration,
  onReset,
}: PackageFilterSidebarProps) {
  return (
    <aside className="bg-white rounded-2xl border border-surface-container-high p-5 space-y-6 shadow-sm sticky top-28">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-surface-container">
        <h3 className="text-sm font-extrabold text-on-surface flex items-center gap-1.5">
          <span className="material-symbols-outlined text-base text-primary">filter_list</span>
          <span>Filter Packages</span>
        </h3>
        <button
          onClick={onReset}
          className="text-xs font-bold text-primary hover:underline"
        >
          Reset All
        </button>
      </div>

      {/* 1. Keyword Search */}
      <div className="space-y-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-outline">
          Search Keywords
        </label>
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Sajek, Saint Martin, Sundarbans..."
            className="w-full bg-surface-container-low text-xs text-on-surface px-3 py-2.5 rounded-xl border border-surface-container-high focus:outline-none focus:ring-1 focus:ring-primary pl-8"
          />
          <span className="material-symbols-outlined absolute left-2.5 top-2.5 text-outline text-[16px]">
            search
          </span>
        </div>
      </div>

      {/* 2. Category Filter */}
      <div className="space-y-2.5">
        <label className="block text-xs font-bold uppercase tracking-wider text-outline">
          Travel Category
        </label>
        <div className="space-y-1.5">
          {CATEGORIES.map((cat) => (
            <label
              key={cat.slug}
              className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer transition ${
                selectedCategory === cat.slug
                  ? 'bg-primary text-white font-bold'
                  : 'text-on-surface hover:bg-surface-container-low'
              }`}
            >
              <span>{cat.label}</span>
              <input
                type="radio"
                name="category"
                checked={selectedCategory === cat.slug}
                onChange={() => setSelectedCategory(cat.slug)}
                className="hidden"
              />
            </label>
          ))}
        </div>
      </div>

      {/* 3. Duration Filter */}
      <div className="space-y-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-outline">
          Duration
        </label>
        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          {[
            { key: '', label: 'Any' },
            { key: '2-3', label: '2-3 Days' },
            { key: '4-5', label: '4-5 Days' },
          ].map((dur) => (
            <button
              key={dur.key}
              onClick={() => setSelectedDuration(dur.key)}
              className={`py-2 px-1 rounded-xl border font-semibold transition ${
                selectedDuration === dur.key
                  ? 'bg-primary text-white border-primary'
                  : 'bg-surface-container-low text-on-surface border-surface-container hover:border-primary'
              }`}
            >
              {dur.label}
            </button>
          ))}
        </div>
      </div>

      {/* Direct WhatsApp Assistance */}
      <div className="pt-2 border-t border-surface-container text-center space-y-2">
        <p className="text-[11px] text-on-surface-variant">Looking for a customized group itinerary?</p>
        <a
          href="https://wa.me/8801627444330?text=Hello%20Traverse%20BD!%20I%20would%20like%20to%20customize%20a%20private%20tour%20package."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl bg-[#25D366] text-white text-xs font-bold hover:bg-[#20ba59] transition shadow-sm"
        >
          <span className="material-symbols-outlined text-[16px]">chat</span>
          <span>Chat on WhatsApp</span>
        </a>
      </div>
    </aside>
  );
}
