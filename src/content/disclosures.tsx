// The disclosure registry (spec §4.21, rulebook R15). Every disclaimer or limit sentence on the site
// renders from here and nowhere else, through <Disclosure id="…" /> (src/components/ui/disclosure.tsx).
// Text is word for word from the approved spec. Changing a sentence means a new id (bump the -vN),
// so a reviewer can see what changed and where it shows.
//
// Each entry returns inline content (text, <strong>, <abbr>), never a block element, so it can sit
// inside a <p>, a <span> or a <div>.
import type { ReactNode } from "react";
import { FIU_REG_NO } from "@/lib/links";

export type DisclosureContext = {
  /** The FIU-IND registration number, or null while unsupplied. */
  fiuRegNo: string | null;
};

export const DEFAULT_DISCLOSURE_CONTEXT: DisclosureContext = { fiuRegNo: FIU_REG_NO };

export type DisclosureId =
  | "global-risk-v3"
  | "fiu-registration-v1"
  | "asci-vda-v1"
  | "fiu-cell-v1"
  | "withdraw-cell-v1"
  | "risk-cell-v1"
  | "mock-caption-v1"
  | "basket-example-v1"
  | "rupee-both-v1"
  | "scenarios-v1"
  | "whatif-foot-v1"
  | "tax-foot-v1"
  | "ca-paid-v1"
  | "otp-v1"
  | "no-shortcut-v1"
  | "fiu-band-v1";

export const DISCLOSURES: Record<DisclosureId, (ctx: DisclosureContext) => ReactNode> = {
  // Footer (owner-protected, unchanged).
  "global-risk-v3": () => (
    <>
      <strong>Investing involves risk, including the loss of money you invest.</strong> The basket invests in US stocks,
      gold and crude oil through derivative contracts and is valued in US dollars, so changes in the rupee affect its value
      in both directions. Past performance doesn’t predict future results; examples on this site are for illustration
      only. Tax information is general; your CA will confirm your own. Your CA may be paid by Paraa Capital. Nothing on
      this site is personal investment advice.
    </>
  ),

  // Footer.
  "fiu-registration-v1": ({ fiuRegNo }) => (
    <>
      <strong>Paraa Capital is registered with FIU-IND{fiuRegNo ? ` (Reg. no. ${fiuRegNo})` : ""}.</strong> This
      registration is for anti-money-laundering reporting. It doesn’t mean any government body has approved or recommends
      this investment.
    </>
  ),

  // Footer only, verbatim (rulebook R14: ASCI's mandated wording).
  "asci-vda-v1": () => (
    <>
      Crypto products and NFTs are unregulated and can be highly risky. There may be no regulatory recourse for any loss
      from such transactions.
    </>
  ),

  // Hero facts row, cell 1.
  "fiu-cell-v1": () => <>For anti-money-laundering reporting. This isn’t approval of this investment.</>,

  // Hero facts row, cell 3 (v1.1, B1: the withdrawal claim carries its maturity limit).
  "withdraw-cell-v1": () => <>In rupees, to a bank account in your name, after your investment matures.</>,

  // Hero facts row, cell 2.
  "risk-cell-v1": () => <>You hold units of the basket, not the shares, gold or oil.</>,

  // Under every MockFrame.
  "mock-caption-v1": () => <>An illustration, not a screenshot of the app or a real account.</>,

  // Basket, beside the ExampleTag.
  "basket-example-v1": () => <>Example mix. These percentages are an example.</>,

  // What-if, the rupee slider's hint.
  "rupee-both-v1": () => <>A weaker rupee raises your investment’s rupee value. A stronger rupee lowers it.</>,

  // What-if, under the scenario chips.
  "scenarios-v1": () => <>Made-up scenarios on an example mix. Not a forecast, and not the basket’s past returns.</>,

  // What-if result footnote.
  "whatif-foot-v1": () => <>Example only, before fees and tax.</>,

  // Tax result footnote.
  "tax-foot-v1": () => (
    <>
      Estimate only. It assumes profit is taxed as business income at your slab, and leaves out surcharge and rebates. If
      the basket counts as a virtual digital asset, tax is a flat 30% plus cess, whatever your slab.
    </>
  ),

  // Ask a CA; FAQ "Who reads my question?".
  "ca-paid-v1": () => <>Your CA may be paid by us.</>,

  // Footer brand column.
  "otp-v1": () => <>We never ask you to share your OTP or PIN, or to pay into a personal account.</>,

  // How it works, under the money path.
  "no-shortcut-v1": () => (
    <>There’s no shortcut back. Money you add has to be invested, mature and be redeemed before you can withdraw it.</>
  ),

  // Security band row D; FAQ "Is Paraa registered with anyone?". The first FIU-IND in body text of each of those
  // sections, so it carries <abbr> plus the gloss in words (spec §3.2).
  "fiu-band-v1": () => (
    <>
      Paraa Capital is registered with <abbr title="Financial Intelligence Unit-India">FIU-IND</abbr> (Financial
      Intelligence Unit-India) for anti-money-laundering reporting. That means we must verify customers, keep records
      and report suspicious transactions. It isn’t approval of this investment, and no authority recommends it.
    </>
  ),
};
