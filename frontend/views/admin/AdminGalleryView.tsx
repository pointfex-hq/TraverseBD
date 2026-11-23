'use client';

import React, { useState, useEffect } from 'react';
import { GalleryItem } from '@backend/data/admin-mock-data';

export default function AdminGalleryView() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Form Fields
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState<'hills' | 'coastal' | 'forest' | 'riverine'>('hills');
  const [imageUrl, setImageUrl] = useState('');
  const [badge, setBadge] = useState('');

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/gallery');
      const json = await res.json();
      if (json.data) {
        setItems(json.data);
      }
    } catch (err) {
      console.error('Failed to load gallery items', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const openCreateModal = () => {
    setEditingItem(null);
    setTitle('');
    setLocation('');
    setCategory('hills');
    setImageUrl('');
    setBadge('Expedition Archive');
    setErrorMsg('');
    setIsModalOpen(true);
  };

  const openEditModal = (item: GalleryItem) => {
    setEditingItem(item);
    setTitle(item.title);
    setLocation(item.location);
    setCategory(item.category);
    setImageUrl(item.imageUrl);
    setBadge(item.badge);
    setErrorMsg('');
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !imageUrl.trim() || !location.trim()) {
      setErrorMsg('Title, Image URL, and Location are required.');
      return;
    }

    try {
      setSaving(true);
      setErrorMsg('');

      const payload = {
        title,
        location,
        category,
        imageUrl,
        badge,
      };

      if (editingItem) {
        // PUT update
        const res = await fetch(`/api/admin/gallery/${editingItem.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || 'Failed to update');
      } else {
        // POST create
        const res = await fetch('/api/admin/gallery', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || 'Failed to create');
      }

      setIsModalOpen(false);
      await fetchGallery();
    } catch (err: any) {
      setErrorMsg(err.message || 'Something went wrong.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, itemTitle: string) => {
    if (!confirm(`Are you sure you want to permanently delete "${itemTitle}" from Gallery?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/gallery/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setItems((prev) => prev.filter((i) => i.id !== id));
      } else {
        alert('Failed to delete gallery item.');
      }
    } catch (err) {
      console.error(err);
      alert('Error deleting gallery item.');
    }
  };

  const filteredItems = items.filter((item) => {
    if (filterCategory !== 'all' && item.category !== filterCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchLoc = item.location.toLowerCase().includes(q);
      const matchBadge = item.badge.toLowerCase().includes(q);
      if (!matchTitle && !matchLoc && !matchBadge) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-surface-container-lowest p-6 rounded-2xl border border-surface-container">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-container text-on-primary-container text-xs font-bold uppercase tracking-wider mb-2">
            <span className="material-symbols-outlined text-[15px]">photo_library</span>
            Visual Archive Management
          </div>
          <h1 className="text-2xl font-black text-on-surface tracking-tight">Gallery Media Curations</h1>
          <p className="text-xs text-on-surface-variant mt-1">
            Upload and manage photo dispatches displayed on the public Gallery page.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-xs uppercase tracking-wider shadow-sm hover:opacity-95 transition-all"
        >
          <span className="material-symbols-outlined text-[18px]">add_photo_alternate</span>
          Add New Photo
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-surface-container-lowest p-4 rounded-xl border border-surface-container">
        <div className="relative flex-1">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
            search
          </span>
          <input
            type="text"
            placeholder="Search by photo title, location or badge..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-surface-container-low rounded-lg text-xs text-on-surface border border-surface-container focus:outline-none focus:border-primary"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {(['all', 'hills', 'coastal', 'forest', 'riverine'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider capitalize whitespace-nowrap transition-all ${
                filterCategory === cat
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              {cat === 'all' ? 'All Formats' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Cards Grid */}
      {loading ? (
        <div className="p-12 text-center text-xs text-on-surface-variant bg-surface-container-lowest rounded-2xl border border-surface-container">
          Loading gallery visual archives...
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="p-12 text-center text-xs text-on-surface-variant bg-surface-container-lowest rounded-2xl border border-surface-container">
          No gallery photos found matching your criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group bg-surface-container-lowest rounded-2xl border border-surface-container overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-video w-full overflow-hidden bg-surface-container">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider">
                    {item.badge}
                  </span>
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-primary text-on-primary text-[10px] font-bold uppercase tracking-wider">
                    {item.category}
                  </span>
                </div>

                <div className="p-4 space-y-1.5">
                  <h3 className="font-bold text-sm text-on-surface line-clamp-1">{item.title}</h3>
                  <p className="text-xs text-on-surface-variant flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px] text-primary">location_on</span>
                    {item.location}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-0 border-t border-surface-container flex items-center justify-between mt-2">
                <span className="text-[10px] text-on-surface-variant font-mono truncate max-w-[140px]">
                  ID: {item.id}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => openEditModal(item)}
                    className="p-1.5 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-all"
                    title="Edit details"
                  >
                    <span className="material-symbols-outlined text-[18px]">edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(item.id, item.title)}
                    className="p-1.5 rounded-lg text-error hover:bg-error-container/40 transition-all"
                    title="Delete photo"
                  >
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest w-full max-w-lg rounded-2xl border border-surface-container p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-surface-container">
              <h2 className="text-lg font-black text-on-surface tracking-tight">
                {editingItem ? 'Edit Gallery Photo' : 'Add New Gallery Photo'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {errorMsg && (
              <div className="p-3 bg-error-container text-on-error-container text-xs rounded-xl font-medium">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1">
                  Photo Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sea of Morning Clouds"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-surface-container-low rounded-xl text-xs text-on-surface border border-surface-container focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1">
                    Location *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sajek Valley, Rangamati"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3 py-2 bg-surface-container-low rounded-xl text-xs text-on-surface border border-surface-container focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 bg-surface-container-low rounded-xl text-xs text-on-surface border border-surface-container focus:outline-none focus:border-primary"
                  >
                    <option value="hills">Hills & Mountains</option>
                    <option value="coastal">Coastal & Islands</option>
                    <option value="forest">Forest & Wildlife</option>
                    <option value="riverine">Riverine & Wetlands</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1">
                  Badge / Tag
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sunrise Expedition, UNESCO Heritage"
                  value={badge}
                  onChange={(e) => setBadge(e.target.value)}
                  className="w-full px-3 py-2 bg-surface-container-low rounded-xl text-xs text-on-surface border border-surface-container focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1">
                  Image Direct URL *
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://... (Direct image link from ImgBB, Cloudinary, Supabase, etc.)"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full px-3 py-2 bg-surface-container-low rounded-xl text-xs text-on-surface border border-surface-container focus:outline-none focus:border-primary"
                />
                <p className="text-[11px] text-on-surface-variant mt-1">
                  💡 Tip: You can host images for free on <b>Supabase Storage</b>, <b>Cloudinary</b>, or <b>ImgBB</b> and paste the direct link here.
                </p>
              </div>

              {/* Live Preview */}
              {imageUrl && (
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
                    Live Thumbnail Preview:
                  </span>
                  <div className="aspect-video w-full rounded-xl overflow-hidden bg-surface-container border border-surface-container">
                    <img
                      src={imageUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-surface-container">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-on-surface-variant hover:bg-surface-container"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-xl bg-primary text-on-primary text-xs font-bold uppercase tracking-wider hover:opacity-95 disabled:opacity-50"
                >
                  {saving ? 'Saving...' : editingItem ? 'Save Changes' : 'Create Photo'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
