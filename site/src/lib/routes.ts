// Pages that actually exist. The site map (02-concepts.md §0.1) has ~20 routes; only these are
// built. Links to anything else render as "Soon" text instead of a 404 (see SiteLink).
// When a page ships, add it here and every link to it switches on.
export const LIVE_ROUTES: ReadonlySet<string> = new Set(["/", "/nav"]);

/** In-page anchors, external URLs and mailto: always work; internal paths only if built. */
export function isLive(href: string): boolean {
  if (href.startsWith("#") || /^(https?:|mailto:|tel:)/.test(href)) return true;
  const path = href.split("#")[0].split("?")[0] || "/";
  return LIVE_ROUTES.has(path);
}
