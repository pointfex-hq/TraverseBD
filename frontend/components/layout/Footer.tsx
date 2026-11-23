import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface-container-lowest border-t border-surface-container-high pt-16 pb-8 text-on-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-surface-container">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center text-white shadow-md shadow-primary/20">
                <span className="material-symbols-outlined text-xl">explore</span>
              </div>
              <span className="font-extrabold text-xl tracking-tight text-on-surface">
                TRAVERSE <span className="text-primary">BD</span>
              </span>
            </Link>
            <p className="text-xs text-on-surface-variant leading-relaxed max-w-sm">
              Traverse BD is Bangladesh’s dedicated tourism portal, offering verified travel packages, scenic itineraries, and personalized adventures from the hills of Sajek to the coral beaches of Saint Martin.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="h-8 w-8 rounded-lg bg-surface-container hover:bg-primary hover:text-white text-secondary flex items-center justify-center transition-all text-xs"
                title="Facebook"
              >
                fb
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="h-8 w-8 rounded-lg bg-surface-container hover:bg-primary hover:text-white text-secondary flex items-center justify-center transition-all text-xs"
                title="Instagram"
              >
                ig
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="h-8 w-8 rounded-lg bg-surface-container hover:bg-primary hover:text-white text-secondary flex items-center justify-center transition-all text-xs"
                title="YouTube"
              >
                yt
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-primary">
              Explore
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/destinations" className="text-on-surface-variant hover:text-primary transition">
                  Top Destinations
                </Link>
              </li>
              <li>
                <Link href="/packages" className="text-on-surface-variant hover:text-primary transition">
                  All Tour Packages
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-on-surface-variant hover:text-primary transition">
                  Photo Gallery
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-on-surface-variant hover:text-primary transition">
                  Travel Stories & Tips
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Destinations */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-primary">
              Top Spots
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/packages?destination=coxs-bazar" className="text-on-surface-variant hover:text-primary transition">
                  Cox’s Bazar Beach
                </Link>
              </li>
              <li>
                <Link href="/packages?destination=sajek-valley" className="text-on-surface-variant hover:text-primary transition">
                  Sajek Cloud Valley
                </Link>
              </li>
              <li>
                <Link href="/packages?destination=sundarbans" className="text-on-surface-variant hover:text-primary transition">
                  Sundarbans Mangrove
                </Link>
              </li>
              <li>
                <Link href="/packages?destination=sreemangal-sylhet" className="text-on-surface-variant hover:text-primary transition">
                  Sreemangal Tea Estates
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-primary">
              Contact Us
            </h4>
            <ul className="space-y-2.5 text-xs text-on-surface-variant">
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-base text-primary">location_on</span>
                <span>Banani, Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base text-primary">call</span>
                <span>+880 1700-000000</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base text-primary">mail</span>
                <span>info@traversebd.com</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base text-emerald-600">chat</span>
                <a
                  href="https://wa.me/8801700000000"
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-700 font-semibold hover:underline"
                >
                  WhatsApp Helpline (24/7)
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-on-surface-variant">
          <p>
            © {currentYear} Traverse BD. All rights reserved. A project by Team Lithium (Pointfex).
          </p>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-primary transition">
              About
            </Link>
            <Link href="/contact" className="hover:text-primary transition">
              Help Center
            </Link>
            <span className="text-[11px] px-2 py-0.5 rounded bg-surface-container font-mono text-secondary font-semibold">
              v1.0 MVP
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
