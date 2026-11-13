// Hero B ("Dark premium"), chosen by the owner on 12 Nov 2026 from the v2 prototype's three options, set on top of
// the round-18 site. A full-bleed ink hero: the headline and its limit line on the left, an illustrated Invest
// screen with one floating basket card on the right, and the four facts along its lower edge (so no second ink
// block stacks under it). The h1 is static (it's the LCP element); only the illustration makes its CSS entrance.
//
// The illustration is decorative and inert (aria-hidden); the page's text carries every fact. One Example tag
// covers the phone and the card together. Gold appears only as the gold share of the basket (the v2 rule).
import { ArrowDownLeft, CalendarClock, Check, ChevronRight, CirclePlus, CircleUser, Clock, House, Landmark, Layers, MessageCircle, ShieldCheck, type LucideIcon } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Disclosure } from "@/components/ui/disclosure";
import type { DisclosureId } from "@/content/disclosures";
import { formatINR } from "@/lib/format";
import { CTA } from "@/lib/nav";
import { HeroPhoneFigure } from "./hero-phone";
import "./hero-b.css";

// The owner's hero basket (12 Nov, OD-6): 50 US funds, 20 crude oil, 30 gold. Still an example until the line-up
// is confirmed, so it carries the Example tag.
const BASKET = {
  name: "International",
  mix: [
    { kind: "us", label: "US funds", share: 0.5 },
    { kind: "oil", label: "Crude oil", share: 0.2 },
    { kind: "gold", label: "Gold", share: 0.3 },
  ],
} as const;

const AMOUNT = 10_000;
const pct = (share: number) => `${(share * 100).toFixed(1)}%`;

// The four facts, each linking to the section of this page that holds its detail.
const FACTS: readonly { claim: string; limit: DisclosureId; cue: string; href: string; Icon: LucideIcon }[] = [
  { claim: "You hold units, not the funds, gold or oil.", limit: "hold-units-cell-v1", cue: "What you’re buying", href: "#basket", Icon: Layers },
  { claim: "Priced once a day, in US dollars.", limit: "rupee-both-v1", cue: "How the rupee affects it", href: "#faq-rupee", Icon: CalendarClock },
  { claim: "Withdrawals go only to you.", limit: "withdraw-cell-v1", cue: "How money comes out", href: "#security-withdrawals", Icon: Landmark },
  { claim: "We never ask for your OTP or PIN.", limit: "otp-cell-v1", cue: "How to spot a fake", href: "#security-fakes", Icon: ShieldCheck },
];

function Bar({ className }: { className?: string }) {
  return (
    <span className={`hb-bar ${className ?? ""}`}>
      {BASKET.mix.map((m) => (
        <span key={m.kind} data-kind={m.kind} style={{ flexGrow: m.share }} />
      ))}
    </span>
  );
}

// The phone's main screens (owner, 13 Nov 2026: "some main screens, not a single flow of investment"): Home, the
// basket, Invest and Account, each with the tab bar lit on its tab. Beside the phone, the floating card changes with
// the screen. Every figure is an example: the Example tag is on each card, and on the phone's top bar below 600px.
type Tab = "home" | "basket" | "invest" | "account";
const TABS: readonly { id: Tab; label: string; Icon: LucideIcon }[] = [
  { id: "home", label: "Home", Icon: House },
  { id: "basket", label: "Baskets", Icon: Layers },
  { id: "invest", label: "Invest", Icon: CirclePlus },
  { id: "account", label: "Account", Icon: CircleUser },
];

function Screen({ tab, title, children }: { tab: Tab; title: string; children: React.ReactNode }) {
  return (
    <div className="hb-app">
      <div className="hb-body">
        <div className="hb-top">
          <span className="hb-title hb-title-left">{title}</span>
          <span className="hb-tag hb-tag-phone">Example</span>
        </div>
        {children}
      </div>
      <nav className="hb-tabs">
        {TABS.map(({ id, label, Icon }) => (
          <span key={id} data-on={id === tab ? "" : undefined}>
            <Icon />
            {label}
          </span>
        ))}
      </nav>
    </div>
  );
}

