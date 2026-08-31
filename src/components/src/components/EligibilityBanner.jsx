import React from "react";

export default function EligibilityBanner({ hasSecondary }) {
  return (
    <div
      style={{
        marginTop: 16,
        padding: "10px 14px",
        borderRadius: 6,
        background: hasSecondary ? "#E8F5E9" : "#FFF8E1",
        border: `1px solid ${hasSecondary ? "#A5D6A7" : "#FFE082"}`,
      }}
    >
      <strong>Eligibility pre-check:</strong>{" "}
      {hasSecondary
        ? "Primary + Secondary coverage confirmed."
        : "Primary coverage only — verify secondary before submitting."}
    </div>
  );
}
