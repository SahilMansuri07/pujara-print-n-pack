import "server-only";
import type { ApiResponse } from "@/types/api";

export async function apiGet<T>(path: string): Promise<ApiResponse<T>> {
  const apiKey = process.env.API_KEY;
  if (!apiKey) throw new Error("API_KEY is not configured on the frontend server.");
  const base = process.env.API_BASE_URL || "http://localhost:5020/api/v1/user";
  const response = await fetch(`${base.replace(/\/$/, "")}/${path}`, {
    headers: { "api-key": apiKey },
    cache: "no-store",
    signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) throw new Error(`API request failed (${response.status}).`);
  const result: ApiResponse<T> = await response.json();
  if (result.code !== 1 && result.code !== 3) {
    throw new Error(result.message || "API request failed.");
  }
  if (result.code === 1 && result.data === undefined) throw new Error("Missing API response data.");
  return result;
}
