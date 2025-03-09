import { Grid2, Stack, Typography } from "@mui/material";
import { useSearchParams } from "react-router";
import { useGetMovies } from "../../hooks/use-get-movies";
import { MovieCard } from "../movie-card/MovieCard";
import { MovieCardSkeleton } from "../movie-card/MovieCardSkeleton";
import { useGetWatchedMovesList } from "../../hooks/use-get-watched-movies-list";

export const MoviesList = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  const { movies: searchedMovied, isLoading } = useGetMovies(search || "");
  const { watchedMovies } = useGetWatchedMovesList();

  const watchedMoviesList = watchedMovies?.items || [];

  const movies = search ? searchedMovied : watchedMoviesList;

  return (
    <Stack spacing={2} alignItems={"center"}>
      {watchedMoviesList && !search && (
        <Typography variant='h6'>Watched Movies</Typography>
      )}
      <Grid2 container spacing={2} justifyContent='center'>
        {isLoading ? (
          <MovieCardSkeleton count={10} />
        ) : movies.length === 0 && search ? (
          <Typography variant='h6'>
            No movies found matching "{search}"
          </Typography>
        ) : (
          movies.map((movie) => (
            <Grid2 size='auto' key={movie.id}>
              <MovieCard {...movie} />
            </Grid2>
          ))
        )}
      </Grid2>
    </Stack>
  );
};
