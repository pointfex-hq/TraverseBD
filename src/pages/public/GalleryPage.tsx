import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ImageLightbox } from '../../components/ImageLightbox';
import { Camera, MapPin, Tag, ZoomIn } from 'lucide-react';

export const GalleryPage: React.FC = () => {
  const { publishedGallery } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'Mountains & Clouds', label: 'Mountains & Clouds' },
    { id: 'Wildlife & Mangrove', label: 'Wildlife & Mangrove' },
    { id: 'Beaches & Oceans', label: 'Beaches & Oceans' },
    { id: 'Lakes & Rivers', label: 'Lakes & Houseboats' },
    { id: 'Tea Trails', label: 'Tea Trails' },
  ];

  const filteredImages = selectedCategory === 'all'
    ? publishedGallery
    : publishedGallery.filter(img => img.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-bold text-[#005f49] uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full">
          Visual Journey
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Visual Chronicles Across Bengal
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          High-resolution moments from our field expeditions: mist-laden highland ridges, tidal estuaries, and coral atolls.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {categories.map(c => (
          <button
            key={c.id}
            onClick={() => setSelectedCategory(c.id)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              selectedCategory === c.id
                ? 'bg-[#005f49] text-white shadow-md shadow-[#005f49]/20'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Image Grid with Responsive Masonry/Grid (FR-07) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredImages.map((img, idx) => (
          <div
            key={img.id}
            onClick={() => setLightboxIndex(idx)}
            className="group relative aspect-square rounded-3xl overflow-hidden bg-slate-100 cursor-pointer shadow-xs hover:shadow-xl transition-all duration-300"
          >
            <img
              src={img.image_url}
              alt={img.caption}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-5 flex flex-col justify-end text-white">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full">
                  {img.category || 'Expedition'}
                </span>
                <ZoomIn className="w-4 h-4 text-emerald-300" />
              </div>
              <h4 className="text-xs font-bold line-clamp-2">{img.caption}</h4>
              {img.destination_name && (
                <p className="text-[11px] text-emerald-300 font-medium flex items-center gap-1 mt-1">
                  <MapPin className="w-3 h-3" />
                  <span>{img.destination_name}</span>
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Component */}
      <ImageLightbox
        images={filteredImages}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(idx) => setLightboxIndex(idx)}
      />
    </div>
  );
};
