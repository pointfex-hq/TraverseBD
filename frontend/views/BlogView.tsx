'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export interface BlogPostItem {
  id: string;
  title: string;
  excerpt: string;
  category: 'Travel Tips & Checklists' | 'Mountain Expeditions' | 'Wildlife & Eco' | 'Coastal Expeditions';
  readTime: string;
  date: string;
  author: string;
  authorRole: string;
  imageUrl: string;
  keyPoints?: string[];
  contentSections: {
    heading: string;
    body: string;
  }[];
}

const FEATURED_POST: BlogPostItem = {
  id: 'ultimate-sajek-valley-guide-2026',
  title: 'The Ultimate Sajek Valley Guide 2026: Military Convoys, Best Cottages & Cloud Forecasts',
  excerpt:
    'A deep-dive operational handbook for navigating Dighinala military checkpost escorts, reserving top-ridge eco-cottages in Konglak Para, and timing sunrise sea-of-clouds phenomena.',
  category: 'Mountain Expeditions',
  readTime: '8 min read',
  date: 'Jan 18, 2026',
  author: 'Hafizur Rahman',
  authorRole: 'Head of Expedition Safety',
  imageUrl:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuASAT_2ttF1EyaMdO--79s3RjFjm94mRlfHKISQfnmq7WWHgd9o0iMtg-lpW3CQf3X4qHxoeLfrJ0_bHiTuNZBmmTLQH4GYjq5-AMJNJCs_N0zhOWzHZ3UCV5iD3rOcbuyjcmEUFlAMkmL3MP0fg_7iBhHCU_AYFzLfY93y9QOA478jwkysmnbF_JFun5dOJ3FsnnFL0ZqH33k1UD6PpnqZlYuJpO4ms9QR2UvF6RS8',
  keyPoints: [
    'Military convoy timings: Baghaihat checkpost departure strictly at 10:00 AM & 03:00 PM',
    'Konglak Para high-elevation wooden cottages offer 360-degree unobstructed sunrise views',
    'Leave-no-trace hill tract protocol: Carry personal waste back to Khagrachhari hub',
    'Best cloud seasons: Post-monsoon through winter (October to March)',
  ],
  contentSections: [
    {
      heading: '1. Navigating Military Convoy Clearance',
      body: 'Civilian vehicles traveling to Sajek Valley must join the scheduled army-escorted convoy departing from Baghaihat checkpost twice daily (10:00 AM and 03:00 PM). Ensure your driver has up-to-date vehicle fitness documentation and all passengers carry photocopy IDs for swift verification.',
    },
    {
      heading: '2. Selecting Authentic Bamboo & Teak Eco-Cottages',
      body: 'Accommodation in Sajek ranges from basic village homestays to premium timber eco-cottages perched on Helipad 1, Helipad 2, and the Konglak ridge. For optimal cloud vistas, book Konglak ridge properties 3 to 4 weeks in advance, especially during winter weekends.',
    },
    {
      heading: '3. Predicting the Morning Sea of Clouds',
      body: 'The magical cloud blanket forms when nocturnal temperature inversions trap moisture in the valleys below Konglak peak. Optimal viewing occurs between 05:45 AM and 07:15 AM before the morning sun evaporates the cloud deck.',
    },
  ],
};

