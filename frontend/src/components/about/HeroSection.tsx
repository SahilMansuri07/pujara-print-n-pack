"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Container } from "@/components/ui/Container";

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, reducedMotion ? 0 : 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);
  const transition = { duration: reducedMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] };

  return <section ref={ref} className="about-hero">
    <motion.div className="about-hero-backdrop" style={{ y, opacity }} aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/hero-printer.png" alt="" className="about-hero-image" />
      <div className="about-hero-overlay" />
    </motion.div>
    <Container className="about-hero-content">
      <motion.p
        className="about-hero-eyebrow"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0, transition }}
        viewport={{ once: true }}
      >
        Since 2007
      </motion.p>
      <motion.h1
        className="about-hero-title"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0, transition: { ...transition, delay: reducedMotion ? 0 : 0.1 } }}
        viewport={{ once: true }}
      >
        Mumbai&apos;s Trusted Partner in <span className="text-brand-gradient">Print &amp; Packaging</span>
      </motion.h1>
      <motion.p
        className="about-hero-subtext"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0, transition: { ...transition, delay: reducedMotion ? 0 : 0.2 } }}
        viewport={{ once: true }}
      >
        From a small print shop founded as Super Enterprises in 2007 to a full-scale print, packaging and branding
        partner, we&apos;ve spent over a decade turning business ideas into materials clients are proud to hand out.
      </motion.p>
    </Container>
  </section>;
}
