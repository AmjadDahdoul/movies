import { Button, Stack, Typography } from "@mui/material";
import { WatchedMoviesList } from "../../types/types";
import { MovieGrid } from "../movie-grid/MovieGrid";

export const Watchlist = ({
  watchlist,
}: {
  watchlist: WatchedMoviesList | null;
}) => {
  const moviesList = watchlist?.results || [];

  const copyToClipboard = async () => {
    try {
      const watchlistText = moviesList
        .map(
          (movie, index) =>
            `${index + 1}. ${movie.title} (${movie.vote_average.toPrecision(
              2
            )})`
        )
        .join("\n");

      await navigator.clipboard.writeText(watchlistText);
    } catch (error) {
      console.error("Failed to copy watchlist to clipboard:", error);
    }
  };

  return (
    <Stack spacing={2} alignItems='center' pt={2} pb={4}>
      <Typography variant='h6' component='h5' textAlign='center'>
        Watchlist: {watchlist?.total_results || 0}
      </Typography>

      <Button variant='contained' onClick={copyToClipboard}>
        Copy
      </Button>

      <MovieGrid movies={moviesList} />
    </Stack>
  );
};
