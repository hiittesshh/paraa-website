// "Tax": how the basket's income is taxed, as Paraa states its position (round 3): nothing is
// taxed when you invest; the basket earns through derivative contracts, so profit is business
// income, taxed at your own slab rate. Loss carry-forward depends on how the income is classified
// (speculative: 4 years; non-speculative: 8), so the page says that instead of picking one.
// Plain rules on the left, a live estimator on the right (tax-estimator.tsx), and the real answer
// routed to the investor's CA. The CA review of this text is marked TO CONFIRM until it's signed.
import type { ReactNode } from "react";
import { ArrowLink, Reveal, RevealGroup, RevealItem, Section, SectionHead, ToConfirm } from "@/components/paraa/primitives";
import { TaxEstimator } from "./tax-estimator";

const RULES: { title: string; body: ReactNode }[] = [
  {
    title: "Investing isn’t taxed",
    body: "Putting money in, holding units and adding to them each month create no tax at all.",
  },
  {
    title: "Profit is taxed at your slab rate",
    body: "The basket earns through derivative contracts, so your profit counts as business income. It is added to your other income for the year and taxed at your normal rate, plus 4% cess.",
  },
  {
    title: "A loss isn’t wasted",
    body: "It can be set off against future profits of the same kind. For how many years (4 or 8) depends on how the income is classified, which your CA will confirm.",
  },
  {
    title: "You file ITR-3",
    body: "Business income goes on ITR-3, not ITR-1 or ITR-2. Your CA prepares and files it with you.",
  },
  {
    title: "Advance tax, if it adds up",
    body: "If your total tax for the year is more than ₹10,000, part of it is paid in instalments during the year. Your CA will tell you when.",
  },
];

export function Tax() {
  return (
    <Section id="tax" labelledBy="tax-title">
      <SectionHead
        id="tax-title"
        eyebrow="Tax"
        title="No tax when you invest. Tax only on what you earn."
        lede="Here is how the basket’s income is treated, in plain words. Your CA works out your own figure and files it with you."
      />

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12">
        <div>
          <RevealGroup as="ol" className="space-y-0 divide-y border-y">
            {RULES.map((r, i) => (
              <RevealItem as="li" key={r.title} className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-3 py-5">
                <span aria-hidden className="type-h4 leading-none text-accent num">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="block type-h6">{r.title}</span>
                  <span className="mt-1.5 block text-body-md text-muted-foreground">{r.body}</span>
                </span>
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal>
            <p className="mt-5 text-body-sm text-muted-foreground">
              This is how we read the current rules for income from derivatives. Reviewed by a CA:{" "}
              <span className="whitespace-nowrap">
                <ToConfirm />.
              </span>{" "}
              Tax rules can change in any Budget, and your own position depends on your other income.
            </p>
            <ArrowLink href="#ask">Ask a CA about your situation</ArrowLink>
          </Reveal>
        </div>

        <Reveal delay={1} className="lg:sticky lg:top-24 lg:self-start">
          <TaxEstimator />
        </Reveal>
      </div>
    </Section>
  );
}
