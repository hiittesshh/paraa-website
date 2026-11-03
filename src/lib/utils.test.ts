import { test } from "node:test";
import assert from "node:assert/strict";
import { cn } from "./utils.ts";

test("custom body sizes don't knock out text colours (gold-button contrast bug)", () => {
  assert.equal(cn("text-primary-foreground", "text-body-md"), "text-primary-foreground text-body-md");
  assert.equal(cn("text-body-md text-muted-foreground", "text-faint"), "text-body-md text-faint");
  assert.equal(cn("text-body-md", "text-body-lg"), "text-body-lg");
});
