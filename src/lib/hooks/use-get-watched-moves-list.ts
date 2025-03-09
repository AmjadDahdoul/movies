import { useEffect, useState } from "react";
import { WatchedMoviesList } from "../types/types";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const useGetWatchedMovesList = () => {
  const [watchedMovies, setWatchedMovies] = useState<WatchedMoviesList>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    };

    setIsLoading(true);

    const fetchWatchedMovies = async () => {
      try {
        const res = await fetch(
          "https://api.themoviedb.org/3/list/8518072?language=en-US&page=1",
          options
        );
        const data = await res.json();
        setWatchedMovies(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setError(error);
        setIsLoading(false);
      }
    };

    fetchWatchedMovies();
  }, []);

  return { watchedMovies, isLoading, error };
};
