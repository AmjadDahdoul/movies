import { WatchedMoviesList } from "../types/types";
import { useEffect, useState } from "react";
import axios from "axios";

const VITE_TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
export const useGetWatchedMoviesList = () => {
  const [watchedMovies, setWatchedMovies] = useState<WatchedMoviesList | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const options = {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${VITE_TMDB_API_KEY}`,
      },
    };

    const getWatchedMoviesList = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/4/list/8518072?language=en-US&page=1",
          options
        );
        setWatchedMovies(response.data);
      } catch (error) {
        console.error("Error fetching watched movies list:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getWatchedMoviesList();
  }, []);

  return {
    watchedMovies,
    isLoading,
  };
};
