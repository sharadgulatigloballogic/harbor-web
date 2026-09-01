import assert from "node:assert/strict";
import { getPriorityFromRequest, resolvePriorityStyle } from "./priorityUtils.js";

assert.equal(getPriorityFromRequest({ priority: "STAT" }), "STAT");
assert.equal(getPriorityFromRequest({ priority: "URGENT" }), "URGENT");
assert.equal(getPriorityFromRequest({ priority: "ROUTINE" }), "ROUTINE");
assert.equal(getPriorityFromRequest({}), "ROUTINE");
assert.equal(getPriorityFromRequest({ priorityLevel: "STAT" }), "ROUTINE");
assert.equal(getPriorityFromRequest(null), "ROUTINE");

assert.equal(resolvePriorityStyle("STAT").label, "STAT — escalate immediately");
assert.equal(resolvePriorityStyle("URGENT").label, "URGENT — schedule within 24h");
assert.equal(resolvePriorityStyle("ROUTINE").label, "ROUTINE — standard queue");

console.log("priorityUtils.test.mjs: ok");
