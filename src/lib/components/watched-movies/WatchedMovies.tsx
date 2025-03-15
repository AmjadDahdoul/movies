import {
  Divider,
  Stack,
  Typography,
  useTheme,
  useMediaQuery,
  Box,
} from "@mui/material";
import { WatchedMoviesList } from "../../types/types";
import { MovieGrid } from "../movie-grid/MovieGrid";

export const WatchedMovies = ({
  watchedMoviesList,
}: {
  watchedMoviesList: WatchedMoviesList;
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Stack spacing={3} width='100%' alignItems='center'>
      <Stack
        direction={isMobile ? "column" : "row"}
        spacing={isMobile ? 2 : 3}
        alignItems={isMobile ? "center" : "center"}
        justifyContent='center'
        width='100%'
        divider={
          isMobile ? (
            <Divider orientation='horizontal' flexItem />
          ) : (
            <Divider orientation='vertical' flexItem />
          )
        }
      >
        <Box textAlign='center'>
          <Typography variant='h6' component='h5'>
            Movies: {watchedMoviesList.total_results}
          </Typography>
        </Box>

        <Box textAlign='center'>
          <Typography variant='h6' component='h5'>
            {`Watch Time: ${Math.floor(watchedMoviesList.runtime / 60)}h ${
              watchedMoviesList.runtime % 60
            }m`}
          </Typography>
        </Box>

        <Box textAlign='center'>
          <Typography variant='h6' component='h5'>
            Average Rating: {watchedMoviesList.average_rating}/10
          </Typography>
        </Box>
      </Stack>

      <MovieGrid movies={watchedMoviesList?.results} />
    </Stack>
  );
};
