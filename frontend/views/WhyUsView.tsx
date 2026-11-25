'use client';

import React from 'react';
import Link from 'next/link';

export default function WhyUsView() {
  const whatsappUrl = 'https://wa.me/8801627444330?text=Hello%20Traverse%20BD!%20I%20would%20like%20to%20learn%20more%20about%20your%20guided%20expeditions.';

  const CORE_PILLARS = [
    {
      icon: 'badge',
      title: '100% Certified Local Indigenous Guides',
      desc: 'We do not send generic city escorts. Every single trail is led by native tribal guides, river boatmen, and forest naturalists born and raised in that exact terrain. They understand the river currents, seasonal microclimates, and indigenous village customs.',
      badge: 'Grassroots Authenticity',
    },
    {
      icon: 'security',
      title: 'Rigorous Fleet & Marine Safety Standards',
      desc: 'Every 4x4 Chander Gari, high-altitude hill jeep, and coastal tourist vessel in our partner fleet undergoes comprehensive mechanical safety inspections. All maritime excursions carry BIWTA-approved life vests and certified navigational escorts.',
      badge: 'Zero-Compromise Safety',
    },
    {
      icon: 'price_check',
      title: 'Transparent Whole BDT Pricing',
      desc: 'Zero surprise checkpost fees, zero hidden toll surcharges, zero unexpected guide tips on the road. What you see is what you pay, clearly itemized in whole Bangladeshi Taka (BDT) with no credit card processing fees.',
      badge: 'Honest Tourism',
    },
    {
      icon: 'eco',
      title: '70% Direct Community Reinvestment',
      desc: 'We operate under strict Leave-No-Trace principles. Over 70% of tour operational expenses stay directly within host villages, funding local schools, solar microgrids, and forest patrol equipment.',
      badge: 'Sustainable Impact',
    },
    {
      icon: 'shield',
      title: 'Army Escort & Convoy Coordination',
      desc: 'All security checkpost clearances for Sajek Valley (Baghaihat/Dighinala military escorts) and armed Forest Department escorts for the Sundarbans mangrove core are handled proactively by our paperwork team.',
      badge: 'Seamless Clearance',
    },
    {
      icon: 'support_agent',
      title: '24/7 Field Response Desks',
      desc: 'With permanent operational desks in Dhaka, Chattogram, Cox’s Bazar, and Khulna, our trip coordinators monitor live satellite weather radar, road landslides, and ferry timetables to keep you safe at all times.',
      badge: 'Always on Call',
    },
  ];

  const COMPARISONS = [
    {
      feature: 'Local Guide Profile',
      traverse: 'Certified indigenous tribal elders & local field naturalists',
      others: 'Untrained city escorts unfamiliar with local terrain',
    },
    {
      feature: 'Pricing Model',
      traverse: '100% Transparent in whole BDT with zero trail surcharges',
      others: 'Hidden fees for entry permits, driver meals, and fuel add-ons',
    },
    {
      feature: 'Vehicle & Boat Safety',
      traverse: 'Inspected 4x4 hill vehicles & life-vest equipped certified boats',
      others: 'Unchecked rented third-party vehicles and overloaded dinghies',
    },
    {
      feature: 'Environmental Ethics',
      traverse: 'Strict Leave-No-Trace & non-negotiable waste repatriation',
      others: 'Unregulated camp trash left in sensitive ecological zones',
    },
    {
      feature: 'Emergency & Permitting',
      traverse: 'Direct liaison with Baghaihat army convoy & forest rangers',
      others: 'Travelers left to navigate military checkposts independently',
    },
    {
      feature: 'Direct WhatsApp Support',
      traverse: 'Instant human responses from trip architects (01627444330)',
      others: 'Delayed ticketing email queues or unresponsive phone lines',
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
            <span className="material-symbols-outlined text-primary text-[16px]">verified</span>
            <span className="text-xs uppercase tracking-wider text-primary font-bold">
              The Traverse BD Distinction
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-on-surface tracking-tight">
            Why Discerning Explorers Choose Traverse BD
          </h1>

          <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            Traveling across Bangladesh should be safe, transparent, ecologically responsible, and deeply connected to local heritage. We eliminate predatory intermediaries to deliver authentic journeys across rivers, hills, and mangroves.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/packages"
              className="px-6 py-3 rounded-full bg-primary text-white text-xs font-bold hover:bg-primary-container transition shadow-md shadow-primary/25"
            >
              Explore Available Expeditions
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-surface-container-lowest border border-surface-container text-on-surface text-xs font-bold hover:bg-surface-container transition"
            >
              <span className="material-symbols-outlined text-[18px] text-[#25D366]">chat</span>
              <span>Ask Our Trip Architects</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. SIX UNCOMPROMISING COMMITMENTS */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-wider text-primary font-bold">Our Pillars</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
            Six Guarantees That Define Every Journey
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CORE_PILLARS.map((pillar, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-surface-container-lowest border border-surface-container shadow-sm hover:shadow-xl transition-all duration-300 css-tilt-card flex flex-col justify-between space-y-4"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl">{pillar.icon}</span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-surface-container-low text-[10px] font-bold text-primary border border-surface-container">
                    {pillar.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-on-surface">{pillar.title}</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">{pillar.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. COMPARISON TABLE */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-wider text-primary font-bold">
            The Difference
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
            Traverse BD vs. Conventional Tour Operators
          </h2>
        </div>

        <div className="rounded-3xl bg-surface-container-lowest border border-surface-container overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-container-low text-on-surface uppercase tracking-wider font-bold border-b border-surface-container">
                <tr>
                  <th className="py-4 px-6">Criteria</th>
                  <th className="py-4 px-6 text-primary">Traverse BD Standard</th>
                  <th className="py-4 px-6 text-outline">Traditional Operators</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container">
                {COMPARISONS.map((row, idx) => (
                  <tr key={idx} className="hover:bg-surface-container-low/50 transition-colors">
                    <td className="py-4 px-6 font-bold text-on-surface">{row.feature}</td>
                    <td className="py-4 px-6 text-primary font-semibold flex items-center gap-2">
                      <span className="material-symbols-outlined text-emerald-600 text-[16px]">check_circle</span>
                      <span>{row.traverse}</span>
                    </td>
                    <td className="py-4 px-6 text-on-surface-variant">
                      <span className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-red-400 text-[16px]">cancel</span>
                        <span>{row.others}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4. TRACK RECORD METRICS */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="rounded-3xl bg-surface-container-lowest border border-surface-container p-8 lg:p-12 shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-primary">12,000+</div>
              <div className="text-xs font-bold text-on-surface">Travelers Guided</div>
              <p className="text-[11px] text-on-surface-variant">Across all 64 districts</p>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-primary">98.4%</div>
              <div className="text-xs font-bold text-on-surface">Verified Rating</div>
              <p className="text-[11px] text-on-surface-variant">Post-expedition traveler surveys</p>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-primary">42+</div>
              <div className="text-xs font-bold text-on-surface">Curated Trails</div>
              <p className="text-[11px] text-on-surface-variant">Hills, coastal &amp; mangrove routes</p>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-primary">100%</div>
              <div className="text-xs font-bold text-on-surface">Certified Guides</div>
              <p className="text-[11px] text-on-surface-variant">Indigenous experts native to each terrain</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA BANNER */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="rounded-3xl bg-primary text-white p-8 sm:p-12 text-center space-y-4 shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Plan Your Next Bangladesh Adventure with Confidence
          </h2>
          <p className="text-xs sm:text-sm text-white/90 max-w-xl mx-auto leading-relaxed">
            Connect directly with our trip coordinators on WhatsApp. We provide prompt assistance with customized schedules, 4x4 Chander Gari bookings, and verified cottage reservations.
          </p>
          <div className="pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-primary text-xs font-extrabold shadow-md hover:bg-white/90 transition-all hover:scale-105"
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
              <span>Chat on WhatsApp (01627444330)</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
