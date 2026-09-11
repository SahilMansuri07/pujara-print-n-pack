"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Boxes, Headphones } from "lucide-react";
import type { ServiceCategory } from "@/types/service";
import { servicesUrl, type ServiceFilters } from "@/lib/services-url";
import { siteConfig } from "@/lib/site-data";

const VISIBLE_LIMIT = 8;

export function ServiceCategoryList({ categories, filters, counts }: { categories: ServiceCategory[]; filters: ServiceFilters; counts: Record<string, number> }) {
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();
  const visible = expanded ? categories : categories.slice(0, VISIBLE_LIMIT);
  return <aside className="services-sidebar">
    <label className="services-category-select">
      <span className="sr-only">Filter by category</span>
      <select value={filters.category} onChange={event => router.push(servicesUrl({ ...filters, category: event.target.value, page: 1 }))}>
        <option value="">All Services{typeof counts.all === "number" ? ` (${counts.all})` : ""}</option>
        {categories.map(category => <option key={category.slug} value={category.slug}>{category.name}{typeof counts[category.slug] === "number" ? ` (${counts[category.slug]})` : ""}</option>)}
      </select>
    </label>
    <Link href={servicesUrl({ ...filters, category: "", page: 1 })} aria-current={!filters.category ? "page" : undefined} className="services-sidebar-all">
      <Boxes size={16} aria-hidden="true" /><span>All Services</span>
      {typeof counts.all === "number" && <span className="services-sidebar-all-count">{counts.all}</span>}
    </Link>
    <nav aria-label="Service categories" className="services-categories">
      {visible.map(category => <Link
        key={category.slug}
        href={servicesUrl({ ...filters, category: category.slug, page: 1 })}
        aria-current={filters.category === category.slug ? "page" : undefined}
        className={filters.category === category.slug ? "selected" : ""}
      >
        <Boxes size={14} aria-hidden="true" /><span>{category.name}</span>
        {typeof counts[category.slug] === "number" && <span className="services-category-count">{counts[category.slug]}</span>}
      </Link>)}
    </nav>
    {categories.length > VISIBLE_LIMIT && <button type="button" className="services-categories-toggle" onClick={() => setExpanded(value => !value)}>
      {expanded ? "Show fewer categories" : "Show all categories"} <span aria-hidden="true">{expanded ? "↑" : "↓"}</span>
    </button>}
    <div className="services-help-card">
      <span className="services-help-icon"><Headphones size={20} aria-hidden="true" /></span>
      <p>Need Help?</p>
      <span>Talk to our print experts</span>
      <a href={`tel:${siteConfig.phone}`}>{siteConfig.secondaryPhone}</a>
    </div>
  </aside>;
}
