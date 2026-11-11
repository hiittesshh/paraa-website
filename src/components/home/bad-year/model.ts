// The shared state and maths behind both "bad year" prototypes (round 18g, 18h), so the presentations can't
// drift apart. Maths: lib/basket scenario() (tested, unchanged). The scenarios are made up and say so, never real
// years. Every prototype opens on "All three fall" (owner decision 3): ₹1,00,000 → ₹74,100 (−25.9%).
import { useState } from "react";
import { useLiveRegion } from "@/components/ui/tool-result";
import { NO_MOVES, PRESETS, SLEEVES, scenario, type Moves, type Preset, type SleeveId } from "@/lib/basket";
import { formatINR, formatPct } from "@/lib/format";

export const AMOUNTS = [
  { value: "50000", label: "₹50,000" },
  { value: "100000", label: "₹1 lakh" },
  { value: "500000", label: "₹5 lakh" },
  { value: "1000000", label: "₹10 lakh" },
] as const;

/** Each market's range in whole percent, either side of zero. */
export const RANGE: Record<SleeveId, number> = { us: 40, gold: 30, oil: 60 };
export const RUPEE_RANGE = 15;
/** What one press of − or + changes, in whole percent (round 18h). The presets are all on these steps. */
export const STEP: Record<SleeveId | "rupee", number> = { us: 5, gold: 5, oil: 5, rupee: 1 };
export const OWN = "own";

export type PartKey = SleeveId | "rupee";

const DEFAULT_PRESET = PRESETS.find((p) => p.id === "all-fall")!;

/** A preset's fractions as whole percentages. */
const pct = (fraction: number) => Math.round(fraction * 100);
const clamp = (v: number, limit: number) => Math.max(-limit, Math.min(limit, v));
const presetMoves = (p: Preset): Moves => ({ us: pct(p.moves.us), gold: pct(p.moves.gold), oil: pct(p.moves.oil) });

/** "No change" · "+10%" · "−25%" */
export const moveText = (v: number) => (v === 0 ? "No change" : formatPct(v / 100, { digits: 0 }));
/** "No change" · "5% weaker" (positive) · "5% stronger" (negative) */
export const rupeeText = (v: number) =>
  v === 0 ? "No change" : `${formatPct(Math.abs(v) / 100, { digits: 0, signed: false })} ${v > 0 ? "weaker" : "stronger"}`;

/** "US stocks −25%, gold −5%, crude oil −40% and the rupee 5% stronger, over one year." */
export function movesSentence(moves: Moves, rupee: number) {
  const parts = SLEEVES.filter((s) => moves[s.id] !== 0).map(
    (s, i) => `${i === 0 ? s.name : s.name.toLowerCase().replace("us ", "US ")} ${formatPct(moves[s.id] / 100, { digits: 0 })}`,
  );
  if (rupee !== 0) parts.push(`the rupee ${rupeeText(rupee)}`);
  if (parts.length === 0) return "No market moves.";
  const text = parts.length === 1 ? parts[0] : `${parts.slice(0, -1).join(", ")} and ${parts[parts.length - 1]}`;
  return `${text.charAt(0).toUpperCase()}${text.slice(1)}, over one year.`;
}

export type BadYear = ReturnType<typeof useBadYear>;

