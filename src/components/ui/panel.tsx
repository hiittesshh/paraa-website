// The card (spec §4.6): the two tool cards and the form card, nothing else. Never nested, no hover state.
// Round 18: 24px corners to match the brand tiles; the form card adds shadow-float on the gold band.
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function Panel({ className, ...props }: ComponentProps<"div">) {
  // Round 18b: no border, 32px corners, like the brand tiles. In forced colours a border keeps its edge.
  return <div className={cn("rounded-2xl bg-card p-5 sm:p-8 forced-colors:border", className)} {...props} />;
}
