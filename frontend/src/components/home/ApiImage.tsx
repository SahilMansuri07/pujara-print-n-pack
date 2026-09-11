"use client";
import { useState } from "react";
import { ImageIcon } from "lucide-react";
import { resolveImageUrl } from "@/lib/image-url";

export function ApiImage({ src: rawSrc, alt, className = "home-api-image" }: { src: string | null; alt: string; className?: string }) {
  const src = resolveImageUrl(rawSrc);
  const [failed, setFailed] = useState<string | null>(null);
  if (!src || failed === src) return <div className={`${className} flex items-center justify-center`}><ImageIcon aria-label="Image unavailable" size={32} /></div>;
  // API images may be served from any admin-configured image host, or a relative backend upload path.
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} loading="lazy" className={className} onError={() => setFailed(src)} />;
}
