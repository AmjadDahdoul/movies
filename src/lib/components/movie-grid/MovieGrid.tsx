import { Grid2 } from "@mui/material";
import { SearchMovie, WatchedMoviesItems } from "../../types/types";
import { MovieCard } from "../movie-card/MovieCard";
import { memo } from "react";

type MovieType = SearchMovie | WatchedMoviesItems;

interface MovieGridProps {
  movies: MovieType[];
}

export const MovieGrid = memo(({ movies }: MovieGridProps) => {
  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <>
      {movies.map((movie) => (
        <Grid2 size='auto' key={movie.id}>
          <MovieCard {...movie} />
        </Grid2>
      ))}
    </>
  );
});
