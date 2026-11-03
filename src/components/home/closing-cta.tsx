// Closing CTA: one centred white panel with a soft gold-50 wash from the top, one dark primary
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
          <h2 id="closing-title" className="type-h2 text-balance">
            Ready to invest globally?
          </h2>
          <p className="mx-auto mt-4 max-w-[44ch] text-body-xl text-pretty text-muted-foreground">
            Talk to a CA first. It&rsquo;s free, and there&rsquo;s no obligation.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="#ask" size="lg">
              Talk to a CA
            </ButtonLink>
            <ButtonLink href="#basket" variant="outline" size="lg">
              Explore the basket
            </ButtonLink>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
