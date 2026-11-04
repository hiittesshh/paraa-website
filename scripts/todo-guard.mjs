// Stops a production build while the page still has unfinished facts on it. next.config.ts calls
// this during `next build`, so it can't be skipped by building some way other than `npm run build`.
// REVIEW_BUILD=1 lets a build through for internal review. Plain Node with no packages.
import { readdirSync, readFileSync } from "node:fs";
import { join, relative, sep } from "node:path";

// The component's own definition has to contain the words.
const EXEMPT = new Set(["components/paraa/todo.tsx"]);
const SOURCE = /\.(ts|tsx|js|jsx|mjs|css|md|mdx|json)$/;
// The bracket form in any string or JSX text, and the component by name (its use or its import).
const PATTERN = /\[\s*TODO\b|\bTodo\b/gi;
const isHit = (text) => /^\[/.test(text) || text === "Todo";

/** Every place under `root` with an unfinished fact, as { file, line, text }. */
export function findTodos(root) {
  const hits = [];
  for (const entry of readdirSync(root, { recursive: true, withFileTypes: true })) {
    if (!entry.isFile() || !SOURCE.test(entry.name)) continue;
    const path = join(entry.parentPath, entry.name);
    const file = relative(root, path).split(sep).join("/");
    if (EXEMPT.has(file)) continue;
    readFileSync(path, "utf8")
      .split(/\r?\n/)
      .forEach((text, i) => {
        if ([...text.matchAll(PATTERN)].some((m) => isHit(m[0]))) hits.push({ file, line: i + 1, text: text.trim() });
      });
  }
  return hits;
}

/** Throws with the full list, unless this is a review build. */
export function assertNoTodos(root, env = process.env) {
  const hits = findTodos(root);
  if (env.REVIEW_BUILD === "1") {
    if (hits.length) console.warn(`\nREVIEW_BUILD=1: ${hits.length} unfinished line(s) on this build. Not for public release.\n`);
    return;
  }
  if (!hits.length) return;
  const list = hits.map((h) => `  src/${h.file}:${h.line}  ${h.text.slice(0, 100)}`).join("\n");
  throw new Error(
    `Build stopped: ${hits.length} unfinished line(s) in src/.\n${list}\n\nSupply the facts, or set REVIEW_BUILD=1 for an internal review build.`,
  );
}
