// A5.11 FAQ grouped by worry: DiscreteTabs (ARIA tabs) for the five worries, the shared
// accordion inside each panel. Every unanswered fact stays marked TO CONFIRM.
import type { ReactNode } from "react";
import Link from "next/link";
import { DoorOpen, Landmark, Receipt, Scale, Wallet } from "lucide-react";
import { Accordion, type AccordionEntry } from "@/components/paraa/accordion";
import { Reveal, Section, SectionHead, ToConfirm } from "@/components/paraa/primitives";
import { DiscreteTabs, type DiscreteTab } from "@/components/watermelon/discrete-tabs";

function A({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="font-semibold text-foreground underline decoration-border-strong underline-offset-4 transition-colors duration-150 hover:decoration-foreground">
      {children}
    </Link>
  );
}

const GROUPS: { id: string; label: string; icon: ReactNode; items: AccordionEntry[] }[] = [
  {
    id: "money",
    label: "Where's my money",
    icon: <Wallet />,
    items: [
      {
        value: "who-holds",
        title: "Who holds my money?",
        content: (
          <p>
            [Custodian] <ToConfirm />. See every step on <A href="#how">How your money moves</A>.
          </p>
        ),
      },
      {
        value: "shut-down",
        title: "What if Paraa shuts down?",
        content: (
          <p>
            We will publish written closure commitments: when we would close a basket, and how you would get your money back
            <ToConfirm className="ml-1" />. Legal ring-fencing of your assets: <ToConfirm />.
          </p>
        ),
      },
    ],
  },
  {
    id: "costs",
    label: "What it costs",
    icon: <Receipt />,
    items: [
      {
        value: "hidden-fee",
        title: "Is there a fee I won't see?",
        content: (
          <p>
            Every fee is on the <A href="#fees">receipt above</A>. The performance fee, if any, is <ToConfirm />. Tax collected at source (TCS) is not a fee, and is shown separately.
            Performance fee: <ToConfirm />.
          </p>
        ),
      },
    ],
  },
  {
    id: "tax",
    label: "Tax",
    icon: <Landmark />,
    items: [
      {
        value: "taxed",
        title: "How is this taxed?",
        content: (
          <p>
            We&rsquo;ll publish a CA-signed note. Until then, we won&rsquo;t guess. <ToConfirm />
          </p>
        ),
      },
    ],
  },
  {
    id: "out",
    label: "Getting out",
    icon: <DoorOpen />,
    items: [
      {
        value: "withdrawals",
        title: "How long do withdrawals take?",
        content: (
          <p>
            [T+N] business days <ToConfirm />. Holidays in India and the US both count.
          </p>
        ),
      },
    ],
  },
  {
    id: "allowed",
    label: "Is this allowed",
    icon: <Scale />,
    items: [
      {
        value: "legal",
        title: "Is this legal for a resident Indian?",
        content: (
          <p>
            The legal route is being confirmed by counsel and will be named here, with the rule it relies on. <ToConfirm />.
            We don&rsquo;t offer currency speculation <ToConfirm>TO CONFIRM with counsel</ToConfirm>.
          </p>
        ),
      },
      {
        value: "check-platform",
        title: "How do I check a platform?",
        content: (
          <p>
            Use RBI&rsquo;s Alert List. <A href="#rbi-alert">Link below</A>.
          </p>
        ),
      },
    ],
  },
];

export function Faq() {
  const tabs: DiscreteTab[] = GROUPS.map((g) => ({
    id: g.id,
    label: g.label,
    icon: g.icon,
    content: <Accordion items={g.items} defaultOpen={[g.items[0].value]} />,
  }));

  return (
    <Section id="faq" labelledBy="faq-title">
      <div className="mx-auto max-w-[820px]">
        <SectionHead
          id="faq-title"
          eyebrow="FAQ"
          title="Questions, grouped by worry"
          lede="Pick the worry that brought you here. Where we can't answer yet, we say so."
        />
        <Reveal delay={1}>
          <DiscreteTabs tabs={tabs} label="Question topics" labels="all" />
        </Reveal>
      </div>
    </Section>
  );
}
