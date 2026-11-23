'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import PackageCard from '@frontend/components/packages/PackageCard';
import DestinationCard from '@frontend/components/destinations/DestinationCard';
import SearchBar from '@frontend/components/shared/SearchBar';
import { Package, Destination } from '@backend/types/database.types';

interface HomeViewProps {
  packages: (Package & {
    destination?: { name_en?: string; name_bn?: string };
    category?: { slug?: string; name_en?: string; name_bn?: string };
  })[];
  destinations: Destination[];
}

export default function HomeView({ packages, destinations }: HomeViewProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const defaultWaNumber = process.env.NEXT_PUBLIC_DEFAULT_WHATSAPP_NUMBER || '8801700000000';
  const customTourWaUrl = `https://wa.me/${defaultWaNumber}?text=${encodeURIComponent(
    'Hello Traverse BD! I would like to plan a customized tour in Bangladesh.'
  )}`;

  const filteredPackages =
    activeCategory === 'all'
      ? packages
      : packages.filter((p) => p.category?.slug === activeCategory);

  return (
    <main className="space-y-16 pb-20 overflow-hidden">
      {/* 1. HERO SECTION (Identical to Stitch Demo) */}
      <section
        className="relative w-full overflow-hidden bg-cover bg-center py-16 md:py-24"
        style={{
          backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDufpxjs_5zr3Wi7B0GaO36BUsFRbRR5jRrbeEDzG_eBe0EBeZ_z3Dz5n4K8tHaRCKYjspVEbwlnrCOKcXg-PXFEuva_Aieha3JRRIsCC4D-N_-DKShRgAcH8gVyKIRkhsX1kEr3ITw_Ui_aM1-AYYkDI8YQZmmNl3wEnG8nwFXuXhnFUcLWM3VtDBVxLdiYG0mESdmUp2ZZPj1jRe7OfrLcjpLh2HBTj1Sn69cIjHn')`,
        }}
      >
        {/* High-performance CSS Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-surface/95 via-surface/85 to-surface/40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-surface/20 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Hero Text */}
            <div className="lg:col-span-8 flex flex-col gap-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel shadow-sm w-fit border border-white/60">
                <span className="material-symbols-outlined text-primary text-[18px]">explore</span>
                <span className="text-xs uppercase tracking-wider text-secondary font-bold">
                  Premier Travel Specialist of Bangladesh
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold text-on-surface tracking-tight leading-[1.12]">
                Discover the Untamed Beauty of{' '}
                <span className="text-primary underline decoration-primary-fixed decoration-wavy decoration-2">
                  Bengal
                </span>{' '}
                & Beyond
              </h1>

              <p className="text-base sm:text-lg text-on-surface-variant max-w-2xl font-normal leading-relaxed">
                Customized corporate tours, student adventures, luxury mangrove houseboats & seamless transit ticketing crafted for lifelong memories across riverways, cloud peaks, and marine horizons.
              </p>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl glass-panel shadow-sm border border-white/70">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-[22px]">groups</span>
                  </div>
                  <div>
                    <span className="text-base font-bold text-on-surface block leading-tight">15,000+</span>
                    <span className="text-xs text-on-surface-variant font-medium">Happy Travelers</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl glass-panel shadow-sm border border-white/70">
                  <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center">
                    <span className="material-symbols-outlined text-[22px]">verified</span>
                  </div>
                  <div>
                    <span className="text-base font-bold text-on-surface block leading-tight">100%</span>
                    <span className="text-xs text-on-surface-variant font-medium">Transparent Pricing</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl glass-panel shadow-sm border border-white/70">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[22px]">support_agent</span>
                  </div>
                  <div>
                    <span className="text-base font-bold text-on-surface block leading-tight">24/7</span>
                    <span className="text-xs text-on-surface-variant font-medium">Logistics Concierge</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Hero Featured Island Card */}
            <div className="lg:col-span-4 hidden lg:block">
              <div className="glass-card p-4 rounded-3xl border border-white/80 shadow-card-lift css-tilt-card space-y-4">
                <div className="relative h-64 rounded-2xl overflow-hidden">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtPHh2iaz5X9KmvXNLkCUmO933HB1CY580l3wazkJoj3Gvec3OBvEjYhkOJ0q5-vjrguFJSP7vaJacV8a_c4uLCvm4np0xphq7ZA9fPh-OSj2YBTU_DKGEQw_4uCjRAJS8CNiaoGSz8SD0Y5scBH0iZNL6UqtOXHRLXvgFPvMe4J6lymyO3cksqPznEb0oAjYZqKBvU-5_EDkHCJkYSTmuBHPp--4WEkJJSHlevDB2"
                    alt="Saint Martin Island"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur font-bold text-xs text-primary shadow-sm flex items-center gap-1">
                    <span className="text-amber-500">★</span> 4.9 (128)
                  </div>
                  <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-black/50 backdrop-blur text-white text-xs font-semibold">
                    3 Days / 2 Nights
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-secondary uppercase tracking-wider">
                      Coral Paradise
                    </span>
                    <strong className="text-primary font-extrabold text-lg">৳11,000</strong>
                  </div>
                  <h3 className="font-extrabold text-base text-on-surface">
                    Saint Martin Coral Bay Cruise
                  </h3>
                  <p className="text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
                    Ocean ship tickets, beachfront resort stay, and guided Chera Dwip excursion.
                  </p>
                </div>

                <Link
                  href="/packages/saint-martin-coral-cruise"
                  className="block text-center w-full py-2.5 bg-primary hover:bg-primary-container text-white text-xs font-bold rounded-xl shadow-sm transition"
                >
                  Explore Package
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FLOATING SEARCH BAR COMPONENT */}
      <div className="-mt-10 relative z-20 max-w-5xl mx-auto px-6">
        <SearchBar />
      </div>

      {/* 2. SERVICES SECTION (আমাদের সেবাসমূহ) */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 space-y-6 pt-6">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <span className="text-xs uppercase font-extrabold tracking-wider text-secondary">
            End-to-End Travel Logistics
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
            আমাদের সেবাসমূহ (Our Services)
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-card p-6 rounded-3xl border border-surface-container-high space-y-3 hover:border-primary/40 transition">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">business_center</span>
            </div>
            <h3 className="font-extrabold text-base text-on-surface">Corporate & Team Retreats</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Complete logistics, team bonding workshops, and private resort takeovers in Cox's Bazar and Sylhet.
            </p>
          </div>

          <div className="glass-card p-6 rounded-3xl border border-surface-container-high space-y-3 hover:border-primary/40 transition">
            <div className="w-12 h-12 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">diversity_1</span>
            </div>
            <h3 className="font-extrabold text-base text-on-surface">Family & Student Adventures</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Safe, affordable Chander Gari mountain tours with verified stays and 24/7 dedicated local coordinators.
            </p>
          </div>

          <div className="glass-card p-6 rounded-3xl border border-surface-container-high space-y-3 hover:border-primary/40 transition">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">sailing</span>
            </div>
            <h3 className="font-extrabold text-base text-on-surface">Mangrove Houseboat Safaris</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Exclusive AC tourist vessels into the UNESCO Sundarbans with armed forest rangers and naturalist guides.
            </p>
          </div>

          <div className="glass-card p-6 rounded-3xl border border-surface-container-high space-y-3 hover:border-primary/40 transition">
            <div className="w-12 h-12 rounded-2xl bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">hotel</span>
            </div>
            <h3 className="font-extrabold text-base text-on-surface">Verified Hotel & Transit</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Direct partnerships with eco-cottages, AC bus operators, and Saint Martin ship cruises without markups.
            </p>
          </div>
        </div>
      </section>

      {/* 3. TRENDING TOUR PACKAGES (Stitch Demo Grid) */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase font-extrabold tracking-wider text-secondary">
              Handpicked Expeditions
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight mt-1">
              Trending Packages
            </h2>
          </div>

          {/* Category Filter Tabs from Stitch Demo */}
          <div className="flex flex-wrap gap-2">
            {[
              { slug: 'all', label: 'All Packages' },
              { slug: 'hill-mountain', label: 'Hill Tracts' },
              { slug: 'beach-coastal', label: 'Marine Beach' },
              { slug: 'forest-wildlife', label: 'Mangrove Forest' },
              { slug: 'heritage-culture', label: 'Haors & Tea' },
            ].map((tab) => (
              <button
                key={tab.slug}
                onClick={() => setActiveCategory(tab.slug)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition ${
                  activeCategory === tab.slug
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-white border border-surface-container-high text-on-surface hover:bg-surface-container-low'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Packages Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>

        <div className="text-center pt-2">
          <Link
            href="/packages"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-surface-container hover:bg-primary hover:text-white text-on-surface text-xs font-bold transition shadow-sm"
          >
            <span>Explore All 24+ Packages</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>
      </section>

      {/* 4. WHY CHOOSE TRAVERSE BD (আমাদের বৈশিষ্ট্য) */}
      <section className="bg-surface-container-low py-16 border-y border-surface-container-high">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs uppercase font-extrabold tracking-wider text-primary">
              Our Commitment
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
              আমাদের বৈশিষ্ট্য (Why Choose Traverse BD)
            </h2>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              We stand apart through authentic local relationships, zero hidden markups, and human WhatsApp coordination.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-surface-container-high shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-primary-fixed flex items-center justify-center text-on-primary-fixed">
                <span className="material-symbols-outlined text-2xl">verified_user</span>
              </div>
              <h3 className="font-extrabold text-base text-on-surface">Verified Guides & Security</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Licensed hill drivers, army checkpost coordination, and certified forest rangers for every deep trail.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-surface-container-high shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed">
                <span className="material-symbols-outlined text-2xl">payments</span>
              </div>
              <h3 className="font-extrabold text-base text-on-surface">100% Transparent Pricing</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Fixed or starting-from quotes in whole BDT. What you see is exactly what you pay.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-surface-container-high shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed">
                <span className="material-symbols-outlined text-2xl">chat</span>
              </div>
              <h3 className="font-extrabold text-base text-on-surface">24/7 Logistics Concierge</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Direct WhatsApp assistance from the moment you inquire until you safely return home.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-surface-container-high shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">eco</span>
              </div>
              <h3 className="font-extrabold text-base text-on-surface">Eco-Conscious Tourism</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Direct economic benefit to indigenous community lodges and sustainable eco-cottages.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SNAPSHOTS FROM THE FIELD (Stitch Demo Gallery) */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs uppercase font-extrabold tracking-wider text-secondary">
              Travel Photography
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight mt-1">
              Snapshots from the Field
            </h2>
          </div>
          <Link href="/gallery" className="text-xs font-bold text-primary hover:underline">
            View Full Gallery →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDufpxjs_5zr3Wi7B0GaO36BUsFRbRR5jRrbeEDzG_eBe0EBeZ_z3Dz5n4K8tHaRCKYjspVEbwlnrCOKcXg-PXFEuva_Aieha3JRRIsCC4D-N_-DKShRgAcH8gVyKIRkhsX1kEr3ITw_Ui_aM1-AYYkDI8YQZmmNl3wEnG8nwFXuXhnFUcLWM3VtDBVxLdiYG0mESdmUp2ZZPj1jRe7OfrLcjpLh2HBTj1Sn69cIjHn', title: 'Sajek Valley' },
            { img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAtPHh2iaz5X9KmvXNLkCUmO933HB1CY580l3wazkJoj3Gvec3OBvEjYhkOJ0q5-vjrguFJSP7vaJacV8a_c4uLCvm4np0xphq7ZA9fPh-OSj2YBTU_DKGEQw_4uCjRAJS8CNiaoGSz8SD0Y5scBH0iZNL6UqtOXHRLXvgFPvMe4J6lymyO3cksqPznEb0oAjYZqKBvU-5_EDkHCJkYSTmuBHPp--4WEkJJSHlevDB2', title: 'Saint Martin' },
            { img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjT_pnxFxdfXSa2pzu7OXs0U-bmGNzRudYJMQVCUchgH_o2z9Bha9kiE0ow_JBS_Hs8eX7PNWOgHVGux9BKsyca9RYfUV-tVNFpN9fmQAL8Alcm9akYpkiudmV6HkULyPSSlINOx4BpiA6AuTefsE7CnnreYeQPxcmuVzvZzGIKWsHcNvYgZPUrC6uOFruxEKcKihvkkSNR4m5ChJAPQ29rJChArsCUl0bkaa7ll6x', title: 'Sundarbans' },
            { img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBiaFmv9mApEOzimZAgNlLQSAPmpmCWC3JBsQeOTITSMHAqdrmky5KrxKTl7P_pJRE_zAsmpwUXI3QTqx9PYkGdkuAnFi8S2FvM-ZGapUJgeB0mtauoq8GuwRb2gYXunqinVv4YpaW_79E36PVt8-Jz94-mu5oFfP4PcsKNhseGvDCxuxkHJDOdDSIquSl-R89JJlUDKeOwrHQLTbf4uF0i5-iZnprnlWkO6Zp-hzc6', title: 'Barisal Guava Market' },
            { img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4Myk9PkUAMX8n2z_xmJmLF52fVP0DwIYfpdUsuZDjVJNtosppWj0XbXEGOSAERnX926ZpvaLoAyrmZ64twFxEFDwZ69c7lYI4sXVLg_FhNz3U7pzi4DqggpNEa9HKVvUmsEf2gDGiKw6kYHqCFxlk_fyufvqRLkz12eoeKGE6WaEB4x1OlSBao6Ec5BJK0t547efka4eSdbH3g_kClEYFWEpgqUvkCHMsHnlvo5Ys', title: 'Nilgiri Peak' },
            { img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATbGUt95e9vlZuxD95ik9Liz73KD6easr4utZASeARnfejiBnXfATtaJXdCof3Lj7D5m1zR---ErVz6mx_BoagAp1KeKOVHqgsYxKnUk-1-dQC6DObIs66ILut9BH0uA5V88u154b4BQnEQQ15CQj-YE8T6TxswT_9hDeMHx7CF_49Ud1nCxo40L6jeq9n9IgMLA3XNQ9JYDH36xFrV8A-JZXGrmVGwz3WmzvMPMkL', title: 'Marine Drive' },
          ].map((item, idx) => (
            <div key={idx} className="relative h-44 rounded-2xl overflow-hidden group shadow-sm">
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex items-end">
                <span className="text-white text-[11px] font-bold">{item.title}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. READY TO TRAVERSE BANGLADESH? (Stitch Demo Bottom CTA) */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="relative rounded-3xl overflow-hidden bg-primary text-white p-8 sm:p-12 lg:p-16 shadow-lg shadow-primary/20">
          <div className="relative z-10 max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur border border-white/20 text-xs font-bold text-primary-fixed">
              <span className="material-symbols-outlined text-sm">chat</span>
              <span>Fastest WhatsApp Response</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              Ready to Traverse Bangladesh?
            </h2>

            <p className="text-xs sm:text-sm text-slate-100 leading-relaxed max-w-xl">
              Connect directly with our tour specialists on WhatsApp. Custom private groups, family holidays, corporate retreats, and student packages planned with zero hassle.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <a
                href={customTourWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-primary font-bold text-xs shadow-md transition-all hover:scale-102"
              >
                <span className="material-symbols-outlined text-lg text-emerald-600">chat</span>
                <span>Chat on WhatsApp Directly</span>
              </a>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary-container hover:bg-primary-container/80 text-white font-bold text-xs border border-white/20 transition-all"
              >
                <span>Call or Visit Banani Office</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