const BLOG_ARTICLES: BlogPostItem[] = [
  {
    id: 'sajek-valley-packing-checklist',
    title: 'High-Altitude Packing Checklist for Sajek Valley & Keokradong Trails',
    excerpt:
      'Essential gear recommendations, moisture-wicking layers, portable battery banks, and first-aid kits designed for the temperature swings and rugged terrain of the Chittagong Hill Tracts.',
    category: 'Travel Tips & Checklists',
    readTime: '6 min read',
    date: 'Jan 12, 2026',
    author: 'Jannatun Nahar Soha',
    authorRole: 'Safety & Quality Officer',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCHXu_sxkrQ5bg4x1PXJ4JLV4lLgom0g5DvHdfP9yvwko07yQ9a7Wn-cUykN_mJcwxbiyz_S4VGuo3N8neE5rIirRnyxd_cmVuuwHrE0kNRRhfnnQSEXrd-p8mcULbcgYEZ034fPPbyIIDJefWHvjQ7CisFSJFKhsTloL_55mnBOevlYtgMjyqO3MsYKVPZNSnQi8Kx6Z_P12Dbore6hemqSV6RRpFUcz3ld6rMe52Z',
    keyPoints: [
      'Layering is key: 28°C sunny afternoons drop to 14°C windy mountain nights in winter',
      'High-capacity power bank (20,000mAh+) due to intermittent solar power in Konglak',
      'Trekking shoes with deep lug grip for slippery red clay trails and rock steps',
      'Basic medical kit: ORS electrolyte packets, motion sickness tablets for Chander Gari turns',
    ],
    contentSections: [
      {
        heading: 'Mastering Mountain Microclimates',
        body: 'Sajek and Bandarban experience sudden shifts between blazing midday sunshine and chilly, cloud-drenched evenings. Always pack breathable UV-resistant shirts for daytime ridge exploration and a windproof fleece or lightweight down jacket for sunset gazes at Helipad 1.',
      },
      {
        heading: 'Footwear & Power Management',
        body: 'Standard sneakers fail on dew-soaked grassy trails or rocky streams. We recommend trail running shoes or water-drainage sandals with aggressive rubber treads. Because eco-resorts rely on solar panels, charge your gadgets during designated evening generator windows.',
      },
    ],
  },
  {
    id: 'sundarbans-cruise-handbook',
    title: 'Sundarbans Mangrove Cruise Handbook: Eco-Rules & Forest Escorts',
    excerpt:
      'What life on a 3-day expedition vessel feels like deep inside the Kotka and Hiron Point creeks, including armed forest guard protocols and silent canoe tracking.',
    category: 'Wildlife & Eco',
    readTime: '7 min read',
    date: 'Jan 05, 2026',
    author: 'Sifat Mazib',
    authorRole: 'Marine Operations Lead',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD3ltl9s44tZznBR-chQOfzFdlgvz929W8Mv59Lbl7Py1Lr7y6LCvHCfN74TcFjXFUBcWwD7cC4m3HSQ4_xEnvfNGnuYoKEHwy3V1VVL983K7o90EC8kicT3vgAjNbG0mzqFhjISDf2YA_tADVLiqQO6B6_p1PtCtTtM3baPuWe4GiI0YxU0NxOmvoPCiMQdozpgA9V9qywzFe3wycNheWw-0EuOtV_0cDtoW9qivz3',
    keyPoints: [
      'Strict single-use plastic ban across the entire UNESCO Biosphere Reserve',
      'All land trails escorted by two licensed Forest Department armed rangers',
      'Early morning silent country-boat creek cruises offer 90% higher wildlife sightings',
      'Zero cellular reception beyond Mongla Port: pure digital detox experience',
    ],
    contentSections: [
      {
        heading: 'Life on the Waterway Vessels',
        body: 'Traverse BD charter vessels are purpose-built shallow-draft ships designed to navigate narrow creeks without disturbing delicate riverbed ecologies. Cabins are clean, compact, and equipped with modern eco-plumbing and life vests.',
      },
      {
        heading: 'Wildlife Etiquette & Safety Boundaries',
        body: 'During shore excursions at Kotka Beach, Jamtola watchtower, and Harbaria eco-center, all travelers must strictly remain within the ranger perimeter. Bright neon clothing is prohibited; earth tones (olive, khaki, brown) are encouraged to minimize startling wildlife.',
      },
    ],
  },
  {
    id: 'saint-martin-regulations-2026',
    title: 'Saint Martin Island Ferry & Night-Stay Regulations 2026',
    excerpt:
      'Latest government guidelines on ferry permits from Teknaf vs Cox’s Bazar, eco-tax regulations, luggage restrictions, and coral conservation policies.',
    category: 'Coastal Expeditions',
    readTime: '5 min read',
    date: 'Dec 22, 2025',
    author: 'Kazi Azmainur Rahman',
    authorRole: 'Coastal Expeditions Architect',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCronGxuKPy8fONsNSjrm3agcaahqrCdxUKpcuQ9p2biYutpSedPOJNqDpSXBlUiwe8VjJcsv8UJL4DvQ-mYIuuT37S-S_uom6eKXCcP3_RUO7-PkEs8n7nxyyva_VilQGjM4BW9k5m4tXRPv5yl0tzTLsTGTFgEFvROSEQR8NBmOkOsFShNx2LGobEiJR6lVJb5Lagagdb8JPdutMtfE24oY8Aw_5N80NaOn1OcTQq',
    keyPoints: [
      'Daily passenger caps enforced by BIWTA to protect living coral reefs',
      'Registered eco-ferry departures operate from Teknaf Damdamia & Inani Jetway',
      'Night-stay permits require pre-verified registered resort booking vouchers',
      'Severe penalties for harvesting living corals or collecting shells at Chera Dwip',
    ],
    contentSections: [
      {
        heading: 'Understanding New Passenger Quotas',
        body: 'To protect the fragile coral ecology of Saint Martin, the Department of Environment has implemented strict seasonal quotas on daily tourist ship landings. Booking in advance through registered operators like Traverse BD ensures guaranteed boarding passes and legal hotel registration.',
      },
      {
        heading: 'Chera Dwip & Green Turtle Conservation',
        body: 'Chera Dwip is an ecologically critical zone. Motorized vehicles are banned on the island beaches, and travelers are requested to walk or use battery-assisted pedal rickshaws. Night bonfires on turtle nesting shores are strictly forbidden.',
      },
    ],
  },
  {
    id: 'lawachara-rainforest-etiquette',
    title: 'Rainforest Etiquette in Lawachara: How to Spot Hoolock Gibbons',
    excerpt:
      'Silently walking the 30-minute and 3-hour forest loops with local Khasia community guides to witness endangered canopy primates in their natural sanctuary.',
    category: 'Wildlife & Eco',
    readTime: '6 min read',
    date: 'Dec 10, 2025',
    author: 'Hafizur Rahman',
    authorRole: 'Head of Expedition Safety',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBgEKe7tppNfuh1Sbs_v49LQUwlZwoKAX8vUxsYFWIcShtRYia_8P1Ki3u2uJS8yffGLXVgIAwHoAI-X8wBuSbFGQiJM2pa1gtnOSMmSky2KIp46083ecfUbo3AxfnAgytdqp2LsiDq8GB_BBjiSokFAUHsv9Gdl2BYNkMBbvpMaSCI6Xp7lA7qD8BZfX1tZL1hc_Vmb_DsUuNvcg0_MCxAMbCE-uP56rZUoElqAYnY',
    keyPoints: [
      'Opt for the 06:00 AM early morning walk before casual tourist day-trippers arrive',
      'Walk in single-file silence; gibbons move through the uppermost canopy when undisturbed',
      'Hire indigenous Khasia community guides who recognize territory calls',
    ],
    contentSections: [
      {
        heading: 'Canopy Ecology of Sreemangal',
        body: 'Lawachara National Park is home to the largest surviving population of Western Hoolock Gibbons in Bangladesh. Their unmistakable vocal duets echo across the mist-draped canopy at dawn.',
      },
    ],
  },
  {
    id: 'tanguar-haor-houseboat-guide',
    title: 'Tanguar Haor Luxury Houseboat Odyssey: Monsoon Booking Protocols',
    excerpt:
      'A comprehensive guide to sailing the Sunamganj freshwater wetlands on handcrafted wooden houseboats during the high-water monsoon season.',
    category: 'Coastal Expeditions',
    readTime: '6 min read',
    date: 'Nov 30, 2025',
    author: 'Sifat Mazib',
    authorRole: 'Marine Operations Lead',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDG6Dd8IWxXIQCgoGPVK2A8Ew6i30pbuY7-t5XeijXtnU5rXRt5c2p1IM0UDdMn2N9qhAAzssJe0_dENnsWHJVyiKCQjJSckF7qdD4LavWm6ES02sqU8g6bdR-1eAXhtuBF58XZL0C-WICt-Lgmh8CE28v8LLqajnefl-pAGEtStWSJeJYWrDwnZKlZETREg82OMerpo5gSBBUix3xr_qZtGNhcp5ILq_DjhepxhGlF',
    keyPoints: [
      'Peak season is June through September when water levels transform wetlands into an inland sea',
      'Traverse BD premium houseboats feature attached eco-washrooms, solar power, and chef service',
      'Stops include Shimul Bagan, Jadukata River crystal currents, and Niladri Lake',
    ],
    contentSections: [
      {
        heading: 'Monsoon Inland Sea Experience',
        body: 'Floating across Tanguar Haor beneath the sheer blue slopes of the Meghalaya hills is one of the most serene experiences in South Asia. Our vetted houseboats prioritize waste holding tanks to preserve freshwater purity.',
      },
    ],
  },
];

