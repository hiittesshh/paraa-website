// "How it works": four steps from sign-up to money back in your bank, one line each, as the app
// actually runs them (KYC through DigiLocker and PAN, a CA assigned on joining, units at the next
// daily price, withdrawals at maturity to your own account).
//
// The cards stack as you scroll, each sliding over the last and warming from white to gold to
// dark. It's plain CSS position: sticky, so scrolling is never taken over, and with no JS it still
// works. Nothing that wraps the cards may clip (overflow), or sticky silently stops working.
import { BanknoteArrowDown, Landmark, UserCheck, UserRound, type LucideIcon } from "lucide-react";
import { Section, SectionHead } from "@/components/paraa/primitives";
import { Mark } from "@/components/paraa/mark";
import { cn } from "@/lib/utils";

const STEPS: { title: string; icon: LucideIcon; body: string; card: string; quiet: string; top: string }[] = [
  {
    title: "Sign up and verify",
    icon: UserCheck,
    body: "Download the app and complete KYC with Aadhaar and PAN.",
    card: "border-border bg-card",
    quiet: "text-muted-foreground",
    top: "top-20 lg:top-24",
  },
  {
    title: "Meet your CA",
    icon: UserRound,
    body: "A chartered accountant helps you plan how much to invest.",
    card: "border-gold-200 bg-gold-100",
    quiet: "text-ink",
    top: "top-24 lg:top-28",
  },
  {
    title: "Invest in rupees",
    icon: Landmark,
    body: "Pay from your bank account. Invest once or every month.",
    card: "border-secondary bg-secondary text-ink",
    quiet: "text-ink",
    top: "top-28 lg:top-32",
  },
  {
    title: "Track and withdraw",
    icon: BanknoteArrowDown,
    body: "See your value daily. Withdraw to your bank at maturity.",
    card: "border-ink surface-ink",
    quiet: "text-grey-300",
    top: "top-32 lg:top-36",
  },
];

export function HowMoneyMoves() {
  return (
    <Section id="how" tone="alt" labelledBy="how-title">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHead
            id="how-title"
            stacked
            title={
              <>
                Start in <Mark>four simple steps</Mark>
              </>
            }
            className="mb-0 md:mb-0"
          />
        </div>

        <ol className="space-y-6" aria-label="Four steps">
          {STEPS.map(({ title, icon: Icon, body, card, quiet, top }, i) => (
            <li key={title} className={cn("sticky", top)}>
              <article className={cn("flex min-h-56 flex-col justify-between gap-8 rounded-xl border p-6 shadow-lift sm:p-8", card)}>
                <div className="flex items-start justify-between gap-4">
                  <span className="type-h1 num">{i + 1}</span>
                  <Icon aria-hidden className="size-10 shrink-0" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="type-h4">{title}</h3>
                  <p className={cn("mt-2 max-w-[44ch] text-body-lg", quiet)}>{body}</p>
                </div>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
