import React from "react";

const TYPE_COLOR = { PRIMARY: "#1565C0", SECONDARY: "#6A1B9A" };

// Displays a single insurance plan card.
// Written against contract — no changes needed here.
export default function InsurancePlanCard({ plan }) {
  if (!plan) return null;
  return (
    <div style={{
      border: "1px solid #ddd", borderRadius: 6, padding: "12px 16px",
      marginBottom: 8, background: "#fafafa",
    }}>
      <span style={{
        fontSize: 11, fontWeight: 700, color: "#fff", padding: "2px 8px",
        borderRadius: 10, background: TYPE_COLOR[plan.type] ?? "#555",
        marginBottom: 6, display: "inline-block",
      }}>
        {plan.type}
      </span>
      <p style={{ margin: "4px 0" }}><strong>Provider:</strong> {plan.provider}</p>
      <p style={{ margin: "4px 0" }}><strong>Member ID:</strong> {plan.memberId}</p>
      <p style={{ margin: "4px 0" }}><strong>Group #:</strong> {plan.groupNumber}</p>
    </div>
  );
}
