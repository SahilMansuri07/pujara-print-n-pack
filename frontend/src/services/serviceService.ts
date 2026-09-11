import { apiGet } from "@/lib/api-client";
import type { Service, ServiceCategory } from "@/types/service";
import { cache } from "react";
import type { ServiceFilters } from "@/lib/services-url";

export type { ServiceFilters } from "@/lib/services-url";
export { servicesUrl } from "@/lib/services-url";

export const getServiceCategories = cache(async () => {
  const response = await apiGet<ServiceCategory[]>("service-categories");
  if (response.code === 3) return [];
  if (!Array.isArray(response.data)) throw new Error("Invalid category response.");
  return response.data;
});

export const getServiceNavigation = cache(async () => {
  const first = await apiGet<Service[]>("services?limit=100&page=1");
  if (first.code === 3) return [];
  if (!Array.isArray(first.data)) throw new Error("Invalid services response.");
  const all = [...first.data];
  for (let page = 2; page <= (first.pagination?.total_pages || 1); page++) {
    const response = await apiGet<Service[]>(`services?limit=100&page=${page}`);
    if (Array.isArray(response.data)) all.push(...response.data);
  }
  return all.map((service, index) => ({ label: service.title, href: `/services?page=${Math.floor(index / 12) + 1}#service-${service.id}` }));
});

export const getCategoryCounts = cache(async (categories: ServiceCategory[]) => {
  const targets = [{ slug: "", label: "all" }, ...categories.map(c => ({ slug: c.slug, label: c.slug }))];
  const entries = await Promise.all(targets.map(async ({ slug, label }) => {
    const query = new URLSearchParams({ page: "1", limit: "1" });
    if (slug) query.set("category", slug);
    try {
      const response = await apiGet<Service[]>(`services?${query}`);
      return [label, response.pagination?.total ?? 0] as const;
    } catch { return [label, 0] as const; }
  }));
  return Object.fromEntries(entries) as Record<string, number>;
});

export async function getServices(filters: ServiceFilters) {
  const query = new URLSearchParams({ page: String(filters.page), limit: "12" });
  if (filters.category) query.set("category", filters.category);
  if (filters.featured) query.set("featured", "1");
  const response = await apiGet<Service[]>(`services?${query}`);
  if (response.code === 3) return { data: [], pagination: undefined };
  if (!Array.isArray(response.data) || !response.pagination) throw new Error("Invalid services response.");
  return { data: response.data, pagination: response.pagination };
}
