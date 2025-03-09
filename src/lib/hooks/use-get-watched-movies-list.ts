import { useTmdbApi } from "./use-Tmdb-Api";
import { WatchedMoviesList } from "../types/types";

export const useGetWatchedMovesList = () => {
  const { data, isLoading, error } = useTmdbApi<WatchedMoviesList>({
    endpoint: "/list/8518072",
  });

  return {
    watchedMovies: data,
    isLoading,
    error,
  };
};
