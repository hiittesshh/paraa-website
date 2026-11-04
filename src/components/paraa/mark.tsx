// A gold highlighter stroke under a phrase in a heading. It's a background, so the text is readable
// from the first paint and on any surface. Drawn in full in the server's HTML; RevealController
// sweeps it in once (600ms) if it's still below the fold. Sweeps only in Baskets and Four steps:
// `still` keeps it drawn and unmoving, which is what the hero uses. Styles are in globals.css.
import type { ReactNode } from "react";

export function Mark({ children, still = false }: { children: ReactNode; still?: boolean }) {
  return (
    <span className="mark" {...(still ? {} : { "data-mark": "" })}>
      {children}
    </span>
  );
}
