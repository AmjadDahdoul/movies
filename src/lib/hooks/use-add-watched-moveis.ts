import axios from "axios";
import { useState } from "react";

const ACCESS_TOCKEN = import.meta.env.VITE_TMDB_ACCESS_TOCKEN;
const LIST_ID = "8518072";

export const useAddWatchedMovies = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const addMovieToWatchedList = async (movieId: number) => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
      const response = await axios.post(
        `https://api.themoviedb.org/4/list/${LIST_ID}/items`,
        {
          items: [
            {
              media_type: "movie",
              media_id: movieId,
            },
          ],
        },
        {
          headers: {
            accept: "application/json",
            "content-type": "application/json",
            Authorization: `Bearer ${ACCESS_TOCKEN}`,
          },
        }
      );

      setIsSuccess(true);
      return response.data;
    } catch (err) {
      setError(
        err instanceof Error
          ? err
          : new Error("Failed to add movie to watched list")
      );
      console.error("Error adding movie to watched list:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    addMovieToWatchedList,
    isLoading,
    error,
    isSuccess,
  };
};
