import React from "react";
import { getPriorityFromRequest, resolvePriorityStyle } from "../utils/priorityUtils";

/**
 * PriorityBanner — shows clinical priority for a care request.
 * Reads the API contract field `priority` (STAT | URGENT | ROUTINE).
 */
export default function PriorityBanner({ request }) {
  const level = getPriorityFromRequest(request);
  const style = resolvePriorityStyle(level);

  return (
    <div
      style={{
        marginBottom: 16,
        padding: "10px 14px",
        borderRadius: 6,
        background: style.bg,
        border: `1px solid ${style.border}`,
        color: style.color,
      }}
    >
      <strong>Clinical priority:</strong> {style.label}
    </div>
  );
}
