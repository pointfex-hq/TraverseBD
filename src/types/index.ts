export type PublicationStatus = 'published' | 'draft';

export interface Destination {
  id: string;
  name: string;
  slug: string;
  region: string;
  short_description: string;
  full_description: string;
  cover_image_url: string;
  gallery_images?: string[];
  highlights: string[];
  travel_tips?: string[];
  best_time_to_visit?: string;
  status: PublicationStatus;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon?: string;
  sort_order: number;
  status: PublicationStatus;
}

export interface ItineraryDay {
  day_no: number;
  title: string;
  description: string;
}

export type PackageItemType = 
  | 'included' 
  | 'excluded' 
  | 'activity' 
  | 'food' 
  | 'accommodation' 
  | 'transport' 
  | 'note';

export interface PackageItem {
  id: string;
  type: PackageItemType;
  text: string;
  sort_order?: number;
}

export interface Package {
  id: string;
  title: string;
  slug: string;
  destination_id: string;
  destination_name: string;
  category_id: string;
  category_name: string;
  short_description: string;
  full_description: string;
  price: number; // in whole BDT (e.g. 8500)
  duration_days: number;
  duration_nights: number;
  cover_image_url: string;
  gallery_images?: string[];
  itinerary: ItineraryDay[];
  items: PackageItem[];
  status: PublicationStatus;
  is_featured: boolean;
  is_trending: boolean;
  created_at: string;
  updated_at: string;
}

export interface GalleryImage {
  id: string;
  image_url: string;
  caption: string;
  destination_id?: string;
  destination_name?: string;
  category?: string;
  status: PublicationStatus;
  sort_order: number;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image_url: string;
  author: string;
  author_role?: string;
  author_avatar?: string;
  read_time: string;
  published_at: string;
  status: PublicationStatus;
  destination_id?: string;
  tags: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role?: string;
  organization?: string;
  quote: string;
  rating: number; // 1 to 5
  avatar_url?: string;
  package_id?: string;
  status: PublicationStatus;
}

export interface SiteSettings {
  organization_name: string;
  contact_phone: string;
  contact_email: string;
  address: string;
  whatsapp_number: string; // international digits only, e.g. 8801627444330
  whatsapp_message: string; // template with {packageName} and {packageUrl}
  hero_title: string;
  hero_subtitle: string;
  facebook_url?: string;
  instagram_url?: string;
  youtube_url?: string;
  office_hours: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'super_admin' | 'editor';
  mfa_enabled: boolean;
  status: 'active' | 'suspended';
  last_login?: string;
}

export interface AuditLog {
  id: string;
  admin_email: string;
  action: string;
  target: string;
  timestamp: string;
}
