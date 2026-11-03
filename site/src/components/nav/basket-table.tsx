// A6.2 "All baskets, the same columns". Baskets 2 and 3 show "In preparation", never an
// invented series. Return columns drop out when SHOW_PERFORMANCE is off (rulebook R4).
import { Illustrative, Reveal, Section, ToConfirm } from "@/components/paraa/primitives";
import { headline, monthEndISO } from "@/lib/calc";
import { dateLabel, formatPct, formatUSD } from "@/lib/format";
import { FEES, INCEPTION_LABEL, SHOW_PERFORMANCE } from "@/lib/nav-data";
import { cn } from "@/lib/utils";
import { signTone } from "@/lib/tone";

const th = "px-4 py-3 text-left text-body-sm font-bold text-muted-foreground whitespace-nowrap";
const td = "px-4 py-4 text-body-md whitespace-nowrap";
const r = "text-right num";

export function BasketTable() {
  const h = headline();
  const asOf = dateLabel(monthEndISO(h.latestMonth));
  const perfCols = SHOW_PERFORMANCE ? 2 : 0;

  return (
    <Section tone="alt" size="sm" labelledBy="compare-table-title">
      <Reveal className="mb-6">
        <h2 id="compare-table-title" className="type-h3">
          All baskets, the same columns
        </h2>
      </Reveal>
      <Reveal className="overflow-x-auto rounded-lg border bg-card">
        <table className="w-full min-w-[880px] border-collapse">
          <caption className="sr-only">
            Basket comparison, as of {asOf}, in US dollars, net of fees. Illustrative.
          </caption>
          <thead className="border-b border-border-strong">
            <tr>
              <th scope="col" className={th}>Basket</th>
              <th scope="col" className={th}>Currency</th>
              <th scope="col" className={cn(th, "text-right")}>NAV</th>
              {SHOW_PERFORMANCE && (
                <>
                  <th scope="col" className={cn(th, "text-right")}>Since inception</th>
                  <th scope="col" className={cn(th, "text-right")}>Annualised</th>
                </>
              )}
              <th scope="col" className={cn(th, "text-right")}>
                Max <abbr title="the largest fall from a previous high">drawdown</abbr>
              </th>
              <th scope="col" className={cn(th, "text-right")}>Weakest month</th>
              <th scope="col" className={th}>Min. amount</th>
              <th scope="col" className={cn(th, "text-right")}>Fee/yr</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            <tr>
              <th scope="row" className={cn(td, "text-left font-bold")}>
                <span className="flex flex-wrap items-center gap-2">
                  Basket 1 — USD Core <ToConfirm>name TO CONFIRM</ToConfirm> <Illustrative />
                </span>
              </th>
              <td className={td}>US$</td>
              <td className={cn(td, r)}>{formatUSD(h.latestNav, { short: true, cents: true })}</td>
              {SHOW_PERFORMANCE && (
                <>
                  <td className={cn(td, r, signTone(h.sinceInception))}>{formatPct(h.sinceInception)}</td>
                  <td className={cn(td, r, signTone(h.annualised))}>{h.annualised === null ? "Not annualised" : formatPct(h.annualised)}</td>
                </>
              )}
              <td className={cn(td, r, signTone(h.maxDrawdown))}>{formatPct(h.maxDrawdown)}</td>
              <td className={cn(td, r, signTone(h.weakest))}>{formatPct(h.weakest)}</td>
              <td className={td}>
                <ToConfirm />
              </td>
              <td className={cn(td, r)}>
                {formatPct(FEES.mgmt, { digits: 2, signed: false })} <ToConfirm />
              </td>
            </tr>
            {["Basket 2 — USD Balanced", "Basket 3 — USD Growth"].map((name) => (
              <tr key={name}>
                <th scope="row" className={cn(td, "text-left font-bold")}>
                  <span className="flex flex-wrap items-center gap-2">
                    {name} <ToConfirm>name TO CONFIRM</ToConfirm>
                  </span>
                </th>
                <td className={td}>US$</td>
                <td colSpan={3 + perfCols} className={cn(td, "text-muted-foreground")}>
                  In preparation
                </td>
                <td className={td}>
                  <ToConfirm />
                </td>
                <td className={cn(td, "text-right text-muted-foreground")}>In preparation</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Reveal>
      <p className="mt-3 text-body-sm text-muted-foreground">
        as of {asOf} · since {INCEPTION_LABEL} · in USD · net of fees · time-weighted · vs USD cash <ToConfirm /> · source: fund administrator{" "}
        <ToConfirm /> · Illustrative
      </p>
    </Section>
  );
}
