"use client";

import { Printer } from "lucide-react";
import { Modal } from "@/components/common/Modal";
import { WhatsAppLink } from "@/components/common/WhatsApp";
import type { Service } from "@/types/service";
import { resolveImageUrl } from "@/lib/image-url";

export function ServiceDetailsModal({ service, open, onClose }: { service: Service | null; open: boolean; onClose: () => void }) {
  if (!service) return null;
  return <Modal open={open} onClose={onClose} labelledBy={`service-modal-title-${service.id}`}>
    <div className="app-modal-media">
      {service.featured_image_url
        // eslint-disable-next-line @next/next/no-img-element
        ? <img src={resolveImageUrl(service.featured_image_url) ?? undefined} alt={service.title} />
        : <div className="flex h-full w-full items-center justify-center"><Printer size={56} className="text-brand-violet/40" aria-hidden="true" /></div>}
    </div>
    <div className="app-modal-body">
      {service.category_name && <span className="app-modal-tag">{service.category_name}</span>}
      <h2 id={`service-modal-title-${service.id}`}>{service.title}</h2>
      {service.short_description && <p className="app-modal-desc">{service.short_description}</p>}
      <div className="app-modal-actions">
        <WhatsAppLink service={service} label={`Enquire about ${service.title} on WhatsApp`} className="app-modal-cta">Enquire Now <span aria-hidden="true">→</span></WhatsAppLink>
      </div>
    </div>
  </Modal>;
}
