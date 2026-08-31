export const PRIORITY_STYLE = {
  STAT: {
    bg: "#FFEBEE",
    border: "#EF9A9A",
    color: "#B71C1C",
    label: "STAT — escalate immediately",
  },
  URGENT: {
    bg: "#FFF3E0",
    border: "#FFCC80",
    color: "#E65100",
    label: "URGENT — schedule within 24h",
  },
  ROUTINE: {
    bg: "#E8F5E9",
    border: "#A5D6A7",
    color: "#1B5E20",
    label: "ROUTINE — standard queue",
  },
};

export function resolvePriorityStyle(level) {
  return PRIORITY_STYLE[level] ?? PRIORITY_STYLE.ROUTINE;
}

/**
 * Contract field is `priority`. Do not invent alternate names here.
 * PriorityBanner currently (incorrectly) reads priorityLevel — see that component.
 */
export function getPriorityFromRequest(request) {
  return request?.priority ?? "ROUTINE";
}
