export const PATIENTS = [
  { id: "P-001", label: "Jane Doe (P-001) — STAT, primary + secondary" },
  { id: "P-002", label: "Robert Chen (P-002) — ROUTINE, primary only" },
  { id: "P-003", label: "Amelia Torres (P-003) — URGENT, primary only" },
];

export function getPatientLabel(patientId) {
  return PATIENTS.find((p) => p.id === patientId)?.label ?? patientId;
}
