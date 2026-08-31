import { useEffect, useState } from "react";
import { fetchCareRequest } from "../api/careRequests";

export function useCareRequest(patientId) {
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchCareRequest(patientId)
      .then((data) => {
        if (!cancelled) {
          setRequest(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [patientId]);

  return { request, loading, error };
}
