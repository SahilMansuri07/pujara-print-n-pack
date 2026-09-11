import { apiGet } from "@/lib/api-client";
import { cache } from "react";

export interface PortfolioContent {
  recent_work: { eyebrow: string; title: string; description: string; link_label: string };
  meta_title: string; meta_description: string;
  eyebrow: string; headline: string; headline_accent: string; intro: string;
  hero_image: string; hero_alt: string; stat_value: string; stat_label: string; signature: string;
  all_label: string; featured_title: string; featured_description: string; view_label: string; empty_message: string;
  ribbon_title: string; ribbon_tag: string; brand_title: string;
  benefits: { title: string; description: string; icon: string }[];
  cta_title: string; cta_description: string; cta_primary_label: string; cta_primary_url: string;
  cta_secondary_label: string; cta_secondary_url: string;
}

export const getPortfolioPage = cache(async () => {
  const response = await apiGet<{ content: PortfolioContent; items: PortfolioItem[] }>("portfolio-page");
  if (!response.data?.content || !Array.isArray(response.data.items)) throw new Error("Portfolio page is not configured");
  return response.data;
});

export interface PortfolioItem {
  id: number;
  title: string;
  slug: string;
  short_description: string | null;
  cover_image_url: string | null;
  category_id: number;
  category_name: string | null;
  category_slug: string | null;
  client_name: string | null;
  project_date: string | null;
  is_featured: number;
  sort_order: number;
}

export interface PortfolioCategory { id: number; name: string; slug: string; description: string | null; sort_order: number }

async function list<T>(endpoint: string): Promise<T[] | null> {
  try {
    const response = await apiGet<T[]>(endpoint);
    if (response.code === 3) return [];
    if (!Array.isArray(response.data)) throw new Error("Invalid list response");
    return response.data;
  } catch { return null; }
}

export async function getPortfolioList(options: { category?: string; featured?: boolean; limit?: number } = {}) {
  const query = new URLSearchParams({ limit: String(options.limit ?? 100) });
  if (options.category) query.set("category", options.category);
  if (options.featured) query.set("featured", "1");
  return list<PortfolioItem>(`portfolio?${query}`);
}

export async function getPortfolioCategories() {
  return list<PortfolioCategory>("portfolio-categories");
}
