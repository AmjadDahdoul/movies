import { Typography } from "@mui/material";
import { useSearchParams } from "react-router";
import { useGetWatchedMoviesList } from "../hooks/use-get-watched-movies-list";
import { WatchedMovies } from "../components/watched-movies/WatchedMovies";
import { useGetMovies } from "../hooks/use-get-movies";
import { SearchedMovies } from "../components/searched-movies/SearchedMovies";
import { MovieCardSkeleton } from "../components/movie-card/MovieCardSkeleton";
import { useGetWatchlist } from "../hooks/use-get-watchlist";
import { CollapsibleWatchlist } from "../components/watchlist/CollapsibleWatchlist";

export const HomePage = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");

  const { watchlist, isLoading: isWatchlistLoading } = useGetWatchlist();
  const { movies: searchedMovies, isLoading } = useGetMovies();
  const { watchedMovies, isLoading: isWatchedLoading } =
    useGetWatchedMoviesList();

  const hasSearchResults = searchedMovies && searchedMovies.length > 0;

  return (
    <>
      {(isLoading || isWatchedLoading) && <MovieCardSkeleton count={10} />}

      {!isLoading && search && !hasSearchResults && (
        <Typography variant='h6'>
          No movies found matching "{search}"
        </Typography>
      )}

      {!search && (
        <CollapsibleWatchlist
          watchlist={watchlist}
          isWatchlistLoading={isWatchlistLoading}
        />
      )}

      {!isLoading && !isWatchedLoading && !search && !watchedMovies && (
        <Typography variant='h6'>No movies found</Typography>
      )}

      {watchedMovies && !search && !isWatchedLoading && (
        <WatchedMovies watchedMoviesList={watchedMovies} />
      )}

      {hasSearchResults && search && !isLoading && (
        <SearchedMovies searchedMovies={searchedMovies} />
      )}
    </>
  );
};
