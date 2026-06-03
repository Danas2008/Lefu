-- ============================================================
-- Lefu Čínská restaurace — Supabase Schema
-- Run this in Supabase SQL Editor
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- PROFILES (admin users)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  role TEXT NOT NULL DEFAULT 'admin',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profiles are viewable by owner" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Profiles are updatable by owner" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name');
  RETURN new;
END;
$$;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- ============================================================
-- MENU CATEGORIES
-- ============================================================
CREATE TABLE IF NOT EXISTS public.menu_categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.menu_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Categories are publicly readable" ON public.menu_categories
  FOR SELECT USING (true);

CREATE POLICY "Categories managed by authenticated users" ON public.menu_categories
  FOR ALL USING (auth.role() = 'authenticated');

-- ============================================================
-- MENU ITEMS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.menu_items (
  id SERIAL PRIMARY KEY,
  category_id INTEGER REFERENCES public.menu_categories(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10, 2) NOT NULL,
  image_url TEXT,
  spicy_level INTEGER NOT NULL DEFAULT 0 CHECK (spicy_level BETWEEN 0 AND 3),
  is_vegetarian BOOLEAN NOT NULL DEFAULT FALSE,
  is_available BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Menu items are publicly readable" ON public.menu_items
  FOR SELECT USING (true);

CREATE POLICY "Menu items managed by authenticated users" ON public.menu_items
  FOR ALL USING (auth.role() = 'authenticated');

-- ============================================================
-- RESERVATIONS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.reservations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  guests INTEGER NOT NULL CHECK (guests BETWEEN 1 AND 20),
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'cancelled', 'completed', 'pending')),
  table_number INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Reservations insertable by anyone" ON public.reservations
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Reservations readable by authenticated users" ON public.reservations
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Reservations updatable by authenticated users" ON public.reservations
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Reservations deletable by authenticated users" ON public.reservations
  FOR DELETE USING (auth.role() = 'authenticated');

