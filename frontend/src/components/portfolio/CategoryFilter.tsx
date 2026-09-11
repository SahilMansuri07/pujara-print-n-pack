"use client";

import { motion, useReducedMotion } from "motion/react";
import type { PortfolioCategory } from "@/services/portfolioService";

export function CategoryFilter({ categories, active, onSelect }: {
  categories: PortfolioCategory[];
  active: string;
  onSelect: (slug: string) => void;
}) {
  const reducedMotion = useReducedMotion();
  const tabs = [{ slug: "", name: "All Work" }, ...categories.map(c => ({ slug: c.slug, name: c.name }))];

  return <div className="portfolio-tabs" role="tablist" aria-label="Filter portfolio by category">
    {tabs.map(tab => {
      const isActive = tab.slug === active;
      return <button
        key={tab.slug || "all"}
        type="button"
        role="tab"
        aria-selected={isActive}
        className="portfolio-tab"
        onClick={() => onSelect(tab.slug)}
      >
        {isActive && <motion.span
          layoutId="portfolio-tab-indicator"
          className="portfolio-tab-indicator"
          transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 32 }}
        />}
        <span className="portfolio-tab-label">{tab.name}</span>
      </button>;
    })}
  </div>;
}
