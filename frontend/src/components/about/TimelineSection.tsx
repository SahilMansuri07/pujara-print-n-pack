"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, type MotionValue } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { TimelineItem } from "@/services/aboutService";

const fallbackTimeline: TimelineItem[] = [
  { year: "2007", title: "Super Enterprises Founded", description: "Our journey began in Mumbai as a small print shop built on precision and reliability." },
  { year: "2011", title: "Reborn as Pujara Print N Pack", description: "As demand grew beyond print into packaging and branding, we relaunched with a wider service range." },
  { year: "Present", title: "Mumbai's Trusted Print & Packaging Partner", description: "We serve thousands of businesses with a 99.5% on-time delivery record." },
];

type Transition = { duration: number; ease: [number, number, number, number] };

function TimelineCard({ item, index, transition, progress, threshold, reducedMotion, dotRef }: {
  item: TimelineItem;
  index: number;
  transition: Transition;
  progress: MotionValue<number>;
  threshold: number;
  reducedMotion: boolean | null;
  dotRef: (el: HTMLDivElement | null) => void;
}) {
  // Darkens the instant the scroll-drawn line's leading edge passes this dot's actual position.
  const [reached, setReached] = useState(!!reducedMotion);
  useMotionValueEvent(progress, "change", (latest) => {
    if (latest >= threshold) setReached(true);
  });

  return <motion.li
    className="about-timeline-item"
    initial={{ opacity: 0, x: index % 2 === 0 ? -32 : 32 }}
    whileInView={{ opacity: 1, x: 0, transition }}
    viewport={{ once: true, amount: 0.5 }}
  >
    <div ref={dotRef} className="about-timeline-dot" data-reached={reached} aria-hidden="true" />
    <div className="about-timeline-card" data-reached={reached}>
      <span className="about-timeline-year">{item.year}</span>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
    </div>
  </motion.li>;
}

export function TimelineSection({ timeline }: { timeline: TimelineItem[] | null }) {
  const items = timeline?.length ? timeline : fallbackTimeline;
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start 0.75", "end 0.4"] });
  const transition = { duration: reducedMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] };

  // Each dot's fraction along the track, measured from real layout (card heights are uneven).
  const [thresholds, setThresholds] = useState<number[]>(() => items.map((_, i) => (items.length > 1 ? i / (items.length - 1) : 1)));

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      const trackRect = track.getBoundingClientRect();
      if (!trackRect.height) return;
      const next = dotRefs.current.map((dot) => {
        if (!dot) return 0;
        const dotRect = dot.getBoundingClientRect();
        const dotCenter = dotRect.top + dotRect.height / 2;
        return Math.min(1, Math.max(0, (dotCenter - trackRect.top) / trackRect.height));
      });
      setThresholds(next);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [items.length]);

  return <section className="about-timeline-section">
    <Container>
      <SectionHeading eyebrow="Our Story" title="Where We've Been" description="A decade-plus of growth, one milestone at a time." />
      <div className="about-timeline" ref={containerRef}>
        <div className="about-timeline-track" ref={trackRef} aria-hidden="true">
          <motion.div className="about-timeline-fill" style={{ scaleY: reducedMotion ? 1 : scrollYProgress }} />
        </div>
        <ol className="about-timeline-list">
          {items.map((item, index) => <TimelineCard
            key={item.year}
            item={item}
            index={index}
            transition={transition}
            progress={scrollYProgress}
            threshold={thresholds[index] ?? (items.length > 1 ? index / (items.length - 1) : 1)}
            reducedMotion={reducedMotion}
            dotRef={(el) => { dotRefs.current[index] = el; }}
          />)}
        </ol>
      </div>
    </Container>
  </section>;
}
