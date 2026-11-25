/**
 * TraverseBD Database Types & API Contracts (Backend Core)
 */

export type ContentStatus = 'draft' | 'published' | 'archived';
export type PriceMode = 'fixed' | 'starting_from';
export type DepartureStatus = 'available' | 'few_seats' | 'sold_out' | 'cancelled';
export type PackageItemType =
  | 'included'
  | 'excluded'
  | 'activity'
  | 'food'
  | 'accommodation'
  | 'transport'
  | 'note';
export type AdminRole = 'super_admin' | 'admin';

export interface Destination {
  id: string;
  slug: string;
  name_en: string;
  name_bn: string;
  region: string;
  short_description_en: string;
  short_description_bn: string;
  full_description_en: string;
  full_description_bn: string;
  cover_image_url: string;
  highlights: string[];
  travel_tips: string[];
  status: ContentStatus;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
  destination?: Partial<Destination>;
  category?: Partial<Category>;
  itinerary?: ItineraryDay[];
  items?: PackageItem[];
  departures?: PackageDeparture[];
  images?: PackageImage[];
}

export interface Category {
  id: string;
  slug: string;
  name_en: string;
  name_bn: string;
  description_en: string | null;
  description_bn: string | null;
  sort_order: number;
  status: ContentStatus;
  created_at: string;
}

export interface Package {
  id: string;
  slug: string;
  destination_id: string;
  category_id: string;
  title_en: string;
  title_bn: string;
  short_description_en: string;
  short_description_bn: string;
  full_description_en: string;
  full_description_bn: string;
  price_mode: PriceMode;
  price_bdt: number;
  duration_days: number;
  duration_nights: number;
  cover_image_url: string;
  status: ContentStatus;
  is_featured: boolean;
  is_trending: boolean;
  tour_type?: 'domestic' | 'international';
  created_at: string;
  updated_at: string;
  destination?: Partial<Destination>;
  category?: Partial<Category>;
  itinerary?: ItineraryDay[];
  items?: PackageItem[];
  departures?: PackageDeparture[];
  images?: PackageImage[];
}

export interface PackageImage {
  id: string;
  package_id: string;
  image_url: string;
  alt_en: string;
  alt_bn: string;
  sort_order: number;
  created_at: string;
}

export interface ItineraryDay {
  id: string;
  package_id: string;
  day_no: number;
  title_en: string;
  title_bn: string;
  description_en: string;
  description_bn: string;
  created_at: string;
}

export interface PackageItem {
  id: string;
  package_id: string;
  type: PackageItemType;
  text_en: string;
  text_bn: string;
  sort_order: number;
  created_at: string;
}

export interface PackageDeparture {
  id: string;
  package_id: string;
  departure_date: string;
  capacity: number;
  available_seats: number;
  status: DepartureStatus;
  created_at: string;
  updated_at: string;
  destination?: Partial<Destination>;
  category?: Partial<Category>;
  itinerary?: ItineraryDay[];
  items?: PackageItem[];
  departures?: PackageDeparture[];
  images?: PackageImage[];
}

export interface SiteSetting {
  id: string;
  key: string;
  value: Record<string, unknown> | string | number | boolean;
  description: string | null;
  updated_at: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title_en: string;
  title_bn: string;
  content_en: string;
  content_bn: string;
  excerpt_en: string;
  excerpt_bn: string;
  author_name: string;
  cover_image_url: string;
  category: string;
  read_time_minutes: number;
  status: ContentStatus;
  published_at: string;
  created_at: string;
}

export interface Testimonial {
  id: string;
  author_name: string;
  author_location: string;
  rating: number;
  comment_en: string;
  comment_bn: string;
  tour_package_name: string;
  avatar_url?: string;
  created_at: string;
}

export interface PackageDetailDTO extends Package {
  destination: Pick<Destination, 'id' | 'slug' | 'name_en' | 'name_bn' | 'region'>;
  category: Pick<Category, 'id' | 'slug' | 'name_en' | 'name_bn'>;
  images: PackageImage[];
  itinerary: ItineraryDay[];
  items: PackageItem[];
  departures: PackageDeparture[];
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
