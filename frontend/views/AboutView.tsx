'use client';

import React from 'react';
import Link from 'next/link';

export default function AboutView() {
  const defaultWaNumber = process.env.NEXT_PUBLIC_DEFAULT_WHATSAPP_NUMBER || '8801627444330';
  const customTourWaUrl = `https://wa.me/${defaultWaNumber}?text=${encodeURIComponent(
    'Hello Traverse BD! I would like to inquire about your corporate retreats and group expeditions.'
  )}`;

  const ACCREDITATIONS = [
    {
      id: 'toab',
      org: 'Tour Operators Association of Bangladesh (TOAB)',
      licenseNo: 'Membership #TOAB-2023-8419',
      status: 'Active Registered Member',
      description: 'Authorized tour operator adhering to national tourism safety standards and passenger protection codes.',
      icon: 'verified',
    },
    {
      id: 'caab',
      org: 'Civil Aviation Authority of Bangladesh (CAAB)',
      licenseNo: 'Permit #CAAB/AT/2024-912',
      status: 'Authorized Air Travel Agent',
      description: 'Accredited for domestic and international passenger ticketing, air charter coordination, and airport clearance.',
      icon: 'flight_takeoff',
    },
    {
      id: 'btb',
      org: 'Bangladesh Tourism Board (BTB)',
      licenseNo: 'Reg #BTB-REG-00412',
      status: 'Government Tourism Partner',
      description: 'Recognized eco-tourism platform promoting heritage preservation and indigenous community empowerment.',
      icon: 'stars',
    },
    {
      id: 'dncc',
      org: 'Dhaka North City Corporation (DNCC)',
      licenseNo: 'Trade License TRAD/DNCC/082194/2023',
      status: 'Fully Licensed Corporation',
      description: 'Incorporated commercial entity authorized for nationwide travel management and tour operator operations.',
      icon: 'corporate_fare',
    },
  ];

  const TEAM_MEMBERS = [
    {
      name: 'Hafizur Rahman',
      role: 'Co-Founder & Head of Tech & Operations',
      responsibility: 'Decentralized Architecture, High-Altitude Logistics & Expedition Safety',
      avatar: 'HR',
      bio: 'Full-stack software architect and avid high-altitude trekker. Hafizur leads the core backend engineering and coordinates multi-vehicle convoy clearance with mountain authorities.',
    },
    {
      name: 'Kazi Azmainur Rahman',
      role: 'Co-Founder & Head of Product Design',
      responsibility: 'User Experience, Digital Touchpoints & Brand Experience',
      avatar: 'KA',
      bio: 'Design systems engineer dedicated to translating the wild majesty of Bangladesh into sleek, glassmorphic interfaces and friction-free traveler booking workflows.',
    },
    {
      name: 'Sifat Mazib',
      role: 'Co-Founder & Head of Business Development',
      responsibility: 'Fleet Partnerships, Corporate Retreats & Admin Systems',
      avatar: 'SM',
      bio: 'Strategist managing our nationwide transport fleet, luxury houseboat charter contracts, and custom corporate packages for leading multinational firms.',
    },
    {
      name: 'Jannatun Nahar Soha',
      role: 'Head of Customer Success & Compliance',
      responsibility: 'Visa Support, Quality Assurance & Guest Safety',
      avatar: 'JS',
      bio: 'Oversees 24/7 guest communication, international visa documentation, and rigorous safety compliance across all domestic and cross-border departures.',
    },
  ];

  return (
    <main className="space-y-20 pb-24">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-surface-container-low/70 border-b border-surface-container py-16 lg:py-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-lowest shadow-sm border border-surface-container">
              <span className="material-symbols-outlined text-primary text-[16px]">verified</span>
              <span className="text-xs uppercase tracking-wider text-primary font-bold">
                Preserving Ecosystems, Uplifting Lives
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-on-surface tracking-tight leading-tight">
              Crafting Meaningful Journeys Across the Land of Rivers
            </h1>

            <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
              Traverse BD was founded with a clear purpose: making travel in Bangladesh secure, transparent, and respectful of local cultures and environments. We eliminate aggressive middlemen, ensuring your spend directly benefits indigenous guides, local boat operators, and forest communities.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/packages"
                className="px-6 py-3 rounded-2xl bg-primary text-white text-xs font-bold hover:bg-primary-container transition shadow-md shadow-primary/20"
              >
                Explore Curated Expeditions
              </Link>
              <a
                href={customTourWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-2xl bg-surface-container-lowest border border-surface-container-high text-on-surface text-xs font-bold hover:bg-surface-container transition"
              >
                Plan Corporate Retreat
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-[4/3] css-tilt-card border border-surface-container">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpUVy88M-JfS7aa1VRk5EQP84477D1d4N0yAaGUV17rNaVLqjOHDD1kPiIz-4BZBuGoLUEU2nleVT9LEyqekyrtQg3z_ZLNMH0RWGqZN8PElx2iuEG5N67z54yhKoPsI3MCic-vc430pF7LvB572knrtsX2RmgHwcTTBYjl1c1Vqvmu2WqS6q1vL7NHSjn90i7lLQzg9YSoDEpIVlGP_wOwziOJuGPSbPTPccyVIuU"
                alt="Traverse BD Trail Leaders"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. OUR HISTORY & GENESIS */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-wider text-primary font-bold">Our Journey</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
            From Student Trail Blazers to a Nationwide Platform
          </h2>
          <p className="text-xs sm:text-sm text-on-surface-variant">
            How a small group of explorers changed how travelers experience Bangladesh.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="rounded-3xl bg-surface-container-lowest border border-surface-container p-8 space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-extrabold text-lg">
              2021
            </div>
            <h3 className="text-lg font-bold text-on-surface">The High-Altitude Genesis</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Frustrated by unsafe transport and inflated middleman prices during treks across Bandarban, four university friends formed a hiking collective to map ethical routes directly with tribal village elders.
            </p>
          </div>

          <div className="rounded-3xl bg-surface-container-lowest border border-surface-container p-8 space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-extrabold text-lg">
              2023
            </div>
            <h3 className="text-lg font-bold text-on-surface">Formal Incorporation & TOAB</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              We registered Traverse BD as a formal tour operator with trade licensing and TOAB membership, expanding into Sundarbans luxury houseboat charters and Saint Martin marine expeditions.
            </p>
          </div>

          <div className="rounded-3xl bg-surface-container-lowest border border-surface-container p-8 space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-extrabold text-lg">
              2026
            </div>
            <h3 className="text-lg font-bold text-on-surface">International & Tech Platform</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Today, Traverse BD operates high-performance web systems, guiding over 12,000 travelers across Bangladesh, while managing curated expeditions to Kashmir, Thailand, and Bhutan.
            </p>
          </div>
        </div>
      </section>

      {/* 3. OFFICIAL LICENSING & ACCREDITATIONS */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-wider text-primary font-bold">
            Government Accreditations
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
            Verified Licensing & Statutory Compliance
          </h2>
          <p className="text-xs sm:text-sm text-on-surface-variant">
            Every expedition is conducted under strict civil regulations, authorized carrier permits, and passenger security charters.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ACCREDITATIONS.map((acc) => (
            <div
              key={acc.id}
              className="p-6 rounded-3xl bg-surface-container-lowest border border-surface-container space-y-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">{acc.icon}</span>
              </div>

              <div className="space-y-1">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  {acc.status}
                </span>
                <h4 className="text-sm font-bold text-on-surface pt-1">{acc.org}</h4>
                <p className="text-xs font-mono font-semibold text-primary">{acc.licenseNo}</p>
              </div>

              <p className="text-xs text-on-surface-variant leading-relaxed">{acc.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. TRACK RECORD STATS */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="rounded-3xl bg-surface-container-lowest border border-surface-container p-8 lg:p-12 shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-primary">12,000+</div>
              <div className="text-xs font-bold text-on-surface">Travelers Guided</div>
              <p className="text-[11px] text-on-surface-variant">Families, solo trekkers & corporate teams</p>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-primary">98.4%</div>
              <div className="text-xs font-bold text-on-surface">Satisfaction Rating</div>
              <p className="text-[11px] text-on-surface-variant">Verified post-expedition reviews</p>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-primary">42+</div>
              <div className="text-xs font-bold text-on-surface">Curated Trails</div>
              <p className="text-[11px] text-on-surface-variant">From cloud peaks to mangrove creeks</p>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-primary">100%</div>
              <div className="text-xs font-bold text-on-surface">Certified Local Guides</div>
              <p className="text-[11px] text-on-surface-variant">Indigenous experts native to each trail</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. LEADERSHIP & CORE TEAM */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-wider text-primary font-bold">The Leadership</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
            Meet the Team Driving Traverse BD
          </h2>
          <p className="text-xs sm:text-sm text-on-surface-variant">
            Built by engineers and travel architects under Traverse BD (
            <a
              href="https://www.pointfex.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-bold hover:underline"
            >
              Pointfex
            </a>
            ), combining technical excellence with grassroots field expertise.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM_MEMBERS.map((member, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-surface-container-lowest border border-surface-container text-center space-y-4 shadow-sm hover:shadow-lg transition-all css-tilt-card flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto text-xl font-extrabold border border-primary/20">
                  {member.avatar}
                </div>
                <div>
                  <h4 className="text-base font-bold text-on-surface">{member.name}</h4>
                  <p className="text-xs text-primary font-semibold mt-0.5">{member.role}</p>
                  <p className="text-[11px] text-on-surface-variant font-medium mt-1">
                    {member.responsibility}
                  </p>
                </div>
              </div>

              <p className="text-xs text-on-surface-variant leading-relaxed pt-2 border-t border-surface-container/60">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. BOTTOM CTA BANNER */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="rounded-3xl bg-primary text-white p-8 sm:p-14 text-center space-y-6 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Ready to Discover Bangladesh the Authentic Way?
            </h2>
            <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
              Connect directly with our trip architects on WhatsApp or Facebook Messenger to customize your dates, vehicle type, and preferred eco-cottages.
            </p>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
              <a
                href={customTourWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-primary text-xs font-extrabold shadow-md hover:bg-white/90 transition-all hover:scale-105"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
                <span>Chat on WhatsApp</span>
              </a>
              <a
                href="https://www.facebook.com/messages/t/431751336697364"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#0084FF] text-white text-xs font-extrabold shadow-md hover:bg-[#0073e6] transition-all hover:scale-105"
              >
                <span className="material-symbols-outlined text-[18px]">forum</span>
                <span>Message on Facebook</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
