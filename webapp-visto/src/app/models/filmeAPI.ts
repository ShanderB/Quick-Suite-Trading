export interface FilmeAPI {
  Poster: string,
  Title: string,
  Type: string,
  Year: string,
  imdbID: string,
}

export interface FilmeLista extends Object{
  Search: FilmeAPI[],
  totalResults: string;
}