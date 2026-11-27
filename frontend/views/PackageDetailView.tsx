'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PackageDetailDTO, PackageDeparture } from '@backend/types/database.types';
import { formatCurrencyBDT } from '@backend/services/pricing.service';
import { generateWhatsAppInquiryUrl } from '@backend/services/whatsapp.service';

interface PackageDetailViewProps {
  packageData: PackageDetailDTO;
}

export default function PackageDetailView({ packageData }: PackageDetailViewProps) {
  const [selectedDeparture, setSelectedDeparture] = useState<string>(
    packageData.departures && packageData.departures.length > 0
      ? packageData.departures[0].departure_date
      : ''
  );
  const [travelersCount, setTravelersCount] = useState<number>(2);
  const [customNote, setCustomNote] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'itinerary' | 'inclusions' | 'gallery'>('itinerary');

  const selectedDepartureObj = packageData.departures?.find(
    (d) => d.departure_date === selectedDeparture
  );

  const formattedPrice = formatCurrencyBDT(
    packageData.price_bdt,
    packageData.price_mode,
    'en'
  );

  const waUrl = generateWhatsAppInquiryUrl({
    packageTitle: packageData.title_en,
    packageSlug: packageData.slug,
    packagePrice: packageData.price_bdt,
    priceMode: packageData.price_mode,
    travelerCount: travelersCount,
    departureDate: selectedDeparture || undefined,
    customNote: customNote.trim() || undefined,
    locale: 'en',
  });



  return (
    <main className="pb-24 space-y-12">
      {/* 1. HERO & BREADCRUMB SECTION */}
      <section className="bg-surface-container-low/70 border-b border-surface-container py-8 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto space-y-4">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-on-surface-variant font-medium">
            <Link href="/" className="hover:text-primary transition flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px]">home</span>
              <span>Home</span>
            </Link>
            <span className="text-outline-variant">/</span>
            <Link href="/packages" className="hover:text-primary transition">
              Tour Packages
            </Link>
            <span className="text-outline-variant">/</span>
            <span className="text-primary font-semibold truncate max-w-xs sm:max-w-md">
              {packageData.title_en}
            </span>
          </nav>

          {/* Title & Key Attributes */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  {packageData.category?.name_en || 'Expedition'}
                </span>

                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                  🇧🇩 Journeys Across Bangladesh
                </span>

                <span className="px-3 py-1 rounded-full bg-surface-container-lowest text-on-surface-variant text-xs font-medium border border-surface-container">
                  <span className="material-symbols-outlined text-[13px] inline mr-1 text-primary">
                    location_on
                  </span>
                  {packageData.destination?.name_en || packageData.destination?.region}
                </span>

                {packageData.is_featured && (
                  <span className="px-3 py-1 rounded-full bg-amber-500 text-white text-xs font-bold flex items-center gap-1 shadow-sm">
                    <span className="material-symbols-outlined text-[13px]">local_fire_department</span>
                    <span>Bestseller Tour</span>
                  </span>
                )}

                <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 text-xs font-bold flex items-center gap-1 border border-amber-500/20">
                  <span className="material-symbols-outlined text-[14px] text-amber-500">star</span>
                  <span>{(packageData.rating_average || 4.95).toFixed(2)}</span>
                  <span className="text-on-surface-variant font-normal">
                    ({packageData.reviews_count || 120} reviews)
                  </span>
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-on-surface tracking-tight">
                {packageData.title_en}
              </h1>
            </div>

            {/* Quick Action Pill */}
            <div className="flex items-center gap-3 self-start lg:self-center">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold shadow-md shadow-[#25D366]/20 transition"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
                <span>Direct WhatsApp Inquiry</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MEDIA SHOWCASE & QUICK META */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Photo Gallery */}
          <div className="lg:col-span-8 space-y-4">
            <div className="relative h-80 sm:h-[460px] rounded-3xl overflow-hidden shadow-sm group border border-surface-container/60">
              <img
                src={packageData.cover_image_url}
                alt={packageData.title_en}
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white">
                <div className="flex items-center gap-3">
                  <div className="px-3.5 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-xs font-semibold flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[15px] text-primary-fixed">
                      schedule
                    </span>
                    <span>
                      {packageData.duration_days} Days / {packageData.duration_nights} Nights
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary Photo Row */}
            {packageData.images && packageData.images.length > 0 && (
              <div className="grid grid-cols-3 gap-3">
                {packageData.images.slice(0, 3).map((img, idx) => (
                  <div key={idx} className="h-28 rounded-2xl overflow-hidden relative shadow-sm border border-surface-container">
                    <img
                      src={img.image_url}
                      alt={img.alt_en || `Gallery photo ${idx + 1}`}
                      className="h-full w-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Sticky Booking Box */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
            <div className="rounded-3xl bg-surface-container-lowest border border-surface-container p-6 sm:p-8 shadow-sm space-y-6">
              {/* Pricing Display */}
              <div className="space-y-1 pb-4 border-b border-surface-container">
                <span className="text-xs uppercase tracking-wider text-on-surface-variant font-bold">
                  {packageData.price_mode === 'starting_from' ? 'Starting From' : 'Total Fixed Price'}
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-primary">{formattedPrice}</span>
                  <span className="text-xs text-on-surface-variant font-medium">/ person</span>
                </div>
                <p className="text-[11px] text-on-surface-variant">
                  *All prices in whole Bangladeshi Taka (BDT). Zero hidden transaction fees.
                </p>
              </div>

              {/* Departure Date Selector */}
              {packageData.departures && packageData.departures.length > 0 && (
                <div className="space-y-2">
                  <label className="text-xs font-bold text-on-surface flex items-center justify-between">
                    <span>Select Departure Batch:</span>
                    {selectedDepartureObj && (
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          selectedDepartureObj.status === 'sold_out'
                            ? 'bg-red-100 text-red-700'
                            : selectedDepartureObj.status === 'few_seats'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-emerald-100 text-emerald-700'
                        }`}
                      >
                        {selectedDepartureObj.status === 'sold_out'
                          ? 'Sold Out'
                          : `${selectedDepartureObj.available_seats} Seats Available`}
                      </span>
                    )}
                  </label>
                  <select
                    value={selectedDeparture}
                    onChange={(e) => setSelectedDeparture(e.target.value)}
                    className="w-full bg-surface-container-low text-on-surface text-xs font-semibold px-3.5 py-2.5 rounded-xl border border-surface-container-high focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
                  >
                    {packageData.departures.map((dep) => (
                      <option key={dep.id} value={dep.departure_date}>
                        {new Date(dep.departure_date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}{' '}
                        ({dep.available_seats} seats left)
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Number of Travelers Counter */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-on-surface">Travelers Count:</label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setTravelersCount(Math.max(1, travelersCount - 1))}
                    className="w-9 h-9 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-extrabold flex items-center justify-center border border-surface-container"
                  >
                    -
                  </button>
                  <span className="text-sm font-bold text-on-surface w-8 text-center">
                    {travelersCount}
                  </span>
                  <button
                    onClick={() => setTravelersCount(Math.min(30, travelersCount + 1))}
                    className="w-9 h-9 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-extrabold flex items-center justify-center border border-surface-container"
                  >
                    +
                  </button>
                  <span className="text-xs text-on-surface-variant ml-2">Person(s)</span>
                </div>
              </div>

              {/* Custom Request Note */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-on-surface">Custom Note (Optional):</label>
                <textarea
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  placeholder="E.g., Require couple cottage, vegetarian meals, airport pickup..."
                  rows={2}
                  className="w-full bg-surface-container-low text-on-surface text-xs p-3 rounded-xl border border-surface-container-high focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              {/* Direct WhatsApp Action Button */}
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm shadow-md shadow-[#25D366]/20 transition-all hover:scale-[1.02]"
              >
                <span className="material-symbols-outlined text-[20px]">chat</span>
                <span>Book / Inquire on WhatsApp</span>
              </a>

              {/* Direct Facebook Messenger Action Button */}
              <a
                href="https://www.facebook.com/messages/t/431751336697364"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-2xl bg-[#0084FF] hover:bg-[#0073e6] text-white font-bold text-sm shadow-md shadow-[#0084FF]/20 transition-all hover:scale-[1.02]"
              >
                <span className="material-symbols-outlined text-[20px]">forum</span>
                <span>Inquire on Facebook Messenger</span>
              </a>

              <div className="space-y-2 pt-2 text-[11px] text-on-surface-variant text-center">
                <div className="flex items-center justify-center gap-1.5 text-primary font-semibold">
                  <span className="material-symbols-outlined text-[15px]">verified_user</span>
                  <span>Instant Confirmation with Trip Architect</span>
                </div>
                <p>No credit card required. Direct communication with certified guides.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OVERVIEW & TABS: ITINERARY, INCLUSIONS & EXCLUSIONS */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="lg:w-8/12 space-y-8">
          {/* Overview & Highlights */}
          {(packageData.full_description_en || packageData.short_description_en) && (
            <div className="rounded-2xl bg-surface-container-lowest border border-surface-container p-6 space-y-3">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-primary flex items-center gap-1.5">
                <span className="material-symbols-outlined text-base">explore</span>
                <span>Tour Overview &amp; Experience</span>
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed whitespace-pre-line">
                {packageData.full_description_en || packageData.short_description_en}
              </p>
            </div>
          )}

          {/* Tabs Navigation */}
          <div className="flex items-center gap-3 border-b border-surface-container pb-4">
            <button
              onClick={() => setActiveTab('itinerary')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === 'itinerary'
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container border border-surface-container'
              }`}
            >
              Day-by-Day Itinerary
            </button>
            <button
              onClick={() => setActiveTab('inclusions')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === 'inclusions'
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container border border-surface-container'
              }`}
            >
              Inclusions & Exclusions
            </button>
          </div>

          {/* TAB 1: ITINERARY TIMELINE */}
          {activeTab === 'itinerary' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-on-surface">Detailed Tour Itinerary</h3>
              {packageData.itinerary && packageData.itinerary.length > 0 ? (
                <div className="relative border-l-2 border-primary/20 ml-4 pl-6 space-y-8">
                  {packageData.itinerary.map((day) => (
                    <div key={day.id} className="relative group">
                      {/* Timeline Dot */}
                      <div className="absolute -left-[33px] top-1 w-4 h-4 rounded-full bg-primary border-4 border-surface shadow-sm" />

                      <div className="rounded-2xl bg-surface-container-lowest border border-surface-container p-5 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-bold">
                            Day {day.day_no}
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-on-surface">
                          {day.title_en}
                        </h4>
                        <p className="text-xs text-on-surface-variant leading-relaxed">
                          {day.description_en}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 rounded-2xl bg-surface-container-lowest border border-surface-container text-xs text-on-surface-variant">
                  Detailed day-by-day itinerary will be customized according to your arrival schedule. Connect on WhatsApp to customize.
                </div>
              )}
            </div>
          )}

          {/* TAB 2: INCLUSIONS & EXCLUSIONS */}
          {activeTab === 'inclusions' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Inclusions */}
              <div className="rounded-2xl bg-emerald-50/50 border border-emerald-100 p-6 space-y-4">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                  <span className="material-symbols-outlined text-lg">check_circle</span>
                  <span>What's Included:</span>
                </div>
                <ul className="space-y-2 text-xs text-emerald-950">
                  {packageData.items && packageData.items.filter((i) => i.type === 'included').length > 0 ? (
                    packageData.items
                      .filter((i) => i.type === 'included')
                      .map((item) => (
                        <li key={item.id} className="flex items-start gap-2">
                          <span className="material-symbols-outlined text-[15px] text-emerald-600 mt-0.5">
                            check
                          </span>
                          <span>{item.text_en}</span>
                        </li>
                      ))
                  ) : (
                    <>
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[15px] text-emerald-600">check</span>
                        <span>AC/Non-AC Transport & Highway Tolls</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[15px] text-emerald-600">check</span>
                        <span>Pre-vetted Resort / Eco-Cottage Accommodation</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[15px] text-emerald-600">check</span>
                        <span>All Meals as per Itinerary</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[15px] text-emerald-600">check</span>
                        <span>Experienced Local Guide & Forest Permits</span>
                      </li>
                    </>
                  )}
                </ul>
              </div>

              {/* Exclusions */}
              <div className="rounded-2xl bg-red-50/50 border border-red-100 p-6 space-y-4">
                <div className="flex items-center gap-2 text-red-800 font-bold text-sm">
                  <span className="material-symbols-outlined text-lg">cancel</span>
                  <span>What's Excluded:</span>
                </div>
                <ul className="space-y-2 text-red-950">
                  {packageData.items && packageData.items.filter((i) => i.type === 'excluded').length > 0 ? (
                    packageData.items
                      .filter((i) => i.type === 'excluded')
                      .map((item) => (
                        <li key={item.id} className="flex items-start gap-2">
                          <span className="material-symbols-outlined text-[15px] text-red-600 mt-0.5">
                            close
                          </span>
                          <span>{item.text_en}</span>
                        </li>
                      ))
                  ) : (
                    <>
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[15px] text-red-600">close</span>
                        <span>Personal expenses, laundry, and tips</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[15px] text-red-600">close</span>
                        <span>Any optional activity not mentioned in the itinerary</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[15px] text-red-600">close</span>
                        <span>Medical and personal travel insurance</span>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
