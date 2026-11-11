// What each part of the international basket is, and why it's there, in one short line each (spec §6.3).
// Shared by the basket section and the what-if breakdown. Weights and names live in lib/basket.ts; each
// sleeve's colour is its data role, drawn by <Swatch sleeve={id} /> and <AllocationBar> in
// components/ui/allocation-bar.tsx (the only file that names the data colours, QA A17).
import type { SleeveId } from "@/lib/basket";

export interface SleeveInfo {
  what: string;
  why: string;
}

export const SLEEVE_INFO: Record<SleeveId, SleeveInfo> = {
  us: {
    what: "Tokens (digital units) that track shares of large US companies.",
    why: "Moves with the share prices of those companies.",
  },
  gold: {
    what: "Tracks the global price of gold.",
    why: "Has often moved differently from shares, though not always.",
  },
  oil: {
    what: "Tracks the global price of crude oil.",
    why: "Moves with global supply and demand.",
  },
};
