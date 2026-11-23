import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BlogPost } from '../../types';
import { Plus, Search, Edit3, Trash2, ExternalLink, X, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminBlogPage: React.FC = () => {
  const { blogs, addBlogPost, updateBlogPost, deleteBlogPost, toggleBlogPublish } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formState, setFormState] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    cover_image_url: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1000&q=80',
    author: 'Janntun Nahar Soha',
    read_time: '5 min read',
    published_at: '2026-11-23',
    status: 'published' as 'published' | 'draft',
    tags: 'Sajek Valley, Travel Guide'
  });

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormState({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      cover_image_url: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1000&q=80',
      author: 'Janntun Nahar Soha',
      read_time: '5 min read',
      published_at: new Date().toISOString().split('T')[0],
      status: 'published',
      tags: 'Travel Guide, Bangladesh'
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (post: BlogPost) => {
    setEditingId(post.id);
    setFormState({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      cover_image_url: post.cover_image_url,
      author: post.author,
      read_time: post.read_time,
      published_at: post.published_at,
      status: post.status,
      tags: post.tags.join(', ')
    });
    setModalOpen(true);
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Delete blog post "${title}"?`)) {
      deleteBlogPost(id);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = formState.slug.trim() || formState.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const tagsArray = formState.tags.split(',').map(t => t.trim()).filter(Boolean);

    const payload = {
      title: formState.title.trim(),
      slug,
      excerpt: formState.excerpt.trim(),
      content: formState.content.trim(),
      cover_image_url: formState.cover_image_url.trim(),
      author: formState.author.trim(),
      read_time: formState.read_time.trim(),
      published_at: formState.published_at,
      status: formState.status,
      tags: tagsArray
    };

    if (editingId) {
      updateBlogPost(editingId, payload);
    } else {
      addBlogPost(payload);
    }

    setModalOpen(false);
  };

  return (
    <div className="p-6 sm:p-10 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
            Travel Gazette
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Blog & Gazette Management
          </h1>
          <p className="text-xs text-slate-400">
            Publish travel guides, seasonal packing lists, and local insights.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 bg-[#005f49] hover:bg-[#0a4b3b] text-white px-5 py-3 rounded-2xl text-xs font-bold shadow-lg shadow-[#005f49]/30 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Write New Article</span>
        </button>
      </div>

      <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-900/60 text-slate-400 font-bold uppercase text-[10px]">
              <th className="py-4 px-6">Article</th>
              <th className="py-4 px-4">Author</th>
              <th className="py-4 px-4">Date</th>
              <th className="py-4 px-4">Status</th>
              <th className="py-4 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80">
            {blogs.map(post => (
              <tr key={post.id} className="hover:bg-slate-900/40">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <img src={post.cover_image_url} alt="" className="w-12 h-12 rounded-xl object-cover shrink-0" />
                    <div>
                      <h4 className="font-bold text-white text-xs">{post.title}</h4>
                      <span className="text-[10px] text-slate-500">{post.read_time}</span>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 text-slate-300">{post.author}</td>
                <td className="py-4 px-4 text-slate-400 font-mono">{post.published_at}</td>
                <td className="py-4 px-4">
                  <button
                    onClick={() => toggleBlogPublish(post.id)}
                    className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                      post.status === 'published' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                    }`}
                  >
                    {post.status}
                  </button>
                </td>
                <td className="py-4 px-6 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link to={`/blog/${post.slug}`} target="_blank" className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-white">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                    <button onClick={() => handleOpenEdit(post)} className="p-2 rounded-lg bg-slate-900 text-emerald-400 hover:bg-slate-800">
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => handleDelete(post.id, post.title)} className="p-2 rounded-lg bg-slate-900 text-rose-400 hover:bg-slate-800">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-950 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <h3 className="font-bold text-white text-lg">{editingId ? 'Edit Article' : 'New Article'}</h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white"><X className="w-4 h-4" /></button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-300">Article Title *</label>
                <input
                  type="text"
                  required
                  value={formState.title}
                  onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                  className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Author</label>
                  <input
                    type="text"
                    value={formState.author}
                    onChange={(e) => setFormState({ ...formState, author: e.target.value })}
                    className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white outline-hidden"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Read Time</label>
                  <input
                    type="text"
                    value={formState.read_time}
                    onChange={(e) => setFormState({ ...formState, read_time: e.target.value })}
                    className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white outline-hidden"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300">Cover Image URL *</label>
                <input
                  type="url"
                  required
                  value={formState.cover_image_url}
                  onChange={(e) => setFormState({ ...formState, cover_image_url: e.target.value })}
                  className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white outline-hidden"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300">Excerpt</label>
                <textarea
                  rows={2}
                  value={formState.excerpt}
                  onChange={(e) => setFormState({ ...formState, excerpt: e.target.value })}
                  className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white outline-hidden"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300">Content</label>
                <textarea
                  rows={6}
                  value={formState.content}
                  onChange={(e) => setFormState({ ...formState, content: e.target.value })}
                  className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white outline-hidden"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 bg-slate-900 text-slate-400 rounded-xl">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-[#005f49] text-white font-bold rounded-xl">Save Article</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
