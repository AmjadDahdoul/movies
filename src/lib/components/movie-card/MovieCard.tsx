import { Box, Card, CardMedia, Typography } from "@mui/material";
import styles from "./MovieCard.module.scss";

interface MovieCardProps {
  imgPoster: string;
  title: string;
  aka: string;
}

export const MovieCard = (props: MovieCardProps) => {
  const { imgPoster, title, aka } = props;

  return (
    <Card className={styles.card}>
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
  );
};
