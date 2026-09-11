"use client";

import { motion, useReducedMotion } from "motion/react";
import { ApiImage } from "@/components/home/ApiImage";
import { Container } from "@/components/ui/Container";
import { resolveImageUrl } from "@/lib/image-url";
import type { PortfolioItem } from "@/services/portfolioService";

function FeaturedCard({ item, number, large }: { item: PortfolioItem; number: string; large?: boolean }) {
  return <article className={`portfolio-featured-card${large ? " is-large" : ""}`}>
    <ApiImage src={resolveImageUrl(item.cover_image_url)} alt={item.title} className="portfolio-featured-image" />
    <div className="portfolio-featured-overlay" aria-hidden="true" />
    <span className="portfolio-featured-number">{number}</span>
    <div className="portfolio-featured-info">
      {item.category_name && <span className="portfolio-featured-category">{item.category_name}</span>}
      <h3>{item.title}</h3>
      {item.client_name && <p>{item.client_name}</p>}
      {large && <span className="portfolio-featured-view">View Project</span>}
    </div>
  </article>;
}

export function FeaturedWork({ items }: { items: PortfolioItem[] }) {
  const reducedMotion = useReducedMotion();
  const transition = { duration: reducedMotion ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] };
  if (!items.length) return null;

  const [main, ...rest] = items;
  const side = rest.slice(0, 2);

  return <section className="portfolio-featured-section">
    <Container>
      <div className="portfolio-featured-heading">
        <span className="portfolio-featured-eyebrow">Featured Work</span>
        <h2>Handpicked From Our Recent Projects</h2>
      </div>
      <motion.div
        className="portfolio-featured-grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: reducedMotion ? 0 : 0.12 } } }}
      >
        <motion.div variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition } }}>
          <FeaturedCard item={main} number="01" large />
        </motion.div>
        <div className="portfolio-featured-side">
          {side.map((item, index) => <motion.div key={item.id} variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition } }}>
            <FeaturedCard item={item} number={String(index + 2).padStart(2, "0")} />
          </motion.div>)}
        </div>
      </motion.div>
    </Container>
  </section>;
}
