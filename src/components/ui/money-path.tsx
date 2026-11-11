// Where your money goes (spec §4.11): the only way back is invest → mature → redeem → withdraw.
// A semantic <ol> of five steps. In steps 2–5 the connector label comes first in DOM, then the decorative
// line, then the node, so a screen reader hears each step as one sentence in order; grid placement puts
// them where they appear. Static: no states, nothing interactive.
//
// Below 1024 it is vertical and compact: each connector is a row (line and arrow in a 40px column, the
// label beside it), then the node at full width. From 1024 it is horizontal: each step is a two-column
// grid (connector, node). `items-start` on the list keeps every node at its own height, and row 1's
// `items-center` puts each line on its node's middle, whatever that height is.
//
// Custody isn't shown: a node is added only once custody is confirmed (spec §12).
import { ArrowDown, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Step = { label?: string; node: string; end?: boolean };

const STEPS: readonly Step[] = [
  { node: "Your bank account", end: true },
  { label: "UPI or bank transfer, verified", node: "Paraa wallet" },
  { label: "Invest at the next daily price", node: "Basket units" },
  { label: "After it matures, redeem", node: "Paraa wallet" },
  { label: "Withdraw in rupees", node: "Your bank account, in your name", end: true },
];

const NODE =
  "flex min-h-11 items-center justify-center rounded-sm px-3 text-center text-body-md font-semibold text-balance text-foreground lg:min-h-14";

export function MoneyPath({ className }: { className?: string }) {
  return (
    <ol
      aria-label="Where your money goes"
      className={cn("flex max-w-[360px] flex-col lg:max-w-none lg:flex-row lg:items-start", className)}
    >
      {STEPS.map((step, i) => {
        const node = (
          <div
            className={cn(
              NODE,
              // Round 18: the path sits in a gold block, so your own account (start and end) is ink and the
              // app's steps are white. In forced colours the fills drop out, so a border keeps the end nodes distinct.
              step.end
                ? "bg-primary text-primary-foreground forced-colors:border-2 forced-colors:border-[CanvasText]"
                : "bg-muted",
              step.label && "lg:col-start-2 lg:row-start-1",
            )}
          >
            {step.node}
          </div>
        );

        if (!step.label) {
          return (
            <li key={i} className="lg:min-w-0 lg:flex-1 lg:basis-0">
              {node}
            </li>
          );
        }

        const last = i === STEPS.length - 1;
        return (
          <li
            key={i}
            className={cn(
              "flex flex-col lg:grid lg:min-w-0 lg:basis-0 lg:grid-rows-[auto_auto] lg:items-center lg:gap-x-2",
              last
                ? "lg:flex-[2.35] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.25fr)]"
                : "lg:flex-[2.1] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]",
            )}
          >
            {/* The connector row below 1024; from 1024 its two children sit straight in the step's grid. */}
            <div className="grid grid-cols-[2.5rem_minmax(0,1fr)] items-center py-1 lg:contents">
              <span className="col-start-2 row-start-1 text-body-md text-muted-foreground lg:col-start-1 lg:row-start-2 lg:mt-1 lg:self-start lg:text-center">
                {step.label}
              </span>
              <span
                aria-hidden
                className="col-start-1 row-start-1 flex flex-col items-center text-muted-foreground lg:flex-row"
              >
                {/* A border, not a fill, so the line survives forced colours (one 1px edge at every width). */}
                <span className="h-5 w-0 border-l border-input lg:h-0 lg:w-auto lg:flex-1 lg:border-t lg:border-l-0" />
                <ArrowDown className="-mt-1 size-4 shrink-0 lg:hidden" />
                <ArrowRight className="-ml-1 hidden size-4 shrink-0 lg:block" />
              </span>
            </div>
            {node}
          </li>
        );
      })}
    </ol>
  );
}
