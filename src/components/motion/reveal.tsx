// Reveal (round 18) is now a plain wrapper. Owner, 14 Nov 2026: the page-wide landing animations
// (section-entrance.tsx) animate every card and block as it comes into view, so Reveal no longer moves anything itself
// (two systems would fight). The props stay so callers are unchanged.
import type { ElementType, ReactNode } from "react";

export function Reveal({
  as: Tag = "div",
  className,
  children,
  ...props
}: {
  as?: ElementType;
  /** Kept for callers; the landing animations stagger cards themselves. */
  stagger?: number;
  delay?: number;
  className?: string;
  children: ReactNode;
  id?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
}) {
  const { stagger: _s, delay: _d, ...rest } = props as typeof props & { stagger?: number; delay?: number };
  void _s;
  void _d;
  return (
    <Tag data-reveal="" className={className} {...rest}>
      {children}
    </Tag>
  );
}
