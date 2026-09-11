"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { CategoryFilter } from "./CategoryFilter";
import { FeaturedWork } from "./FeaturedWork";
import { PortfolioRibbon } from "./PortfolioRibbon";
import { PortfolioGrid } from "./PortfolioGrid";
import { PortfolioBrandBanner } from "./PortfolioBrandBanner";
import type { PortfolioCategory, PortfolioItem } from "@/services/portfolioService";

export function PortfolioExplorer({ categories, initialItems, featured }: {
  categories: PortfolioCategory[];
  initialItems: PortfolioItem[];
  featured: PortfolioItem[];
}) {
  const featuredIds = useMemo(() => new Set(featured.map((item) => item.id)), [featured]);
  const excludeFeatured = useCallback((list: PortfolioItem[]) => list.filter((item) => !featuredIds.has(item.id)), [featuredIds]);

  const [active, setActive] = useState("");
  const [items, setItems] = useState(() => excludeFeatured(initialItems));
  const [loading, setLoading] = useState(false);
  const cache = useRef(new Map<string, PortfolioItem[]>([["", excludeFeatured(initialItems)]]));
  const requestId = useRef(0);
  const tabsRef = useRef<HTMLDivElement>(null);

  const selectCategory = useCallback((slug: string) => {
    setActive((current) => {
      if (slug === current) return current;
      const cached = cache.current.get(slug);
      if (cached) {
        setItems(cached);
        return slug;
      }
      const id = ++requestId.current;
      setLoading(true);
      const query = new URLSearchParams({ limit: "100" });
      if (slug) query.set("category", slug);
      fetch(`/api/portfolio?${query}`)
        .then((res) => res.json())
        .then((result) => {
          if (id !== requestId.current) return;
          const data: PortfolioItem[] = Array.isArray(result?.data) ? result.data : [];
          const filtered = excludeFeatured(data);
          cache.current.set(slug, filtered);
          setItems(filtered);
        })
        .catch(() => { if (id === requestId.current) setItems([]); })
        .finally(() => { if (id === requestId.current) setLoading(false); });
      return slug;
    });
  }, [excludeFeatured]);

  const activeLabel = useMemo(() => {
    if (!active) return "our portfolio";
    return categories.find((category) => category.slug === active)?.name ?? "this category";
  }, [active, categories]);

  const viewAllWork = useCallback(() => {
    selectCategory("");
    tabsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [selectCategory]);

  return <>
    <FeaturedWork items={featured} />
    <PortfolioRibbon />
    <section className="portfolio-explorer" aria-label="Browse work by category">
      <Container>
        <div ref={tabsRef} style={{ scrollMarginTop: "96px" }}>
          <CategoryFilter categories={categories} active={active} onSelect={selectCategory} />
        </div>
        <PortfolioGrid key={active} items={items} loading={loading} startNumber={featured.length + 1} categoryLabel={activeLabel} />
      </Container>
    </section>
    <PortfolioBrandBanner onViewAll={viewAllWork} />
  </>;
}
