export interface MovieAPI {
  Poster: string,
  Title: string,
  Type: string,
  Year: string,
  imdbID: string,
}

export interface MovieList extends Object{
  Search: MovieAPI[],
  totalResults: string;
}