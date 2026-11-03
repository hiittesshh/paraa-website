// FAQ: the questions people actually ask, one short answer each, in the shared accordion. Only
// questions we can answer today are listed; anything still unconfirmed waits until it is.
import type { ReactNode } from "react";
import Link from "next/link";
import { Accordion, type AccordionEntry } from "@/components/paraa/accordion";
import { Reveal, Section, SectionHead } from "@/components/paraa/primitives";

function A({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="font-semibold text-foreground underline decoration-border-strong underline-offset-4 transition-colors duration-150 hover:decoration-foreground">
      {children}
    </Link>
  );
}

const ITEMS: AccordionEntry[] = [
  {
    value: "what",
    title: "What is the Paraa International Basket?",
    content: <p>One investment that holds US stocks, gold and crude oil together. You invest in rupees and it is priced in US dollars.</p>,
  },
  {
    value: "own",
    title: "What do I actually own?",
    content: (
      <p>
        Units of the basket. The basket gets its exposure through derivative contracts, so you don&rsquo;t own the shares, gold
        or oil directly.
      </p>
    ),
  },
  {
    value: "price",
    title: "How is the price set?",
    content: <p>The basket has one price per unit, updated every day in US dollars. New money gets units at the next price.</p>,
  },
  {
    value: "monthly",
    title: "Can I invest every month?",
    content: <p>Yes. If a monthly payment fails, that month is simply skipped. You&rsquo;re never charged twice.</p>,
  },
  {
    value: "withdraw",
    title: "When can I withdraw?",
    content: <p>When your lock-in period ends. The money is paid in rupees, only to a bank account in your name.</p>,
  },
  {
    value: "rupee",
    title: "How does the rupee affect my money?",
    content: (
      <p>
        Your investment is in US dollars. If the rupee weakens, it&rsquo;s worth more in rupees. If the rupee strengthens,
        it&rsquo;s worth less. <A href="#why-usd">See the rupee&rsquo;s history</A>.
      </p>
    ),
  },
  {
    value: "tax",
    title: "How is it taxed?",
    content: (
      <p>
        No tax when you invest. Profit is taxed at your slab rate plus 4% cess. Your CA files it for you.{" "}
        <A href="#tax">How tax works</A>.
      </p>
    ),
  },
  {
    value: "ca",
    title: "Can I talk to a CA before I join?",
    content: (
      <p>
        Yes. <A href="#ask">Send your question</A> and a CA will call you back. You don&rsquo;t need an account.
      </p>
    ),
  },
];

export function Faq() {
  return (
    <Section id="faq" tone="alt" labelledBy="faq-title">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHead
            id="faq-title"
            eyebrow="FAQ"
            title="Common questions"
            lede={
              <>
                Can&rsquo;t find your answer? <A href="#ask">Ask a CA</A>.
              </>
            }
            className="mb-0 md:mb-0"
          />
        </div>
        <Reveal delay={1}>
          <Accordion items={ITEMS} defaultOpen={[ITEMS[0].value]} />
        </Reveal>
      </div>
    </Section>
  );
}