function Rows({ rows }: { rows: readonly (readonly [string, string])[] }) {
  return (
    <dl className="hb-rows">
      {rows.map(([k, v]) => (
        <div key={k}>
          <dt>{k}</dt>
          <dd>{v}</dd>
        </div>
      ))}
    </dl>
  );
}

const SCREENS = [
  // Home: the wallet and what you hold.
  <Screen key="home" tab="home" title="Home">
    <div className="hb-hero-card">
      <span className="hb-label hb-label-on-ink">Paraa wallet</span>
      <span className="hb-figure">{formatINR(25_000)}</span>
      <span className="hb-duo">
        <span data-on="">Add money</span>
        <span>Withdraw</span>
      </span>
    </div>
    <span className="hb-label hb-section">Your investments</span>
    <div className="hb-holding">
      <span className="hb-holding-head">
        <b>{BASKET.name}</b>
        <span>{formatINR(AMOUNT)} invested</span>
      </span>
      <Bar className="hb-bar-phone" />
      <span className="hb-meta">Priced once a day, in US dollars</span>
    </div>
    <div className="hb-ask">
      <span className="hb-ask-icon">
        <MessageCircle />
      </span>
      <span className="hb-event-text">
        <b>Questions about tax?</b>
        <span>Ask a chartered accountant</span>
      </span>
      <ChevronRight className="hb-ask-go" />
    </div>
  </Screen>,
  // The basket: its mix and how it's priced.
  <Screen key="basket" tab="basket" title={BASKET.name}>
    <span className="hb-meta hb-meta-top">US funds, gold and crude oil</span>
    <div className="hb-ring">
      <svg viewBox="0 0 42 42" aria-hidden>
        <circle cx="21" cy="21" r="15.9" className="hb-ring-us" strokeDasharray="50 50" strokeDashoffset="25" />
        <circle cx="21" cy="21" r="15.9" className="hb-ring-oil" strokeDasharray="20 80" strokeDashoffset="-25" />
        <circle cx="21" cy="21" r="15.9" className="hb-ring-gold" strokeDasharray="30 70" strokeDashoffset="-45" />
      </svg>
      <span className="hb-ring-mid">
        <b>3</b>
        <span>markets</span>
      </span>
    </div>
    <ul className="hb-legend hb-legend-phone">
      {BASKET.mix.map((m) => (
        <li key={m.kind}>
          <span data-kind={m.kind}>{m.label}</span>
          <span>{pct(m.share)}</span>
        </li>
      ))}
    </ul>
    <Rows rows={[["Priced", "Once a day, in US$"], ["You hold", "Units of the basket"]]} />
  </Screen>,
  // Invest: the amount, from the wallet.
  <Screen key="invest" tab="invest" title="Invest">
    <div className="hb-card">
      <span className="hb-label">Basket</span>
      <span className="hb-name">
        {BASKET.name}
        <ChevronRight />
      </span>
      <Bar className="hb-bar-phone" />
    </div>
    <div className="hb-amount">
      <span className="hb-label">Amount</span>
      <span className="hb-figure">{formatINR(AMOUNT)}</span>
    </div>
    <div className="hb-quick">
      <span>{formatINR(5_000)}</span>
      <span data-on="">{formatINR(AMOUNT)}</span>
      <span>{formatINR(25_000)}</span>
    </div>
    <Rows rows={[["Pay from", "Paraa wallet"], ["Units at", "Next daily price"]]} />
    <span className="hb-button">Invest {formatINR(AMOUNT)}</span>
  </Screen>,
  // Account: who you are, and where money can go.
  <Screen key="account" tab="account" title="Account">
    <div className="hb-check-list">
      {["PAN", "Aadhaar through DigiLocker", "Face scan"].map((k) => (
        <span key={k} className="hb-check-row">
          <span className="hb-check-mark">
            <Check />
          </span>
          {k}
          <span className="hb-pill">Verified</span>
        </span>
      ))}
    </div>
    <span className="hb-label hb-section">Withdrawals go to</span>
    <div className="hb-event hb-event-card">
      <span className="hb-event-icon">
        <Landmark />
      </span>
      <span className="hb-event-text">
        <b>Bank ••4821</b>
        <span>In your name</span>
      </span>
    </div>
    <div className="hb-menu">
      {["Statements", "Ask a CA", "Help"].map((k) => (
        <span key={k}>
          {k}
          <ChevronRight />
        </span>
      ))}
    </div>
  </Screen>,
];

