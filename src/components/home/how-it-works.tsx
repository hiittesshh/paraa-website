// How it works (round 18, "bold brand blocks"). Four steps as white cards on the Light section, each led by
// its number on a gold chip (the content really is a sequence), rising in one after another. Then the path
// the money takes, in a gold block: your own bank account at both ends (ink), the app in between (white),
// with its limit (no shortcut back) and the off-ramp to the question form. APP_LINK adds "Get the app" once
// it's set; while it's null nothing renders.
import { Reveal } from "@/components/motion/reveal";
import { Disclosure } from "@/components/ui/disclosure";
import { TextLink } from "@/components/ui/link";
import { MoneyLoop } from "@/components/ui/money-loop";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { APP_LINK, CTA } from "@/lib/nav";

const STEPS = [
  {
    title: "Verify your identity",
    body: (
      <>
        In the Paraa app, complete <abbr title="know-your-customer checks">KYC</abbr> (know-your-customer checks) with
        PAN, Aadhaar through DigiLocker and a face scan.
      </>
    ),
  },
  {
    title: "Add money to your wallet",
    body: "Pay in rupees by UPI or bank transfer. We verify the payment before you can invest it.",
  },
  {
    title: "Invest",
    body: "Invest from your Paraa wallet. The money you invest buys units at the next daily price.",
  },
  {
    title: "Redeem and withdraw",
    body: "When your investment matures, redeem it to your wallet. Then withdraw in rupees to a verified bank account in your name.",
  },
] as const;

export function HowItWorks() {
  return (
    <Section id="how" labelledBy="how-title" tone="alt">
      <SectionHeader
        id="how-title"
        title="From sign-up to withdrawal, in four steps"
        lede="What happens to your money, in the order it happens."
        layout="split"
      />

      <Reveal as="ol" stagger={0.1} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step, i) => (
          <li key={step.title} className="flex flex-col rounded-2xl bg-card p-6 lg:p-8">
            <span
              aria-hidden
              className="grid size-12 place-items-center rounded-sm bg-brand type-heading text-brand-foreground num"
            >
              {i + 1}
            </span>
            <h3 className="mt-8 type-heading">
              <span className="sr-only">Step {i + 1}: </span>
              {step.title}
            </h3>
            <p className="mt-3 text-body-lg text-copy">{step.body}</p>
          </li>
        ))}
      </Reveal>

      {/* Owner, 13 Nov 2026: on ink, so the gold pulses from the c1 concept can glow along the path. */}
      <Reveal className="theme-ink mt-4 rounded-2xl p-6 sm:p-8 lg:p-12">
        <h3 className="type-heading">Where your money goes</h3>
        <MoneyLoop className="mt-6 lg:mt-14" />
        <div className="mt-8 grid gap-4 border-t pt-6 lg:grid-cols-2 lg:gap-16">
          <Disclosure id="no-shortcut-v1" as="p" className="max-w-prose text-body-lg text-copy" />
          <p className="text-body-lg text-copy">
            Want to ask before you start? <TextLink href={CTA.href}>Ask a CA your question first.</TextLink> You don’t
            need an account.
            {APP_LINK && (
              <>
                {" "}
                <TextLink variant="standalone" external href={APP_LINK.href}>
                  {APP_LINK.label}
                </TextLink>
              </>
            )}
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
