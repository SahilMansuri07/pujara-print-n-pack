"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, LayoutGrid, List as ListIcon, X } from "lucide-react";
import { ServiceCategoryList } from "./ServiceCategoryList";
import { ServiceCard } from "./ServiceCard";
import type { Service, ServiceCategory } from "@/types/service";
import { servicesUrl, type ServiceFilters } from "@/lib/services-url";

export function ServicesLayout({ categories, filters, counts, services, selectedCategoryName, total }: {
  categories: ServiceCategory[];
  filters: ServiceFilters;
  counts: Record<string, number>;
  services: Service[];
  selectedCategoryName: string | null;
  total: number;
}) {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [search, setSearch] = useState("");

  const visibleServices = useMemo(() => {
    if (!search.trim()) return services;
    const q = search.trim().toLowerCase();
    return services.filter(service => service.title.toLowerCase().includes(q) || service.short_description?.toLowerCase().includes(q));
  }, [services, search]);

  return <div className="services-layout">
    <div className="services-sidebar-wrap">
      <ServiceCategoryList categories={categories} filters={filters} counts={counts} />
    </div>
    <div className="services-results">
      <div className="services-toolbar">
        <h2>{total} Services</h2>
        <div className="services-toolbar-controls">
          <label className="services-search">
            <Search size={15} aria-hidden="true" />
            <input type="search" placeholder="Search services…" value={search} onChange={event => setSearch(event.target.value)} aria-label="Search services on this page" />
          </label>
          <div className="services-view-toggle" role="group" aria-label="Layout">
            <button type="button" aria-pressed={view === "grid"} aria-label="Grid view" onClick={() => setView("grid")}><LayoutGrid size={15} aria-hidden="true" /></button>
            <button type="button" aria-pressed={view === "list"} aria-label="List view" onClick={() => setView("list")}><ListIcon size={15} aria-hidden="true" /></button>
          </div>
        </div>
      </div>
      <div className="services-active-filters">
        <span>Active filters:</span>
        <Link href={servicesUrl({ ...filters, category: "", featured: false, page: 1 })} className="services-active-chip">{selectedCategoryName || "All Services"} <X size={12} aria-hidden="true" /></Link>
      </div>
      {visibleServices.length === 0 ? <div className="services-empty"><h3>No services match your search</h3><p>Try a different keyword or clear the search box.</p></div> : <div className={`services-grid${view === "list" ? " services-grid-list" : ""}`}>
        {visibleServices.map(service => <ServiceCard key={service.id} service={service} view={view} />)}
      </div>}
    </div>
  </div>;
}