interface BlogViewProps {
  initialBlogs?: any[];
}

export default function BlogView({ initialBlogs = [] }: BlogViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Map dynamic blogs from admin store/database if provided
  const articlesList: BlogPostItem[] =
    initialBlogs.length > 0
      ? initialBlogs.map((b) => {
        let category: BlogPostItem['category'] = 'Travel Tips & Checklists';
        const titleLower = (b.title_en || '').toLowerCase();
        const destLower = (b.destination_slug || '').toLowerCase();

        if (titleLower.includes('mountain') || destLower.includes('sajek') || destLower.includes('bandarban')) {
          category = 'Mountain Expeditions';
        } else if (titleLower.includes('wildlife') || destLower.includes('sundarban') || destLower.includes('sreemangal')) {
          category = 'Wildlife & Eco';
        } else if (titleLower.includes('coast') || titleLower.includes('coral') || destLower.includes('cox') || destLower.includes('saint-martin')) {
          category = 'Coastal Expeditions';
        }

        return {
          id: b.slug || b.id,
          title: b.title_en,
          excerpt: b.excerpt_en,
          category,
          readTime: b.read_time || '5 min read',
          date: b.published_at ? new Date(b.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Nov 2026',
          author: b.author_name || 'Traverse BD Guild',
          authorRole: b.author_role || 'Expedition Guide',
          imageUrl: b.cover_image_url || 'https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?q=80&w=1200&auto=format&fit=crop',
          keyPoints: [
            'Authentic field report curated by Traverse BD expeditions',
            'Verified local logistics, seasonal weather, and travel tips',
          ],
          contentSections: [
            {
              heading: 'Field Overview & Route Logistics',
              body: b.content_en || b.excerpt_en,
            },
          ],
        };
      })
      : BLOG_ARTICLES;

  // Check if an article is explicitly flagged as is_featured in initialBlogs
  const explicitFeatured = initialBlogs.find((b) => b.is_featured);
  let featuredPost = articlesList[0] || FEATURED_POST;
  if (explicitFeatured) {
    const found = articlesList.find((a) => a.id === (explicitFeatured.slug || explicitFeatured.id));
    if (found) featuredPost = found;
  }
  const standardArticles = articlesList.filter((a) => a.id !== featuredPost.id);

  const categories = [
    { key: 'all', label: 'All Articles' },
    { key: 'Travel Tips & Checklists', label: '🎒 Travel Tips & Checklists' },
    { key: 'Mountain Expeditions', label: '⛰️ Mountain Expeditions' },
    { key: 'Wildlife & Eco', label: '🐅 Wildlife & Eco' },
    { key: 'Coastal Expeditions', label: '🌊 Coastal & Marine' },
  ];

  const filteredArticles =
    selectedCategory === 'all'
      ? standardArticles
      : standardArticles.filter((a) => a.category === selectedCategory);

  return (
    <main className="space-y-16 pb-24 bg-surface">
      {/* 1. HERO & FEATURED DISPATCH */}
      <section className="bg-surface-container-low/70 border-b border-surface-container py-14 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
                <span className="material-symbols-outlined text-[16px]">menu_book</span>
                <span>Field Reports & Expert Guides</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-on-surface tracking-tight">
                Traveler Journal, Field Tips & Trail Dispatches
              </h1>
            </div>

            <p className="text-xs text-on-surface-variant max-w-md">
              Authored by certified expedition leaders who navigate the roads, waterways, and mountain ridges of Bangladesh.
            </p>
          </div>

          {/* Featured Post Card */}
          <div className="rounded-3xl bg-surface-container-lowest border border-surface-container overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-0 group">
            <div className="lg:col-span-7 relative h-72 sm:h-96 overflow-hidden bg-surface-container">
              <img
                src={featuredPost.imageUrl}
                alt={featuredPost.title}
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?q=80&w=1200&auto=format&fit=crop';
                }}
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3.5 py-1.5 rounded-full bg-primary text-white text-xs font-bold shadow-md">
                  Featured Trail Guide
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs text-on-surface-variant font-medium">
                  <span>{featuredPost.date}</span>
                  <span>•</span>
                  <span>{featuredPost.readTime}</span>
                </div>
                <h2 className="text-2xl font-black text-on-surface group-hover:text-primary transition-colors leading-snug">
                  {featuredPost.title}
                </h2>
                <p className="text-xs text-on-surface-variant leading-relaxed line-clamp-3">
                  {featuredPost.excerpt}
                </p>
              </div>

              <div className="flex items-center justify-between gap-3 pt-4 border-t border-surface-container flex-wrap">
                <Link
                  href={`/blog/${featuredPost.id}`}
                  className="px-4 py-2 rounded-full bg-primary text-white text-xs font-bold hover:bg-primary/90 transition flex items-center gap-1.5 shrink-0"
                >
                  <span>Read Full Guide</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </Link>
                <span className="text-xs text-on-surface-variant font-medium">
                  By {featuredPost.author}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY PILLS & ARTICLES GRID */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="text-xl font-bold text-on-surface">Explore Field Guides & Articles</h3>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${selectedCategory === cat.key
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
            <Link
              key={article.id}
              href={`/blog/${article.id}`}
              className="group rounded-3xl bg-surface-container-lowest border border-surface-container overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer css-tilt-card"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-white text-[10px] font-bold border border-white/20">
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

                <div className="pt-3 border-t border-surface-container flex items-center justify-between text-xs gap-2 flex-wrap">
                  <span className="text-primary font-bold flex items-center gap-1 group-hover:underline shrink-0">
                    <span>Read Full Guide</span>
                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </span>
                  <span className="text-[11px] text-on-surface-variant truncate">{article.author}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. NEWSLETTER SECTION */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="rounded-3xl bg-surface-container-lowest border border-surface-container p-8 sm:p-12 shadow-sm text-center space-y-4 max-w-3xl mx-auto">
          <span className="material-symbols-outlined text-4xl text-primary">mail</span>
          <h2 className="text-2xl font-bold text-on-surface">
            Get Secret Bangladesh Itineraries in Your Inbox
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
