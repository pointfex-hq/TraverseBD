'use client';

import React, { useState, useEffect } from 'react';
import { Package, Destination, Category } from '@backend/types/database.types';
import ImageUploadField from '@frontend/components/admin/ImageUploadField';
import ConfirmDeleteModal from '@frontend/components/admin/ConfirmDeleteModal';

export default function AdminPackagesView() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [isLoading, setIsLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<Package | null>(null);

  // Form Fields - Basic
  const [titleEn, setTitleEn] = useState('');
  const [titleBn, setTitleBn] = useState('');
  const [destinationInput, setDestinationInput] = useState('');
  const [categoryInput, setCategoryInput] = useState('');
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [isCustomDestination, setIsCustomDestination] = useState(false);
  const [priceBdt, setPriceBdt] = useState<number>(8500);
  const [priceMode, setPriceMode] = useState<'fixed' | 'starting_from'>('fixed');
  const [durationDays, setDurationDays] = useState<number>(3);
  const [durationNights, setDurationNights] = useState<number>(2);
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [shortDescEn, setShortDescEn] = useState('');
  const [shortDescBn, setShortDescBn] = useState('');
  const [fullDescEn, setFullDescEn] = useState('');
  const [status, setStatus] = useState<'published' | 'draft'>('published');
  
  // Dynamic Ratings & Bestseller
  const [ratingAverage, setRatingAverage] = useState<number>(4.95);
  const [reviewsCount, setReviewsCount] = useState<number>(120);
  const [isFeatured, setIsFeatured] = useState<boolean>(false);

  // Dynamic Day-by-Day Itinerary
  const [itinerary, setItinerary] = useState<
    { id?: string; day_no: number; title_en: string; description_en: string }[]
  >([]);

  // Dynamic Inclusions & Exclusions
  const [inclusions, setInclusions] = useState<string[]>([]);
  const [newInclusionInput, setNewInclusionInput] = useState('');
  const [exclusions, setExclusions] = useState<string[]>([]);
  const [newExclusionInput, setNewExclusionInput] = useState('');

  // Delete Confirmation Modal State
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; title: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load initial data
  const loadData = async () => {
    setIsLoading(true);
    try {
      const [pkgRes, destRes, catRes] = await Promise.all([
        fetch('/api/admin/packages').then((r) => r.json()),
        fetch('/api/admin/destinations').then((r) => r.json()),
        fetch('/api/admin/categories').then((r) => r.json()),
      ]);

      if (pkgRes.success) setPackages(pkgRes.data.packages || []);
      if (destRes.success) setDestinations(destRes.data.destinations || []);
      if (catRes.success) setCategories(catRes.data.categories || []);
    } catch (e) {
      console.error('Failed to load admin data:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const openCreateModal = () => {
    setEditingPackage(null);
    setTitleEn('');
    setTitleBn('');
    setIsCustomCategory(false);
    setIsCustomDestination(false);
    setDestinationInput(destinations[0]?.name_en || 'Sajek Valley');
    setCategoryInput(categories[0]?.name_en || 'Hill Tract Expeditions');
    setPriceBdt(8500);
    setPriceMode('fixed');
    setDurationDays(3);
    setDurationNights(2);
    setCoverImageUrl('');
    setShortDescEn('');
    setShortDescBn('');
    setFullDescEn('');
    setStatus('published');
    setRatingAverage(4.95);
    setReviewsCount(120);
    setIsFeatured(false);
    setItinerary([
      { day_no: 1, title_en: 'Day 1: Departure & Scenic Arrival', description_en: 'Depart from Dhaka via comfortable AC vehicle. Check-in to accommodation and enjoy breathtaking sunset vista.' },
      { day_no: 2, title_en: 'Day 2: Full Day Exploration & Sightseeing', description_en: 'Guided hike, exploration of cultural spots, authentic local meals, and evening campfire gathering.' },
      { day_no: 3, title_en: 'Day 3: Sunrise View & Return Journey', description_en: 'Early morning sea of clouds sunrise view, delicious breakfast, and safe return transit back to Dhaka.' },
    ]);
    setInclusions([
      'All transfers in dedicated AC tourist transport',
      'Resort / Hotel accommodation with daily breakfast',
      'Certified on-ground local tour guide',
      'All landmark entry fees and municipal permits',
    ]);
    setExclusions([
      'Personal expenses, shopping, and laundry',
      'Driver and guide tips or gratuities',
      'Optional adventure activities not mentioned in itinerary',
    ]);
    setNewInclusionInput('');
    setNewExclusionInput('');
    setIsModalOpen(true);
  };

  const openEditModal = (pkg: Package) => {
    setEditingPackage(pkg);
    setTitleEn(pkg.title_en);
    setTitleBn(pkg.title_bn);
    setIsCustomCategory(false);
    setIsCustomDestination(false);
    const dest = destinations.find((d) => d.id === pkg.destination_id);
    const cat = categories.find((c) => c.id === pkg.category_id);
    setDestinationInput(dest?.name_en || pkg.destination?.name_en || pkg.destination_id);
    setCategoryInput(cat?.name_en || pkg.category?.name_en || pkg.category_id);
    setPriceBdt(pkg.price_bdt);
    setPriceMode(pkg.price_mode);
    setDurationDays(pkg.duration_days);
    setDurationNights(pkg.duration_nights);
    setCoverImageUrl(pkg.cover_image_url);
    setShortDescEn(pkg.short_description_en);
    setShortDescBn(pkg.short_description_bn);
    setFullDescEn(pkg.full_description_en || pkg.short_description_en || '');
    setStatus(pkg.status as any);
    setRatingAverage(pkg.rating_average !== undefined ? pkg.rating_average : 4.95);
    setReviewsCount(pkg.reviews_count !== undefined ? pkg.reviews_count : 120);
    setIsFeatured(!!pkg.is_featured);

    if (pkg.itinerary && pkg.itinerary.length > 0) {
      setItinerary(
        pkg.itinerary.map((it) => ({
          id: it.id,
          day_no: it.day_no,
          title_en: it.title_en,
          description_en: it.description_en,
        }))
      );
    } else {
      setItinerary([
        { day_no: 1, title_en: 'Day 1: Departure & Scenic Arrival', description_en: 'Comfortable transit and arrival at destination.' },
        { day_no: 2, title_en: 'Day 2: Full Day Exploration', description_en: 'Cultural and nature exploration with dedicated guide.' },
      ]);
    }

    const incs = (pkg.items || [])
      .filter((i) => i.type === 'included')
      .map((i) => i.text_en);
    setInclusions(incs.length > 0 ? incs : [
      'All transfers in dedicated tourist transport',
      'Resort / Hotel accommodation with daily breakfast',
    ]);

    const excs = (pkg.items || [])
      .filter((i) => i.type === 'excluded')
      .map((i) => i.text_en);
    setExclusions(excs.length > 0 ? excs : [
      'Personal expenses, snacks, and extra shopping',
      'Tips for drivers and guides',
    ]);

    setNewInclusionInput('');
    setNewExclusionInput('');
    setIsModalOpen(true);
  };

  // Itinerary helper handlers
  const handleAddItineraryDay = () => {
    const nextDay = itinerary.length + 1;
    setItinerary([
      ...itinerary,
      {
        day_no: nextDay,
        title_en: `Day ${nextDay}: Exploration & Highlights`,
        description_en: '',
      },
    ]);
  };

  const handleUpdateItineraryDay = (
    index: number,
    field: 'title_en' | 'description_en',
    value: string
  ) => {
    setItinerary((prev) =>
      prev.map((item, idx) => (idx === index ? { ...item, [field]: value } : item))
    );
  };

  const handleRemoveItineraryDay = (index: number) => {
    setItinerary((prev) =>
      prev
        .filter((_, idx) => idx !== index)
        .map((item, idx) => ({ ...item, day_no: idx + 1 }))
    );
  };

  // Inclusion & Exclusion handlers
  const handleAddInclusion = () => {
    if (!newInclusionInput.trim()) return;
    setInclusions((prev) => [...prev, newInclusionInput.trim()]);
    setNewInclusionInput('');
  };

  const handleRemoveInclusion = (index: number) => {
    setInclusions((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleAddExclusion = () => {
    if (!newExclusionInput.trim()) return;
    setExclusions((prev) => [...prev, newExclusionInput.trim()]);
    setNewExclusionInput('');
  };

  const handleRemoveExclusion = (index: number) => {
    setExclusions((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleSavePackage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!destinationInput.trim()) {
      alert('Please enter or select a Destination.');
      return;
    }
    if (!categoryInput.trim()) {
      alert('Please enter or select a Tour Category.');
      return;
    }
    setIsSubmitting(true);

    const payload = {
      title_en: titleEn,
      title_bn: titleBn || titleEn,
      destination_id: destinationInput.trim(),
      category_id: categoryInput.trim(),
      price_bdt: Number(priceBdt),
      price_mode: priceMode,
      duration_days: Number(durationDays),
      duration_nights: Number(durationNights),
      cover_image_url: coverImageUrl,
      short_description_en: shortDescEn,
      short_description_bn: shortDescBn || shortDescEn,
      full_description_en: fullDescEn || shortDescEn,
      full_description_bn: fullDescEn || shortDescEn,
      status,
      is_featured: isFeatured,
      rating_average: Number(ratingAverage),
      reviews_count: Number(reviewsCount),
      itinerary,
      inclusions,
      exclusions,
    };

    try {
      if (editingPackage) {
        // Update
        const res = await fetch(`/api/admin/packages/${editingPackage.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (data.success) {
          setPackages((prev) =>
            prev.map((p) => (p.id === editingPackage.id ? data.data.package : p))
          );
          setIsModalOpen(false);
        }
      } else {
        // Create
        const res = await fetch('/api/admin/packages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (data.success) {
          setPackages((prev) => [data.data.package, ...prev]);
          setIsModalOpen(false);
        }
      }
    } catch (e) {
      alert('Failed to save package.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Toggle Publish / Unpublish
  const handleToggleStatus = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/packages/${id}`, { method: 'PATCH' });
      const data = await res.json();
      if (data.success) {
        setPackages((prev) =>
          prev.map((p) => (p.id === id ? { ...p, status: data.data.package.status } : p))
        );
      }
    } catch {
      alert('Failed to toggle status.');
    }
  };

  // Delete Package Confirmation
  const confirmDeletePackage = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/packages/${deleteTarget.id}`, { method: 'DELETE' });
      if (res.ok) {
        setPackages((prev) => prev.filter((p) => p.id !== deleteTarget.id));
        setDeleteTarget(null);
      } else {
        alert('Failed to delete package.');
      }
    } catch {
      alert('Failed to delete package.');
    } finally {
      setIsDeleting(false);
    }
  };

  // Filtered packages
  const filtered = packages.filter((p) => {
    if (search.trim()) {
      const q = search.toLowerCase();
      const match =
        p.title_en.toLowerCase().includes(q) ||
        p.title_bn.toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (statusFilter !== 'all' && p.status !== statusFilter) {
      return false;
    }
    return true;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 max-w-7xl mx-auto">
      {/* 1. TOP HEADER & CREATE BUTTON */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
            Tour Packages Management
          </h2>
          <p className="text-xs text-slate-400">
            Create, update ratings, build day-by-day itineraries, define inclusions/exclusions, and manage bestseller status.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-primary/20 transition w-full sm:w-auto cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">add_circle</span>
          <span>Add New Package</span>
        </button>
      </div>

      {/* 2. SEARCH & FILTER TABS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 bg-slate-900 p-3 sm:p-4 rounded-2xl border border-slate-800">
        <div className="relative w-full sm:w-80">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-[18px]">
            search
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by package name or slug..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-800 text-white text-xs border border-slate-700 focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
          {[
            { key: 'all', label: 'All Packages' },
            { key: 'published', label: 'Published' },
            { key: 'draft', label: 'Drafts' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setStatusFilter(tab.key as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                statusFilter === tab.key
                  ? 'bg-slate-800 text-white border border-slate-700'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. PACKAGES TABLE */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300 min-w-[780px]">
            <thead className="text-[10px] uppercase font-bold text-slate-500 border-b border-slate-800 bg-slate-950/40">
              <tr>
                <th className="py-3 px-4">Package</th>
                <th className="py-3 px-4">Destination & Category</th>
                <th className="py-3 px-4">Price (BDT)</th>
                <th className="py-3 px-4">Rating & Reviews</th>
                <th className="py-3 px-4">Duration</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {filtered.map((pkg) => (
                <tr key={pkg.id} className="hover:bg-slate-800/40 transition">
                  {/* Photo, Titles & Bestseller badge */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={pkg.cover_image_url}
                        alt={pkg.title_en}
                        className="w-12 h-10 rounded-lg object-cover bg-slate-800 shrink-0 border border-slate-700"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-white block text-xs">{pkg.title_en}</span>
                          {pkg.is_featured && (
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                              Bestseller
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-slate-400 font-bengali">
                          {pkg.title_bn}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Destination / Category */}
                  <td className="py-3.5 px-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-white font-medium">
                        {(pkg as any).destination?.name_en || 'Bangladesh'}
                      </span>
                      <span className="text-[10px] text-primary-fixed uppercase font-bold tracking-wider">
                        {(pkg as any).category?.name_en || 'Tour'}
                      </span>
                    </div>
                  </td>

                  {/* Price */}
                  <td className="py-3.5 px-4 font-mono font-bold text-white">
                    BDT {pkg.price_bdt.toLocaleString()}
                    <span className="text-[10px] text-slate-500 block font-sans font-normal">
                      {pkg.price_mode === 'starting_from' ? 'Starting from' : 'Fixed rate'}
                    </span>
                  </td>

                  {/* Rating & Reviews */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1 text-amber-400 font-semibold">
                      <span className="material-symbols-outlined text-[15px]">star</span>
                      <span>{(pkg.rating_average || 4.95).toFixed(2)}</span>
                      <span className="text-slate-400 text-[11px] font-normal">
                        ({pkg.reviews_count || 120})
                      </span>
                    </div>
                  </td>

                  {/* Duration */}
                  <td className="py-3.5 px-4 text-slate-400 whitespace-nowrap">
                    {pkg.duration_days}D / {pkg.duration_nights}N
                  </td>

                  {/* Status Toggle Switch */}
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => handleToggleStatus(pkg.id)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold transition shadow-sm cursor-pointer ${
                        pkg.status === 'published'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30'
                          : 'bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          pkg.status === 'published' ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'
                        }`}
                      />
                      <span>{pkg.status === 'published' ? 'Published' : 'Draft'}</span>
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-right">
                    <div className="inline-flex items-center gap-1">
                      <button
                        onClick={() => openEditModal(pkg)}
                        title="Edit Package"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[17px]">edit</span>
                      </button>

                      <button
                        onClick={() => setDeleteTarget({ id: pkg.id, title: pkg.title_en })}
                        title="Delete Package"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[17px]">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. CREATE / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
          <div className="w-full max-w-3xl rounded-2xl sm:rounded-3xl bg-slate-900 border border-slate-800 p-4 sm:p-6 sm:p-8 space-y-5 sm:space-y-6 shadow-2xl my-2 sm:my-8 max-h-[94vh] sm:max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 sticky top-0 bg-slate-900 z-10">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  {editingPackage ? 'Edit Tour Package' : 'Create New Tour Package'}
                </h3>
                <p className="text-[10px] sm:text-[11px] text-slate-400">
                  Configure package details, ratings, day-by-day itinerary, and inclusions.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white transition cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleSavePackage} className="space-y-6">
              {/* SECTION: BASIC INFO */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-primary-fixed uppercase tracking-wider flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">info</span>
                  <span>1. Basic Information</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300">Title (English):</label>
                    <input
                      type="text"
                      required
                      value={titleEn}
                      onChange={(e) => setTitleEn(e.target.value)}
                      placeholder="e.g. Sajek Valley Cloud Kingdom"
                      className="w-full bg-slate-800 text-white text-xs px-3.5 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300">Title (বাংলা):</label>
                    <input
                      type="text"
                      value={titleBn}
                      onChange={(e) => setTitleBn(e.target.value)}
                      placeholder="e.g. সাজেক ভ্যালি ক্লাউড কিংডম"
                      className="w-full bg-slate-800 text-white text-xs px-3.5 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Destination Field with Select & Custom Toggle */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-300">
                        Destination <span className="text-red-400">*</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setIsCustomDestination(!isCustomDestination);
                          if (!isCustomDestination) setDestinationInput('');
                          else setDestinationInput(destinations[0]?.name_en || 'Sajek Valley');
                        }}
                        className="text-[11px] text-primary-fixed hover:underline font-semibold"
                      >
                        {isCustomDestination ? '← Select Existing' : '+ Add Custom'}
                      </button>
                    </div>
                    {isCustomDestination ? (
                      <input
                        type="text"
                        required
                        value={destinationInput}
                        onChange={(e) => setDestinationInput(e.target.value)}
                        placeholder="Type new destination name (e.g. Sajek Valley)..."
                        className="w-full bg-slate-800 text-white text-xs px-3.5 py-2.5 rounded-xl border border-primary focus:outline-none focus:ring-1 focus:ring-primary placeholder-slate-500"
                      />
                    ) : (
                      <select
                        required
                        value={destinationInput}
                        onChange={(e) => {
                          if (e.target.value === '__custom__') {
                            setIsCustomDestination(true);
                            setDestinationInput('');
                          } else {
                            setDestinationInput(e.target.value);
                          }
                        }}
                        className="w-full bg-slate-800 text-white text-xs px-3.5 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
                      >
                        {destinations.length === 0 && (
                          <option value="">No destinations available</option>
                        )}
                        {destinations.map((d) => (
                          <option key={d.id} value={d.name_en}>
                            {d.name_en} {d.region ? `(${d.region})` : ''}
                          </option>
                        ))}
                        {!destinations.some((d) => d.name_en === destinationInput || d.id === destinationInput) && destinationInput && (
                          <option value={destinationInput}>{destinationInput} (Selected)</option>
                        )}
                        <option value="__custom__">+ Enter custom destination...</option>
                      </select>
                    )}
                  </div>

                  {/* Category Field with Select & Custom Toggle */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-300">
                        Tour Category <span className="text-red-400">*</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setIsCustomCategory(!isCustomCategory);
                          if (!isCustomCategory) setCategoryInput('');
                          else setCategoryInput(categories[0]?.name_en || 'Hill Tract Expeditions');
                        }}
                        className="text-[11px] text-primary-fixed hover:underline font-semibold"
                      >
                        {isCustomCategory ? '← Select Existing' : '+ Add Custom'}
                      </button>
                    </div>
                    {isCustomCategory ? (
                      <input
                        type="text"
                        required
                        value={categoryInput}
                        onChange={(e) => setCategoryInput(e.target.value)}
                        placeholder="Type new category name (e.g. Hill Trekking)..."
                        className="w-full bg-slate-800 text-white text-xs px-3.5 py-2.5 rounded-xl border border-primary focus:outline-none focus:ring-1 focus:ring-primary placeholder-slate-500"
                      />
                    ) : (
                      <select
                        required
                        value={categoryInput}
                        onChange={(e) => {
                          if (e.target.value === '__custom__') {
                            setIsCustomCategory(true);
                            setCategoryInput('');
                          } else {
                            setCategoryInput(e.target.value);
                          }
                        }}
                        className="w-full bg-slate-800 text-white text-xs px-3.5 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
                      >
                        {categories.length === 0 && (
                          <option value="">No categories available</option>
                        )}
                        {categories.map((c) => (
                          <option key={c.id} value={c.name_en}>
                            {c.name_en}
                          </option>
                        ))}
                        {!categories.some((c) => c.name_en === categoryInput || c.id === categoryInput) && categoryInput && (
                          <option value={categoryInput}>{categoryInput} (Selected)</option>
                        )}
                        <option value="__custom__">+ Enter custom category...</option>
                      </select>
                    )}
                  </div>
                </div>
              </div>

              {/* SECTION: PRICING, DURATION & RATINGS */}
              <div className="space-y-4 pt-3 border-t border-slate-800">
                <h4 className="text-xs font-bold text-primary-fixed uppercase tracking-wider flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">sell</span>
                  <span>2. Pricing, Ratings &amp; Bestseller Badge</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300">Price (BDT):</label>
                    <input
                      type="number"
                      min="1"
                      step="1"
                      required
                      value={priceBdt}
                      onChange={(e) => setPriceBdt(Number(e.target.value))}
                      className="w-full bg-slate-800 text-white text-xs px-3.5 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300">Price Mode:</label>
                    <select
                      value={priceMode}
                      onChange={(e) => setPriceMode(e.target.value as any)}
                      className="w-full bg-slate-800 text-white text-xs px-3.5 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
                    >
                      <option value="fixed">Fixed Price</option>
                      <option value="starting_from">Starting From</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300">Publish Status:</label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value as any)}
                      className="w-full bg-slate-800 text-white text-xs px-3.5 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
                    >
                      <option value="published">Published</option>
                      <option value="draft">Draft (Hidden)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 items-center">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300">Duration (Days):</label>
                    <input
                      type="number"
                      min="1"
                      required
                      value={durationDays}
                      onChange={(e) => setDurationDays(Number(e.target.value))}
                      className="w-full bg-slate-800 text-white text-xs px-3.5 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300">Duration (Nights):</label>
                    <input
                      type="number"
                      min="0"
                      required
                      value={durationNights}
                      onChange={(e) => setDurationNights(Number(e.target.value))}
                      className="w-full bg-slate-800 text-white text-xs px-3.5 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>

                  {/* Rating Average Input */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300 flex items-center gap-1">
                      <span className="material-symbols-outlined text-amber-400 text-[14px]">star</span>
                      <span>Rating (1.0 - 5.0):</span>
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      step="0.05"
                      required
                      value={ratingAverage}
                      onChange={(e) => setRatingAverage(Number(e.target.value))}
                      className="w-full bg-slate-800 text-white text-xs px-3.5 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>

                  {/* Reviews Count Input */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300 flex items-center gap-1">
                      <span className="material-symbols-outlined text-slate-400 text-[14px]">reviews</span>
                      <span>Reviews Count:</span>
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="1"
                      required
                      value={reviewsCount}
                      onChange={(e) => setReviewsCount(Number(e.target.value))}
                      className="w-full bg-slate-800 text-white text-xs px-3.5 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>

                {/* Bestseller Toggle */}
                <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-amber-400 text-[16px]">local_fire_department</span>
                      <span>Mark as Bestseller / Featured Tour</span>
                    </span>
                    <p className="text-[10px] text-slate-400">
                      Displays the distinctive Bestseller pill badge on package cards and headers.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isFeatured}
                      onChange={(e) => setIsFeatured(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>

              {/* SECTION: MEDIA & DESCRIPTIONS */}
              <div className="space-y-4 pt-3 border-t border-slate-800">
                <h4 className="text-xs font-bold text-primary-fixed uppercase tracking-wider flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">description</span>
                  <span>3. Media &amp; Overview Descriptions</span>
                </h4>

                <ImageUploadField
                  label="Cover Hero Image"
                  value={coverImageUrl}
                  onChange={(url) => setCoverImageUrl(url)}
                  folder="packages"
                  required
                  helperText="Upload package hero banner (<10MB) or paste direct image URL."
                />

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Short Summary (Card Overview):</label>
                  <textarea
                    rows={2}
                    required
                    value={shortDescEn}
                    onChange={(e) => setShortDescEn(e.target.value)}
                    placeholder="Brief 1-2 sentence overview of the tour..."
                    className="w-full bg-slate-800 text-white text-xs p-3 rounded-xl border border-slate-700 focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Full Description &amp; Highlights:</label>
                  <textarea
                    rows={3}
                    value={fullDescEn}
                    onChange={(e) => setFullDescEn(e.target.value)}
                    placeholder="Comprehensive detailed overview for the package details page..."
                    className="w-full bg-slate-800 text-white text-xs p-3 rounded-xl border border-slate-700 focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              {/* SECTION: DAY-BY-DAY ITINERARY BUILDER */}
              <div className="space-y-4 pt-3 border-t border-slate-800">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-primary-fixed uppercase tracking-wider flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px]">calendar_view_day</span>
                    <span>4. Day-by-Day Itinerary ({itinerary.length} Days)</span>
                  </h4>

                  <button
                    type="button"
                    onClick={handleAddItineraryDay}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-primary-fixed text-xs font-bold flex items-center gap-1 transition cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[15px]">add</span>
                    <span>Add Day</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {itinerary.map((day, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-slate-800/70 border border-slate-750 space-y-2.5"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2 flex-1">
                          <span className="w-6 h-6 rounded-md bg-primary/20 text-primary text-[11px] font-bold flex items-center justify-center shrink-0">
                            {day.day_no}
                          </span>
                          <input
                            type="text"
                            required
                            value={day.title_en}
                            onChange={(e) =>
                              handleUpdateItineraryDay(idx, 'title_en', e.target.value)
                            }
                            placeholder={`Day ${day.day_no} Title (e.g. Arrival & Sunset Trek)`}
                            className="w-full bg-slate-900 text-white text-xs px-3 py-1.5 rounded-lg border border-slate-700 focus:outline-none focus:ring-1 focus:ring-primary"
                          />
                        </div>

                        {itinerary.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveItineraryDay(idx)}
                            title="Remove Day"
                            className="p-1 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[18px]">delete</span>
                          </button>
                        )}
                      </div>

                      <textarea
                        rows={2}
                        value={day.description_en}
                        onChange={(e) =>
                          handleUpdateItineraryDay(idx, 'description_en', e.target.value)
                        }
                        placeholder={`Day ${day.day_no} itinerary details and schedule...`}
                        className="w-full bg-slate-900 text-white text-xs p-2.5 rounded-lg border border-slate-700 focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION: INCLUSIONS & EXCLUSIONS BUILDER */}
              <div className="space-y-4 pt-3 border-t border-slate-800">
                <h4 className="text-xs font-bold text-primary-fixed uppercase tracking-wider flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">checklist</span>
                  <span>5. Inclusions &amp; Exclusions</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* INCLUSIONS */}
                  <div className="space-y-2.5 bg-slate-800/40 p-3.5 rounded-2xl border border-slate-800">
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[15px]">check_circle</span>
                      <span>What is Included ({inclusions.length})</span>
                    </span>

                    <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                      {inclusions.map((inc, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between gap-2 p-2 rounded-lg bg-slate-800 text-xs text-slate-200 border border-slate-700/60"
                        >
                          <span className="flex-1 text-[11px] leading-tight">{inc}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveInclusion(idx)}
                            className="text-slate-400 hover:text-rose-400 cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[15px]">close</span>
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="text"
                        value={newInclusionInput}
                        onChange={(e) => setNewInclusionInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddInclusion();
                          }
                        }}
                        placeholder="Add inclusion item..."
                        className="flex-1 bg-slate-800 text-white text-xs px-3 py-1.5 rounded-lg border border-slate-700 focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                      <button
                        type="button"
                        onClick={handleAddInclusion}
                        className="px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition cursor-pointer"
                      >
                        Add
                      </button>
                    </div>
                  </div>

                  {/* EXCLUSIONS */}
                  <div className="space-y-2.5 bg-slate-800/40 p-3.5 rounded-2xl border border-slate-800">
                    <span className="text-xs font-bold text-rose-400 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[15px]">cancel</span>
                      <span>What is Excluded ({exclusions.length})</span>
                    </span>

                    <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                      {exclusions.map((exc, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between gap-2 p-2 rounded-lg bg-slate-800 text-xs text-slate-200 border border-slate-700/60"
                        >
                          <span className="flex-1 text-[11px] leading-tight">{exc}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveExclusion(idx)}
                            className="text-slate-400 hover:text-rose-400 cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[15px]">close</span>
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="text"
                        value={newExclusionInput}
                        onChange={(e) => setNewExclusionInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddExclusion();
                          }
                        }}
                        placeholder="Add exclusion item..."
                        className="flex-1 bg-slate-800 text-white text-xs px-3 py-1.5 rounded-lg border border-slate-700 focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                      <button
                        type="button"
                        onClick={handleAddExclusion}
                        className="px-2.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition cursor-pointer"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* MODAL FOOTER */}
              <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-800 sticky bottom-0 bg-slate-900 z-10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white text-xs font-bold transition disabled:opacity-50 shadow-md shadow-primary/20 cursor-pointer"
                >
                  {isSubmitting ? 'Saving...' : editingPackage ? 'Update Package' : 'Create Package'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. Sleek In-App Confirm Delete Modal */}
      <ConfirmDeleteModal
        isOpen={!!deleteTarget}
        title="Delete Tour Package"
        message={`Are you sure you want to permanently delete "${deleteTarget?.title}"? All associated departures, itineraries, and inclusions will be removed.`}
        confirmLabel="Delete Package"
        isDeleting={isDeleting}
        onConfirm={confirmDeletePackage}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
