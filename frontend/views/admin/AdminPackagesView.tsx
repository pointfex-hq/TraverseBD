'use client';

import React, { useState, useEffect } from 'react';
import { Package, Destination, Category } from '@backend/types/database.types';

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

  // Form Fields
  const [titleEn, setTitleEn] = useState('');
  const [titleBn, setTitleBn] = useState('');
  const [destinationId, setDestinationId] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [priceBdt, setPriceBdt] = useState<number>(8500);
  const [priceMode, setPriceMode] = useState<'fixed' | 'starting_from'>('fixed');
  const [durationDays, setDurationDays] = useState<number>(3);
  const [durationNights, setDurationNights] = useState<number>(2);
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [shortDescEn, setShortDescEn] = useState('');
  const [shortDescBn, setShortDescBn] = useState('');
  const [status, setStatus] = useState<'published' | 'draft'>('published');
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
    setDestinationId(destinations[0]?.id || '');
    setCategoryId(categories[0]?.id || '');
    setPriceBdt(8500);
    setPriceMode('fixed');
    setDurationDays(3);
    setDurationNights(2);
    setCoverImageUrl('');
    setShortDescEn('');
    setShortDescBn('');
    setStatus('published');
    setIsModalOpen(true);
  };

  const openEditModal = (pkg: Package) => {
    setEditingPackage(pkg);
    setTitleEn(pkg.title_en);
    setTitleBn(pkg.title_bn);
    setDestinationId(pkg.destination_id);
    setCategoryId(pkg.category_id);
    setPriceBdt(pkg.price_bdt);
    setPriceMode(pkg.price_mode);
    setDurationDays(pkg.duration_days);
    setDurationNights(pkg.duration_nights);
    setCoverImageUrl(pkg.cover_image_url);
    setShortDescEn(pkg.short_description_en);
    setShortDescBn(pkg.short_description_bn);
    setStatus(pkg.status as any);
    setIsModalOpen(true);
  };

  const handleSavePackage = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      title_en: titleEn,
      title_bn: titleBn || titleEn,
      destination_id: destinationId,
      category_id: categoryId,
      price_bdt: Number(priceBdt),
      price_mode: priceMode,
      duration_days: Number(durationDays),
      duration_nights: Number(durationNights),
      cover_image_url: coverImageUrl,
      short_description_en: shortDescEn,
      short_description_bn: shortDescBn || shortDescEn,
      status,
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

  // Delete Package
  const handleDeletePackage = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to permanently delete "${title}"?`)) {
      return;
    }
    try {
      const res = await fetch(`/api/admin/packages/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setPackages((prev) => prev.filter((p) => p.id !== id));
      }
    } catch {
      alert('Failed to delete package.');
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
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      {/* 1. TOP HEADER & CREATE BUTTON */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-white tracking-tight">
            Tour Packages Management
          </h2>
          <p className="text-xs text-slate-400">
            Create, update pricing, manage departure batches and publish/unpublish itineraries.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-primary/20 transition self-start sm:self-auto"
        >
          <span className="material-symbols-outlined text-[18px]">add_circle</span>
          <span>Add New Package</span>
        </button>
      </div>

      {/* 2. SEARCH & FILTER TABS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-800">
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

        <div className="flex items-center gap-1.5 self-start sm:self-auto">
          {[
            { key: 'all', label: 'All Packages' },
            { key: 'published', label: 'Published' },
            { key: 'draft', label: 'Drafts' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setStatusFilter(tab.key as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
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

      {/* 3. PACKAGES TABLE (Matching Stitch) */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="text-[10px] uppercase font-bold text-slate-500 border-b border-slate-800 bg-slate-950/40">
              <tr>
                <th className="py-3 px-4">Package</th>
                <th className="py-3 px-4">Destination & Category</th>
                <th className="py-3 px-4">Price (BDT)</th>
                <th className="py-3 px-4">Duration</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {filtered.map((pkg) => (
                <tr key={pkg.id} className="hover:bg-slate-800/40 transition">
                  {/* Photo & Titles */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={pkg.cover_image_url}
                        alt={pkg.title_en}
                        className="w-12 h-10 rounded-lg object-cover bg-slate-800 shrink-0 border border-slate-700"
                      />
                      <div>
                        <span className="font-bold text-white block text-xs">{pkg.title_en}</span>
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

                  {/* Duration */}
                  <td className="py-3.5 px-4 text-slate-400 whitespace-nowrap">
                    {pkg.duration_days}D / {pkg.duration_nights}N
                  </td>

                  {/* Status Toggle Switch */}
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => handleToggleStatus(pkg.id)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold transition shadow-sm ${
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
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                      >
                        <span className="material-symbols-outlined text-[17px]">edit</span>
                      </button>

                      <button
                        onClick={() => handleDeletePackage(pkg.id, pkg.title_en)}
                        title="Delete Package"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition"
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
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">
                {editingPackage ? 'Edit Tour Package' : 'Create New Tour Package'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white transition"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleSavePackage} className="space-y-4">
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
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Destination:</label>
                  <select
                    value={destinationId}
                    onChange={(e) => setDestinationId(e.target.value)}
                    className="w-full bg-slate-800 text-white text-xs px-3.5 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
                  >
                    {destinations.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name_en} ({d.region})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Category:</label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full bg-slate-800 text-white text-xs px-3.5 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name_en}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

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
                  <label className="text-xs font-bold text-slate-300">Status:</label>
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">Cover Image URL:</label>
                <input
                  type="url"
                  value={coverImageUrl}
                  onChange={(e) => setCoverImageUrl(e.target.value)}
                  placeholder="https://lh3.googleusercontent.com/..."
                  className="w-full bg-slate-800 text-white text-xs px-3.5 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">Short Summary (English):</label>
                <textarea
                  rows={2}
                  required
                  value={shortDescEn}
                  onChange={(e) => setShortDescEn(e.target.value)}
                  placeholder="Brief 1-2 sentence overview of the tour..."
                  className="w-full bg-slate-800 text-white text-xs p-3 rounded-xl border border-slate-700 focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white text-xs font-bold transition disabled:opacity-50 shadow-md shadow-primary/20"
                >
                  {isSubmitting ? 'Saving...' : editingPackage ? 'Update Package' : 'Create Package'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
