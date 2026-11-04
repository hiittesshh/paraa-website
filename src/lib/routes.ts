// Pages that actually exist. The site map (docs/content-rules.md §0.1) has ~20 routes; only these are
// built. Check a link with isLive() so it never points at a 404.
// When a page ships, add it here and every link to it switches on.
export const LIVE_ROUTES: ReadonlySet<string> = new Set(["/"]);

/** In-page anchors, external URLs and mailto: always work; internal paths only if built. */
export function isLive(href: string): boolean {
  if (href.startsWith("#") || /^(https?:|mailto:|tel:)/.test(href)) return true;
  const path = href.split("#")[0].split("?")[0] || "/";
  return LIVE_ROUTES.has(path);
}