-- ============================================================
-- GALLERY IMAGES
-- ============================================================
CREATE TABLE IF NOT EXISTS public.gallery_images (
  id SERIAL PRIMARY KEY,
  url TEXT NOT NULL,
  caption TEXT,
  category TEXT DEFAULT 'general',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Gallery publicly readable" ON public.gallery_images
  FOR SELECT USING (true);

CREATE POLICY "Gallery managed by authenticated users" ON public.gallery_images
  FOR ALL USING (auth.role() = 'authenticated');

-- ============================================================
-- SETTINGS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.settings (
  key TEXT PRIMARY KEY,
  value TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Settings publicly readable" ON public.settings
  FOR SELECT USING (true);

CREATE POLICY "Settings managed by authenticated users" ON public.settings
  FOR ALL USING (auth.role() = 'authenticated');

-- ============================================================
-- OPENING HOURS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.opening_hours (
  id SERIAL PRIMARY KEY,
  day_of_week INTEGER NOT NULL UNIQUE CHECK (day_of_week BETWEEN 0 AND 6),
  open_time TIME,
  close_time TIME,
  is_closed BOOLEAN NOT NULL DEFAULT FALSE
);

ALTER TABLE public.opening_hours ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Opening hours publicly readable" ON public.opening_hours
  FOR SELECT USING (true);

CREATE POLICY "Opening hours managed by authenticated users" ON public.opening_hours
  FOR ALL USING (auth.role() = 'authenticated');

-- ============================================================
-- SEO SETTINGS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.seo_settings (
  id SERIAL PRIMARY KEY,
  page TEXT NOT NULL UNIQUE,
  title TEXT,
  description TEXT,
  keywords TEXT,
  og_image TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.seo_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "SEO settings publicly readable" ON public.seo_settings
  FOR SELECT USING (true);

CREATE POLICY "SEO settings managed by authenticated users" ON public.seo_settings
  FOR ALL USING (auth.role() = 'authenticated');

-- ============================================================
-- SUPABASE STORAGE BUCKET
-- ============================================================
INSERT INTO storage.buckets (id, name, public) VALUES ('restaurant', 'restaurant', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Restaurant images publicly readable" ON storage.objects
  FOR SELECT USING (bucket_id = 'restaurant');

CREATE POLICY "Restaurant images uploadable by authenticated users" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'restaurant' AND auth.role() = 'authenticated');

CREATE POLICY "Restaurant images deletable by authenticated users" ON storage.objects
  FOR DELETE USING (bucket_id = 'restaurant' AND auth.role() = 'authenticated');

-- ============================================================
-- SEED DATA — CATEGORIES
-- ============================================================
INSERT INTO public.menu_categories (name, slug, sort_order) VALUES
  ('Polévky', 'polevky', 1),
  ('Předkrmy', 'predkrmy', 2),
  ('Hlavní jídla', 'hlavni-jidla', 3),
  ('Nudle', 'nudle', 4),
  ('Rýže', 'ryze', 5),
  ('Kachna', 'kachna', 6),
  ('Kuřecí maso', 'kureciho-masa', 7),
  ('Hovězí maso', 'hovaziho-masa', 8),
  ('Vepřové maso', 'veproveho-masa', 9),
  ('Mořské plody', 'morske-plody', 10),
  ('Vegetariánské', 'vegetarianske', 11),
  ('Dezerty', 'dezerty', 12),
  ('Nápoje', 'napoje', 13)
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- SEED DATA — MENU ITEMS
-- ============================================================
INSERT INTO public.menu_items (category_id, name, description, price, spicy_level, is_vegetarian, is_available) VALUES
-- Polévky
(1, 'Pekingská polévka', 'Tradiční číňanská polévka s vejci, bambusovými výhonky a tofu', 89, 0, false, true),
(1, 'Ostrá a kyselá polévka', 'Pikantní polévka s vepřovým masem, houbami a tofu', 99, 2, false, true),
(1, 'Miso polévka s tofu', 'Japonsky inspirovaná miso polévka s hedvábným tofu a wakame', 89, 0, true, true),
(1, 'Wonton polévka', 'Jemné wontonové taštičky s vepřovým masem ve voňavém vývaru', 109, 1, false, true),
-- Předkrmy
(2, 'Jarní závitky (4 ks)', 'Křupavé jarní závitky plněné zeleninou a vepřovým masem', 129, 0, false, true),
(2, 'Krevety v těstíčku', 'Smažené krevety ve zlatavém tempura těstíčku s chilli omáčkou', 169, 1, false, true),
(2, 'Kuřecí satay', 'Grilované kuřecí špízy se satay omáčkou z arašídů', 149, 0, false, true),
(2, 'Dim sum výběr (6 ks)', 'Tradiční dim sum košíčky s vepřovým, kuřecím a krevetovým nádivkou', 189, 0, false, true),
(2, 'Vegetariánský talíř', 'Výběr studené i teplé zeleniny s houbami a tofu', 139, 0, true, true),
-- Kachna
(6, 'Pekingská kachna (půl)', 'Tradiční Pekingská kachna se svěží okurkou, jarní cibulkou a hoisin omáčkou zabalená v palačinkách', 549, 0, false, true),
(6, 'Pekingská kachna (celá)', 'Celá tradiční Pekingská kachna pro 3–4 osoby se všemi přílohami', 989, 0, false, true),
(6, 'Kachna s pomerančovou omáčkou', 'Křupavá kachna s jemnou pomerančovou omáčkou a jasmínovou rýží', 329, 0, false, true),
(6, 'Kachna s pět kořením', 'Aromatická kachna marinovaná v pět kořením podávaná s dušenou zeleninou', 319, 1, false, true),
-- Kuřecí maso
(7, 'Kung Pao kuře', 'Klasické Si-čchuanské kuře s arašídy, bambusovými výhonky a sušenými chilli', 249, 3, false, true),
(7, 'Kuře Chow Mein', 'Šangajské kuřecí nudle s crispy zeleninou v sojové omáčce', 229, 1, false, true),
(7, 'Citronové kuře', 'Jemné kuřecí maso v lehké citronové omáčce s jasmínovou rýží', 239, 0, false, true),
(7, 'Kuře s kešu ořechy', 'Kuřecí filé s kešu ořechy a zeleninou v lehkém bujonové omáčce', 259, 0, false, true),
(7, 'Kuře s houbami a bambusem', 'Dušené kuřecí maso s houbami shiitake a bambusovými výhonky', 249, 0, false, true),
-- Hovězí maso
(8, 'Hovězí Mongolian', 'Jemné hovězí maso s jarní cibulkou v bohaté mongolské omáčce', 279, 1, false, true),
(8, 'Hovězí Chow Fun', 'Hovězí maso se širokými rýžovými nudlemi a zeleninou', 269, 1, false, true),
(8, 'Hovězí broccoli', 'Šťavnaté hovězí maso s brokolicí v česnekové sojové omáčce', 269, 0, false, true),
(8, 'Pepřové hovězí', 'Hovězí maso s barevnou paprikou v pikantní pepřové omáčce', 289, 2, false, true),
-- Vepřové maso
(9, 'Sweet & Sour pork', 'Klasické pečené vepřové maso v kyselé-sladké omáčce s ananasem', 249, 0, false, true),
(9, 'Char Siu', 'Tradiční kantonské BBQ vepřové maso, 3 hodiny marinované a opékané', 269, 0, false, true),
(9, 'Moo Shu pork', 'Vepřové maso s vejci, houbami a zeleninou zabalené v mandarin palačinkách', 259, 0, false, true),
-- Mořské plody
(10, 'Krevety s česnekovou omáčkou', 'Tigrí krevety smažené s čerstvým česnekem, zázvorem a jarní cibulkou', 319, 1, false, true),
(10, 'Pad Thai s krevetami', 'Thajské nudle s krevetami, vejci, klíčky a arašídy', 289, 1, false, true),
(10, 'Chilli krab', 'Dušený krab v pikantní rajčatové chilli omáčce — sezonní', 449, 2, false, true),
(10, 'Smažený kalamár', 'Křupavý kalamár s pětikoření v lehkém těstíčku', 299, 1, false, true),
-- Vegetariánské
(11, 'Mapo tofu', 'Čínský klasik — hedvábné tofu v pikantní sečuánské omáčce s houbami', 219, 3, true, true),
(11, 'Pečená zelenina v oyster omáčce', 'Sezonní zelenina s houbami shiitake v bohaté omáčce', 199, 0, true, true),
(11, 'Vegetariánský chow mein', 'Nudle se zeleninou a houbami v aromatické sojové omáčce', 209, 0, true, true),
(11, 'Buddha bowl', 'Miska s rýží, dušenou zeleninou, tofu, kimchi a sezamovým dressingem', 229, 1, true, true),
-- Nudle
(4, 'Dan Dan nudle', 'Si-čchuanské nudle s mletým vepřovým masem, tahini a chilli olejem', 229, 3, false, true),
(4, 'Lo Mein s kuřecím masem', 'Vejčité nudle s kuřecím masem a crispy zeleninou', 239, 0, false, true),
(4, 'Beef Ho Fun', 'Širokých rýžové nudle s hovězím masem a jarní cibulkou', 249, 1, false, true),
-- Rýže
(5, 'Jasmínová rýže', 'Přirozeně voňavá thajská jasmínová rýže', 49, 0, true, true),
(5, 'Smažená rýže Yangzhou', 'Klasická smažená rýže s vejci, krevetami a zeleninou', 159, 0, false, true),
(5, 'Smažená rýže s kuřetem', 'Domácí smažená rýže s kuřecím masem a zeleninou', 149, 0, false, true),
-- Dezerty
(12, 'Smažené banány s medem', 'Zlatavé smažené banány s pramenitým medem a vanilkovou zmrzlinou', 109, 0, true, true),
(12, 'Mango pudink', 'Hedvábně hladký mango pudink s čerstvým mangem', 119, 0, true, true),
(12, 'Sesame balls', 'Tradiční čínské sezamové kuličky plněné lotosovou pastou', 99, 0, true, true),
(12, 'Fortune cookies (6 ks)', 'Křupavé fortune cookies s personalizovanými vzkazy', 79, 0, true, true),
-- Nápoje
(13, 'Čínský zelený čaj', 'Prémiový zelený čaj Dragon Well', 69, 0, true, true),
(13, 'Čaj Oolong', 'Tradiční polofermantovaný čaj', 79, 0, true, true),
(13, 'Jasminový čaj', 'Jemný čaj s jasmínovými květy', 69, 0, true, true),
(13, 'Plum wine', 'Sladké švestkové víno (150ml)', 119, 0, true, true),
(13, 'Tsingtao pivo (330ml)', 'Čínské prémiové světlé pivo', 79, 0, false, true),
(13, 'Limonáda s lychee', 'Osvěžující domácí limonáda s lychee a mátou', 89, 0, true, true);

-- ============================================================
-- SEED DATA — SETTINGS
-- ============================================================
INSERT INTO public.settings (key, value) VALUES
  ('restaurant_name', 'Lefu Čínská restaurace'),
  ('phone', '+420 222 333 444'),
  ('email', 'info@lefu-restaurace.cz'),
  ('address', 'Václavské náměstí 1, 110 00 Praha 1'),
  ('google_maps_url', 'https://maps.google.com/?q=Václavské+náměstí+1+Praha'),
  ('tables_count', '12'),
  ('reservation_duration_minutes', '120'),
  ('facebook_url', 'https://facebook.com/lefurestaurace'),
  ('instagram_url', 'https://instagram.com/lefurestaurace'),
  ('tripadvisor_url', ''),
  ('parking_info', 'Parkoviště k dispozici v okolí restaurace, doporučujeme OC Palladium (200 m).')
ON CONFLICT (key) DO NOTHING;

-- ============================================================
-- SEED DATA — OPENING HOURS
-- ============================================================
INSERT INTO public.opening_hours (day_of_week, open_time, close_time, is_closed) VALUES
  (0, '12:00', '22:00', false),  -- Sunday
  (1, '11:30', '22:30', false),  -- Monday
  (2, '11:30', '22:30', false),  -- Tuesday
  (3, '11:30', '22:30', false),  -- Wednesday
  (4, '11:30', '23:00', false),  -- Thursday
  (5, '11:30', '23:00', false),  -- Friday
  (6, '12:00', '23:00', false)   -- Saturday
ON CONFLICT (day_of_week) DO NOTHING;

-- ============================================================
-- SEED DATA — SEO
-- ============================================================
INSERT INTO public.seo_settings (page, title, description, keywords) VALUES
  ('home', 'Lefu Čínská restaurace Praha | Autentická čínská kuchyně', 'Lefu Čínská restaurace nabízí autentickou čínskou kuchyni v srdci Prahy. Tradiční recepty, prémiové ingredience, nezapomenutelný gastronomický zážitek.', 'čínská restaurace Praha, autentická čínská kuchyně, Lefu restaurace, pekingská kachna Praha, čínské jídlo Praha'),
  ('menu', 'Menu | Lefu Čínská restaurace Praha', 'Objevte naše obsáhlé menu s autentickými čínskými pokrmy — od polévek přes pekingskou kachnu až po dezerty. Čerstvé ingredience, tradiční recepty.', 'čínské menu Praha, pekingská kachna, dim sum Praha, kung pao Praha'),
  ('rezervace', 'Rezervace stolu | Lefu Čínská restaurace Praha', 'Rezervujte si stůl v Lefu Čínské restauraci online. Snadno, rychle, bez čekání.', 'rezervace restaurace Praha, rezervace stolu čínská restaurace'),
  ('galerie', 'Galerie | Lefu Čínská restaurace Praha', 'Prohlédněte si fotografie naší restaurace, pokrmů a atmosféry.', 'fotografie čínská restaurace Praha, Lefu restaurace galerie'),
  ('o-nas', 'O nás | Lefu Čínská restaurace Praha', 'Příběh restaurace Lefu — autentická čínská kuchyně s více než 20letou tradicí v Praze.', 'čínská restaurace Praha příběh, Lefu restaurace o nás'),
  ('kontakt', 'Kontakt | Lefu Čínská restaurace Praha', 'Kontaktujte nás nebo nás navštivte. Václavské náměstí 1, Praha 1.', 'kontakt čínská restaurace Praha, adresa Lefu restaurace')
ON CONFLICT (page) DO NOTHING;

-- ============================================================
-- SEED DATA — GALLERY IMAGES (using Unsplash placeholders)
-- ============================================================
INSERT INTO public.gallery_images (url, caption, category, sort_order) VALUES
  ('https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800', 'Pekingská kachna — tradiční příprava', 'food', 1),
  ('https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=800', 'Dim sum výběr', 'food', 2),
  ('https://images.unsplash.com/photo-1525755662778-989d0524087e?w=800', 'Atmosféra restaurace', 'interior', 3),
  ('https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800', 'Kung Pao kuře', 'food', 4),
  ('https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800', 'Čínský čaj servis', 'drinks', 5),
  ('https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800', 'Privátní jídelna', 'interior', 6),
  ('https://images.unsplash.com/photo-1578020190125-f4f7c18bc9cb?w=800', 'Smažené nudle', 'food', 7),
  ('https://images.unsplash.com/photo-1617622141676-e3b8b2b0c77b?w=800', 'Čerstvé ingredience', 'kitchen', 8),
  ('https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=800', 'Dim sum košíčky', 'food', 9),
  ('https://images.unsplash.com/photo-1574484284002-952d92456975?w=800', 'Restaurace večer', 'interior', 10),
  ('https://images.unsplash.com/photo-1541614101331-1a5a3a194e92?w=800', 'Wok příprava', 'kitchen', 11),
  ('https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800', 'Čínský dezert', 'food', 12)
ON CONFLICT DO NOTHING;
