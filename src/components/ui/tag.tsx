// Small static labels (spec §4.5). No colour variants and no pill shape: the meaning is in the word.
// ExampleTag sits inside every MockFrame header (first in DOM) and beside the basket mix caption.
import type { ReactNode } from "react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

const BOX =
  "inline-flex h-6 items-center gap-1 rounded-xs border border-foreground bg-card px-2 text-body-md font-semibold text-foreground whitespace-nowrap";

const ICONS = { check: Check, x: X } as const;

/** A neutral tag, optionally with a leading 16px Check or X ("Allowed" / "Not allowed"). */
export function Tag({ icon, className, children }: { icon?: keyof typeof ICONS; className?: string; children: ReactNode }) {
  const Icon = icon ? ICONS[icon] : null;
  return (
    <span className={cn(BOX, className)}>
      {Icon && <Icon aria-hidden className="size-4 shrink-0" />}
      {children}
    </span>
  );
}

/** The fixed honesty label "Example". Not interactive. */
export function ExampleTag({ className }: { className?: string }) {
  return <span className={cn(BOX, className)}>Example</span>;
}
