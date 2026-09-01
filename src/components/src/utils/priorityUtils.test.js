const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const banners = [
  path.join(__dirname, "..", "..", "PriorityBanner.jsx"),
  path.join(__dirname, "..", "components", "PriorityBanner.jsx"),
];

for (const file of banners) {
  const source = fs.readFileSync(file, "utf8");
  assert.match(
    source,
    /request\?\.priority|getPriorityFromRequest\(request\)/,
    `${file} must read contract field priority`
  );
  assert.doesNotMatch(
    source,
    /priorityLevel/,
    `${file} must not read priorityLevel`
  );
}

const { getPriorityFromRequest, resolvePriorityStyle } = (() => {
  const utilPath = path.join(__dirname, "priorityUtils.js");
  const source = fs.readFileSync(utilPath, "utf8");
  const wrapped = source
    .replace(/export const /g, "const ")
    .replace(/export function /g, "function ");
  const exports = {};
  // eslint-disable-next-line no-new-func
  new Function("exports", `${wrapped}\nexports.getPriorityFromRequest = getPriorityFromRequest;\nexports.resolvePriorityStyle = resolvePriorityStyle;\nexports.PRIORITY_STYLE = PRIORITY_STYLE;`)(exports);
  return exports;
})();

assert.equal(getPriorityFromRequest({ priority: "STAT" }), "STAT");
assert.equal(getPriorityFromRequest({ priority: "URGENT" }), "URGENT");
assert.equal(getPriorityFromRequest({ priority: "ROUTINE" }), "ROUTINE");
assert.equal(getPriorityFromRequest({ priorityLevel: "STAT" }), "ROUTINE");
assert.equal(getPriorityFromRequest({}), "ROUTINE");
assert.equal(getPriorityFromRequest(null), "ROUTINE");
assert.equal(resolvePriorityStyle("STAT").label, "STAT — escalate immediately");
assert.equal(resolvePriorityStyle("URGENT").label, "URGENT — schedule within 24h");

console.log("priorityUtils.test.js: ok");
