// The basket's example mix as one bar, and the sleeve swatch (spec §4.10). This file is the only home of
// the sleeve data colours (QA A17): ink for US stocks, gold for gold, a mid grey for crude oil. Both are
// decorative (aria-hidden): the text beside them always carries every value. No hover, no animation.
// The weights are illustrative and come from lib/basket.ts.
import { SLEEVES, type SleeveId } from "@/lib/basket";
import { cn } from "@/lib/utils";

const FILL: Record<SleeveId, string> = {
  us: "bg-data-us",
  gold: "bg-data-gold",
  oil: "bg-data-oil",
};

/** `sm`: 12px tall. `lg`: 32px below 1024, 40px from 1024 (the basket section). */
export function AllocationBar({ size, className }: { size: "sm" | "lg"; className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("flex overflow-hidden rounded-xs", size === "sm" ? "h-3 gap-0.5" : "h-8 gap-1 lg:h-10", className)}
    >
      {SLEEVES.map((sleeve) => (
        // Square segments; the outer corners come from the bar's own radius.
        <span
          key={sleeve.id}
          className={cn("block min-w-0 basis-0 rounded-none", FILL[sleeve.id])}
          style={{ flexGrow: sleeve.weight }}
        />
      ))}
    </div>
  );
}

/** A 10px square in the sleeve's data colour, always beside the sleeve's name. */
export function Swatch({ sleeve, className }: { sleeve: SleeveId; className?: string }) {
  return <span aria-hidden className={cn("inline-block size-2.5 shrink-0 rounded-none", FILL[sleeve], className)} />;
}
