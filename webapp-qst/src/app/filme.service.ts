import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { FilmeResponse } from './models/filmeResponse';
import { Observable } from 'rxjs/internal/Observable';
import { FilmeLista } from './models/filmeAPI';

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

  fetchMovieListByName(nomeFilme: string) {
    return this.http.get<FilmeLista>(this.createFetchUrl(nomeFilme));
  }

  fetchMovieById(filmeId: string): Observable<FilmeResponse>{
    return this.http.get<FilmeResponse>(`${this.url}&i=${filmeId}`);
  }
  
  private createFetchUrl(nomeFilme: string): string{
    let urlQuery: string = `${this.url}&s=${nomeFilme}`;

    if(this._filterType){
      urlQuery += ('&type='+ this._filterType)
    }
    if(this._filterYear){
      urlQuery += ('&y='+ this._filterYear)
    }
    console.log(urlQuery)
    return urlQuery;
  }
}
