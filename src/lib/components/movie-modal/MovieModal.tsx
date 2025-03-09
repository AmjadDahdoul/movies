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
  movieId: number;
  onClose: () => void;
}

// Define a fallback image constant
const FALLBACK_IMAGE = "/placeholder-movie.jpg";

export const MovieModal = (props: MovieModalProps) => {
  const { movieId, isModalOpen, onClose } = props;

  const { movieDetails, isLoading } = useGetMovieDetails({ movieId });

  const ratingColor = (rating: number) => {
    if (rating >= 7) {
      return "rgb(0, 126, 8, 0.6)";
    }
    if (rating >= 5) {
      return "rgba(255, 193, 7, 0.6)";
    }
    return "rgba(220, 0, 0, 0.6)";
  };

  const renderDuration = () => {
    return movieDetails?.runtime ? (
      <Stack direction='row' spacing={1} alignItems='center'>
        <AccessTimeIcon fontSize='small' color='action' />
        <Typography variant='subtitle1' color='text.secondary'>
          {Math.floor(movieDetails.runtime / 60)}h {movieDetails.runtime % 60}m
        </Typography>
      </Stack>
    ) : null;
  };

  const renderReleaseYear = () => {
    return movieDetails?.release_date ? (
      <Stack direction='row' spacing={1} alignItems='center'>
        <CalendarTodayIcon fontSize='small' color='action' />
        <Typography variant='subtitle1' color='text.secondary'>
          {new Date(movieDetails.release_date).getFullYear()}
        </Typography>
      </Stack>
    ) : null;
  };

  const renderDescription = () => {
    return movieDetails?.overview ? (
      <Typography variant='body1' sx={{ mt: 1 }} id='movie-modal-description'>
        {movieDetails.overview}
      </Typography>
    ) : null;
  };

  const renderMovieTitle = () => {
    return movieDetails?.title ? (
      <Typography
        variant='h4'
        component='h2'
        id='movie-modal-title'
        sx={{
          fontWeight: "bold",
          color: "primary.main",
        }}
      >
        {movieDetails.title}
      </Typography>
    ) : null;
  };

  const renderGenres = () => {
    return movieDetails?.genres && movieDetails.genres.length > 0 ? (
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {movieDetails.genres.map((genre) => (
          <Chip
            key={genre.id}
            label={genre.name}
            size='small'
            color='primary'
            variant='outlined'
          />
        ))}
      </Box>
    ) : null;
  };

  const renderRating = () => {
    return movieDetails?.vote_average ? (
      <Box
        sx={{
          borderRadius: "50%",
          bgcolor: ratingColor(movieDetails.vote_average),
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
        {movieDetails.vote_average.toFixed(1)}/10
      </Box>
    ) : null;
  };

  const renderPoster = () => {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Box
          component='img'
          src={
            movieDetails?.poster_path
              ? `https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`
              : FALLBACK_IMAGE
          }
          alt={movieDetails?.title || "Movie poster"}
          sx={{
            width: "100%",
            maxWidth: "300px",
            height: "auto",
            objectFit: "cover",
            borderRadius: "12px",
            boxShadow: 3,
          }}
          onError={(e) => {
            e.currentTarget.src = FALLBACK_IMAGE;
          }}
        />
        {renderRating()}
      </Box>
    );
  };

  // const renderCast = () => {
  //   return movieDetails?.credits?.cast && movieDetails.credits.cast.length > 0 ? (
  //     <Box sx={{ mt: 2 }}>
  //       <Typography variant='h6' sx={{ mb: 1, fontWeight: "bold" }}>
  //         Cast
  //       </Typography>
  //       <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
  //         {movieDetails.credits.cast.slice(0, 10).map((actor) => (
  //           <Chip
  //             key={actor.id}
  //             label={actor.name}
  //             sx={{
  //               bgcolor: "action.hover",
  //               "&:hover": {
  //                 bgcolor: "action.selected",
  //               },
  //             }}
  //           />
  //         ))}
  //       </Box>
  //     </Box>
  //   ) : null;
  // };

  // const renderDirector = () => {
  //   if (!movieDetails?.credits?.crew) return null;

  //   const directors = movieDetails.credits.crew.filter(
  //     (crewMember) => crewMember.job === "Director"
  //   );

  //   return directors.length > 0 ? (
  //     <Box sx={{ mt: 2 }}>
  //       <Typography variant='h6' sx={{ mb: 1, fontWeight: "bold" }}>
  //         Director
  //       </Typography>
  //       <Typography variant='body1'>
  //         {directors.map((director) => director.name).join(", ")}
  //       </Typography>
  //     </Box>
  //   ) : null;
  // };

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
        {/* {renderCast()} */}
        {/* {renderDirector()} */}
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
