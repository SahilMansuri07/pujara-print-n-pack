import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const baseClass =
    "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 active:scale-95";

  const variantClass = {
    primary:
      "bg-brand-gradient text-white hover:shadow-lg hover:scale-105 active:scale-95",
    secondary:
      "border border-[#d4c5e0] text-ink hover:bg-[#f5f1f8] active:scale-95",
    ghost: "text-ink hover:bg-[#fdf1ec] active:scale-95",
  }[variant];

  const sizeClass = {
    sm: "px-3 py-2 text-sm gap-1",
    md: "px-5 py-2.5 text-base gap-2",
    lg: "px-6 py-3 text-lg gap-2",
  }[size];

  return (
    <button className={cn(baseClass, variantClass, sizeClass, className)} {...props}>
      {children}
    </button>
  );
}
