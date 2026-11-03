// A5.3 NAV explorer: the core proof. Server shell; the interactive card is a client component
// shared with the /nav page so both always show the same chart and the same maths.
import Link from "next/link";
import { NavExplorerCard } from "@/components/nav/nav-explorer-card";
import { Disclosure, Reveal, Section, SectionHead } from "@/components/paraa/primitives";

export function NavExplorer() {
  return (
    <Section id="explorer" labelledBy="explorer-title">
      <SectionHead
        id="explorer-title"
        eyebrow="NAV explorer"
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
      <Reveal className="mt-6">
        <Disclosure id="nav-explorer-v1">
          Illustrative prototype data. Returns in US dollars, net of the illustrative fees in <Link href="#fees">Fees</Link>, time-weighted.{" "}
          <abbr title="net asset value">NAV</abbr> is the price of one unit of the basket. Rupee returns differ: a weaker rupee raises your
          rupee value; a stronger rupee lowers it. See <Link href="#rupee">how the rupee changes this</Link>. Every month is on the{" "}
          <Link href="/nav">NAV &amp; performance page</Link>.
        </Disclosure>
      </Reveal>
    </Section>
  );
}
