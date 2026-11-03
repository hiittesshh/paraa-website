// What each part of the international basket is, why it's there and what can go wrong. Shared by
// the hero deck (short line) and the basket explorer (full panel), so the two never disagree.
// Weights live in lib/basket. Risk lines cite real, well-known market events; every one of them
// is about the asset, never about the basket's own history (there is none on this site).
import type { ReactNode } from "react";
import type { SleeveId } from "@/lib/basket";

export interface SleeveInfo {
  /** Fill for the dot / bar segment. Ink, gold and grey: three tones from the design file. */
  swatch: string;
  tag?: string;
  short: string;
  what: ReactNode;
  why: ReactNode;
  moves: ReactNode;
  risk: ReactNode;
}

export const SLEEVE_INFO: Record<SleeveId, SleeveInfo> = {
  us: {
    swatch: "bg-ink",
    tag: "Tokenized",
    short: "Large US companies. Moves with their earnings and US interest rates.",
    what: "Tokenized US stocks: digital tokens that track the share prices of large US companies.",
    why: "A share in the growth of the world's largest companies, which Indian markets don't offer.",
    moves: "Company earnings, US interest rates and the health of the US economy.",
    risk: "Stocks can fall hard and fast. The S&P 500, the main US index, fell about 19% in 2022.",
  },
  gold: {
    swatch: "bg-secondary",
    short: "Has tended to hold value when stocks fall, though not every time.",
    what: "Contracts that track the international price of gold, in US dollars.",
    why: "Gold has often held its value in years when stocks fell, so it can soften a bad year.",
    moves: "Interest rates, the strength of the dollar and how nervous investors are.",
    risk: "Gold can go years without rising. After its August 2020 high, it took until late 2023 to get back there.",
  },
  oil: {
    swatch: "bg-grey-400",
    short: "Moves with global supply, demand and conflict. The most volatile part.",
    what: "Contracts that track the price of crude oil, in US dollars.",
    why: "Oil tends to rise with inflation, and India imports most of the oil it uses.",
    moves: "Production decisions by oil-exporting countries, global demand, wars and shipping routes.",
    risk: "The most volatile of the three. In April 2020, one US oil futures contract briefly traded below zero.",
  },
};
