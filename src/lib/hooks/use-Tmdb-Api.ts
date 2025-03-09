import { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

interface TmdbApiOptions {
  endpoint: string;
  params?: Record<string, string | number | boolean>;
  queryKey?: string | number | null;
  enabled?: boolean;
}

export function useTmdbApi<T>(options: TmdbApiOptions) {
  const { endpoint, params = {}, queryKey = null, enabled = true } = options;
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const memoizedParams = JSON.stringify(params);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    setIsLoading(true);

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3${endpoint}`,
          {
            params: {
              language: "en-US",
              ...JSON.parse(memoizedParams),
            },
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${API_KEY}`,
            },
          }
        );

        setData(response.data);
      } catch (error) {
        console.error(`Error fetching data from ${endpoint}:`, error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchData, 500);
    return () => clearTimeout(debounceTimer);
  }, [endpoint, enabled, queryKey, memoizedParams]);

  return {
    data,
    isLoading,
    error,
  };
}
