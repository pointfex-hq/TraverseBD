'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Package, Destination, Category } from '@backend/types/database.types';
import ImageUploadField from '@frontend/components/admin/ImageUploadField';
import ConfirmDeleteModal from '@frontend/components/admin/ConfirmDeleteModal';

const DRAFT_STORAGE_KEY = 'traversebd_package_draft';

export default function AdminPackagesView() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [isLoading, setIsLoading] = useState(true);

  // View Mode: 'list' (packages table/cards) or 'editor' (dedicated full-page form)
  const [viewMode, setViewMode] = useState<'list' | 'editor'>('list');
  const [editingPackage, setEditingPackage] = useState<Package | null>(null);

  // Draft Autosave state
  const [hasDraft, setHasDraft] = useState(false);
  const [draftSavedAt, setDraftSavedAt] = useState<string | null>(null);
  const [autoSaveStatus, setAutoSaveStatus] = useState<'saved' | 'saving' | 'idle'>('idle');
  const isInitialMount = useRef(true);

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

    // Check for existing local draft
    try {
      const savedDraft = localStorage.getItem(DRAFT_STORAGE_KEY);
      if (savedDraft) {
        const parsed = JSON.parse(savedDraft);
        if (parsed && (parsed.titleEn || parsed.shortDescEn || parsed.coverImageUrl)) {
          setHasDraft(true);
          if (parsed.savedAt) {
            setDraftSavedAt(new Date(parsed.savedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
          }
        }
      }
    } catch (e) {
      console.error('Failed to parse draft from localStorage:', e);
    }
  }, []);

  // Autosave effect (active only when in editor mode for a new package)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (viewMode !== 'editor' || editingPackage !== null) {
      return;
    }

    setAutoSaveStatus('saving');
    const timer = setTimeout(() => {
      try {
        const draftPayload = {
          titleEn,
          titleBn,
          destinationInput,
          categoryInput,
          isCustomDestination,
          isCustomCategory,
          priceBdt,
          priceMode,
          durationDays,
          durationNights,
          coverImageUrl,
          shortDescEn,
          shortDescBn,
          fullDescEn,
          status,
          ratingAverage,
          reviewsCount,
          isFeatured,
          itinerary,
          inclusions,
          exclusions,
          savedAt: Date.now(),
        };
        localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draftPayload));
        setAutoSaveStatus('saved');
        setHasDraft(true);
        setDraftSavedAt(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      } catch (err) {
        console.error('Draft auto-save error:', err);
        setAutoSaveStatus('idle');
      }
    }, 600);

    return () => clearTimeout(timer);
  }, [
    viewMode,
    editingPackage,
    titleEn,
    titleBn,
    destinationInput,
    categoryInput,
    isCustomDestination,
    isCustomCategory,
    priceBdt,
    priceMode,
    durationDays,
    durationNights,
    coverImageUrl,
    shortDescEn,
    shortDescBn,
    fullDescEn,
    status,
    ratingAverage,
    reviewsCount,
    isFeatured,
    itinerary,
    inclusions,
    exclusions,
  ]);

  // Restore draft
  const handleRestoreDraft = () => {
    try {
      const saved = localStorage.getItem(DRAFT_STORAGE_KEY);
      if (!saved) return;
      const d = JSON.parse(saved);
      if (d.titleEn !== undefined) setTitleEn(d.titleEn);
      if (d.titleBn !== undefined) setTitleBn(d.titleBn);
      if (d.destinationInput !== undefined) setDestinationInput(d.destinationInput);
      if (d.categoryInput !== undefined) setCategoryInput(d.categoryInput);
      if (d.isCustomDestination !== undefined) setIsCustomDestination(d.isCustomDestination);
      if (d.isCustomCategory !== undefined) setIsCustomCategory(d.isCustomCategory);
      if (d.priceBdt !== undefined) setPriceBdt(d.priceBdt);
      if (d.priceMode !== undefined) setPriceMode(d.priceMode);
      if (d.durationDays !== undefined) setDurationDays(d.durationDays);
      if (d.durationNights !== undefined) setDurationNights(d.durationNights);
      if (d.coverImageUrl !== undefined) setCoverImageUrl(d.coverImageUrl);
      if (d.shortDescEn !== undefined) setShortDescEn(d.shortDescEn);
      if (d.shortDescBn !== undefined) setShortDescBn(d.shortDescBn);
      if (d.fullDescEn !== undefined) setFullDescEn(d.fullDescEn);
      if (d.status !== undefined) setStatus(d.status);
      if (d.ratingAverage !== undefined) setRatingAverage(d.ratingAverage);
      if (d.reviewsCount !== undefined) setReviewsCount(d.reviewsCount);
      if (d.isFeatured !== undefined) setIsFeatured(d.isFeatured);
      if (d.itinerary) setItinerary(d.itinerary);
      if (d.inclusions) setInclusions(d.inclusions);
      if (d.exclusions) setExclusions(d.exclusions);
      setEditingPackage(null);
      setViewMode('editor');
    } catch (e) {
      console.error('Failed to restore draft:', e);
    }
  };

  // Discard draft
  const handleDiscardDraft = () => {
    localStorage.removeItem(DRAFT_STORAGE_KEY);
    setHasDraft(false);
    setDraftSavedAt(null);
  };

  const openCreatePage = () => {
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
      {
        day_no: 1,
        title_en: 'Day 1: Departure & Scenic Arrival',
        description_en: 'Depart from Dhaka via comfortable AC vehicle. Check-in to accommodation and enjoy breathtaking sunset vista.',
      },
      {
        day_no: 2,
        title_en: 'Day 2: Full Day Exploration & Sightseeing',
        description_en: 'Guided hike, exploration of cultural spots, authentic local meals, and evening campfire gathering.',
      },
      {
        day_no: 3,
        title_en: 'Day 3: Sunrise View & Return Journey',
        description_en: 'Early morning sea of clouds sunrise view, delicious breakfast, and safe return transit back to Dhaka.',
      },
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
    setViewMode('editor');
  };

  const openEditPage = (pkg: Package) => {
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
    setViewMode('editor');
  };

  const handleBackToList = () => {
    setViewMode('list');
    setEditingPackage(null);
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
          handleBackToList();
        } else {
          alert(data.error?.message || 'Failed to update package.');
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
          localStorage.removeItem(DRAFT_STORAGE_KEY);
          setHasDraft(false);
          handleBackToList();
        } else {
          alert(data.error?.message || 'Failed to create package.');
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

  // ==========================================
  // RENDER: EDITOR VIEW (Full Page Experience)
  // ==========================================
  if (viewMode === 'editor') {
    return (
      <div className="min-h-full pb-28">
        {/* TOP STICKY HEADER & BREADCRUMBS */}
        <div className="sticky top-0 z-20 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 px-4 sm:px-6 lg:px-8 py-3.5 shadow-lg">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <button
                type="button"
                onClick={handleBackToList}
                className="p-2 -ml-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition flex items-center justify-center shrink-0 cursor-pointer active:scale-95 border border-slate-700/60"
                title="Back to Packages List"
              >
                <span className="material-symbols-outlined text-[20px]">arrow_back</span>
              </button>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Tour Packages
                  </span>
                  <span className="text-slate-600 text-xs">/</span>
                  <span className="text-[11px] font-bold text-primary-fixed uppercase tracking-wider">
                    {editingPackage ? 'Edit Package' : 'New Package'}
                  </span>
                </div>
                <h2 className="text-base sm:text-lg font-extrabold text-white tracking-tight truncate">
                  {editingPackage ? editingPackage.title_en : titleEn || 'Create New Tour Package'}
                </h2>
              </div>
            </div>

            {/* Actions & Auto-Save Badge */}
            <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-center">
              {!editingPackage && (
                <div className="hidden xs:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700/60 text-[10px] text-slate-400">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      autoSaveStatus === 'saving'
                        ? 'bg-amber-400 animate-pulse'
                        : autoSaveStatus === 'saved'
                        ? 'bg-emerald-400'
                        : 'bg-slate-500'
                    }`}
                  />
                  <span>
                    {autoSaveStatus === 'saving'
                      ? 'Autosaving draft...'
                      : autoSaveStatus === 'saved'
                      ? `Draft saved ${draftSavedAt || ''}`
                      : 'Autosave active'}
                  </span>
                </div>
              )}

              <button
                type="button"
                onClick={handleBackToList}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs font-bold transition cursor-pointer border border-slate-700/60"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSavePackage}
                disabled={isSubmitting}
                className="px-5 py-2 rounded-xl bg-primary hover:bg-primary/90 text-white text-xs font-bold transition disabled:opacity-50 shadow-md shadow-primary/20 flex items-center gap-1.5 cursor-pointer active:scale-95"
              >
                <span className="material-symbols-outlined text-[17px]">
                  {isSubmitting ? 'sync' : 'check_circle'}
                </span>
                <span>{isSubmitting ? 'Saving...' : editingPackage ? 'Update Package' : 'Publish Package'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* EDITOR MAIN CONTAINER */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
          <form onSubmit={handleSavePackage} className="space-y-6">
            {/* CARD 1: BASIC INFORMATION */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-primary/20 text-primary-fixed flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">info</span>
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-white">1. Basic Information & Titles</h3>
                    <p className="text-[11px] text-slate-400">English and Bengali naming for the public catalog</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                  Required
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 flex items-center gap-1">
                    <span>Title (English)</span>
                    <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={titleEn}
                    onChange={(e) => setTitleEn(e.target.value)}
                    placeholder="e.g. Sajek Valley Cloud Kingdom Expedition"
                    className="w-full bg-slate-800 text-white text-xs px-3.5 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:ring-1 focus:ring-primary placeholder-slate-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 flex items-center gap-1">
                    <span>Title (বাংলা)</span>
                    <span className="text-slate-500 text-[10px] font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={titleBn}
                    onChange={(e) => setTitleBn(e.target.value)}
                    placeholder="e.g. সাজেক ভ্যালি ক্লাউড কিংডম সফর"
                    className="w-full bg-slate-800 text-white text-xs px-3.5 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:ring-1 focus:ring-primary placeholder-slate-500 font-bengali"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                {/* Destination Dropdown or Custom Input */}
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
                      placeholder="Type custom destination (e.g. Sajek Valley)..."
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
                      {destinations.length === 0 && <option value="">No destinations available</option>}
                      {destinations.map((d) => (
                        <option key={d.id} value={d.name_en}>
                          {d.name_en} {d.region ? `(${d.region})` : ''}
                        </option>
                      ))}
                      {!destinations.some((d) => d.name_en === destinationInput || d.id === destinationInput) &&
                        destinationInput && (
                          <option value={destinationInput}>{destinationInput} (Selected)</option>
                        )}
                      <option value="__custom__">+ Enter custom destination...</option>
                    </select>
                  )}
                </div>

                {/* Tour Category Dropdown or Custom Input */}
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
                      placeholder="Type custom category (e.g. Trekking Adventures)..."
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
                      {categories.length === 0 && <option value="">No categories available</option>}
                      {categories.map((c) => (
                        <option key={c.id} value={c.name_en}>
                          {c.name_en}
                        </option>
                      ))}
                      {!categories.some((c) => c.name_en === categoryInput || c.id === categoryInput) &&
                        categoryInput && (
                          <option value={categoryInput}>{categoryInput} (Selected)</option>
                        )}
                      <option value="__custom__">+ Enter custom category...</option>
                    </select>
                  )}
                </div>
              </div>
            </div>

            {/* CARD 2: PRICING, RATINGS & BESTSELLER */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">payments</span>
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-white">2. Pricing, Durations &amp; Ratings</h3>
                    <p className="text-[11px] text-slate-400">Pricing model, tour duration, real customer scores, and featured badge</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Base Price (BDT):</label>
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

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Price Structure:</label>
                  <select
                    value={priceMode}
                    onChange={(e) => setPriceMode(e.target.value as any)}
                    className="w-full bg-slate-800 text-white text-xs px-3.5 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
                  >
                    <option value="fixed">Fixed Price</option>
                    <option value="starting_from">Starting From (Per Person)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Visibility Status:</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full bg-slate-800 text-white text-xs px-3.5 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
                  >
                    <option value="published">Published (Visible on site)</option>
                    <option value="draft">Draft (Hidden in portal)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-1">
                <div className="space-y-1.5">
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

                <div className="space-y-1.5">
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

                <div className="space-y-1.5">
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

                <div className="space-y-1.5">
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
              <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3.5 flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-amber-400 text-[16px]">local_fire_department</span>
                    <span>Mark as Bestseller / Featured Tour</span>
                  </span>
                  <p className="text-[10px] text-slate-400">
                    Displays the prominent orange Bestseller badge in search grids and hero features.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
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

            {/* CARD 3: MEDIA & DESCRIPTIONS */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">photo_library</span>
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-white">3. Media &amp; Overview Descriptions</h3>
                    <p className="text-[11px] text-slate-400">High-resolution banner cover and detailed trip highlights</p>
                  </div>
                </div>
              </div>

              <ImageUploadField
                label="Cover Hero Image"
                value={coverImageUrl}
                onChange={(url) => setCoverImageUrl(url)}
                folder="packages"
                required
                helperText="Upload package hero banner or paste direct image URL (Unsplash, Cloudinary, etc.)"
              />

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Short Summary (Card Overview):</label>
                <textarea
                  rows={2}
                  required
                  value={shortDescEn}
                  onChange={(e) => setShortDescEn(e.target.value)}
                  placeholder="Brief 1-2 sentence overview shown on package cards..."
                  className="w-full bg-slate-800 text-white text-xs p-3.5 rounded-xl border border-slate-700 focus:outline-none focus:ring-1 focus:ring-primary placeholder-slate-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Full Description &amp; Highlights:</label>
                <textarea
                  rows={4}
                  value={fullDescEn}
                  onChange={(e) => setFullDescEn(e.target.value)}
                  placeholder="Comprehensive detailed overview for the package details page..."
                  className="w-full bg-slate-800 text-white text-xs p-3.5 rounded-xl border border-slate-700 focus:outline-none focus:ring-1 focus:ring-primary placeholder-slate-500"
                />
              </div>
            </div>

            {/* CARD 4: DAY-BY-DAY ITINERARY BUILDER */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">calendar_view_day</span>
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      4. Day-by-Day Itinerary ({itinerary.length} Days)
                    </h3>
                    <p className="text-[11px] text-slate-400">Chronological schedule and activities</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleAddItineraryDay}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-primary-fixed text-xs font-bold flex items-center gap-1 transition cursor-pointer border border-slate-700"
                >
                  <span className="material-symbols-outlined text-[15px]">add</span>
                  <span>Add Day</span>
                </button>
              </div>

              <div className="space-y-3.5">
                {itinerary.map((day, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-800/70 border border-slate-700/80 space-y-3 transition hover:border-slate-600"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5 flex-1 min-w-0">
                        <span className="w-7 h-7 rounded-lg bg-primary/20 text-primary-fixed text-xs font-extrabold flex items-center justify-center shrink-0 border border-primary/30">
                          {day.day_no}
                        </span>
                        <input
                          type="text"
                          required
                          value={day.title_en}
                          onChange={(e) => handleUpdateItineraryDay(idx, 'title_en', e.target.value)}
                          placeholder={`Day ${day.day_no} Title (e.g. Arrival & Sunset Trek)`}
                          className="w-full bg-slate-900 text-white text-xs px-3 py-2 rounded-lg border border-slate-700 focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>

                      {itinerary.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveItineraryDay(idx)}
                          title="Remove Day"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition cursor-pointer shrink-0"
                        >
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      )}
                    </div>

                    <textarea
                      rows={2}
                      value={day.description_en}
                      onChange={(e) => handleUpdateItineraryDay(idx, 'description_en', e.target.value)}
                      placeholder={`Day ${day.day_no} itinerary details, highlights, and schedule...`}
                      className="w-full bg-slate-900 text-white text-xs p-3 rounded-lg border border-slate-700 focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* CARD 5: INCLUSIONS & EXCLUSIONS BUILDER */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">checklist</span>
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-white">5. Inclusions &amp; Exclusions</h3>
                    <p className="text-[11px] text-slate-400">Clear itemized breakdown of what is provided vs excluded</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* INCLUSIONS */}
                <div className="space-y-3 bg-slate-800/40 p-4 rounded-xl border border-slate-750">
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px]">check_circle</span>
                    <span>What is Included ({inclusions.length})</span>
                  </span>

                  <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                    {inclusions.map((inc, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-slate-800 text-xs text-slate-200 border border-slate-700/60"
                      >
                        <span className="flex-1 text-[11px] leading-tight">{inc}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveInclusion(idx)}
                          className="text-slate-400 hover:text-rose-400 cursor-pointer p-0.5"
                        >
                          <span className="material-symbols-outlined text-[16px]">close</span>
                        </button>
                      </div>
                    ))}
                    {inclusions.length === 0 && (
                      <p className="text-[11px] text-slate-500 italic py-2">No inclusion items added yet.</p>
                    )}
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
                      className="flex-1 bg-slate-800 text-white text-xs px-3 py-2 rounded-lg border border-slate-700 focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                    <button
                      type="button"
                      onClick={handleAddInclusion}
                      className="px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition cursor-pointer"
                    >
                      Add
                    </button>
                  </div>
                </div>

                {/* EXCLUSIONS */}
                <div className="space-y-3 bg-slate-800/40 p-4 rounded-xl border border-slate-750">
                  <span className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px]">cancel</span>
                    <span>What is Excluded ({exclusions.length})</span>
                  </span>

                  <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                    {exclusions.map((exc, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-slate-800 text-xs text-slate-200 border border-slate-700/60"
                      >
                        <span className="flex-1 text-[11px] leading-tight">{exc}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveExclusion(idx)}
                          className="text-slate-400 hover:text-rose-400 cursor-pointer p-0.5"
                        >
                          <span className="material-symbols-outlined text-[16px]">close</span>
                        </button>
                      </div>
                    ))}
                    {exclusions.length === 0 && (
                      <p className="text-[11px] text-slate-500 italic py-2">No exclusion items added yet.</p>
                    )}
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
                      className="flex-1 bg-slate-800 text-white text-xs px-3 py-2 rounded-lg border border-slate-700 focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                    <button
                      type="button"
                      onClick={handleAddExclusion}
                      className="px-3 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition cursor-pointer"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* BOTTOM FIXED BAR FOR MOBILE USERS */}
        <div className="fixed bottom-0 inset-x-0 z-30 lg:hidden bg-slate-900/95 backdrop-blur-md border-t border-slate-800 p-3 shadow-2xl flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={handleBackToList}
            className="flex-1 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold transition flex items-center justify-center gap-1.5 border border-slate-700"
          >
            <span className="material-symbols-outlined text-[17px]">arrow_back</span>
            <span>Back</span>
          </button>

          <button
            type="button"
            onClick={handleSavePackage}
            disabled={isSubmitting}
            className="flex-1 py-2.5 rounded-xl bg-primary text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-md shadow-primary/20 disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-[17px]">
              {isSubmitting ? 'sync' : 'check'}
            </span>
            <span>{isSubmitting ? 'Saving...' : editingPackage ? 'Update' : 'Save'}</span>
          </button>
        </div>
      </div>
    );
  }

  // ==========================================
  // RENDER: PACKAGES LIST VIEW
  // ==========================================
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 max-w-7xl mx-auto">
      {/* LOCAL DRAFT RESTORE BANNER */}
      {hasDraft && !editingPackage && (
        <div className="p-3 sm:p-4 rounded-2xl bg-primary/10 border border-primary/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fadeIn">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary-fixed text-[24px]">drafts</span>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-white">Unsaved Package Draft Found</h4>
              <p className="text-[11px] text-slate-300">
                You have a saved draft {draftSavedAt ? `from ${draftSavedAt}` : 'in progress'}. Would you like to restore it?
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 self-end sm:self-center">
            <button
              onClick={handleDiscardDraft}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white text-xs font-bold transition cursor-pointer"
            >
              Discard
            </button>
            <button
              onClick={handleRestoreDraft}
              className="px-4 py-1.5 rounded-xl bg-primary hover:bg-primary/90 text-white text-xs font-bold transition shadow-sm cursor-pointer"
            >
              Restore Draft
            </button>
          </div>
        </div>
      )}

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
          onClick={openCreatePage}
          className="px-4 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-primary/20 transition w-full sm:w-auto cursor-pointer active:scale-95"
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

      {/* 3. PACKAGES TABLE (Desktop) & CARDS (Mobile) */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-sm">
        {/* Mobile Cards (Visible below md) */}
        <div className="md:hidden divide-y divide-slate-800/80">
          {filtered.map((pkg) => (
            <div key={pkg.id} className="p-4 space-y-3">
              <div className="flex items-start gap-3">
                <img
                  src={pkg.cover_image_url}
                  alt={pkg.title_en}
                  className="w-16 h-14 rounded-xl object-cover bg-slate-800 shrink-0 border border-slate-700"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-bold text-white text-xs truncate">{pkg.title_en}</span>
                    {pkg.is_featured && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        Bestseller
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-slate-400 font-bengali block truncate">
                    {pkg.title_bn}
                  </span>
                  <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400">
                    <span className="text-emerald-400 font-extrabold">BDT {pkg.price_bdt.toLocaleString()}</span>
                    <span>•</span>
                    <span>{pkg.duration_days}D / {pkg.duration_nights}N</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={() => handleToggleStatus(pkg.id)}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border transition cursor-pointer ${
                    pkg.status === 'published'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      pkg.status === 'published' ? 'bg-emerald-400' : 'bg-slate-500'
                    }`}
                  />
                  <span>{pkg.status === 'published' ? 'Published' : 'Draft'}</span>
                </button>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEditPage(pkg)}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-1 transition"
                  >
                    <span className="material-symbols-outlined text-[15px]">edit</span>
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => setDeleteTarget({ id: pkg.id, title: pkg.title_en })}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition"
                  >
                    <span className="material-symbols-outlined text-[17px]">delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filtered.length === 0 && !isLoading && (
            <div className="p-8 text-center text-slate-400 text-xs">No tour packages found.</div>
          )}
        </div>

        {/* Desktop Table (Visible md and above) */}
        <div className="hidden md:block overflow-x-auto">
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

                  {/* Destination & Category */}
                  <td className="py-3.5 px-4">
                    <div className="space-y-0.5">
                      <div className="text-slate-200 font-semibold">
                        {pkg.destination?.name_en || pkg.destination_id}
                      </div>
                      <div className="text-[10.5px] text-primary-fixed">
                        {pkg.category?.name_en || pkg.category_id}
                      </div>
                    </div>
                  </td>

                  {/* Price */}
                  <td className="py-3.5 px-4 font-semibold text-emerald-400">
                    <div>BDT {pkg.price_bdt.toLocaleString()}</div>
                    <span className="text-[9.5px] text-slate-400 uppercase font-bold">
                      {pkg.price_mode === 'starting_from' ? 'Starting From' : 'Fixed'}
                    </span>
                  </td>

                  {/* Rating & Reviews */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1 text-amber-400 font-bold">
                      <span className="material-symbols-outlined text-[15px]">star</span>
                      <span>{(pkg.rating_average !== undefined ? pkg.rating_average : 4.95).toFixed(2)}</span>
                    </div>
                    <div className="text-[10px] text-slate-400">
                      ({pkg.reviews_count !== undefined ? pkg.reviews_count : 120} reviews)
                    </div>
                  </td>

                  {/* Duration */}
                  <td className="py-3.5 px-4 text-slate-300">
                    {pkg.duration_days} Days / {pkg.duration_nights} Nights
                  </td>

                  {/* Status Toggle */}
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => handleToggleStatus(pkg.id)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border transition cursor-pointer ${
                        pkg.status === 'published'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
                          : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700'
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
                        onClick={() => openEditPage(pkg)}
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

      {/* 4. Sleek In-App Confirm Delete Modal */}
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
