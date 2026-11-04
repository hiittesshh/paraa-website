// FAQ: only questions we can answer today. Native <details>, so closed answers stay in the page text
// and work with no JavaScript and in Ctrl+F. "Who holds my money?", fees and tax join once those facts
// are confirmed (proposal section 9).
import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { InlineLink, Section } from "@/components/paraa/primitives";
import { FIU_REG_NO } from "@/lib/links";

const ITEMS: { q: string; a: ReactNode }[] = [
  {
    q: "Is Paraa registered with anyone?",
    a: `Paraa Capital is registered with FIU-IND (Financial Intelligence Unit-India)${FIU_REG_NO ? `, no. ${FIU_REG_NO},` : ""} for anti-money-laundering reporting. That means verifying customers, keeping records and reporting suspicious transactions. It isn't approval of this investment, and no authority recommends it.`,
  },
  {
    q: "What do I actually own?",
    a: "Units of the basket. The basket follows these markets through derivative contracts (agreements whose value follows a price), so you don't own the shares, gold or oil directly.",
  },
  {
    q: "When can I get my money out?",
    a: "Each investment has a maturity date. When it matures, redeem it, which moves it to your Paraa wallet. Then withdraw in rupees to a verified bank account in your name. Money you've added but not invested can't be withdrawn until it has been invested, matured and redeemed.",
  },
  {
    q: "How often does the price change?",
    a: "Once a day. Each unit has one price, and money you invest buys units at the next price. Weekends and holidays keep the last price.",
  },
  {
    q: "How does the rupee affect my money?",
    a: "US stocks, gold and crude oil are mostly priced in dollars. So a weaker rupee raises your investment's rupee value, and a stronger rupee lowers it.",
  },
  {
    q: "Can I invest every month?",
    a: "Yes. You can set up a monthly plan that invests from your Paraa wallet.",
  },
  {
    q: "How do I know it's really Paraa?",
    a: "We never ask you to share your OTP or PIN by call or message, or to pay into a personal account. If someone does, it isn't us.",
  },
];

export function Faq() {
  return (
    <Section id="faq" labelledBy="faq-title">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-16">
        <div className="lg:tall:sticky lg:tall:top-28 lg:self-start">
          <h2 id="faq-title" className="type-h2 text-balance">
            Questions before you invest
          </h2>
          <p className="mt-4 text-body-xl text-muted-foreground">
            Don&rsquo;t see yours? <InlineLink href="#ask">Talk to a CA</InlineLink>.
          </p>
        </div>
        <div className="border-b">
          {ITEMS.map((item, i) => (
            <details key={item.q} open={i === 0} className="group border-t">
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 rounded-sm py-4 type-h6 [&::-webkit-details-marker]:hidden">
                {item.q}
                <ChevronDown aria-hidden className="size-5 shrink-0 text-faint transition-transform duration-200 ease-out-soft group-open:rotate-180" />
              </summary>
              <p className="max-w-[65ch] pb-6 text-body-lg text-muted-foreground">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}
