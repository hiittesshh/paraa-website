// The brand lock-up, used by the header and the footer (spec §4.19, owner decision 6): the current gold
// Paraa Capital wordmark at 40px tall. The browser-tab and home-screen icons are src/app/icon.png and
// apple-icon.png (Next.js file conventions).
//
// v1.3 (§9): getImageProps() returns plain <img> props (the optimised src, srcSet, width and height), so the
// logo ships no client JS: next/image's <Image> client component cost about 8 KB gz for one static logo.
// The header instance loads eagerly; the footer's stays lazy. The LCP element is the h1, not the logo.
//
// v1.5 (decision 68): a plain <a> to /#top, not a router link to "/". HashHandler scrolls to the top and
// focuses the h1, so the page doesn't reload and nothing typed in the form is lost.
import { getImageProps } from "next/image";
import { cn } from "@/lib/utils";
// Swap point: replace with the ink-wordmark lockup (SVG preferred) when supplied.
import LOGO from "@/assets/paraa-logo.png";

// Static, so computed once for the module rather than on every render.
const IMG = {
  eager: getImageProps({ src: LOGO, alt: "", loading: "eager" }).props,
  lazy: getImageProps({ src: LOGO, alt: "", loading: "lazy" }).props,
} as const;

export function Brand({ loading = "eager", className }: { loading?: "eager" | "lazy"; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-html-link-for-pages -- decision 68: an in-page anchor HashHandler owns
    <a
      href="/#top"
      aria-label="Paraa Capital, home"
      className={cn("inline-flex min-h-11 shrink-0 items-center rounded-sm", className)}
    >
      {/* The link carries the name; the image is decorative inside it (alt=""). */}
      {/* eslint-disable-next-line @next/next/no-img-element -- getImageProps() output: optimised, no client JS */}
      <img {...IMG[loading]} alt="" className="h-10 w-auto" />
    </a>
  );
}
