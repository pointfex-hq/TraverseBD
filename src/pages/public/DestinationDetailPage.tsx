import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { PackageCard } from '../../components/PackageCard';
import { 
  MapPin, Calendar, Compass, Sparkles, CheckCircle2, 
  ArrowLeft, ArrowRight, MessageSquare, Lightbulb 
} from 'lucide-react';

export const DestinationDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { publishedDestinations, publishedPackages, getWhatsAppLink } = useApp();

  const destination = publishedDestinations.find(d => d.slug === slug);

  // If draft or not found, return 404 (FR-04 acceptance criterion: "a draft destination URL returns 404")
  if (!destination) {
    return <Navigate to="/404" replace />;
  }

  const relatedPackages = publishedPackages.filter(p => p.destination_id === destination.id);

  return (
    <div className="space-y-16 pb-20">
      {/* Destination Hero */}
      <div className="relative min-h-[60vh] flex items-end bg-slate-950 p-6 sm:p-12 lg:p-16">
        <img
          src={destination.cover_image_url}
          alt={destination.name}
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-black/30" />

        <div className="relative z-10 max-w-5xl mx-auto w-full space-y-4">
          <Link
            to="/destinations"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-300 hover:text-white transition-colors bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Destinations</span>
          </Link>

          <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold">
            <MapPin className="w-4 h-4" />
            <span>{destination.region}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
            {destination.name}
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
            {destination.short_description}
          </p>

          {destination.best_time_to_visit && (
            <div className="pt-2 inline-flex items-center gap-2 bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 px-4 py-2 rounded-2xl text-xs font-bold">
              <Calendar className="w-4 h-4" />
              <span>Recommended Season: {destination.best_time_to_visit}</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column (Full details, highlights, tips) */}
        <div className="lg:col-span-2 space-y-10">
          {/* Overview */}
          <section className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">About {destination.name}</h2>
            <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
              {destination.full_description}
            </p>
          </section>

          {/* Highlights */}
          {destination.highlights && destination.highlights.length > 0 && (
            <section className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
              <h2 className="text-2xl font-bold text-slate-900">Signature Highlights & Experiences</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {destination.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-2xl bg-emerald-50/60 border border-emerald-100">
                    <CheckCircle2 className="w-4 h-4 text-[#005f49] shrink-0 mt-0.5" />
                    <span className="text-xs font-semibold text-slate-800">{item}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Travel Tips */}
          {destination.travel_tips && destination.travel_tips.length > 0 && (
            <section className="bg-amber-50/60 border border-amber-200/80 p-8 rounded-3xl space-y-4">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-xl">
                <Lightbulb className="w-5 h-5 text-amber-600" />
                <span>Field Travel Tips & Recommendations</span>
              </div>
              <ul className="space-y-2.5 text-xs text-amber-950 leading-relaxed pt-2">
                {destination.travel_tips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="font-bold text-amber-600">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Destination Gallery */}
          {destination.gallery_images && destination.gallery_images.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900">Photo Gallery</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {destination.gallery_images.map((img, idx) => (
                  <div key={idx} className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 shadow-xs">
                    <img src={img} alt={`${destination.name} photo ${idx + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform" />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Sidebar (Quick Info & WhatsApp Contact) */}
        <div className="space-y-6">
          <div className="bg-[#005f49] text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-6">
            <span className="text-[11px] font-bold uppercase tracking-wider bg-white/15 px-3 py-1 rounded-full text-emerald-200">
              Custom Expedition Inquiry
            </span>
            <h3 className="text-2xl font-black">Plan a Private Tour to {destination.name}</h3>
            <p className="text-xs text-emerald-100 leading-relaxed">
              Want a private family cottage, specialized vehicle convoy, or customized corporate schedule? Our travel planners will organize everything over WhatsApp.
            </p>

            <a
              href={getWhatsAppLink({ title: destination.name, slug: destination.slug })}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-black text-xs py-4 rounded-2xl shadow-lg transition-transform hover:scale-[1.02]"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>Inquire via WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Related Tour Packages (FR-04) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pt-8 border-t border-slate-200">
        <div>
          <span className="text-xs font-bold text-[#005f49] uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full">
            Available Itineraries
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
            Tour Packages for {destination.name} ({relatedPackages.length})
          </h2>
        </div>

        {relatedPackages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedPackages.map(pkg => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        ) : (
          <div className="p-8 text-center bg-slate-50 rounded-3xl border border-slate-200 text-slate-500 text-sm">
            No published packages are currently scheduled for this destination. Contact us on WhatsApp for custom private bookings!
          </div>
        )}
      </section>
    </div>
  );
};
