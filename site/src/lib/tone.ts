// Shared by server and client components, so it must not live in a "use client" file.

/** Colour follows the sign, but the sign (+ / −) is always in the text too. */
export function signTone(v: number | null | undefined) {
  if (v == null || v === 0) return "text-foreground";
  return v > 0 ? "text-positive" : "text-negative";
}
