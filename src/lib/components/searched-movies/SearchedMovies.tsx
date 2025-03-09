import { SearchMovie } from "../../types/types";
import { MovieGrid } from "../movie-grid/MovieGrid";

export const SearchedMovies = ({
  searchedMovies,
}: {
  searchedMovies: SearchMovie[];
}) => {
  return <MovieGrid movies={searchedMovies} />;
};
