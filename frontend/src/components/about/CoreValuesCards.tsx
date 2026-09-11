"use client";

import { motion, useReducedMotion } from "motion/react";
import { ShieldCheck, Handshake, HeartHandshake } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IconChip } from "@/components/ui/IconChip";
import type { CoreValue } from "@/services/aboutService";
import type { AccentColor } from "@/types";

const icons: { icon: React.ComponentType<{ className?: string }>; accent: AccentColor }[] = [
  { icon: ShieldCheck, accent: "blue" },
  { icon: Handshake, accent: "green" },
  { icon: HeartHandshake, accent: "pink" },
];

const fallbackValues: CoreValue[] = [
  { title: "Quality Standards", description: "Every job is checked against strict quality benchmarks before it leaves our facility.", reveal: "Colour-accurate proofing, premium stock and multi-point checks on every order." },
  { title: "Integrity", description: "Transparent pricing, honest timelines and no surprises.", reveal: "Clear quotes, honest turnaround estimates, and accountability when things need to change." },
  { title: "Customer Service", description: "A dedicated team that stays with your order from enquiry to doorstep.", reveal: "Responsive support, proactive updates, and a single point of contact for every project." },
];

export function CoreValuesCards({ values }: { values: CoreValue[] | null }) {
  const items = values?.length ? values : fallbackValues;
  const reducedMotion = useReducedMotion();
  const transition = { duration: reducedMotion ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] };

  return <section className="about-values-section">
    <Container>
      <SectionHeading eyebrow="What Drives Us" title="Our Core Values" description="The principles that shape every order we deliver." />
      <motion.div
        className="about-values-grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: reducedMotion ? 0 : 0.15 } } }}
      >
        {items.map((value, index) => {
          const { icon: Icon, accent } = icons[index % icons.length];
          return <motion.div
            key={value.title}
            className="about-value-flip"
            variants={{ hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition } }}
          >
            <div className="about-value-flip-inner">
              <div className="about-value-face about-value-front">
                <IconChip icon={Icon} accent={accent} variant="soft" size="lg" />
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
              <div className="about-value-face about-value-back">
                <IconChip icon={Icon} accent={accent} variant="solid" size="lg" />
                <p>{value.reveal}</p>
              </div>
            </div>
          </motion.div>;
        })}
      </motion.div>
    </Container>
  </section>;
}
