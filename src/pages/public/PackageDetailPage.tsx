import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { ShareModal } from '../../components/ShareModal';
import { 
  Clock, MapPin, Compass, CheckCircle2, XCircle, 
  Share2, MessageSquare, Utensils, Hotel, Bus, 
  Activity, AlertCircle, ArrowLeft, Calendar, ShieldCheck, 
  Sparkles, Flame, Check, Copy 
} from 'lucide-react';

export const PackageDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { publishedPackages, getWhatsAppLink, settings } = useApp();

  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const pkg = publishedPackages.find(p => p.slug === slug);

  // If draft or doesn't exist, return 404 (FR-04 / AC-02)
  if (!pkg) {
    return <Navigate to="/404" replace />;
  }

  const allImages = [pkg.cover_image_url, ...(pkg.gallery_images || [])];
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  // Segregate dynamic items by type (FR-15, FR-24)
  const includedItems = pkg.items?.filter(i => i.type === 'included') || [];
  const excludedItems = pkg.items?.filter(i => i.type === 'excluded') || [];
  const activityItems = pkg.items?.filter(i => i.type === 'activity') || [];
  const foodItems = pkg.items?.filter(i => i.type === 'food') || [];
  const stayItems = pkg.items?.filter(i => i.type === 'accommodation') || [];
  const transportItems = pkg.items?.filter(i => i.type === 'transport') || [];
  const noteItems = pkg.items?.filter(i => i.type === 'note') || [];

  return (
    <div className="space-y-12 pb-24">
      {/* Top Breadcrumb & Actions Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Link to="/" className="hover:text-slate-900">Home</Link>
            <span>/</span>
            <Link to="/packages" className="hover:text-slate-900">Packages</Link>
            <span>/</span>
            <span className="text-[#005f49] font-bold truncate max-w-xs">{pkg.title}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShareModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
            >
              <Share2 className="w-3.5 h-3.5 text-[#005f49]" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Title & Badges */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-emerald-50 text-[#005f49] text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
            {pkg.category_name}
          </span>
          <span className="bg-slate-100 text-slate-700 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-[#005f49]" />
            {pkg.destination_name}
          </span>
          {pkg.is_trending && (
            <span className="bg-rose-500 text-white text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Flame className="w-3 h-3 fill-white" />
              <span>Trending</span>
            </span>
          )}
          {pkg.is_featured && (
            <span className="bg-amber-500 text-white text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Sparkles className="w-3 h-3 fill-white" />
              <span>Featured</span>
            </span>
          )}
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          {pkg.title}
        </h1>

        <p className="text-slate-600 text-base sm:text-lg max-w-3xl leading-relaxed">
          {pkg.short_description}
        </p>
      </div>

      {/* Image Gallery Stage */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden bg-slate-900 shadow-xl">
          <img
            src={allImages[activeImageIndex]}
            alt={pkg.title}
            className="w-full h-full object-cover transition-all duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

          <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 text-white text-xs font-bold bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full">
            Photo {activeImageIndex + 1} of {allImages.length}
          </div>
        </div>

        {/* Thumbnail Selector */}
        {allImages.length > 1 && (
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
            {allImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative w-24 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                  activeImageIndex === idx
                    ? 'border-[#005f49] scale-105 shadow-md'
                    : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Two-Column Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        
        {/* LEFT COLUMN: Itinerary, Descriptions, Dynamic Items */}
        <div className="lg:col-span-2 space-y-12">
          
          {/* Key Facts Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-white rounded-3xl border border-slate-200/80 shadow-xs">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Duration</span>
              <div className="flex items-center gap-1.5 font-bold text-slate-900 text-sm">
                <Clock className="w-4 h-4 text-[#005f49]" />
                <span>{pkg.duration_days}D / {pkg.duration_nights}N</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Destination</span>
              <div className="flex items-center gap-1.5 font-bold text-slate-900 text-sm">
                <MapPin className="w-4 h-4 text-[#005f49]" />
                <span className="truncate">{pkg.destination_name}</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Group Type</span>
              <div className="flex items-center gap-1.5 font-bold text-slate-900 text-sm">
                <Compass className="w-4 h-4 text-[#005f49]" />
                <span>Small Groups & Private</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Safety Verified</span>
              <div className="flex items-center gap-1.5 font-bold text-slate-900 text-sm">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Armed Escort</span>
              </div>
            </div>
          </div>

          {/* Full Tour Overview */}
          <section className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">Expedition Overview</h2>
            <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
              {pkg.full_description}
            </p>
          </section>

          {/* Day-by-Day Itinerary (FR-15) */}
          {pkg.itinerary && pkg.itinerary.length > 0 && (
            <section className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900">Day-by-Day Itinerary Breakdown</h2>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                  {pkg.itinerary.length} Days Planned
                </span>
              </div>

              <div className="relative border-l-2 border-emerald-200 ml-4 pl-6 space-y-8">
                {pkg.itinerary.map((day) => (
                  <div key={day.day_no} className="relative group">
                    {/* Circle Node */}
                    <div className="absolute -left-[35px] top-0 w-8 h-8 rounded-full bg-[#005f49] text-white flex items-center justify-center font-bold text-xs shadow-md shadow-[#005f49]/30">
                      {day.day_no}
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                        Day {day.day_no}
                      </span>
                      <h4 className="text-lg font-bold text-slate-900">
                        {day.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {day.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Inclusions and Exclusions (FR-15, FR-24) */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Included Services */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-emerald-900 font-bold text-lg">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Included Services</span>
              </div>
              <ul className="space-y-2.5">
                {includedItems.map((item) => (
                  <li key={item.id} className="flex items-start gap-2.5 text-xs text-slate-700">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item.text}</span>
                  </li>
                ))}
                {includedItems.length === 0 && (
                  <li className="text-xs text-slate-400 italic">Standard inclusions apply.</li>
                )}
              </ul>
            </div>

            {/* Excluded Services */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-rose-900 font-bold text-lg">
                <XCircle className="w-5 h-5 text-rose-500" />
                <span>Excluded Services</span>
              </div>
              <ul className="space-y-2.5">
                {excludedItems.map((item) => (
                  <li key={item.id} className="flex items-start gap-2.5 text-xs text-slate-700">
                    <span className="text-rose-500 font-bold text-xs shrink-0 mt-0.5">✕</span>
                    <span>{item.text}</span>
                  </li>
                ))}
                {excludedItems.length === 0 && (
                  <li className="text-xs text-slate-400 italic">No special exclusions specified.</li>
                )}
              </ul>
            </div>
          </section>

          {/* Activities, Meals, Accommodation, Transport Breakdown (FR-15) */}
          {(activityItems.length > 0 || foodItems.length > 0 || stayItems.length > 0 || transportItems.length > 0) && (
            <section className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">Experience Logistics & Amenities</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activityItems.length > 0 && (
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                      <Activity className="w-4 h-4 text-[#005f49]" />
                      <span>Key Activities & Treks</span>
                    </div>
                    {activityItems.map(item => (
                      <p key={item.id} className="text-xs text-slate-600 leading-relaxed pl-6">• {item.text}</p>
                    ))}
                  </div>
                )}

                {foodItems.length > 0 && (
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                      <Utensils className="w-4 h-4 text-amber-600" />
                      <span>Cuisine & Meals Provided</span>
                    </div>
                    {foodItems.map(item => (
                      <p key={item.id} className="text-xs text-slate-600 leading-relaxed pl-6">• {item.text}</p>
                    ))}
                  </div>
                )}

                {stayItems.length > 0 && (
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                      <Hotel className="w-4 h-4 text-blue-600" />
                      <span>Lodging & Cottages</span>
                    </div>
                    {stayItems.map(item => (
                      <p key={item.id} className="text-xs text-slate-600 leading-relaxed pl-6">• {item.text}</p>
                    ))}
                  </div>
                )}

                {transportItems.length > 0 && (
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                      <Bus className="w-4 h-4 text-emerald-600" />
                      <span>Vehicles & Transit</span>
                    </div>
                    {transportItems.map(item => (
                      <p key={item.id} className="text-xs text-slate-600 leading-relaxed pl-6">• {item.text}</p>
                    ))}
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Important Travel Notes (FR-15) */}
          {noteItems.length > 0 && (
            <section className="bg-amber-50/70 border border-amber-200 p-6 rounded-3xl space-y-3">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                <span>Important Travel Requirements & Advisory</span>
              </div>
              <ul className="space-y-1.5 pl-6 list-disc text-xs text-amber-950">
                {noteItems.map(n => (
                  <li key={n.id}>{n.text}</li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* RIGHT COLUMN: STICKY WHATSAPP BOOKING CARD (FR-16) */}
        <div className="lg:sticky lg:top-28 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
            
            {/* Price Badge */}
            <div className="border-b border-slate-100 pb-5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Package Price</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl sm:text-4xl font-black text-[#005f49]">
                  ৳{pkg.price.toLocaleString()}
                </span>
                <span className="text-xs text-slate-500 font-medium">/ person (All-inclusive)</span>
              </div>
              <p className="text-[11px] text-emerald-600 font-semibold mt-1">
                ✓ No hidden platform or credit card fees
              </p>
            </div>

            {/* Quick Summary list */}
            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Duration:</span>
                <span className="font-bold text-slate-900">{pkg.duration_days} Days / {pkg.duration_nights} Nights</span>
              </div>
              <div className="flex justify-between">
                <span>Destination:</span>
                <span className="font-bold text-slate-900">{pkg.destination_name}</span>
              </div>
              <div className="flex justify-between">
                <span>Travel Category:</span>
                <span className="font-bold text-slate-900">{pkg.category_name}</span>
              </div>
              <div className="flex justify-between">
                <span>Booking Model:</span>
                <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-sm">Direct WhatsApp</span>
              </div>
            </div>

            {/* Direct WhatsApp Booking Button (SRS FR-16, AC-04) */}
            <div className="space-y-3 pt-2">
              <a
                href={getWhatsAppLink(pkg)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white py-4 rounded-2xl font-black text-sm tracking-wide shadow-lg shadow-emerald-500/20 hover:scale-[1.02] active:scale-95 transition-all text-center"
              >
                <MessageSquare className="w-5 h-5 fill-white" />
                <span>Book Now via WhatsApp</span>
              </a>

              <p className="text-[11px] text-slate-400 text-center leading-snug">
                Opens a pre-filled WhatsApp message with package name and direct link. Our team will verify dates and confirm immediately.
              </p>
            </div>

            {/* Social Share button inside card */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">Need to invite friends?</span>
              <button
                onClick={() => setShareModalOpen(true)}
                className="text-xs font-bold text-[#005f49] hover:underline flex items-center gap-1"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Tour</span>
              </button>
            </div>
          </div>

          {/* Support Guarantee Box */}
          <div className="p-5 rounded-2xl bg-emerald-50/80 border border-emerald-100 space-y-2 text-xs text-emerald-950">
            <div className="flex items-center gap-2 font-bold text-[#005f49]">
              <ShieldCheck className="w-4 h-4" />
              <span>Traverse BD Promise</span>
            </div>
            <p className="leading-relaxed">
              All bookings are backed by licensed local transport operators and verified mountain convoy registrations.
            </p>
          </div>
        </div>
      </div>

      {/* Share Modal (FR-17) */}
      <ShareModal
        title={pkg.title}
        url={currentUrl}
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
      />
    </div>
  );
};
