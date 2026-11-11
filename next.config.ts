import { join } from "node:path";
import type { NextConfig } from "next";
import { PHASE_PRODUCTION_BUILD } from "next/constants";
import { assertNoTodos } from "./scripts/todo-guard.mjs";

const nextConfig: NextConfig = {
  // Dev server only: without this, Next blocks its scripts for anyone opening the site by network
  // address (another computer or phone on the same Wi-Fi), so the page loads but nothing moves.
  allowedDevOrigins: ["192.168.*.*"],
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // Tailwind runs through PostCSS (postcss.config.mjs), the documented setup. The old custom
  // `@tailwindcss/turbopack` loader rule missed source changes, so new classes didn't appear in dev.
};

export default function config(phase: string): NextConfig {
  // Production builds only, so `next dev` keeps showing the tags. See "Unfinished facts" in the README.
  if (phase === PHASE_PRODUCTION_BUILD) assertNoTodos(join(process.cwd(), "src"));
  return nextConfig;
}
