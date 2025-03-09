import { useTmdbApi } from "./use-Tmdb-Api";
import { SearchMovie } from "../types/types";
import { useSearchParams } from "react-router";

interface MoviesResponse {
  results: SearchMovie[];
  page: number;
  total_pages: number;
  total_results: number;
}

export const useGetMovies = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

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
