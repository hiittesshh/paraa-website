// How we protect your account (round 18b, in the language of the hero and basket: contained colour tiles on
// white). Four tiles, one per promise, each with a small visual of what it means: withdrawals (ink, with an
// example withdraw card), the OTP/PIN rule (gold, six masked code boxes), payment checks (Light, a verified
// chip) and the FIU-IND registration with its limit (outlined). (Owner, 14 Nov 2026: "How to spot a fake" removed.)
// with the scam lines drawn as message bubbles and the truth under each.
//
// The tile headings keep their anchor ids for the hero's fact cells and the FAQ (#security-withdrawals,
// #security-otp, #security-checks, #security-registration, and the retired #security-fakes forwards to #security); each takes focus from script.
import { Check } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Disclosure } from "@/components/ui/disclosure";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { ExampleTag, Tag } from "@/components/ui/tag";
import { FIU_REG_NO } from "@/lib/links";
import { cn } from "@/lib/utils";

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

    </Section>
  );
}
