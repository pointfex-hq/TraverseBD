insert into admin_users (email, role, status)
values ('admin@traversebd.local', 'SUPER_ADMIN', 'Active')
on conflict (email) do update
set role = 'SUPER_ADMIN', status = 'Active';

insert into site_settings (setting_key, value) values
  ('store_name', 'TraverseBD'),
  ('whatsapp_number', ''),
  ('whatsapp_message', 'Hello TraverseBD'),
  ('contact_phone', ''),
  ('contact_email', ''),
  ('tagline', ''),
  ('address', ''),
  ('facebook_url', ''),
  ('instagram_url', ''),
  ('footer_text', '')
on conflict (setting_key) do nothing;
