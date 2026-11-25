'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const router = useRouter();
  const [destination, setDestination] = useState('');
  const [category, setCategory] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (destination) params.set('q', destination);
    if (category) params.set('category', category);
    if (maxPrice) params.set('max_price', maxPrice);

    router.push(`/packages?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="glass-panel rounded-2xl p-3 sm:p-4 shadow-glass max-w-4xl mx-auto border border-white/80"
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3 items-center">
        {/* Destination / Search Query Input */}
        <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-white border border-surface-container-high focus-within:border-primary transition">
          <span className="material-symbols-outlined text-primary text-xl">location_on</span>
          <div className="flex-1">
            <label className="block text-[10px] uppercase font-bold text-outline">Where to?</label>
            <input
              type="text"
              placeholder="e.g. Cox's Bazar, Sajek..."
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full text-xs font-semibold text-on-surface bg-transparent focus:outline-none placeholder:text-outline-variant"
            />
          </div>
        </div>

        {/* Category Selector */}
        <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-white border border-surface-container-high focus-within:border-primary transition">
          <span className="material-symbols-outlined text-primary text-xl">category</span>
          <div className="flex-1">
            <label className="block text-[10px] uppercase font-bold text-outline">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full text-xs font-semibold text-on-surface bg-transparent focus:outline-none cursor-pointer"
            >
              <option value="">All Categories</option>
              <option value="beach-coastal">Beach & Coastal</option>
              <option value="hill-mountain">Hill & Mountain</option>
              <option value="forest-wildlife">Forest & Wildlife</option>
              <option value="heritage-culture">Heritage & Culture</option>
            </select>
          </div>
        </div>

        {/* Budget Filter */}
        <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-white border border-surface-container-high focus-within:border-primary transition">
          <span className="material-symbols-outlined text-primary text-xl">payments</span>
          <div className="flex-1">
            <label className="block text-[10px] uppercase font-bold text-outline">Up to BDT 80,000</label>
            <select
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full text-xs font-semibold text-on-surface bg-transparent focus:outline-none cursor-pointer"
            >
              <option value="">Any Budget</option>
              <option value="6000">Up to BDT 6,000</option>
              <option value="12000">Up to BDT 12,000</option>
              <option value="25000">Up to BDT 25,000</option>
              <option value="50000">Up to BDT 50,000</option>
              <option value="80000">Up to BDT 80,000</option>
            </select>
          </div>
        </div>

        {/* Search Submit Button */}
        <div className="sm:col-span-3 lg:col-span-1">
          <button
            type="submit"
            className="w-full h-12 rounded-xl bg-primary hover:bg-primary-container text-white font-bold text-xs shadow-md shadow-primary/25 transition-all flex items-center justify-center gap-2 hover:scale-102"
          >
            <span className="material-symbols-outlined text-lg">search</span>
            <span>Search Tours</span>
          </button>
        </div>
      </div>
    </form>
  );
}
