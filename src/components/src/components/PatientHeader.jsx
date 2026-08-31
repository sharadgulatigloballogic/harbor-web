import React from "react";
import { formatDate } from "../utils/dateUtils";

export default function PatientHeader({ request }) {
  if (!request) return null;
  return (
    <div className="stack" style={{ marginBottom: 8 }}>
      <h2 style={{ marginBottom: 8 }}>Care request — {request.patientName}</h2>
      <p><strong>Patient ID:</strong> {request.patientId}</p>
      <p><strong>Date of Birth:</strong> {formatDate(request.dateOfBirth)}</p>
      <p><strong>Request Date:</strong> {formatDate(request.requestDate)}</p>
      <p><strong>Ordering Provider:</strong> {request.orderingProvider}</p>
    </div>
  );
}
