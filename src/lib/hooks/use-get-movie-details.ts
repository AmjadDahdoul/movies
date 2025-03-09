import { useTmdbApi } from "./use-Tmdb-Api";
import { MovieDetails } from "../types/types";

interface MovieDetailsProps {
  movieId: number;
}

export const useGetMovieDetails = ({ movieId }: MovieDetailsProps) => {
  const { data, isLoading, error } = useTmdbApi<MovieDetails>({
    endpoint: `/movie/${movieId}`,
    queryKey: movieId,
    enabled: !!movieId,
  });

  return {
    movieDetails: data,
    isLoading,
    error,
  };
};
