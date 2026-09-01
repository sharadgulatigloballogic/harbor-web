import React from "react";

const PRIORITY_STYLE = {
  STAT:   { bg: "#FFEBEE", border: "#EF9A9A", color: "#B71C1C", label: "STAT — escalate immediately" },
  URGENT: { bg: "#FFF3E0", border: "#FFCC80", color: "#E65100", label: "URGENT — schedule within 24h" },
  ROUTINE:{ bg: "#E8F5E9", border: "#A5D6A7", color: "#1B5E20", label: "ROUTINE — standard queue" },
};

/**
 * PriorityBanner — shows clinical priority for a care request.
 * Reads the API contract field `request.priority` (STAT | URGENT | ROUTINE).
 */
export default function PriorityBanner({ request }) {
  const level = request?.priority ?? "ROUTINE";
  const style = PRIORITY_STYLE[level] ?? PRIORITY_STYLE.ROUTINE;

  return (
    <div style={{
      marginBottom: 16, padding: "10px 14px", borderRadius: 6,
      background: style.bg, border: `1px solid ${style.border}`, color: style.color,
    }}>
      <strong>Clinical priority:</strong> {style.label}
    </div>
  );
}
