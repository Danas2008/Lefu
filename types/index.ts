export interface MenuCategory {
  id: number;
  name: string;
  slug: string;
  sort_order: number;
  created_at: string;
}

export interface MenuItem {
  id: number;
  category_id: number | null;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  spicy_level: 0 | 1 | 2 | 3;
  is_vegetarian: boolean;
  is_available: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
  menu_categories?: MenuCategory;
}

export interface Reservation {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  notes: string | null;
  status: "confirmed" | "cancelled" | "completed" | "pending";
  table_number: number | null;
  created_at: string;
  updated_at: string;
}

export interface ReservationFormData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  notes?: string;
}

export interface GalleryImage {
  id: number;
  url: string;
  caption: string | null;
  category: string;
  sort_order: number;
  created_at: string;
}

export interface Settings {
  restaurant_name: string;
  phone: string;
  email: string;
  address: string;
  google_maps_url: string;
  tables_count: string;
  reservation_duration_minutes: string;
  facebook_url: string;
  instagram_url: string;
  tripadvisor_url: string;
  parking_info: string;
  [key: string]: string;
}

export interface OpeningHour {
  id: number;
  day_of_week: number;
  open_time: string | null;
  close_time: string | null;
  is_closed: boolean;
}

export interface SeoSettings {
  id: number;
  page: string;
  title: string | null;
  description: string | null;
  keywords: string | null;
  og_image: string | null;
  updated_at: string;
}

export interface AvailabilityResult {
  available: boolean;
  alternatives?: string[];
  message: string;
}
