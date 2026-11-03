// A5.1 Hero. Basket performance data was removed from the site on request, so the hero proves its point
// with a specimen fee receipt computed live by lib/fees feeReceipt (never hard-coded).
// Layout: copy + "you can check this" on the left, a visual on the right, sized so the whole hero fits
// one desktop screen, with a soft Greyscale-900 vignette at the edges.
//
// Four scroll-driven 3D visuals are being compared (see /preview/a … /preview/d):
//   A  Tilt3D receipt: rests tilted, flattens as you scroll            (this file + paraa/tilt-3d)
//   B  Exploded receipt: 3 connected layers that assemble on scroll     (hero-exploded.tsx)
//   C  3-card deck that fans out into a connected arc on scroll         (hero-deck.tsx)
//   D  Pinned journey rail: 3 connected steps light up as you scroll    (hero-journey.tsx, owns its section)
import type { ReactNode } from "react";
import { ArrowLink, Illustrative, Reveal, ToConfirm } from "@/components/paraa/primitives";
import { Tilt3D } from "@/components/paraa/tilt-3d";
import { HERO_AMOUNT as AMOUNT, HERO_MONTHS as MONTHS, feeReceipt } from "@/lib/fees";
import { formatINR, formatPct } from "@/lib/format";
import { HeroExploded } from "./hero-exploded";
import { HeroDeckSection } from "./hero-deck";
import { HeroJourney } from "./hero-journey";
import { HeroBackdrop, HeroCopy } from "./hero-shared";


export type HeroVariant = "a" | "b" | "c" | "d";

export function Hero({ variant = "a" }: { variant?: HeroVariant }) {
  // D pins the whole section while its steps play, so it owns its own section markup.
  if (variant === "d") return <HeroJourney />;
  // C pins too (the deck fans while the hero holds still), so it also owns its section.
  if (variant === "c") return <HeroDeckSection />;

  const visual =
    variant === "b" ? (
      <HeroExploded />
    ) : (
      <Tilt3D className="mx-auto w-full max-w-[400px] lg:mx-0">
        <HeroReceipt />
      </Tilt3D>
    );

  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden border-b">
      <HeroBackdrop />
      <div className="container-page grid items-center gap-12 py-12 md:py-16 lg:min-h-[min(760px,calc(100svh-140px))] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16 lg:py-14">
        <Reveal className="max-w-[600px]">
          <HeroCopy />
        </Reveal>
        <Reveal delay={1} className="w-full lg:justify-self-end">
          {visual}
        </Reveal>
      </div>
    </section>
  );
}

export function HeroReceipt() {
  const r = feeReceipt(AMOUNT, MONTHS, 0);
  const lines: { label: string; rate: string; value: ReactNode }[] = [
    { label: "Conversion in", rate: "0.50%", value: formatINR(r.fxIn) },
    { label: "Entry fee", rate: "0.00%", value: formatINR(r.entry) },
    { label: "Management fee", rate: "1.50% a yr", value: formatINR(r.mgmt) },
    { label: "Performance fee", rate: "not incl.", value: <ToConfirm /> },
    { label: "Exit fee", rate: "1.00% < 12 mo", value: formatINR(r.exit) },
    { label: "Conversion out", rate: "0.50%", value: formatINR(r.fxOut) },
  ];

  return (
    <figure aria-labelledby="hero-receipt-title" className="relative" data-preserve-3d>
      {/* Back sheet: sits 40px behind the card plane, so the tilt shows real depth. */}
      <div aria-hidden data-depth="back" className="absolute inset-x-4 top-4 -bottom-3 rounded-xl border bg-background-alt shadow-card" />

      {/* No overflow-hidden here on purpose: clipping would flatten the 3D layers inside. */}
      <div data-preserve-3d className="relative rounded-xl border bg-card shadow-lift">
        {/* Inner vignette: a faint shade around the card's inside edge. */}
        <div aria-hidden className="pointer-events-none absolute inset-0 rounded-xl shadow-[inset_0_0_40px_var(--color-vignette)]" />

        <div className="px-5 pt-5 pb-4">
          <div className="flex items-center justify-between gap-3">
            <p id="hero-receipt-title" className="text-body-sm font-extrabold tracking-[0.1em] text-faint uppercase">
              Specimen fee receipt
            </p>
            <Illustrative />
          </div>
          <p className="mt-3 type-h4 text-foreground num">{formatINR(AMOUNT)}</p>
          <p className="text-body-sm text-muted-foreground">
            for {MONTHS} months · assumed return 0%
          </p>
        </div>

        <dl className="border-t border-dashed border-border-strong px-5">
          {lines.map((l) => (
            <div key={l.label} className="flex items-baseline justify-between gap-3 border-b border-dashed border-border py-2">
              <dt className="text-body-md text-muted-foreground">
                {l.label} <span className="text-body-sm text-faint">· {l.rate}</span>
              </dt>
              <dd className="text-right text-body-md font-semibold whitespace-nowrap text-foreground num">{l.value}</dd>
            </div>
          ))}
          <div className="flex items-baseline justify-between gap-3 py-3">
            <dt className="text-body-md font-bold text-foreground">Total fees</dt>
            <dd className="text-right whitespace-nowrap text-body-md num">
              <span className="font-bold text-foreground">{formatINR(r.total)}</span>{" "}
              <span className="text-body-sm text-faint">({formatPct(r.costPct, { digits: 2, signed: false })})</span>
            </dd>
          </div>
        </dl>

        {/* Floats 36px in front of the card: the number a visitor actually cares about. */}
        <div data-depth="front" className="mx-3 flex items-center justify-between gap-4 rounded-lg bg-ink px-4 py-3.5 text-primary-foreground shadow-lift">
          <p className="text-body-md font-bold">
            You&rsquo;d receive
            <span className="block text-body-sm font-medium text-grey-300">after every fee</span>
          </p>
          <p className="type-h4 num">{formatINR(r.net)}</p>
        </div>

        <figcaption className="px-5 pt-3 pb-4">
          <p className="text-body-sm text-faint">
            Rates <ToConfirm /> · ₹88.00 per US$ held fixed. A weaker rupee raises your rupee value; a stronger one lowers it.
          </p>
          <ArrowLink href="#fees">Run it for your amount</ArrowLink>
        </figcaption>
      </div>
    </figure>
  );
}
