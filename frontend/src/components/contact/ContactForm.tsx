"use client";
import { useRef, useState } from "react";
import type { FormEvent } from "react";

export function ContactForm() {
  const [pending, setPending] = useState(false);
  const submitting = useRef(false);
  const [status, setStatus] = useState<{ error: boolean; message: string } | null>(null);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    const form = event.currentTarget;
    submitting.current = true; setPending(true); setStatus(null);
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(new FormData(form))) });
      const result = await response.json();
      if (response.ok && result.code === 1) {
        setStatus({ error: false, message: "Thank you! Your quote request has been received. Our team will contact you soon." });
        form.reset();
      } else setStatus({ error: true, message: result.message || "Unable to submit your quote request. Please try again later." });
    } catch { setStatus({ error: true, message: "We couldn’t confirm your submission. Please contact us by phone or WhatsApp before sending again." }); }
    finally { submitting.current = false; setPending(false); }
  }
  return <form className="contact-form" onSubmit={submit} aria-busy={pending}><h2>REQUEST A QUOTE</h2>
    <fieldset disabled={pending}><div className="contact-fields">
      <label>Your name *<input name="name" autoComplete="name" required maxLength={150} /></label>
      <label>Your email *<input name="email" type="email" autoComplete="email" required maxLength={150} /></label>
      <label>Phone number<input name="phone" type="tel" autoComplete="tel" minLength={6} maxLength={20} /></label>
      <label>Company<input name="company" autoComplete="organization" maxLength={150} /></label>
      <label className="contact-wide">Service Required *<select name="subject" required defaultValue="">
        <option value="" disabled>Select a service</option>
        {["Business Cards", "Flyers & Brochures", "Banners & Signage", "Booklets & Catalogs", "Packaging & Labels", "Custom Printing", "Other"].map(service => <option key={service} value={service}>{service}</option>)}
      </select></label>
      <label className="contact-wide">Describe Your Requirements *<textarea name="message" rows={6} required maxLength={2000} /></label>
    </div><button type="submit" className="bg-brand-gradient">{pending ? "Submitting quote request…" : "SUBMIT QUOTE REQUEST →"}</button></fieldset>
    {status && <p className={status.error ? "contact-error" : "contact-success"} role={status.error ? "alert" : "status"}>{status.message}</p>}
  </form>;
}
