import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Phone, Mail, MapPin, Clock, MessageSquare, 
  Send, ChevronDown, CheckCircle2, HelpCircle 
} from 'lucide-react';
import { initialFaqs } from '../../data/mockData';

export const ContactPage: React.FC = () => {
  const { settings, getWhatsAppLink } = useApp();

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    destination: 'Sajek Valley',
    travelers: '2',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // In demo mode, show instant confirmation and WhatsApp redirect option
  };

  const handleWhatsAppDirect = () => {
    const text = `Hello Traverse BD! My name is ${formState.name || 'Traveler'}. I am planning a trip to ${formState.destination} for ${formState.travelers} people. Message: ${formState.message || 'Please share available packages and dates.'}`;
    const cleanNumber = (settings.whatsapp_number || '8801627444330').replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-bold text-[#005f49] uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full">
          Get in Touch
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Connect with Our Travel Specialists
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Whether you want to organize an annual corporate retreat, rent a luxury houseboat, or book a weekend getaway—we are available 7 days a week.
        </p>
      </div>

      {/* Main Grid: Form & Contact Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Left Column: Form */}
        <div className="lg:col-span-2 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-slate-900">Send an Expedition Inquiry</h3>
            <p className="text-xs text-slate-500">
              Fill in your details and we will reply via WhatsApp and phone within 15 minutes.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4 animate-in fade-in">
              <div className="w-12 h-12 rounded-full bg-[#005f49] text-white flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">Inquiry Received Successfully!</h4>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                Thank you, <span className="font-bold text-slate-900">{formState.name}</span>. Our tour concierge has logged your request for <span className="font-bold text-slate-900">{formState.destination}</span>.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleWhatsAppDirect}
                  className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-full text-xs font-bold hover:scale-105 transition-all shadow-md"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  <span>Continue on WhatsApp Now</span>
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Asif Ahmed"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-hidden focus:border-[#005f49] focus:bg-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Phone / WhatsApp Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 01712345678"
                    value={formState.phone}
                    onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-hidden focus:border-[#005f49] focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Email Address</label>
                  <input
                    type="email"
                    placeholder="e.g. asif@example.com"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-hidden focus:border-[#005f49] focus:bg-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Interested Destination</label>
                  <select
                    value={formState.destination}
                    onChange={(e) => setFormState({ ...formState, destination: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-hidden focus:border-[#005f49] focus:bg-white cursor-pointer"
                  >
                    <option value="Sajek Valley">Sajek Valley</option>
                    <option value="Sundarbans">Sundarbans Mangrove</option>
                    <option value="Saint Martin Island">Saint Martin Coral Island</option>
                    <option value="Tanguar Haor">Tanguar Haor Houseboat</option>
                    <option value="Cox's Bazar">Cox's Bazar & Marine Drive</option>
                    <option value="Bandarban">Bandarban & Nilgiri</option>
                    <option value="Sreemangal">Sreemangal Tea Estates</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Trip Details / Custom Requests</label>
                <textarea
                  rows={4}
                  placeholder="Share tentative travel dates, group size, or special requirements (e.g. need private cottage with veranda, AC transport, vegetarian food)..."
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-hidden focus:border-[#005f49] focus:bg-white"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#005f49] hover:bg-[#0a4b3b] text-white px-8 py-3.5 rounded-xl font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Inquiry</span>
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppDirect}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white px-6 py-3.5 rounded-xl font-bold text-xs shadow-sm transition-all cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  <span>Direct WhatsApp Chat</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Right Column: Contact Cards (FR-10) */}
        <div className="space-y-6">
          <div className="bg-[#005f49] text-white p-8 rounded-3xl shadow-xl space-y-6">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-white/15 px-3 py-1 rounded-full text-emerald-200">
              Operations Headquarters
            </span>
            <h3 className="text-2xl font-black">Where We Coordinate Your Adventures</h3>

            <div className="space-y-4 text-xs text-emerald-100">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" />
                <span className="leading-snug">{settings.address}</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-emerald-300 shrink-0" />
                <a href={`tel:${settings.contact_phone}`} className="hover:text-white font-mono">
                  {settings.contact_phone}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-emerald-300 shrink-0" />
                <a href={`mailto:${settings.contact_email}`} className="hover:text-white font-mono">
                  {settings.contact_email}
                </a>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" />
                <span className="leading-snug">{settings.office_hours}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-emerald-600/40">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-white text-[#005f49] py-3.5 rounded-2xl font-bold text-xs hover:bg-emerald-50 transition-colors"
              >
                <MessageSquare className="w-4 h-4 fill-[#005f49]" />
                <span>Quick WhatsApp Hotline</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions (FAQ) Section */}
      <section className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/80 shadow-xs space-y-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-2 text-[#005f49] font-bold text-sm uppercase tracking-wider">
          <HelpCircle className="w-4 h-4" />
          <span>Need Quick Clarification?</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Frequently Asked Questions
        </h2>

        <div className="space-y-3 pt-4">
          {initialFaqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-slate-200/80 rounded-2xl overflow-hidden transition-all"
            >
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-4 text-left flex items-center justify-between font-bold text-sm text-slate-800 hover:text-[#005f49] transition-colors"
              >
                <span>{faq.question}</span>
                <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${openFaq === idx ? 'rotate-180 text-[#005f49]' : 'text-slate-400'}`} />
              </button>

              {openFaq === idx && (
                <div className="p-4 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
