// The whole homepage, shared by "/" and the hero previews (/preview/a … /preview/d), so the four
// hero variants are compared in exactly the same page.
// Basket NAV data (explorer, range stats, ledger, changelog, the /nav page) was removed on
// request; it lives in git history (commit 2194970) if it is ever needed again.
import { RebrandBar } from "@/components/site/rebrand-bar";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { Hero, type HeroVariant } from "@/components/home/hero";
import { TrustChecks } from "@/components/home/trust-checks";
import { FeeReceipt } from "@/components/home/fee-receipt";
import { RupeeDollar } from "@/components/home/rupee-dollar";
import { HowMoneyMoves } from "@/components/home/how-money-moves";
import { FitQuiz } from "@/components/home/fit-quiz";
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- commented out below; kept imported for a one-edit switch-on
import { Incident } from "@/components/home/incident";
import { Methodology } from "@/components/home/methodology";
import { Router } from "@/components/home/router";
import { PartnerCard } from "@/components/home/partner-card";
import { Faq } from "@/components/home/faq";
import { ClosingCta } from "@/components/home/closing-cta";

export function HomePage({ hero = "a" }: { hero?: HeroVariant }) {
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
        <Hero variant={hero} />
        <TrustChecks />
        <FeeReceipt />
        <RupeeDollar />
        <HowMoneyMoves />
        <FitQuiz />
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
