// What you're buying (round 18, "bold brand blocks"): the basket as three colour tiles sized by their example
// weight, each with its weight as a big number, what it is and why it moves. US stocks is the ink tile (half
// the basket, the tallest), gold is the gold tile, crude oil the Light tile. The weights are an example and
// say so above the tiles. The tiles rise in one after another the first time they scroll into view.
import { Reveal } from "@/components/motion/reveal";
import { Disclosure } from "@/components/ui/disclosure";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { ExampleTag } from "@/components/ui/tag";
import { SLEEVES, type SleeveId } from "@/lib/basket";
import { formatPct } from "@/lib/format";
import { cn } from "@/lib/utils";
import { SLEEVE_INFO } from "./sleeve-info";

// US stocks (half the basket) is the big ink tile with its weight as the page's largest number; gold and crude
// oil are the two smaller tiles beside it, name and text on the left, their weight on the right.
const TILE: Record<SleeveId, string> = {
  us: "theme-ink lg:col-span-7 lg:row-span-2",
  gold: "theme-gold lg:col-span-5",
  oil: "theme-alt lg:col-span-5",
};

export function Basket() {
  return (
    <Section id="basket" labelledBy="basket-title">
      <SectionHeader
        id="basket-title"
        title="What you’re buying"
        lede="Units of one basket that follows three markets. Each moves for its own reasons."
        layout="split"
      />

      <div className="mb-4 flex items-center gap-3">
        <ExampleTag className="shrink-0" />
        <Disclosure id="basket-example-v1" as="p" className="text-body-md text-muted-foreground" />
      </div>

      <Reveal as="ul" stagger={0.12} className="grid gap-4 lg:grid-cols-12 lg:grid-rows-2">
        {SLEEVES.map((sleeve) => {
          const pct = formatPct(sleeve.weight, { digits: 0, signed: false });
          const info = SLEEVE_INFO[sleeve.id];
          const figure = (
            <>
              {pct}
              <span className="sr-only"> of the example mix</span>
            </>
          );
          // The tile's colour is the sleeve's colour, so it needs no swatch.
          if (sleeve.id === "us") {
            return (
              <li key={sleeve.id} className={cn("flex flex-col justify-between gap-12 rounded-2xl p-6 sm:p-8 lg:p-10", TILE.us)}>
                <h3 className="type-heading">{sleeve.name}</h3>
                <div>
                  <p className="type-numeral text-brand">{figure}</p>
                  <p className="mt-6 max-w-[34ch] text-body-xl font-semibold text-foreground">{info.what}</p>
                  <p className="mt-1 max-w-[40ch] text-body-lg text-copy">{info.why}</p>
                </div>
              </li>
            );
          }
          return (
            <li
              key={sleeve.id}
              className={cn("grid grid-cols-[minmax(0,1fr)_auto] gap-x-6 rounded-2xl p-6 sm:p-8 lg:p-10", TILE[sleeve.id])}
            >
              <div>
                <h3 className="type-heading">{sleeve.name}</h3>
                <p className="mt-4 text-body-lg font-semibold text-foreground">{info.what}</p>
                <p className="mt-1 text-body-md text-copy">{info.why}</p>
              </div>
              <p className="type-numeral-sm">{figure}</p>
            </li>
          );
        })}
      </Reveal>

      <Reveal className="mt-4 grid gap-6 rounded-2xl border p-6 sm:p-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16 lg:p-10">
        <div>
          <p className="type-label text-muted-foreground">What you own</p>
          <h3 className="mt-2 type-heading">You hold units, not the assets</h3>
        </div>
        <p className="max-w-prose text-body-lg text-copy">
          Units of the basket. The basket follows these markets through derivative contracts (agreements whose value
          follows a price), so you don’t own the shares, gold or oil directly.
        </p>
      </Reveal>
    </Section>
  );
}
