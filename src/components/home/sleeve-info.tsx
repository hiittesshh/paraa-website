// What each part of the international basket is, why it's there and its main risk, in one short
// line each. Shared by the hero deck and the basket cards, so the two never disagree. Weights
// live in lib/basket. Risk lines cite real, well-known market events about the asset itself.
import type { SleeveId } from "@/lib/basket";

export interface SleeveInfo {
  /** Fill for the dot / bar. Ink, gold and grey: three tones from the design file. */
  swatch: string;
  /** The same dot on a dark Primary surface, where the ink swatch would vanish. */
  swatchOnInk: string;
  tag?: string;
  short: string;
  what: string;
  why: string;
  risk: string;
}

export const SLEEVE_INFO: Record<SleeveId, SleeveInfo> = {
  us: {
    swatch: "bg-ink",
    swatchOnInk: "bg-primary-foreground",
    tag: "Tokenized",
    short: "Shares of large US companies, as tokens.",
    what: "Tokens that track shares of large US companies.",
    why: "Growth from the world's biggest companies.",
    risk: "Stocks can fall sharply. The S&P 500 fell about 19% in 2022.",
  },
  gold: {
    swatch: "bg-secondary",
    swatchOnInk: "bg-secondary",
    short: "Tends to hold its value when stocks fall.",
    what: "Tracks the global price of gold.",
    why: "Often steady when markets are nervous.",
    risk: "Can stay flat for years, as it did from 2020 to 2023.",
  },
  oil: {
    swatch: "bg-grey-400",
    swatchOnInk: "bg-grey-400",
    short: "Moves with global supply and demand.",
    what: "Tracks the global price of crude oil.",
    why: "Tends to rise with inflation.",
    risk: "The most volatile of the three. Prices can swing hard in weeks.",
  },
};
