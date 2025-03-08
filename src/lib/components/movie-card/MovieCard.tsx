import { Box, Card, CardMedia, Typography } from "@mui/material";
import styles from "./MovieCard.module.scss";
import { useState } from "react";
import { MovieModal } from "../movie-modal/MovieModal";

interface MovieCardProps {
  imgPoster: string;
  title: string;
  aka: string;
  imdbId: string;
}

export const FALLBACK_IMAGE =
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExazdzdG15cHBrdDJ5dWNxZGNibjNkdnFuZmNjdzh3b3pmM3BjZmcweSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l44QvKoQuUD3xPZKg/giphy.gif";

export const MovieCard = (props: MovieCardProps) => {
  const { imgPoster, title, aka, imdbId } = props;
  const [movieId, setMovieId] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOnMovieClick = () => {
    setMovieId(imdbId);
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
          image={imgPoster || FALLBACK_IMAGE}
          alt={title}
        />
        <Box className={styles.overlay}>
          <Typography
            variant='subtitle1'
            fontFamily='sans-serif'
            textAlign={"center"}
          >
            {aka}
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
