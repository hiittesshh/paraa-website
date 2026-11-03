import type { Metadata } from "next";
import { RebrandBar } from "@/components/site/rebrand-bar";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { Hero } from "@/components/home/hero";
import { TrustChecks } from "@/components/home/trust-checks";
import { NavExplorer } from "@/components/home/nav-explorer";
import { RangeStats } from "@/components/home/range-stats";
import { RupeeDollar } from "@/components/home/rupee-dollar";
import { FeeReceipt } from "@/components/home/fee-receipt";
import { HowMoneyMoves } from "@/components/home/how-money-moves";
import { FitQuiz } from "@/components/home/fit-quiz";
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- commented out below; kept imported for a one-edit switch-on
import { Changelog } from "@/components/home/changelog";
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- commented out below; kept imported for a one-edit switch-on
import { Incident } from "@/components/home/incident";
import { Methodology } from "@/components/home/methodology";
import { Router } from "@/components/home/router";
import { PartnerCard } from "@/components/home/partner-card";
import { Faq } from "@/components/home/faq";
import { ClosingCta } from "@/components/home/closing-cta";

export const metadata: Metadata = {
  title: { absolute: "Paraa Capital: invest in dollars, check every number first" },
  description:
    "USD-denominated investing from India. Every NAV we've published, every fee in rupees and every correction we've made. Dated, sourced, downloadable.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Invest in dollars. Check every number first.",
    description: "Every NAV, every fee in rupees, every correction. Dated, sourced, downloadable.",
    url: "/",
  },
};

// Homepage order is fixed by BUILD-BRIEF.md.
export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-[100] rounded-md bg-primary px-4 font-bold text-primary-foreground no-underline focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:inline-flex focus:min-h-11 focus:items-center"
      >
        Skip to content
      </a>
      <RebrandBar />
      <SiteHeader />

      <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
        <Hero />
        <TrustChecks />
        <NavExplorer />
        <RangeStats />
        <RupeeDollar />
        <FeeReceipt />
        <HowMoneyMoves />
        <FitQuiz />
        {/* <Changelog /> : commented out on request (shows basket NAV revisions); re-enable with a real NAV feed */}
        {/* <Incident /> : commented out on request (the "our mistake" section was dropped) */}
        <Methodology />
        <Router />
        <PartnerCard />
        <Faq />
        <ClosingCta />
      </main>

      <SiteFooter />
    </>
  );
}
