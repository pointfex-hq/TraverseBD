'use client';

import React from 'react';
import Link from 'next/link';

export default function AboutView() {
  const defaultWaNumber = process.env.NEXT_PUBLIC_DEFAULT_WHATSAPP_NUMBER || '8801700000000';
  const customTourWaUrl = `https://wa.me/${defaultWaNumber}?text=${encodeURIComponent(
    'Hello Traverse BD! I would like to inquire about your corporate retreats and group expeditions.'
  )}`;

  return (
    <main className="space-y-20 pb-24">
      {/* 1. HERO SECTION (Stitch About Us Design) */}
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
              Traverse BD was founded with a singular conviction: that traveling in Bangladesh should be safe, environmentally responsible, and deeply connected to local indigenous heritage. We eliminate predatory middle-men, ensuring your spend directly sustains local guides, boatmen, and forest communities.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/packages"
                className="px-6 py-3 rounded-2xl bg-primary text-white text-xs font-bold hover:bg-primary/90 transition shadow-md shadow-primary/20"
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
            <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-[4/3]">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpUVy88M-JfS7aa1VRk5EQP84477D1d4N0yAaGUV17rNaVLqjOHDD1kPiIz-4BZBuGoLUEU2nleVT9LEyqekyrtQg3z_ZLNMH0RWGqZN8PElx2iuEG5N67z54yhKoPsI3MCic-vc430pF7LvB572knrtsX2RmgHwcTTBYjl1c1Vqvmu2WqS6q1vL7NHSjn90i7lLQzg9YSoDEpIVlGP_wOwziOJuGPSbPTPccyVIuU"
                alt="Traverse BD Guides on the Trail"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. MILESTONES OF TRUST & SCALE */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="rounded-3xl bg-surface-container-lowest border border-surface-container p-8 lg:p-12 shadow-sm">
          <div className="text-center max-w-xl mx-auto space-y-2 mb-10">
            <span className="text-xs uppercase tracking-wider text-primary font-bold">
              Our Track Record
            </span>
            <h2 className="text-2xl font-bold text-on-surface">Milestones of Trust & Scale</h2>
          </div>

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

      {/* 3. THREE CORE PILLARS */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-wider text-primary font-bold">Our Philosophy</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
            Engineered for Safe, Conscious & Unforgettable Discovery
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-surface-container-lowest border border-surface-container space-y-4 hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">health_and_safety</span>
            </div>
            <h3 className="text-lg font-bold text-on-surface">Safety First & Certified Fleet</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Every 4x4 Chander Gari, speedboat, and expedition ship undergoes strict mechanical inspection. We maintain licensed local drivers familiar with mountain hairpins and tidal rapids.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-surface-container-lowest border border-surface-container space-y-4 hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">volunteer_activism</span>
            </div>
            <h3 className="text-lg font-bold text-on-surface">Community & Eco Empowerment</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              We strictly enforce Leave-No-Trace principles. 70% of tour operational expenses stay directly within the destination villages, supporting local schools, homestays, and forest patrols.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-surface-container-lowest border border-surface-container space-y-4 hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">price_check</span>
            </div>
            <h3 className="text-lg font-bold text-on-surface">Zero Hidden Costs</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              We believe in honest tourism. All prices are calculated in whole BDT, covering entry permits, guide allowances, and meals upfront with zero surprise fees on the trail.
            </p>
          </div>
        </div>
      </section>

      {/* 4. THE TEAM (Team Lithium / Pointfex) */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-wider text-primary font-bold">The Leadership</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
            The Architects Behind Traverse BD
          </h2>
          <p className="text-xs sm:text-sm text-on-surface-variant">
            Built by Team Lithium under Pointfex, dedicated to engineering high-performance modern travel technology for Bangladesh.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Member 1: Hafizur */}
          <div className="p-6 rounded-3xl bg-surface-container-lowest border border-surface-container text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto text-xl font-bold">
              HR
            </div>
            <div>
              <h4 className="text-base font-bold text-on-surface">Hafizur Rahman</h4>
              <p className="text-xs text-primary font-semibold">Project Manager & Tech Lead</p>
              <p className="text-[11px] text-on-surface-variant mt-1">Backend Architecture & Integration</p>
            </div>
          </div>

          {/* Member 2: Kazi Azmainur */}
          <div className="p-6 rounded-3xl bg-surface-container-lowest border border-surface-container text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto text-xl font-bold">
              KA
            </div>
            <div>
              <h4 className="text-base font-bold text-on-surface">Kazi Azmainur Rahman</h4>
              <p className="text-xs text-primary font-semibold">UI/UX Designer</p>
              <p className="text-[11px] text-on-surface-variant mt-1">Public Frontend & Deployment</p>
            </div>
          </div>

          {/* Member 3: Sifat Mazib */}
          <div className="p-6 rounded-3xl bg-surface-container-lowest border border-surface-container text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto text-xl font-bold">
              SM
            </div>
            <div>
              <h4 className="text-base font-bold text-on-surface">Sifat Mazib</h4>
              <p className="text-xs text-primary font-semibold">Admin Panel Developer</p>
              <p className="text-[11px] text-on-surface-variant mt-1">CMS & Role-Based Access Control</p>
            </div>
          </div>

          {/* Member 4: Jannatun Nahar Soha */}
          <div className="p-6 rounded-3xl bg-surface-container-lowest border border-surface-container text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto text-xl font-bold">
              JS
            </div>
            <div>
              <h4 className="text-base font-bold text-on-surface">Jannatun Nahar Soha</h4>
              <p className="text-xs text-primary font-semibold">Documentation & QA Tester</p>
              <p className="text-[11px] text-on-surface-variant mt-1">Requirements Traceability & Handover</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. BOTTOM CTA */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="rounded-3xl bg-primary text-white p-8 sm:p-14 text-center space-y-6 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Ready to Discover Bangladesh the Authentic Way?
            </h2>
            <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
              Connect directly with our trip architects on WhatsApp to customize your dates, vehicle type, and preferred eco-cottages.
            </p>
            <div className="pt-4">
              <a
                href={customTourWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-primary text-xs font-extrabold shadow-md hover:bg-white/90 transition-all hover:scale-105"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
                <span>Chat on WhatsApp (01627444330)</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
