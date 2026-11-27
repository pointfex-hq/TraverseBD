'use client';

import React, { useState } from 'react';

export default function ContactView() {
  const [fullName, setFullName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [preferredTour, setPreferredTour] = useState('Sajek Valley (Cloud Kingdom)');
  const [travelersCount, setTravelersCount] = useState('2');
  const [messageText, setMessageText] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const phoneDisplay = '01627-444330';
  const phoneTel = 'tel:01627444330';
  const defaultWaNumber = process.env.NEXT_PUBLIC_DEFAULT_WHATSAPP_NUMBER || '8801627444330';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const getDirectWhatsAppUrl = () => {
    const text = `Hello Traverse BD!%0A*Name:* ${encodeURIComponent(fullName || 'Guest Traveler')}%0A*Email:* ${encodeURIComponent(emailAddress || 'N/A')}%0A*Phone:* ${encodeURIComponent(phoneNumber || 'N/A')}%0A*Tour/Subject:* ${encodeURIComponent(preferredTour)}%0A*Travelers:* ${travelersCount}%0A*Message:* ${encodeURIComponent(messageText || 'I would like to inquire about booking an expedition.')}`;
    return `https://wa.me/${defaultWaNumber}?text=${text}`;
  };

  const faqs = [
    {
      q: 'How does booking work with a 100% online travel agency?',
      a: 'Everything is streamlined digitally for your convenience. You select your tour, submit an inquiry via our website or directly through WhatsApp (+880 1627-444330), and our trip architect immediately checks cottage availability and local permits. We then issue an official digital voucher with transparent payment details (bKash, Nagad, or Bank Transfer).',
    },
    {
      q: 'Since you do not have a physical office, how do tours operate on the ground?',
      a: 'We maintain certified local coordinators, licensed mountain 4x4 drivers (Chander Gari), and experienced local guides stationed directly on-site at Sajek Valley, Saint Martin, Sundarbans, Sreemangal, Cox’s Bazar, and Bandarban. You receive your driver and guide contact information 24 hours prior to departure, and our 24/7 online operations desk monitors your convoy until you return safely.',
    },
    {
      q: 'Can we customize departure dates for a private group or family?',
      a: 'Yes, absolutely! Any of our published itineraries can be converted into a bespoke private expedition tailored to your family size, vehicle preference, and eco-resort choice with zero storefront markup.',
    },
    {
      q: 'What is your cancellation and refund policy?',
      a: '100% full refunds are issued if adverse weather warnings or government river authority advisories cancel ship operations to Saint Martin or Sundarbans. For personal schedule adjustments, informing our team 7 days ahead allows free date rescheduling.',
    },
  ];

  return (
    <main className="space-y-12 sm:space-y-16 pb-24 bg-surface">
      {/* 1. HERO HEADER */}
      <section className="bg-surface-container-low/70 border-b border-surface-container py-12 sm:py-16 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-lowest shadow-sm border border-surface-container">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs uppercase tracking-wider text-primary font-bold">
              100% Online Agency • 24/7 Digital Concierge
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-on-surface tracking-tight">
            Connect With Our Online Expeditions Desk
          </h1>

          <p className="text-xs sm:text-sm text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            Traverse BD operates entirely online to deliver premium Bangladesh eco-expeditions without physical office markup. Reach our digital team directly via WhatsApp, hotline, or message form below.
          </p>
        </div>
      </section>

      {/* 2. 4 DIGITAL TOUCHPOINT CARDS */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: WhatsApp */}
          <div className="p-6 rounded-3xl bg-surface-container-lowest border border-surface-container shadow-sm flex flex-col justify-between space-y-4 hover:border-primary/40 transition">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">chat</span>
              </div>
              <div>
                <span className="text-[11px] uppercase font-bold text-emerald-700 tracking-wider">Fastest Response</span>
                <h3 className="text-base font-bold text-on-surface mt-0.5">WhatsApp Helpline</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed mt-1">
                  Connect directly with an expedition architect for instant availability and custom bookings.
                </p>
              </div>
            </div>
            <a
              href={`https://wa.me/${defaultWaNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold transition shadow-sm"
            >
              <span className="material-symbols-outlined text-[17px]">chat</span>
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          {/* Card 2: Facebook & Messenger */}
          <div className="p-6 rounded-3xl bg-surface-container-lowest border border-surface-container shadow-sm flex flex-col justify-between space-y-4 hover:border-blue-500/40 transition">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0084FF] flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">forum</span>
              </div>
              <div>
                <span className="text-[11px] uppercase font-bold text-blue-700 tracking-wider">Social Chat</span>
                <h3 className="text-base font-bold text-on-surface mt-0.5">Facebook Messenger</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed mt-1">
                  Send a direct message on our verified Facebook page or view our latest expedition posts.
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <a
                href="https://www.facebook.com/messages/t/431751336697364"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#0084FF] hover:bg-[#0073e6] text-white text-xs font-bold transition shadow-sm"
              >
                <span className="material-symbols-outlined text-[17px]">forum</span>
                <span>Direct Messenger</span>
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61568715145902"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 w-full py-2 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface text-[11px] font-semibold border border-outline-variant/30 transition"
              >
                <span className="material-symbols-outlined text-[15px] text-blue-600">thumb_up</span>
                <span>Visit Facebook Page</span>
              </a>
            </div>
          </div>

          {/* Card 3: Phone Hotline */}
          <div className="p-6 rounded-3xl bg-surface-container-lowest border border-surface-container shadow-sm flex flex-col justify-between space-y-4 hover:border-primary/40 transition">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">call</span>
              </div>
              <div>
                <span className="text-[11px] uppercase font-bold text-primary tracking-wider">Direct Voice Support</span>
                <h3 className="text-base font-bold text-on-surface mt-0.5">Hotline Support</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed mt-1">
                  Have an urgent departure or need immediate tour assistance? Call our dedicated team directly.
                </p>
              </div>
            </div>
            <a
              href={phoneTel}
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface text-xs font-bold border border-outline-variant/30 transition shadow-sm"
            >
              <span className="material-symbols-outlined text-primary text-[17px]">call</span>
              <span>Call {phoneDisplay}</span>
            </a>
          </div>

          {/* Card 4: Email */}
          <div className="p-6 rounded-3xl bg-surface-container-lowest border border-surface-container shadow-sm flex flex-col justify-between space-y-4 hover:border-primary/40 transition">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">mail</span>
              </div>
              <div>
                <span className="text-[11px] uppercase font-bold text-secondary tracking-wider">Corporate & Custom Quotes</span>
                <h3 className="text-base font-bold text-on-surface mt-0.5">Email Inquiries</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed mt-1">
                  For formal corporate retreat proposals, group invoices, or partnership queries, drop us an email.
                </p>
              </div>
            </div>
            <a
              href="mailto:info@traversebd.com"
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface text-xs font-bold border border-outline-variant/30 transition shadow-sm"
            >
              <span className="material-symbols-outlined text-secondary text-[17px]">send</span>
              <span>info@traversebd.com</span>
            </a>
          </div>
        </div>
      </section>

      {/* 3. DIRECT MESSAGING FORM & DIGITAL OPERATIONS BANNER */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Direct Messaging Form */}
          <div className="lg:col-span-7 rounded-3xl bg-surface-container-lowest border border-surface-container p-6 sm:p-10 shadow-sm space-y-6">
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-wider text-primary font-bold">
                Online Inquiry Form
              </span>
              <h2 className="text-2xl font-bold text-on-surface">Send Us a Direct Message</h2>
              <p className="text-xs text-on-surface-variant">
                We review online inquiries within 30 minutes during standard operations hours (09:00 AM – 11:00 PM BST).
              </p>
            </div>

            {isSubmitted ? (
              <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-8 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <span className="material-symbols-outlined text-3xl">check_circle</span>
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-emerald-950">
                    Inquiry Received Successfully!
                  </h3>
                  <p className="text-xs text-emerald-800 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="font-bold">{fullName}</strong>. Your inquiry regarding{' '}
                    <strong className="font-bold">{preferredTour}</strong> has been logged with our digital operations desk.
                  </p>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={getDirectWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] text-white text-xs font-bold shadow-md hover:bg-[#20ba59] transition"
                  >
                    <span className="material-symbols-outlined text-[18px]">chat</span>
                    <span>Continue on WhatsApp (+880 1627-444330)</span>
                  </a>

                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setMessageText('');
                    }}
                    className="px-5 py-3 rounded-xl bg-white border border-emerald-300 text-emerald-900 text-xs font-bold hover:bg-emerald-100 transition"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-on-surface">Full Name *</label>
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
                    <label className="text-xs font-bold text-on-surface">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={emailAddress}
                      onChange={(e) => setEmailAddress(e.target.value)}
                      placeholder="e.g. tanvir@example.com"
                      className="w-full bg-surface-container-low text-on-surface text-xs px-3.5 py-2.5 rounded-xl border border-surface-container-high focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-on-surface">Phone Number (WhatsApp) *</label>
                    <input
                      type="tel"
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="e.g. 017XXXXXXXX"
                      className="w-full bg-surface-container-low text-on-surface text-xs px-3.5 py-2.5 rounded-xl border border-surface-container-high focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-on-surface">Travelers Count</label>
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
                  <label className="text-xs font-bold text-on-surface">Interested Tour or Service</label>
                  <select
                    value={preferredTour}
                    onChange={(e) => setPreferredTour(e.target.value)}
                    className="w-full bg-surface-container-low text-on-surface text-xs px-3.5 py-2.5 rounded-xl border border-surface-container-high focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
                  >
                    <optgroup label="Domestic Tours">
                      <option value="Sajek Valley (Cloud Kingdom)">Sajek Valley (Cloud Kingdom)</option>
                      <option value="Saint Martin Island (Coral Sanctuary)">Saint Martin Island (Coral Sanctuary)</option>
                      <option value="Sundarbans Mangrove Safari">Sundarbans Mangrove Safari</option>
                      <option value="Cox's Bazar Marine Drive Retreat">Cox's Bazar Marine Drive Retreat</option>
                      <option value="Sreemangal Tea Estates & Rainforest">Sreemangal Tea Estates & Rainforest</option>
                      <option value="Bandarban Peaks & Nafakhum Trek">Bandarban Peaks & Nafakhum Trek</option>
                    </optgroup>
                    <optgroup label="Custom & Corporate Services">
                      <option value="Corporate Retreat / Team Outing">Corporate Retreat / Team Outing</option>
                      <option value="Ship / Bus / Air Ticket Booking">Ship / Bus / Air Ticket Booking</option>
                      <option value="Custom Group Itinerary">Custom Group Itinerary</option>
                    </optgroup>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-on-surface">Your Message & Travel Dates</label>
                  <textarea
                    rows={4}
                    required
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Tell us about your target travel dates, vehicle preferences, or custom requirements..."
                    className="w-full bg-surface-container-low text-on-surface text-xs p-3.5 rounded-xl border border-surface-container-high focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="submit"
                    className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary hover:bg-primary-container text-white font-bold text-xs shadow-md shadow-primary/20 transition"
                  >
                    <span className="material-symbols-outlined text-[18px]">send</span>
                    <span>Submit Online Inquiry</span>
                  </button>

                  <a
                    href={getDirectWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs shadow-md transition"
                  >
                    <span className="material-symbols-outlined text-[18px]">chat</span>
                    <span>Chat on WhatsApp</span>
                  </a>

                  <a
                    href="https://www.facebook.com/messages/t/431751336697364"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#0084FF] hover:bg-[#0073e6] text-white font-bold text-xs shadow-md transition"
                  >
                    <span className="material-symbols-outlined text-[18px]">forum</span>
                    <span>Message on Messenger</span>
                  </a>
                </div>
              </form>
            )}
          </div>

          {/* Online Operations Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl bg-surface-container-lowest border border-surface-container p-6 sm:p-8 shadow-sm space-y-5">
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-wider text-primary font-bold">
                  How We Operate
                </span>
                <h3 className="text-lg font-bold text-on-surface">100% Online & On-Ground Certified</h3>
              </div>

              <div className="space-y-4 text-xs text-on-surface-variant leading-relaxed">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">
                    cloud_done
                  </span>
                  <div>
                    <strong className="text-on-surface font-semibold">Zero Office Overhead:</strong>
                    <p className="text-[11px] mt-0.5">We maintain zero physical retail branches, eliminating commercial rent so we can provide superior cottage rates and vehicle pricing directly to you.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">
                    verified_user
                  </span>
                  <div>
                    <strong className="text-on-surface font-semibold">Certified On-Ground Guides:</strong>
                    <p className="text-[11px] mt-0.5">While bookings are managed online, our licensed mountain 4x4 drivers and certified local guides welcome you in-person at destination trailheads.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">
                    receipt_long
                  </span>
                  <div>
                    <strong className="text-on-surface font-semibold">Instant Digital Vouchers:</strong>
                    <p className="text-[11px] mt-0.5">Receive clear PDF itineraries, driver details, and payment receipts directly to your WhatsApp and email within minutes of confirmation.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Operating Hours Card */}
            <div className="rounded-3xl bg-surface-container-lowest border border-surface-container p-6 sm:p-8 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-on-surface">Digital Operations Schedule</h3>
              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-surface-container">
                  <span className="text-on-surface-variant">WhatsApp Concierge:</span>
                  <span className="font-bold text-primary">24 Hours / 7 Days</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-surface-container">
                  <span className="text-on-surface-variant">Hotline Voice Care:</span>
                  <span className="font-bold text-on-surface">09:00 AM – 11:00 PM BST</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-on-surface-variant">Emergency Field Dispatch:</span>
                  <span className="font-bold text-emerald-700">Always Active on Trail</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FAQ ACCORDION */}
      <section className="max-w-4xl mx-auto px-6 lg:px-12 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs uppercase tracking-wider text-primary font-bold">Frequently Asked</span>
          <h2 className="text-2xl font-bold text-on-surface">Frequently Asked Questions</h2>
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
