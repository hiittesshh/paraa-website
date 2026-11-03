"use client";

// A6.8 "Compared with what?": an overlay toggle, Basket 1 / USD cash. The benchmark is not
// sourced yet, so switching it on explains why no line is drawn instead of drawing one.
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ToConfirm } from "@/components/paraa/primitives";
import { NAV_DATA } from "@/lib/nav-data";
import { NavChart } from "./nav-chart";

export function NavCompare() {
  const [cash, setCash] = useState(false);
  const btn = "inline-flex min-h-11 items-center gap-2.5 rounded-full border px-4 text-body-md font-semibold transition-colors";
  return (
    <div className="rounded-lg border bg-card p-4 sm:p-6 md:p-8">
      <div role="group" aria-label="Lines on the chart" className="mb-6 flex flex-wrap gap-2">
        <button type="button" aria-pressed="true" aria-disabled="true" className={cn(btn, "cursor-default border-border-strong")}>
          <span aria-hidden className="h-0.5 w-5 rounded-full bg-chart-1" />
          Basket 1 (always shown)
        </button>
        <button
          type="button"
          aria-pressed={cash}
          onClick={() => setCash((c) => !c)}
          className={cn(btn, "cursor-pointer", cash ? "border-foreground bg-muted" : "border-border-strong hover:border-muted-foreground")}
        >
          <span aria-hidden className="h-0 w-5 border-t-2 border-dashed border-chart-2" />
          USD cash index <ToConfirm />
        </button>
      </div>
      <div role="status">
        {cash && (
          <p className="mb-6 rounded-md border border-warning/40 p-4 text-body-md">
            No benchmark line is drawn yet. The USD cash index is <ToConfirm />, and we won&apos;t draw a line we can&apos;t source.
          </p>
        )}
      </div>
      <figure>
        <NavChart from={0} to={NAV_DATA.length - 1} />
        <figcaption className="mt-3 text-body-sm text-muted-foreground">Basket 1, since inception · in USD · net of fees · Illustrative</figcaption>
      </figure>
    </div>
  );
}
