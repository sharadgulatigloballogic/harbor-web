import React from "react";

export default function ProviderInfo({ name, specialty }) {
  return (
    <div className="card" style={{ marginTop: 16 }}>
      <h3 style={{ marginBottom: 8 }}>Ordering provider</h3>
      <p style={{ margin: "4px 0" }}><strong>Name:</strong> {name || "—"}</p>
      {specialty ? (
        <p style={{ margin: "4px 0" }}><strong>Specialty:</strong> {specialty}</p>
      ) : null}
    </div>
  );
}
