import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { PackageCard } from '../../components/PackageCard';
import { 
  Search, Filter, SlidersHorizontal, ArrowUpDown, 
  MapPin, Clock, RotateCcw, Compass, Sparkles 
} from 'lucide-react';

export const PackagesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { publishedPackages, publishedDestinations, categories } = useApp();

  // Search & Filter state
  const [searchKeyword, setSearchKeyword] = useState(searchParams.get('search') || '');
  const [selectedDest, setSelectedDest] = useState(searchParams.get('destination') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [durationFilter, setDurationFilter] = useState('all'); // all, short (1-2), medium (3-4), long (5+)
  const [maxPrice, setMaxPrice] = useState<number>(20000);
  const [sortBy, setSortBy] = useState<'newest' | 'price_low' | 'price_high' | 'popular'>('popular');

  // Filter logic conforming to FR-05 and FR-06
  const filteredPackages = useMemo(() => {
    return publishedPackages
      .filter((pkg) => {
        // Keyword Search (title, destination, category, short description)
        if (searchKeyword.trim()) {
          const q = searchKeyword.toLowerCase();
          const match = 
            pkg.title.toLowerCase().includes(q) ||
            pkg.destination_name.toLowerCase().includes(q) ||
            pkg.category_name.toLowerCase().includes(q) ||
            pkg.short_description.toLowerCase().includes(q);
          if (!match) return false;
        }

        // Destination Filter
        if (selectedDest && pkg.destination_id !== selectedDest) {
          return false;
        }

        // Category Filter
        if (selectedCategory && pkg.category_id !== selectedCategory) {
          return false;
        }

        // Price Filter
        if (pkg.price > maxPrice) {
          return false;
        }

        // Duration Filter
        if (durationFilter === 'short' && pkg.duration_days > 2) return false;
        if (durationFilter === 'medium' && (pkg.duration_days < 3 || pkg.duration_days > 4)) return false;
        if (durationFilter === 'long' && pkg.duration_days < 5) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price_low') return a.price - b.price;
        if (sortBy === 'price_high') return b.price - a.price;
        if (sortBy === 'newest') return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        // popular: featured / trending first
        const scoreA = (a.is_trending ? 2 : 0) + (a.is_featured ? 1 : 0);
        const scoreB = (b.is_trending ? 2 : 0) + (b.is_featured ? 1 : 0);
        return scoreB - scoreA;
      });
  }, [publishedPackages, searchKeyword, selectedDest, selectedCategory, durationFilter, maxPrice, sortBy]);

  const handleResetFilters = () => {
    setSearchKeyword('');
    setSelectedDest('');
    setSelectedCategory('');
    setDurationFilter('all');
    setMaxPrice(20000);
    setSortBy('popular');
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-bold text-[#005f49] uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full">
          Expeditions & Tours
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Curated Tour Packages Across Bangladesh
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Zero complicated booking forms. Choose your route, review full day-by-day breakdowns, and chat with our travel desk directly on WhatsApp.
        </p>
      </div>

      {/* Filter and Search Bar Container */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
        
        {/* Top Search Input & Sort Dropdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative md:col-span-2">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by package name, destination (e.g. Sajek, Sundarbans) or activity..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200/80 rounded-2xl text-sm outline-hidden focus:border-[#005f49] focus:bg-white transition-all font-medium"
            />
          </div>

          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/80 px-4 py-2 rounded-2xl">
            <ArrowUpDown className="w-4 h-4 text-slate-500 shrink-0" />
            <div className="w-full text-left">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full bg-transparent text-xs font-bold text-slate-800 outline-hidden cursor-pointer"
              >
                <option value="popular">Recommended / Trending</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="newest">Newest Departures</option>
              </select>
            </div>
          </div>
        </div>

        {/* Secondary Filter Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
          
          {/* Destination */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#005f49]" />
              <span>Destination</span>
            </label>
            <select
              value={selectedDest}
              onChange={(e) => setSelectedDest(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 outline-hidden focus:border-[#005f49]"
            >
              <option value="">All Destinations</option>
              {publishedDestinations.map(d => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </div>

          {/* Travel Category */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
              <Compass className="w-3.5 h-3.5 text-[#005f49]" />
              <span>Travel Style</span>
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 outline-hidden focus:border-[#005f49]"
            >
              <option value="">All Categories</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* Duration */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#005f49]" />
              <span>Duration</span>
            </label>
            <select
              value={durationFilter}
              onChange={(e) => setDurationFilter(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 outline-hidden focus:border-[#005f49]"
            >
              <option value="all">Any Duration</option>
              <option value="short">1 - 2 Days (Weekend Trip)</option>
              <option value="medium">3 - 4 Days (Standard Tour)</option>
              <option value="long">5+ Days (Grand Expedition)</option>
            </select>
          </div>

          {/* Max Price Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-wider text-slate-500">
              <span>Max Budget</span>
              <span className="text-[#005f49] font-mono">৳{maxPrice.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="5000"
              max="25000"
              step="1000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#005f49] cursor-pointer"
            />
          </div>
        </div>

        {/* Active Filters Summary & Reset */}
        <div className="flex items-center justify-between pt-2 text-xs text-slate-500">
          <div>
            Showing <span className="font-bold text-slate-900">{filteredPackages.length}</span> of {publishedPackages.length} packages
          </div>

          {(searchKeyword || selectedDest || selectedCategory || durationFilter !== 'all' || maxPrice < 20000) && (
            <button
              onClick={handleResetFilters}
              className="flex items-center gap-1 text-rose-600 hover:text-rose-700 font-bold transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Package Cards Grid */}
      {filteredPackages.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      ) : (
        /* Empty State with Links to Popular Destinations as per SRS FR-05 & AC-03 */
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-2xl mx-auto space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-[#005f49] flex items-center justify-center mx-auto">
            <Search className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold text-slate-900">
              No packages found matching your criteria
            </h3>
            <p className="text-sm text-slate-500">
              We couldn't find any packages matching "{searchKeyword || 'selected filters'}". Try broadening your filters or explore our popular destinations below.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Explore Popular Destinations Instead:
            </span>
            <div className="flex flex-wrap justify-center gap-2">
              {publishedDestinations.slice(0, 4).map(dest => (
                <button
                  key={dest.id}
                  onClick={() => {
                    handleResetFilters();
                    setSelectedDest(dest.id);
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-emerald-50 hover:text-[#005f49] text-xs font-bold transition-colors"
                >
                  {dest.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-2 text-xs font-extrabold text-[#005f49] hover:underline"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset all filters to view all tours</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
