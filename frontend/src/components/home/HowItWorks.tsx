import { Container } from "@/components/ui/Container";
import { IconChip } from "@/components/ui/IconChip";
import { processSteps, statItems } from "@/lib/site-data";

export function HowItWorks() {
  return <section className="process-section"><Container className="process-layout">
    <div className="process-panel"><h2>How It Works</h2><ol className="process-steps">
      {processSteps.map(step => <li key={step.number} data-accent={step.accent}>
        <div className="step-top"><IconChip icon={step.icon} accent={step.accent} variant="soft" size="lg" /><span>{step.number}</span></div>
        <div className="step-copy"><h3>{step.title}</h3><p>{step.description}</p></div>
      </li>)}
    </ol></div>
    <div className="stats-panel">{statItems.map(stat => <div className="stat" key={stat.label} data-accent={stat.accent}>
      <IconChip icon={stat.icon} accent={stat.accent} variant="soft" size="md" />
      <div><strong>{stat.value}</strong><p>{stat.label}</p></div>
    </div>)}</div>
  </Container></section>;
}
