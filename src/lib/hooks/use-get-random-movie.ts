import { MOVIES_KEY_WORDS } from "../components/constants/MoviesKeyWords";

export const GetRandomMovie = () => {
  const moviesList = MOVIES_KEY_WORDS;
  const randomMovie = moviesList[Math.floor(Math.random() * moviesList.length)];

  return randomMovie;
};
