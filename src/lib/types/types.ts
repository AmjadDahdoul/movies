export interface SearchMovie {
  adult: boolean;
  backdrop: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MovieDetails extends SearchMovie {
  backdrop_path: string;
  // belongs_to_collection: null; // Will get back to it later
  budget: number;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string;
  imdb_id: string;
  origin_country: string[];
  revenue: number;
  runtime: number;
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
}

export interface WatchedMoviesItems {
  backdrop_path: string;
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  adult: boolean;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface WatchedMoviesList {
  created_by: string;
  description: string;
  favorite_count: number;
  iso_639_1: string;
  item_count: number;
  items: WatchedMoviesItems[];
  name: string;
  page: number;
  poster_path: string | null;
  total_pages: number;
  total_results: number;
}
