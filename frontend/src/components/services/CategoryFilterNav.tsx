"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ServiceCategory } from "@/types/service";

export function CategoryFilterNav({ categories }: { categories: ServiceCategory[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateEdges = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    updateEdges();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);
    return () => { el.removeEventListener("scroll", updateEdges); window.removeEventListener("resize", updateEdges); };
  }, [updateEdges]);

  const scrollBy = (dir: 1 | -1) => trackRef.current?.scrollBy({ left: dir * 260, behavior: "smooth" });

  if (categories.length === 0) return null;

  return <div className="category-filter-nav-wrap">
    <button type="button" className="category-filter-arrow category-filter-arrow-left" onClick={() => scrollBy(-1)} aria-label="Scroll categories left" disabled={!canScrollLeft}><ChevronLeft size={16} /></button>
    <nav className="category-filter-nav" ref={trackRef} aria-label="Jump to a service category">
      {categories.map(category => <a key={category.slug} href={`#category-${category.slug}`}>{category.name}</a>)}
    </nav>
    <button type="button" className="category-filter-arrow category-filter-arrow-right" onClick={() => scrollBy(1)} aria-label="Scroll categories right" disabled={!canScrollRight}><ChevronRight size={16} /></button>
  </div>;
}
