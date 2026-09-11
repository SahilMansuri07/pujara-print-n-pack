"use client";

import { motion, useReducedMotion } from "motion/react";
import { ApiImage } from "@/components/home/ApiImage";
import { resolveImageUrl } from "@/lib/image-url";
import type { PortfolioItem } from "@/services/portfolioService";

export function PortfolioGrid({ items, loading, startNumber, categoryLabel }: {
  items: PortfolioItem[];
  loading: boolean;
  startNumber: number;
  categoryLabel: string;
}) {
  const reducedMotion = useReducedMotion();
  const transition = { duration: reducedMotion ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] };

  if (loading) {
    return <div className="portfolio-grid-cards" aria-busy="true" aria-label="Loading portfolio items">
      {Array.from({ length: 6 }, (_, index) => <div key={index} className="portfolio-grid-skeleton" />)}
    </div>;
  }

  if (!items.length) {
    return <div className="portfolio-grid-empty" role="status">
      <h3>No projects in {categoryLabel} yet</h3>
      <p>New work will be added here soon — check back or explore another category.</p>
    </div>;
  }

  return <motion.div
    className="portfolio-grid-cards"
    initial="hidden"
    animate="visible"
    variants={{ hidden: {}, visible: { transition: { staggerChildren: reducedMotion ? 0 : 0.06 } } }}
  >
    {items.map((item, index) => <motion.article
      key={item.id}
      className="portfolio-grid-card"
      variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition } }}
    >
      <div className="portfolio-grid-image-wrap">
        <ApiImage src={resolveImageUrl(item.cover_image_url)} alt={item.title} className="portfolio-grid-image" />
        <span className="portfolio-grid-number">{String(startNumber + index).padStart(2, "0")}</span>
      </div>
      <div className="portfolio-grid-info">
        {item.category_name && <span className="portfolio-grid-category">{item.category_name}</span>}
        <h3>{item.title}</h3>
        {item.short_description && <p>{item.short_description}</p>}
        {item.client_name && <p className="portfolio-grid-client">{item.client_name}</p>}
      </div>
    </motion.article>)}
  </motion.div>;
}
