const PUBLIC_API_ORIGIN = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5020";

/** DB image fields may hold an absolute URL (Cloudinary, backend /uploads) or a bare relative path. */
export function resolveImageUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  if (/^(https?:)?\/\//i.test(url)) return url;
  return `${PUBLIC_API_ORIGIN.replace(/\/$/, "")}/${url.replace(/^\//, "")}`;
}
