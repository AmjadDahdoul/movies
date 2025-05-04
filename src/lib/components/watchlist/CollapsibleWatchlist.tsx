import { Fade, Switch, Paper, Typography } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useState } from "react";
import { Watchlist } from "./Watchlist";
import { WatchedMoviesList } from "../../types/types";
import { MovieCardSkeleton } from "../movie-card/MovieCardSkeleton";

interface CollapsibleWatchlistProps {
  watchlist: WatchedMoviesList | null;
  isWatchlistLoading: boolean;
}

export const CollapsibleWatchlist = ({
  watchlist,
  isWatchlistLoading,
}: CollapsibleWatchlistProps) => {
  const [checked, setChecked] = useState(
    JSON.parse(localStorage.getItem("showWatchlist") || "true")
  );

  const handleChange = () => {
    const newValue = !checked;
    setChecked(!checked);
    localStorage.setItem("showWatchlist", JSON.stringify(newValue));
  };

  return (
    <>
      <FormControlLabel
        control={<Switch checked={checked} onChange={handleChange} />}
        label='Show Watchlist'
        sx={{ display: "flex", justifyContent: "center", mb: 2 }}
      />

      <Fade in={checked} unmountOnExit timeout={650}>
        <Paper sx={{ mb: 2 }} elevation={0}>
          {watchlist?.results?.length === 0 ? (
            <Typography variant='h6' component='h3' textAlign='center' p={2}>
              No movies in your watchlist
            </Typography>
          ) : isWatchlistLoading && checked ? (
            <MovieCardSkeleton count={10} />
          ) : (
            <Watchlist watchlist={watchlist} />
          )}
        </Paper>
      </Fade>
    </>
  );
};
