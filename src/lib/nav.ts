// The one navigation source (spec §5.2). The header, the mobile menu, the footer and the scrollspy all
// read these, so a label or an order can't drift between them (WCAG 3.2.3 / 3.2.6).
import { APP_URL, BLOG_URL } from "./links";

export const NAV = [
  { id: "basket", href: "/#basket", label: "The basket" },
  { id: "how", href: "/#how", label: "How it works" },
  { id: "security", href: "/#security", label: "Security" },
  { id: "numbers", href: "/#numbers", label: "Calculators" },
  { id: "faq", href: "/#faq", label: "FAQ" },
] as const;

export const CTA = { href: "/#ask", label: "Ask a CA" } as const;

export type ExternalLink = { href: string; label: string; external: true };

/** Header, menu and footer: present only once BLOG_URL is set. */
export const BLOG_LINK: ExternalLink | null = BLOG_URL ? { href: BLOG_URL, label: "Blog", external: true } : null;

/** How it works and the footer only, never the header or the hero (spec §5.2, decision 57). */
export const APP_LINK: ExternalLink | null = APP_URL ? { href: APP_URL, label: "Get the app", external: true } : null;
