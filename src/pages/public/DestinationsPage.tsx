import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DestinationCard } from '../../components/DestinationCard';
import { Search, MapPin, Sparkles } from 'lucide-react';

export const DestinationsPage: React.FC = () => {
  const { publishedDestinations } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');

  const regions = [
    { id: 'all', label: 'All Regions' },
    { id: 'Chittagong', label: 'Chittagong & Hill Tracts' },
    { id: 'Sylhet', label: 'Sylhet & Moulvibazar' },
    { id: 'Khulna', label: 'Khulna & Sundarbans' },
    { id: 'Barisal', label: 'Barisal & Coastal' }
  ];

  const filtered = publishedDestinations.filter(d => {
    const matchesSearch = d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          d.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          d.short_description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = selectedRegion === 'all' || d.region.toLowerCase().includes(selectedRegion.toLowerCase());
    return matchesSearch && matchesRegion;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-bold text-[#005f49] uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full">
          Destinations of Bangladesh
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Explore the Wonders of Bengal
        </h1>
        <p className="text-slate-600 text-base leading-relaxed">
          From the cloud-carpeted ridges of Sajek Valley to the ancient tidal creeks of the Sundarbans and the azure waters of Saint Martin’s Island.
        </p>
      </div>

      {/* Search & Region Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search destination by name or region (e.g. Sajek, Cox's Bazar)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200/80 rounded-2xl text-sm outline-hidden focus:border-[#005f49] focus:bg-white transition-all"
          />
        </div>

        {/* Region pills */}
        <div className="flex flex-wrap gap-2">
          {regions.map(r => (
            <button
              key={r.id}
              onClick={() => setSelectedRegion(r.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedRegion === r.id
                  ? 'bg-[#005f49] text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map(dest => (
            <DestinationCard key={dest.id} destination={dest} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8 space-y-4">
          <MapPin className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-lg font-bold text-slate-800">No destinations found</h3>
          <p className="text-xs text-slate-500">Try searching for "Sajek", "Sundarbans", or "Cox's Bazar".</p>
          <button
            onClick={() => { setSearchTerm(''); setSelectedRegion('all'); }}
            className="text-xs font-bold text-[#005f49] hover:underline"
          >
            Clear all search filters
          </button>
        </div>
      )}
    </div>
  );
};
