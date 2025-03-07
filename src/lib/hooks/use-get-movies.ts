import { useEffect, useState } from "react";
import { GetRandomMovie } from "./use-get-random-movie";

const URL_API = "https://imdb.iamidiotareyoutoo.com/search?q=";

export const useGetMovies = (searchQuery: string) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [actualQuery, setActualQuery] = useState(searchQuery);

  useEffect(() => {
    if (!searchQuery) {
      const randomMovie = GetRandomMovie();
      setActualQuery(randomMovie);
    } else {
      setActualQuery(searchQuery);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (!actualQuery) {
      return;
    }

    setIsLoading(true);

    const fetchMovie = async () => {
      try {
        const response = await fetch(`${URL_API}${actualQuery}`);
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
  }, [actualQuery]);

  return {
    movies,
    isLoading,
    randomKeywordUsed: !searchQuery && movies.length > 0,
  };
};
