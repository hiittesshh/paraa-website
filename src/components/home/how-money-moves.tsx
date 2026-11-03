// "How it works": four steps from sign-up to money back in your bank, one line each, as the app
// actually runs them (KYC through DigiLocker and PAN, a CA assigned on joining, units at the next
// daily price, withdrawals at maturity to your own account).
//
// Light theme: a quiet rail on white. Each connector draws itself in once as it scrolls into
// view (a clip-path wipe rather than a scale). Motion's RSC entry keeps this a server component.
import { Connector } from "./how-connector";
import { BanknoteArrowDown, Landmark, UserCheck, UserRound, type LucideIcon } from "lucide-react";
import { Reveal, Section, SectionHead } from "@/components/paraa/primitives";

const STEPS: { title: string; icon: LucideIcon; body: string }[] = [
  { title: "Sign up and verify", icon: UserCheck, body: "Download the app and complete KYC with Aadhaar and PAN." },
  { title: "Meet your CA", icon: UserRound, body: "A chartered accountant helps you plan how much to invest." },
  { title: "Invest in rupees", icon: Landmark, body: "Pay from your bank account. Invest once or every month." },
  { title: "Track and withdraw", icon: BanknoteArrowDown, body: "See your value daily. Withdraw to your bank at maturity." },
];

export function HowMoneyMoves() {
  return (
    <Section id="how" tone="alt" labelledBy="how-title">
      <SectionHead id="how-title" eyebrow="How it works" title="Start in four simple steps" />

      <ol className="grid lg:grid-cols-4 lg:gap-4" aria-label="Four steps">
        {STEPS.map((s, i) => {
          const last = i === STEPS.length - 1;
          const Icon = s.icon;
          return (
            <Reveal as="li" key={s.title} delay={Math.min(i, 4)} className="flex gap-4 lg:flex-col lg:gap-0">
              <div aria-hidden className="flex flex-col items-center lg:mb-5 lg:flex-row">
                <span className="relative flex size-12 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-card text-foreground shadow-card">
                  <Icon className="size-5" aria-hidden />
                  <span className="num absolute -top-1 -right-1 grid size-5 place-items-center rounded-full bg-ink text-body-xs font-extrabold text-primary-foreground">
                    {i + 1}
                  </span>
                </span>
                {!last && <Connector dashed={false} index={i} />}
              </div>

              <article className="mb-6 min-w-0 flex-1 rounded-lg border bg-card p-5 shadow-card lg:mb-0">
                <h3 className="type-h6">{s.title}</h3>
                <p className="mt-2 text-body-md text-muted-foreground">{s.body}</p>
              </article>
            </Reveal>
          );
        })}
      </ol>
    </Section>
  );
}
