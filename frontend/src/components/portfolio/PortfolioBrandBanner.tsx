import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";

export function PortfolioBrandBanner({ onViewAll }: { onViewAll?: () => void }) {
  return <section className="portfolio-brand-banner">
    <Container className="portfolio-brand-banner-layout">
      <div>
        <h2>Built for Brands That Refuse to Blend In</h2>
        <p>Every project we take on is engineered to make your brand unmistakable — from the paper stock to the finish.</p>
      </div>
      <button type="button" className="portfolio-brand-banner-cta" onClick={onViewAll}>
        View All Work <ArrowRight size={16} />
      </button>
    </Container>
  </section>;
}
