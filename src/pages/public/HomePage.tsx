import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { PackageCard } from '../../components/PackageCard';
import { DestinationCard } from '../../components/DestinationCard';
import { ImageLightbox } from '../../components/ImageLightbox';
import { 
  Search, MapPin, Calendar, Compass, ShieldCheck, 
  Sparkles, ArrowRight, MessageSquare, Star, Award, 
  Trees, Users, HeartHandshake, Ship, Plane, Bus, 
  Hotel, Backpack, CheckCircle2, ChevronRight 
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { 
    publishedPackages, 
    publishedDestinations, 
    publishedGallery, 
    publishedBlogs, 
    publishedTestimonials, 
    settings, 
    getWhatsAppLink 
  } = useApp();

  const [searchDest, setSearchDest] = useState('');
  const [searchCategory, setSearchCategory] = useState('');
  const [selectedCategoryTab, setSelectedCategoryTab] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchDest) params.set('destination', searchDest);
    if (searchCategory) params.set('category', searchCategory);
    navigate(`/packages?${params.toString()}`);
  };

  const trendingPackages = publishedPackages.filter(p => p.is_trending || p.is_featured);
  const filteredPackages = selectedCategoryTab === 'all'
    ? trendingPackages
    : publishedPackages.filter(p => p.category_id === selectedCategoryTab);

  const services = [
    { name: 'Ship Ticket', desc: 'Saint Martin Catamaran', icon: Ship, color: 'bg-blue-50 text-blue-600' },
    { name: 'Air Ticket', desc: 'Cox\'s Bazar & Sylhet', icon: Plane, color: 'bg-amber-50 text-amber-600' },
    { name: 'AC Bus Ticket', desc: 'Sleeper & Business Coach', icon: Bus, color: 'bg-emerald-50 text-emerald-600' },
    { name: 'Hotel Booking', desc: 'Eco Resorts & Beach Villas', icon: Hotel, color: 'bg-purple-50 text-purple-600' },
    { name: 'Custom Tour', desc: 'Family & Private Jeeps', icon: Compass, color: 'bg-teal-50 text-teal-600' },
    { name: 'Corporate Retreat', desc: 'End-to-End Annual Trips', icon: Users, color: 'bg-indigo-50 text-indigo-600' },
    { name: 'Student Tour', desc: 'Budget Group Treks', icon: Backpack, color: 'bg-rose-50 text-rose-600' },
  ];

  return (
    <div className="space-y-24 pb-20 overflow-x-hidden">
      
      {/* 1. HERO BANNER WITH SEARCH */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-slate-950 pt-20 pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Visual with subtle zoom effect */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=2000&q=85"
            alt="Sajek Valley Sea of Clouds"
            className="w-full h-full object-cover opacity-45 scale-105 animate-[pulse_10s_ease-in-out_infinite]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-black/40" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,95,73,0.15),transparent_70%)]" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
          
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-emerald-300 text-xs sm:text-sm font-semibold shadow-lg">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Discover Unexplored Bengal With Trusted Local Convoys</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] max-w-4xl mx-auto drop-shadow-md">
            {settings.hero_title}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {settings.hero_subtitle}
          </p>

          {/* Floating Search Bar (FR-05) */}
          <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-xl p-3 sm:p-4 rounded-3xl shadow-2xl border border-white/60">
            <form onSubmit={handleHeroSearch} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              
              {/* Destination selector */}
              <div className="flex items-center gap-3 px-4 py-3 bg-slate-50/80 rounded-2xl border border-slate-200/60 focus-within:border-[#005f49] focus-within:bg-white transition-all">
                <MapPin className="w-5 h-5 text-[#005f49] shrink-0" />
                <div className="text-left w-full">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Destination</label>
                  <select
                    value={searchDest}
                    onChange={(e) => setSearchDest(e.target.value)}
                    className="w-full bg-transparent text-sm font-bold text-slate-800 outline-hidden cursor-pointer"
                  >
                    <option value="">All Destinations</option>
                    {publishedDestinations.map(d => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Category selector */}
              <div className="flex items-center gap-3 px-4 py-3 bg-slate-50/80 rounded-2xl border border-slate-200/60 focus-within:border-[#005f49] focus-within:bg-white transition-all">
                <Compass className="w-5 h-5 text-[#005f49] shrink-0" />
                <div className="text-left w-full">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Travel Style</label>
                  <select
                    value={searchCategory}
                    onChange={(e) => setSearchCategory(e.target.value)}
                    className="w-full bg-transparent text-sm font-bold text-slate-800 outline-hidden cursor-pointer"
                  >
                    <option value="">Any Category</option>
                    <option value="cat-1">Hill & Mountain Trek</option>
                    <option value="cat-2">Beach & Coastal Islands</option>
                    <option value="cat-3">Riverine & Houseboats</option>
                    <option value="cat-4">Eco Wildlife Safari</option>
                    <option value="cat-5">Tea Trails & Heritage</option>
                    <option value="cat-6">Corporate Retreats</option>
                  </select>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-[#005f49] hover:bg-[#0a4b3b] text-white py-4 rounded-2xl text-sm font-extrabold shadow-lg shadow-[#005f49]/30 hover:shadow-xl transition-all hover:scale-[1.02] cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>Search Expeditions</span>
              </button>
            </form>
          </div>

          {/* Quick tags under search */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400 pt-2">
            <span className="font-semibold text-slate-300">Popular Searches:</span>
            {['Sajek Valley', 'Sundarbans Cruise', 'Saint Martin', 'Tanguar Haor Houseboat'].map(tag => (
              <button
                key={tag}
                type="button"
                onClick={() => navigate(`/packages?search=${encodeURIComponent(tag)}`)}
                className="bg-white/10 hover:bg-white/20 text-slate-200 px-3 py-1 rounded-full transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. SERVICES SECTION (আমাদের সেবাসমূহ) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold text-[#005f49] uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full">
            Our Services
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            আমাদের সেবাসমূহ (Integrated Travel Concierge)
          </h2>
          <p className="text-slate-600 text-sm">
            Everything you need for seamless travel across Bangladesh under one roof.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
          {services.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <div
                key={idx}
                className="group p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center flex flex-col items-center justify-between"
              >
                <div className={`w-12 h-12 rounded-2xl ${srv.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 group-hover:text-[#005f49] transition-colors">{srv.name}</h4>
                  <p className="text-[11px] text-slate-500 mt-1">{srv.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. DESTINATION HIGHLIGHTS (FR-01, FR-03) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold text-[#005f49] uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full">
              Explore Destinations
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
              Signature Regions of Bengal
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              From the highest peaks of Chittagong Hill Tracts to the vast mangrove delta.
            </p>
          </div>
          <Link
            to="/destinations"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#005f49] hover:text-[#0a4b3b] group"
          >
            <span>View All Destinations ({publishedDestinations.length})</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {publishedDestinations.slice(0, 6).map(dest => (
            <DestinationCard key={dest.id} destination={dest} />
          ))}
        </div>
      </section>

      {/* 4. TRENDING PACKAGES WITH CATEGORY TABS (FR-13, FR-14) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-xs font-bold text-[#005f49] uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full">
              Handpicked Expeditions
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
              Trending Tour Packages
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Curated departure dates with verified resort lodging and certified guides.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Trending' },
              { id: 'cat-1', label: 'Hill Treks' },
              { id: 'cat-2', label: 'Beach & Islands' },
              { id: 'cat-3', label: 'Houseboats' },
              { id: 'cat-4', label: 'Wildlife Safari' }
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedCategoryTab(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  selectedCategoryTab === tab.id
                    ? 'bg-[#005f49] text-white shadow-md shadow-[#005f49]/20'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.slice(0, 6).map(pkg => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/packages"
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            <span>Explore All {publishedPackages.length} Tour Packages</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 5. WHY CHOOSE TRAVERSE BD (আমাদের বৈশিষ্ট্য) */}
      <section className="bg-gradient-to-b from-emerald-950 to-slate-950 text-white py-20 px-4 sm:px-6 lg:px-8 rounded-3xl max-w-7xl mx-auto shadow-2xl">
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest bg-emerald-900/40 px-3.5 py-1.5 rounded-full border border-emerald-500/20">
            Why Traverse BD
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            আমাদের বৈশিষ্ট্য (Engineered for Safe, Conscious Discovery)
          </h2>
          <p className="text-slate-300 text-sm">
            We bridge the gap between rugged untouched landscapes and uncompromising comfort, safety, and cultural respect.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: ShieldCheck,
              title: "Verified Army Convoy & Permits",
              desc: "Complete assistance with military checkpoints, forest clearance passes, and local permits for zero border delays."
            },
            {
              icon: Award,
              title: "Certified Indigenous Guides",
              desc: "Deep local knowledge with indigenous guides from Lushei, Marma, Chakma, and Rakhine communities."
            },
            {
              icon: Trees,
              title: "100% Eco-Conscious Tourism",
              desc: "Strict zero-plastic policies on haors and mangrove trails; direct financial reinvestment into local tribal schools."
            },
            {
              icon: MessageSquare,
              title: "Frictionless WhatsApp Booking",
              desc: "No confusing payment walls or account registration. Direct 1-on-1 human communication via WhatsApp desk."
            }
          ].map((feat, i) => {
            const Icon = feat.icon;
            return (
              <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/40 hover:bg-white/10 transition-all duration-300 space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white">{feat.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{feat.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. SNAPSHOTS FROM THE FIELD (GALLERY PREVIEW - FR-07) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold text-[#005f49] uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full">
              Visual Chronicles
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
              Snapshots from the Field
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Real moments captured by our travelers and field expeditions.
            </p>
          </div>
          <Link
            to="/gallery"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#005f49] hover:text-[#0a4b3b] group"
          >
            <span>View Full Gallery ({publishedGallery.length})</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {publishedGallery.slice(0, 8).map((img, idx) => (
            <div
              key={img.id}
              onClick={() => setLightboxIndex(idx)}
              className="group relative aspect-square rounded-2xl overflow-hidden bg-slate-100 cursor-pointer shadow-xs hover:shadow-xl transition-all"
            >
              <img
                src={img.image_url}
                alt={img.caption}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end text-white">
                <span className="text-xs font-bold line-clamp-1">{img.caption}</span>
                <span className="text-[11px] text-emerald-300">{img.destination_name}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. TESTIMONIALS (FR-09) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold text-[#005f49] uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full">
            Traveler Voices
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            What Explorers Say About Traverse BD
          </h2>
          <p className="text-slate-600 text-sm">
            From corporate annual retreats to solo nature lovers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {publishedTestimonials.slice(0, 4).map(test => (
            <div key={test.id} className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex gap-1 text-amber-400">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed italic">
                  "{test.quote}"
                </p>
              </div>

              <div className="pt-6 border-t border-slate-100 flex items-center gap-3">
                <img
                  src={test.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'}
                  alt={test.name}
                  className="w-10 h-10 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{test.name}</h4>
                  <p className="text-[10px] text-slate-500">{test.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. LATEST TRAVEL STORIES / BLOG (FR-08) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold text-[#005f49] uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full">
              Gazette & Field Notes
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
              Stories & Guides from the Trail
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Field guides, logistics breakdown, and insider recommendations.
            </p>
          </div>
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#005f49] hover:text-[#0a4b3b] group"
          >
            <span>Read All Guides</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {publishedBlogs.slice(0, 3).map(post => (
            <article key={post.id} className="group bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={post.cover_image_url}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-slate-800 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {post.tags[0] || 'Guide'}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span>{post.published_at}</span>
                    <span>•</span>
                    <span>{post.read_time}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#005f49] transition-colors line-clamp-2">
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2">
                <Link
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#005f49] group-hover:gap-2 transition-all"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 9. READY TO TRAVERSE BANGLADESH CTA SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-[#005f49] to-[#0d7a5f] text-white p-8 sm:p-14 overflow-hidden shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl text-center lg:text-left z-10">
            <span className="text-xs font-bold uppercase tracking-wider bg-white/15 px-3 py-1 rounded-full text-emerald-200">
              Direct Travel Design
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Ready to Traverse Bangladesh?
            </h2>
            <p className="text-sm sm:text-base text-emerald-100 leading-relaxed">
              Have questions about customized corporate tours, family retreats, or upcoming departures? Chat with our team directly on WhatsApp for instant answers and custom quotes.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 z-10 shrink-0">
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 bg-white text-[#005f49] hover:bg-emerald-50 px-8 py-4 rounded-full font-black text-sm tracking-wide shadow-xl hover:scale-105 transition-all"
            >
              <MessageSquare className="w-5 h-5 fill-[#005f49]" />
              <span>Message on WhatsApp</span>
            </a>

            <a
              href={`tel:${settings.contact_phone}`}
              className="inline-flex items-center justify-center gap-2 bg-emerald-950/40 hover:bg-emerald-950/60 border border-white/20 text-white px-6 py-4 rounded-full font-bold text-sm transition-all"
            >
              <span>Call Hotline: {settings.contact_phone}</span>
            </a>
          </div>

          {/* Decorative Background Shapes */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-white/5 pointer-events-none" />
          <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-white/5 pointer-events-none" />
        </div>
      </section>

      {/* Lightbox for field snapshots */}
      <ImageLightbox
        images={publishedGallery}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(idx) => setLightboxIndex(idx)}
      />
    </div>
  );
};
