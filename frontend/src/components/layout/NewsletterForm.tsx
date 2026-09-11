"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

export function NewsletterForm() {
  const [message, setMessage] = useState("");
  return <form onSubmit={event => {
    event.preventDefault();
    setMessage("Online subscriptions are currently unavailable. Please contact us for updates.");
  }}>
    <input type="email" aria-label="Email address" placeholder="Enter your email" required />
    <button className="small-cta bg-brand-gradient" type="submit">Subscribe <ArrowRight size={14} /></button>
    {message && <p role="status">{message}</p>}
  </form>;
}
