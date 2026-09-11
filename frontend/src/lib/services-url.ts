export interface ServiceFilters {
  category: string;
  featured: boolean;
  page: number;
}

export function servicesUrl({ category, featured, page }: ServiceFilters) {
  const query = new URLSearchParams();
  if (category) query.set("category", category);
  if (featured) query.set("featured", "1");
  if (page > 1) query.set("page", String(page));
  return `/services${query.size ? `?${query}` : ""}`;
}
