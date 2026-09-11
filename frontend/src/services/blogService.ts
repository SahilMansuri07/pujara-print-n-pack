import { apiGet } from "@/lib/api-client";

export interface Blog {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  featured_image_url: string | null;
  author_name: string | null;
  published_at: string | null;
  category_name: string | null;
}

export async function getBlogs(query: URLSearchParams) {
  const response = await apiGet<Blog[]>(`blogs?${query}`);
  if (response.code === 3) return { data: [], pagination: undefined };
  if (!Array.isArray(response.data) || !response.pagination) throw new Error("Invalid blogs response");
  return { data: response.data, pagination: response.pagination };
}

export async function getBlog(slug: string) {
  const response = await apiGet<Blog & { content: string | null }>(`blogs/${encodeURIComponent(slug)}`);
  return response.code === 3 ? null : response.data;
}
