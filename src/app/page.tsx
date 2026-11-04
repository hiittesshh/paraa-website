// The homepage, in the shape of its references (Mercury, Wise, Plaid): one scene, then the product,
// then what it is, how it works, our rules, what you get, the questions, and the
// form. Only what we can state today is on it; docs/redesign/proposal.md section 9 lists the rest.
import type { Metadata } from "next";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { RevealController } from "@/components/paraa/reveal-controller";
import { Hero } from "@/components/home/hero";
import { Basket } from "@/components/home/basket";
import { WhatIf } from "@/components/home/what-if";
import { HowMoneyMoves } from "@/components/home/how-money-moves";
import { Tax } from "@/components/home/tax";
import { Trust } from "@/components/home/trust";
import { WhatYouGet } from "@/components/home/what-you-get";
import { Faq } from "@/components/home/faq";
import { Ask } from "@/components/home/ask";

const DESCRIPTION =
  "US stocks, gold and crude oil in one basket, bought in rupees and priced daily, for residents of India.";

export const metadata: Metadata = {
  title: { absolute: "Paraa Capital: a basket that tracks US stocks, gold and crude oil, for residents of India" },
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: "A basket that tracks US stocks, gold and crude oil",
    description: DESCRIPTION,
    url: "/",
  },
};

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-[100] rounded-md bg-primary px-4 font-bold text-primary-foreground no-underline focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:inline-flex focus:min-h-11 focus:items-center"
      >
        Skip to content
      </a>
      <SiteHeader />

      <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
        <Hero />
        <Basket />
        <WhatIf />
        <HowMoneyMoves />
        <Tax />
        <Trust />
        <WhatYouGet />
        <Faq />
        <Ask />
      </main>

      <SiteFooter />
      <RevealController />
    </>
  );
}
