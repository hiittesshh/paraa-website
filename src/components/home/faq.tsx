// FAQ grouped by worry: DiscreteTabs (ARIA tabs) for the five worries, the shared accordion
// inside each panel. Round 3 content: the one international basket, money in and out, tax as
// Paraa states it, the CA, and safety. Every unanswered fact stays marked TO CONFIRM.
import type { ReactNode } from "react";
import Link from "next/link";
import { Coins, DoorOpen, Landmark, ShieldCheck, UserRound } from "lucide-react";
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

/** TO CONFIRM glued to its full stop, so the stop never wraps onto a line of its own. */
function Tc({ children }: { children?: ReactNode }) {
  return (
    <span className="whitespace-nowrap">
      <ToConfirm>{children}</ToConfirm>.
    </span>
  );
}

const GROUPS: { id: string; label: string; icon: ReactNode; items: AccordionEntry[] }[] = [
  {
    id: "basket",
    label: "The basket",
    icon: <Coins />,
    items: [
      {
        value: "own",
        title: "What exactly do I own?",
        content: (
          <p>
            Units of the basket. The basket holds derivative contracts that track US stocks, gold and crude oil, so you
            don&rsquo;t own the shares, the gold or the oil directly. Your units go up and down with them. See{" "}
            <A href="#basket">what&rsquo;s inside</A>.
          </p>
        ),
      },
      {
        value: "why-three",
        title: "Why these three together?",
        content: (
          <p>
            They tend to move for different reasons: company earnings, nervousness and interest rates, and global supply
            and demand. In 2022, for example, US stocks fell while oil rose. Holding all three doesn&rsquo;t stop the
            basket falling, but one bad market isn&rsquo;t the whole story. <A href="#what-if">Try a few years yourself</A>.
          </p>
        ),
      },
      {
        value: "price",
        title: "How is the price set?",
        content: (
          <p>
            Once a day. Each morning we publish the basket&rsquo;s NAV (the price of one unit) for the day before, in US
            dollars. Money you invest gets units at the next NAV.
          </p>
        ),
      },
      {
        value: "minimum",
        title: "What's the least I can invest?",
        content: (
          <p>
            US$100, about ₹8,800 at ₹88 to the dollar <Tc /> You can also invest every month.
          </p>
        ),
      },
    ],
  },
  {
    id: "money",
    label: "Money in and out",
    icon: <DoorOpen />,
    items: [
      {
        value: "in",
        title: "How do I put money in?",
        content: <p>In the app, in rupees, from a bank account in your own name. Once, or every month.</p>,
      },
      {
        value: "out",
        title: "When can I take it out?",
        content: (
          <p>
            When your lock-in ends. You can take out some or all of it then, but not before. How long the lock-in is:{" "}
            <Tc />
          </p>
        ),
      },
      {
        value: "how-long",
        title: "How long does a withdrawal take?",
        content: (
          <p>
            [N] working days to reach your bank <Tc /> It is paid in rupees, and only to a bank account in your name.
          </p>
        ),
      },
      {
        value: "missed",
        title: "What if a monthly payment fails?",
        content: (
          <p>
            That month is skipped and your plan carries on from the next one. We never charge two months at once to catch
            up.
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
        value: "invest-tax",
        title: "Do I pay tax when I invest?",
        content: <p>No. Putting money in and holding units create no tax.</p>,
      },
      {
        value: "profit-tax",
        title: "How is the profit taxed?",
        content: (
          <p>
            As business income from derivatives, at your own slab rate plus 4% cess, and filed on ITR-3. Your CA works out
            the figure and files it with you. <A href="#tax">How the tax works</A>.
          </p>
        ),
      },
      {
        value: "loss-tax",
        title: "What if I make a loss?",
        content: (
          <p>
            There&rsquo;s no tax on a loss, and it can be carried forward against future profits of the same kind, for 4
            or 8 years depending on how the income is classified. Your CA will confirm which applies to you.
          </p>
        ),
      },
    ],
  },
  {
    id: "ca",
    label: "Your CA",
    icon: <UserRound />,
    items: [
      {
        value: "real-ca",
        title: "Is my advisor really a chartered accountant?",
        content: (
          <p>
            Yes. Their ICAI membership number is shown in the app, so you can check it on the ICAI website yourself{" "}
            <Tc />
          </p>
        ),
      },
      {
        value: "ca-cost",
        title: "Does the CA cost extra?",
        content: (
          <p>
            Advice on the basket: <ToConfirm />. Filing your return: <Tc /> Your CA may be paid by us; ask them how, and
            they&rsquo;ll tell you.
          </p>
        ),
      },
      {
        value: "before-join",
        title: "Can I talk to a CA before I join?",
        content: (
          <p>
            Yes. <A href="#ask">Send your question</A> and a CA from our advisor desk will reply. It doesn&rsquo;t sign you
            up for anything.
          </p>
        ),
      },
    ],
  },
  {
    id: "safety",
    label: "Safety",
    icon: <ShieldCheck />,
    items: [
      {
        value: "who-holds",
        title: "Who holds the basket's assets?",
        content: (
          <p>
            [Custodian or venue] <Tc /> We&rsquo;ll name it here, with what happens if it fails.
          </p>
        ),
      },
      {
        value: "shut-down",
        title: "What if Paraa shuts down?",
        content: (
          <p>
            We will publish written closure commitments: when we would close the basket, and how you would get your money
            back <Tc />
          </p>
        ),
      },
      {
        value: "real-paraa",
        title: "How do I know I'm dealing with the real Paraa?",
        content: (
          <p>
            Use only the channels listed at the <A href="#official-channels">foot of this page</A>. We never ask for your OTP
            or PIN, and never ask you to pay a person or a personal UPI ID.
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
    <Section id="faq" tone="alt" labelledBy="faq-title">
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
