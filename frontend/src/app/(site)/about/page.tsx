import type { Metadata } from "next";
import "@/components/about/about.css";
import { getAboutData } from "@/services/aboutService";
import { HeroSection } from "@/components/about/HeroSection";
import { StatsCounter } from "@/components/about/StatsCounter";
import { TimelineSection } from "@/components/about/TimelineSection";
import { CoreValuesCards } from "@/components/about/CoreValuesCards";
import { WhyChooseUs } from "@/components/about/WhyChooseUs";
import { ClientLogoMarquee } from "@/components/about/ClientLogoMarquee";
import { PortfolioTeaser } from "@/components/about/PortfolioTeaser";
import { CtaBanner } from "@/components/about/CtaBanner";

export const metadata: Metadata = {
  title: "About Us | Pujara Print N Pack",
  description: "Learn about Pujara Print N Pack, our story, and why businesses trust us for their printing and packaging needs.",
};

export default async function AboutPage() {
  const { stats, timeline, coreValues, clients } = await getAboutData();

  return <main className="about-page">
    <HeroSection />
    <StatsCounter stats={stats} />
    <TimelineSection timeline={timeline} />
    <CoreValuesCards values={coreValues} />
    <WhyChooseUs />
    <ClientLogoMarquee clients={clients} />
    <PortfolioTeaser />
    <CtaBanner />
  </main>;
}
