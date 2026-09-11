"use client";

import { createContext, useContext } from "react";
import type { Service } from "@/types/service";

const WhatsAppNumber = createContext("919819894284");

export function WhatsAppProvider({ number, children }: { number?: string | null; children: React.ReactNode }) {
  let digits = (number || "").replace(/\D/g, "");
  if (digits.startsWith("00")) digits = digits.slice(2);
  if (digits.length === 10) digits = `91${digits}`;
  if (!/^[1-9]\d{7,14}$/.test(digits)) digits = "919819894284";
  return <WhatsAppNumber.Provider value={digits}>{children}</WhatsAppNumber.Provider>;
}

export function WhatsAppLink({ service, children, className, label }: { service?: Pick<Service, "title" | "category_name" | "short_description">; children: React.ReactNode; className?: string; label?: string }) {
  const number = useContext(WhatsAppNumber);
  const message = service ? [
    `Hello Pujara, I would like to enquire about your ${service.title} service.`,
    service.category_name ? `Category: ${service.category_name}` : "",
    service.short_description ? `Service details: ${service.short_description}` : "",
    "Please share more details and a quotation. Thank you!",
  ].filter(Boolean).join("\n\n") : "Hello Pujara Print N Pack, I am interested in your printing and packaging services. I would like to discuss my requirements and get a quotation. Please share the details and pricing. Thank you.";
  return <a href={`https://wa.me/${number}?text=${encodeURIComponent(message)}`} target="_blank" rel="noopener noreferrer" className={className} aria-label={label}>{children}</a>;
}

export function WhatsAppButton() {
  return <WhatsAppLink className="whatsapp-floating" label="Enquire on WhatsApp (opens in a new tab)">
    <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.52 3.48A11.9 11.9 0 0 0 12.04 0C5.45 0 .09 5.36.09 11.95c0 2.1.55 4.15 1.59 5.95L0 24l6.25-1.64a11.94 11.94 0 0 0 5.79 1.48h.01C18.64 23.84 24 18.48 24 11.9c0-3.19-1.24-6.18-3.48-8.42ZM12.04 21.83a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-3.71.97.99-3.62-.24-.37a9.9 9.9 0 0 1-1.52-5.27c0-5.48 4.46-9.94 9.95-9.94a9.87 9.87 0 0 1 7.03 2.92 9.87 9.87 0 0 1 2.91 7.04c0 5.48-4.46 9.86-10 9.86Zm5.45-7.44c-.3-.15-1.77-.87-2.04-.97-.28-.1-.48-.15-.68.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.8-1.49-1.78-1.66-2.08-.18-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49 0 1.47 1.07 2.89 1.22 3.09.15.2 2.1 3.2 5.09 4.49.71.31 1.27.49 1.7.62.71.23 1.36.2 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.18-1.42-.08-.13-.28-.2-.58-.35Z" /></svg>
  </WhatsAppLink>;
}
