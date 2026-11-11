"use client";

// Panel 2 of "Run the numbers": a year's profit (or loss) from the basket and your slab in, tax out. Maths:
// lib/tax estimateTax() (tested, unchanged). It assumes profit is business income at your slab, which isn't
// settled, so the two rules under the card and the footnote say how it could differ, and the result ends on
// "Ask a CA about your own tax". It opens on a ₹1 lakh profit at the 30% slab, the case that shows the most
// tax, so it never flatters.
//
// Round 18d: the same card as the market calculator. Inputs on the left; the answer on the right in a Light
// panel: what you'd keep as the big figure, a bar splitting the profit into keep and tax (with its legend), and
// the three figures as rows.
//
// No-JS: the server renders this default state (You'd keep ₹68,800). The controls move natively but the result
// doesn't update; the section's <noscript> line says so.
import { useState } from "react";
import { ChoiceChips } from "@/components/ui/choice-chips";
import { Disclosure } from "@/components/ui/disclosure";
import { TextLink } from "@/components/ui/link";
import { DefinitionList, DefinitionRow } from "@/components/ui/list";
import { Panel } from "@/components/ui/panel";
import { Slider } from "@/components/ui/slider";
import { CONTROL_SCROLL_MARGIN, ResultReadout, SplitBar, useLiveRegion } from "@/components/ui/tool-result";
import { CTA } from "@/lib/nav";
import { formatINR, formatPct } from "@/lib/format";
import { SLAB_RATES, estimateTax } from "@/lib/tax";
import { cn } from "@/lib/utils";

const MIN = -5_00_000;
const MAX = 20_00_000;
const STEP = 10_000;

/** 0.3 → "30%" */
const slabText = (slab: number) => formatPct(slab, { digits: 0, signed: false });

const SLABS = SLAB_RATES.map((rate) => ({ value: String(rate), label: slabText(rate) }));

export function TaxEstimator() {
  const [profit, setProfit] = useState(1_00_000);
  const [slab, setSlab] = useState(0.3);
  const t = estimateTax(profit, slab);

  const keep = formatINR(t.keep);
  const tax = formatINR(t.tax);
  const loss = formatINR(t.lossCarried);

  const live = useLiveRegion(
    profit > 0
      ? `Tax ${tax} on a profit of ${formatINR(profit)} at the ${slabText(slab)} slab. You’d keep ${keep}. Estimate only.`
      : profit === 0
        ? "No profit, so no tax."
        : `No tax on a loss of ${loss}. Whether it can be carried forward depends on how this income is classified.`,
  );

  return (
    <div className="space-y-4">
      <Panel
        id="tax"
        className="lg:grid lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-12 lg:p-10"
        onPointerUp={live.flush}
        onKeyUp={live.flush}
      >
        <ResultReadout>
          {profit < 0 ? (
            <>
              Estimate: a loss of <span className="font-semibold text-foreground">{loss}</span>
            </>
          ) : (
            <>
              Estimate: you’d keep <span className="font-semibold text-foreground">{keep}</span>
            </>
          )}
        </ResultReadout>

        {/* Inputs */}
        <div>
          <h3 id="tax-title" tabIndex={-1} className="type-heading">
            Tax on your profit
          </h3>
          <p className="mt-2 text-body-lg text-copy">Move the slider to estimate what you’d keep.</p>

          <Slider
            className="mt-8"
            id="tax-profit"
            label="Profit or loss in a year"
            min={MIN}
            max={MAX}
            step={STEP}
            value={profit}
            onValueChange={setProfit}
            format={(v) => formatINR(v, { signed: true })}
          />

          <ChoiceChips
            className="mt-8"
            legend="Your income tax slab"
            helper="The rate on the top part of your income."
            name="tax-slab"
            options={SLABS}
            value={String(slab)}
            onValueChange={(v) => setSlab(Number(v))}
          />
        </div>

        {/* The answer */}
        <div className="mt-10 lg:mt-0">
          <div className="rounded-xl bg-background-alt p-6 sm:p-8">
            <p className="text-body-md text-muted-foreground">{profit < 0 ? "Your loss for the year" : "You’d keep"}</p>
            <p className="type-figure text-foreground lg:type-numeral-sm">
              <span className="num">{profit < 0 ? loss : keep}</span>
            </p>

            {profit > 0 && (
              <>
                <SplitBar keep={t.keep} tax={t.tax} className="mt-6 h-3" />
                <p aria-hidden className="mt-3 flex gap-5 text-body-md text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <span className="size-2.5 bg-foreground" /> You keep
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="size-2.5 bg-border-strong" /> Tax
                  </span>
                </p>
              </>
            )}

            <DefinitionList className="mt-6">
              <DefinitionRow term={profit < 0 ? "Loss" : "Profit"}>{formatINR(Math.abs(profit))}</DefinitionRow>
              {profit > 0 ? (
                <DefinitionRow
                  term={
                    // At the 0% slab there's no cess to add, so the row never reads as a 4% charge (v1.4, D2 N4).
                    slab === 0 ? "Tax on profit (0% slab)" : `Tax on profit (${slabText(slab)} + 4% cess, an add-on to income tax)`
                  }
                >
                  {tax}
                </DefinitionRow>
              ) : profit === 0 ? (
                <DefinitionRow term="Tax">{tax}</DefinitionRow>
              ) : (
                <DefinitionRow term="Tax on a loss">{tax}</DefinitionRow>
              )}
            </DefinitionList>
            {profit === 0 && <p className="mt-2 text-body-md text-muted-foreground">No profit, so no tax.</p>}

            <Disclosure id="tax-foot-v1" as="p" className="mt-6 border-t pt-4 text-body-md text-muted-foreground" />

            <TextLink variant="standalone" href={CTA.href} className={cn("mt-2", CONTROL_SCROLL_MARGIN)}>
              Ask a CA about your own tax
            </TextLink>
          </div>
        </div>

        {live.region}
      </Panel>

      {/* The two rules the estimate depends on, as cards under it. */}
      <ul className="grid gap-4 md:grid-cols-2">
        <li className="rounded-2xl bg-card p-6 sm:p-8">
          <h4 className="type-subhead">Profit may be taxed at your slab rate</h4>
          <p className="mt-2 text-body-lg text-copy">
            It depends on how this income is classified. If the basket counts as a{" "}
            <abbr title="virtual digital asset">VDA</abbr> (virtual digital asset), the rate is a flat 30% plus cess.
          </p>
        </li>
        <li className="rounded-2xl bg-card p-6 sm:p-8">
          <h4 className="type-subhead">Losses may not carry forward</h4>
          <p className="mt-2 text-body-lg text-copy">
            This also depends on how this income is classified. If the basket counts as a virtual digital asset, a loss
            can’t be set off against other income or carried forward.
          </p>
        </li>
      </ul>
    </div>
  );
}
