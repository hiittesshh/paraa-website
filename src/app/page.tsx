// The homepage (spec §5.1): the sections in page order, one ink band (Security), alternating white and
// the alternate light surface around it. The skip link comes first in <body> and lands on <main> (tabIndex -1, no ring). The
// top sentinel is main's first child: ScrollState watches it to show the header's hairline. ScrollState
// and HashHandler render nothing and mount once, after </main>.
import type { Metadata } from "next";
import { Ask } from "@/components/home/ask";
import { Basket } from "@/components/home/basket";
import { Faq } from "@/components/home/faq";
import { HashHandler } from "@/components/home/hash-handler";
import { HeroB } from "@/components/home/hero-b";
import { HowItWorks } from "@/components/home/how-it-works";
import { Security } from "@/components/home/security";
import { Tools } from "@/components/home/tools";
import { SiteFooter } from "@/components/site/footer";
import { SiteHeader, SkipLink, TopSentinel } from "@/components/site/header";
import { ScrollState } from "@/components/site/scroll-state";
import { SectionEntrance } from "@/components/motion/section-entrance";
import { SmoothScroll } from "@/components/motion/smooth-scroll";

// Spec §6.0. No risk sentence here: owner decision 1 covers the hero cell only. openGraph (title,
// description, site name) comes from the root layout, which holds the same §6.0 values; a page-level
// openGraph would replace the layout's object rather than merge with it.
export const metadata: Metadata = {
  title: { absolute: "Paraa Capital: a basket that follows US stocks, gold and crude oil, for residents of India" },
  description:
    "One basket that follows US stocks, gold and crude oil, for residents of India. You add money and withdraw in rupees.",
};

export default function Home() {
  return (
    <>
      <SkipLink />
      <SiteHeader />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        <TopSentinel />
        <HeroB />
        <Basket />
        <HowItWorks />
        <Security />
        <Tools />
        <Faq />
        <Ask />
      </main>
      <ScrollState />
      <SmoothScroll />
      <SectionEntrance />
      <HashHandler />
      <SiteFooter />
    </>
  );
}
