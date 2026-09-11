import { Container } from "@/components/ui/Container";
import { whyUsItems } from "@/lib/site-data";
import { ArrowRight } from "lucide-react";

export function CTABand({ title = "Ready to Grow Your Brand?", subtitle = "Let's create something amazing together!", primaryLabel = "Get a Free Quote", secondaryLabel }: {
  title?: string;
  subtitle?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
}) {
  return <section className="cta-band"><Container className="cta-layout">
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src="/images/portfolio/packaging.webp" alt="Colorful custom printed packaging box" className="cta-photo" loading="lazy" />
    <div className="cta-copy"><h2>{title}</h2><p>{subtitle}</p>
      <div className="cta-copy-actions">
        <button type="button" className="small-cta bg-brand-gradient">{primaryLabel} <ArrowRight size={15} /></button>
        {secondaryLabel && <button type="button" className="small-cta small-cta-outline">{secondaryLabel}</button>}
      </div>
    </div>
    <div className="cta-benefits">{whyUsItems.map(item => <div key={item.title}><item.icon size={26} strokeWidth={1.4} /><h3>{item.title}</h3><p>{item.description}</p></div>)}</div>
  </Container></section>;
}
