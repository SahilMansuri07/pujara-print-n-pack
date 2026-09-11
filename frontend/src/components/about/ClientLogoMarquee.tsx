import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ClientMarquee } from "@/components/home/ClientMarquee";
import type { AboutClient } from "@/services/aboutService";

export function ClientLogoMarquee({ clients }: { clients: AboutClient[] | null }) {
  return <section className="about-clients-section">
    <Container>
      <SectionHeading eyebrow="Trusted By" title="Businesses We've Partnered With" centered />
      {!clients?.length
        ? <p className="about-data-state">{clients === null ? "This section is temporarily unavailable. Please try again later." : "New client logos will appear here soon."}</p>
        : <ClientMarquee clients={clients} />}
    </Container>
  </section>;
}
