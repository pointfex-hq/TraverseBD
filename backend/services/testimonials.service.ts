export interface Testimonial {
  id: string;
  name: string;
  role?: string;
  location: string;
  avatarUrl: string;
  quote: string;
  rating: number;
  package_title: string;
  package_slug: string;
  date: string;
  verified: boolean;
  status: 'published' | 'draft';
}

export const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Tanvir Ahmed',
    role: 'Corporate Team Lead',
    location: 'Dhaka',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    quote: 'Our 40-person company retreat to Cox’s Bazar and Marine Drive was organized with unmatched precision. From luxury AC coaches to private beach barbecues, Traverse BD handled everything flawlessly.',
    rating: 5,
    package_title: "Cox's Bazar Marine Drive Retreat",
    package_slug: 'coxs-bazar-coastal-retreat',
    date: 'November 2025',
    verified: true,
    status: 'published',
  },
  {
    id: 't2',
    name: 'Nusrat Jahan & Family',
    role: 'Family Vacationer',
    location: 'Chattogram',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
    quote: 'Visiting Sajek Valley with elderly parents can be nerve-wracking, but Traverse BD assigned us a veteran 4x4 Chander Gari driver and secured an exceptional cloud-facing cottage at Konglak.',
    rating: 5,
    package_title: 'Sajek Valley Cloud Kingdom Escape',
    package_slug: 'sajek-valley-cloud-expedition',
    date: 'October 2025',
    verified: true,
    status: 'published',
  },
  {
    id: 't3',
    name: 'Dr. Sabrina Karim',
    role: 'Wildlife Photographer',
    location: 'Dhaka',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop',
    quote: 'The Sundarbans deep mangrove vessel experience exceeded all expectations. Certified naturalist escorts, armed guards for shore walks, and silent dawn canoeing into Kotka sanctuary. Simply world-class.',
    rating: 5,
    package_title: 'Sundarbans Deep Mangrove Safari',
    package_slug: 'sundarbans-deep-mangrove-safari',
    date: 'November 2025',
    verified: true,
    status: 'published',
  },
  {
    id: 't4',
    name: 'Mahir Faisal',
    role: 'Adventure Trekker',
    location: 'Sylhet',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    quote: 'Traverse BD arranged our Kashmir and Gulmarg winter expedition. The visa assistance, private heated houseboat in Srinagar, and gondola passes were completely sorted. 100% transparent pricing!',
    rating: 5,
    package_title: 'Kashmir Paradise Valley & Gulmarg',
    package_slug: 'kashmir-paradise-expedition',
    date: 'December 2025',
    verified: true,
    status: 'published',
  },
];

export async function getPublishedTestimonials(packageSlug?: string) {
  let list = MOCK_TESTIMONIALS.filter((t) => t.status === 'published');
  if (packageSlug) {
    list = list.filter((t) => t.package_slug === packageSlug);
  }
  return { data: list, error: null };
}
