"use client";

// Anchors, hashes and focus (spec §5.3). Renders nothing; mount it once, after </main>.
//
//   • An in-page link click (/#x or #x): HashHandler takes the click, updates the URL, scrolls (landing
//     under the header through scroll-padding-top) and moves focus to the target's heading without
//     scrolling again: a section's h2 (the h1 for #top), a band row's h3, an FAQ item's summary. Headings
//     take focus from script only (tabIndex -1, no ring). The scroll is smooth only when the target is
//     within two viewport heights; a longer jump is instant, and reduced motion is always instant (v1.4).
//   • A cold load with a section hash (/#ask, /#numbers, …) scrolls there and focuses its heading.
//   • #what-if / #tax (load, hashchange or click): select that tab, scroll to #numbers, focus the
//     selected panel's h3. The tab is selected by activating it, so ToolsTabs stays the owner of its
//     state (and of the replaceState on tab change).
//   • #faq-<slug>: open that item, scroll to it, focus its summary.
//   • Old hashes: #tour → #top (focus the h1); #trust → #security.
//   • #ask from any CTA lands on the Ask section's h2, never on a field.
//   • #ask-form is left alone: the form owns focus there (its Alert, first error or confirmation).
//
// With JS off, native anchor jumps still work; tabs, FAQ opening and focus moves don't.
import { useEffect } from "react";

type Mode = "load" | "hashchange" | "click";

const TAB_HASHES = new Set(["what-if", "tax"]);
const RENAMED: Record<string, string> = { tour: "top", trust: "security" };
const LEFT_TO_THE_PAGE = new Set(["ask-form"]);
const NATIVELY_FOCUSABLE = "a[href], button, input, select, textarea, summary";

/** The element that takes focus for a jump to `target`. */
function focusTargetFor(target: HTMLElement): HTMLElement | null {
  if (target instanceof HTMLDetailsElement) return target.querySelector<HTMLElement>(":scope > summary");
  if (target.matches("h1, h2, h3, h4, summary, main")) return target;
  const labelledBy = target.getAttribute("aria-labelledby")?.split(/\s+/)[0];
  const label = labelledBy ? document.getElementById(labelledBy) : null;
  return label ?? target.querySelector<HTMLElement>("h1, h2, h3");
}

function moveFocus(el: HTMLElement | null) {
  if (!el) return;
  // Targets are built with tabIndex -1; this only guards a heading that was missed.
  if (!el.hasAttribute("tabindex") && !el.matches(NATIVELY_FOCUSABLE)) el.setAttribute("tabindex", "-1");
  el.focus({ preventScroll: true });
}

/**
 * Smooth only for a click to a target within two viewport heights; instant for a longer jump, on load or
 * hashchange (the browser has already moved), and always under reduced motion. Every scroll here names its
 * behaviour explicitly (spec §5.3).
 */
function behaviorFor(distance: number, mode: Mode): ScrollBehavior {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return mode === "click" && !reduced && Math.abs(distance) <= 2 * window.innerHeight ? "smooth" : "instant";
}

function scrollToTarget(el: HTMLElement, mode: Mode) {
  if (el.id === "top") {
    window.scrollTo({ top: 0, behavior: behaviorFor(window.scrollY, mode) });
    return;
  }
  el.scrollIntoView({ block: "start", behavior: behaviorFor(el.getBoundingClientRect().top, mode) });
}

