import { WatchedMoviesItems } from "../../types/types";
import { MovieGrid } from "../movie-grid/MovieGrid";

export const WatchedMovies = ({
  watchedMoviesList,
}: {
  watchedMoviesList: WatchedMoviesItems[];
}) => {
  return <MovieGrid movies={watchedMoviesList} />;
};
