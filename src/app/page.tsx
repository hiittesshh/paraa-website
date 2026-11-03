// The homepage: the one international basket of US stocks, gold and crude oil.
// Order: what it is → what it could do → why USD → how it works → tax → CA advisors (and the
// question form) → the blog (hidden until it has a Paraa address) → questions → one last ask.
import type { Metadata } from "next";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { Hero } from "@/components/home/hero";
import { Basket } from "@/components/home/basket";
import { WhatIf } from "@/components/home/what-if";
import { RupeeDollar } from "@/components/home/rupee-dollar";
import { HowMoneyMoves } from "@/components/home/how-money-moves";
import { Tax } from "@/components/home/tax";
import { Advisors } from "@/components/home/advisors";
import { Learn } from "@/components/home/learn";
import { Faq } from "@/components/home/faq";
import { ClosingCta } from "@/components/home/closing-cta";

export const metadata: Metadata = {
  title: { absolute: "Paraa Capital: invest in US stocks, gold and crude oil from India" },
  description:
    "One international basket of US stocks, gold and crude oil, bought in rupees. No tax when you invest, and a chartered accountant for every investor.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Invest in US stocks, gold and crude oil",
    description: "One basket, bought in rupees. No tax when you invest. A chartered accountant for every investor.",
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
        <RupeeDollar />
        <HowMoneyMoves />
        <Tax />
        <Advisors />
        <Learn />
        <Faq />
        <ClosingCta />
      </main>

      <SiteFooter />
    </>
  );
}
