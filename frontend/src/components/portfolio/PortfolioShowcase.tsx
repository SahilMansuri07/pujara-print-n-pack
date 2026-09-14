"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Boxes, Gem, Send, Truck, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ApiImage } from "@/components/home/ApiImage";
import { WhatsAppLink } from "@/components/common/WhatsApp";
import { resolveImageUrl } from "@/lib/image-url";
import type { PortfolioCategory, PortfolioContent, PortfolioItem } from "@/services/portfolioService";

export function PortfolioShowcase({ content: c, items, categories, initialCategory }: {
  content: PortfolioContent; items: PortfolioItem[]; categories: PortfolioCategory[]; initialCategory: string;
}) {
  const [active, setActive] = useState(categories.some(category => category.slug === initialCategory) ? initialCategory : "");
  const [selected, setSelected] = useState<PortfolioItem | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const page = useRef<HTMLElement>(null);
  const revealed = useRef(new WeakSet<Element>());

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches || !window.IntersectionObserver) return;
    const animations = new Set<Animation>();
    const observer = new IntersectionObserver(entries => {
      entries.filter(entry => entry.isIntersecting).forEach((entry, index) => {
        observer.unobserve(entry.target);
        if (revealed.current.has(entry.target)) return;
        revealed.current.add(entry.target);
        const animation = entry.target.animate([
          { opacity: 0, transform: "translateY(22px)" },
          { opacity: 1, transform: "translateY(0)" },
        ], { duration: 560, delay: Math.min(index, 3) * 70, easing: "cubic-bezier(.22,1,.36,1)", fill: "backwards" });
        animations.add(animation);
        animation.onfinish = () => animations.delete(animation);
      });
    }, { threshold: 0.12 });
    page.current?.querySelectorAll(".pf-card, .pf-section-heading, .pf-ribbon, .pf-benefit, .pf-cta").forEach(element => observer.observe(element));
    const stop = () => {
      observer.disconnect();
      animations.forEach(animation => animation.cancel());
    };
    preference.addEventListener("change", stop);
    return () => { stop(); preference.removeEventListener("change", stop); };
  }, [active]);
  const visible = active ? items.filter(item => item.category_slug === active) : items;
  const featured = active ? [] : visible.filter(item => item.is_featured);
  const remaining = active ? visible : visible.filter(item => !item.is_featured);
  const icons: Record<string, typeof Gem> = { gem: Gem, badge: BadgeCheck, truck: Truck };

  function card(item: PortfolioItem, className = "") {
    return <div key={item.id} className={`pf-card ${className}`}>
      <button type="button" className="pf-card-trigger" onClick={() => { setSelected(item); dialog.current?.showModal(); }} aria-label={`View details: ${item.title}`}>
        <ApiImage src={resolveImageUrl(item.cover_image_url)} alt={item.title} className="pf-card-image" />
        <span className="pf-card-shade" />
        <span className="pf-number" aria-hidden="true">{String(item.sort_order).padStart(2, "0")}</span>
        <span className="pf-card-copy">
          <span className="pf-category">{item.category_name}</span>
          <strong>{item.title}</strong>
          {item.short_description && <span className="pf-description">{item.short_description}</span>}
        </span>
      </button>
      <WhatsAppLink service={item} label={`Get a quote for ${item.title} on WhatsApp`} className="pf-card-quote">Get Quote <ArrowRight size={14} /></WhatsAppLink>
    </div>;
  }

  return <main ref={page} className="portfolio-page pf">
    <section className="pf-hero">
      <Container className="pf-hero-layout">
        <div className="pf-hero-copy">
          <p className="pf-eyebrow">{c.eyebrow}</p>
          <h1>{c.headline}<br /><span>{c.headline_accent}</span></h1>
          <p className="pf-intro">{c.intro}</p>
          <div className="pf-proof"><div className="pf-stat"><Boxes size={38} /><div><strong>{c.stat_value}</strong><span>{c.stat_label}</span></div></div><p>{c.signature}</p></div>
        </div>
        <ApiImage src={resolveImageUrl(c.hero_image)} alt={c.hero_alt} className="pf-hero-image" />
      </Container>
    </section>
    <Container>
      <div className="pf-filters" role="group" aria-label={c.all_label}>
        {[{ slug: "", name: c.all_label }, ...categories].map(category => <button type="button" key={category.slug} aria-pressed={active === category.slug} onClick={() => setActive(category.slug)}>{category.name}</button>)}
      </div>
      <div className="pf-section-heading"><h2>{active ? categories.find(category => category.slug === active)?.name : c.featured_title}</h2><p>{c.featured_description}</p></div>
      {featured.length > 0 && <section className="pf-featured" aria-label={c.featured_title}>
        {card(featured[0], "pf-main")}
        <div className="pf-featured-side">{featured.slice(1).map(item => card(item))}</div>
      </section>}
    </Container>
    {!active && <section className="pf-ribbon"><Container><h2>{c.ribbon_title}</h2><span>{c.ribbon_tag}</span></Container></section>}
    <Container>
      <section className={`pf-grid${active ? " pf-filtered" : ""}`} aria-live="polite">
        {remaining.map(item => card(item))}
        {!visible.length && <p className="pf-empty">{c.empty_message}</p>}
      </section>
    </Container>
    <Container><section className="pf-cta"><Send size={42} strokeWidth={1.4} /><div><h2>{c.cta_title}</h2><p>{c.cta_description}</p></div><div className="pf-cta-links"><Link href={c.cta_primary_url}>{c.cta_primary_label}</Link><Link href={c.cta_secondary_url}>{c.cta_secondary_label}</Link></div></section></Container>
    <section className="pf-brand"><Container><h2>{c.brand_title}</h2>{c.benefits.map(benefit => {
      const Icon = icons[benefit.icon] ?? BadgeCheck;
      return <div className="pf-benefit" key={benefit.title}><Icon size={38} strokeWidth={1.2} /><div><h3>{benefit.title}</h3><p>{benefit.description}</p></div></div>;
    })}</Container></section>
    <dialog ref={dialog} className="pf-dialog" onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
      <button type="button" className="pf-close" aria-label="Close" onClick={() => dialog.current?.close()}><X /></button>
      {selected && <><ApiImage src={resolveImageUrl(selected.cover_image_url)} alt={selected.title} /><div><p>{selected.category_name}</p><h2>{selected.title}</h2><p>{selected.short_description}</p><Link href={c.cta_primary_url}>{c.cta_primary_label} <ArrowRight size={16} /></Link></div></>}
    </dialog>
  </main>;
}
