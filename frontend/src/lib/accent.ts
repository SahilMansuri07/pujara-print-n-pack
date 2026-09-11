import type { AccentColor } from "@/types";

interface AccentTokens {
  bg: string;
  bgSoft: string;
  text: string;
  ring: string;
}

/**
 * Each accent maps to a consistent set of Tailwind classes so any
 * component can request "violet" | "orange" | "blue" | "green" | "pink"
 * and render a matching icon chip without redefining colors locally.
 */
export const accentTokens: Record<AccentColor, AccentTokens> = {
  violet: {
    bg: "bg-[#7c5cf0]",
    bgSoft: "bg-[#7c5cf0]/10",
    text: "text-[#7c5cf0]",
    ring: "ring-[#7c5cf0]/20",
  },
  orange: {
    bg: "bg-[#ff8a4c]",
    bgSoft: "bg-[#ff8a4c]/10",
    text: "text-[#ff8a4c]",
    ring: "ring-[#ff8a4c]/20",
  },
  blue: {
    bg: "bg-[#4f8ef7]",
    bgSoft: "bg-[#4f8ef7]/10",
    text: "text-[#4f8ef7]",
    ring: "ring-[#4f8ef7]/20",
  },
  green: {
    bg: "bg-[#34b979]",
    bgSoft: "bg-[#34b979]/10",
    text: "text-[#34b979]",
    ring: "ring-[#34b979]/20",
  },
  pink: {
    bg: "bg-[#ef3f83]",
    bgSoft: "bg-[#ef3f83]/10",
    text: "text-[#ef3f83]",
    ring: "ring-[#ef3f83]/20",
  },
};
