// Closing CTA: a question comes before a payment (round 3). One centred white panel with a soft
// gold-50 wash from the top, one dark primary button (the only primary in this view) and one
// outline button, per the design file.
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
            Start with a question, not a payment
          </h2>
          <p className="mx-auto mt-4 max-w-[48ch] text-body-xl text-pretty text-muted-foreground">
            Ask a CA anything first. Join when it makes sense, and a CA is assigned to you from day one.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="#ask" size="lg">
              Ask a CA a question
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
