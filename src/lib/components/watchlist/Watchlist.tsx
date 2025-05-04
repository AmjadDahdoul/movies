import { Stack, Typography } from "@mui/material";
import { WatchedMoviesList } from "../../types/types";
import { MovieGrid } from "../movie-grid/MovieGrid";

export const Watchlist = ({
  watchlist,
}: {
  watchlist: WatchedMoviesList | null;
}) => {
  const moviesList = watchlist?.results || [];

  return (
    <Stack spacing={3} alignItems='center' margin={1}>
      <Typography variant='h6' component='h5' textAlign='center'>
        Watchlist: {watchlist?.total_results || 0}
      </Typography>

      <MovieGrid movies={moviesList} />
    </Stack>
  );
};
