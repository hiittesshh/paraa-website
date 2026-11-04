// "Our rules, in plain words": light cards on the dark page, each with a small piece of the
// product in it, like Mercury's and Plaid's feature cards. Only what we can state today. Partners,
// custody and audits join this grid once those facts are confirmed (proposal section 9).
import type { ReactNode } from "react";
import { BadgeIndianRupee, Check, MessageSquareWarning, X } from "lucide-react";
import { RevealGroup, RevealItem, Section, SectionHead } from "@/components/paraa/primitives";
import { FIU_REG_NO } from "@/lib/links";
import { cn } from "@/lib/utils";

const miniCard = "rounded-lg border bg-card p-4 shadow-card";

const Row = ({ left, right }: { left: string; right: ReactNode }) => (
  <div className="flex items-center justify-between gap-3 border-t py-2 text-body-md first:border-t-0">
    <span className="text-muted-foreground">{left}</span>
    <span className="font-semibold num">{right}</span>
  </div>
);

const CARDS: { key: string; title: string; body: string; wide?: boolean; art: ReactNode }[] = [
  {
    key: "own",
    title: "Withdrawals go only to you",
    body: "In rupees, to a bank account in your name, after your investment matures.",
    wide: true,
    art: (
      <div className={cn(miniCard, "w-full max-w-sm")}>
        <div className="mb-2 flex items-center justify-between">
          <span className="font-bold">Withdraw to</span>
          <span className="rounded-full border border-ink px-2 text-body-md font-semibold">Example</span>
        </div>
        <Row left="Your bank account" right="••4821" />
        <Row
          left="Name matches yours"
          right={
            <span className="grid size-6 place-items-center rounded-full bg-secondary text-ink">
              <Check aria-hidden className="size-4" />
            </span>
          }
        />
        <Row
          left="Someone else's account"
          right={
            <span className="grid size-6 place-items-center rounded-full bg-muted text-ink">
              <X aria-hidden className="size-4" />
            </span>
          }
        />
      </div>
    ),
  },
  {
    key: "otp",
    title: "We never ask for your OTP or PIN by call or message",
    body: "Don't share them with anyone. We also never ask for payment to a personal account. Anyone who does isn't us.",
    wide: true,
    art: (
      <div className="w-full max-w-sm space-y-2">
        <div className={cn(miniCard, "flex items-center gap-3 rounded-bl-sm")}>
          <MessageSquareWarning aria-hidden className="size-5 shrink-0 text-ink" />
          <span className="text-body-md">&ldquo;Share your OTP to verify your account.&rdquo;</span>
        </div>
        <div className="ml-10 rounded-lg rounded-br-sm bg-ink px-4 py-3 text-body-md font-semibold text-white">
          That&rsquo;s not Paraa. Don&rsquo;t share it.
        </div>
      </div>
    ),
  },
  {
    key: "fiu",
    title: "Registered with FIU-IND",
    body: `For anti-money-laundering reporting${FIU_REG_NO ? `, no. ${FIU_REG_NO}` : ""}. It isn't approval of this investment.`,
    art: (
      <div className={cn(miniCard, "w-full max-w-60")}>
        <p className="text-body-md text-muted-foreground">Registered with</p>
        <p className="type-h6">FIU-IND</p>
        <p className="mt-2 border-t pt-2 text-body-md text-muted-foreground">Anti-money-laundering reporting</p>
      </div>
    ),
  },
  {
    key: "ca",
    title: "A CA you can ask",
    body: "Ask before you decide. Your CA may be paid by us.",
    art: (
      <div className={cn(miniCard, "flex w-full max-w-60 items-center gap-3")}>
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-secondary text-body-md font-bold text-ink">CA</span>
        <span className="text-body-md font-semibold">A chartered accountant</span>
      </div>
    ),
  },
  {
    key: "price",
    title: "One price a day",
    body: "Each unit has one price, updated daily. Weekends and holidays keep the last price. Money you invest buys units at the next price.",
    art: (
      <div className={cn(miniCard, "flex w-full max-w-60 items-center gap-3")}>
        <BadgeIndianRupee aria-hidden className="size-6 shrink-0 text-ink" />
        <span className="text-body-md font-semibold">You add and withdraw in rupees</span>
      </div>
    ),
  },
];

export function Trust() {
  return (
    <Section id="trust" labelledBy="trust-title">
      <SectionHead
        id="trust-title"
        title="Our rules, in plain words"
        lede="Know what to expect, and what to refuse."
      />
      <RevealGroup as="ul" className="grid gap-3 md:grid-cols-6">
        {CARDS.map((c) => (
          <RevealItem as="li" key={c.key} className={cn("flex", c.wide ? "md:col-span-3" : "md:col-span-2")}>
            <article className="surface-light flex w-full flex-col overflow-hidden rounded-xl">
              <div className="flex min-h-52 flex-1 items-center justify-center bg-[linear-gradient(160deg,var(--color-gold-50),var(--color-grey-100))] p-6">
                {c.art}
              </div>
              <div className="p-6">
                <h3 className="type-h6">{c.title}</h3>
                <p className="mt-1 text-body-md text-muted-foreground">{c.body}</p>
              </div>
            </article>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
