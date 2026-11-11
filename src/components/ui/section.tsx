// A page section (spec §4.1): the section padding, the surface, and the centred container.
// Every section has an h2 with tabIndex={-1} (use SectionHeader); the hero overrides the top padding
// through `className`. Round 18 (bold brand blocks): ink and gold are full sections as well as tiles.
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const TONE = {
  base: "", // the body is white
  alt: "theme-alt", // Light, and hairlines stepped up to grey-300 so they stay visible on it (v1.3)
  ink: "theme-ink", // sets its own background and text colour, and re-colours every role inside it
  gold: "theme-gold", // round 18: the brand gold band (ink on gold, 8.72)
} as const;

export function Section({
  id,
  labelledBy,
  tone = "base",
  className,
  children,
}: {
  id: string;
  labelledBy: string;
  tone?: keyof typeof TONE;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn("py-section", TONE[tone], className)}>
      <div className="container-page">{children}</div>
    </section>
  );
}
