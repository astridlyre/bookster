import { useState, useEffect } from "react";
import { get } from "../services/services.js";

export function useService(req, initialValue) {
  const [data, setData] = useState(initialValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const callService = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await get(req);
      setData(res);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError(true);
    }
  };

  useEffect(() => {
    callService();
  }, [req, setData]);

  return [
    {
      data,
      loading,
      error,
    },
    callService,
  ];
}
