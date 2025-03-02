import { useEffect, useState } from "react";

const URL_API = process.env.URL_API;

export const useGetMovies = (searchQuery: string) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!searchQuery) {
      setMovies([]);
      return;
    }

    setIsLoading(true);

    const fetchMovie = async () => {
      try {
        const response = await fetch(`${URL_API}${searchQuery}`);
        if (!response.ok) throw new Error("Failed to fetch");

        const movieData = await response.json();
        setMovies(movieData.description);
      } catch (error) {
        console.error("Error fetching movie data:", error);
        setMovies([]);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchMovie, 500);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  return { movies, isLoading };
};
