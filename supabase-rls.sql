alter table destinations enable row level security;
alter table categories enable row level security;
alter table packages enable row level security;
alter table package_items enable row level security;
alter table departures enable row level security;
alter table gallery_images enable row level security;
alter table blog_posts enable row level security;
alter table testimonials enable row level security;
alter table travel_services enable row level security;
alter table faqs enable row level security;
alter table site_settings enable row level security;

-- Direct browser database access is denied. The Spring service-role backend owns writes.
revoke all on destinations, categories, packages, package_items, departures,
  gallery_images, blog_posts, testimonials, travel_services, faqs, site_settings
  from anon, authenticated;
