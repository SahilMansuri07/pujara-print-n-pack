import { Hero } from "@/components/home/Hero";
import { SolutionsGrid } from "@/components/home/SolutionsGrid";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { RecentWork } from "@/components/home/RecentWork";
import { MachinesSection } from "@/components/home/MachinesSection";
import { CTABand } from "@/components/home/CTABand";
import { getHomeData } from "@/services/homeService";
import { HomeSections } from "@/components/home/HomeSections";

export default async function Home() {
  const data = await getHomeData();
  return (
    <>
      <main>
        <Hero />
        <SolutionsGrid categories={data.serviceCategories} />
        <FeaturedProducts products={data.featuredProducts} />
        <RecentWork projects={data.portfolio} content={data.recentWork} />
        <MachinesSection machines={data.machines} />
        <HomeSections clients={data.clients} blogs={data.blogs} />
        <CTABand />
      </main>
    </>
  );
}
