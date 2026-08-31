export function planTypeLabel(type) {
  if (!type) return "Unknown";
  return String(type).toUpperCase();
}

export function isDualCoverage(plans) {
  if (!Array.isArray(plans)) return false;
  const types = new Set(plans.map((p) => p?.type?.toUpperCase()));
  return types.has("PRIMARY") && types.has("SECONDARY");
}
