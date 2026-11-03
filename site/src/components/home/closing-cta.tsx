// A5.12 Closing CTA: the CSV comes before the app (A4: attention first, money later).
import { ButtonLink, Reveal, Section } from "@/components/paraa/primitives";
import { DownloadCsvButton } from "@/components/site/download-csv-button";

export function ClosingCta() {
  return (
    <Section size="sm" labelledBy="closing-title">
      <Reveal>
        <div className="relative isolate mx-auto max-w-[880px] overflow-hidden rounded-xl border bg-card px-6 py-14 text-center md:px-12 md:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_70%_at_50%_0%,var(--accent-soft),transparent_70%)]"
          />
          <p className="eyebrow">Before you decide</p>
          <h2 id="closing-title" className="mt-4 type-h2 text-balance">
            Seen enough numbers?
          </h2>
          <p className="mx-auto mt-4 max-w-[46ch] text-body-xl text-muted-foreground">
            Download the full history first. Then the app, if it still makes sense.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <DownloadCsvButton size="lg">Download NAV history (CSV)</DownloadCsvButton>
            {/* Store links are TO CONFIRM; this points at the official-channels list in the footer. */}
            <ButtonLink href="#official-channels" variant="outline" size="lg">
              Get the app
            </ButtonLink>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
