// A3 "ledger-hero" table: last six Basket 1 month-ends, newest first, plus the stat row.
// NOT RENDERED at the moment: the hero ledger shows basket data, which was commented out on
// request until a real NAV feed exists. Kept ported so it can be switched back on in hero.tsx.
// All figures are computed from lib/nav-data (never hard-coded) and labelled Illustrative.
import Link from "next/link";
import { Badge, Illustrative, ToConfirm } from "@/components/paraa/primitives";
import { headline, monthEndISO, monthlyReturns, navs } from "@/lib/calc";
import { dateLabel, formatPct, formatUSD } from "@/lib/format";
import { NAV_DATA, REVISIONS, SHOW_PERFORMANCE } from "@/lib/nav-data";
import { cn } from "@/lib/utils";

function Signer() {
  return (
    <>
      Administrator <ToConfirm />
    </>
  );
}

function StatusBadge({ revised }: { revised: boolean }) {
  return revised ? (
    <Link href="#changelog" className="no-underline">
      <Badge tone="pending" className="whitespace-normal transition-colors duration-150 hover:border-warning">
        Revised · see changelog
      </Badge>
    </Link>
  ) : (
    <Badge>Final</Badge>
  );
}

export function HeroLedger() {
  const r = monthlyReturns(navs());
  const rows = NAV_DATA.map((d, i) => ({ ym: d[0], nav: d[1], ret: r[i] }))
    .slice(-6)
    .reverse();
  const h = headline();
  const asOf = dateLabel(monthEndISO(h.latestMonth));
  const source = `as of ${asOf} · in USD · net of fees`;

  const stats = [
    { label: "Latest NAV", value: formatUSD(h.latestNav, { short: true, cents: true }), source },
    { label: "Since inception", value: formatPct(h.sinceInception), source: <>since 1 Jul 2024 · in USD · net of fees · vs USD cash <ToConfirm /></> },
    { label: "Weakest month", value: formatPct(h.weakest), source },
    {
      label: (
        <>
          Max <abbr title="the largest fall from a previous high">drawdown</abbr> (largest fall from a high)
        </>
      ),
      value: formatPct(h.maxDrawdown),
      source,
    },
  ];

  return (
    <div className="min-w-0">
      <div className="overflow-hidden rounded-lg border bg-card">
        <div className="flex flex-wrap items-center gap-2 border-b p-4">
          <Badge>Latest entries</Badge>
          <Illustrative />
          <p className="basis-full text-body-sm text-faint">
            Prototype data · source: fund administrator <ToConfirm />
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-body-md num">
            <caption className="sr-only">Basket 1 month-end NAV, last six months, newest first. Illustrative prototype data.</caption>
            <thead className="border-b text-body-sm text-faint">
              <tr>
                <th scope="col" className="px-3.5 py-3 font-bold">Date</th>
                <th scope="col" className="hidden px-3.5 py-3 font-bold sm:table-cell">Basket</th>
                <th scope="col" className="px-3.5 py-3 text-right font-bold">NAV (US$)</th>
                <th scope="col" className="px-3.5 py-3 text-right font-bold">Month</th>
                <th scope="col" className="hidden px-3.5 py-3 font-bold sm:table-cell">Signed off by</th>
                <th scope="col" className="hidden px-3.5 py-3 font-bold sm:table-cell">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((row) => {
                const date = dateLabel(monthEndISO(row.ym));
                const revised = Boolean(REVISIONS[row.ym]);
                return (
                  <tr key={row.ym} className="align-middle">
                    <td className="px-3.5 py-3 whitespace-nowrap">
                      <span className="hidden sm:inline">{date}</span>
                      {/* Mobile: Date, NAV and Month only; the rest moves into a row-tap <details>. */}
                      <details className="sm:hidden">
                        <summary className="flex min-h-11 cursor-pointer flex-wrap items-center gap-2 font-semibold">
                          {date}
                          {revised && <Badge tone="pending">Revised</Badge>}
                        </summary>
                        <dl className="mt-2 text-body-sm whitespace-normal text-muted-foreground">
                          <dt className="font-bold text-foreground">Basket</dt>
                          <dd>Basket 1</dd>
                          <dt className="mt-2 font-bold text-foreground">Signed off by</dt>
                          <dd><Signer /></dd>
                          <dt className="mt-2 font-bold text-foreground">Status</dt>
                          <dd>{revised ? <Link href="#changelog">Revised · see changelog</Link> : "Final"}</dd>
                        </dl>
                      </details>
                    </td>
                    <td className="hidden px-3.5 py-3 whitespace-nowrap sm:table-cell">Basket 1</td>
                    <td className="px-3.5 py-3 text-right">{row.nav.toFixed(2)}</td>
                    <td className={cn("px-3.5 py-3 text-right font-semibold", (row.ret ?? 0) < 0 ? "text-negative" : "text-positive")}>
                      {row.ret === null ? "–" : formatPct(row.ret)}
                    </td>
                    <td className="hidden px-3.5 py-3 text-muted-foreground sm:table-cell"><Signer /></td>
                    <td className="hidden px-3.5 py-3 sm:table-cell"><StatusBadge revised={revised} /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Hero stat row (A10: removable by config flag). */}
      {SHOW_PERFORMANCE && (
        <dl className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {stats.map((s, i) => (
            <div key={i} className="rounded-md border bg-card p-4">
              <dt className="text-body-sm font-semibold text-muted-foreground">{s.label}</dt>
              <dd className="mt-1 type-h5 num">{s.value}</dd>
              <dd className="mt-1 text-body-sm text-faint">
                {s.source} · <Illustrative className="align-middle" />
              </dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}
