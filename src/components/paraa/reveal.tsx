// Shared scroll reveals: the one motion vocabulary for the whole site, so sections never invent
// their own timings. A 12px rise + fade over 500ms, once, on the soft ease. Section headings don't
// use it, and neither does anything in the first view.
//
// These only write data attributes into the server's HTML, so they hide nothing. The page starts
// complete; RevealController (one small script) then tucks away only what is still below the fold.
// No JavaScript, a failed script or reduced motion means a normal, fully visible page. The CSS is
// in globals.css. A block already on screen is never touched, so nothing moves on load.
import type { CSSProperties, ReactNode } from "react";

/** The stagger step and how many items may use it (at most 4 items, 70ms apart). */
const STAGGER_MS = 70;
const MAX_STEP = 3;

const delayStyle = (step: number) =>
  ({ "--reveal-delay": `${Math.min(Math.max(step, 0), MAX_STEP) * STAGGER_MS}ms` }) as CSSProperties;

/** Reveal one block. `delay` is a stagger step (0–3), 70ms each. */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "tr";
}) {
  return (
    <Tag data-reveal="" className={className} style={delay ? delayStyle(delay) : undefined}>
      {children}
    </Tag>
  );
}

/** Reveal a list: children wrapped in <RevealItem> cascade in, 70ms apart, when the group arrives. */
export function RevealGroup({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "ul" | "ol" | "tbody";
}) {
  return (
    <Tag data-reveal-group="" className={className}>
      {children}
    </Tag>
  );
}

export function RevealItem({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "tr";
}) {
  return (
    <Tag data-reveal-item="" className={className}>
      {children}
    </Tag>
  );
}
