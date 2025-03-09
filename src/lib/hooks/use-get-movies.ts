import { useTmdbApi } from "./use-Tmdb-Api";
import { SearchMovie } from "../types/types";

interface MoviesResponse {
  results: SearchMovie[];
  page: number;
  total_pages: number;
  total_results: number;
}

export const useGetMovies = (searchQuery: string) => {
  const { data, isLoading, error } = useTmdbApi<MoviesResponse>({
    endpoint: "/search/movie",
    params: {
      query: searchQuery,
      include_adult: false,
      page: 1,
    },
    queryKey: searchQuery,
    enabled: !!searchQuery,
  });

  return {
    movies: data?.results || [],
    isLoading,
    error,
  };
};
