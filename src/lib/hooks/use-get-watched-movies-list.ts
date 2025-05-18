import { WatchedMoviesList } from "../types/types";
import { useEffect, useState } from "react";
import axios from "axios";

const VITE_TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
export const useGetWatchedMoviesList = () => {
  const [watchedMovies, setWatchedMovies] = useState<WatchedMoviesList | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchWatchedMovies(page);
  }, [page]);

  const fetchWatchedMovies = async (pageNumber: number) => {
    setIsLoading(true);
    const options = {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${VITE_TMDB_API_KEY}`,
      },
    };

    try {
      const response = await axios.get(
        `https://api.themoviedb.org/4/list/8518072?language=en-US&page=${pageNumber}`,
        options
      );

      const newData = response.data;

      if (pageNumber === 1) {
        setWatchedMovies(newData);
      } else if (watchedMovies) {
        // Merge results from previous pages with new results
        setWatchedMovies({
          ...newData,
          results: [...watchedMovies.results, ...newData.results],
        });
      }

      // Check if we've reached the last page
      setHasMore(pageNumber < newData.total_pages);
    } catch (error) {
      console.error("Error fetching watched movies list:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMore = () => {
    if (!isLoading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return {
    watchedMovies,
    isLoading,
    hasMore,
    loadMore,
  };
};
