export const API_BASE = "http://localhost:8080/api";

export const ENDPOINTS = {
  careRequest: (patientId) => `${API_BASE}/care-requests/${patientId}`,
  eligibility: (patientId) => `${API_BASE}/eligibility/${patientId}`,
  providers: `${API_BASE}/providers`,
  health: `${API_BASE}/health`,
};
