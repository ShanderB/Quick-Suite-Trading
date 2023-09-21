import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { FilmeResponse } from './models/filmeResponse';
import { Observable } from 'rxjs/internal/Observable';
import { FilmeLista } from './models/filmeAPI';

@Injectable({
  providedIn: 'root'
})
export class FilmeService {
  private url: string = environment.URL + environment.apiKey;
  private _filter: string = '';

  public set filter(value: string) {
    this._filter = value;
  }
  constructor(private http: HttpClient) { }

  fetchListaFilmesPorNome(nomeFilme: string) {
    return this.http.get<FilmeLista>(`${this.url}&s=${nomeFilme}${this._filter?'&type='+this._filter:''}`);
  }

  fetchFilmePorId(filmeId: string): Observable<FilmeResponse>{
    return this.http.get<FilmeResponse>(`${this.url}&i=${filmeId}`);
  }


}
