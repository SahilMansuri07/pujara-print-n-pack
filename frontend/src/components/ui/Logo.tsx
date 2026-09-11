"use client";
import { useState } from "react";

export function Logo({ className = "", src, alt = "Pujara Print Pack" }: { className?: string; src?: string | null; alt?: string }) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const imageSrc = src && src !== failedSrc ? src : "/images/logo.png";
  return (
    // Admin logos can use any hosted image URL and aspect ratio.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={imageSrc}
      alt={alt}
      width={170}
      height={64}
      onError={() => { if (src && imageSrc === src) setFailedSrc(src); }}
      className={`site-logo ${className}`}
    />
  );
}
