'use client';

import React, { useState } from 'react';

export default function ContactView() {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [preferredDestination, setPreferredDestination] = useState('Sajek Valley');
  const [travelersCount, setTravelersCount] = useState('2');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const defaultWaNumber = process.env.NEXT_PUBLIC_DEFAULT_WHATSAPP_NUMBER || '8801700000000';

  const handleWhatsAppSend = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hello Traverse BD!%0A*Name:* ${encodeURIComponent(fullName || 'Traveler')}%0A*Phone:* ${encodeURIComponent(phoneNumber || 'N/A')}%0A*Destination:* ${encodeURIComponent(preferredDestination)}%0A*Travelers:* ${travelersCount}%0A*Message:* ${encodeURIComponent(inquiryMessage || 'I would like to know more about this trip.')}`;
    window.open(`https://wa.me/${defaultWaNumber}?text=${text}`, '_blank');
  };

  const faqs = [
    {
      q: 'How does booking work without an online payment form?',
      a: 'We intentionally prioritize human connection and precision. When you send your inquiry via WhatsApp, an official trip architect verifies weather, local security permits, and cottage availability before sending you an official voucher and payment instructions (bKash/Nagad/Bank Transfer).',
    },
    {
      q: 'Can we customize departure dates for a private group?',
      a: 'Yes, absolutely. Any of our published packages can be converted into a private customized tour for families, couples, or corporate groups with dedicated transport and guides.',
    },
    {
      q: 'Are the military escorts in Sajek organized by Traverse BD?',
      a: 'Yes. For Sajek Valley, all civilian convoys require coordination with the Baghaihat/Dighinala military checkposts. Our licensed drivers and local tour escorts manage the permit paperwork and convoy clearance for your vehicle.',
    },
    {
      q: 'What is your cancellation and refund policy?',
      a: 'Full refunds are provided if bad weather or river authority warnings prevent ship operations to Saint Martin or Sundarbans. For personal schedule adjustments, notice 7 days in advance allows free date rescheduling.',
    },
  ];

  return (
    <main className="space-y-16 pb-24">
      {/* 1. HERO HEADER */}
      <section className="bg-surface-container-low/70 border-b border-surface-container py-14 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-lowest shadow-sm border border-surface-container">
            <span className="material-symbols-outlined text-primary text-[16px]">headset_mic</span>
            <span className="text-xs uppercase tracking-wider text-primary font-bold">
              24/7 Operations Desk
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-on-surface tracking-tight">
            Get in Touch with Traverse BD
          </h1>

          <p className="text-sm text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            From customized family vacations to large corporate retreats, our trip coordinators are stationed across Dhaka, Chattogram, Cox's Bazar, and Khulna to assist you.
          </p>
        </div>
      </section>

      {/* 2. INQUIRY FORM & CORPORATE COORDINATES */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Inquiry Form */}
          <div className="lg:col-span-7 rounded-3xl bg-surface-container-lowest border border-surface-container p-8 sm:p-10 shadow-sm space-y-6">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-on-surface">Send Us an Inquiry</h2>
              <p className="text-xs text-on-surface-variant">
                Fill in your travel preferences to instantly chat with our team on WhatsApp.
              </p>
            </div>

            <form onSubmit={handleWhatsAppSend} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-on-surface">Your Full Name:</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Tanvir Ahmed"
                    className="w-full bg-surface-container-low text-on-surface text-xs px-3.5 py-2.5 rounded-xl border border-surface-container-high focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-on-surface">Phone Number:</label>
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="e.g. 017XXXXXXXX"
                    className="w-full bg-surface-container-low text-on-surface text-xs px-3.5 py-2.5 rounded-xl border border-surface-container-high focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-on-surface">Preferred Destination:</label>
                  <select
                    value={preferredDestination}
                    onChange={(e) => setPreferredDestination(e.target.value)}
                    className="w-full bg-surface-container-low text-on-surface text-xs px-3.5 py-2.5 rounded-xl border border-surface-container-high focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
                  >
                    <option value="Sajek Valley">Sajek Valley (Cloud Kingdom)</option>
                    <option value="Cox's Bazar">Cox's Bazar & Inani Beach</option>
                    <option value="Saint Martin Island">Saint Martin Coral Island</option>
                    <option value="Sundarbans">Sundarbans Mangrove Safari</option>
                    <option value="Sreemangal">Sreemangal & Lawachara</option>
                    <option value="Bandarban">Bandarban & Nilgiri Peak</option>
                    <option value="Custom Route">Custom Multi-City Tour</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-on-surface">Travelers Count:</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={travelersCount}
                    onChange={(e) => setTravelersCount(e.target.value)}
                    className="w-full bg-surface-container-low text-on-surface text-xs px-3.5 py-2.5 rounded-xl border border-surface-container-high focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-on-surface">Your Message / Special Requirements:</label>
                <textarea
                  rows={3}
                  value={inquiryMessage}
                  onChange={(e) => setInquiryMessage(e.target.value)}
                  placeholder="Tell us about desired dates, budget range, or dietary requirements..."
                  className="w-full bg-surface-container-low text-on-surface text-xs p-3.5 rounded-xl border border-surface-container-high focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm shadow-md shadow-[#25D366]/20 transition-all hover:scale-[1.01]"
              >
                <span className="material-symbols-outlined text-[20px]">chat</span>
                <span>Send via WhatsApp (+880 1627-444330)</span>
              </button>
            </form>
          </div>

          {/* Corporate Coordinates */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl bg-surface-container-lowest border border-surface-container p-8 shadow-sm space-y-6">
              <h3 className="text-lg font-bold text-on-surface">Corporate Coordinates</h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-lg">apartment</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-on-surface">Dhaka Headquarters</h4>
                    <p className="text-on-surface-variant leading-relaxed mt-0.5">
                      House 42, Road 11, Block D, Banani, Dhaka 1213, Bangladesh
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-lg">call</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-on-surface">Direct Telephone</h4>
                    <p className="text-on-surface-variant leading-relaxed mt-0.5">
                      +880 1627-444330 / +880 1700-000000
                    </p>
                    <p className="text-[11px] text-primary font-semibold mt-0.5">
                      Available daily: 09:00 AM — 10:00 PM (BST)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-lg">mail</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-on-surface">Electronic Mail</h4>
                    <p className="text-on-surface-variant leading-relaxed mt-0.5">
                      hello@traversebd.com / support@traversebd.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Regional Hubs */}
            <div className="rounded-3xl bg-surface-container-lowest border border-surface-container p-8 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-on-surface">Where We Coordinate Your Adventures</h3>
              <ul className="space-y-3 text-xs text-on-surface-variant">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[16px]">terrain</span>
                  <span><strong>Sajek & Bandarban:</strong> Dighinala Army Camp Escort Station</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[16px]">sailing</span>
                  <span><strong>Sundarbans Safari:</strong> Mongla Port Gate & Khulna Forest Division</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[16px]">waves</span>
                  <span><strong>Saint Martin:</strong> Teknaf Ship Terminal & Inani Eco Desk</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FAQ SECTION (Accordion) */}
      <section className="max-w-4xl mx-auto px-6 lg:px-12 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs uppercase tracking-wider text-primary font-bold">Frequently Asked</span>
          <h2 className="text-2xl font-bold text-on-surface">Need Quick Clarification?</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-surface-container-lowest border border-surface-container overflow-hidden shadow-sm"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between text-xs sm:text-sm font-bold text-on-surface hover:text-primary transition"
              >
                <span>{faq.q}</span>
                <span className="material-symbols-outlined text-[18px]">
                  {openFaq === idx ? 'expand_less' : 'expand_more'}
                </span>
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-5 pt-1 text-xs text-on-surface-variant leading-relaxed border-t border-surface-container/60">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
