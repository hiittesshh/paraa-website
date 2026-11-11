// The "What could a bad year do to your money?" prototypes: two ways to present the same made-up scenarios
// (round 18h; the comparison chart and the money split were dropped after review). Change the default below,
// or switch on the page: in development a "Prototype" toggle shows above the calculator; on the live site add
// ?prototypes to the URL to see it. The pick is kept in ?badyear=<id>.
export const BAD_YEAR_PROTOTYPES = [
  { id: "tiles", label: "Tiles + step by step" },
  { id: "stepper", label: "One at a time" },
] as const;

export type BadYearPrototype = (typeof BAD_YEAR_PROTOTYPES)[number]["id"];

/** What visitors see unless a ?badyear= link says otherwise. */
export const BAD_YEAR_PROTOTYPE: BadYearPrototype = "tiles";

export const isBadYearPrototype = (value: unknown): value is BadYearPrototype =>
  BAD_YEAR_PROTOTYPES.some((p) => p.id === value);
