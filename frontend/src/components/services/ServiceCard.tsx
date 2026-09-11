"use client";

import { useState } from "react";
import { Printer } from "lucide-react";
import type { Service } from "@/types/service";
import { WhatsAppLink } from "@/components/common/WhatsApp";
import { ServiceDetailsModal } from "./ServiceDetailsModal";

const categoryAccents = ["violet", "orange", "blue", "green", "pink"] as const;
const categoryAccentClass: Record<(typeof categoryAccents)[number], string> = {
  violet: "bg-[#7c5cf0]/10 text-[#7c5cf0]",
  orange: "bg-[#ff8a4c]/10 text-[#b0632c]",
  blue: "bg-[#4f8ef7]/10 text-[#3169c2]",
  green: "bg-[#34b979]/10 text-[#1f8a5a]",
  pink: "bg-[#ef3f83]/10 text-[#c22563]",
};

function accentFor(key: string) {
  let hash = 0;
  for (let i = 0; i < key.length; i++) hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
  return categoryAccents[hash % categoryAccents.length];
}

export function ServiceCard({ service, view = "grid" }: { service: Service; view?: "grid" | "list" }) {
  const [failedImage, setFailedImage] = useState<string | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const accent = service.category_name ? accentFor(service.category_slug || service.category_name) : null;

  return <article id={`service-${service.id}`} className={`service-card${view === "list" ? " service-card-list" : ""}`}>
    <div className="service-card-image">
      {service.featured_image_url && failedImage !== service.featured_image_url ? (
        // Hosted API images may come from different image providers.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={service.featured_image_url} alt={service.title} loading="lazy" className="h-full w-full object-cover" onError={() => setFailedImage(service.featured_image_url)} />
      ) : <Printer size={56} className="text-brand-violet/40" aria-hidden="true" />}
    </div>
    <div className="service-card-copy">
      {service.category_name && accent && <span className={`service-card-tag ${categoryAccentClass[accent]}`}>{service.category_name}</span>}
      <h3>{service.title}</h3>
      {service.short_description && <p>{service.short_description}</p>}
      <div className="service-card-actions">
        <button type="button" className="service-card-details" onClick={() => setDetailsOpen(true)}>View Details</button>
        <WhatsAppLink service={service} label={`Get a quick quote for ${service.title} on WhatsApp`} className="service-card-quote">Quick Quote <span aria-hidden="true">→</span></WhatsAppLink>
      </div>
    </div>
    <ServiceDetailsModal service={service} open={detailsOpen} onClose={() => setDetailsOpen(false)} />
  </article>;
}
