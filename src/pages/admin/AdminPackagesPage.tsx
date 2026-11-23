import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Package, PackageItem, ItineraryDay } from '../../types';
import { 
  Plus, Search, Edit3, Trash2, Eye, Check, X, 
  Sparkles, Flame, AlertCircle, Clock, MapPin, 
  ChevronRight, ExternalLink, SlidersHorizontal 
} from 'lucide-react';

export const AdminPackagesPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { 
    packages, destinations, categories, 
    addPackage, updatePackage, deletePackage, 
    togglePackagePublish, togglePackageFeatured, togglePackageTrending 
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  
  // Modal state
  const [modalOpen, setModalOpen] = useState(searchParams.get('action') === 'new');
  const [editingPackageId, setEditingPackageId] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  // Form Fields
  const [formState, setFormState] = useState({
    title: '',
    slug: '',
    destination_id: destinations[0]?.id || '',
    category_id: categories[0]?.id || '',
    short_description: '',
    full_description: '',
    price: 8500,
    duration_days: 3,
    duration_nights: 2,
    cover_image_url: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1000&q=80',
    status: 'published' as 'published' | 'draft',
    is_featured: false,
    is_trending: false,
  });

  // Dynamic Itinerary & Dynamic Items (FR-24)
  const [itineraryDays, setItineraryDays] = useState<ItineraryDay[]>([
    { day_no: 1, title: 'Day 1: Arrival & Local Exploration', description: 'Arrive at destination, check-in to resort, and evening local exploration.' }
  ]);

  const [packageItems, setPackageItems] = useState<PackageItem[]>([
    { id: 'item-demo-1', type: 'included', text: 'All transportation in private AC tourist vehicle' },
    { id: 'item-demo-2', type: 'included', text: 'Resort accommodation and all daily meals' },
    { id: 'item-demo-3', type: 'excluded', text: 'Personal expenses and shopping' }
  ]);

  const [newItemText, setNewItemText] = useState('');
  const [newItemType, setNewItemType] = useState<PackageItem['type']>('included');

  const filteredPackages = packages.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.destination_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleOpenCreate = () => {
    setEditingPackageId(null);
    setFormState({
      title: '',
      slug: '',
      destination_id: destinations[0]?.id || '',
      category_id: categories[0]?.id || '',
      short_description: '',
      full_description: '',
      price: 8500,
      duration_days: 3,
      duration_nights: 2,
      cover_image_url: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1000&q=80',
      status: 'published',
      is_featured: false,
      is_trending: false,
    });
    setItineraryDays([
      { day_no: 1, title: 'Day 1: Arrival & Local Exploration', description: 'Arrive at destination, check-in to resort, and evening exploration.' }
    ]);
    setPackageItems([
      { id: 'item-1', type: 'included', text: 'All transportation in private vehicle' },
      { id: 'item-2', type: 'included', text: 'Resort cottage stay and all meals' }
    ]);
    setFormError(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (pkg: Package) => {
    setEditingPackageId(pkg.id);
    setFormState({
      title: pkg.title,
      slug: pkg.slug,
      destination_id: pkg.destination_id,
      category_id: pkg.category_id,
      short_description: pkg.short_description,
      full_description: pkg.full_description,
      price: pkg.price,
      duration_days: pkg.duration_days,
      duration_nights: pkg.duration_nights,
      cover_image_url: pkg.cover_image_url,
      status: pkg.status,
      is_featured: pkg.is_featured,
      is_trending: pkg.is_trending,
    });
    setItineraryDays(pkg.itinerary || []);
    setPackageItems(pkg.items || []);
    setFormError(null);
    setModalOpen(true);
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to permanently delete package "${title}"?`)) {
      deletePackage(id);
    }
  };

  // Add Dynamic Custom Item (FR-24 test case: "Sunrise boat ride")
  const handleAddCustomItem = () => {
    if (!newItemText.trim()) return;
    const item: PackageItem = {
      id: 'item-' + Date.now(),
      type: newItemType,
      text: newItemText.trim()
    };
    setPackageItems(prev => [...prev, item]);
    setNewItemText('');
  };

  const handleRemoveCustomItem = (itemId: string) => {
    setPackageItems(prev => prev.filter(i => i.id !== itemId));
  };

  // Itinerary helper
  const handleAddItineraryDay = () => {
    const nextDay = itineraryDays.length + 1;
    setItineraryDays(prev => [
      ...prev,
      { day_no: nextDay, title: `Day ${nextDay}: Mountain Excursion`, description: 'Sightseeing, cultural interactions, and evening dinner.' }
    ]);
  };

  const handleRemoveItineraryDay = (dayNo: number) => {
    setItineraryDays(prev => prev.filter(d => d.day_no !== dayNo).map((d, idx) => ({ ...d, day_no: idx + 1 })));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Validation as per SRS FR-23: "Price 0 or -5 is rejected; shall reject a price of 0 or less"
    if (formState.price <= 0) {
      setFormError('Validation Error: Package price must be greater than 0 BDT (whole integer).');
      return;
    }

    if (!formState.title.trim()) {
      setFormError('Validation Error: Package title is required.');
      return;
    }

    const generatedSlug = formState.slug.trim() || formState.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const dest = destinations.find(d => d.id === formState.destination_id);
    const cat = categories.find(c => c.id === formState.category_id);

    const payload = {
      title: formState.title.trim(),
      slug: generatedSlug,
      destination_id: formState.destination_id,
      destination_name: dest?.name || 'Bangladesh',
      category_id: formState.category_id,
      category_name: cat?.name || 'Tour',
      short_description: formState.short_description.trim(),
      full_description: formState.full_description.trim(),
      price: Math.floor(formState.price),
      duration_days: Number(formState.duration_days),
      duration_nights: Number(formState.duration_nights),
      cover_image_url: formState.cover_image_url.trim(),
      itinerary: itineraryDays,
      items: packageItems,
      status: formState.status,
      is_featured: formState.is_featured,
      is_trending: formState.is_trending,
    };

    if (editingPackageId) {
      updatePackage(editingPackageId, payload);
    } else {
      addPackage(payload);
    }

    setModalOpen(false);
  };

  return (
    <div className="p-6 sm:p-10 space-y-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
            Inventory Management
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Tour Packages Management
          </h1>
          <p className="text-xs text-slate-400">
            Publish, edit itineraries, and configure dynamic inclusion items.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 bg-[#005f49] hover:bg-[#0a4b3b] text-white px-5 py-3 rounded-2xl text-xs font-bold shadow-lg shadow-[#005f49]/30 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Package</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-950 p-4 rounded-3xl border border-slate-800 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by package title or destination..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs outline-hidden focus:border-[#005f49]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {(['all', 'published', 'draft'] as const).map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
                statusFilter === s
                  ? 'bg-[#005f49] text-white shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Packages Table (FR-23) */}
      <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/60 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-4 px-6">Tour Package</th>
                <th className="py-4 px-4">Destination</th>
                <th className="py-4 px-4">Price (BDT)</th>
                <th className="py-4 px-4">Duration</th>
                <th className="py-4 px-4">Flags</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredPackages.map((pkg) => (
                <tr key={pkg.id} className="hover:bg-slate-900/40 transition-colors">
                  
                  {/* Package info */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img
                        src={pkg.cover_image_url}
                        alt={pkg.title}
                        className="w-12 h-12 rounded-xl object-cover shrink-0 bg-slate-800"
                      />
                      <div className="overflow-hidden max-w-xs">
                        <h4 className="font-bold text-white text-xs truncate">{pkg.title}</h4>
                        <span className="text-[10px] text-slate-400 block truncate">{pkg.category_name}</span>
                      </div>
                    </div>
                  </td>

                  {/* Destination */}
                  <td className="py-4 px-4 text-slate-300 font-medium">
                    {pkg.destination_name}
                  </td>

                  {/* Price */}
                  <td className="py-4 px-4 font-mono font-bold text-emerald-400">
                    ৳{pkg.price.toLocaleString()}
                  </td>

                  {/* Duration */}
                  <td className="py-4 px-4 text-slate-400">
                    {pkg.duration_days}D / {pkg.duration_nights}N
                  </td>

                  {/* Featured / Trending toggles */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => togglePackageTrending(pkg.id)}
                        title="Toggle Trending"
                        className={`p-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-colors ${
                          pkg.is_trending
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                            : 'bg-slate-900 text-slate-500 hover:text-slate-300'
                        }`}
                      >
                        <Flame className="w-3 h-3" />
                      </button>

                      <button
                        onClick={() => togglePackageFeatured(pkg.id)}
                        title="Toggle Featured"
                        className={`p-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-colors ${
                          pkg.is_featured
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                            : 'bg-slate-900 text-slate-500 hover:text-slate-300'
                        }`}
                      >
                        <Sparkles className="w-3 h-3" />
                      </button>
                    </div>
                  </td>

                  {/* Publish Status Toggle (FR-30) */}
                  <td className="py-4 px-4">
                    <button
                      onClick={() => togglePackagePublish(pkg.id)}
                      className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        pkg.status === 'published'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
                      }`}
                    >
                      {pkg.status}
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to={`/packages/${pkg.slug}`}
                        target="_blank"
                        className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                        title="View Public Page"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>

                      <button
                        onClick={() => handleOpenEdit(pkg)}
                        className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-emerald-400 transition-colors"
                        title="Edit Package"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleDelete(pkg.id, pkg.title)}
                        className="p-2 rounded-lg bg-slate-900 hover:bg-rose-500/20 text-rose-400 transition-colors"
                        title="Delete Package"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE / EDIT MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-950 border border-slate-800 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl animate-in zoom-in-95 duration-200">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-xl font-black text-white">
                  {editingPackageId ? 'Edit Tour Package' : 'Create New Tour Package'}
                </h3>
                <p className="text-xs text-slate-400">
                  Update pricing, dynamic inclusions, and day-by-day itineraries.
                </p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-2 text-slate-400 hover:text-white rounded-full bg-slate-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* General Info */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">1. Basic Details</h4>
                
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Package Title *</label>
                  <input
                    type="text"
                    required
                    value={formState.title}
                    onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                    className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs outline-hidden focus:border-[#005f49]"
                    placeholder="e.g. Sajek Valley Cloud Kingdom & Ruilui Para Expedition"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Destination *</label>
                    <select
                      value={formState.destination_id}
                      onChange={(e) => setFormState({ ...formState, destination_id: e.target.value })}
                      className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs outline-hidden focus:border-[#005f49] cursor-pointer"
                    >
                      {destinations.map(d => (
                        <option key={d.id} value={d.id}>{d.name} ({d.region.split(',')[0]})</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Category *</label>
                    <select
                      value={formState.category_id}
                      onChange={(e) => setFormState({ ...formState, category_id: e.target.value })}
                      className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs outline-hidden focus:border-[#005f49] cursor-pointer"
                    >
                      {categories.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Price in BDT (৳) * (Price &gt; 0)</label>
                    <input
                      type="number"
                      required
                      min={1}
                      value={formState.price}
                      onChange={(e) => setFormState({ ...formState, price: Number(e.target.value) })}
                      className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-emerald-400 font-mono font-bold text-xs outline-hidden focus:border-[#005f49]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Duration (Days)</label>
                    <input
                      type="number"
                      min={1}
                      value={formState.duration_days}
                      onChange={(e) => setFormState({ ...formState, duration_days: Number(e.target.value) })}
                      className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs outline-hidden focus:border-[#005f49]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Duration (Nights)</label>
                    <input
                      type="number"
                      min={0}
                      value={formState.duration_nights}
                      onChange={(e) => setFormState({ ...formState, duration_nights: Number(e.target.value) })}
                      className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs outline-hidden focus:border-[#005f49]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Cover Image URL *</label>
                  <input
                    type="url"
                    required
                    value={formState.cover_image_url}
                    onChange={(e) => setFormState({ ...formState, cover_image_url: e.target.value })}
                    className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs outline-hidden focus:border-[#005f49]"
                    placeholder="https://images.unsplash.com/..."
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Short Summary</label>
                  <textarea
                    rows={2}
                    value={formState.short_description}
                    onChange={(e) => setFormState({ ...formState, short_description: e.target.value })}
                    className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs outline-hidden focus:border-[#005f49]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Full Description</label>
                  <textarea
                    rows={3}
                    value={formState.full_description}
                    onChange={(e) => setFormState({ ...formState, full_description: e.target.value })}
                    className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs outline-hidden focus:border-[#005f49]"
                  />
                </div>
              </div>

              {/* Dynamic Package Items (FR-24) */}
              <div className="space-y-4 pt-4 border-t border-slate-800">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    2. Dynamic Inclusions & Custom Items (FR-24)
                  </h4>
                  <span className="text-[10px] text-slate-400">
                    Add custom items (e.g. "Sunrise boat ride")
                  </span>
                </div>

                {/* Add new custom item row */}
                <div className="flex flex-col sm:flex-row gap-2 bg-slate-900 p-3 rounded-2xl border border-slate-800">
                  <select
                    value={newItemType}
                    onChange={(e) => setNewItemType(e.target.value as any)}
                    className="p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs outline-hidden shrink-0"
                  >
                    <option value="included">Included</option>
                    <option value="excluded">Excluded</option>
                    <option value="activity">Activity</option>
                    <option value="food">Food</option>
                    <option value="accommodation">Accommodation</option>
                    <option value="transport">Transportation</option>
                    <option value="note">Travel Note</option>
                  </select>

                  <input
                    type="text"
                    placeholder="Enter custom item text (e.g. Sunrise boat ride)..."
                    value={newItemText}
                    onChange={(e) => setNewItemText(e.target.value)}
                    className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs outline-hidden"
                  />

                  <button
                    type="button"
                    onClick={handleAddCustomItem}
                    className="px-4 py-2 bg-[#005f49] hover:bg-[#0a4b3b] text-white font-bold text-xs rounded-xl shrink-0 transition-colors"
                  >
                    Add Item
                  </button>
                </div>

                {/* List of current dynamic items */}
                <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                  {packageItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-2 rounded-xl bg-slate-900 text-xs border border-slate-800/80">
                      <div className="flex items-center gap-2 overflow-hidden">
                        <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-sm">
                          {item.type}
                        </span>
                        <span className="text-slate-200 truncate">{item.text}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveCustomItem(item.id)}
                        className="text-rose-400 hover:text-rose-300 p-1"
                        title="Remove Item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Day-by-Day Itinerary Editor */}
              <div className="space-y-4 pt-4 border-t border-slate-800">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    3. Day-by-Day Itinerary Breakdown
                  </h4>
                  <button
                    type="button"
                    onClick={handleAddItineraryDay}
                    className="text-xs font-bold text-emerald-400 hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Day</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {itineraryDays.map((day, idx) => (
                    <div key={idx} className="p-3 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-300">Day {day.day_no} Title</span>
                        {itineraryDays.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveItineraryDay(day.day_no)}
                            className="text-rose-400 hover:text-rose-300 text-xs"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      <input
                        type="text"
                        value={day.title}
                        onChange={(e) => {
                          const updated = [...itineraryDays];
                          updated[idx].title = e.target.value;
                          setItineraryDays(updated);
                        }}
                        className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs outline-hidden"
                      />
                      <textarea
                        rows={2}
                        value={day.description}
                        onChange={(e) => {
                          const updated = [...itineraryDays];
                          updated[idx].description = e.target.value;
                          setItineraryDays(updated);
                        }}
                        placeholder="Day breakdown description..."
                        className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs outline-hidden"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Publication Status & Flags */}
              <div className="space-y-3 pt-4 border-t border-slate-800">
                <div className="flex flex-wrap items-center gap-6 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formState.status === 'published'}
                      onChange={(e) => setFormState({ ...formState, status: e.target.checked ? 'published' : 'draft' })}
                      className="w-4 h-4 rounded-sm accent-[#005f49]"
                    />
                    <span className="text-slate-200 font-bold">Publish to public website immediately</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formState.is_featured}
                      onChange={(e) => setFormState({ ...formState, is_featured: e.target.checked })}
                      className="w-4 h-4 rounded-sm accent-amber-500"
                    />
                    <span className="text-amber-300 font-bold">Featured on Homepage</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formState.is_trending}
                      onChange={(e) => setFormState({ ...formState, is_trending: e.target.checked })}
                      className="w-4 h-4 rounded-sm accent-rose-500"
                    />
                    <span className="text-rose-300 font-bold">Trending Badge</span>
                  </label>
                </div>
              </div>

              {/* Form Buttons */}
              <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 text-slate-400 hover:text-white text-xs font-bold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#005f49] hover:bg-[#0a4b3b] text-white text-xs font-bold shadow-md transition-all cursor-pointer"
                >
                  {editingPackageId ? 'Save Changes' : 'Publish Tour Package'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
