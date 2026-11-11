// The heading that opens a section (spec §4.2). No eyebrow, no icon, no highlight, not animated.
// `split`: at ≥ 1024 the lede sits in the right 5 columns, bottom-aligned with the title's last line.
// `stack`: one column. The h2 takes focus from script after an anchor jump (tabIndex -1, no ring).
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeader({
  id,
  title,
  lede,
  layout,
  className,
}: {
  /** The h2's id: the section's aria-labelledby target and the focus target after a jump. */
  id: string;
  title: ReactNode;
  /** 20 words or fewer (R9). */
  lede?: ReactNode;
  layout: "split" | "stack";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-head",
        layout === "split" && "grid lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end lg:gap-16",
        className,
      )}
    >
      <h2 id={id} tabIndex={-1} className="type-title max-w-[24ch]">
        {title}
      </h2>
      {lede && (
        <p className={cn("mt-4 max-w-[52ch] text-body-xl text-muted-foreground", layout === "split" && "lg:mt-0")}>{lede}</p>
      )}
    </div>
  );
}
