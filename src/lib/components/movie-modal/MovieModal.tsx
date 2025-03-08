import {
  Box,
  Chip,
  Container,
  Divider,
  IconButton,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { useGetMovieDetails } from "../../hooks/use-get-movie-details";
import { MovieLoadingSkeleton } from "./MovieLoadingSkeleton";

interface MovieModalProps {
  isModalOpen: boolean;
  movieId: string;
  onClose: () => void;
}

export const MovieModal = (props: MovieModalProps) => {
  const { movieId, isModalOpen, onClose } = props;

  const { movieDetails, isLoading } = useGetMovieDetails({ movieId });
  const movie = movieDetails?.short;

  const renderDuration = () => {
    return movie?.duration ? (
      <Stack direction='row' spacing={1} alignItems='center'>
        <AccessTimeIcon fontSize='small' color='action' />
        <Typography variant='subtitle1' color='text.secondary'>
          {movie.duration.slice(2)}
        </Typography>
      </Stack>
    ) : null;
  };

  const renderReleaseYear = () => {
    return movie?.datePublished ? (
      <Stack direction='row' spacing={1} alignItems='center'>
        <CalendarTodayIcon fontSize='small' color='action' />
        <Typography variant='subtitle1' color='text.secondary'>
          {new Date(movie.datePublished).getFullYear()}
        </Typography>
      </Stack>
    ) : null;
  };

  const renderDescription = () => {
    return movie?.description ? (
      <Typography
        variant='body1'
        sx={{ mt: 1 }}
        id='movie-modal-description'
        dangerouslySetInnerHTML={{
          __html: movie?.description || "",
        }}
      />
    ) : null;
  };

  const renderMovieTitle = () => {
    return movie?.name ? (
      <Typography
        variant='h4'
        component='h2'
        id='movie-modal-title'
        sx={{
          fontWeight: "bold",
          color: "primary.main",
        }}
      >
        {movie.name}
      </Typography>
    ) : null;
  };

  const renderGenres = () => {
    return movie?.genre ? (
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {Array.isArray(movie.genre) ? (
          movie.genre.map((genre, index) => (
            <Chip
              key={index}
              label={genre}
              size='small'
              color='primary'
              variant='outlined'
            />
          ))
        ) : (
          <Chip
            label={movie.genre}
            size='small'
            color='primary'
            variant='outlined'
          />
        )}
      </Box>
    ) : null;
  };

  const renderRating = () => {
    return movie?.aggregateRating ? (
      <Box
        sx={{
          borderRadius: "50%",
          bgcolor: "rgba(0,0,0,0.7)",
          width: 70,
          height: 70,
          padding: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
          boxShadow: 2,
        }}
      >
        {movie.aggregateRating.ratingValue}/10
      </Box>
    ) : null;
  };

  const renderPoster = () => {
    return (
      <Box
        sx={{
          width: { xs: "100%", md: 300 },
          height: "auto",
          position: "relative",
        }}
      >
        <Box
          component='img'
          src={movie?.image}
          alt={movie?.name || "Movie poster"}
          sx={{
            width: "100%",
            maxWidth: "300px",
            height: "auto",
            objectFit: "cover",
            borderRadius: "12px",
            boxShadow: 3,
          }}
          onError={(e) => {
            e.currentTarget.src = "/placeholder-movie.jpg";
          }}
        />
        {renderRating()}
      </Box>
    );
  };

  const renderCast = () => {
    return movie?.actor &&
      Array.isArray(movie.actor) &&
      movie.actor.length > 0 ? (
      <Box sx={{ mt: 2 }}>
        <Typography variant='h6' sx={{ mb: 1, fontWeight: "bold" }}>
          Cast
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {movie.actor.map((actor, index) => (
            <Chip
              key={index}
              label={actor.name}
              sx={{
                bgcolor: "action.hover",
                "&:hover": {
                  bgcolor: "action.selected",
                },
              }}
            />
          ))}
        </Box>
      </Box>
    ) : null;
  };

  const renderDirector = () => {
    return movie?.director ? (
      <Box sx={{ mt: 2 }}>
        <Typography variant='h6' sx={{ mb: 1, fontWeight: "bold" }}>
          Director
        </Typography>
        <Typography variant='body1'>
          {Array.isArray(movie.director)
            ? movie.director.map((d) => d.name).join(", ")
            : movie.director.name}
        </Typography>
      </Box>
    ) : null;
  };

  const renderMetadata = () => {
    return (
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        alignItems={{ xs: "flex-start", sm: "center" }}
      >
        {renderDuration()}
        {renderReleaseYear()}
        {renderGenres()}
      </Stack>
    );
  };

  const renderMovieContent = () => {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          gap: 2,
          width: "100%",
        }}
      >
        {renderMovieTitle()}
        {renderMetadata()}
        <Divider sx={{ my: 1 }} />
        {renderDescription()}
        {renderCast()}
        {renderDirector()}
      </Box>
    );
  };

  return (
    <Modal
      open={isModalOpen}
      onClose={onClose}
      aria-labelledby='movie-modal-title'
      aria-describedby='movie-modal-description'
    >
      <Container
        maxWidth='md'
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: { xs: 2, sm: 4 },
          maxHeight: "90vh",
          overflowY: "auto",
          borderRadius: 2,
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "text.secondary",
          }}
          aria-label='close'
        >
          <CloseIcon />
        </IconButton>

        {isLoading ? (
          <MovieLoadingSkeleton />
        ) : (
          <Stack
            spacing={3}
            direction={{ xs: "column", md: "row" }}
            alignItems={{ xs: "center", md: "flex-start" }}
          >
            {renderPoster()}
            {renderMovieContent()}
          </Stack>
        )}
      </Container>
    </Modal>
  );
};
