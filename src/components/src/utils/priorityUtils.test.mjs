import assert from "node:assert/strict";
import test from "node:test";
import { getPriorityFromRequest, resolvePriorityStyle } from "./priorityUtils.js";

test("getPriorityFromRequest reads contract field priority", () => {
  assert.equal(getPriorityFromRequest({ priority: "STAT" }), "STAT");
  assert.equal(getPriorityFromRequest({ priority: "URGENT" }), "URGENT");
  assert.equal(getPriorityFromRequest({ priority: "ROUTINE" }), "ROUTINE");
});

test("getPriorityFromRequest ignores priorityLevel and defaults to ROUTINE", () => {
  assert.equal(getPriorityFromRequest({ priorityLevel: "STAT" }), "ROUTINE");
  assert.equal(getPriorityFromRequest({}), "ROUTINE");
  assert.equal(getPriorityFromRequest(null), "ROUTINE");
});

test("resolvePriorityStyle returns STAT and URGENT labels", () => {
  assert.match(resolvePriorityStyle("STAT").label, /STAT/);
  assert.match(resolvePriorityStyle("URGENT").label, /URGENT/);
  assert.match(resolvePriorityStyle("ROUTINE").label, /ROUTINE/);
});
