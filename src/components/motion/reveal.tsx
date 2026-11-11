"use client";

// Scroll reveal, built on Motion (round 18). The server HTML is complete and visible: nothing is hidden
// without JavaScript, in print, or for anyone who prefers reduced motion. After hydration, a block that is
// still below the fold is tucked away (it's off screen, so nothing flashes) and rises in the first time it
// scrolls into view. Blocks already on screen are never touched, so nothing moves on load.
//
// `stagger` reveals the direct children one after another instead of the block as a whole.
import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { useInView } from "motion/react";
import { useAnimate } from "motion/react-mini";

const EASE = [0.23, 1, 0.32, 1] as const;
const HIDDEN = { opacity: "0", transform: "translateY(1.5rem)" };

export function Reveal({
  as: Tag = "div",
  stagger = 0,
  delay = 0,
  className,
  children,
  ...props
}: {
  as?: ElementType;
  /** Seconds between children. 0 reveals the block as one. */
  stagger?: number;
  /** Seconds before the first item starts. */
  delay?: number;
  className?: string;
  children: ReactNode;
  id?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
}) {
  const [scope, animate] = useAnimate<HTMLElement>();
  const inView = useInView(scope, { once: true, amount: 0.2 });
  const armed = useRef(false);

  const targets = () => {
    const el = scope.current;
    if (!el) return [];
    return stagger > 0 ? (Array.from(el.children) as HTMLElement[]) : [el];
  };

  // Arm: only below the fold, only when motion is welcome.
  useEffect(() => {
    const el = scope.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    for (const t of targets()) Object.assign(t.style, HIDDEN);
    armed.current = true;
    // targets() reads the ref; it runs once on mount by design.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!inView || !armed.current) return;
    armed.current = false;
    targets().forEach((t, i) => {
      animate(
        t,
        { opacity: 1, transform: "translateY(0px)" },
        { duration: 0.7, delay: delay + i * stagger, ease: EASE },
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <Tag ref={scope} data-reveal="" className={className} {...props}>
      {children}
    </Tag>
  );
}
