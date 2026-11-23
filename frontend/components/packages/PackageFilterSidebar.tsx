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
          Keyword Search
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder="Search by city, title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs font-semibold pl-9 pr-3 py-2.5 rounded-xl border border-surface-container-high focus:outline-none focus:border-primary transition"
          />
          <span className="material-symbols-outlined text-base text-outline absolute left-2.5 top-2.5">
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

      {/* 3. Max Budget Slider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-bold uppercase tracking-wider text-outline">
            Max Budget
          </label>
          <span className="text-xs font-extrabold text-primary">
            ৳{maxPrice.toLocaleString()}
          </span>
        </div>
        <input
          type="range"
          min="5000"
          max="20000"
          step="500"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-primary cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-outline">
          <span>৳5,000</span>
          <span>৳20,000+</span>
        </div>
      </div>

      {/* 4. Duration Filter */}
      <div className="space-y-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-outline">
          Trip Duration
        </label>
        <div className="grid grid-cols-3 gap-2">
          {[
            { val: '', label: 'Any' },
            { val: '2', label: '2 Days' },
            { val: '3', label: '3 Days' },
          ].map((dur) => (
            <button
              key={dur.val}
              type="button"
              onClick={() => setSelectedDuration(dur.val)}
              className={`py-2 rounded-xl text-xs font-bold transition border ${
                selectedDuration === dur.val
                  ? 'bg-primary text-white border-primary shadow-sm'
                  : 'bg-surface-container-low text-on-surface border-transparent hover:border-surface-container-high'
              }`}
            >
              {dur.label}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
