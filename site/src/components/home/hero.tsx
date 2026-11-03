// A5.1 Hero. Copy from A3. The original right-hand ledger (basket NAV data) is commented out on
// request; in its place is a specimen fee receipt that uses no NAV or basket data at all, only
// the illustrative fee schedule, computed live by lib/calc feeReceipt (never hard-coded).
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, Calculator, FileSpreadsheet, Route } from "lucide-react";
import { ArrowLink, ButtonLink, Illustrative, Reveal, ToConfirm } from "@/components/paraa/primitives";
import { feeReceipt } from "@/lib/calc";
import { formatINR, formatPct } from "@/lib/format";
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- kept imported so the ledger can be switched back on in one edit
import { HeroLedger } from "./hero-ledger";

const AMOUNT = 100_000;
const MONTHS = 12;

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden border-b">
      {/* Subtle gold glow behind the receipt, tokens only. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(50%_60%_at_80%_35%,var(--accent-soft),transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-[linear-gradient(90deg,transparent,var(--border-strong),transparent)]"
      />

      <div className="container-page grid items-start gap-14 pt-14 pb-20 md:pt-20 md:pb-28 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:gap-16">
        {/* Copy aligns to the top of the receipt (not centred against it) so no empty band opens above the headline. */}
        <Reveal className="max-w-[600px] lg:sticky lg:top-28 lg:pt-10">
          <p className="eyebrow">USD-denominated investing, from India</p>
          <h1 id="hero-title" className="mt-5 type-h1 text-balance">
            Invest in dollars. Check every number first.
          </h1>
          <p className="mt-6 max-w-[46ch] text-body-xl text-muted-foreground text-pretty">
            Every <abbr title="net asset value">NAV</abbr> (the price of one unit of a basket) we&rsquo;ve published, every fee
            in rupees, every correction we&rsquo;ve made. Dated, sourced, downloadable. Read the ledger before the pitch.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/nav" size="lg">
              See every number first
            </ButtonLink>
            <ButtonLink href="#how" variant="outline" size="lg">
              How your money moves
            </ButtonLink>
          </div>
        </Reveal>

        {/* <HeroLedger /> : commented out on request (basket data); re-enable when real NAV feed exists */}
        <Reveal delay={1} className="w-full lg:justify-self-end">
          <HeroReceipt />
          <HeroChecks />
        </Reveal>
      </div>
    </section>
  );
}

function HeroReceipt() {
  const r = feeReceipt(AMOUNT, MONTHS, 0);
  const lines: { label: string; sub?: string; value: ReactNode }[] = [
    { label: "Currency conversion in", sub: "0.50%", value: formatINR(r.fxIn) },
    { label: "Entry fee", sub: "0.00%", value: formatINR(r.entry) },
    { label: "Management fee", sub: "1.50% a year, charged monthly", value: formatINR(r.mgmt) },
    { label: "Performance fee", sub: "not included", value: <ToConfirm /> },
    { label: "Exit fee", sub: "1.00% if under 12 months", value: formatINR(r.exit) },
    { label: "Currency conversion out", sub: "0.50%", value: formatINR(r.fxOut) },
  ];

  return (
    <figure aria-labelledby="hero-receipt-title" className="relative mx-auto w-full max-w-[480px] lg:mx-0">
      {/* A second sheet behind the receipt: depth without decoration. */}
      <div aria-hidden className="absolute inset-x-5 top-5 -bottom-3 rounded-xl border bg-card/50" />

      <div className="relative overflow-hidden rounded-xl border border-border-strong/70 bg-card shadow-[0_32px_64px_-32px_rgba(0,0,0,0.7)]">
        <div className="px-6 pt-6 pb-5">
          <div className="flex items-center justify-between gap-3">
            <p id="hero-receipt-title" className="text-body-sm font-extrabold tracking-[0.1em] text-faint uppercase">
              Specimen fee receipt
            </p>
            <Illustrative />
          </div>
          <p className="mt-4 type-h3 num">{formatINR(AMOUNT)}</p>
          <p className="mt-1 text-body-md text-muted-foreground">
            invested for {MONTHS} months · assumed return 0%
          </p>
        </div>

        <dl className="border-t border-dashed border-border-strong px-6">
          {lines.map((l) => (
            <div key={l.label} className="flex items-baseline justify-between gap-4 border-b border-dashed border-border py-3">
              <dt className="text-body-md text-muted-foreground">
                {l.label}
                {l.sub && <span className="block text-body-sm text-faint">{l.sub}</span>}
              </dt>
              <dd className="text-right text-body-md font-semibold whitespace-nowrap num">{l.value}</dd>
            </div>
          ))}
          <div className="flex items-baseline justify-between gap-4 border-b-2 border-border-strong py-4">
            <dt className="text-body-md font-extrabold">Total paid to us and our partners</dt>
            <dd className="text-right whitespace-nowrap num">
              <span className="text-body-lg font-extrabold">{formatINR(r.total)}</span>
              <span className="block text-body-sm text-faint">{formatPct(r.costPct, { digits: 2, signed: false })} of the amount</span>
            </dd>
          </div>
        </dl>

        <div className="flex items-end justify-between gap-4 bg-muted/40 px-6 py-5">
          <p className="text-body-lg font-bold">You&rsquo;d receive</p>
          <p className="type-h3 num">{formatINR(r.net)}</p>
        </div>

        <figcaption className="border-t px-6 py-4">
          <p className="text-body-sm text-faint">
            Specimen · illustrative fees, rates <ToConfirm /> · Exchange rate fixed at ₹88.00 per US$ so only fees move. In
            real life, the rate moves too: a weaker rupee raises your rupee value; a stronger rupee lowers it.
          </p>
          <ArrowLink href="#fees" className="mt-1">
            Run it for your amount
          </ArrowLink>
        </figcaption>
      </div>
    </figure>
  );
}

const CHECKS = [
  { href: "#how", icon: Route, label: "Every hand your money passes through" },
  { href: "#method", icon: Calculator, label: "How each number is calculated" },
  { href: "/nav", icon: FileSpreadsheet, label: "Every NAV since launch, as a CSV" },
] as const;

function HeroChecks() {
  return (
    <div className="mx-auto mt-8 w-full max-w-[480px] lg:mx-0">
      <p className="text-body-sm font-extrabold tracking-[0.1em] text-faint uppercase">You can check this</p>
      <ul className="mt-3 grid gap-2">
        {CHECKS.map(({ href, icon: Icon, label }) => (
          <li key={href}>
            <Link
              href={href}
              className="group flex min-h-11 items-center gap-3 rounded-md border bg-background/60 px-4 py-2.5 text-body-md font-semibold text-foreground no-underline transition-colors duration-200 hover:border-border-strong hover:bg-card"
            >
              <Icon aria-hidden className="size-4 shrink-0 text-muted-foreground transition-colors duration-200 group-hover:text-foreground" />
              <span className="flex-1">{label}</span>
              <ArrowRight aria-hidden className="size-4 shrink-0 text-faint transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
