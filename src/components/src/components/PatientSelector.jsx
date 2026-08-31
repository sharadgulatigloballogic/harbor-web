import React from "react";
import { PATIENTS } from "../constants/patients";

export default function PatientSelector({ patientId, onChange }) {
  return (
    <label>
      <strong>Select patient: </strong>
      <select value={patientId} onChange={(e) => onChange(e.target.value)}>
        {PATIENTS.map((p) => (
          <option key={p.id} value={p.id}>
            {p.label}
          </option>
        ))}
      </select>
    </label>
  );
}
