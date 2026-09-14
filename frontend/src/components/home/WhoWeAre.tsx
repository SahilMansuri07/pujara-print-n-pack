"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";

const pillars = [
  { title: "Quality Assured" },
  { title: "Built on Integrity" },
  { title: "Customer First" },
];

export function WhoWeAre() {
  const reducedMotion = useReducedMotion();
  const reveal: Variants = {
    hidden: { opacity: 0, y: reducedMotion ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration: reducedMotion ? 0 : 0.6 } },
  };

  return <motion.section className="who-we-are-section" aria-labelledby="who-we-are-heading" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }}>
    <Container>
      <div className="who-we-are-grid">
        <motion.div className="who-we-are-visual" variants={reveal}>
          <Image src="/images/who-we-are-print-craft.webp" alt="Pujara Print N Pack packaging, printed labels, business cards and brochures with colourful flowing ribbons" width={1200} height={1200} sizes="(max-width: 900px) 100vw, 52vw" className="who-we-are-art" />
          <div className="who-we-are-experience" aria-label="Over 19 years of craft">
            <span className="who-we-are-years" aria-hidden="true">19+</span>
            <span className="who-we-are-seal" aria-hidden="true">Years<br />of craft</span>
          </div>
        </motion.div>
        <motion.div className="who-we-are-copy" variants={reveal}>
          <span className="who-we-are-eyebrow">Who we are</span>
          <h2 id="who-we-are-heading">We turn ideas into<br className="who-desktop-break" /> print people can <span>feel.</span></h2>
          <p className="who-we-are-description">Founded in 2007, Pujara Print N Pack brings offset, digital, packaging and large-format production together under one roof.</p>
          <Link href="/about" className="who-we-are-link">Discover Our Story <ArrowRight size={21} aria-hidden="true" /></Link>
          <ul className="who-we-are-pillars" aria-label="Our values">
            {pillars.map(({ title }) => <li key={title} className="who-we-are-pillar">
              <h3>{title}</h3>
            </li>)}
          </ul>
        </motion.div>
      </div>
    </Container>
  </motion.section>;
}
