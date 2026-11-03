"use client";

// A rupee amount that rolls to its new value with NumberFlow. NumberFlow is hidden from screen
// readers and an sr-only formatINR() twin is read instead, so what is announced is always the
// site's own formatted string (half-up rounding, Indian grouping, U+2212 minus).
import NumberFlow from "@number-flow/react";
import { formatINR, roundHalfUp } from "@/lib/format";

const INR_FORMAT = { style: "currency", currency: "INR", maximumFractionDigits: 0, minimumFractionDigits: 0 } as const;

export function Money({ value, signed = false, className }: { value: number; signed?: boolean; className?: string }) {
  const v = roundHalfUp(value);
  return (
    <span className={className}>
      <span className="sr-only">{formatINR(v, { signed })}</span>
      <NumberFlow
        aria-hidden
        value={v}
        locales="en-IN"
        format={{ ...INR_FORMAT, signDisplay: signed ? "exceptZero" : "auto" }}
      />
    </span>
  );
}
