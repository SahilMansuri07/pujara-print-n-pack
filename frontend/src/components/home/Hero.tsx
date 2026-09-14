"use client";

import { motion } from "motion/react";
import { useHeroVideoAnimation, eyebrowVariants, headingVariants, descriptionVariants, buttonVariants, featureRowVariants, trustCardVariants } from "./useHeroVideoAnimation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import styles from "./Hero.module.css";
import { heroBottomHighlights, heroTrustBadges } from "@/lib/site-data";
import { ArrowRight, FileText } from "lucide-react";

export function Hero() {
  const { videoRef, showVideo, eyebrow, lines, description, buttons, features, trustCard } = useHeroVideoAnimation();
  return (
    <section className={styles.hero}>
      <div className={styles.backdrop} aria-hidden="true">
        <div className={styles.poster} />
        {showVideo && <video ref={videoRef} autoPlay muted loop playsInline preload="auto" poster="/images/hero-printer.png" className={`${styles.image} object-cover`} aria-hidden="true">
          <source src="/images/pujara-print-coming-out-clean.mp4" type="video/mp4" />
        </video>}
        <div className={styles.overlay} />
      </div>
      <Container className={styles.content}>
        <div className={styles.layers}>
          {/* Left: Content */}
          <div className={styles.copy}>
            {/* Eyebrow */}
            <div className="space-y-4">
              <motion.p initial={false} animate={eyebrow} variants={eyebrowVariants} className="text-sm font-semibold tracking-wide text-ink-muted uppercase">
                <span className="text-brand-indigo">Smart Printing.</span>{" "}
                <span className="text-brand-orange">Stunning Impact.</span>
              </motion.p>

              {/* Headline with gradient */}
              <h1 className={styles.headline}>
                <motion.span className={styles.headingLine} initial={false} animate={lines[0]} variants={headingVariants}>Your Vision.</motion.span>
                <motion.span className={styles.headingLine} initial={false} animate={lines[1]} variants={headingVariants}>Our Print.</motion.span>
                <motion.span className={`${styles.headingLine} text-brand-gradient`} initial={false} animate={lines[2]} variants={headingVariants}>Perfect Impact.</motion.span>
              </h1>

              {/* Description */}
              <motion.p initial={false} animate={description} variants={descriptionVariants} className={styles.description}>
                Advanced technology, premium materials and expert craftsmanship to make your
                brand impossible to ignore.
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div initial={false} animate={buttons} variants={buttonVariants} className={styles.actions}>
              <Button variant="primary" size="md" className={styles.button}>
                Explore Services <ArrowRight className="w-5 h-5" />
              </Button>
              <Button variant="secondary" size="md" className={styles.button}>
                Get a Free Quote <FileText className="w-5 h-5" />
              </Button>
            </motion.div>

            {/* Bottom highlights grid */}
            <div className={styles.highlights}>
              {heroBottomHighlights.map((item, index) => (
                <motion.div initial={false} animate={features[index]} variants={featureRowVariants} key={item.title} className={`${styles.highlightCard} min-w-0`}>
                  <p className="font-semibold text-sm text-ink">{item.title}</p>
                  <p className="text-xs text-ink-muted">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className={styles.mobileArtwork} aria-hidden="true" />
          <div className={styles.trustPosition}>
            <motion.div initial={false} animate={trustCard} variants={trustCardVariants} className={styles.trustCard}>
              {heroTrustBadges.map((badge) => (
                <div key={badge.title} className="min-w-0">
                  <p className="font-semibold text-sm text-ink leading-tight">{badge.title}</p>
                  <p className="text-xs text-ink-muted">{badge.description}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}


