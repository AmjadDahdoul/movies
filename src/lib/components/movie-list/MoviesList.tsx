import { Grid2, Stack, Typography } from "@mui/material";
import { useSearchParams } from "react-router";
import { MovieEnum } from "../../Enums/MovieEnum.enum";
import { useGetMovies } from "../../hooks/use-get-movies";
import { MovieCard } from "../movie-card/MovieCard";
import { MovieCardSkeleton } from "../movie-card/MovieCardSkeleton";

export const MoviesList = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");

  const { movies, isLoading } = useGetMovies(search || "");

  const formattedMovies = movies.map((movie) => ({
    imgPoster: movie[MovieEnum.IMG_POSTER],
    title: movie[MovieEnum.TITLE],
    aka: movie[MovieEnum.AKA],
    imdbId: movie[MovieEnum.IMDB_ID],
    year: movie[MovieEnum.YEAR],
  }));

  return (
    <Stack spacing={2} alignItems={"center"}>
      <Grid2 container spacing={2} justifyContent='center'>
        {isLoading ? (
          <MovieCardSkeleton count={8} />
        ) : formattedMovies.length === 0 && search ? (
          <Typography variant='h6'>
            No movies found matching "{search}"
          </Typography>
        ) : (
          formattedMovies.map((movie) => (
            <Grid2 size='auto' key={movie.imdbId}>
              <MovieCard {...movie} />
            </Grid2>
          ))
        )}
      </Grid2>
    </Stack>
  );
};
