import { Cog, Monitor, Coins, ShoppingCart, Truck, Users, type LucideIcon } from "lucide-react";
import { accentTokens } from "@/lib/accent";
import type { AccentColor } from "@/types";

interface IndustryVoice { label: string; quote: string; icon: LucideIcon; accent: AccentColor }

const leftIndustries: IndustryVoice[] = [
  { label: "Manufacturing", quote: "Durable packaging that keeps our operations moving.", icon: Cog, accent: "orange" },
  { label: "Finance", quote: "Professional, secure and consistently high quality.", icon: Coins, accent: "green" },
  { label: "Logistics", quote: "Reliable partner for our growing needs.", icon: Truck, accent: "violet" },
];

const rightIndustries: IndustryVoice[] = [
  { label: "Technology", quote: "Innovative packaging for a fast-moving world.", icon: Monitor, accent: "blue" },
  { label: "Retail", quote: "Packaging that makes our brand stand out.", icon: ShoppingCart, accent: "pink" },
  { label: "Corporate Services", quote: "A partner we can always count on.", icon: Users, accent: "orange" },
];

function IndustryCard({ item, side }: { item: IndustryVoice; side: "left" | "right" }) {
  const Icon = item.icon;
  return <div className={`voices-card voices-card-${side}`}>
    <span className={`voices-card-icon ${accentTokens[item.accent].bg}`}><Icon size={19} aria-hidden="true" /></span>
    <div>
      <h3>{item.label}</h3>
      <p>&ldquo;{item.quote}&rdquo;</p>
    </div>
    <span className={`voices-card-dot ${accentTokens[item.accent].bg}`} aria-hidden="true" />
  </div>;
}

export function VoicesFromEveryIndustry() {
  return <section className="voices-section" aria-labelledby="voices-heading">
    <div className="voices-intro">
      <h2 id="voices-heading">Voices From <span className="text-brand-gradient">Every Industry</span></h2>
      <p>Different industries. A shared belief in the power of great print and packaging.</p>
    </div>
    <div className="voices-grid">
      <div className="voices-column">{leftIndustries.map(item => <IndustryCard key={item.label} item={item} side="left" />)}</div>
      <div className="voices-hub" aria-hidden="true">
        <span className="voices-hub-ring voices-hub-ring-1" />
        <span className="voices-hub-ring voices-hub-ring-2" />
        <span className="voices-hub-mark">P</span>
      </div>
      <div className="voices-column">{rightIndustries.map(item => <IndustryCard key={item.label} item={item} side="right" />)}</div>
    </div>
  </section>;
}
