import type { Metadata } from "next";
import { getPortfolioCategories, getPortfolioPage } from "@/services/portfolioService";
import { PortfolioShowcase } from "@/components/portfolio/PortfolioShowcase";
import "./portfolio.css";

export async function generateMetadata(): Promise<Metadata> {
  const { content } = await getPortfolioPage();
  return { title: content.meta_title, description: content.meta_description };
}

export default async function PortfolioPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const [page, categories, query] = await Promise.all([getPortfolioPage(), getPortfolioCategories(), searchParams]);
  return <PortfolioShowcase content={page.content} items={page.items} categories={categories ?? []} initialCategory={query.category ?? ""} />;
}
