import React, { useEffect } from 'react';
import { GalleryImage } from '../types';
import { X, ChevronLeft, ChevronRight, MapPin, Tag } from 'lucide-react';

interface ImageLightboxProps {
  images: GalleryImage[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const ImageLightbox: React.FC<ImageLightboxProps> = ({
  images,
  currentIndex,
  onClose,
  onNavigate,
}) => {
  if (currentIndex === null || !images[currentIndex]) return null;
  const current = images[currentIndex];

  // Keyboard navigation (Escape, ArrowLeft, ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') {
        onNavigate((currentIndex - 1 + images.length) % images.length);
      }
      if (e.key === 'ArrowRight') {
        onNavigate((currentIndex + 1) % images.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, images.length, onClose, onNavigate]);

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-8 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="flex items-center justify-between text-white max-w-6xl mx-auto w-full z-10">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-slate-400">
            {currentIndex + 1} / {images.length}
          </span>
          {current.category && (
            <span className="bg-white/10 text-emerald-300 text-xs px-2.5 py-1 rounded-full flex items-center gap-1">
              <Tag className="w-3 h-3" />
              {current.category}
            </span>
          )}
        </div>

        <button
          onClick={onClose}
          className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          title="Close (Esc)"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Image Stage */}
      <div className="relative flex-1 flex items-center justify-center max-w-6xl mx-auto w-full my-4">
        {/* Previous Button */}
        <button
          onClick={() => onNavigate((currentIndex - 1 + images.length) % images.length)}
          className="absolute left-2 sm:-left-6 p-3 rounded-full bg-black/40 hover:bg-black/80 text-white backdrop-blur-md transition-all hover:scale-110 z-10"
          title="Previous Image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <img
          src={current.image_url}
          alt={current.caption}
          className="max-h-[75vh] max-w-full object-contain rounded-2xl shadow-2xl"
        />

        {/* Next Button */}
        <button
          onClick={() => onNavigate((currentIndex + 1) % images.length)}
          className="absolute right-2 sm:-right-6 p-3 rounded-full bg-black/40 hover:bg-black/80 text-white backdrop-blur-md transition-all hover:scale-110 z-10"
          title="Next Image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Bottom Caption */}
      <div className="max-w-2xl mx-auto text-center text-white space-y-1.5 z-10">
        <h4 className="text-base sm:text-lg font-bold text-slate-100">
          {current.caption}
        </h4>
        {current.destination_name && (
          <p className="text-xs text-emerald-400 font-medium flex items-center justify-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            <span>{current.destination_name}</span>
          </p>
        )}
      </div>
    </div>
  );
};
