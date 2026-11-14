// Questions before you invest (spec §6.7), a Server Component: native <details>, so it works with JS off,
// several items may be open at once, and Chrome's find-in-page opens a matching closed item. Liquidity is
// the top unanswered doubt, so "When can I get my money out?" comes first and is open (v1.1, N-d).
// Each item's id is faq-{slug}: #faq-{slug} links open it (HashHandler). The heading isn't sticky.
//
// Not on the page (owner decisions and unconfirmed facts): "Can I lose money?", "Can I invest every
// month?", and anything on fees, custody or how Paraa makes money.
import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/button";
import { Disclosure } from "@/components/ui/disclosure";
import { FaqItem, FaqList } from "@/components/ui/faq-item";
import { TextLink } from "@/components/ui/link";
import { Section } from "@/components/ui/section";
import { FIU_REG_NO } from "@/lib/links";
import { CTA } from "@/lib/nav";

const ITEMS: readonly { slug: string; question: string; answer: ReactNode }[] = [
  {
    slug: "money-out",
    question: "When can I get my money out?",
    answer:
      "Each investment has a maturity date. When it matures, redeem it, which moves it to your Paraa wallet. Then withdraw in rupees to a verified bank account in your name.",
  },
  {
    slug: "registered",
    question: "Is Paraa registered with anyone?",
    // The same text as the band's registration row.
    answer: (
      <>
        <Disclosure id="fiu-band-v1" as="span" />
        {FIU_REG_NO && <span className="num"> Registration no. {FIU_REG_NO}.</span>}
      </>
    ),
  },
  {
    slug: "own",
    question: "What do I actually own?",
    answer:
      "Units of the basket. The basket follows US stocks, gold and crude oil through derivative contracts (agreements whose value follows a price), so you don’t own the shares, gold or oil directly.",
  },
  {
    slug: "uninvested",
    question: "Can I take out money I’ve added but not invested?",
    answer:
      "Not straight away. Money you add to your Paraa wallet has to be invested first. You can withdraw it after that investment matures and you redeem it.",
  },
  {
    slug: "price",
    question: "How often does the price change?",
    answer:
      "Once a day. Each unit has one price, and money you invest buys units at the next price. Weekends and holidays keep the last price.",
  },
  {
    slug: "rupee",
    question: "How does the rupee affect my money?",
    answer:
      "US stocks, gold and crude oil are mostly priced in dollars. So a weaker rupee raises your investment’s rupee value, and a stronger rupee lowers it.",
  },
  {
    slug: "tax",
    question: "How is it taxed?",
    answer: (
      <>
        It depends on how this income is classified. If it’s business income, profit is taxed at your slab rate plus{" "}
        <span className="num">4%</span> cess. If the basket counts as a virtual digital asset, it’s a flat{" "}
        <span className="num">30%</span> plus cess, and a loss can’t be set off against other income or carried
        forward. Ask a CA about your own tax.
      </>
    ),
  },
  {
    slug: "who-reads",
    question: "Who reads my question?",
    answer: (
      <>
        A chartered accountant (CA) reads it, and we contact you about it. <Disclosure id="ca-paid-v1" as="span" />
      </>
    ),
  },
  {
    slug: "real",
    question: "How do I know it’s really Paraa?",
    answer: (
      <>
        We never ask you to share your OTP or PIN by call or message, or to pay into a personal account. If someone
        does, it isn’t us. See <TextLink href="/#security">how we protect you</TextLink>.
      </>
    ),
  },
];

export function Faq() {
  return (
    <Section id="faq" labelledBy="faq-title">
      <div className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div className="mb-8 lg:mb-0">
          <div className="lg:tall:sticky lg:tall:top-[calc(var(--header-h)+2rem)]">
            <h2 id="faq-title" tabIndex={-1} className="type-title max-w-[24ch]">
              Questions before you invest
            </h2>
            <p className="mt-4 text-body-xl text-muted-foreground">Short answers to check before you decide.</p>
            {/* Round 18b: the way out of the FAQ, as an ink card rather than a link in a sentence. */}
            <div className="theme-ink mt-8 hidden rounded-2xl p-6 sm:p-8 lg:block">
              <p className="type-heading">Don’t see yours?</p>
              <p className="mt-2 text-body-lg text-copy">Ask a CA. You don’t need an account.</p>
              <ButtonLink variant="primary" size="lg" href={CTA.href} className="mt-6">
                {CTA.label}
              </ButtonLink>
            </div>
            <p className="mt-4 text-body-lg text-copy lg:hidden">
              Don’t see yours? <TextLink href={CTA.href}>Ask a CA.</TextLink> You don’t need an account.
            </p>
          </div>
        </div>

        <FaqList>
          {ITEMS.map((item, i) => (
            <FaqItem key={item.slug} slug={item.slug} question={item.question} open={i === 0}>
              <p>{item.answer}</p>
            </FaqItem>
          ))}
        </FaqList>
      </div>
    </Section>
  );
}
