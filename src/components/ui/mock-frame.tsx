// A still illustration of an app screen (spec §4.7): no bezel, no device chrome, nothing focusable.
// The frame is a light island (.theme-light), so it stays white inside the ink band. The ExampleTag is
// first in DOM, so it is read before any figure, and is placed at the right of the header strip.
// Content rules: sample amounts paid in are allowed; no values, returns, percentages, prices, charts,
// dates or names; masked accounts look like "••4821".
//
// The caption sits outside the frame, inside the <figure>, and takes the surrounding scope's colours
// (the band's light grey inside the band). Pass <Disclosure id="mock-caption-v1" as="span" />.
import type { ReactNode } from "react";
import { ExampleTag } from "@/components/ui/tag";
import { cn } from "@/lib/utils";

export function MockFrame({
  label,
  caption,
  elevated = false,
  className,
  children,
}: {
  /** The figure's accessible name, e.g. "Example of the Paraa app". */
  label: string;
  caption?: ReactNode;
  /** shadow-panel: the hero mock only. */
  elevated?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <figure aria-label={label} className={className}>
      <div className={cn("theme-light rounded-lg border bg-card text-foreground", elevated && "shadow-panel")}>
        <div className="flex h-12 items-center justify-between border-b px-4 sm:px-5">
          <ExampleTag className="order-last" />
          {/* A brand name: page-translation tools leave it as it is. */}
          <span translate="no" className="text-body-md font-semibold">
            Paraa
          </span>
        </div>
        <div className="p-4 sm:p-6">{children}</div>
      </div>
      {caption && <figcaption className="mt-3 text-body-md text-muted-foreground">{caption}</figcaption>}
    </figure>
  );
}
