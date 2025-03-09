import { useEffect, useState } from "react";
import { SearchMovie } from "../types/types";

type Movie = SearchMovie[];

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const useGetMovies = (searchQuery: string) => {
  const [movies, setMovies] = useState<Movie>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    if (!searchQuery) {
      setMovies([]);
      return;
    }

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    };

    setIsLoading(true);

    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=false&language=en-US&page=1`,
          options
        );
        const data = await response.json();
        setMovies(data.results);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching movie data:", error);
        setError(error);
        setMovies([]);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchMovies, 500);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  return {
    movies,
    isLoading,
    error,
  };
};
