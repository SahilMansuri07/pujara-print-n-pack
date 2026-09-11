"use client";

import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IconChip } from "@/components/ui/IconChip";
import { whyUsItems } from "@/lib/site-data";

const accents = ["violet", "orange", "blue", "green"] as const;

export function WhyChooseUs() {
  const reducedMotion = useReducedMotion();
  const transition = { duration: reducedMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] };

  return <section className="about-why-section">
    <Container>
      <SectionHeading eyebrow="The Difference" title="Why Choose Us" description="Reasons B2B clients across Mumbai keep coming back." />
      <motion.div
        className="about-why-grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: reducedMotion ? 0 : 0.1 } } }}
      >
        {whyUsItems.map((item, index) => <motion.div
          key={item.title}
          className="about-why-card"
          variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition } }}
          whileHover={reducedMotion ? undefined : { y: -6, transition: { ...transition, duration: 0.2 } }}
        >
          <IconChip icon={item.icon} accent={accents[index % accents.length]} variant="soft" size="lg" />
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </motion.div>)}
      </motion.div>
    </Container>
  </section>;
}
