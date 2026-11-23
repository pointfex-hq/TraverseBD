/**
 * WhatsApp Inquiry Message Construction Service
 * 
 * Master PRD v1.0 Section 7.1 Contract:
 * Link: https://wa.me/{international_digits}?text={URL_encoded_message}
 * 
 * Rules:
 * - Construct clear, polite bilingual messages.
 * - Contain package title, package link, departure date (if chosen), and traveler count.
 * - Outbound click only: NEVER create or save an inquiry or booking record in the database.
 */

import { formatCurrencyBDT } from '@backend/services/pricing.service';
import { PriceMode } from '@backend/types/database.types';

export interface WhatsAppInquiryParams {
  packageTitle: string;
  packageSlug: string;
  packagePrice?: number;
  priceMode?: PriceMode;
  departureDate?: string;
  travelerCount?: number;
  customNote?: string;
  locale?: 'en' | 'bn';
  phoneNumber?: string;
  siteUrl?: string;
}

export function generateWhatsAppInquiryUrl(params: WhatsAppInquiryParams): string {
  const defaultNumber =
    process.env.NEXT_PUBLIC_DEFAULT_WHATSAPP_NUMBER?.replace(/\D/g, '') || '8801700000000';
  const targetNumber = (params.phoneNumber || defaultNumber).replace(/\D/g, '');
  const baseUrl = params.siteUrl || process.env.NEXT_PUBLIC_SITE_URL || 'https://traversebd.com';
  const packageUrl = `${baseUrl.replace(/\/$/, '')}/packages/${params.packageSlug}`;

  let message = '';

  if (params.locale === 'bn') {
    // Bengali template
    message = `নমস্কার / আসসালামু আলাইকুম TraverseBD,
আমি "${params.packageTitle}" ট্যুর প্যাকেজটি সম্পর্কে বিস্তারিত জানতে আগ্রহী।

📌 প্যাকেজ লিঙ্ক: ${packageUrl}`;

    if (params.packagePrice) {
      message += `\n💰 প্যাকেজ মূল্য: ${formatCurrencyBDT(params.packagePrice, params.priceMode, 'bn')}`;
    }

    if (params.departureDate) {
      message += `\n📅 সম্ভাব্য যাত্রার তারিখ: ${params.departureDate}`;
    }

    if (params.travelerCount) {
      message += `\n👥 ভ্রমণকারীর সংখ্যা: ${params.travelerCount} জন`;
    }

    if (params.customNote?.trim()) {
      message += `\n💬 বিশেষ জিজ্ঞাসা: ${params.customNote.trim()}`;
    }

    message += '\n\nদয়া করে এই প্যাকেজের বুকিং প্রসেস ও বিস্তারিত তথ্য জানিয়ে সহায়তা করবেন। ধন্যবাদ!';
  } else {
    // English template (default)
    message = `Hello TraverseBD Team,
I am interested in inquiring about the "${params.packageTitle}" tour package.

📌 Package URL: ${packageUrl}`;

    if (params.packagePrice) {
      message += `\n💰 Price: ${formatCurrencyBDT(params.packagePrice, params.priceMode, 'en')}`;
    }

    if (params.departureDate) {
      message += `\n📅 Preferred Departure Date: ${params.departureDate}`;
    }

    if (params.travelerCount) {
      message += `\n👥 Number of Travelers: ${params.travelerCount}`;
    }

    if (params.customNote?.trim()) {
      message += `\n💬 Additional Note: ${params.customNote.trim()}`;
    }

    message += '\n\nPlease let me know about availability and booking procedures. Thank you!';
  }

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${targetNumber}?text=${encodedMessage}`;
}
