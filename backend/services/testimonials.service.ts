export interface Testimonial {
  id: string;
  name: string;
  location: string;
  quote_en: string;
  quote_bn: string;
  rating: number;
  package_slug?: string;
  status: 'published' | 'draft';
}

export const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Tanvir Ahmed',
    location: 'Dhaka',
    quote_en: 'The Sajek Valley tour was flawlessly coordinated! Our cottage was literally surrounded by clouds every morning.',
    quote_bn: 'সাজেক ভ্যালি ট্যুরটি অসাধারণ ছিল! আমাদের কাঠের কটেজের বারান্দায় সকালবেলা মেঘের মেলা সত্যি মন ছুঁয়ে গেছে।',
    rating: 5,
    package_slug: 'sajek-valley-cloud-expedition',
    status: 'published',
  },
  {
    id: 't2',
    name: 'Nusrat Jahan',
    location: 'Chattogram',
    quote_en: 'Booking inquiry through WhatsApp was so effortless. Within 5 minutes we got our tour itinerary and questions answered.',
    quote_bn: 'হোয়াটসঅ্যাপে ইনকোয়ারি পাঠানোর ৫ মিনিটের মধ্যেই সব তথ্য পেয়ে গিয়েছিলাম। পুরো সার্ভিস খুব ফ্রেন্ডলি।',
    rating: 5,
    package_slug: 'coxs-bazar-coastal-retreat',
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
