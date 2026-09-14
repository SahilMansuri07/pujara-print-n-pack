"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Users, Award, Gauge, Printer } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { IconChip } from "@/components/ui/IconChip";
import type { AboutStats } from "@/services/aboutService";
import type { AccentColor } from "@/types";

const fallbackStats: AboutStats = { yearsExperience: "19+", printSolutions: "59+", serviceCategories: "13+", corporateClients: "32+" };

const cards: { key: keyof AboutStats; label: string; icon: React.ComponentType<{ className?: string }>; accent: AccentColor; suffixOverride?: string }[] = [
  { key: "yearsExperience", label: "Years of Experience", icon: Award, accent: "violet" },
  { key: "printSolutions", label: "Print & Packaging Solutions", icon: Printer, accent: "pink" },
  { key: "serviceCategories", label: "Service Categories", icon: Gauge, accent: "green" },
  { key: "corporateClients", label: "Corporate Clients", icon: Users, accent: "orange" },
];

function parseValue(raw: string) {
  const match = raw.match(/^([\d.]+)(.*)$/);
  if (!match) return { number: 0, prefix: "", suffix: raw };
  return { number: parseFloat(match[1]), prefix: "", suffix: match[2] };
}

function Counter({ value, suffix, reduceMotion }: { value: number; suffix: string; reduceMotion: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState(reduceMotion ? value : 0);
  const isDecimal = value % 1 !== 0;

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const duration = 1400;
    const start = performance.now();
    let frame: number;
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(value * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduceMotion, value]);

  return <span ref={ref}>{isDecimal ? display.toFixed(1) : Math.round(display)}{suffix}</span>;
}

export function StatsCounter({ stats }: { stats: AboutStats | null }) {
  const reducedMotion = useReducedMotion();
  const data = stats ?? fallbackStats;
  const transition = { duration: reducedMotion ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] };

  return <section className="about-stats-section">
    <Container>
      <motion.div
        className="about-stats-grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: reducedMotion ? 0 : 0.12 } } }}
      >
        {cards.map(card => {
          const { number, suffix } = parseValue(data[card.key]);
          return <motion.div
            key={card.key}
            className="about-stat-card"
            variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition } }}
          >
            <IconChip icon={card.icon} accent={card.accent} variant="soft" size="lg" />
            <strong><Counter value={number} suffix={card.suffixOverride ?? suffix} reduceMotion={!!reducedMotion} /></strong>
            <p>{card.label}</p>
          </motion.div>;
        })}
      </motion.div>
    </Container>
  </section>;
}
