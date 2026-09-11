import { apiGet } from "@/lib/api-client";

export interface ClientLogo { id: number; company_name: string | null; logo_url: string | null }

interface TestimonialLogoRow { id: number; company_name: string | null; client_image_url: string | null }

function toClientLogo(row: TestimonialLogoRow): ClientLogo {
  return { id: row.id, company_name: row.company_name, logo_url: row.client_image_url };
}

export async function getClientLogos(limit = 40) {
  try {
    const result = await apiGet<TestimonialLogoRow[]>(`testimonials?logos_only=1&limit=${limit}`);
    if (result.code === 3) return [];
    if (!Array.isArray(result.data)) throw new Error("Invalid client logos response");
    return result.data.map(toClientLogo);
  } catch { return null; }
}

export async function getClientLogosPage(page: number) {
  const result = await apiGet<TestimonialLogoRow[]>(`testimonials?logos_only=1&page=${page}&limit=12`);
  if (result.code === 3) return { data: [], pagination: undefined };
  if (!Array.isArray(result.data) || !result.pagination) throw new Error("Invalid client logos response");
  return { data: result.data.map(toClientLogo), pagination: result.pagination };
}
