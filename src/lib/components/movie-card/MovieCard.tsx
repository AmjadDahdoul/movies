import { Box, Card, CardMedia, Typography } from "@mui/material";
import styles from "./MovieCard.module.scss";
import { SearchMovie } from "../../types/types";
import { MovieModal } from "../movie-modal/MovieModal";
import { useState } from "react";

export const MovieCard = (props: SearchMovie) => {
  const { id: movieId, poster_path, title, original_title } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOnMovieClick = () => {
    setIsModalOpen(true);
  };

  const handleOnClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Card className={styles.card} onClick={handleOnMovieClick}>
        <CardMedia
          className={styles.cardImage}
          component='img'
          image={`https://image.tmdb.org/t/p/w500/${poster_path}`}
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
