import { Grid2, Stack, Typography } from "@mui/material";
import { useSearchParams } from "react-router";
import { useGetWatchedMoviesList } from "../../hooks/use-get-watched-movies-list";
import { WatchedMovies } from "../watched-movies/WatchedMovies";
import { useGetMovies } from "../../hooks/use-get-movies";
import { SearchedMovies } from "../searched-movies/SearchedMovies";
import { MovieCardSkeleton } from "../movie-card/MovieCardSkeleton";

export const MoviesListLayout = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");

  const { movies: searchedMovies, isLoading } = useGetMovies();
  const { watchedMovies, isLoading: isWatchedLoading } =
    useGetWatchedMoviesList();

  const watchedMoviesList = watchedMovies?.items || [];
  const hasSearchResults = searchedMovies && searchedMovies.length > 0;

  return (
    <Stack spacing={2} alignItems='center'>
      <Grid2 container spacing={2} justifyContent='center'>
        {(isLoading || isWatchedLoading) && <MovieCardSkeleton count={10} />}

        {!isLoading && search && !hasSearchResults && (
          <Typography variant='h6'>
            No movies found matching "{search}"
          </Typography>
        )}

        {watchedMovies && !search && !isWatchedLoading && (
          <WatchedMovies watchedMoviesList={watchedMoviesList} />
        )}

        {hasSearchResults && search && !isLoading && (
          <SearchedMovies searchedMovies={searchedMovies} />
        )}
      </Grid2>
    </Stack>
  );
};
