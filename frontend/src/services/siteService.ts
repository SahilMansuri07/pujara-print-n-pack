import { cache } from "react";
import { apiGet } from "@/lib/api-client";

export const getNavigationCategories = cache(async (endpoint: "portfolio-categories" | "blog-categories") => {
  const response = await apiGet<{ id: number; name: string; slug: string }[]>(endpoint);
  return Array.isArray(response.data) ? response.data : [];
});

export const getSiteSettings = cache(async () => {
  const response = await apiGet<{ site_name: string; whatsapp: string | null; logo_url: string | null; phone: string | null; secondary_phone: string | null; email: string | null; address: string | null }>("site-settings");
  return response.data;
});
