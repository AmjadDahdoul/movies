import {
  Box,
  Button,
  Card,
  CardMedia,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import styles from "./MovieCard.module.scss";
import { SearchMovie, WatchedMoviesItems } from "../../types/types";
import { FALLBACK_IMAGE, MovieModal } from "../movie-modal/MovieModal";
import { useState } from "react";
import { useAddWatchedMovies } from "../../hooks/use-add-watched-moveis";
import { useGetWatchedMoviesList } from "../../hooks/use-get-watched-movies-list";
import { useGetWatchlist } from "../../hooks/use-get-watchlist";
import { useWatchlist } from "../../hooks/use-watchlist";
import TurnedInIcon from "@mui/icons-material/TurnedIn";
import TurnedInNotOutlinedIcon from "@mui/icons-material/TurnedInNotOutlined";

export const MovieCard = (props: SearchMovie | WatchedMoviesItems) => {
  const { id: movieId, poster_path, title } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { watchedMovies } = useGetWatchedMoviesList();
  const listOfWatchedMovies = watchedMovies?.results.map(
    (results) => results.id
  );

  const alreadyWatched = listOfWatchedMovies?.includes(movieId) ?? true;

  const handleOnMovieClick = () => {
    setIsModalOpen(true);
  };

  const handleOnClose = () => {
    setIsModalOpen(false);
  };

  const { addMovieToWatchedList, isLoading: isAddingToWatchedList } =
    useAddWatchedMovies();

  const handleAddToWatchedList = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (alreadyWatched) return;
    addMovieToWatchedList(movieId);
  };

  const { updateMovieToWatchlist } = useWatchlist();

  const { watchlist } = useGetWatchlist();

  const isInWatchlist =
    watchlist?.results.some((movie) => movie.id === movieId) ?? false;

  const handleAddToWatchlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInWatchlist) {
      // Remove from watchlist
      updateMovieToWatchlist(movieId, false);
      return;
    }
    // Add to watchlist
    updateMovieToWatchlist(movieId, true);
  };

  return (
    <>
      <Card className={styles.card} onClick={handleOnMovieClick}>
        <CardMedia
          className={styles.cardImage}
          component='img'
          image={
            poster_path
              ? `https://image.tmdb.org/t/p/w500/${poster_path}`
              : FALLBACK_IMAGE
          }
          alt={title}
        />
        <Box className={styles.overlay}>
          <Typography
            variant='subtitle1'
            fontFamily='sans-serif'
            textAlign={"center"}
          >
            {title}
          </Typography>
          <Stack direction='row' spacing={1} justifyContent='center'>
            <Button
              variant='contained'
              color='primary'
              size='small'
              onClick={handleAddToWatchedList}
              disabled={isAddingToWatchedList || alreadyWatched}
            >
              {alreadyWatched
                ? "Watched"
                : isAddingToWatchedList
                ? "Adding..."
                : "Add to Watched"}
              {}
            </Button>

            {isInWatchlist ? (
              <IconButton
                color='primary'
                size='small'
                onClick={handleAddToWatchlist}
              >
                <TurnedInIcon />
              </IconButton>
            ) : (
              <IconButton
                color='primary'
                size='small'
                onClick={handleAddToWatchlist}
                title='Add to Watchlist'
              >
                <TurnedInNotOutlinedIcon />
              </IconButton>
            )}
          </Stack>
        </Box>
      </Card>

      <MovieModal
        isModalOpen={isModalOpen}
        movieId={movieId}
        onClose={handleOnClose}
      />
    </>
  );
};
