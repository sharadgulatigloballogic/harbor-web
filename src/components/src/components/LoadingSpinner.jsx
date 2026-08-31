import React from "react";

export default function LoadingSpinner({ label = "Loading…" }) {
  return (
    <p className="muted" role="status" aria-live="polite">
      {label}
    </p>
  );
}
