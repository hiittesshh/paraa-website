// The hero (round 18, "bold brand blocks"). The headline and lede beside the product: a realistic phone on a
// gold brand block. Then the four facts that answer the first doubts, in an ink block, each a link to its
// proof further down. The h1 is static (it's the LCP element); only the visual makes an entrance, in CSS.
//
// Below 1024: copy, visual, facts. From 1024: copy and visual side by side, the facts block full width under
// them. "You can lose money" sits second, so it is in the first screen on a phone (decision 7), and every
// limit is set at its claim's size (decision 65).
import { ButtonLink } from "@/components/ui/button";
import { Disclosure } from "@/components/ui/disclosure";
import { FactCell, type FactCellData } from "@/components/ui/fact-cell";
import { Section } from "@/components/ui/section";
import { FIU_REG_NO } from "@/lib/links";
import { CTA } from "@/lib/nav";
import { HeroVisual } from "./hero-visual";

const FACTS: readonly FactCellData[] = [
  {
    first: FIU_REG_NO ? `Registered with FIU-IND, no. ${FIU_REG_NO}.` : "Registered with FIU-IND.",
    second: <Disclosure id="fiu-cell-v1" as="span" />,
    href: "#security-registration",
  },
  {
    first: "You can lose money.",
    second: <Disclosure id="risk-cell-v1" as="span" />,
    href: "#numbers",
  },
  {
    first: "Withdrawals go only to you.",
    second: <Disclosure id="withdraw-cell-v1" as="span" />,
    href: "#security-withdrawals",
  },
  {
    first: "We never ask for your OTP or PIN.",
    second: "Not by call, not by message.",
    href: "#security-otp",
  },
];

export function Hero() {
  const facts = FACTS.filter((fact) => fact.first && fact.second && fact.href);

  return (
    <Section id="top" labelledBy="hero-title" className="overflow-x-clip pt-10 md:pt-16 lg:pt-20">
      {/* Below 1024 the order is copy → facts → visual, so "You can lose money" stays in a phone's first screen
          (decision 7). From 1024 the visual sits beside the copy and the facts run full width underneath. */}
      <div className="grid items-center gap-y-10 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-x-12 lg:gap-y-20 xl:gap-x-20">
        <div className="lg:col-start-1 lg:row-start-1">
          <h1 id="hero-title" tabIndex={-1} className="type-display max-w-[14ch]">
            One basket that follows US stocks, gold and crude oil
          </h1>
          <p className="mt-6 max-w-[46ch] text-body-xl text-copy">
            One of the baskets in the Paraa app, for residents of India. You add money and withdraw in rupees, and each
            unit’s price is updated once a day.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink variant="primary" size="lg" block href={CTA.href} className="sm:px-8">
              {CTA.label}
            </ButtonLink>
            <ButtonLink variant="secondary" size="lg" block href="#how">
              How it works
            </ButtonLink>
          </div>
          <p className="mt-3 text-body-md text-muted-foreground">Send a question first. You don’t need an account.</p>
        </div>

        <div className="theme-ink rounded-2xl px-6 py-7 sm:px-8 lg:col-span-2 lg:row-start-2 lg:px-10 lg:py-10">
          <h2 className="sr-only">Before you start</h2>
          <ul className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
            {facts.map((fact) => (
              <li key={fact.href}>
                <FactCell {...fact} />
              </li>
            ))}
          </ul>
        </div>

        <HeroVisual className="mx-auto w-full max-w-136 lg:col-start-2 lg:row-start-1 lg:max-w-none" />
      </div>
    </Section>
  );
}
