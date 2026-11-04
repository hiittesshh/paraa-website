// What each part of the international basket is, and why it's there, in one short
// line each. Shared by the basket tiles and the calculator's colour dots. Weights
// live in lib/basket.
import type { SleeveId } from "@/lib/basket";

export interface SleeveInfo {
  /** Fill for the dot / bar. Ink, gold and grey: three tones from the design file. */
  swatch: string;
  /** The same dot on a dark Primary surface, where the ink swatch would vanish. */
  swatchOnInk: string;
  tag?: string;
  what: string;
  why: string;
}

export const SLEEVE_INFO: Record<SleeveId, SleeveInfo> = {
  us: {
    swatch: "bg-ink",
    swatchOnInk: "bg-primary-foreground",
    tag: "Tokenized",
    what: "Tokens (digital units) that track shares of large US companies.",
    why: "Moves with the share prices of those companies.",
  },
  gold: {
    swatch: "bg-secondary",
    swatchOnInk: "bg-secondary",
    what: "Tracks the global price of gold.",
    why: "Has often moved differently from shares, though not always.",
  },
  oil: {
    swatch: "bg-grey-400",
    swatchOnInk: "bg-grey-400",
    what: "Tracks the global price of crude oil.",
    why: "Moves with global supply and demand.",
  },
};
