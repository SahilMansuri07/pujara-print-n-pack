export interface ServiceCategory {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  sort_order: number;
}

export interface Service {
  id: number;
  title: string;
  slug: string;
  short_description: string | null;
  featured_image_url: string | null;
  category_id: number | null;
  category_name: string | null;
  category_slug: string | null;
  is_featured: number;
  sort_order: number;
}
