import axios from "axios";
import { useState } from "react";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const ACCOUNT_ID = import.meta.env.VITE_TMDB_ACCOUNT_ID;

export const useWatchlist = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const updateMovieToWatchlist = async (
    movieId: number,
    watchListStatus: boolean
  ) => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
      const response = await axios.post(
        `https://api.themoviedb.org/3/account/${ACCOUNT_ID}/watchlist`,
        {
          media_type: "movie",
          media_id: movieId,
          watchlist: watchListStatus,
        },
        {
          headers: {
            accept: "application/json",
            "content-type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );

      setIsSuccess(true);
      return response.data;
    } catch (err) {
      setError(
        err instanceof Error
          ? err
          : new Error("Failed to add movie to watchlist")
      );
      console.error("Error adding movie to watchlist:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    updateMovieToWatchlist,
    isLoading,
    error,
    isSuccess,
  };
};
