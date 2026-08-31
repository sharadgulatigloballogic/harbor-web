export function displayName(first, last) {
  return [first, last].filter(Boolean).join(" ") || "—";
}

export function truncate(value, max = 40) {
  if (!value) return "";
  if (value.length <= max) return value;
  return `${value.slice(0, max - 1)}…`;
}

export function safeKey(value, fallback = "row") {
  return value == null || value === "" ? fallback : String(value);
}
