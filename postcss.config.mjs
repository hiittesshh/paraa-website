// Tailwind CSS v4 through PostCSS, the setup the Next.js docs give (node_modules/next/dist/docs/01-app/
// 01-getting-started/11-css.md). It replaces the custom `@tailwindcss/turbopack` loader rule, which didn't track
// source files, so classes added while the dev server ran (and theme edits after a restart) never appeared.
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
