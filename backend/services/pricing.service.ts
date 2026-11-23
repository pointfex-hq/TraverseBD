/**
 * Pricing Rules & Formatting Service
 * Enforces:
 * - Whole BDT integers (DATA-02)
 * - Positive prices (> 0)
 * - Fixed vs Starting From price modes
 * - Bilingual currency formatting (English & Bangla digits)
 */

import { PriceMode } from '@backend/types/database.types';

// Convert English digits to Bengali numerals
export function toBengaliNumerals(num: number | string): string {
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(num).replace(/[0-9]/g, (digit) => bengaliDigits[Number(digit)]);
}

// Format integer price to comma-separated BDT string
export function formatCurrencyBDT(
  amount: number,
  mode: PriceMode = 'fixed',
  locale: 'en' | 'bn' = 'en'
): string {
  const formattedNumber = new Intl.NumberFormat('en-IN').format(amount);

  if (locale === 'bn') {
    const bnNumber = toBengaliNumerals(formattedNumber);
    if (mode === 'starting_from') {
      return `শুরু ৳${bnNumber} থেকে`;
    }
    return `৳${bnNumber}`;
  }

  // English
  if (mode === 'starting_from') {
    return `Starting from BDT ${formattedNumber}`;
  }
  return `BDT ${formattedNumber}`;
}

export function validatePackagePrice(price: number): { valid: boolean; error?: string } {
  if (!Number.isInteger(price)) {
    return { valid: false, error: 'Price must be a whole integer (BDT) without decimals.' };
  }
  if (price <= 0) {
    return { valid: false, error: 'Price must be greater than zero.' };
  }
  return { valid: true };
}
