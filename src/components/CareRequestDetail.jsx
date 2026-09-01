import React, { useEffect, useState } from "react";
import InsurancePlanCard from "./InsurancePlanCard";
import PriorityBanner from "./PriorityBanner";
import { getPrimaryPlan, getSecondaryPlan } from "../utils/insuranceUtils";

const API_BASE = "http://localhost:8080/api";

/**
 * CareRequestDetail — displays a care request for a patient.
 *
 * --- Scenario 2 (contract adaptation to broken API) ---
 *
 * Nova API currently returns:
 *   { "insurancePlan": { ...single object... } }   <-- singular, object
 *
 * The API contract specifies:
 *   { "insurancePlans": [ ...array... ] }           <-- plural, array
 *
 * This component was adapted to the broken response, so it reads
 * `data.insurancePlan` (singular) and wraps it in a one-element array.
 *
 * Consequences:
 *  1. Secondary plans are always absent — eligibility can never confirm dual coverage.
 *  2. When nova-api is fixed to return `insurancePlans`, `data.insurancePlan`
 *     becomes undefined and the UI breaks unless this component is updated too.
 *
 * Fix required here for Scenario 2:
 *   - Read `data.insurancePlans` (plural) instead of `data.insurancePlan`
 *   - Use the list directly (no manual wrapping)
 *
 * --- Scenario 1 ---
 * PriorityBanner (separate component) has its own field-name bug; see that file.
 */
export default function CareRequestDetail({ patientId }) {
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/care-requests/${patientId}`)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data) => {
        setRequest(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [patientId]);

  if (loading) return <p>Loading care request…</p>;
  if (error)   return <p style={{ color: "red" }}>Error: {error}</p>;
  if (!request) return <p>No care request found.</p>;

  // BUG (Scenario 2): reads singular `insurancePlan` and wraps it manually.
  // Should read plural `insurancePlans` directly (an array from the API).
  const plans = request.insurancePlans ?? [];

  const primary   = getPrimaryPlan(plans);
  const secondary = getSecondaryPlan(plans);
  const hasSecondary = secondary !== null;

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: 600, padding: 24 }}>
      <PriorityBanner request={request} />

      <h2>Care request — {request.patientName}</h2>
      <p><strong>Patient ID:</strong> {request.patientId}</p>
      <p><strong>Date of Birth:</strong> {request.dateOfBirth}</p>
      <p><strong>Request Date:</strong> {request.requestDate}</p>
      <p><strong>Ordering Provider:</strong> {request.orderingProvider}</p>

      <h3 style={{ marginTop: 20 }}>Insurance Plans</h3>
      {plans.length === 0 ? (
        <p style={{ color: "#999" }}>No insurance plans on file.</p>
      ) : (
        plans.map((plan) => <InsurancePlanCard key={plan?.planId} plan={plan} />)
      )}

      <div style={{
        marginTop: 16, padding: "10px 14px", borderRadius: 6,
        background: hasSecondary ? "#E8F5E9" : "#FFF8E1",
        border: `1px solid ${hasSecondary ? "#A5D6A7" : "#FFE082"}`,
      }}>
        <strong>Eligibility pre-check:</strong>{" "}
        {hasSecondary
          ? "Primary + Secondary coverage confirmed."
          : "Primary coverage only — verify secondary before submitting."}
      </div>
    </div>
  );
}
