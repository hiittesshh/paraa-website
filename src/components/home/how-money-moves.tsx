// "How it works": four steps from sign-up to money back in your bank, one line each, as the app
// actually runs them (KYC through PAN, DigiLocker and a face scan, deposits into the wallet, units at
// the next daily price, withdrawals after maturity to your own account).
//
// The cards stack as you scroll, each sliding over the last and warming from white to gold to
// ink. It's plain CSS position: sticky, so scrolling is never taken over, and with no JS it still
// works. Nothing that wraps the cards may clip (overflow), or sticky silently stops working.
import { BanknoteArrowDown, Landmark, UserCheck, UserRound, type LucideIcon } from "lucide-react";
import { Section, SectionHead } from "@/components/paraa/primitives";
import { Mark } from "@/components/paraa/mark";
import { cn } from "@/lib/utils";

const STEPS: { title: string; icon: LucideIcon; body: string; card: string; quiet: string; top: string }[] = [
  {
    title: "Sign up and verify",
    icon: UserCheck,
    body: "In the app, verify your identity (KYC) with PAN, Aadhaar through DigiLocker and a face scan.",
    card: "surface-light border-transparent",
    quiet: "text-muted-foreground",
    top: "top-20 lg:top-24",
  },
  {
    title: "Talk to a CA",
    icon: UserRound,
    body: "Ask a chartered accountant your questions before you invest.",
    card: "border-gold-200 bg-gold-100 text-ink",
    quiet: "text-ink",
    top: "top-24 lg:top-28",
  },
  {
    title: "Invest in rupees",
    icon: Landmark,
    body: "Add money to your Paraa wallet in rupees, by UPI or bank transfer. After we verify the payment, invest once or every month.",
    card: "border-secondary bg-secondary text-ink",
    quiet: "text-ink",
    top: "top-28 lg:top-32",
  },
  {
    title: "Track and withdraw",
    icon: BanknoteArrowDown,
    body: "See your investment's value daily. When it matures, move it to your wallet and withdraw to your bank account.",
    card: "surface-ink border-ink-2",
    quiet: "text-grey-300",
    top: "top-32 lg:top-36",
  },
];

export function HowMoneyMoves() {
  return (
    <Section id="how" labelledBy="how-title">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHead
            id="how-title"
            stacked
            title={
              <>
                From sign-up to withdrawal, in <Mark>four steps</Mark>
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
