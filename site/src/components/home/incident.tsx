"use client";

// A5.8 "Last time something went wrong" (incident teaser + days-since counter). Ported
// faithfully. Currently commented out in app/page.tsx ("our mistake" section dropped on request).
// Client component because "days since" depends on today's date: the server renders a dash,
// the browser fills in the count (Cache Components forbids reading the clock during prerender).
import { useSyncExternalStore } from "react";
import { ArrowLink, Reveal, Section, SectionHead, ToConfirm } from "@/components/paraa/primitives";
import { daysBetween } from "@/lib/calc";

const LAST_INCIDENT = "2026-09-16";

function todayISO() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
const noop = () => () => {};

export function Incident() {
  const today = useSyncExternalStore(noop, todayISO, () => null);
  const days = today ? Math.max(0, daysBetween(LAST_INCIDENT, today)) : null;

  return (
    <Section tone="alt" size="sm" labelledBy="incident-title">
      <SectionHead id="incident-title" eyebrow="Transparency log" title="Our mistakes are on the record too" />
      <Reveal delay={1}>
        <div className="grid gap-8 rounded-xl border border-gold-500/40 bg-card bg-[linear-gradient(180deg,var(--accent-soft),transparent_60%)] p-6 md:p-8 lg:grid-cols-[260px_minmax(0,1fr)]">
          <div>
            <p className="text-body-md font-semibold text-muted-foreground">Days since last logged incident</p>
            <p className="mt-1 type-h1 num" aria-live="polite">
              {days ?? "–"}
            </p>
            <p className="mt-1 text-body-sm text-faint">Last incident 16 Sep 2026 · counted to today · Illustrative</p>
          </div>
          <div className="min-w-0">
            <div className="overflow-x-auto rounded-md border">
              <table className="w-full min-w-[560px] text-left text-body-md">
                <caption className="sr-only">Latest entries in the transparency log. Illustrative.</caption>
                <thead className="border-b text-body-sm text-faint">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-bold">Date</th>
                    <th scope="col" className="px-4 py-3 font-bold">What happened</th>
                    <th scope="col" className="px-4 py-3 font-bold">Detail</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border align-top">
                  <tr>
                    <td className="px-4 py-3 whitespace-nowrap">16 Sep 2026</td>
                    <td className="px-4 py-3">Withdrawals delayed 1 business day</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      Cause: a bank holiday in the US that our timeline didn&rsquo;t show · Fix: both holiday calendars now in the
                      exit estimator · Affected: 38 requests
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 whitespace-nowrap">12 Sep 2026</td>
                    <td className="px-4 py-3">NAV revised</td>
                    <td className="px-4 py-3">
                      <ArrowLink href="#changelog">See changelog</ArrowLink>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-body-md text-muted-foreground">
              If something affects your money, it goes here within [N] business days <ToConfirm />, whether or not anyone
              noticed.
            </p>
            <ArrowLink href="/log">Transparency log</ArrowLink>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
