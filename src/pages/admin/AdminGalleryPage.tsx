import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { GalleryImage } from '../../types';
import { Plus, Trash2, Tag, MapPin, X, Eye, ExternalLink } from 'lucide-react';

export const AdminGalleryPage: React.FC = () => {
  const { gallery, destinations, addGalleryImage, deleteGalleryImage, toggleGalleryPublish } = useApp();
  const [modalOpen, setModalOpen] = useState(false);

  const [formState, setFormState] = useState({
    image_url: '',
    caption: '',
    destination_id: destinations[0]?.id || '',
    category: 'Mountains & Clouds',
    status: 'published' as 'published' | 'draft'
  });

  const handleOpenAdd = () => {
    setFormState({
      image_url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
      caption: 'Golden sunrise over mountain valley',
      destination_id: destinations[0]?.id || '',
      category: 'Mountains & Clouds',
      status: 'published'
    });
    setModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dest = destinations.find(d => d.id === formState.destination_id);
    addGalleryImage({
      image_url: formState.image_url.trim(),
      caption: formState.caption.trim(),
      destination_id: formState.destination_id,
      destination_name: dest?.name || 'Bangladesh',
      category: formState.category,
      status: formState.status,
      sort_order: gallery.length + 1
    });
    setModalOpen(false);
  };

  return (
    <div className="p-6 sm:p-10 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
            Visual Media Bank
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Gallery Management
          </h1>
          <p className="text-xs text-slate-400">
            Upload expedition photos, assign categories, and toggle visibility.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 bg-[#005f49] hover:bg-[#0a4b3b] text-white px-5 py-3 rounded-2xl text-xs font-bold shadow-lg shadow-[#005f49]/30 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Image</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {gallery.map(img => (
          <div key={img.id} className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-sm flex flex-col justify-between">
            <div className="relative aspect-square bg-slate-900">
              <img src={img.image_url} alt={img.caption} className="w-full h-full object-cover" />
              <div className="absolute top-2 left-2 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                {img.category}
              </div>
            </div>

            <div className="p-3.5 space-y-2">
              <p className="text-xs font-bold text-white truncate">{img.caption}</p>
              <span className="text-[10px] text-slate-400 block">{img.destination_name}</span>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                <button
                  onClick={() => toggleGalleryPublish(img.id)}
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                    img.status === 'published' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                  }`}
                >
                  {img.status}
                </button>

                <button
                  onClick={() => deleteGalleryImage(img.id)}
                  className="p-1 text-rose-400 hover:text-rose-300"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-950 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <h3 className="font-bold text-white text-base">Add Photo to Gallery</h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-300">Image URL (JPG / WebP)</label>
                <input
                  type="url"
                  required
                  value={formState.image_url}
                  onChange={(e) => setFormState({ ...formState, image_url: e.target.value })}
                  className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white outline-hidden"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300">Photo Caption</label>
                <input
                  type="text"
                  required
                  value={formState.caption}
                  onChange={(e) => setFormState({ ...formState, caption: e.target.value })}
                  className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white outline-hidden"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300">Destination</label>
                <select
                  value={formState.destination_id}
                  onChange={(e) => setFormState({ ...formState, destination_id: e.target.value })}
                  className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white outline-hidden"
                >
                  {destinations.map(d => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300">Category Tag</label>
                <select
                  value={formState.category}
                  onChange={(e) => setFormState({ ...formState, category: e.target.value })}
                  className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white outline-hidden"
                >
                  <option value="Mountains & Clouds">Mountains & Clouds</option>
                  <option value="Wildlife & Mangrove">Wildlife & Mangrove</option>
                  <option value="Beaches & Oceans">Beaches & Oceans</option>
                  <option value="Lakes & Rivers">Lakes & Rivers</option>
                  <option value="Tea Trails">Tea Trails</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 bg-slate-900 text-slate-400 rounded-xl">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-[#005f49] text-white font-bold rounded-xl">Upload Image</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
