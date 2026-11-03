// A5.12 Closing CTA: the receipt comes before the app (A4: attention first, money later).
// Light theme: one centred white panel with a soft gold-50 wash from the top, one dark primary
// button (the only primary in this view) and one outline button, per the design file.
import { ButtonLink, Reveal, Section } from "@/components/paraa/primitives";

export function ClosingCta() {
  return (
    <Section size="md" labelledBy="closing-title">
      <Reveal>
        <div className="relative isolate mx-auto max-w-[880px] overflow-hidden rounded-xl border bg-card px-6 py-14 text-center shadow-lift md:px-12 md:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(70%_80%_at_50%_0%,var(--color-gold-50),transparent_70%)]"
          />
          <div aria-hidden className="mx-auto mb-6 h-1 w-12 rounded-full bg-secondary" />
          <p className="eyebrow">Before you decide</p>
          <h2 id="closing-title" className="mt-3 type-h2 text-balance">
            Seen enough numbers?
          </h2>
          <p className="mx-auto mt-4 max-w-[46ch] text-body-xl text-pretty text-muted-foreground">
            Run the fee receipt for your own amount first. Then the app, if it still makes sense.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="#fees" size="lg">
              See your fee receipt
            </ButtonLink>
            {/* Store links are TO CONFIRM; this points at the official-channels list in the footer. */}
            <ButtonLink href="#official-channels" variant="outline" size="lg">
              Get the app
            </ButtonLink>
          </div>
          <p className="mt-6 text-body-sm text-faint">Everything on this page can be read without signing up.</p>
        </div>
      </Reveal>
    </Section>
  );
}
