import { apiGet } from "@/lib/api-client";

export interface Testimonial {
  id: number;
  client_name: string;
  company_name: string | null;
  designation: string | null;
  message: string;
  client_image_url: string | null;
}

export async function getTestimonials(query: URLSearchParams) {
  const response = await apiGet<Testimonial[]>(`testimonials?${query}`);
  if (response.code === 3) return { data: [], pagination: undefined };
  if (!Array.isArray(response.data) || !response.pagination) throw new Error("Invalid testimonials response");
  return { data: response.data, pagination: response.pagination };
}
