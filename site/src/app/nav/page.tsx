// A6 NAV & performance centre. Server page; only the explorer, the CSV button and the
// comparison toggle are client components.
import type { Metadata } from "next";
import { BasketTable } from "@/components/nav/basket-table";
import { DownloadCsvButton } from "@/components/nav/download-csv-button";
import { MonthGrid } from "@/components/nav/month-grid";
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- kept imported so the changelog switches back on in one edit
import { NavChangelog } from "@/components/nav/nav-changelog";
import { NavCompare } from "@/components/nav/nav-compare";
import { NavExplorerCard } from "@/components/nav/nav-explorer-card";
import { NavMethodology } from "@/components/nav/nav-methodology";
import { Badge, Disclosure, Illustrative, Reveal, Section, SectionHead, ToConfirm } from "@/components/paraa/primitives";
import { SiteFooter } from "@/components/site/footer";
import { SiteHeader } from "@/components/site/header";
import { RebrandBar } from "@/components/site/rebrand-bar";
import { headline, monthEndISO } from "@/lib/calc";
import { dateLabel } from "@/lib/format";

export const metadata: Metadata = {
  title: "NAV & performance",
  description:
    "Every published NAV for every Paraa Capital basket, since day one. Monthly returns, the largest fall, a CSV download and how we calculate it. Illustrative data.",
  alternates: { canonical: "/nav" },
};

export default function NavPage() {
  const updated = dateLabel(monthEndISO(headline().latestMonth));

  return (
    <>
      <RebrandBar />
      <SiteHeader />
      <main id="main" className="flex-1">
        {/* A6.1 Header */}
        <section aria-labelledby="page-title" className="pt-12 pb-10 md:pt-20 md:pb-14">
          <div className="container-page">
            <Reveal className="max-w-[760px] space-y-4">
              <p className="eyebrow">NAV &amp; performance centre</p>
              <h1 id="page-title" className="type-h1 text-balance">
                NAV &amp; performance
              </h1>
              <p className="text-body-xl text-muted-foreground text-pretty">
                Every published <abbr title="net asset value">NAV</abbr> (the price of one unit of a basket) for every basket, since day one.
                Download it, check it, quote it back to us.
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <Badge>Last updated {updated}</Badge>
                <Illustrative />
              </div>
            </Reveal>
          </div>
        </section>

        {/* A6.2 Basket comparison table */}
        <BasketTable />

        {/* A6.3 Full NAV explorer with date-range presets */}
        <Section id="explorer" labelledBy="explorer-title">
          <SectionHead
            id="explorer-title"
            title="The whole history. No flattering window."
            lede={
              <>
                The chart opens on <em>since inception</em>. Pick any start and end month. The weakest stretch stays shaded whatever range you
                choose.
              </>
            }
          />
          <Reveal>
            <NavExplorerCard />
          </Reveal>
        </Section>

        {/* A6.4 Monthly returns grid */}
        <MonthGrid />

        {/* A6.5 Changelog: switched off because the user asked to drop the NAV changelog. */}
        {/* <NavChangelog /> */}

        {/* A6.6 Download */}
        <Section size="sm" labelledBy="download-title">
          <Reveal className="rounded-lg border bg-card p-6 md:p-8">
            <h2 id="download-title" className="type-h3">
              Download the full history
            </h2>
            <p className="mt-3 text-body-lg text-muted-foreground">One row per month-end, nothing removed. Columns:</p>
            <p className="mt-2 overflow-x-auto">
              <code className="rounded-sm bg-muted px-2 py-1 text-body-md whitespace-nowrap">
                date, basket, nav_usd, monthly_return, revised, revision_note, signed_by
              </code>
            </p>
            <p className="mt-3 text-body-sm text-muted-foreground">Generated in your browser from the prototype dataset · Illustrative</p>
            <DownloadCsvButton variant="default" className="mt-6">
              Download NAV history (CSV)
            </DownloadCsvButton>
          </Reveal>
        </Section>

        {/* A6.7 Methodology, expanded by default */}
        <NavMethodology />

        {/* A6.8 Comparisons */}
        <Section tone="alt" size="sm" labelledBy="vs-title">
          <SectionHead
            id="vs-title"
            title="Compared with what?"
            lede={
              <>
                If plain dollars in a deposit would have done as well, you should know that. Benchmark: <ToConfirm />.
              </>
            }
          />
          <Reveal>
            <NavCompare />
          </Reveal>
        </Section>

        {/* A6.9 Disclosure */}
        <section aria-label="Disclosure for this page" className="py-12 md:py-16">
          <div className="container-page">
          <Disclosure id="nav-centre-v1">
            Illustrative prototype data. Returns in US dollars, net of the illustrative fees, time-weighted. Rupee returns differ: a weaker rupee
            raises your rupee value; a stronger rupee lowers it. Past performance, including any simulation, does not predict future results.
            Final wording for this page <ToConfirm />.
          </Disclosure>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
