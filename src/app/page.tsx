// The homepage (round 3): the one international basket of US stocks, gold and crude oil.
// Order: what it is → what it could do → why dollars → how it works → tax → is it for you →
// your CA (and the question form) → the blog → questions → one last ask.
import type { Metadata } from "next";
import { RebrandBar } from "@/components/site/rebrand-bar";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { Hero } from "@/components/home/hero";
import { Basket } from "@/components/home/basket";
import { WhatIf } from "@/components/home/what-if";
import { RupeeDollar } from "@/components/home/rupee-dollar";
import { HowMoneyMoves } from "@/components/home/how-money-moves";
import { Tax } from "@/components/home/tax";
import { FitQuiz } from "@/components/home/fit-quiz";
import { Advisors } from "@/components/home/advisors";
import { Learn } from "@/components/home/learn";
import { Faq } from "@/components/home/faq";
import { ClosingCta } from "@/components/home/closing-cta";

export const metadata: Metadata = {
  title: { absolute: "Paraa Capital: US stocks, crude oil and gold in one basket, from India" },
  description:
    "One international basket of tokenized US stocks, gold and crude oil, priced daily in US dollars. Invest in rupees, with a chartered accountant assigned to you when you join.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "US stocks, crude oil and gold. One basket, in rupees.",
    description: "Priced daily in US dollars. No tax when you invest. A chartered accountant for every investor.",
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
      <RebrandBar />
      <SiteHeader />

      <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
        <Hero />
        <Basket />
        <WhatIf />
        <RupeeDollar />
        <HowMoneyMoves />
        <Tax />
        <FitQuiz />
        <Advisors />
        <Learn />
        <Faq />
        <ClosingCta />
      </main>

      <SiteFooter />
    </>
  );
}
