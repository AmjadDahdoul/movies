import { Box, Button, Card, CardMedia, Typography } from "@mui/material";
import styles from "./MovieCard.module.scss";
import { SearchMovie, WatchedMoviesItems } from "../../types/types";
import { FALLBACK_IMAGE, MovieModal } from "../movie-modal/MovieModal";
import { useState } from "react";
import { useAddWatchedMovies } from "../../hooks/use-add-watched-moveis";
import { useGetWatchedMoviesList } from "../../hooks/use-get-watched-movies-list";

export const MovieCard = (props: SearchMovie | WatchedMoviesItems) => {
  const { id: movieId, poster_path, title, original_title } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { watchedMovies } = useGetWatchedMoviesList();
  const listOfWatchedMovies = watchedMovies?.items.map((item) => item.id);

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
            {original_title}
          </Typography>
          <Button
            variant='contained'
            color='primary'
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
