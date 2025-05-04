import { Fade, Switch, Paper } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useState } from "react";
import { Watchlist } from "./Watchlist";
import { WatchedMoviesList } from "../../types/types";

export const CollapsibleWatchlist = ({
  watchlist,
}: {
  watchlist: WatchedMoviesList | null;
}) => {
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
          <Watchlist watchlist={watchlist} />
        </Paper>
      </Fade>
    </>
  );
};
