'use client';

import React from 'react';
import Link from 'next/link';

export default function ServicesView() {
  const whatsappNumber = '8801627444330';

  const SERVICES = [
    {
      id: 'corporate-retreats',
      title: 'Corporate Retreats & Offsites',
      subtitle: 'End-to-End Team Building & Outdoor Conferences',
      icon: 'corporate_fare',
      desc: 'Seamless company retreat logistics for tech startups, multinational corporations, and development agencies. We manage luxury resort buyouts, audio/visual setups, private transport convoys, and curated outdoor team-building activities in Cox’s Bazar, Sajek, and Sylhet.',
      highlights: [
        'Private 4x4 Chander Gari & AC coaster fleet',
        'Catered executive dining & beach barbecue nights',
        'Official tax invoices & corporate vendor contracts',
        'Dedicated on-site trip manager for seamless execution',
      ],
      ctaText: 'Plan Corporate Retreat',
      badge: 'Corporate Priority',
    },
    {
      id: 'customized-tours',
      title: 'Customized & Private Group Tours',
      subtitle: 'Bespoke Itineraries Tailored to Your Schedule',
      icon: 'tune',
      desc: 'Flexible travel planning for families, couples, and private traveler groups. Pick your own departure dates, vehicle preferences, and preferred ridge cottages. Our trip architects craft private itineraries that match your exact comfort level and pacing.',
      highlights: [
        'Exclusive private vehicles (No shared passenger hassle)',
        'Handpicked couple & family eco-cottages in Konglak & Inani',
        'Personalized local guides native to your chosen trail',
        'Flexible meal plans and custom sightseeing stops',
      ],
      ctaText: 'Customize Private Tour',
      badge: 'Tailor-Made',
    },
    {
      id: 'student-trips',
      title: 'Student Expeditions & Study Tours',
      subtitle: 'Budget-Friendly, Highly Supervised Youth Adventures',
      icon: 'school',
      desc: 'Safe, educational, and adventurous expeditions designed for universities, colleges, and youth collectives. We provide discounted student group tariffs, vetted multi-bed resort accommodations, and rigorous round-the-clock safety supervision.',
      highlights: [
        'Discounted group rates for academic institutions',
        'Strict chaperone & safety checkpost protocols',
        'Educational sessions with forest naturalists & tribal elders',
        'First-aid responder equipped guides on every trail',
      ],
      ctaText: 'Inquire Student Tour',
      badge: 'Academic Discount',
    },
    {
      id: 'guided-expeditions',
      title: 'Guided Signature Expeditions',
      subtitle: 'Expert Field Naturalists, 4x4 Mountain Safaris & Island Cruises',
      icon: 'explore',
      desc: 'All-inclusive guided expeditions across Bangladesh’s most breathtaking terrain. From Sajek Valley cloud summits with private 4x4 Chander Gari convoys to UNESCO Sundarbans mangrove vessel journeys and remote Saint Martin coral reefs.',
      highlights: [
        'Dedicated licensed tour captains & local tribal guides',
        'Pre-secured forest entry permits, armed guard escorts & inland passes',
        'Carefully inspected hill cottages, eco-resorts & cruise cabins',
        '24/7 on-ground emergency dispatch & WhatsApp trip assistance',
      ],
      ctaText: 'Explore Guided Expeditions',
      badge: 'All-Inclusive',
    },
  ];

  return (
    <main className="space-y-16 pb-24 pt-20 bg-surface">
      {/* 1. HERO HEADER */}
      <section className="relative overflow-hidden bg-surface-container-low/70 border-b border-surface-container py-16 px-6 lg:px-12 text-center">
        <div className="absolute -top-32 right-1/4 w-96 h-96 bg-primary-fixed/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-12 left-10 w-72 h-72 bg-secondary-fixed/30 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-lowest shadow-sm border border-surface-container">
            <span className="material-symbols-outlined text-primary text-[16px]">travel_explore</span>
            <span className="text-xs uppercase tracking-wider text-primary font-bold">
              Complete Travel Solutions
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-on-surface tracking-tight">
            Comprehensive Travel &amp; Logistics Across Bangladesh
          </h1>

          <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            From complete corporate offsite management and bespoke private family tours to individual ship, bus, flight, and hill cottage reservations—Traverse BD delivers end-to-end reliability.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hello Traverse BD! I would like to inquire about your travel services.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary hover:bg-primary-container text-white text-xs font-bold transition shadow-md shadow-primary/25"
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
              <span>Chat with a Specialist</span>
            </a>
            <Link
              href="/packages"
              className="px-6 py-3 rounded-full bg-surface-container-lowest border border-surface-container text-on-surface text-xs font-bold hover:bg-surface-container transition"
            >
              Browse Tour Packages
            </Link>
          </div>
        </div>
      </section>

      {/* 2. SERVICES CATALOG */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {SERVICES.map((srv) => (
            <div
              key={srv.id}
              className="p-8 rounded-3xl bg-surface-container-lowest border border-surface-container shadow-sm hover:shadow-xl transition-all duration-300 css-tilt-card flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-3xl">{srv.icon}</span>
                  </div>
                  <span className="px-3.5 py-1 rounded-full bg-surface-container-low text-xs font-bold text-primary border border-surface-container">
                    {srv.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-extrabold text-on-surface">{srv.title}</h3>
                  <p className="text-xs text-primary font-semibold mt-0.5">{srv.subtitle}</p>
                </div>

                <p className="text-xs text-on-surface-variant leading-relaxed">{srv.desc}</p>

                <div className="space-y-2 pt-2 border-t border-surface-container">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-outline block">
                    Key Deliverables:
                  </span>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-on-surface">
                    {srv.highlights.map((item, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="material-symbols-outlined text-primary text-[15px] shrink-0 mt-0.5">
                          check_circle
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-surface-container">
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                    `Hello Traverse BD! I am interested in your ${srv.title} service. Please share details and pricing.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-2xl bg-primary hover:bg-primary-container text-white text-xs font-bold transition shadow-sm"
                >
                  <span className="material-symbols-outlined text-[18px]">chat</span>
                  <span>{srv.ctaText}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. CTA BANNER */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="rounded-3xl bg-surface-container-lowest border border-surface-container p-8 sm:p-12 text-center space-y-4 shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto">
            <span className="material-symbols-outlined text-3xl">headset_mic</span>
          </div>
          <h2 className="text-2xl font-bold text-on-surface">Need a Custom Travel Expedition?</h2>
          <p className="text-xs sm:text-sm text-on-surface-variant max-w-xl mx-auto leading-relaxed">
            Planning a tailor-made expedition with private 4x4 Chander Gari hill convoys, dedicated resort buyouts, and specialized meal arrangements? Our trip coordinators curate custom itineraries with single-point accountability.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white text-xs font-bold hover:bg-primary-container transition shadow-sm"
            >
              <span>Contact Operations Desk</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
