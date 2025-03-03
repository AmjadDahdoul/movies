import { useEffect, useState } from "react";
import { MovieDetails } from "../types/types";

interface MovieDetailsProps {
  movieId: string;
}

export const useGetMovieDetails = (props: MovieDetailsProps) => {
  const { movieId } = props;
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!movieId) return;

      try {
        setIsLoading(true);
        const response = await fetch(
          `https://imdb.iamidiotareyoutoo.com/search?tt=${movieId}`
        );
        const data = await response.json();
        setMovieDetails(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMovieDetails();
  }, [movieId]);

  return { movieDetails, isLoading };
};