function idFromHash(hash: string) {
  try {
    return decodeURIComponent(hash.replace(/^#/, ""));
  } catch {
    return hash.replace(/^#/, "");
  }
}

export function HashHandler() {
  useEffect(() => {
    let disposed = false;
    const frames = new Set<number>();

    const nextFrame = (fn: () => void) => {
      const frame = requestAnimationFrame(() => {
        frames.delete(frame);
        if (!disposed) fn();
      });
      frames.add(frame);
    };

    /**
     * Run `fn` once the page has stopped scrolling (three still frames, or about 1.5s at most). On load and
     * on hashchange this lets the browser's own jump and any late layout (fonts, hydration) settle before
     * the final scroll and focus.
     */
    const afterScrollSettles = (fn: () => void) => {
      let last = Number.NaN;
      let still = 0;
      let waited = 0;
      const tick = () => {
        const y = window.scrollY;
        still = y === last ? still + 1 : 0;
        last = y;
        if (still >= 3 || ++waited > 90) fn();
        else nextFrame(tick);
      };
      nextFrame(tick);
    };

    /** Select the tab that controls `panel`, retrying while the tools hydrate (about 2s at most). */
    const selectTab = (panel: HTMLElement, done: () => void) => {
      let tries = 0;
      const attempt = () => {
        if (!panel.hidden && !panel.hasAttribute("inert")) return done();
        if (tries++ > 120) return; // Not hydrated in time: leave the page as it is.
        if (tries % 6 === 1) {
          const tabId = panel.getAttribute("aria-labelledby");
          let tab = tabId ? document.getElementById(tabId) : null;
          if (tab?.getAttribute("role") !== "tab") {
            // Fall back to position: the nth panel belongs to the nth tab.
            const index = Array.from(document.querySelectorAll("[data-tools-panel]")).indexOf(panel);
            tab = document.querySelectorAll<HTMLElement>("[data-tools-tablist] [role='tab']")[index] ?? null;
          }
          tab?.click();
        }
        nextFrame(attempt);
      };
      attempt();
    };

    /** The target element for a hash, or null when there's none or the page owns it. */
    const targetFor = (rawId: string) => {
      if (LEFT_TO_THE_PAGE.has(rawId)) return null;
      return document.getElementById(RENAMED[rawId] ?? rawId);
    };

    /**
     * Jump to `rawId`: URL, scroll, focus. Returns false when there's nothing to do here. A click pushes a
     * history entry; a load or hashchange only rewrites an old hash.
     */
    const jump = (rawId: string, mode: Mode): boolean => {
      const target = targetFor(rawId);
      if (!target) return false;
      const renamed = RENAMED[rawId];
      const id = target.id;
      const isTab = TAB_HASHES.has(id);

      // On load the browser has already jumped. Only old hashes, tabs, FAQ items and sections need more
      // (the section's heading takes focus, v1.4); a row heading such as #security-otp keeps the native jump.
      if (mode === "load" && !renamed && !isTab && !(target instanceof HTMLDetailsElement) && target.tagName !== "SECTION") {
        return false;
      }

      if (mode === "click") {
        if (location.hash === `#${id}`) history.replaceState(null, "", `#${id}`);
        else history.pushState(null, "", `#${id}`);
      }

      // A click was taken over before any scrolling began; a load or hashchange first lets the page settle.
      // An old hash is rewritten inside that deferred step, so if the effect is torn down first (React runs
      // effects twice in development), the next run still sees the old hash and handles it.
      const whenStill =
        mode === "click"
          ? (fn: () => void) => fn()
          : (fn: () => void) =>
              afterScrollSettles(() => {
                if (renamed) history.replaceState(null, "", `#${id}`);
                fn();
              });

      if (isTab) {
        const panel = target.closest<HTMLElement>("[data-tools-panel]") ?? target;
        selectTab(panel, () =>
          whenStill(() => {
            const numbers = document.getElementById("numbers");
            if (numbers) scrollToTarget(numbers, mode);
            moveFocus(panel.querySelector<HTMLElement>("h3"));
          }),
        );
        return true;
      }

      if (target instanceof HTMLDetailsElement) target.open = true;
      whenStill(() => {
        scrollToTarget(target, mode);
        moveFocus(focusTargetFor(target));
      });
      return true;
    };

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }
      const link = (event.target as Element | null)?.closest?.("a[href]");
      if (!(link instanceof HTMLAnchorElement)) return;
      if ((link.target && link.target !== "_self") || link.hasAttribute("download")) return;
      const href = link.getAttribute("href") ?? "";
      if (!href.startsWith("#") && !href.startsWith("/#")) return;
      const url = new URL(link.href);
      if (url.pathname !== location.pathname || url.search !== location.search || !url.hash) return;

      const id = idFromHash(url.hash);
      if (!targetFor(id)) return; // Nothing to jump to here: the link keeps its own behaviour.
      // Take the jump over (in the capture phase), so the anchor's own jump doesn't run as well.
      event.preventDefault();
      jump(id, "click");
    };

    const onHashChange = () => {
      const id = idFromHash(location.hash);
      if (id) jump(id, "hashchange");
    };

    window.addEventListener("click", onClick, true);
    window.addEventListener("hashchange", onHashChange);

    const initial = idFromHash(location.hash);
    if (initial) jump(initial, "load");

    return () => {
      disposed = true;
      frames.forEach((frame) => cancelAnimationFrame(frame));
      window.removeEventListener("click", onClick, true);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, []);

  return null;
}
