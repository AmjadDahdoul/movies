import { useEffect, useState } from "react";
import { MovieDetails } from "../types/types";

interface MovieDetailsProps {
  movieId: number;
}

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const useGetMovieDetails = (props: MovieDetailsProps) => {
  const { movieId } = props;
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!movieId) return;

      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      };

      try {
        setIsLoading(true);
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
          options
        );
        const data = await response.json();
        setMovieDetails(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      } finally {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [error, movieId]);

  return { movieDetails, isLoading, error };
};
