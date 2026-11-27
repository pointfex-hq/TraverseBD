'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BlogItem } from '@backend/data/admin-mock-data';

interface BlogDetailViewProps {
  blog: BlogItem;
  relatedBlogs?: BlogItem[];
  phoneHotline?: string;
  whatsappNumber?: string;
}

export default function BlogDetailView({
  blog,
  relatedBlogs = [],
  phoneHotline = '01627-444330',
  whatsappNumber = '8801627444330',
}: BlogDetailViewProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const formattedDate = blog.published_at
    ? new Date(blog.published_at).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Recent Dispatch';

  const authorName = blog.author_name || 'Traverse BD Guild';
  const authorRole = blog.author_role || 'Certified Expedition Guide';

  const paragraphs = (blog.content_en || blog.excerpt_en || '')
    .split('\n\n')
    .map((p) => p.trim())
    .filter(Boolean);

  const gallery = Array.isArray(blog.gallery_images)
    ? blog.gallery_images.filter((img) => img && img.trim().length > 0).slice(0, 5)
    : [];

  const whatsappMessage = encodeURIComponent(
    `Hello Traverse BD! I read your field guide "${blog.title_en}" and would like to inquire about planning an itinerary.`
  );

  return (
    <main className="w-full min-h-screen bg-surface">
      {/* 1. BREADCRUMBS & TOP BAR */}
      <div className="w-full border-b border-surface-container bg-surface-container-lowest/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between text-xs text-on-surface-variant font-medium">
          <nav className="flex items-center gap-2 flex-wrap">
            <Link href="/" className="hover:text-primary transition">
              Home
            </Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-primary transition">
              Field Journals
            </Link>
            <span>/</span>
            <span className="text-on-surface font-semibold truncate max-w-[200px] sm:max-w-sm">
              {blog.title_en}
            </span>
          </nav>
          <Link
            href="/blog"
            className="hidden sm:inline-flex items-center gap-1 text-primary font-bold hover:underline"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>All Articles</span>
          </Link>
        </div>
      </div>

      {/* 2. ARTICLE HEADER & HERO */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 pb-16 space-y-8">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {blog.destination_slug && (
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-bold uppercase tracking-wider text-[11px]">
                {blog.destination_slug.replace('-', ' ')}
              </span>
            )}
            <span className="text-on-surface-variant">•</span>
            <span className="text-on-surface-variant">{formattedDate}</span>
            <span className="text-on-surface-variant">•</span>
            <span className="text-on-surface-variant">{blog.read_time || '5 min read'}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-on-surface tracking-tight leading-tight">
            {blog.title_en}
          </h1>

          <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed font-medium">
            {blog.excerpt_en}
          </p>

          {/* Author Badge */}
          <div className="flex items-center justify-between pt-2 border-t border-surface-container">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-black text-sm">
                {authorName.charAt(0)}
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-on-surface">{authorName}</p>
                <p className="text-[11px] text-on-surface-variant">{authorRole}</p>
              </div>
            </div>

            <a
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-sm"
            >
              <span className="material-symbols-outlined text-[16px]">chat</span>
              <span className="hidden sm:inline">Ask on WhatsApp</span>
              <span className="sm:hidden">WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Featured Cover Image */}
        <div className="relative aspect-video w-full rounded-3xl overflow-hidden shadow-lg border border-surface-container bg-surface-container">
          <img
            src={blog.cover_image_url}
            alt={blog.title_en}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?q=80&w=1200&auto=format&fit=crop';
            }}
          />
        </div>

        {/* 3. FULL ARTICLE CONTENT */}
        <div className="prose prose-slate max-w-none space-y-6 pt-4 text-on-surface text-sm sm:text-base leading-relaxed">
          {paragraphs.map((para, i) => (
            <p key={i} className="text-on-surface/90 font-normal leading-relaxed">
              {para}
            </p>
          ))}
        </div>

        {/* 4. MULTI-PHOTO GALLERY (UP TO 5 PHOTOS) */}
        {gallery.length > 0 && (
          <div className="pt-8 border-t border-surface-container space-y-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-2">
                <span className="material-symbols-outlined text-[15px]">photo_camera</span>
                Visual Field Journal
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-on-surface">
                Photo Gallery ({gallery.length} Images)
              </h2>
              <p className="text-xs text-on-surface-variant mt-1">
                Captured during authentic on-ground scouting and traveler journeys. Tap any image to enlarge.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {gallery.map((imgUrl, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedPhoto(imgUrl)}
                  className={`relative rounded-2xl overflow-hidden cursor-pointer shadow-sm border border-surface-container group ${
                    idx === 0 && gallery.length >= 3 ? 'sm:col-span-2 aspect-video' : 'aspect-[4/3]'
                  }`}
                >
                  <img
                    src={imgUrl}
                    alt={`${blog.title_en} photo ${idx + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="material-symbols-outlined text-white text-2xl drop-shadow">
                      zoom_in
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. CALL TO ACTION RETREAT CARD */}
        <div className="p-6 sm:p-8 rounded-3xl bg-surface-container-low border border-surface-container space-y-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 shadow-sm">
          <div className="space-y-1 max-w-xl">
            <h3 className="text-lg sm:text-xl font-bold text-on-surface">
              Ready to Experience This Expedition Firsthand?
            </h3>
            <p className="text-xs sm:text-sm text-on-surface-variant">
              Traverse BD provides end-to-end trip planning, verified vehicle transit, certified local guides, and top-rated accommodation buyouts across Bangladesh.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`tel:${phoneHotline}`}
              className="px-4 py-2.5 rounded-full border border-primary text-primary font-bold text-xs sm:text-sm hover:bg-primary/5 transition flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[18px]">call</span>
              <span>{phoneHotline}</span>
            </a>
            <Link
              href="/packages"
              className="px-5 py-2.5 rounded-full bg-primary hover:bg-primary-container text-on-primary font-bold text-xs sm:text-sm transition shadow-md"
            >
              View Tour Packages
            </Link>
          </div>
        </div>

        {/* 6. RELATED FIELD GUIDES */}
        {relatedBlogs.length > 0 && (
          <div className="pt-8 border-t border-surface-container space-y-6">
            <h3 className="text-xl font-bold text-on-surface">More From Our Travel Journals</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relatedBlogs.map((b) => (
                <Link
                  key={b.id}
                  href={`/blog/${b.slug}`}
                  className="p-4 rounded-2xl bg-surface-container-lowest border border-surface-container hover:border-primary/40 transition flex gap-4 group"
                >
                  <img
                    src={b.cover_image_url}
                    alt={b.title_en}
                    className="w-24 h-24 rounded-xl object-cover shrink-0"
                  />
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-primary uppercase">
                      {b.read_time || '5 min read'}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-on-surface group-hover:text-primary transition line-clamp-2 leading-snug">
                      {b.title_en}
                    </h4>
                    <p className="text-[11px] text-on-surface-variant line-clamp-2">
                      {b.excerpt_en}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>

      {/* LIGHTBOX MODAL */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
        >
          <div className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl">
            <img src={selectedPhoto} alt="Enlarged" className="w-full h-auto max-h-[85vh] object-contain" />
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-3 right-3 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