// The floating card beside the phone, one per screen.
function Float({ children, wide = false }: { children: React.ReactNode; wide?: boolean }) {
  return (
    <div className={`hb-float-card ${wide ? "hb-float-wide" : ""}`}>
      <span className="hb-tag">Example</span>
      {children}
    </div>
  );
}

const FLOATS = [
  <Float key="home">
    <p className="hb-float-name">Money added</p>
    <div className="hb-event">
      <span className="hb-event-icon">
        <ArrowDownLeft />
      </span>
      <span className="hb-event-text">
        <b>{formatINR(25_000)}</b>
        <span>By UPI</span>
      </span>
      <span className="hb-pill">Verified</span>
    </div>
  </Float>,
  <Float key="basket">
    <p className="hb-float-name">{BASKET.name}</p>
    <Bar className="hb-bar-slim" />
    <ul className="hb-legend">
      {BASKET.mix.map((m) => (
        <li key={m.kind}>
          <span data-kind={m.kind}>{m.label}</span>
          <span>{pct(m.share)}</span>
        </li>
      ))}
    </ul>
  </Float>,
  <Float key="invest">
    <p className="hb-float-name">Order placed</p>
    <div className="hb-steps-mini">
      <span data-done="">
        <Check /> {formatINR(AMOUNT)} from your wallet
      </span>
      <span data-wait="">
        <Clock /> Units at the next daily price
      </span>
    </div>
  </Float>,
  <Float key="account">
    <span className="hb-float-shield">
      <ShieldCheck />
    </span>
    <p className="hb-float-name">We never ask for your OTP or PIN</p>
    <p className="hb-float-sub">Nor to pay into a personal account.</p>
  </Float>,
];

export function HeroB() {
  return (
    <section id="top" aria-labelledby="hero-title" className="hb-hero hb-beige">
      {/* The ground: a gold glow and faint rings behind the illustration, a vignette at the edges (hero-b.css). */}
      <span className="hb-ground" aria-hidden />
      <div className="container-page hb-split">
        <div>
          <h1 id="hero-title" tabIndex={-1} className="hb-display">
            Baskets of US funds, gold and crude oil, <span className="hb-display-soft">for residents of India</span>
          </h1>
          <p className="hb-lede">
            Each basket is a different mix of them. You add money and withdraw in rupees, and each unit is priced once a day.
          </p>
          <div className="hb-actions">
            <ButtonLink variant="primary" size="lg" href={CTA.href} className="hb-cta">
              {CTA.label}
            </ButtonLink>
            <a href="#basket" className="hb-text-link">
              See the baskets
            </a>
          </div>
          <p className="hb-small">Ask about tax or how it works. You don’t need an account.</p>
        </div>

        <HeroPhoneFigure
          screens={SCREENS}
          floats={FLOATS}
          caption={<Disclosure id="mock-caption-v1" as="span" />}
        />
      </div>

      <div className="container-page hb-facts-wrap">
        <h2 className="sr-only">Before you start</h2>
        <ul className="hb-facts">
          {FACTS.map(({ claim, limit, cue, href, Icon }) => (
            <li key={href}>
              <a href={href} className="hb-fact">
                <span className="hb-fact-icon">
                  <Icon aria-hidden />
                </span>
                <span className="hb-claim">{claim}</span>
                <Disclosure id={limit} as="span" className="hb-limit-text" />
                <span className="hb-cue">{cue}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
