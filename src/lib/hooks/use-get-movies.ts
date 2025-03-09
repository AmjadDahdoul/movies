import { useTmdbApi } from "./use-Tmdb-Api";
import { SearchMovie } from "../types/types";
import { useSearchParams } from "react-router";
import { useCallback, useEffect } from "react";

interface MoviesResponse {
  results: SearchMovie[];
  page: number;
  total_pages: number;
  total_results: number;
}

export const useGetMovies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  const clearEmptySearch = useCallback(() => {
    if (!search) {
      // Note: this will clear all search parameters
      setSearchParams({}, { replace: true });
    }
  }, [search, setSearchParams]);

  useEffect(() => {
    clearEmptySearch();
  }, [clearEmptySearch]);

  const { data, isLoading, error } = useTmdbApi<MoviesResponse>({
    endpoint: "/search/movie",
    params: {
      query: search,
      include_adult: false,
      page: 1,
    },
    queryKey: search,
    enabled: !!search,
  });

  return {
    movies: data?.results || [],
    isLoading,
    error,
  };
};
