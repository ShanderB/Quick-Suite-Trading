import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

import { environment } from '../../../environments/environment';
import { MovieResponse } from '../../models/movieResponse';
import { MovieList } from '../../models/movieAPI';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private url: string = environment.URL + environment.apiKey;
  private _filterType: string = '';
  private _filterYear: string = '';

  public set filterType(value: string) {
    this._filterType = value;
  }

  public set filterYear(value: string) {
    this._filterYear = value;
  }

  constructor(private http: HttpClient) { }

  fetchMovieListByName(movieName: string) {
    return this.http.get<MovieList>(this.createFetchUrl(movieName));
  }

  fetchMovieById(movieId: string): Observable<MovieResponse>{
    return this.http.get<MovieResponse>(`${this.url}&i=${movieId}`);
  }
  
  private createFetchUrl(movieName: string): string{
    let urlQuery: string = `${this.url}&s=${movieName}`;

    if(this._filterType){
      urlQuery += ('&type='+ this._filterType)
    }
    if(this._filterYear){
      urlQuery += ('&y='+ this._filterYear)
    }

    return urlQuery;
  }
}