export function useBadYear() {
  const [amount, setAmount] = useState(1_00_000);
  const [moves, setMoves] = useState<Moves>(() => presetMoves(DEFAULT_PRESET)); // whole percent
  const [rupee, setRupeeValue] = useState(pct(DEFAULT_PRESET.rupee)); // whole percent; + = rupee weaker
  // The selected scenario: a preset's id, or OWN once the visitor sets the moves.
  const [selected, setSelected] = useState<string>(DEFAULT_PRESET.id);

  const r = scenario(amount, { us: moves.us / 100, gold: moves.gold / 100, oil: moves.oil / 100 }, rupee / 100);
  const preset = PRESETS.find((p) => p.id === selected);
  const value = formatINR(r.inrValue);
  const change = formatPct(r.inrChange);
  const scenarioLine = preset ? `Made-up scenario: ${preset.label}` : "Your own scenario";

  const sentence = movesSentence(moves, rupee);
  // In "Your own" the moves are spoken too: the − and + buttons don't say the new value themselves.
  const live = useLiveRegion(
    `${scenarioLine}${preset ? "" : `: ${sentence.replace(/\.$/, "")}`}. ${formatINR(amount)} would become ${value} after one year, ${change}. Example only.`,
  );

  /** Pick a preset (its moves are applied), or OWN (the current moves stay, ready to adjust). */
  function choose(id: string) {
    setSelected(id);
    const p = PRESETS.find((x) => x.id === id);
    if (!p) return;
    setMoves(presetMoves(p));
    setRupeeValue(pct(p.rupee));
  }

  function moveSleeve(id: SleeveId, v: number) {
    setMoves((m) => ({ ...m, [id]: v }));
    setSelected(OWN);
  }

  function setRupee(v: number) {
    setRupeeValue(v);
    setSelected(OWN);
  }

  function reset() {
    live.announceNextNow();
    setMoves(NO_MOVES);
    setRupeeValue(0);
    setSelected(OWN);
  }

  /** One press of − (dir −1) or +: lower or raise a market's move by its step, within its range. For the rupee,
   *  − makes it stronger (less money for you) and + weaker, so − always means less and + more. */
  function nudge(key: PartKey, dir: 1 | -1) {
    if (key === "rupee") setRupee(clamp(rupee + dir * STEP.rupee, RUPEE_RANGE));
    else moveSleeve(key, clamp(moves[key] + dir * STEP[key], RANGE[key]));
  }

  /** Every preset with its own result on the chosen amount (for the tiles and the stepper). */
  const presets = PRESETS.map((p) => {
    const out = scenario(amount, p.moves, p.rupee);
    return { id: p.id, label: p.label, note: p.note, change: out.inrChange, value: out.inrValue };
  });

  /**
   * The year step by step (round 18h), in the order the maths runs: each market moves its own share of the
   * money (US stocks 50%, gold 30%, oil 20% on the example mix), then the rupee moves everything that's left,
   * because it's all held in dollars. `base` is the money the move acts on, `amount` what it adds or takes away,
   * `from`/`to` what you have before and after. The rupee figures are rounded from the rounded totals, so every
   * row adds up on screen and the last `to` is the answer.
   */
  const raw = [
    ...SLEEVES.map((s) => ({
      key: s.id as PartKey,
      label: s.name,
      value: moves[s.id],
      move: moveText(moves[s.id]),
      base: amount * s.weight,
      baseNote: `${formatINR(amount * s.weight)} of your money`,
      atLimit: { low: moves[s.id] <= -RANGE[s.id], high: moves[s.id] >= RANGE[s.id] },
      delta: amount * r.contributions[s.id],
    })),
    {
      key: "rupee" as PartKey,
      label: "Rupee",
      value: rupee,
      move: rupeeText(rupee),
      base: amount * (1 + r.basketUsd),
      baseNote: `All ${formatINR(Math.round(amount * (1 + r.basketUsd)))} is held in dollars`,
      atLimit: { low: rupee <= -RUPEE_RANGE, high: rupee >= RUPEE_RANGE },
      delta: amount * r.rupeeEffect,
    },
  ];
  const parts = raw.reduce<((typeof raw)[number] & { exact: number; from: number; to: number; amount: number })[]>(
    (acc, p) => {
      const prev = acc[acc.length - 1];
      const exact = (prev ? prev.exact : amount) + p.delta;
      const from = prev ? prev.to : Math.round(amount);
      const to = Math.round(exact);
      return [...acc, { ...p, exact, from, to, amount: to - from }];
    },
    [],
  );

  return {
    amount,
    setAmount,
    moves,
    rupee,
    selected,
    choose,
    moveSleeve,
    setRupee,
    nudge,
    reset,
    r,
    value,
    change,
    scenarioLine,
    live,
    presets,
    parts,
    sentence,
  };
}
