export interface Movie {
  title: string;
  actors: string[];
  aka: string;
  imdbId: string;
  imdbIv: string;
  imdbUrl: string;
  imgPoster: string;
  rank: number;
  year: number;
}

export interface MovieDetails {
  short: {
    name: string;
    description: string;
    image: string;
    duration: string;
    genres: string[];
    actor: {
      name: string;
    }[];
    datePublished: string;
    aggregateRating: {
      ratingValue: string;
    };
    genre: string;
    director: {
      name: string;
    };
  };
}
