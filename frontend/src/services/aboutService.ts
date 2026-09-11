import { apiGet } from "@/lib/api-client";

export interface AboutStats { happyClients: string; projectsCompleted: string; onTimeDelivery: string; rating: string }
export interface TimelineItem { year: string; title: string; description: string }
export interface CoreValue { title: string; description: string; reveal: string }
export interface AboutClient { id: number; company_name: string | null; logo_url: string | null }

async function get<T>(endpoint: string): Promise<T | null> {
  try {
    const response = await apiGet<T>(endpoint);
    return response.data ?? null;
  } catch { return null; }
}

async function list<T>(endpoint: string): Promise<T[] | null> {
  try {
    const response = await apiGet<T[]>(endpoint);
    if (response.code === 3) return [];
    if (!Array.isArray(response.data)) throw new Error("Invalid list response");
    return response.data;
  } catch { return null; }
}

export async function getAboutData() {
  const [stats, timeline, coreValues, clients] = await Promise.all([
    get<AboutStats>("about/stats"),
    list<TimelineItem>("about/timeline"),
    list<CoreValue>("about/core-values"),
    list<AboutClient>("about/clients"),
  ]);
  return { stats, timeline, coreValues, clients };
}
