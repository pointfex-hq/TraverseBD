import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Destination } from '../../types';
import { Plus, Search, Edit3, Trash2, MapPin, Sparkles, AlertCircle, X, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminDestinationsPage: React.FC = () => {
  const { 
    destinations, packages, addDestination, 
    updateDestination, deleteDestination, toggleDestinationPublish 
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const [formState, setFormState] = useState({
    name: '',
    slug: '',
    region: 'Chittagong Hill Tracts',
    short_description: '',
    full_description: '',
    cover_image_url: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80',
    highlights: 'Helipad Cloud Sea, Konglak Peak Summit Trek, Bamboo Chicken Feast',
    travel_tips: 'Carry NID card for checkposts, Pre-book cottages in winter',
    best_time_to_visit: 'September to March',
    status: 'published' as 'published' | 'draft',
    is_featured: false,
  });

  const filtered = destinations.filter(d => 
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.region.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormState({
      name: '',
      slug: '',
      region: 'Chittagong Hill Tracts',
      short_description: '',
      full_description: '',
      cover_image_url: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80',
      highlights: 'Signature Viewpoint, Guided Nature Walk, Cultural Homestay',
      travel_tips: 'Hire certified local guides, Check convoy times',
      best_time_to_visit: 'October to March',
      status: 'published',
      is_featured: false,
    });
    setFormError(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (dest: Destination) => {
    setEditingId(dest.id);
    setFormState({
      name: dest.name,
      slug: dest.slug,
      region: dest.region,
      short_description: dest.short_description,
      full_description: dest.full_description,
      cover_image_url: dest.cover_image_url,
      highlights: (dest.highlights || []).join(', '),
      travel_tips: (dest.travel_tips || []).join(', '),
      best_time_to_visit: dest.best_time_to_visit || '',
      status: dest.status,
      is_featured: dest.is_featured,
    });
    setFormError(null);
    setModalOpen(true);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete destination "${name}"?`)) {
      const res = deleteDestination(id);
      if (!res.success) {
        alert(res.message);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name.trim()) {
      setFormError('Destination name is required.');
      return;
    }

    const slug = formState.slug.trim() || formState.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const highlightsArray = formState.highlights.split(',').map(h => h.trim()).filter(Boolean);
    const tipsArray = formState.travel_tips.split(',').map(t => t.trim()).filter(Boolean);

    const payload = {
      name: formState.name.trim(),
      slug,
      region: formState.region.trim(),
      short_description: formState.short_description.trim(),
      full_description: formState.full_description.trim(),
      cover_image_url: formState.cover_image_url.trim(),
      highlights: highlightsArray,
      travel_tips: tipsArray,
      best_time_to_visit: formState.best_time_to_visit.trim(),
      status: formState.status,
      is_featured: formState.is_featured,
    };

    if (editingId) {
      updateDestination(editingId, payload);
    } else {
      addDestination(payload);
    }

    setModalOpen(false);
  };

  return (
    <div className="p-6 sm:p-10 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
            Regions & Places
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Destination Management
          </h1>
          <p className="text-xs text-slate-400">
            Create and maintain destinations, cover visuals, and travel tips.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 bg-[#005f49] hover:bg-[#0a4b3b] text-white px-5 py-3 rounded-2xl text-xs font-bold shadow-lg shadow-[#005f49]/30 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Destination</span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-slate-950 p-4 rounded-3xl border border-slate-800 flex items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search destination..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs outline-hidden focus:border-[#005f49]"
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(dest => {
          const count = packages.filter(p => p.destination_id === dest.id).length;
          return (
            <div key={dest.id} className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-md flex flex-col justify-between">
              <div>
                <div className="relative aspect-[16/9] bg-slate-800 overflow-hidden">
                  <img src={dest.cover_image_url} alt={dest.name} className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                    {count} {count === 1 ? 'Tour' : 'Tours'}
                  </div>
                  {dest.is_featured && (
                    <div className="absolute top-3 right-3 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      <span>Featured</span>
                    </div>
                  )}
                </div>

                <div className="p-5 space-y-2">
                  <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{dest.region}</span>
                  </div>
                  <h3 className="font-bold text-white text-lg">{dest.name}</h3>
                  <p className="text-xs text-slate-400 line-clamp-2">{dest.short_description}</p>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-slate-800 flex items-center justify-between mt-4">
                <button
                  onClick={() => toggleDestinationPublish(dest.id)}
                  className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                    dest.status === 'published' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                  }`}
                >
                  {dest.status}
                </button>

                <div className="flex items-center gap-2">
                  <Link to={`/destinations/${dest.slug}`} target="_blank" className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-white">
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                  <button onClick={() => handleOpenEdit(dest)} className="p-2 rounded-lg bg-slate-900 text-emerald-400 hover:bg-slate-800">
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => handleDelete(dest.id, dest.name)} className="p-2 rounded-lg bg-slate-900 text-rose-400 hover:bg-slate-800">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-950 border border-slate-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-xl font-bold text-white">
                {editingId ? 'Edit Destination' : 'Add Destination'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="p-2 rounded-full bg-slate-900 text-slate-400">
                <X className="w-4 h-4" />
              </button>
            </div>

            {formError && (
              <div className="p-3 rounded-xl bg-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">Destination Name *</label>
                <input
                  type="text"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs outline-hidden"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">Region *</label>
                <input
                  type="text"
                  required
                  value={formState.region}
                  onChange={(e) => setFormState({ ...formState, region: e.target.value })}
                  className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs outline-hidden"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">Cover Image URL *</label>
                <input
                  type="url"
                  required
                  value={formState.cover_image_url}
                  onChange={(e) => setFormState({ ...formState, cover_image_url: e.target.value })}
                  className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs outline-hidden"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">Short Description</label>
                <textarea
                  rows={2}
                  value={formState.short_description}
                  onChange={(e) => setFormState({ ...formState, short_description: e.target.value })}
                  className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs outline-hidden"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">Highlights (comma separated)</label>
                <input
                  type="text"
                  value={formState.highlights}
                  onChange={(e) => setFormState({ ...formState, highlights: e.target.value })}
                  className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs outline-hidden"
                />
              </div>

              <div className="flex items-center gap-6 pt-2 text-xs">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formState.status === 'published'}
                    onChange={(e) => setFormState({ ...formState, status: e.target.checked ? 'published' : 'draft' })}
                    className="w-4 h-4 rounded-sm accent-[#005f49]"
                  />
                  <span>Published</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formState.is_featured}
                    onChange={(e) => setFormState({ ...formState, is_featured: e.target.checked })}
                    className="w-4 h-4 rounded-sm accent-amber-500"
                  />
                  <span>Featured</span>
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 bg-slate-900 text-slate-400 rounded-xl text-xs">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-[#005f49] text-white rounded-xl text-xs font-bold">Save Destination</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
