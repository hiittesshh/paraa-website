// The "What could a bad year do to your money?" prototypes: two ways to present the same made-up scenarios
// (round 18h; the comparison chart and the money split were dropped after review). Change the default below,
// or switch on the page: in development a "Prototype" toggle shows above the calculator; on the live site add
// ?prototypes to the URL to see it. The pick is kept in ?badyear=<id>.
export const BAD_YEAR_PROTOTYPES = [
  { id: "tiles", label: "Tiles + step by step" },
  { id: "stepper", label: "One at a time" },
  { id: "guided", label: "Guided, 3 steps" },
  { id: "story", label: "Story" },
  { id: "basket", label: "3D basket" },
] as const;

/** The styles the owner switches between on the page (owner, 14 Nov 2026), in order. */
export const VISIBLE_PROTOTYPES = [
  { id: "story", label: "Story" },
  { id: "basket", label: "3D basket" },
  { id: "guided", label: "Guided" },
] as const;

export type BadYearPrototype = (typeof BAD_YEAR_PROTOTYPES)[number]["id"];

/** What visitors see unless a ?badyear= link says otherwise. */
export const BAD_YEAR_PROTOTYPE: BadYearPrototype = "story"; // owner, 14 Nov 2026

export const isBadYearPrototype = (value: unknown): value is BadYearPrototype =>
  BAD_YEAR_PROTOTYPES.some((p) => p.id === value);
