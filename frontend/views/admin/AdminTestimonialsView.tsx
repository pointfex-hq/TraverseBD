'use client';

import React, { useState, useEffect } from 'react';
import { Testimonial } from '@backend/data/admin-mock-data';
import AdminConfirmModal from '@frontend/components/admin/AdminConfirmModal';

const PRESET_AVATARS = [
  { label: 'Male 1 (Tanvir)', url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=250&auto=format&fit=crop' },
  { label: 'Female 1 (Nusrat)', url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=250&auto=format&fit=crop' },
  { label: 'Male 2 (Farhan)', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=250&auto=format&fit=crop' },
  { label: 'Female 2 (Sabrina)', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=250&auto=format&fit=crop' },
  { label: 'Male 3 (Mahir)', url: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=250&auto=format&fit=crop' },
  { label: 'Female 3 (Anika)', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=250&auto=format&fit=crop' },
];

export default function AdminTestimonialsView() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [packages, setPackages] = useState<{ id: string; title_en: string; slug: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form Fields
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [location, setLocation] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [quote, setQuote] = useState('');
  const [rating, setRating] = useState(5);
  const [packageTitle, setPackageTitle] = useState('');
  const [packageSlug, setPackageSlug] = useState('');
  const [dateStr, setDateStr] = useState('');
  const [verified, setVerified] = useState(true);
  const [status, setStatus] = useState<'published' | 'draft'>('published');

  // Delete Confirmation Modal
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [tRes, pRes] = await Promise.all([
        fetch('/api/admin/testimonials').then((r) => r.json()),
        fetch('/api/admin/packages').then((r) => r.json()),
      ]);

      if (tRes.success) setTestimonials(tRes.data.testimonials || []);
      if (pRes.success) setPackages(pRes.data.packages || []);
    } catch (e) {
      console.error('Failed to load testimonials:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const openCreateModal = () => {
    setEditingItem(null);
    setName('');
    setRole('Family Vacationer');
    setLocation('Dhaka');
    setAvatarUrl(PRESET_AVATARS[0].url);
    setQuote('');
    setRating(5);
    setPackageTitle(packages[0]?.title_en || 'Sajek Valley Cloud Kingdom Escape');
    setPackageSlug(packages[0]?.slug || 'sajek-valley-cloud-expedition');
    setDateStr('November 2025');
    setVerified(true);
    setStatus('published');
    setIsModalOpen(true);
  };

  const openEditModal = (item: Testimonial) => {
    setEditingItem(item);
    setName(item.name);
    setRole(item.role || '');
    setLocation(item.location);
    setAvatarUrl(item.avatarUrl);
    setQuote(item.quote);
    setRating(item.rating || 5);
    setPackageTitle(item.package_title);
    setPackageSlug(item.package_slug);
    setDateStr(item.date);
    setVerified(item.verified);
    setStatus(item.status);
    setIsModalOpen(true);
  };

  const handlePackageChange = (selectedTitle: string) => {
    setPackageTitle(selectedTitle);
    const found = packages.find((p) => p.title_en === selectedTitle);
    if (found) {
      setPackageSlug(found.slug);
    } else {
      setPackageSlug(selectedTitle.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-'));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !quote.trim()) {
      alert('Please fill in both Name and Review Quote.');
      return;
    }

    setIsSubmitting(true);
    const payload = {
      name: name.trim(),
      role: role.trim(),
      location: location.trim(),
      avatarUrl: avatarUrl.trim() || PRESET_AVATARS[0].url,
      quote: quote.trim(),
      rating: Number(rating) || 5,
      package_title: packageTitle.trim() || 'Custom Tour',
      package_slug: packageSlug.trim() || 'custom-tour',
      date: dateStr.trim() || 'Recent Journey',
      verified,
      status,
    };

    try {
      if (editingItem) {
        const res = await fetch(`/api/admin/testimonials/${editingItem.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (data.success) {
          setTestimonials((prev) =>
            prev.map((t) => (t.id === editingItem.id ? data.data.testimonial : t))
          );
          setIsModalOpen(false);
        } else {
          alert(data.error || 'Failed to update review');
        }
      } else {
        const res = await fetch('/api/admin/testimonials', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (data.success) {
          setTestimonials((prev) => [data.data.testimonial, ...prev]);
          setIsModalOpen(false);
        } else {
          alert(data.error || 'Failed to create review');
        }
      }
    } catch (err: any) {
      alert(err.message || 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleStatus = async (item: Testimonial) => {
    const newStatus = item.status === 'published' ? 'draft' : 'published';
    try {
      const res = await fetch(`/api/admin/testimonials/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setTestimonials((prev) =>
          prev.map((t) => (t.id === item.id ? { ...t, status: newStatus } : t))
        );
      }
    } catch (e) {
      console.error('Failed to toggle status:', e);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/testimonials/${deleteId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        setTestimonials((prev) => prev.filter((t) => t.id !== deleteId));
        setDeleteId(null);
      } else {
        alert(data.error || 'Failed to delete review');
      }
    } catch (e) {
      alert('Network error while deleting');
    } finally {
      setIsDeleting(false);
    }
  };

  // Filtered Testimonials
  const filteredTestimonials = testimonials.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.package_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.quote.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-slate-900 p-4 sm:p-6 rounded-2xl border border-slate-800 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/20 text-primary-fixed text-xs font-bold uppercase tracking-wider mb-2 border border-primary/30">
            <span className="material-symbols-outlined text-[15px]">rate_review</span>
            Authentic Social Proof &amp; Verified Reviews
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Customer Reviews &amp; Testimonials
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage genuine Bangladeshi traveler stories, star ratings, and tour reviews displayed across the platform.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-on-primary text-xs font-bold transition shadow-md shadow-primary/20 active:scale-95 shrink-0"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          <span>Add New Review</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-medium">Total Reviews</p>
            <h3 className="text-xl font-bold text-white mt-1">{testimonials.length}</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-primary/20 text-primary-fixed flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px]">forum</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-medium">Published on Home</p>
            <h3 className="text-xl font-bold text-emerald-400 mt-1">
              {testimonials.filter((t) => t.status === 'published').length}
            </h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px]">verified</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-medium">Average Rating</p>
            <h3 className="text-xl font-bold text-amber-400 mt-1 flex items-center gap-1">
              <span>5.0</span>
              <span className="text-sm">★</span>
            </h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px]">hotel_class</span>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between bg-slate-900 p-3 sm:p-4 rounded-2xl border border-slate-800">
        <div className="relative flex-1">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">
            search
          </span>
          <input
            type="text"
            placeholder="Search by traveler name, location, tour, or feedback text..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-800 text-white text-xs pl-9 pr-3 py-2 rounded-xl border border-slate-700 focus:outline-none focus:ring-1 focus:ring-primary placeholder-slate-500"
          />
        </div>

        <div className="flex items-center gap-2">
          {(['all', 'published', 'draft'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition ${
                statusFilter === tab
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Testimonials List */}
      {isLoading ? (
        <div className="p-12 text-center text-slate-400 text-xs">Loading authentic reviews...</div>
      ) : filteredTestimonials.length === 0 ? (
        <div className="p-12 text-center text-slate-400 text-xs bg-slate-900 rounded-2xl border border-slate-800">
          No reviews found matching your search.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTestimonials.map((item) => (
            <div
              key={item.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col justify-between gap-4 hover:border-slate-700 transition shadow-sm"
            >
              <div className="space-y-3">
                {/* Header with Avatar, Name, Rating */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.avatarUrl}
                      alt={item.name}
                      className="w-11 h-11 rounded-full object-cover border-2 border-primary/40 shrink-0"
                    />
                    <div>
                      <h3 className="font-bold text-sm text-white flex items-center gap-1.5">
                        <span>{item.name}</span>
                        {item.verified && (
                          <span
                            title="Verified Traveler"
                            className="material-symbols-outlined text-primary text-[15px]"
                          >
                            verified
                          </span>
                        )}
                      </h3>
                      <p className="text-[11px] text-slate-400">
                        {item.role || 'Traveler'} • {item.location}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase shrink-0 ${
                      item.status === 'published'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                {/* Tour & Rating */}
                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-[11px] font-semibold text-primary-fixed truncate max-w-[200px]">
                    {item.package_title}
                  </span>
                  <div className="flex text-amber-400 text-xs">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                </div>

                {/* Quote */}
                <p className="text-xs text-slate-300 leading-relaxed italic line-clamp-4">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              {/* Bottom Actions */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-[10px] text-slate-500 font-medium">{item.date}</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleToggleStatus(item)}
                    title={item.status === 'published' ? 'Switch to Draft' : 'Publish to Website'}
                    className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {item.status === 'published' ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                  <button
                    onClick={() => openEditModal(item)}
                    title="Edit Review"
                    className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
                  >
                    <span className="material-symbols-outlined text-[16px]">edit</span>
                  </button>
                  <button
                    onClick={() => setDeleteId(item.id)}
                    title="Delete Review"
                    className="p-1.5 text-red-400 hover:text-red-300 rounded-lg hover:bg-red-500/10 transition"
                  >
                    <span className="material-symbols-outlined text-[16px]">delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CREATE / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-5 sm:p-7 space-y-5 my-8 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-primary-fixed text-[20px]">
                  {editingItem ? 'edit' : 'add_circle'}
                </span>
                <span>{editingItem ? 'Edit Review' : 'Add Authentic Review'}</span>
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Traveler Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tanvir Ahmed"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-800 text-white text-xs px-3 py-2 rounded-xl border border-slate-700 focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Role / Traveler Type
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Corporate Team Lead / Family"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full bg-slate-800 text-white text-xs px-3 py-2 rounded-xl border border-slate-700 focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Location / City *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Uttara, Dhaka"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-slate-800 text-white text-xs px-3 py-2 rounded-xl border border-slate-700 focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Journey Date / Month
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. November 2025"
                    value={dateStr}
                    onChange={(e) => setDateStr(e.target.value)}
                    className="w-full bg-slate-800 text-white text-xs px-3 py-2 rounded-xl border border-slate-700 focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Tour Package Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Associated Tour Package *
                </label>
                <select
                  value={packageTitle}
                  onChange={(e) => handlePackageChange(e.target.value)}
                  className="w-full bg-slate-800 text-white text-xs px-3 py-2 rounded-xl border border-slate-700 focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
                >
                  {packages.map((p) => (
                    <option key={p.id} value={p.title_en}>
                      {p.title_en}
                    </option>
                  ))}
                  <option value="Sajek Valley Cloud Kingdom Escape">Sajek Valley Cloud Kingdom Escape</option>
                  <option value="Saint Martin Coral Island Cruise">Saint Martin Coral Island Cruise</option>
                  <option value="Tanguar Haor Luxury Houseboat Cruise">Tanguar Haor Luxury Houseboat Cruise</option>
                  <option value="Sundarbans Deep Mangrove Safari">Sundarbans Deep Mangrove Safari</option>
                  <option value="Bandarban & Nilgiri Summit Expedition">Bandarban & Nilgiri Summit Expedition</option>
                  <option value="Custom Group Tour">Custom Group Tour</option>
                </select>
              </div>

              {/* Avatar Preset Quick-Pick */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Traveler Photo / Avatar (Select Bangladeshi Portrait Preset or Custom URL)
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {PRESET_AVATARS.map((p) => (
                    <button
                      key={p.url}
                      type="button"
                      onClick={() => setAvatarUrl(p.url)}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium transition border ${
                        avatarUrl === p.url
                          ? 'bg-primary text-white border-primary'
                          : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-500'
                      }`}
                    >
                      <img src={p.url} alt="" className="w-4 h-4 rounded-full object-cover" />
                      <span>{p.label}</span>
                    </button>
                  ))}
                </div>
                <input
                  type="url"
                  placeholder="Custom Avatar URL (https://...)"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  className="w-full bg-slate-800 text-white text-xs px-3 py-2 rounded-xl border border-slate-700 focus:outline-none focus:ring-1 focus:ring-primary font-mono text-[11px]"
                />
              </div>

              {/* Rating & Verified & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Rating (Stars)
                  </label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="w-full bg-slate-800 text-white text-xs px-3 py-2 rounded-xl border border-slate-700 focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value={5}>5 Stars (★★★★★)</option>
                    <option value={4}>4 Stars (★★★★☆)</option>
                    <option value={3}>3 Stars (★★★☆☆)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full bg-slate-800 text-white text-xs px-3 py-2 rounded-xl border border-slate-700 focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>

                <div className="flex flex-col justify-end">
                  <label className="flex items-center gap-2 cursor-pointer pb-2">
                    <input
                      type="checkbox"
                      checked={verified}
                      onChange={(e) => setVerified(e.target.checked)}
                      className="w-4 h-4 rounded text-primary focus:ring-0 bg-slate-800 border-slate-700"
                    />
                    <span className="text-xs font-bold text-slate-300">Verified Traveler</span>
                  </label>
                </div>
              </div>

              {/* Review Text */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Customer Review Quote *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Write the traveler's feedback about the tour, guides, food, transport, and overall experience..."
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  className="w-full bg-slate-800 text-white text-xs px-3 py-2 rounded-xl border border-slate-700 focus:outline-none focus:ring-1 focus:ring-primary leading-relaxed"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-primary hover:bg-primary-container text-on-primary transition shadow-md active:scale-95 disabled:opacity-50"
                >
                  {isSubmitting ? 'Saving...' : editingItem ? 'Save Changes' : 'Create Review'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <AdminConfirmModal
        isOpen={!!deleteId}
        title="Delete Customer Review"
        message="Are you sure you want to permanently delete this customer testimonial? This action cannot be undone."
        confirmText={isDeleting ? 'Deleting...' : 'Delete Review'}
        type="danger"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
