import { Box, Card, CardMedia, Modal, Stack, Typography } from "@mui/material";
import styles from "./MovieCard.module.scss";
import { useState } from "react";
import { useGetMovieDetails } from "../../hooks/use-get-movie-details";

interface MovieCardProps {
  imgPoster: string;
  title: string;
  aka: string;
  imdbId: string;
}

export const MovieCard = (props: MovieCardProps) => {
  const { imgPoster, title, aka, imdbId } = props;
  const [movieId, setMovieId] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOnMovieClick = () => {
    setMovieId(imdbId);
    setIsModalOpen(true);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const { movieDetails } = useGetMovieDetails({ movieId });

  console.log(movieDetails);

  return (
    <>
      <Card className={styles.card} onClick={handleOnMovieClick}>
        <CardMedia
          className={styles.cardImage}
          component='img'
          image={imgPoster}
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

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Box sx={style}>
          <Stack spacing={3} direction='row'>
            <img
              src={movieDetails?.short?.image}
              alt={title}
              width={300}
              height={300}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space",
              }}
            >
              <Typography variant='h6'>
                {movieDetails?.short?.duration}
              </Typography>

              <Typography variant='h6'>
                {movieDetails?.short?.description}
              </Typography>
              {movieDetails?.short?.actor.map((actor, index) => (
                <Typography key={index} variant='h6'>
                  {actor.name}
                </Typography>
              ))}
            </Box>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};
