// The parts of a tool result, shared by the calculators (round 18e). Imported only by client components, so it
// runs on the client without its own directive.
//
// - ResultReadout: the 48px line stuck under the header below 1024. It always starts with its honesty word
//   ("Example result:" / "Estimate:"), and is aria-hidden: the live region speaks.
// - SplitBar: what you keep beside the tax.
// - useLiveRegion: one polite, atomic announcement per gesture.
import { useCallback, useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** A focusable control inside the tool card sits below the sticky header and readout when scrolled to. */
export const CONTROL_SCROLL_MARGIN = "scroll-mt-[calc(var(--header-h)+var(--readout-h)+1rem)]";

/* ── ResultReadout ── */

/** The first child of the tool card (Panel): its negative margins make it flush with the card's top and sides. */
export function ResultReadout({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      aria-hidden
      className={cn(
        "num top-header z-10 -mx-5 -mt-5 mb-5 flex h-readout items-center gap-2 rounded-t-2xl border-b bg-card px-5 text-body-md tall:sticky sm:-mx-8 sm:-mt-8 sm:mb-8 sm:px-8 lg:hidden",
        className,
      )}
    >
      <span>{children}</span>
    </p>
  );
}

/* ── SplitBar ── */

/** Profit split into what you keep (ink) and the tax (grey). The figures carry the meaning. */
export function SplitBar({ keep, tax, className }: { keep: number; tax: number; className?: string }) {
  return (
    <div aria-hidden className={cn("flex h-3 gap-0.5 overflow-hidden rounded-xs", className)}>
      <span className="bg-foreground" style={{ flexGrow: keep }} />
      {tax > 0 && <span className="bg-border-strong" style={{ flexGrow: tax }} />}
    </div>
  );
}

/* ── LiveRegion ── */

const DEBOUNCE_MS = 400;

/**
 * The tool's one polite, atomic live region. The text is announced 400ms after the last change; `flush`
 * (wire it to pointerup and keyup on the tool card) announces a pending change at once, so a drag or a
 * key press gives one announcement. `announceNextNow` makes the next change immediate (Reset).
 *
 * The region starts empty, so nothing is announced on load, and it's written directly (not through
 * React state), so a slider drag doesn't re-render it.
 */
export function useLiveRegion(text: string) {
  const regionRef = useRef<HTMLParagraphElement>(null);
  const latest = useRef(text);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const pending = useRef(false);
  const urgent = useRef(false);

  const flush = useCallback(() => {
    if (!pending.current) return;
    pending.current = false;
    clearTimeout(timer.current);
    if (regionRef.current) regionRef.current.textContent = latest.current;
  }, []);

  useEffect(() => {
    if (text === latest.current) return;
    latest.current = text;
    pending.current = true;
    clearTimeout(timer.current);
    if (urgent.current) {
      urgent.current = false;
      flush();
    } else {
      timer.current = setTimeout(flush, DEBOUNCE_MS);
    }
  }, [text, flush]);

  useEffect(() => () => clearTimeout(timer.current), []);

  const announceNextNow = useCallback(() => {
    urgent.current = true;
  }, []);

  const region = <p ref={regionRef} className="sr-only" aria-live="polite" aria-atomic="true" />;
  return { region, flush, announceNextNow };
}
