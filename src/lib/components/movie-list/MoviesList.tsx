import { Grid2, Stack, Typography } from "@mui/material";
import { useSearchParams } from "react-router";
import { useGetMovies } from "../../hooks/use-get-movies";
import { MovieCard } from "../movie-card/MovieCard";
import { MovieCardSkeleton } from "../movie-card/MovieCardSkeleton";

export const MoviesList = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  const { movies, isLoading } = useGetMovies(search || "");

  return (
    <Stack spacing={2} alignItems={"center"}>
      <Grid2 container spacing={2} justifyContent='center'>
        {isLoading ? (
          <MovieCardSkeleton count={8} />
        ) : movies.length === 0 && search ? (
          <Typography variant='h6'>
            No movies found matching "{search}"
          </Typography>
        ) : (
          movies.map((movie) => (
            <Grid2 size='auto' key={movie.id}>
              <MovieCard {...movie} />
            </Grid2>
          ))
        )}
      </Grid2>
    </Stack>
  );
};
