"use client";

import { motion, useReducedMotion } from "motion/react";
import { Boxes } from "lucide-react";
import { Container } from "@/components/ui/Container";

const HERO_IMAGE = `${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5020"}/uploads/portfolio/hero-branded-merchandise-collection.png`;

export function PortfolioHero() {
  const reducedMotion = useReducedMotion();
  const transition = { duration: reducedMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] };

  return <section className="portfolio-hero">
    <div className="portfolio-hero-blobs" aria-hidden="true">
      <span className="portfolio-hero-blob portfolio-hero-blob-a" />
      <span className="portfolio-hero-blob portfolio-hero-blob-b" />
      <span className="portfolio-hero-blob portfolio-hero-blob-c" />
    </div>
    <Container className="portfolio-hero-layout">
      <motion.div className="portfolio-hero-copy" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0, transition }}>
        <p className="portfolio-hero-eyebrow">Our Portfolio</p>
        <h1>Ideas You Can See.<br /><span className="text-brand-gradient">Quality You Can Feel.</span></h1>
        <p className="portfolio-hero-subtext">
          A curated selection of print, packaging and branding work — real projects delivered for businesses
          across Mumbai, from boardroom collateral to citywide outdoor campaigns.
        </p>
        <div className="portfolio-hero-stat">
          <Boxes size={28} strokeWidth={1.6} aria-hidden="true" />
          <div><strong>59+</strong><span>Print &amp; Packaging Solutions</span></div>
        </div>
      </motion.div>
      <motion.div
        className="portfolio-hero-collage"
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1, transition: { ...transition, delay: reducedMotion ? 0 : 0.15 } }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={HERO_IMAGE} alt="Branded merchandise: boxes, bags, notebooks and business cards printed by Pujara Print N Pack" loading="lazy" />
      </motion.div>
    </Container>
  </section>;
}
