import { ENDPOINTS } from "../constants/api";
import { getJson } from "./client";

export function fetchCareRequest(patientId) {
  return getJson(ENDPOINTS.careRequest(patientId));
}

export function fetchEligibility(patientId) {
  return getJson(ENDPOINTS.eligibility(patientId));
}

export function fetchProviders() {
  return getJson(ENDPOINTS.providers);
}
