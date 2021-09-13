import { useState, useEffect } from "react";
import { get } from "../services/services.js";

export function useService(req, initialValue) {
  const [data, setData] = useState(initialValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [url, setUrl] = useState(req);

  useEffect(() => {
    const callService = async () => {
      setLoading(true);
      setError(false);
      try {
        const res = await get(url);
        setData(res);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError(true);
      }
    };
    callService();
  }, [url, setData]);

  return [
    {
      data,
      loading,
      error,
    },
    setUrl,
  ];
}
