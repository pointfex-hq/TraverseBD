'use client';

import React, { useState, useEffect } from 'react';
import { GalleryItem } from '@backend/data/admin-mock-data';
import ImageUploadField from '@frontend/components/admin/ImageUploadField';
import ConfirmDeleteModal from '@frontend/components/admin/ConfirmDeleteModal';

export default function AdminGalleryView() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Delete Modal State
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; title: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Form Fields
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [author, setAuthor] = useState('');
  const [gear, setGear] = useState('');
  const [category, setCategory] = useState<'coastal' | 'hills' | 'forests' | 'riverine' | 'cultural'>('hills');
  const [desc, setDesc] = useState('');
  const [alt, setAlt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [aspect, setAspect] = useState('aspect-[4/5]');
  const [badge, setBadge] = useState('');
  const [status, setStatus] = useState<'published' | 'draft'>('published');

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
    setAuthor('Traverse BD Guild');
    setGear('Sony A7R V • 24mm f/2.8');
    setCategory('hills');
    setDesc('Curated high-resolution dispatch from Traverse BD expeditions.');
    setAlt('');
    setImageUrl('');
    setAspect('aspect-[4/5]');
    setBadge('Curated Archive');
    setStatus('published');
    setErrorMsg('');
    setIsModalOpen(true);
  };

  const openEditModal = (item: GalleryItem) => {
    setEditingItem(item);
    setTitle(item.title);
    setLocation(item.location);
    setAuthor(item.author || '');
    setGear(item.gear || '');
    setCategory(item.category as any);
    setDesc(item.desc || '');
    setAlt(item.alt || '');
    setImageUrl(item.imageUrl);
    setAspect(item.aspect || 'aspect-[4/5]');
    setBadge(item.badge || '');
    setStatus(item.status || 'published');
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
        title: title.trim(),
        location: location.trim(),
        author: author.trim() || 'Traverse BD Guild',
        gear: gear.trim() || 'Professional Optics',
        category,
        desc: desc.trim(),
        alt: alt.trim() || title.trim(),
        imageUrl: imageUrl.trim(),
        aspect,
        badge: badge.trim(),
        status,
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

  const handleToggleStatus = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/gallery/${id}`, { method: 'PATCH' });
      const json = await res.json();
      if (res.ok && json.data) {
        setItems((prev) =>
          prev.map((i) => (i.id === id ? { ...i, status: json.data.status } : i))
        );
      } else {
        alert(json.error || 'Failed to toggle status');
      }
    } catch (err) {
      console.error(err);
      alert('Error toggling status');
    }
  };

  const confirmDeleteGalleryItem = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/gallery/${deleteTarget.id}`, { method: 'DELETE' });
      if (res.ok) {
        setItems((prev) => prev.filter((i) => i.id !== deleteTarget.id));
        setDeleteTarget(null);
      } else {
        alert('Failed to delete gallery item.');
      }
    } catch (err) {
      console.error(err);
      alert('Error deleting gallery item.');
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredItems = items.filter((item) => {
    if (filterCategory !== 'all' && item.category !== filterCategory) return false;
    if (filterStatus !== 'all' && (item.status || 'published') !== filterStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchLoc = item.location.toLowerCase().includes(q);
      const matchAuthor = (item.author || '').toLowerCase().includes(q);
      const matchBadge = (item.badge || '').toLowerCase().includes(q);
      if (!matchTitle && !matchLoc && !matchAuthor && !matchBadge) return false;
    }
    return true;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-slate-900 p-4 sm:p-6 rounded-2xl border border-slate-800 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/20 text-primary-fixed text-xs font-bold uppercase tracking-wider mb-2 border border-primary/30">
            <span className="material-symbols-outlined text-[15px]">photo_library</span>
            Visual Archive Management
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">Gallery Media Curations</h1>
          <p className="text-xs text-slate-400 mt-1">
            Upload and manage photo dispatches displayed on the public Gallery page. Toggle between Published and Draft to control public visibility instantly.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white font-bold text-xs uppercase tracking-wider shadow-md hover:bg-primary-container transition-all w-full sm:w-auto cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">add_photo_alternate</span>
          Add New Photo
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col gap-3 bg-slate-900 p-4 rounded-xl border border-slate-800">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-[18px]">
              search
            </span>
            <input
              type="text"
              placeholder="Search by photo title, location, photographer, or gear..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-800 rounded-lg text-xs text-white border border-slate-700 focus:outline-none focus:border-primary placeholder-slate-500"
            />
          </div>

          {/* Status Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 sm:border-l sm:border-slate-800 sm:pl-3">
            {[
              { key: 'all', label: 'All' },
              { key: 'published', label: 'Published' },
              { key: 'draft', label: 'Drafts' },
            ].map((st) => (
              <button
                key={st.key}
                onClick={() => setFilterStatus(st.key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  filterStatus === st.key
                    ? 'bg-primary text-white shadow-sm font-bold'
                    : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 pt-2 border-t border-slate-800">
          {[
            { key: 'all', label: 'All Categories' },
            { key: 'coastal', label: 'Coastal & Marine' },
            { key: 'hills', label: 'Hill Tracts' },
            { key: 'forests', label: 'Forests & Wildlife' },
            { key: 'riverine', label: 'Riverine & Haors' },
            { key: 'cultural', label: 'Cultural & Heritage' },
          ].map((cat) => (
            <button
              key={cat.key}
              onClick={() => setFilterCategory(cat.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                filterCategory === cat.key
                  ? 'bg-primary text-white shadow-sm font-bold'
                  : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Cards Grid */}
      {loading ? (
        <div className="p-12 text-center text-xs text-slate-400 bg-slate-900 rounded-2xl border border-slate-800">
          Loading gallery visual archives...
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="p-12 text-center text-xs text-slate-400 bg-slate-900 rounded-2xl border border-slate-800">
          No gallery photos found matching your criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-sm hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-video w-full overflow-hidden bg-slate-800">
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
                    {item.badge || item.category}
                  </span>
                  
                  {/* Status Badge */}
                  <span
                    className={`absolute bottom-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider backdrop-blur-md shadow-sm ${
                      item.status === 'draft'
                        ? 'bg-amber-500/90 text-white'
                        : 'bg-emerald-600/90 text-white'
                    }`}
                  >
                    {item.status === 'draft' ? 'Draft (Hidden)' : 'Published (Live)'}
                  </span>

                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-primary text-white text-[10px] font-bold uppercase tracking-wider">
                    {item.category}
                  </span>
                </div>

                <div className="p-4 space-y-2">
                  <h3 className="font-bold text-sm text-white line-clamp-1">{item.title}</h3>
                  <p className="text-xs text-slate-400 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px] text-primary-fixed">location_on</span>
                    {item.location}
                  </p>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800">
                    <span>By {item.author}</span>
                    <span className="font-mono text-[10px] text-slate-500">{item.gear}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 pt-0 border-t border-slate-800 flex items-center justify-between mt-2">
                <button
                  type="button"
                  onClick={() => handleToggleStatus(item.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                    item.status === 'draft'
                      ? 'bg-amber-500/20 text-amber-300 hover:bg-amber-500/30'
                      : 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30'
                  }`}
                  title={item.status === 'draft' ? 'Click to Publish' : 'Click to unpublish / make Draft'}
                >
                  <span className="material-symbols-outlined text-[15px]">
                    {item.status === 'draft' ? 'visibility_off' : 'check_circle'}
                  </span>
                  <span>{item.status === 'draft' ? 'Publish' : 'Draft'}</span>
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => openEditModal(item)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
                    title="Edit details"
                  >
                    <span className="material-symbols-outlined text-[18px]">edit</span>
                  </button>
                  <button
                    onClick={() => setDeleteTarget({ id: item.id, title: item.title })}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all cursor-pointer"
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
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-slate-900 w-full max-w-xl rounded-2xl sm:rounded-3xl border border-slate-800 p-4 sm:p-6 shadow-2xl space-y-4 my-2 sm:my-8 max-h-[94vh] sm:max-h-[90vh] overflow-y-auto text-white">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h2 className="text-lg font-black text-white tracking-tight">
                {editingItem ? 'Edit Gallery Photo' : 'Add New Gallery Photo'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-500/20 border border-red-500/30 text-red-300 text-xs rounded-xl font-medium">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Photo Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Azure Waters & Timber Dinghies"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800 rounded-xl text-xs text-white border border-slate-700 focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Publication Status *
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as 'published' | 'draft')}
                    className="w-full px-3 py-2 bg-slate-800 rounded-xl text-xs text-white border border-slate-700 focus:outline-none focus:ring-1 focus:ring-primary font-bold cursor-pointer"
                  >
                    <option value="published">Published (Live)</option>
                    <option value="draft">Draft (Hidden)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Location *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Saint Martin's Island, Bay of Bengal"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800 rounded-xl text-xs text-white border border-slate-700 focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-800 rounded-xl text-xs text-white border border-slate-700 focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
                  >
                    <option value="coastal">Coastal & Marine</option>
                    <option value="hills">Hill Tracts & Clouds</option>
                    <option value="forests">Forests & Wildlife</option>
                    <option value="riverine">Riverine & Haors</option>
                    <option value="cultural">Cultural & Heritage</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Photographer Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Tanvir Chowdhury"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800 rounded-xl text-xs text-white border border-slate-700 focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Camera Gear
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Sony A7R V • 24mm f/2.8"
                    value={gear}
                    onChange={(e) => setGear(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800 rounded-xl text-xs text-white border border-slate-700 focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Badge Tag
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Coastal & Marine"
                    value={badge}
                    onChange={(e) => setBadge(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800 rounded-xl text-xs text-white border border-slate-700 focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Aspect Ratio Class
                  </label>
                  <select
                    value={aspect}
                    onChange={(e) => setAspect(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800 rounded-xl text-xs text-white border border-slate-700 focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
                  >
                    <option value="aspect-[4/5]">4:5 Vertical Portrait (e.g. Saint Martin)</option>
                    <option value="aspect-[3/4]">3:4 Traditional Vertical (e.g. Sajek Sunrise)</option>
                    <option value="aspect-[16/10]">16:10 Wide Landscape (e.g. Sundarbans)</option>
                    <option value="aspect-[4/3]">4:3 Standard Landscape (e.g. Tanguar Haor)</option>
                    <option value="aspect-[9/16]">9:16 Tall Waterfall (e.g. Amiakhum)</option>
                  </select>
                </div>
              </div>

              <ImageUploadField
                label="Gallery Photo File"
                value={imageUrl}
                onChange={(url) => setImageUrl(url)}
                folder="gallery"
                required
                helperText="Upload photo from device (max 10MB) or toggle to paste direct image URL."
              />

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Lightbox Story Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Describe the story and ecological context of the photograph..."
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 rounded-xl text-xs text-white border border-slate-700 focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-800 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-xl bg-primary text-white text-xs font-bold uppercase tracking-wider hover:bg-primary-container transition disabled:opacity-50"
                >
                  {saving ? 'Saving...' : editingItem ? 'Save Changes' : 'Create Photo'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* In-App Delete Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={!!deleteTarget}
        title="Delete Gallery Photo"
        message={`Are you sure you want to permanently delete "${deleteTarget?.title}"? This photo will be removed from the public visual showcase.`}
        confirmLabel="Delete Photo"
        isDeleting={isDeleting}
        onConfirm={confirmDeleteGalleryItem}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
