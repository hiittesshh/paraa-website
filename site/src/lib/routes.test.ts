import { test } from "node:test";
import assert from "node:assert/strict";
import { isLive } from "./routes.ts";

test("built pages, anchors and external links are live; unbuilt pages are not", () => {
  assert.equal(isLive("/"), true);
  assert.equal(isLive("/nav"), false); // NAV page removed on request
  assert.equal(isLive("/#fees"), true);
  assert.equal(isLive("#how"), true);
  assert.equal(isLive("https://rbi.org.in/"), true);
  assert.equal(isLive("mailto:x@y.z"), true);
  assert.equal(isLive("/risks"), false);
  assert.equal(isLive("/legal/terms"), false);
});
