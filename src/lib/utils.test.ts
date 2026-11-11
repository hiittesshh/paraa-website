import { test } from "node:test";
import assert from "node:assert/strict";
import { cn } from "./utils.ts";

test("custom body sizes don't knock out text colours (spec §2.3)", () => {
  assert.equal(cn("text-body-md", "text-primary-foreground"), "text-body-md text-primary-foreground");
  assert.equal(cn("text-primary-foreground", "text-body-md"), "text-primary-foreground text-body-md");
});

test("text-copy is a colour, not a size (spec §2.3)", () => {
  assert.equal(cn("text-copy", "text-body-lg"), "text-copy text-body-lg");
  assert.equal(cn("text-body-md text-muted-foreground", "text-copy"), "text-body-md text-copy");
});

test("the brand foreground is a colour, not a size (spec §2.3, v1.3)", () => {
  assert.equal(cn("text-body-md", "text-brand-foreground"), "text-body-md text-brand-foreground");
});

test("type-* utilities are unknown to tailwind-merge, so both survive (spec §2.3, v1.3)", () => {
  assert.equal(cn("type-subhead", "type-question"), "type-subhead type-question");
});

test("a later body size still replaces an earlier one", () => {
  assert.equal(cn("text-body-md", "text-body-lg"), "text-body-lg");
});
