import React, { useState } from "react";
import CareRequestDetail from "./components/CareRequestDetail";

const PATIENTS = [
  { id: "P-001", label: "Jane Doe (P-001) — STAT, primary + secondary" },
  { id: "P-002", label: "Robert Chen (P-002) — ROUTINE, primary only" },
  { id: "P-003", label: "Amelia Torres (P-003) — URGENT, primary only" },
];

export default function App() {
  const [patientId, setPatientId] = useState("P-001");
  return (
    <div style={{ fontFamily: "sans-serif", padding: 24 }}>
      <h1 style={{ marginBottom: 4 }}>Harbor Console</h1>
      <p style={{ color: "#666", marginTop: 0, marginBottom: 16 }}>
        Care request review
      </p>
      <label>
        <strong>Select patient: </strong>
        <select value={patientId} onChange={(e) => setPatientId(e.target.value)}>
          {PATIENTS.map((p) => (
            <option key={p.id} value={p.id}>{p.label}</option>
          ))}
        </select>
      </label>
      <hr style={{ margin: "16px 0" }} />
      <CareRequestDetail patientId={patientId} />
    </div>
  );
}
