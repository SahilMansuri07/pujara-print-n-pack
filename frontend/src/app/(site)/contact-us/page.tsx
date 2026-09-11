import type { Metadata } from "next";
import { Phone, Mail, MapPin } from "lucide-react";
import { ContentBanner } from "@/components/common/ContentPage";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/contact/ContactForm";
import { WhatsAppLink } from "@/components/common/WhatsApp";
import { getSiteSettings } from "@/services/siteService";
import { siteConfig } from "@/lib/site-data";
import "./contact.css";

export const metadata: Metadata = { title: "Contact Us | Pujara Print N Pack", description: "Tell us about your printing and packaging requirements and request a quotation." };

export default async function ContactPage() {
  const settings = await getSiteSettings().catch(() => undefined);
  const phone = settings?.phone || siteConfig.phoneDisplay;
  const secondary = settings?.secondary_phone || siteConfig.secondaryPhone;
  const email = settings?.email || siteConfig.email;
  return <main className="content-page"><ContentBanner prefix="" title="Contact Us" /><Container><div className="contact-layout">
    <section className="contact-info"><h2>GET IN TOUCH</h2><p>We’re here to help and answer your questions.</p>
      <div><Phone aria-hidden="true" /><section><h3>Phone</h3><a href={`tel:${phone.replace(/[^+0-9]/g, "")}`}>{phone}</a><br /><a href={`tel:${secondary.replace(/[^+0-9]/g, "")}`}>{secondary}</a></section></div>
      <div><Mail aria-hidden="true" /><section><h3>Email</h3><a href={`mailto:${email}`}>{email}</a></section></div>
      <div><MapPin aria-hidden="true" /><section><h3>Address</h3><p>{settings?.address || siteConfig.address}</p></section></div>
      <WhatsAppLink className="contact-whatsapp">Chat with us on WhatsApp →</WhatsAppLink>
    </section><ContactForm />
  </div></Container></main>;
}
