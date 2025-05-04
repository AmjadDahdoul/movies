import { WatchedMoviesList } from "../types/types";
import { useTmdbApi } from "./use-Tmdb-Api";

const ACCOUNT_ID = import.meta.env.VITE_TMDB_ACCOUNT_ID;

export const useGetWatchlist = () => {
  const { data, isLoading, error } = useTmdbApi<WatchedMoviesList>({
    endpoint: `/account/${ACCOUNT_ID}/watchlist/movies`,
    params: {
      page: 1,
      sort_by: "created_at.asc",
    },
  });

  return {
    watchlist: data,
    isLoading,
    error,
  };
};
