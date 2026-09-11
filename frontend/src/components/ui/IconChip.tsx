import { cn } from "@/lib/utils";
import { accentTokens } from "@/lib/accent";
import type { AccentColor, TrustBadge } from "@/types";

interface IconChipProps {
  icon: React.ComponentType<{ className?: string }>;
  accent?: AccentColor;
  variant?: "solid" | "soft";
  size?: "sm" | "md" | "lg";
}

export function IconChip({
  icon: Icon,
  accent = "violet",
  variant = "solid",
  size = "md",
}: IconChipProps) {
  const tokens = accentTokens[accent];
  const bgClass = variant === "solid" ? tokens.bg : tokens.bgSoft;
  const textClass = variant === "solid" ? "text-white" : tokens.text;

  const sizeClass = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  }[size];

  const iconSizeClass = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  }[size];

  return (
    <div className={cn("rounded-lg flex items-center justify-center", bgClass, sizeClass)}>
      <Icon className={cn(textClass, iconSizeClass)} />
    </div>
  );
}
