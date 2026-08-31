// Insurance utility helpers — written against the documented API contract:
//   response.insurancePlans: Array<{ planId, provider, memberId, type, groupNumber }>
//
// These helpers are correct per contract and require no change for Scenario 2.
// The contract bug lives in:
//   (a) nova-api CareRequestResponse / CareRequestService (singular object)
//   (b) CareRequestDetail.jsx (adapted to the broken singular field)

export function getPrimaryPlan(plans) {
  if (!Array.isArray(plans)) return null;
  return plans.find((p) => p.type === "PRIMARY") ?? null;
}

export function getSecondaryPlan(plans) {
  if (!Array.isArray(plans)) return null;
  return plans.find((p) => p.type === "SECONDARY") ?? null;
}

export function formatMemberId(plan) {
  if (!plan) return "—";
  return `${plan.provider} / ${plan.memberId}`;
}
