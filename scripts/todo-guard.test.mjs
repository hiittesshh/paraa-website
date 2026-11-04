import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { assertNoTodos, findTodos } from "./todo-guard.mjs";

function withSrc(files, run) {
  const root = mkdtempSync(join(tmpdir(), "todo-guard-"));
  try {
    for (const [name, text] of Object.entries(files)) {
      mkdirSync(join(root, name, ".."), { recursive: true });
      writeFileSync(join(root, name), text);
    }
    run(root);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
}

test("a clean tree passes, whatever the env", () => {
  withSrc({ "a.tsx": "export const a = 'todos are fine as a plain word';\n" }, (root) => {
    assert.deepEqual(findTodos(root), []);
    assert.doesNotThrow(() => assertNoTodos(root, {}));
  });
});

test("the bracket text and the component both stop the build, with file and line", () => {
  withSrc({ "a.tsx": "const a = 1;\nconst b = '[TODO: length]';\n", "deep/b.tsx": "<Todo>number</Todo>\n" }, (root) => {
    const hits = findTodos(root).map((h) => `${h.file}:${h.line}`).sort();
    assert.deepEqual(hits, ["a.tsx:2", "deep/b.tsx:1"]);
    assert.throws(() => assertNoTodos(root, {}), /Build stopped: 2 unfinished/);
  });
});

test("only the exact REVIEW_BUILD=1 lets it through", () => {
  withSrc({ "a.tsx": "'[TODO: x]'\n" }, (root) => {
    assert.doesNotThrow(() => assertNoTodos(root, { REVIEW_BUILD: "1" }));
    assert.throws(() => assertNoTodos(root, { REVIEW_BUILD: "0" }));
    assert.throws(() => assertNoTodos(root, { REVIEW_BUILD: "true" }));
  });
});

test("the component's own definition is exempt", () => {
  withSrc({ "components/paraa/todo.tsx": "export function Todo() { return '[TODO: x]'; }\n" }, (root) => {
    assert.deepEqual(findTodos(root), []);
  });
});
