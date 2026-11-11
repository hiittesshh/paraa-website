// External links and owner-supplied switches, in one place. Each renders nothing while unset, and none
// changes the layout (spec §12, optional switches).

// The blog is hidden until the Paraa blog has an address (2026-11-03: no Grade Capital links on the
// site). Set BLOG_URL here and the Blog links in the header, menu and footer come back.
export const BLOG_URL: string | null = null;

// The FIU-IND registration number. Shown in the hero cell, the security band, the FAQ and the footer
// note once it's set.
export const FIU_REG_NO: string | null = null;

// The official app listing or web-app address, on the official domain or store. null hides every app link.
export const APP_URL: string | null = null;

// The "report fraud: call 1930 or go to cybercrime.gov.in" sentence in the security band (spec §6.5).
// Turn on only after compliance approves it, and record the official source URL and the date it was
// checked in a comment here when you do.
export const SHOW_CYBERCRIME_HELPLINE = false;
