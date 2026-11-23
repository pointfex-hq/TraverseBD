'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BlogPost } from '@backend/types/database.types';

interface BlogViewProps {
  initialPosts?: BlogPost[];
}

const FEATURED_POST = {
  id: 'featured',
  title: 'The Ultimate Sajek Valley Guide 2025: Chander Gari Routes, Best Cottages, & Cloud Forecasts',
  excerpt:
    'A deep-dive operational handbook for navigating Dighinala military escorts, securing high-elevation wooden eco-cottages in Konglak, and predicting the morning sea of clouds.',
  author: 'Farhan Tanvir',
  authorRole: 'Senior Trail Architect',
  readTime: '8 min read',
  date: 'Nov 18, 2025',
  category: 'Mountain Expeditions',
  imageUrl:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAnuYDuan8V0Jpm3Ds1d5eiZJ_cj1uF2GPT6FxhwsVhDtQl5RXZ_1r4Aa6_7HAhHmYhrwFODaORrgRtclM48nwEPG8mrzz79Azh8hiAVd6uAEoyhgLiGUDAngiMhvFVk1RjmN660gM_PjxCOA-zP9kRAPVsT91ECoKDllUhiLLpxtKX6pbpIJXlhGPfRlUbdlV75npmvb0e6q-XEYDGR-mMjtRIuta0L7YgLnDG7hMp',
};

const BLOG_ARTICLES = [
  {
    id: '1',
    title: 'Navigating the Sundarbans Mangroves: Ship Life & Wildlife Tracking',
    excerpt:
      'What life on a 3-day tourist vessel feels like deep inside the Kotka and Hiron Point creeks, including forest guard protocols.',
    category: 'Wildlife & Eco',
    readTime: '6 min read',
    date: 'Nov 12, 2025',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBYNk7dcb08v4kWfGc1pSbo7bHGVKZ1OJOZEtUiTfV8rdT7iRVeXrkGl-158_S7rFY610tLv0CG6-6vck4qrMGO0QPpaV7KatOoQBH7ZROQx9yRRlz4ipo8ZeOSFuvX4SnaUCFAGryldHfvUXxLZKMSr3-V9il1FAsCL7YupJjSEpq5IDvkc9Jy5fLmb2rDH7AdPB-VcELKSXNAIq-U_AWwc6FukbFr_wKNj0v4G_Aa',
  },
  {
    id: '2',
    title: 'Saint Martin Ship Travel Regulations: 2025 Updated Schedule',
    excerpt:
      'Latest government guidelines on ferry permits from Teknaf vs Coxs Bazar, eco-tax regulations, and night-stay availability.',
    category: 'Coastal Getaways',
    readTime: '5 min read',
    date: 'Nov 05, 2025',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCronGxuKPy8fONsNSjrm3agcaahqrCdxUKpcuQ9p2biYutpSedPOJNqDpSXBlUiwe8VjJcsv8UJL4DvQ-mYIuuT37S-S_uom6eKXCcP3_RUO7-PkEs8n7nxyyva_VilQGjM4BW9k5m4tXRPv5yl0tzTLsTGTFgEFvROSEQR8NBmOkOsFShNx2LGobEiJR6lVJb5Lagagdb8JPdutMtfE24oY8Aw_5N80NaOn1OcTQq',
  },
  {
    id: '3',
    title: 'Rainforest Etiquette in Lawachara: How to Spot Hoolock Gibbons',
    excerpt:
      'Silently walking the 30-minute and 3-hour forest loops with local Khasia community guides to witness endangered canopy primates.',
    category: 'Wildlife & Eco',
    readTime: '7 min read',
    date: 'Oct 28, 2025',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBgEKe7tppNfuh1Sbs_v49LQUwlZwoKAX8vUxsYFWIcShtRYia_8P1Ki3u2uJS8yffGLXVgIAwHoAI-X8wBuSbFGQiJM2pa1gtnOSMmSky2KIp46083ecfUbo3AxfnAgytdqp2LsiDq8GB_BBjiSokFAUHsv9Gdl2BYNkMBbvpMaSCI6Xp7lA7qD8BZfX1tZL1hc_Vmb_DsUuNvcg0_MCxAMbCE-uP56rZUoElqAYnY',
  },
];

