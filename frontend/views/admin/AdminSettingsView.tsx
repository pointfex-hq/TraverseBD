'use client';

import React, { useState, useEffect } from 'react';
import { SiteSettings } from '@backend/data/admin-mock-data';

export default function AdminSettingsView() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Form Fields
  const [phoneHotline, setPhoneHotline] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [operationsMode, setOperationsMode] = useState('');
  const [heroTitle, setHeroTitle] = useState('');
  const [heroSubtitle, setHeroSubtitle] = useState('');
  const [statTravelers, setStatTravelers] = useState('');
  const [statRating, setStatRating] = useState('');
  const [statCertified, setStatCertified] = useState('');
  const [socialFacebook, setSocialFacebook] = useState('');
  const [socialMessenger, setSocialMessenger] = useState('');
  const [socialInstagram, setSocialInstagram] = useState('');
  const [socialYoutube, setSocialYoutube] = useState('');
  const [socialWhatsappGroup, setSocialWhatsappGroup] = useState('');
  const [corporateNotice, setCorporateNotice] = useState('');
  const [heroFeaturedBadge, setHeroFeaturedBadge] = useState('');
  const [heroFeaturedTitle, setHeroFeaturedTitle] = useState('');
  const [heroFeaturedSubtitle, setHeroFeaturedSubtitle] = useState('');
  const [heroFeaturedPrice, setHeroFeaturedPrice] = useState('');
  const [heroFeaturedLocation, setHeroFeaturedLocation] = useState('');
  const [heroFeaturedImage, setHeroFeaturedImage] = useState('');
  const [heroFeaturedLink, setHeroFeaturedLink] = useState('');

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/settings');
      const json = await res.json();
      if (json.data) {
        const s: SiteSettings = json.data;
        setPhoneHotline(s.phone_hotline || '');
        setWhatsappNumber(s.whatsapp_number || '');
        setContactEmail(s.contact_email || '');
        setOperationsMode(s.operations_mode || '');
        setHeroTitle(s.hero_title || '');
        setHeroSubtitle(s.hero_subtitle || '');
        setStatTravelers(s.stat_travelers || '');
        setStatRating(s.stat_rating || '');
        setStatCertified(s.stat_certified || '');
        setSocialFacebook(s.social_facebook || '');
        setSocialMessenger((s as any).social_messenger || '');
        setSocialInstagram(s.social_instagram || '');
        setSocialYoutube(s.social_youtube || '');
        setSocialWhatsappGroup(s.social_whatsapp_group || '');
        setCorporateNotice(s.corporate_inquiry_notice || '');
        setHeroFeaturedBadge(s.hero_featured_badge || '');
        setHeroFeaturedTitle(s.hero_featured_title || '');
        setHeroFeaturedSubtitle(s.hero_featured_subtitle || '');
        setHeroFeaturedPrice(s.hero_featured_price || '');
        setHeroFeaturedLocation(s.hero_featured_location || '');
        setHeroFeaturedImage(s.hero_featured_image || '');
        setHeroFeaturedLink(s.hero_featured_link || '');
      }
    } catch (err) {
      console.error('Failed to load site settings', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneHotline.trim() || !whatsappNumber.trim() || !contactEmail.trim()) {
      setMessage({ type: 'error', text: 'Phone Hotline, WhatsApp number, and Contact Email are required.' });
      return;
    }

    try {
      setSaving(true);
      setMessage(null);

      const payload: Partial<SiteSettings> = {
        phone_hotline: phoneHotline.trim(),
        whatsapp_number: whatsappNumber.trim(),
        contact_email: contactEmail.trim(),
        operations_mode: operationsMode.trim(),
        hero_title: heroTitle.trim(),
        hero_subtitle: heroSubtitle.trim(),
        stat_travelers: statTravelers.trim(),
        stat_rating: statRating.trim(),
        stat_certified: statCertified.trim(),
        social_facebook: socialFacebook.trim(),
        social_messenger: socialMessenger.trim(),
        social_instagram: socialInstagram.trim(),
        social_youtube: socialYoutube.trim(),
        social_whatsapp_group: socialWhatsappGroup.trim(),
        corporate_inquiry_notice: corporateNotice.trim(),
        hero_featured_badge: heroFeaturedBadge.trim(),
        hero_featured_title: heroFeaturedTitle.trim(),
        hero_featured_subtitle: heroFeaturedSubtitle.trim(),
        hero_featured_price: heroFeaturedPrice.trim(),
        hero_featured_location: heroFeaturedLocation.trim(),
        hero_featured_image: heroFeaturedImage.trim(),
        hero_featured_link: heroFeaturedLink.trim(),
      };

      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to save settings');

      setMessage({ type: 'success', text: 'Global website settings successfully saved and updated!' });
      setTimeout(() => setMessage(null), 4000);
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Something went wrong.' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-slate-900 p-4 sm:p-6 rounded-2xl border border-slate-800 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/20 text-primary-fixed text-xs font-bold uppercase tracking-wider mb-2 border border-primary/30">
            <span className="material-symbols-outlined text-[15px]">tune</span>
            Brand &amp; System Configuration
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">Website Global Settings</h1>
          <p className="text-xs text-slate-400 mt-1">
            Configure emergency hotlines, WhatsApp routing, homepage headlines, and online operations parameters.
          </p>
        </div>
      </div>

      {message && (
        <div
          className={`p-4 rounded-xl text-xs font-bold flex items-center gap-2 ${
            message.type === 'success'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              : 'bg-red-500/20 text-red-300 border border-red-500/30'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">
            {message.type === 'success' ? 'check_circle' : 'error'}
          </span>
          <span>{message.text}</span>
        </div>
      )}

      {loading ? (
        <div className="p-12 text-center text-xs text-slate-400 bg-slate-900 rounded-2xl border border-slate-800">
          Loading platform configurations...
        </div>
      ) : (
        <form onSubmit={handleSave} className="space-y-6">
          {/* Section 1: Communications & Channels */}
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
              <span className="material-symbols-outlined text-primary-fixed text-[20px]">contact_phone</span>
              <h2 className="font-bold text-sm text-white uppercase tracking-wider">
                Communications &amp; Emergency Routing
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Hotline Phone (Display &amp; Call) *
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-[16px]">
                    call
                  </span>
                  <input
                    type="text"
                    required
                    placeholder="01627444330"
                    value={phoneHotline}
                    onChange={(e) => setPhoneHotline(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-800 rounded-xl text-xs text-white border border-slate-700 focus:outline-none focus:border-primary font-mono placeholder-slate-500"
                  />
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Shown in the header, footer, and callback modal.
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                  WhatsApp Direct Number (With Country Code) *
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-[16px]">
                    chat
                  </span>
                  <input
                    type="text"
                    required
                    placeholder="8801627444330"
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-800 rounded-xl text-xs text-white border border-slate-700 focus:outline-none focus:border-primary font-mono placeholder-slate-500"
                  />
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Numbers only (e.g. 8801627444330). Directs all 1-click booking inquiries.
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Official Inquiries Email *
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-[16px]">
                    mail
                  </span>
                  <input
                    type="email"
                    required
                    placeholder="info@traversebd.com"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-800 rounded-xl text-xs text-white border border-slate-700 focus:outline-none focus:border-primary font-mono placeholder-slate-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Operations Mode
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-[16px]">
                    cloud_done
                  </span>
                  <input
                    type="text"
                    placeholder="100% Online Operations (Nationwide Bangladesh)"
                    value={operationsMode}
                    onChange={(e) => setOperationsMode(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-800 rounded-xl text-xs text-white border border-slate-700 focus:outline-none focus:border-primary placeholder-slate-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Homepage Hero Configuration */}
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
              <span className="material-symbols-outlined text-primary-fixed text-[20px]">web</span>
              <h2 className="font-bold text-sm text-white uppercase tracking-wider">
                Home Hero &amp; Brand Taglines
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Hero Main Headline
                </label>
                <input
                  type="text"
                  placeholder="Discover the Untamed Beauty of Bengal & Beyond"
                  value={heroTitle}
                  onChange={(e) => setHeroTitle(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-800 rounded-xl text-xs text-white border border-slate-700 focus:outline-none focus:border-primary font-semibold placeholder-slate-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Hero Subtitle Paragraph
                </label>
                <textarea
                  rows={3}
                  placeholder="Customized corporate retreats, student adventures, luxury mangrove houseboats..."
                  value={heroSubtitle}
                  onChange={(e) => setHeroSubtitle(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-800 rounded-xl text-xs text-white border border-slate-700 focus:outline-none focus:border-primary placeholder-slate-500"
                />
              </div>
            </div>
          </div>

          {/* Section: Hero Featured Highlight Card ("Featured Haven") */}
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
              <span className="material-symbols-outlined text-primary-fixed text-[20px]">stars</span>
              <h2 className="font-bold text-sm text-white uppercase tracking-wider">
                Hero Featured Card (&quot;Featured Haven&quot;)
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Card Badge Label
                </label>
                <input
                  type="text"
                  placeholder="Featured Haven"
                  value={heroFeaturedBadge}
                  onChange={(e) => setHeroFeaturedBadge(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-800 rounded-xl text-xs text-white border border-slate-700 focus:outline-none focus:border-primary font-semibold placeholder-slate-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Tour / Haven Title *
                </label>
                <input
                  type="text"
                  placeholder="Saint Martin Coral Bay"
                  value={heroFeaturedTitle}
                  onChange={(e) => setHeroFeaturedTitle(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-800 rounded-xl text-xs text-white border border-slate-700 focus:outline-none focus:border-primary font-semibold placeholder-slate-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Subtitle / Subheading
                </label>
                <input
                  type="text"
                  placeholder="Curated Beach Expedition"
                  value={heroFeaturedSubtitle}
                  onChange={(e) => setHeroFeaturedSubtitle(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-800 rounded-xl text-xs text-white border border-slate-700 focus:outline-none focus:border-primary placeholder-slate-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Price Label (e.g. BDT 9,200)
                </label>
                <input
                  type="text"
                  placeholder="BDT 9,200"
                  value={heroFeaturedPrice}
                  onChange={(e) => setHeroFeaturedPrice(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-800 rounded-xl text-xs text-white border border-slate-700 focus:outline-none focus:border-primary font-bold placeholder-slate-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Location Text (e.g. Dhaka • Cox • Saint Martin)
                </label>
                <input
                  type="text"
                  placeholder="Dhaka • Cox • Saint Martin"
                  value={heroFeaturedLocation}
                  onChange={(e) => setHeroFeaturedLocation(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-800 rounded-xl text-xs text-white border border-slate-700 focus:outline-none focus:border-primary placeholder-slate-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Explore Link (Path or Package URL)
                </label>
                <input
                  type="text"
                  placeholder="/packages"
                  value={heroFeaturedLink}
                  onChange={(e) => setHeroFeaturedLink(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-800 rounded-xl text-xs text-white border border-slate-700 focus:outline-none focus:border-primary font-mono text-[11px] placeholder-slate-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Feature Image URL
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={heroFeaturedImage}
                  onChange={(e) => setHeroFeaturedImage(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-800 rounded-xl text-xs text-white border border-slate-700 focus:outline-none focus:border-primary font-mono text-[11px] placeholder-slate-500"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Displayed prominently in the Hero Section card on the homepage.
                </span>
              </div>
            </div>
          </div>

          {/* Section 3: Social Proof & Metrics */}
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
              <span className="material-symbols-outlined text-primary-fixed text-[20px]">military_tech</span>
              <h2 className="font-bold text-sm text-white uppercase tracking-wider">
                Social Proof Badges
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Happy Travelers Metric
                </label>
                <input
                  type="text"
                  placeholder="15,000+"
                  value={statTravelers}
                  onChange={(e) => setStatTravelers(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-800 rounded-xl text-xs text-white border border-slate-700 focus:outline-none focus:border-primary font-bold placeholder-slate-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Verified Rating
                </label>
                <input
                  type="text"
                  placeholder="4.95 / 5.0"
                  value={statRating}
                  onChange={(e) => setStatRating(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-800 rounded-xl text-xs text-white border border-slate-700 focus:outline-none focus:border-primary font-bold placeholder-slate-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Certified Guides Text
                </label>
                <input
                  type="text"
                  placeholder="100% Certified"
                  value={statCertified}
                  onChange={(e) => setStatCertified(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-800 rounded-xl text-xs text-white border border-slate-700 focus:outline-none focus:border-primary font-bold placeholder-slate-500"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Social Channels & Community */}
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
              <span className="material-symbols-outlined text-primary-fixed text-[20px]">share</span>
              <h2 className="font-bold text-sm text-white uppercase tracking-wider">
                Social Channels &amp; Community Links
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Facebook Page Link
                </label>
                <input
                  type="url"
                  placeholder="https://www.facebook.com/profile.php?id=61568715145902"
                  value={socialFacebook}
                  onChange={(e) => setSocialFacebook(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-800 rounded-xl text-xs text-white border border-slate-700 focus:outline-none focus:border-primary font-mono text-[11px] placeholder-slate-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Facebook Messenger Direct Link
                </label>
                <input
                  type="url"
                  placeholder="https://www.facebook.com/messages/t/431751336697364"
                  value={socialMessenger}
                  onChange={(e) => setSocialMessenger(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-800 rounded-xl text-xs text-white border border-slate-700 focus:outline-none focus:border-primary font-mono text-[11px] placeholder-slate-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Instagram Profile Link
                </label>
                <input
                  type="url"
                  placeholder="https://instagram.com/traversebd"
                  value={socialInstagram}
                  onChange={(e) => setSocialInstagram(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-800 rounded-xl text-xs text-white border border-slate-700 focus:outline-none focus:border-primary font-mono text-[11px] placeholder-slate-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                  YouTube Channel Link
                </label>
                <input
                  type="url"
                  placeholder="https://youtube.com/@traversebd"
                  value={socialYoutube}
                  onChange={(e) => setSocialYoutube(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-800 rounded-xl text-xs text-white border border-slate-700 focus:outline-none focus:border-primary font-mono text-[11px] placeholder-slate-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                  WhatsApp Traveler Community Link
                </label>
                <input
                  type="url"
                  placeholder="https://chat.whatsapp.com/..."
                  value={socialWhatsappGroup}
                  onChange={(e) => setSocialWhatsappGroup(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-800 rounded-xl text-xs text-white border border-slate-700 focus:outline-none focus:border-primary font-mono text-[11px] placeholder-slate-500"
                />
              </div>
            </div>

            <div className="pt-2">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                Corporate &amp; Retreat Inquiries Notice
              </label>
              <input
                type="text"
                placeholder="Official VAT invoices, corporate retreat buyouts & dedicated coordinators available."
                value={corporateNotice}
                onChange={(e) => setCorporateNotice(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-800 rounded-xl text-xs text-white border border-slate-700 focus:outline-none focus:border-primary placeholder-slate-500"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-primary text-white text-xs font-bold uppercase tracking-wider shadow-md hover:bg-primary-container disabled:opacity-50 flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">save</span>
              <span>{saving ? 'Saving Settings...' : 'Save Global Settings'}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
