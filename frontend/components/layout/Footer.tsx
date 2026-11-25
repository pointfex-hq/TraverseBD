'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const phoneDisplay = '01627444330';
  const phoneTel = 'tel:01627444330';
  const whatsappUrl = 'https://wa.me/8801627444330';

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setIsSubscribed(true);
      setTimeout(() => setIsSubscribed(false), 5000);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="w-full bg-surface-container-low border-t border-outline-variant/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-14 pb-8">
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* 1. Brand & Description with User's Exact Logo */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <Link href="/" className="flex items-center gap-3 group">
              <img
                alt="Traverse BD Logo"
                className="h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXJry_084FVvaamK2wzFARSx0govYR3D9JvwW4cvnnywmeoQWr_MN_fdOW25FZ9ucz0-zZSsepESRyonG0FsaNv5kagA7IeMNNWgJFZRV-3766QFRhRWRPL1SBZN1aacv_3zVrGgQSUB_Y04t_73bKrRFsZrOg78wq7xGhWAYwqw-aB_FwI1RfsUGCvWUgcgeXSlk1EXvoiUpmD2FOJsGcOy73vsHaIVUNHjojvCy6uI9LkXmC85zKEQ"
              />
              <div className="flex flex-col justify-center">
                <span className="text-[19px] leading-tight text-primary font-bold tracking-tight">
                  Traverse BD
                </span>
                <span className="text-[10px] text-on-surface-variant font-semibold tracking-widest uppercase">
                  Journeys Across Bangladesh
                </span>
              </div>
            </Link>
            <p className="text-xs sm:text-sm text-on-surface-variant max-w-sm leading-relaxed">
              Crafting pristine expeditions across Bangladesh—from the mystical Sundarbans mangroves and Cox&apos;s Bazar
              coastlines to the majestic Bandarban peaks and quiet tea valleys with 24/7 digital booking.
            </p>
            <div className="flex items-center gap-2 mt-2">
              <Link
                aria-label="Tour Packages"
                className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-secondary hover:bg-primary hover:text-white transition-all"
                href="/packages"
              >
                <span className="material-symbols-outlined text-[16px]">backpack</span>
              </Link>
              <Link
                aria-label="Our Services"
                className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-secondary hover:bg-primary hover:text-white transition-all"
                href="/services"
              >
                <span className="material-symbols-outlined text-[16px]">room_service</span>
              </Link>
              <Link
                aria-label="Photo Gallery"
                className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-secondary hover:bg-primary hover:text-white transition-all"
                href="/gallery"
              >
                <span className="material-symbols-outlined text-[16px]">photo_camera</span>
              </Link>
              <Link
                aria-label="Travel Blog"
                className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-secondary hover:bg-primary hover:text-white transition-all"
                href="/blog"
              >
                <span className="material-symbols-outlined text-[16px]">article</span>
              </Link>
            </div>
          </div>

          {/* 2. Quick Links (Aligned with Navbar - No About Us) */}
          <div className="flex flex-col gap-2">
            <span className="font-bold text-sm text-on-surface mb-1">Quick Links</span>
            <Link className="text-xs text-on-surface-variant hover:text-primary transition-colors" href="/">
              Home
            </Link>
            <Link className="text-xs text-on-surface-variant hover:text-primary transition-colors" href="/packages">
              Tour Packages
            </Link>
            <Link className="text-xs text-on-surface-variant hover:text-primary transition-colors" href="/destinations">
              Destinations
            </Link>
            <Link className="text-xs text-on-surface-variant hover:text-primary transition-colors" href="/services">
              Our Services
            </Link>
            <Link className="text-xs text-on-surface-variant hover:text-primary transition-colors" href="/why-us">
              Why Us
            </Link>
            <Link className="text-xs text-on-surface-variant hover:text-primary transition-colors" href="/gallery">
              Photo Gallery
            </Link>
            <Link className="text-xs text-on-surface-variant hover:text-primary transition-colors" href="/blog">
              Travel Blog
            </Link>
            <Link className="text-xs text-on-surface-variant hover:text-primary transition-colors" href="/contact">
              Contact Us
            </Link>
          </div>

          {/* 3. Contact & Online Support */}
          <div className="flex flex-col gap-2">
            <span className="font-bold text-sm text-on-surface mb-1">Online Support</span>
            <div className="flex items-center gap-2 text-on-surface-variant text-xs">
              <span className="material-symbols-outlined text-primary text-[16px]">call</span>
              <a className="hover:text-primary font-medium" href={phoneTel}>
                {phoneDisplay}
              </a>
            </div>
            <div className="flex items-center gap-2 text-on-surface-variant text-xs">
              <span className="material-symbols-outlined text-primary text-[16px]">mail</span>
              <a className="hover:text-primary" href="mailto:info@traversebd.com">
                info@traversebd.com
              </a>
            </div>
            <div className="flex items-start gap-2 text-on-surface-variant text-xs">
              <span className="material-symbols-outlined text-primary text-[16px] mt-0.5">language</span>
              <span>100% Online Operations (Nationwide Bangladesh)</span>
            </div>
            <div className="flex items-center gap-2 text-on-surface-variant text-xs mt-1">
              <span className="material-symbols-outlined text-emerald-600 text-[16px]">chat</span>
              <a
                className="text-emerald-700 font-semibold hover:underline"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp 24/7 Helpline
              </a>
            </div>
          </div>

          {/* 4. Newsletter */}
          <div className="flex flex-col gap-2">
            <span className="font-bold text-sm text-on-surface mb-1">Newsletter</span>
            <p className="text-xs text-on-surface-variant">
              Get curated seasonal travel itineraries directly to your inbox.
            </p>
            {isSubscribed ? (
              <div className="p-3 rounded-xl bg-primary/10 text-primary text-xs font-semibold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px]">check_circle</span>
                <span>Thank you for subscribing!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2 mt-1">
                <input
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-surface-container-lowest text-on-surface text-xs outline-none border border-outline-variant/30 focus:border-primary"
                  placeholder="Your email address"
                  required
                  type="email"
                />
                <button
                  className="px-3 py-2 rounded-xl bg-secondary text-on-secondary hover:bg-tertiary font-bold text-xs transition-all shadow-sm"
                  type="submit"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Credits with Year 2026 */}
        <div className="pt-4 border-t border-outline-variant/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p className="text-xs text-on-surface-variant">
            © 2026 Traverse BD. All rights reserved. | 100% Online Expeditions Across Bangladesh.
          </p>
          <p className="text-xs text-on-surface font-medium flex items-center gap-1.5">
            <span>Developed by</span>
            <span className="text-primary font-bold hover:underline tracking-wide cursor-pointer">
              Pointfex
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
