import React, { useState } from "react";
import AppLayout from "../layouts/AppLayout";
import PatientSelector from "../components/PatientSelector";
import CareRequestDetail from "../components/CareRequestDetail";

export default function CareRequestPage() {
  const [patientId, setPatientId] = useState("P-001");

  return (
    <AppLayout title="Harbor Console" subtitle="Care request review">
      <PatientSelector patientId={patientId} onChange={setPatientId} />
      <hr style={{ margin: "16px 0", borderColor: "var(--harbor-line)" }} />
      <CareRequestDetail patientId={patientId} />
    </AppLayout>
  );
}
