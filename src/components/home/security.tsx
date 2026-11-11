// How we protect your account (round 18b, in the language of the hero and basket: contained colour tiles on
// white). Four tiles, one per promise, each with a small visual of what it means: withdrawals (ink, with an
// example withdraw card), the OTP/PIN rule (gold, six masked code boxes), payment checks (Light, a verified
// chip) and the FIU-IND registration with its limit (outlined). Then one ink block, "How to spot a fake",
// with the scam lines drawn as message bubbles and the truth under each.
//
// The tile headings keep their anchor ids for the hero's fact cells and the FAQ (#security-withdrawals,
// #security-otp, #security-checks, #security-registration, #security-fakes); each takes focus from script.
import { Check } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Disclosure } from "@/components/ui/disclosure";
import { TextLink } from "@/components/ui/link";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { ExampleTag, Tag } from "@/components/ui/tag";
import { FIU_REG_NO, SHOW_CYBERCRIME_HELPLINE } from "@/lib/links";
import { cn } from "@/lib/utils";

const FAKES = [
  {
    scam: "Your withdrawal is on hold. Share the OTP we just sent to release it.",
    truth: "We never ask for an OTP or PIN.",
  },
  {
    scam: "Pay the processing fee to my personal account and your units will be released.",
    truth: "We never ask you to pay into a personal account.",
  },
  {
    scam: "I can send your withdrawal to a different account for you.",
    truth: "Withdrawals go only to a verified bank account in your name.",
  },
] as const;

const TILE = "flex flex-col rounded-2xl p-6 sm:p-8 lg:p-10";

function TileHeading({ id, children }: { id: string; children: string }) {
  return (
    <h3 id={id} tabIndex={-1} className="type-heading max-w-[22ch]">
      {children}
    </h3>
  );
}

export function Security() {
  return (
    <Section id="security" labelledBy="security-title">
      <SectionHeader
        id="security-title"
        title="How we protect your account"
        lede="What we always do, what we never ask, and how to spot someone pretending to be us."
        layout="split"
      />

      <Reveal as="ul" stagger={0.1} className="grid grid-cols-[minmax(0,1fr)] gap-4 lg:grid-cols-12">
        {/* Withdrawals: ink, with an example of the withdraw screen floating in it. */}
        <li className={cn(TILE, "theme-ink lg:col-span-7")}>
          <TileHeading id="security-withdrawals">Withdrawals go only to you</TileHeading>
          <p className="mt-3 max-w-[46ch] text-body-lg text-copy">
            The app pays out only in rupees, to a bank account you’ve verified in your own name, after your investment
            matures.
          </p>
          <figure aria-label="Example of the withdraw screen" className="mt-8 lg:mt-auto lg:pt-10">
            <div className="theme-light max-w-md rounded-xl bg-card p-5 shadow-float">
              <div className="flex items-center justify-between gap-4">
                <span className="text-body-md text-muted-foreground">Withdraw to</span>
                <ExampleTag />
              </div>
              <p className="mt-1 type-heading num">
                <span className="normal-nums">••</span>4821
              </p>
              <dl className="mt-4 divide-y border-t text-body-md">
                <div className="flex items-center justify-between gap-4 py-3">
                  <dt>Name matches yours</dt>
                  <dd>
                    <Tag icon="check">Allowed</Tag>
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-4 pt-3">
                  <dt>Someone else’s account</dt>
                  <dd>
                    <Tag icon="x">Not allowed</Tag>
                  </dd>
                </div>
              </dl>
            </div>
            <figcaption className="mt-3 text-body-md text-muted-foreground">
              <Disclosure id="mock-caption-v1" as="span" />
            </figcaption>
          </figure>
        </li>

        {/* OTP and PIN: gold, with six masked code boxes. */}
        <li className={cn(TILE, "theme-gold lg:col-span-5")}>
          <TileHeading id="security-otp">We never ask for your OTP or PIN</TileHeading>
          <p className="mt-3 text-body-lg text-copy">
            Not by call, not by message. We also never ask you to pay into a personal account. Anyone who does isn’t us.
          </p>
          {/* Six equal boxes that share the width (they'd overflow a 320px screen at a fixed size). */}
          <div aria-hidden className="mt-8 grid max-w-76 grid-cols-6 gap-2 lg:mt-auto lg:pt-10">
            {Array.from({ length: 6 }, (_, i) => (
              <span
                key={i}
                className="grid aspect-square place-items-center rounded-sm bg-card type-heading text-foreground"
              >
                •
              </span>
            ))}
          </div>
        </li>

        {/* Payment checks: Light, with a verified chip. */}
        <li className={cn(TILE, "theme-alt lg:col-span-5")}>
          <TileHeading id="security-checks">We check every payment you add</TileHeading>
          <p className="mt-3 text-body-lg text-copy">
            You add money by UPI or bank transfer, and we verify it before you can invest.
          </p>
          <div aria-hidden className="mt-8 lg:mt-auto lg:pt-10">
            <span className="inline-flex items-center gap-3 rounded-xl bg-card py-3 pr-5 pl-3 shadow-float">
              <span className="grid size-9 place-items-center rounded-full bg-primary text-primary-foreground">
                <Check className="size-4" />
              </span>
              <span className="text-body-md font-semibold">Payment verified, ready to invest</span>
            </span>
          </div>
        </li>

        {/* The registration and its limit: outlined, so it reads as a statement, not a badge. */}
        <li className={cn(TILE, "border-2 border-foreground lg:col-span-7")}>
          <TileHeading id="security-registration">Registered with FIU-IND</TileHeading>
          <Disclosure id="fiu-band-v1" as="p" className="mt-3 max-w-[60ch] text-body-lg text-copy" />
          {FIU_REG_NO && <p className="mt-3 text-body-md text-muted-foreground num">Registration no. {FIU_REG_NO}</p>}
        </li>
      </Reveal>

      {/* How to spot a fake: one ink block, the scam lines as message bubbles. */}
      <Reveal className="theme-ink mt-4 rounded-2xl p-6 sm:p-8 lg:p-12">
        <h3 id="security-fakes" tabIndex={-1} className="type-title max-w-[20ch]">
          How to spot a fake
        </h3>
        <dl className="mt-8 grid gap-8 lg:mt-10 lg:grid-cols-3 lg:gap-6">
          {FAKES.map((fake) => (
            <div key={fake.scam}>
              <dt className="theme-light rounded-2xl rounded-bl-xs bg-card p-5 text-body-lg text-foreground">
                “{fake.scam}”
              </dt>
              <dd className="mt-4 text-body-lg text-copy">
                {/* The verdict tag: ink on gold (decision 58). In forced colours it falls back to plain text. */}
                <strong className="mr-2 rounded-xs bg-brand px-2 py-0.5 font-semibold text-brand-foreground">
                  Not Paraa.
                </strong>
                {fake.truth}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-10 max-w-prose border-t pt-6 text-body-lg text-copy">
          If someone contacts you claiming to be Paraa, don’t share any code and don’t pay. If you’ve already shared a
          code or paid someone, call your bank straight away.
          {/* Off until compliance approves it (spec §12 #12; links.ts records the source and date when it's on). */}
          {SHOW_CYBERCRIME_HELPLINE && (
            <>
              {" "}
              To report fraud in India, call <TextLink href="tel:1930">1930</TextLink> or go to{" "}
              <TextLink href="https://cybercrime.gov.in" external>
                cybercrime.gov.in
              </TextLink>
              .
            </>
          )}
        </p>
      </Reveal>
    </Section>
  );
}
