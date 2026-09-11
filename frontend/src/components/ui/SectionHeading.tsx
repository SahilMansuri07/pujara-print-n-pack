import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  centered?: boolean;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("space-y-3", centered && "text-center", className)}>
      {eyebrow && (
        <div className="flex items-center gap-2 justify-start" data-centered={centered}>
          <span className="section-eyebrow-dot" />
          <p className="text-sm font-semibold tracking-wide text-ink-muted uppercase">
            {eyebrow}
          </p>
          <span className="section-eyebrow-dot" />
        </div>
      )}
      {typeof title === "string" ? (
        <h2 className="text-4xl lg:text-5xl font-bold text-ink leading-tight">{title}</h2>
      ) : (
        <h2 className="text-4xl lg:text-5xl font-bold leading-tight">{title}</h2>
      )}
      {description && (
        <p className="text-lg text-ink-soft max-w-2xl leading-relaxed">{description}</p>
      )}
    </div>
  );
}
