import type { Accent } from "@/lib/curriculum";

/** Tailwind class fragments per track accent. Keep class strings literal so
 *  Tailwind's scanner can see them. */
export const accent: Record<
  Accent,
  { text: string; bg: string; border: string; dot: string; badge: string }
> = {
  brand: {
    text: "text-brand",
    bg: "bg-brand/10",
    border: "border-brand/40",
    dot: "bg-brand",
    badge: "bg-brand/15 text-brand",
  },
  gold: {
    text: "text-gold",
    bg: "bg-gold/10",
    border: "border-gold/40",
    dot: "bg-gold",
    badge: "bg-gold/15 text-gold",
  },
  good: {
    text: "text-good",
    bg: "bg-good/10",
    border: "border-good/40",
    dot: "bg-good",
    badge: "bg-good/15 text-good",
  },
  sky: {
    text: "text-sky",
    bg: "bg-sky/10",
    border: "border-sky/40",
    dot: "bg-sky",
    badge: "bg-sky/15 text-sky",
  },
};
