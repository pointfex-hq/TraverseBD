'use client';

import React, { useState, useEffect } from 'react';
import { BlogItem } from '@backend/data/admin-mock-data';
import ImageUploadField from '@frontend/components/admin/ImageUploadField';
import ConfirmDeleteModal from '@frontend/components/admin/ConfirmDeleteModal';

export default function AdminBlogsView() {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Delete Modal State
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; title: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Form Fields
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [destinationSlug, setDestinationSlug] = useState('');
  const [readTime, setReadTime] = useState('5 min read');
  const [status, setStatus] = useState<'published' | 'draft'>('published');
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/blogs');
      const json = await res.json();
      if (json.data) {
        setBlogs(json.data);
      }
    } catch (err) {
      console.error('Failed to load blogs', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const openCreateModal = () => {
    setEditingBlog(null);
    setTitle('');
    setSlug('');
    setDestinationSlug('');
    setReadTime('5 min read');
    setStatus('published');
    setCoverImageUrl('https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?q=80&w=1200&auto=format&fit=crop');
    setExcerpt('');
    setContent('');
    setErrorMsg('');
    setIsModalOpen(true);
  };

  const openEditModal = (b: BlogItem) => {
    setEditingBlog(b);
    setTitle(b.title_en);
    setSlug(b.slug);
    setDestinationSlug(b.destination_slug || '');
    setReadTime(b.read_time || '5 min read');
    setStatus(b.status || 'published');
    setCoverImageUrl(b.cover_image_url);
    setExcerpt(b.excerpt_en);
    setContent(b.content_en);
    setErrorMsg('');
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !excerpt.trim() || !content.trim()) {
      setErrorMsg('Title, Summary Excerpt, and Full Content are required.');
      return;
    }

    try {
      setSaving(true);
      setErrorMsg('');

      const payload = {
        title_en: title.trim(),
        slug: slug.trim() || undefined,
        destination_slug: destinationSlug.trim() || undefined,
        read_time: readTime.trim() || '5 min read',
        status,
        cover_image_url: coverImageUrl.trim(),
        excerpt_en: excerpt.trim(),
        content_en: content.trim(),
      };

      if (editingBlog) {
        const res = await fetch(`/api/admin/blogs/${editingBlog.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || 'Failed to update blog post');
      } else {
        const res = await fetch('/api/admin/blogs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || 'Failed to create blog post');
      }

      setIsModalOpen(false);
      await fetchBlogs();
    } catch (err: any) {
      setErrorMsg(err.message || 'Something went wrong.');
    } finally {
      setSaving(false);
    }
  };

  const handleToggleStatus = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/blogs/${id}`, { method: 'PATCH' });
      const json = await res.json();
      if (res.ok && json.data) {
        setBlogs((prev) =>
          prev.map((b) => (b.id === id ? { ...b, status: json.data.status } : b))
        );
      } else {
        alert(json.error || 'Failed to toggle blog status');
      }
    } catch (err) {
      console.error(err);
      alert('Error toggling status');
    }
  };

  const confirmDeleteBlog = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/blogs/${deleteTarget.id}`, { method: 'DELETE' });
      if (res.ok) {
        setBlogs((prev) => prev.filter((b) => b.id !== deleteTarget.id));
        setDeleteTarget(null);
      } else {
        alert('Failed to delete blog post.');
      }
    } catch (err) {
      console.error(err);
      alert('Error deleting blog post.');
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredBlogs = blogs.filter((b) => {
    if (statusFilter !== 'all' && b.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = b.title_en.toLowerCase().includes(q);
      const matchSlug = b.slug.toLowerCase().includes(q);
      const matchExcerpt = b.excerpt_en.toLowerCase().includes(q);
      const matchDest = (b.destination_slug || '').toLowerCase().includes(q);
      if (!matchTitle && !matchSlug && !matchExcerpt && !matchDest) return false;
    }
    return true;
  });

  const totalCount = blogs.length;
  const publishedCount = blogs.filter((b) => b.status === 'published').length;
  const draftCount = blogs.filter((b) => b.status === 'draft').length;

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-slate-900 p-4 sm:p-6 rounded-2xl border border-slate-800 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/20 text-primary-fixed text-xs font-bold uppercase tracking-wider mb-2 border border-primary/30">
            <span className="material-symbols-outlined text-[15px]">article</span>
            Editorial Content Management
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">Travel Guide &amp; Field Blogs</h1>
          <p className="text-xs text-slate-400 mt-1">
            Publish travel tips, packing guides, and expedition field dispatches. Toggle between Published and Draft to control public website visibility.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white font-bold text-xs uppercase tracking-wider shadow-md hover:bg-primary-container transition-all w-full sm:w-auto cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">post_add</span>
          Write New Article
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-medium block">Total Articles</span>
            <span className="text-2xl font-black text-white mt-0.5 block">{totalCount}</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-primary-fixed">
            <span className="material-symbols-outlined text-[20px]">library_books</span>
          </div>
        </div>

        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-emerald-400 font-medium block">Published (Live)</span>
            <span className="text-2xl font-black text-emerald-300 mt-0.5 block">{publishedCount}</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
            <span className="material-symbols-outlined text-[20px]">check_circle</span>
          </div>
        </div>

        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-amber-400 font-medium block">Drafts (Hidden)</span>
            <span className="text-2xl font-black text-amber-300 mt-0.5 block">{draftCount}</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
            <span className="material-symbols-outlined text-[20px]">edit_note</span>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-slate-900 p-4 rounded-xl border border-slate-800">
        <div className="relative flex-1">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-[18px]">
            search
          </span>
          <input
            type="text"
            placeholder="Search blogs by title, slug, summary, destination..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-800 rounded-lg text-xs text-white border border-slate-700 focus:outline-none focus:border-primary placeholder-slate-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto">
          {[
            { key: 'all', label: 'All Status' },
            { key: 'published', label: 'Published' },
            { key: 'draft', label: 'Drafts' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setStatusFilter(tab.key as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                statusFilter === tab.key
                  ? 'bg-primary text-white shadow-sm font-bold'
                  : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Cards / List */}
      {loading ? (
        <div className="p-12 text-center text-xs text-slate-400 bg-slate-900 rounded-2xl border border-slate-800">
          Loading editorial articles...
        </div>
      ) : filteredBlogs.length === 0 ? (
        <div className="p-12 text-center text-xs text-slate-400 bg-slate-900 rounded-2xl border border-slate-800">
          No blog posts found matching your criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredBlogs.map((b) => (
            <div
              key={b.id}
              className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-sm hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-video w-full overflow-hidden bg-slate-800">
                  <img
                    src={b.cover_image_url}
                    alt={b.title_en}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?q=80&w=1200&auto=format&fit=crop';
                    }}
                  />
                  <span
                    className={`absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider backdrop-blur-md shadow-sm ${
                      b.status === 'draft'
                        ? 'bg-amber-500/90 text-white'
                        : 'bg-emerald-600/90 text-white'
                    }`}
                  >
                    {b.status === 'draft' ? 'Draft (Hidden)' : 'Published (Live)'}
                  </span>

                  {b.read_time && (
                    <span className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider">
                      {b.read_time}
                    </span>
                  )}
                </div>

                <div className="p-4 space-y-2">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-primary-fixed uppercase tracking-wider">
                    {b.destination_slug ? (
                      <span className="flex items-center gap-0.5">
                        <span className="material-symbols-outlined text-[13px]">location_on</span>
                        {b.destination_slug}
                      </span>
                    ) : (
                      <span>Travel Guide</span>
                    )}
                    <span>•</span>
                    <span className="font-mono text-slate-500">/blog/{b.slug}</span>
                  </div>

                  <h3 className="font-bold text-base text-white line-clamp-2 leading-snug">
                    {b.title_en}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                    {b.excerpt_en}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-2 border-t border-slate-800 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleToggleStatus(b.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                    b.status === 'draft'
                      ? 'bg-amber-500/20 text-amber-300 hover:bg-amber-500/30'
                      : 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30'
                  }`}
                  title={b.status === 'draft' ? 'Click to Publish' : 'Click to unpublish / make Draft'}
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {b.status === 'draft' ? 'visibility_off' : 'check_circle'}
                  </span>
                  <span>{b.status === 'draft' ? 'Publish' : 'Draft'}</span>
                </button>

                <div className="flex items-center gap-1.5">
                  <a
                    href={`/blog/${b.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
                    title="View on live site"
                  >
                    <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                  </a>
                  <button
                    onClick={() => openEditModal(b)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
                    title="Edit blog post"
                  >
                    <span className="material-symbols-outlined text-[18px]">edit</span>
                  </button>
                  <button
                    onClick={() => setDeleteTarget({ id: b.id, title: b.title_en })}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all cursor-pointer"
                    title="Delete blog post"
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
          <div className="bg-slate-900 w-full max-w-2xl rounded-2xl sm:rounded-3xl border border-slate-800 p-4 sm:p-6 shadow-2xl space-y-4 my-2 sm:my-8 max-h-[94vh] sm:max-h-[90vh] overflow-y-auto text-white">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h2 className="text-lg font-black text-white tracking-tight">
                {editingBlog ? 'Edit Blog Article' : 'Write New Travel Article'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-500/20 border border-red-500/30 text-red-300 rounded-xl text-xs font-semibold">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Article Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ultimate Travel Guide to Cox's Bazar in 2026"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800 rounded-xl text-xs text-white border border-slate-700 focus:outline-none focus:ring-1 focus:ring-primary font-semibold"
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

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    URL Slug (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. coxs-bazar-travel-guide"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800 rounded-xl text-xs text-white border border-slate-700 focus:outline-none focus:ring-1 focus:ring-primary font-mono text-[11px]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Destination Tag
                  </label>
                  <select
                    value={destinationSlug}
                    onChange={(e) => setDestinationSlug(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800 rounded-xl text-xs text-white border border-slate-700 focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
                  >
                    <option value="">General Travel</option>
                    <option value="sajek-valley">Sajek Valley</option>
                    <option value="saint-martins-island">Saint Martin's Island</option>
                    <option value="sundarbans">Sundarbans</option>
                    <option value="coxs-bazar">Cox's Bazar</option>
                    <option value="sreemangal-tea-valleys">Sreemangal</option>
                    <option value="bandarban-nilgiri">Bandarban</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Read Time
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 5 min read"
                    value={readTime}
                    onChange={(e) => setReadTime(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800 rounded-xl text-xs text-white border border-slate-700 focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <ImageUploadField
                label="Article Cover Image"
                value={coverImageUrl}
                onChange={(url) => setCoverImageUrl(url)}
                folder="blogs"
                required
                helperText="Upload article banner (max 10MB) or toggle to paste direct image link."
              />

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Summary Excerpt (Displayed on Cards) *
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Concise overview of what travelers will learn from this article..."
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 rounded-xl text-xs text-white border border-slate-700 focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Full Article Body (Markdown or Text) *
                </label>
                <textarea
                  rows={6}
                  required
                  placeholder="Write the full comprehensive guide, tips, itineraries, and packing lists..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 rounded-xl text-xs text-white border border-slate-700 focus:outline-none focus:ring-1 focus:ring-primary font-mono text-[11px]"
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
                  {saving ? 'Saving...' : editingBlog ? 'Save Article' : 'Publish Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* In-App Delete Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={!!deleteTarget}
        title="Delete Blog Article"
        message={`Are you sure you want to permanently delete "${deleteTarget?.title}"? This travel story will no longer be visible on the public journal.`}
        confirmLabel="Delete Article"
        isDeleting={isDeleting}
        onConfirm={confirmDeleteBlog}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
