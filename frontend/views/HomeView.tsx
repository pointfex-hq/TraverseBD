'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Package, Destination } from '@backend/types/database.types';
import { MOCK_TESTIMONIALS } from '@backend/services/testimonials.service';
import { SiteSettings } from '@backend/data/admin-mock-data';

interface HomeViewProps {
  packages?: (Package & {
    destination?: { name_en?: string; name_bn?: string };
    category?: { slug?: string; name_en?: string; name_bn?: string };
  })[];
  destinations?: Destination[];
  siteSettings?: SiteSettings;
}

export default function HomeView({ packages = [], destinations = [], siteSettings }: HomeViewProps) {
  const router = useRouter();

  // Search Hub State
  const [activeSearchTab, setActiveSearchTab] = useState<'packages' | 'ship' | 'bus' | 'hotel' | 'air'>('packages');
  const [searchDestination, setSearchDestination] = useState('saintmartin');
  const [searchDate, setSearchDate] = useState('2025-11-20');
  const [searchTravelers, setSearchTravelers] = useState('2 Persons (Twin Share)');

  // Trending Packages Category Filter Tab
  const [activeCategoryTab, setActiveCategoryTab] = useState<'all' | 'domestic' | 'international' | 'hills' | 'coastal' | 'mangroves'>('all');

  // Quick Callback Form State
  const [callbackName, setCallbackName] = useState('');
  const [callbackPhone, setCallbackPhone] = useState('');
  const [callbackTour, setCallbackTour] = useState('Sajek Valley Expedition');
  const [callbackSuccess, setCallbackSuccess] = useState(false);

  const phoneDisplay = siteSettings?.phone_hotline || '01627444330';
  const phoneTel = `tel:${phoneDisplay}`;
  const whatsappNumber = siteSettings?.whatsapp_number || '8801627444330';

  // Handle Search Hub Submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (activeSearchTab === 'packages') {
      const destinationParam =
        searchDestination === 'sajek'
          ? 'sajek-valley'
          : searchDestination === 'saintmartin'
            ? 'saint-martins-island'
            : searchDestination === 'sundarbans'
              ? 'sundarbans'
              : searchDestination === 'cox'
                ? 'coxs-bazar'
                : searchDestination === 'sylhet'
                  ? 'sreemangal-tea-valleys'
                  : searchDestination === 'bandarban'
                    ? 'bandarban-nilgiri'
                    : searchDestination;

      router.push(`/packages?destination=${destinationParam}`);
    } else {
      const serviceName =
        activeSearchTab === 'ship'
          ? 'Ship Ticket'
          : activeSearchTab === 'bus'
            ? 'Bus Ticket'
            : activeSearchTab === 'hotel'
              ? 'Hotel & Resort'
              : 'Air Ticket';

      const msg = `Hello Traverse BD! I would like to inquire about booking a ${serviceName}.
Destination: ${searchDestination}
Date: ${searchDate}
Travelers: ${searchTravelers}`;

      window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
    }
  };

  // Handle Callback Request Form Submit
  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!callbackName.trim() || !callbackPhone.trim()) return;

    setCallbackSuccess(true);
    const msg = `Hello Traverse BD! I submitted a Callback Request.
*Name:* ${callbackName}
*Phone:* ${callbackPhone}
*Requested Tour:* ${callbackTour}`;

    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');

    setTimeout(() => {
      setCallbackName('');
      setCallbackPhone('');
      setCallbackSuccess(false);
    }, 5000);
  };

  // Trending Packages Definition (Domestic & International)
  const TRENDING_PACKAGES = [
    {
      id: 'p1',
      slug: 'sajek-valley-cloud-kingdom',
      title: 'Sajek Valley Cloud Kingdom Escape',
      desc: 'Konglak Para summit hike, Chander Gari 4x4 safari, night bonfire, and premium eco-cottage stay above the morning sea of clouds.',
      badge: 'Bestseller',
      badgeColor: 'bg-primary/90 text-on-primary',
      tourType: 'domestic',
      duration: '3D / 2N',
      rating: '4.95',
      reviews: '142',
      price: 'BDT 7,500',
      category: 'hills',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDufpxjs_5zr3Wi7B0GaO36BUsFRbRR5jRrbeEDzG_eBe0EBeZ_z3Dz5n4K8tHaRCKYjspVEbwlnrCOKcXg-PXFEuva_Aieha3JRRIsCC4D-N_-DKShRgAcH8gVyKIRkhsX1kEr3ITw_Ui_aM1-AYYkDI8YQZmmNl3wEnG8nwFXuXhnFUcLWM3VtDBVxLdiYG0mESdmUp2ZZPj1jRe7OfrLcjpLh2HBTj1Sn69cIjHn',
    },
    {
      id: 'p2',
      slug: 'saint-martin-coral-cruise',
      title: 'Saint Martin Coral Island & Ship Cruise',
      desc: 'Luxury cruise ship tickets, Chhera Dwip speedboat exploration, oceanfront BBQ dinners, and turquoise beach relaxation.',
      badge: 'Limited Seats',
      badgeColor: 'bg-tertiary/90 text-on-tertiary',
      tourType: 'domestic',
      duration: '4D / 3N',
      rating: '4.98',
      reviews: '210',
      price: 'BDT 9,200',
      category: 'coastal',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAtPHh2iaz5X9KmvXNLkCUmO933HB1CY580l3wazkJoj3Gvec3OBvEjYhkOJ0q5-vjrguFJSP7vaJacV8a_c4uLCvm4np0xphq7ZA9fPh-OSj2YBTU_DKGEQw_4uCjRAJS8CNiaoGSz8SD0Y5scBH0iZNL6UqtOXHRLXvgFPvMe4J6lymyO3cksqPznEb0oAjYZqKBvU-5_EDkHCJkYSTmuBHPp--4WEkJJSHlevDB2',
    },
    {
      id: 'p3',
      slug: 'sundarbans-deep-mangrove-safari',
      title: 'Sundarbans Deep Mangrove Safari',
      desc: 'Kotka and Kochikhali wildlife sanctuaries, armed forest guard escorts, watchtower animal spotting, and river vessel living.',
      badge: 'Wildlife Cruise',
      badgeColor: 'bg-primary-container/90 text-on-primary-container',
      tourType: 'domestic',
      duration: '3D / 2N',
      rating: '4.89',
      reviews: '98',
      price: 'BDT 14,500',
      category: 'mangroves',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjT_pnxFxdfXSa2pzu7OXs0U-bmGNzRudYJMQVCUchgH_o2z9Bha9kiE0ow_JBS_Hs8eX7PNWOgHVGux9BKsyca9RYfUV-tVNFpN9fmQAL8Alcm9akYpkiudmV6HkULyPSSlINOx4BpiA6AuTefsE7CnnreYeQPxcmuVzvZzGIKWsHcNvYgZPUrC6uOFruxEKcKihvkkSNR4m5ChJAPQ29rJChArsCUl0bkaa7ll6x',
    },
    {
      id: 'p4',
      slug: 'coxs-bazar-marine-drive-retreat',
      title: 'Cox’s Bazar Marine Drive Retreat',
      desc: 'Moonlit marine drive cruise, Inani coral reef exploration, authentic Rakhine seafood, and beachfront resort comfort.',
      badge: 'Coastal Classic',
      badgeColor: 'bg-primary-container text-on-primary',
      tourType: 'domestic',
      duration: '4D / 3N',
      rating: '4.91',
      reviews: '210',
      price: 'BDT 8,500',
      category: 'coastal',
      img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 'p5',
      slug: 'sreemangal-tea-rainforest',
      title: 'Sreemangal Tea Estates & Rainforest Sanctuary',
      desc: 'Early morning Lawachara national park walk to spot endangered Hoolock gibbons, Baikka Beel bird sanctuary, and 7-layer tea.',
      badge: 'Eco Sanctuary',
      badgeColor: 'bg-emerald-700 text-white',
      tourType: 'domestic',
      duration: '3D / 2N',
      rating: '4.93',
      reviews: '142',
      price: 'BDT 8,000',
      category: 'mangroves',
      img: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 'p6',
      slug: 'bandarban-nilgiri-peak',
      title: 'Bandarban Nilgiri Peak & Cloud Horizon',
      desc: 'Nilachal golden sunset, Chimbuk mountain range, tribal culinary feast, and high-altitude 4WD hill thrill across Bandarban.',
      badge: 'Adventure Peak',
      badgeColor: 'bg-tertiary/90 text-on-tertiary',
      tourType: 'domestic',
      duration: '4D / 3N',
      rating: '4.94',
      reviews: '180',
      price: 'BDT 8,900',
      category: 'hills',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4Myk9PkUAMX8n2z_xmJmLF52fVP0DwIYfpdUsuZDjVJNtosppWj0XbXEGOSAERnX926ZpvaLoAyrmZ64twFxEFDwZ69c7lYI4sXVLg_FhNz3U7pzi4DqggpNEa9HKVvUmsEf2gDGiKw6kYHqCFxlk_fyufvqRLkz12eoeKGE6WaEB4x1OlSBao6Ec5BJK0t547efka4eSdbH3g_kClEYFWEpgqUvkCHMsHnlvo5Ys',
    },
  ];

  // Dynamic packages mapping from Admin/Database, fallback to static defaults if empty
  const dynamicPackages = packages.length > 0
    ? packages.map((pkg) => {
        const catSlug = (pkg.category?.slug || '').toLowerCase();
        const pSlug = (pkg.slug || '').toLowerCase();
        let mappedCat: 'hills' | 'coastal' | 'mangroves' = 'hills';
        if (catSlug.includes('coastal') || catSlug.includes('beach') || pSlug.includes('saint-martin') || pSlug.includes('cox')) {
          mappedCat = 'coastal';
        } else if (catSlug.includes('mangrove') || catSlug.includes('wildlife') || catSlug.includes('sundarban') || pSlug.includes('sundarban') || pSlug.includes('tea') || pSlug.includes('sreemangal')) {
          mappedCat = 'mangroves';
        }

        const priceFormatted = pkg.price_bdt ? `BDT ${pkg.price_bdt.toLocaleString()}` : 'Contact for Price';
        const ratingFormatted = '4.95';
        const reviewsCount = '120';
        const durationFormatted = `${pkg.duration_days || 3}D / ${pkg.duration_nights || 2}N`;
        const badgeText = pkg.is_featured ? 'Bestseller' : 'Signature Tour';
        const badgeColor = pkg.is_featured ? 'bg-primary/90 text-on-primary' : 'bg-tertiary/90 text-on-tertiary';

        return {
          id: pkg.id,
          slug: pkg.slug,
          title: pkg.title_en || 'Signature Tour',
          desc: pkg.short_description_en || 'Konglak Para summit hike, Chander Gari 4x4 safari, night bonfire, and premium eco-cottage stay above the morning sea of clouds.',
          badge: badgeText,
          badgeColor,
          tourType: 'domestic',
          duration: durationFormatted,
          rating: ratingFormatted,
          reviews: reviewsCount,
          price: priceFormatted,
          category: mappedCat,
          img: pkg.cover_image_url || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop',
        };
      })
    : TRENDING_PACKAGES;

  const filteredTrendingPackages =
    activeCategoryTab === 'all'
      ? dynamicPackages
      : dynamicPackages.filter((p) => p.category === activeCategoryTab);

  return (
    <main className="w-full bg-surface">
      {/* HERO SECTION */}
      <section
        className="relative w-full overflow-hidden bg-cover bg-center py-16 md:py-24"
        style={{
          backgroundImage:
            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDufpxjs_5zr3Wi7B0GaO36BUsFRbRR5jRrbeEDzG_eBe0EBeZ_z3Dz5n4K8tHaRCKYjspVEbwlnrCOKcXg-PXFEuva_Aieha3JRRIsCC4D-N_-DKShRgAcH8gVyKIRkhsX1kEr3ITw_Ui_aM1-AYYkDI8YQZmmNl3wEnG8nwFXuXhnFUcLWM3VtDBVxLdiYG0mESdmUp2ZZPj1jRe7OfrLcjpLh2HBTj1Sn69cIjHn')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-surface/95 via-surface/85 to-surface/40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-surface/20 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Hero Text */}
            <div className="lg:col-span-8 flex flex-col gap-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel shadow-sm w-fit border border-white/60">
                <span className="material-symbols-outlined text-primary text-[18px]">explore</span>
                <span className="text-xs uppercase tracking-wider text-secondary font-bold">
                  Premier Travel Specialist of Bangladesh &amp; Beyond
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold text-on-surface tracking-tight leading-[1.12]">
                {siteSettings?.hero_title ? (
                  siteSettings.hero_title
                ) : (
                  <>
                    Discover the Untamed Beauty of{' '}
                    <span className="text-primary underline decoration-primary-fixed decoration-wavy decoration-2">
                      Bengal
                    </span>{' '}
                    &amp; Beyond
                  </>
                )}
              </h1>

              <p className="text-base sm:text-lg text-on-surface-variant max-w-2xl font-normal leading-relaxed">
                {siteSettings?.hero_subtitle ||
                  'Customized corporate retreats, student adventures, luxury mangrove houseboats, and international gateway tours crafted for lifelong memories across riverways, cloud peaks, and marine horizons.'}
              </p>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl glass-panel shadow-sm border border-white/70">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-[22px]">groups</span>
                  </div>
                  <div>
                    <span className="text-base font-bold text-on-surface block leading-tight">
                      {siteSettings?.stat_travelers || '15,000+'}
                    </span>
                    <span className="text-xs text-on-surface-variant font-medium">Happy Travelers</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl glass-panel shadow-sm border border-white/70">
                  <div className="w-10 h-10 rounded-xl bg-tertiary/10 text-tertiary flex items-center justify-center">
                    <span className="material-symbols-outlined text-[22px]">star</span>
                  </div>
                  <div>
                    <span className="text-base font-bold text-on-surface block leading-tight">
                      {siteSettings?.stat_rating || '4.9 / 5.0'}
                    </span>
                    <span className="text-xs text-on-surface-variant font-medium">Verified Rating</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl glass-panel shadow-sm border border-white/70">
                  <div className="w-10 h-10 rounded-xl bg-primary-container/10 text-primary-container flex items-center justify-center">
                    <span className="material-symbols-outlined text-[22px]">verified_user</span>
                  </div>
                  <div>
                    <span className="text-base font-bold text-on-surface block leading-tight">
                      {siteSettings?.stat_certified || '100% Certified'}
                    </span>
                    <span className="text-xs text-on-surface-variant font-medium">Guides &amp; Safety</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Hero Featured Highlight Card */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative w-full max-w-sm rounded-3xl overflow-hidden glass-panel p-3.5 shadow-xl border border-white/80 group">
                <div className="relative h-60 w-full rounded-2xl overflow-hidden">
                  <img
                    alt="Saint Martin Coral Bay"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCM2x8rjAbfJ96Au-izTIVK4SiGyz8NH-S9t-nMVV2ZgbmW27-mqRquN9Iyk93kThRdiW--zP7zefec7oWjA11JFylFaa5aE-c6sQmNzOzWChSFMgOSmS5uAcHVC6bSb8gFPJ_nBEdZMr9-_jzBbrt42wcnuWksPucCvvJfIVmhvP0R_lLv0GgU2WjKd397-Y0o8YLvo1l33cTBMJn3T2mK9wcdWIvp5Z9oPIVPNHYA"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/85 via-inverse-surface/20 to-transparent" />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-primary/80 backdrop-blur-md text-on-primary text-[11px] font-bold uppercase tracking-wider">
                    Featured Haven
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 text-surface-bright flex items-end justify-between">
                    <div>
                      <h3 className="font-bold text-lg text-white">Saint Martin Coral Bay</h3>
                      <p className="text-xs text-primary-fixed-dim">Daily Luxury Ship Departure</p>
                    </div>
                    <span className="px-3 py-1 rounded-xl bg-surface-container-lowest/95 backdrop-blur-md text-primary font-bold text-sm shadow">
                      BDT 9,200
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between px-2 pt-3 pb-1 text-xs text-on-surface-variant font-medium">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-primary text-[16px]">location_on</span>
                    Dhaka • Cox • Saint Martin
                  </span>
                  <Link
                    href="/packages/saint-martin-coral-cruise"
                    className="text-secondary font-bold uppercase hover:underline"
                  >
                    4D / 3N Tour
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Glassmorphism Multi-Service Search Hub */}
          <div className="w-full glass-panel rounded-3xl shadow-xl p-5 md:p-7 mt-10 border border-white/80">
            {/* Category Tabs */}
            <div className="flex flex-wrap items-center gap-2 pb-4 mb-4 border-b border-surface-container-highest/60">
              <button
                type="button"
                onClick={() => setActiveSearchTab('packages')}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all ${activeSearchTab === 'packages'
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                  }`}
              >
                <span className="material-symbols-outlined text-[17px]">backpack</span>
                <span>Tour Packages</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveSearchTab('ship')}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all ${activeSearchTab === 'ship'
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                  }`}
              >
                <span className="material-symbols-outlined text-[17px]">directions_boat</span>
                <span>Ship Ticket</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveSearchTab('bus')}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all ${activeSearchTab === 'bus'
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                  }`}
              >
                <span className="material-symbols-outlined text-[17px]">directions_bus</span>
                <span>Bus Ticket</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveSearchTab('hotel')}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all ${activeSearchTab === 'hotel'
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                  }`}
              >
                <span className="material-symbols-outlined text-[17px]">hotel</span>
                <span>Hotel &amp; Resort</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveSearchTab('air')}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all ${activeSearchTab === 'air'
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                  }`}
              >
                <span className="material-symbols-outlined text-[17px]">flight</span>
                <span>Air Ticket</span>
              </button>
            </div>

            {/* Search Form Grid */}
            <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
              {/* Destination Field */}
              <div className="flex flex-col gap-1 px-4 py-2.5 rounded-2xl bg-surface-container-low border border-surface-container">
                <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider flex items-center gap-1">
                  <span className="material-symbols-outlined text-primary text-[15px]">location_on</span> Destination
                </span>
                <select
                  value={searchDestination}
                  onChange={(e) => setSearchDestination(e.target.value)}
                  className="bg-transparent font-semibold text-sm text-on-surface outline-none cursor-pointer"
                >
                  <option value="sajek">Sajek Valley - Valley of Clouds</option>
                  <option value="saintmartin">Saint Martin - Coral Paradise</option>
                  <option value="sundarbans">Sundarbans - Mangrove Safaris</option>
                  <option value="cox">Cox&apos;s Bazar - 120km Sea Beach</option>
                  <option value="sylhet">Sreemangal &amp; Sylhet Tea Gardens</option>
                  <option value="bandarban">Bandarban &amp; Nilgiri Summit</option>
                </select>
              </div>

              {/* Date Selector */}
              <div className="flex flex-col gap-1 px-4 py-2.5 rounded-2xl bg-surface-container-low border border-surface-container">
                <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider flex items-center gap-1">
                  <span className="material-symbols-outlined text-secondary text-[15px]">calendar_today</span> Departure Date
                </span>
                <input
                  type="date"
                  value={searchDate}
                  onChange={(e) => setSearchDate(e.target.value)}
                  className="bg-transparent font-semibold text-sm text-on-surface outline-none cursor-pointer"
                />
              </div>

              {/* Travelers */}
              <div className="flex flex-col gap-1 px-4 py-2.5 rounded-2xl bg-surface-container-low border border-surface-container">
                <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider flex items-center gap-1">
                  <span className="material-symbols-outlined text-tertiary text-[15px]">group</span> Travelers
                </span>
                <select
                  value={searchTravelers}
                  onChange={(e) => setSearchTravelers(e.target.value)}
                  className="bg-transparent font-semibold text-sm text-on-surface outline-none cursor-pointer"
                >
                  <option value="2 Persons (Twin Share)">2 Persons (Twin Share)</option>
                  <option value="Family (4-6 Persons)">Family (4-6 Persons)</option>
                  <option value="Corporate Group (10+)">Corporate Group (10+)</option>
                  <option value="Solo Traveler">Solo Traveler</option>
                </select>
              </div>

              {/* Action Button */}
              <div className="h-full flex items-end">
                <button
                  type="submit"
                  className="w-full h-[58px] rounded-2xl bg-primary hover:bg-primary-container text-on-primary font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(0,95,73,0.25)] hover:shadow-[0_12px_28px_rgba(0,95,73,0.35)] transition-all transform active:scale-95"
                >
                  <span className="material-symbols-outlined text-[22px]">search</span>
                  <span>{activeSearchTab === 'packages' ? 'Explore Journeys' : 'Book on WhatsApp'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* 3. OUR SERVICES QUICK-BAR */}
      <section className="w-full py-12 px-6 lg:px-12 bg-surface-container-lowest border-y border-outline-variant/20" id="services-section">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold text-secondary uppercase tracking-wider block mb-1">
                Mobility &amp; Hospitality Suite
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
                Our Services
              </h2>
            </div>
            <p className="text-sm text-on-surface-variant max-w-md">
              Custom charters, scenic coastal cruisers, luxury sleeper coaches, and hotel reservations backed by 24/7 on-ground assistance.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 sm:gap-4">
            {/* 1. Corporate Tour */}
            <a
              href="#booking-inquiry"
              className="flex flex-col items-center text-center p-4 rounded-2xl bg-surface-container-low hover:bg-primary/5 border border-transparent hover:border-primary/20 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-2.5 group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined text-[24px]">domain</span>
              </div>
              <span className="font-bold text-sm text-on-surface">Corporate Tours</span>
              <span className="text-xs text-on-surface-variant font-medium">Team Retreats</span>
            </a>

            {/* 2. Customized Tour */}
            <a
              href="#booking-inquiry"
              className="flex flex-col items-center text-center p-4 rounded-2xl bg-surface-container-low hover:bg-secondary/5 border border-transparent hover:border-secondary/20 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center mb-2.5 group-hover:bg-secondary group-hover:text-on-secondary transition-colors">
                <span className="material-symbols-outlined text-[24px]">tune</span>
              </div>
              <span className="font-bold text-sm text-on-surface">Customized Tours</span>
              <span className="text-xs text-on-surface-variant font-medium">Private Groups</span>
            </a>

            {/* 3. Student Tour */}
            <a
              href="#booking-inquiry"
              className="flex flex-col items-center text-center p-4 rounded-2xl bg-surface-container-low hover:bg-tertiary/5 border border-transparent hover:border-tertiary/20 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-tertiary/10 text-tertiary flex items-center justify-center mb-2.5 group-hover:bg-tertiary group-hover:text-on-tertiary transition-colors">
                <span className="material-symbols-outlined text-[24px]">school</span>
              </div>
              <span className="font-bold text-sm text-on-surface">Student Trips</span>
              <span className="text-xs text-on-surface-variant font-medium">Youth Expeditions</span>
            </a>

            {/* 4. Ship Ticket */}
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hello Traverse BD! I need assistance booking Cruise & Ship Tickets.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center text-center p-4 rounded-2xl bg-surface-container-low hover:bg-primary/5 border border-transparent hover:border-primary/20 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary-container/10 text-primary-container flex items-center justify-center mb-2.5 group-hover:bg-primary-container group-hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined text-[24px]">directions_boat</span>
              </div>
              <span className="font-bold text-sm text-on-surface">Ship Tickets</span>
              <span className="text-xs text-on-surface-variant font-medium">Island Ferries</span>
            </a>

            {/* 5. Bus Ticket */}
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hello Traverse BD! I need assistance booking Intercity Bus Tickets.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center text-center p-4 rounded-2xl bg-surface-container-low hover:bg-secondary/5 border border-transparent hover:border-secondary/20 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-secondary-fixed-dim/30 text-secondary flex items-center justify-center mb-2.5 group-hover:bg-secondary group-hover:text-on-secondary transition-colors">
                <span className="material-symbols-outlined text-[24px]">directions_bus</span>
              </div>
              <span className="font-bold text-sm text-on-surface">Bus Tickets</span>
              <span className="text-xs text-on-surface-variant font-medium">Luxury Coaches</span>
            </a>

            {/* 6. Hotel Booking */}
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hello Traverse BD! I need assistance with Hotel and Resort reservations.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center text-center p-4 rounded-2xl bg-surface-container-low hover:bg-primary/5 border border-transparent hover:border-primary/20 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-2.5 group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined text-[24px]">hotel</span>
              </div>
              <span className="font-bold text-sm text-on-surface">Hotel Bookings</span>
              <span className="text-xs text-on-surface-variant font-medium">Verified Stays</span>
            </a>

            {/* 7. Air Ticket */}
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hello Traverse BD! I need domestic or international Air Tickets.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center text-center p-4 rounded-2xl bg-surface-container-low hover:bg-tertiary/5 border border-transparent hover:border-tertiary/20 transition-all group col-span-2 sm:col-span-1"
            >
              <div className="w-12 h-12 rounded-xl bg-tertiary-container/10 text-tertiary-container flex items-center justify-center mb-2.5 group-hover:bg-tertiary-container group-hover:text-on-tertiary transition-colors">
                <span className="material-symbols-outlined text-[24px]">airplane_ticket</span>
              </div>
              <span className="font-bold text-sm text-on-surface">Flight Tickets</span>
              <span className="text-xs text-on-surface-variant font-medium">Air Fares</span>
            </a>
          </div>
        </div>
      </section>

      {/* 4. TRENDING PACKAGES (DOMESTIC & INTERNATIONAL) */}
      <section className="w-full py-16 px-6 lg:px-12 bg-surface" id="packages-section">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-fixed/50 text-on-primary-fixed text-xs font-bold uppercase tracking-wider mb-2">
                <span className="material-symbols-outlined text-[15px]">stars</span> Handcrafted Escapes
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-on-surface tracking-tight">
                Trending Packages
              </h2>
              <p className="text-sm sm:text-base text-on-surface-variant mt-1 max-w-xl">
                Handcrafted signature itineraries loved by thousands across coastal tides, misted hill peaks, and ancient mangrove rivers.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveCategoryTab('all')}
                className={`filter-btn px-4 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm ${activeCategoryTab === 'all'
                  ? 'active bg-primary text-white'
                  : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
                  }`}
              >
                All Journeys
              </button>
              <button
                type="button"
                onClick={() => setActiveCategoryTab('hills')}
                className={`filter-btn px-4 py-1.5 rounded-full text-xs font-bold transition-all ${activeCategoryTab === 'hills'
                  ? 'active bg-primary text-white shadow-sm'
                  : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
                  }`}
              >
                Hills &amp; Mountains
              </button>
              <button
                type="button"
                onClick={() => setActiveCategoryTab('coastal')}
                className={`filter-btn px-4 py-1.5 rounded-full text-xs font-bold transition-all ${activeCategoryTab === 'coastal'
                  ? 'active bg-primary text-white shadow-sm'
                  : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
                  }`}
              >
                Coastal &amp; Islands
              </button>
              <button
                type="button"
                onClick={() => setActiveCategoryTab('mangroves')}
                className={`filter-btn px-4 py-1.5 rounded-full text-xs font-bold transition-all ${activeCategoryTab === 'mangroves'
                  ? 'active bg-primary text-white shadow-sm'
                  : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
                  }`}
              >
                Mangroves &amp; Wildlife
              </button>
            </div>
          </div>

          {/* 6 Featured Package Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredTrendingPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="css-tilt-card glass-card rounded-3xl overflow-hidden flex flex-col shadow-sm border border-white/70"
              >
                <div className="relative h-56 w-full overflow-hidden">
                  <img
                    alt={pkg.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    src={pkg.img}
                  />
                  <span
                    className={`absolute top-3 left-3 px-3 py-1 rounded-full backdrop-blur-md text-xs font-bold shadow-sm ${pkg.badgeColor}`}
                  >
                    {pkg.badge}
                  </span>
                  <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-on-surface text-xs font-bold shadow-sm flex items-center gap-1">
                    <span className="material-symbols-outlined text-secondary text-[14px]">schedule</span> {pkg.duration}
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-1 justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-1 text-tertiary mb-1.5 text-xs font-semibold">
                      <span className="material-symbols-outlined text-[16px]">star</span>
                      <span className="text-on-surface font-bold">{pkg.rating}</span>
                      <span className="text-on-surface-variant font-normal">({pkg.reviews} reviews)</span>
                    </div>
                    <h3 className="text-lg font-bold text-on-surface">{pkg.title}</h3>
                    <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">
                      {pkg.desc}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-surface-container-high/60">
                    <div>
                      <span className="text-[11px] text-on-surface-variant block uppercase font-medium">Starting from</span>
                      <span className="text-xl font-extrabold text-primary">{pkg.price}</span>
                    </div>
                    <Link
                      className="px-4 py-2 rounded-full bg-primary hover:bg-primary-container text-on-primary text-xs font-bold transition-all shadow-sm"
                      href={`/packages/${pkg.slug}`}
                    >
                      View Itinerary
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-8">
            <Link
              href="/packages"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-surface-container-high hover:bg-primary hover:text-white text-on-surface text-xs font-bold transition shadow-sm"
            >
              <span>Explore All Tour Packages</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. CUSTOMER REVIEWS & TRAVELER TESTIMONIALS */}
      <section className="w-full py-16 px-6 lg:px-12 bg-surface-container-lowest border-y border-outline-variant/20">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container/40 text-on-secondary-container text-xs font-bold uppercase tracking-wider mb-2">
                <span className="material-symbols-outlined text-[15px]">sentiment_very_satisfied</span> Verified Feedback
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-on-surface tracking-tight">
                Loved by 15,000+ Happy Travelers
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-amber-500 text-lg">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <span className="text-xs font-extrabold text-on-surface">4.95 / 5.0 Rating</span>
              <span className="text-outline-variant">•</span>
              <span className="text-xs text-on-surface-variant font-medium">1,200+ Verified Post-Trip Surveys</span>
            </div>
          </div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {MOCK_TESTIMONIALS.map((review) => (
              <div
                key={review.id}
                className="p-6 rounded-3xl bg-surface-container-low border border-surface-container flex flex-col justify-between gap-5 hover:border-primary/30 transition shadow-sm"
              >
                <div className="space-y-3">
                  {/* Rating Stars */}
                  <div className="flex items-center justify-between">
                    <div className="flex text-amber-500 text-sm">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                    </div>
                    {review.verified && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold">
                        <span className="material-symbols-outlined text-[12px]">verified</span> Verified
                      </span>
                    )}
                  </div>

                  {/* Review Text */}
                  <p className="text-xs text-on-surface-variant leading-relaxed italic">
                    &ldquo;{review.quote}&rdquo;
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-3 border-t border-surface-container-high/60 space-y-2">
                  <div className="flex items-center gap-3">
                    <img
                      src={review.avatarUrl}
                      alt={review.name}
                      className="w-10 h-10 rounded-full object-cover border border-outline-variant/30"
                    />
                    <div>
                      <h4 className="font-bold text-xs text-on-surface">{review.name}</h4>
                      <p className="text-[10px] text-on-surface-variant">{review.role} • {review.location}</p>
                    </div>
                  </div>
                  <div className="text-[10px] text-primary font-semibold truncate">
                    Tour: {review.package_title}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. 'WHY CHOOSE US' (THE TRAVERSE BD PROMISE) */}
      <section className="w-full py-16 px-6 lg:px-12 bg-surface-container-low/60" id="why-choose-us">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container/40 text-on-secondary-container text-xs font-bold uppercase tracking-wider mb-2">
              The Traverse BD Promise
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-on-surface tracking-tight">
              Why Choose Traverse BD
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mt-2">
              Combining authentic hospitality, certified local expertise, and precision logistical execution across domestic and international expeditions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-panel p-6 rounded-3xl shadow-sm hover:shadow-md transition-all flex flex-col items-start border border-white/80">
              <div className="w-12 h-12 rounded-2xl bg-primary text-on-primary flex items-center justify-center mb-4 shadow-sm">
                <span className="material-symbols-outlined text-[26px]">verified_user</span>
              </div>
              <h3 className="font-bold text-base text-on-surface mb-2">Verified Guides &amp; Security First</h3>
              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                100% certified local guides, authorized mountain 4x4 drivers, and full medical first-aid readiness on all trails.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-3xl shadow-sm hover:shadow-md transition-all flex flex-col items-start border border-white/80">
              <div className="w-12 h-12 rounded-2xl bg-secondary text-on-secondary flex items-center justify-center mb-4 shadow-sm">
                <span className="material-symbols-outlined text-[26px]">receipt_long</span>
              </div>
              <h3 className="font-bold text-base text-on-surface mb-2">100% Transparent Pricing</h3>
              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                Zero hidden surcharges. All-inclusive quotes covering tickets, permits, food, and eco-resort stays with verified contracts.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-3xl shadow-sm hover:shadow-md transition-all flex flex-col items-start border border-white/80">
              <div className="w-12 h-12 rounded-2xl bg-tertiary text-on-tertiary flex items-center justify-center mb-4 shadow-sm">
                <span className="material-symbols-outlined text-[26px]">support_agent</span>
              </div>
              <h3 className="font-bold text-base text-on-surface mb-2">24/7 Logistics Concierge</h3>
              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                Direct hotline (<a className="text-tertiary font-bold hover:underline" href={phoneTel}>{phoneDisplay}</a>) &amp; live WhatsApp dispatch during flights, ferries, and hilly transit.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-3xl shadow-sm hover:shadow-md transition-all flex flex-col items-start border border-white/80">
              <div className="w-12 h-12 rounded-2xl bg-primary-container text-on-primary flex items-center justify-center mb-4 shadow-sm">
                <span className="material-symbols-outlined text-[26px]">eco</span>
              </div>
              <h3 className="font-bold text-base text-on-surface mb-2">Eco-Conscious Tourism</h3>
              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                We empower indigenous mountain &amp; river communities, minimize plastic waste, and preserve historical ecosystems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. VISUAL NARRATIVES GALLERY */}
      <section className="w-full py-16 px-6 lg:px-12 bg-surface" id="gallery-section">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold text-secondary uppercase tracking-wider block">
                Visual Field Narratives
              </span>
              <h2 className="text-3xl font-extrabold text-on-surface tracking-tight mt-0.5">
                Snapshots from the Field
              </h2>
            </div>
            <Link
              className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:text-primary-container transition-colors"
              href="/gallery"
            >
              <span>Explore Full Gallery &amp; Stories</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="relative h-64 rounded-2xl overflow-hidden group shadow-sm">
              <img
                alt="Floating Guava Market Barisal"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBiaFmv9mApEOzimZAgNlLQSAPmpmCWC3JBsQeOTITSMHAqdrmky5KrxKTl7P_pJRE_zAsmpwUXI3QTqx9PYkGdkuAnFi8S2FvM-ZGapUJgeB0mtauoq8GuwRb2gYXunqinVv4YpaW_79E36PVt8-Jz94-mu5oFfP4PcsKNhseGvDCxuxkHJDOdDSIquSl-R89JJlUDKeOwrHQLTbf4uF0i5-iZnprnlWkO6Zp-hzc6"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 text-white">
                <span className="text-[10px] uppercase font-bold text-primary-fixed tracking-wider">Barisal</span>
                <p className="font-bold text-sm">Floating Guava Market</p>
              </div>
            </div>

            <div className="relative h-64 rounded-2xl overflow-hidden group shadow-sm">
              <img
                alt="Sajek Rangamati Valley"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRlsOENXotdw5MKvQusue3JoavwYbh9GdceLyts5jBELAzjaIz2jCvswI-myUeLImSqjl6ZvoQsRQOWIaKJruMpdtHqQS-2KS6DwpqrQixnkxeXePn7NPFk4MjM80xSPLvSYfPmZV0OuY3mXfJq2j2f-VKKCl-0K8b1d8EmJ162j_C1t-P7exEkg-MlEHrD5r2ZL4LS5mBFTPsuObjN7puIF1GSj_V1gjQNHUw7bLO"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 text-white">
                <span className="text-[10px] uppercase font-bold text-secondary-fixed tracking-wider">Rangamati</span>
                <p className="font-bold text-sm">Helipad Cloudscape</p>
              </div>
            </div>

            <div className="relative h-64 rounded-2xl overflow-hidden group shadow-sm">
              <img
                alt="Chhera Dwip Reef"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnnrHmpEVaCCk0zg0lrl9BJP-op2OSC4G2sGY_C0BNdeunUf1LinZ5g0-W24DyS-8VU8MLrHLnHIOY8lA25Q5WxkOhK2zt2HJ4yPcDoZgBEmSzb4I1nPVx3RiujKYmzYGpX7a2YT6wWuhvojIT0HWvAAA_LlmOM7MU1TlzY1j0NQORm3rBiEmLSvTJ2P1CenoJ6nVA0ndde7QhhMN5pu2O_BssJJpuBEkpvxysT1vN"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 text-white">
                <span className="text-[10px] uppercase font-bold text-tertiary-fixed-dim tracking-wider">Bay of Bengal</span>
                <p className="font-bold text-sm">Chhera Dwip Reef</p>
              </div>
            </div>

            <div className="relative h-64 rounded-2xl overflow-hidden group shadow-sm">
              <img
                alt="Sundarbans Wildlife Trail"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvQ1lDOh6ygvJnCEVAeBptTBpOcJo-CknNkSAoEzQjTndsYlCn55xoh_ATBMrH37AXeLIN4pvywjv3AhKr88XYkiEpfDLNhiR-ajlPZu9bUX-Bjz6DKEPiNPIiom4yK8w43hJGRfSOnwtszVGeP6LjmUg9bnXeRZqnve4BmUYUcROLiD93oLe2Z-Sa9l1LEJm03eLhMqXjdoY3O_o5XUmq0irPJ2F17p_O49YkofLD"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 text-white">
                <span className="text-[10px] uppercase font-bold text-primary-fixed tracking-wider">Khulna</span>
                <p className="font-bold text-sm">Kotka Wildlife Canal</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. BOOKING INQUIRY BANNER & QUICK CALLBACK REQUEST */}
      <section className="w-full py-16 px-6 lg:px-12 bg-surface-container-low" id="booking-inquiry">
        <div className="max-w-5xl mx-auto bg-primary rounded-3xl p-8 md:p-12 text-on-primary shadow-2xl relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-on-primary-container/15 blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <span className="px-3 py-1 rounded-full bg-on-primary-container/20 text-on-primary-container text-xs font-bold uppercase tracking-wider inline-block mb-3">
                Instant Inquiry &amp; Custom Itinerary
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-on-primary tracking-tight">
                Ready to Traverse Bangladesh?
              </h2>
              <p className="text-sm sm:text-base text-on-primary-container/90 mt-2 leading-relaxed">
                Speak directly with our senior travel planner for customized family holidays, university excursions, corporate charters, or immediate flight, ship &amp; bus ticketing.
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-6">
                <a
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-primary font-bold text-sm shadow-md hover:bg-surface-container-low transition-all"
                  href={phoneTel}
                >
                  <span className="material-symbols-outlined text-[18px]">call</span>
                  <span>{phoneDisplay}</span>
                </a>
                <a
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-on-primary-container/20 hover:bg-on-primary-container/30 text-on-primary font-bold text-sm transition-all border border-on-primary-container/30"
                  href={`https://wa.me/${whatsappNumber}`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="material-symbols-outlined text-[18px]">chat</span>
                  <span>WhatsApp Us</span>
                </a>
              </div>
            </div>

            {/* Quick Request Card */}
            <div className="w-full lg:w-80 p-5 rounded-2xl bg-surface-container-lowest text-on-surface shadow-xl">
              <span className="font-bold text-base text-on-surface block mb-3">Quick Callback Request</span>
              {callbackSuccess ? (
                <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 text-primary text-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-bold">
                    <span className="material-symbols-outlined text-base">check_circle</span>
                    <span>Request Submitted!</span>
                  </div>
                  <p className="text-on-surface-variant text-[11px]">
                    Our travel consultant will call you back within 15 minutes.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleCallbackSubmit} className="space-y-3">
                  <input
                    value={callbackName}
                    onChange={(e) => setCallbackName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-surface-container-low text-xs sm:text-sm outline-none focus:ring-2 focus:ring-primary/40 border border-outline-variant/30"
                    placeholder="Your Name"
                    required
                    type="text"
                  />
                  <input
                    value={callbackPhone}
                    onChange={(e) => setCallbackPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-surface-container-low text-xs sm:text-sm outline-none focus:ring-2 focus:ring-primary/40 border border-outline-variant/30"
                    placeholder="Phone Number (e.g. 017...)"
                    required
                    type="tel"
                  />
                  <select
                    value={callbackTour}
                    onChange={(e) => setCallbackTour(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-surface-container-low text-xs sm:text-sm outline-none border border-outline-variant/30 cursor-pointer"
                  >
                    <option value="Sajek Valley Expedition">Sajek Valley Expedition</option>
                    <option value="Saint Martin Cruise">Saint Martin Coral Cruise</option>
                    <option value="Sundarbans Houseboat">Sundarbans Mangrove Houseboat</option>
                    <option value="Cox's Bazar Tour">Cox&apos;s Bazar Coastal Retreat</option>
                    <option value="Kashmir Winter Tour">Kashmir &amp; Gulmarg Snow Tour</option>
                    <option value="Thailand Island Hopper">Thailand Bangkok &amp; Phuket Tour</option>
                    <option value="Corporate Custom Charter">Corporate Custom Charter</option>
                  </select>
                  <button
                    className="w-full py-2.5 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-bold text-xs sm:text-sm transition-all shadow-md active:scale-95"
                    type="submit"
                  >
                    Request Itinerary
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 9. FLOATING STICKY ACTION BUTTONS */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        {/* WhatsApp Button */}
        <a
          aria-label="WhatsApp Support"
          className="relative group w-12 h-12 rounded-full bg-surface-container-lowest/95 backdrop-blur-md shadow-[0_8px_24px_rgba(0,95,73,0.22)] flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300 hover:scale-105 border border-primary/20"
          href={`https://wa.me/${whatsappNumber}`}
          rel="noopener noreferrer"
          target="_blank"
        >
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-primary" />
          </span>
          <span className="material-symbols-outlined text-[24px]">chat</span>
        </a>

        {/* Messenger Button */}
        <a
          aria-label="Facebook Messenger"
          className="relative group w-12 h-12 rounded-full bg-surface-container-lowest/95 backdrop-blur-md shadow-[0_8px_24px_rgba(0,88,134,0.22)] flex items-center justify-center text-tertiary hover:bg-tertiary hover:text-white transition-all duration-300 hover:scale-105 border border-tertiary/20"
          href="https://m.me/traversebd"
          rel="noopener noreferrer"
          target="_blank"
        >
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary opacity-75" />
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-tertiary" />
          </span>
          <span className="material-symbols-outlined text-[24px]">forum</span>
        </a>
      </div>
    </main>
  );
}
