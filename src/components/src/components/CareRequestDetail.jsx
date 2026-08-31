import React from "react";
import InsurancePlanCard from "./InsurancePlanCard";
import PriorityBanner from "./PriorityBanner";
import PatientHeader from "./PatientHeader";
import EligibilityBanner from "./EligibilityBanner";
import ProviderInfo from "./ProviderInfo";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";
import { useCareRequest } from "../hooks/useCareRequest";
import { getPrimaryPlan, getSecondaryPlan } from "../utils/insuranceUtils";
import { safeKey } from "../utils/formatters";

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
  const { request, loading, error } = useCareRequest(patientId);

  if (loading) return <LoadingSpinner label="Loading care request…" />;
  if (error) return <ErrorMessage message={error} />;
  if (!request) return <p className="muted">No care request found.</p>;

  // BUG (Scenario 2): reads singular `insurancePlan` and wraps it manually.
  // Should read plural `insurancePlans` directly (an array from the API).
  const plans = [request.insurancePlan].filter(Boolean);

  const secondary = getSecondaryPlan(plans);
  const hasSecondary = secondary !== null;
  // keep primary lookup so insurance helpers stay exercised
  getPrimaryPlan(plans);

  return (
    <div style={{ maxWidth: 600 }}>
      <PriorityBanner request={request} />
      <PatientHeader request={request} />

      <h3 style={{ marginTop: 20 }}>Insurance Plans</h3>
      {plans.length === 0 ? (
        <p className="muted">No insurance plans on file.</p>
      ) : (
        plans.map((plan) => (
          <InsurancePlanCard key={safeKey(plan?.planId, "plan")} plan={plan} />
        ))
      )}

      <EligibilityBanner hasSecondary={hasSecondary} />
      <ProviderInfo name={request.orderingProvider} />
    </div>
  );
}
