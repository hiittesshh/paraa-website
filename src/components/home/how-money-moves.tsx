// "How it works": the five steps from sign-up to money back in your bank, as the app actually runs
// them (round 3, from the platform's own rules: DigiLocker/PAN/selfie KYC that never auto-rejects,
// units at the next daily NAV, a missed monthly payment skipped rather than doubled, withdrawals
// only at maturity and only to your own account). Anything not yet confirmed is marked TO CONFIRM.
//
// Light theme: a quiet rail on white. Each connector draws itself in once as it scrolls into
// view (a clip-path wipe rather than a scale). Motion's RSC entry keeps this a server component.
import type { ReactNode } from "react";
import { Connector } from "./how-connector";
import { Ban, BanknoteArrowDown, CalendarClock, Landmark, UserCheck, UserRound, type LucideIcon } from "lucide-react";
import { ArrowLink, Reveal, RevealGroup, RevealItem, Section, SectionHead, ToConfirm } from "@/components/paraa/primitives";

interface Step {
  title: string;
  icon: LucideIcon;
  money?: string; // the currency your money is in at this step, when it matters
  summary: ReactNode;
  time: ReactNode;
}

/** A TO CONFIRM tag glued to the punctuation after it, so a lone full stop never wraps onto its own line. */
function Tc({ children, end = "." }: { children?: ReactNode; end?: string }) {
  return (
    <span className="whitespace-nowrap">
      <ToConfirm>{children}</ToConfirm>
      {end}
    </span>
  );
}

const STEPS: Step[] = [
  {
    title: "Join and verify",
    icon: UserCheck,
    summary: "Sign up in the app with your mobile number. Verify with Aadhaar through DigiLocker, your PAN and a live selfie.",
    time: "Most checks are automatic. Anything unclear goes to a person; nobody is rejected by a machine.",
  },
  {
    title: "Meet your CA",
    icon: UserRound,
    summary: "A chartered accountant is assigned to you. Before you invest, they go through your goals, savings and tax with you.",
    time: (
      <>
        Assigned within [N] working days <Tc />
      </>
    ),
  },
  {
    title: "Add rupees and invest",
    icon: Landmark,
    money: "₹",
    summary: "Add money from a bank account in your own name. Invest it at once, or set up a monthly plan.",
    time: "Whenever you choose. If a monthly payment is missed, it's skipped, never charged twice later.",
  },
  {
    title: "Units at the next price",
    icon: CalendarClock,
    money: "US$",
    summary: "Your money buys units at the next daily NAV. The app shows what they're worth every day, in dollars and rupees.",
    time: "Units usually the next day.",
  },
  {
    title: "Take it out at maturity",
    icon: BanknoteArrowDown,
    money: "₹",
    summary: "When your lock-in ends, take out some or all of it. Rupees go only to a bank account in your name.",
    time: (
      <>
        In your bank within [N] working days <Tc />
      </>
    ),
  },
];

const NEVER = [
  "Ask you to pay a personal account, a person's UPI ID, or anyone over WhatsApp.",
  "Ask for your OTP, PIN or bank password.",
  "Pay a withdrawal into an account that isn't in your name.",
  "Promise you a return. Nobody can.",
];

export function HowMoneyMoves() {
  return (
    <Section id="how" tone="alt" labelledBy="how-title">
      <SectionHead
        id="how-title"
        eyebrow="How it works"
        title="From sign-up to money back in your bank"
        lede="Five steps. Your CA comes before your first rupee, not after it."
      />

      <ol className="grid lg:grid-cols-5 lg:gap-4" aria-label="The five steps">
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

              <article className="mb-6 flex min-w-0 flex-1 flex-col rounded-lg border bg-card p-5 shadow-card lg:mb-0">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="num text-body-sm font-extrabold tracking-[0.08em] text-faint uppercase">Step {i + 1}</span>
                  {s.money && (
                    <span className="num rounded-full border bg-muted px-2 text-body-sm font-semibold text-foreground">{s.money}</span>
                  )}
                </div>
                <h3 className="type-h6 text-balance">{s.title}</h3>
                <p className="mt-2 text-body-md text-muted-foreground">{s.summary}</p>
                <div className="mt-auto pt-4">
                  <p className="border-t pt-3 text-body-sm text-muted-foreground">
                    <span className="font-bold text-foreground">How long: </span>
                    {s.time}
                  </p>
                </div>
              </article>
            </Reveal>
          );
        })}
      </ol>

      <RevealGroup className="mt-10">
        <RevealItem className="grid gap-6 rounded-lg border bg-card p-5 shadow-card md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] md:p-6">
          <div>
            <h3 className="type-h6 flex items-center gap-3">
              <span aria-hidden className="grid size-9 shrink-0 place-items-center rounded-full bg-error/10">
                <Ban className="size-5 stroke-error" />
              </span>
              What we never do
            </h3>
            <p className="mt-3 text-body-md text-muted-foreground">
              If anyone asks you to do one of these in our name, stop and contact us on an official channel.
            </p>
            <ArrowLink href="#official-channels">Our official channels</ArrowLink>
          </div>
          <ul className="grid gap-2.5 text-body-md text-foreground sm:grid-cols-2">
            {NEVER.map((line) => (
              <li key={line} className="flex gap-3 rounded-md bg-background-alt p-3">
                <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-error" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </RevealItem>
      </RevealGroup>
    </Section>
  );
}