export default function BlogView() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { key: 'all', label: 'All Dispatches' },
    { key: 'Mountain Expeditions', label: 'Mountain Expeditions' },
    { key: 'Wildlife & Eco', label: 'Wildlife & Eco' },
    { key: 'Coastal Getaways', label: 'Coastal Getaways' },
  ];

  const filteredArticles =
    selectedCategory === 'all'
      ? BLOG_ARTICLES
      : BLOG_ARTICLES.filter((a) => a.category === selectedCategory);

  return (
    <main className="space-y-16 pb-20">
      {/* 1. HERO & FEATURED DISPATCH (Stitch Blog Layout) */}
      <section className="bg-surface-container-low/70 border-b border-surface-container py-12 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
                <span className="material-symbols-outlined text-[16px]">menu_book</span>
                <span>Field Reports & Guides</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-on-surface tracking-tight">
                Traveler Journal & Expert Field Guides
              </h1>
            </div>

            <p className="text-xs text-on-surface-variant max-w-md">
              Written by on-ground trip architects who spend weeks navigating the roads, waterways, and trails of Bangladesh.
            </p>
          </div>

          {/* Featured Post Card */}
          <div className="rounded-3xl bg-surface-container-lowest border border-surface-container overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-0 group">
            <div className="lg:col-span-7 relative h-72 sm:h-96 overflow-hidden">
              <img
                src={FEATURED_POST.imageUrl}
                alt={FEATURED_POST.title}
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3.5 py-1.5 rounded-full bg-primary text-white text-xs font-bold shadow-md">
                  Featured Guide
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs text-on-surface-variant font-medium">
                  <span className="text-primary font-bold">{FEATURED_POST.category}</span>
                  <span>•</span>
                  <span>{FEATURED_POST.readTime}</span>
                  <span>•</span>
                  <span>{FEATURED_POST.date}</span>
                </div>

                <h2 className="text-xl sm:text-2xl font-extrabold text-on-surface tracking-tight leading-snug group-hover:text-primary transition-colors">
                  {FEATURED_POST.title}
                </h2>

                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  {FEATURED_POST.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-surface-container flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                    FT
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-on-surface">{FEATURED_POST.author}</h4>
                    <p className="text-[11px] text-on-surface-variant">{FEATURED_POST.authorRole}</p>
                  </div>
                </div>

                <Link
                  href="/packages?destination=sajek-valley"
                  className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary/90 transition flex items-center gap-1 shadow-sm"
                >
                  <span>Explore Tours</span>
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY PILLS & ARTICLES GRID */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="text-xl font-bold text-on-surface">Latest Trail Dispatches</h3>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  selectedCategory === cat.key
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container border border-surface-container'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              className="group rounded-3xl bg-surface-container-lowest border border-surface-container overflow-hidden shadow-sm hover:shadow-glass-hover transition-all duration-300 flex flex-col"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-white text-[10px] font-bold border border-white/20">
                    {article.category}
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[11px] text-on-surface-variant font-medium">
                    <span>{article.date}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>

                  <h4 className="text-base font-bold text-on-surface group-hover:text-primary transition-colors leading-snug">
                    {article.title}
                  </h4>

                  <p className="text-xs text-on-surface-variant line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-surface-container flex items-center justify-between text-xs">
                  <span className="text-primary font-bold flex items-center gap-1 group-hover:underline">
                    <span>Read Guide</span>
                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. NEWSLETTER SECTION */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="rounded-3xl bg-surface-container-lowest border border-surface-container p-8 sm:p-12 shadow-sm text-center space-y-4 max-w-3xl mx-auto">
          <span className="material-symbols-outlined text-4xl text-primary">mail</span>
          <h2 className="text-2xl font-bold text-on-surface">
            Get Secret Itineraries in Your Inbox
          </h2>
          <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
            Bi-weekly seasonal weather updates, newly discovered camping ridges, and early-bird departure dates across Bangladesh.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert('Thank you for subscribing to Traverse BD Travel Dispatches!');
            }}
            className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto pt-2"
          >
            <input
              type="email"
              required
              placeholder="Enter your email address"
              className="flex-1 px-4 py-2.5 rounded-xl bg-surface-container-low text-xs border border-surface-container-high focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary/90 transition shadow-sm"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
