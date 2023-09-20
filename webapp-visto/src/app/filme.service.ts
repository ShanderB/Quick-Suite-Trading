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
  url: string = environment.URL + environment.apiKey

  constructor(private http: HttpClient) { }

  fetchListaFilmesPorNome(nomeFilme: string) {
    return this.http.get<FilmeLista>(`${this.url}&s=${nomeFilme}`);
  }

  fetchFilmePorId(filmeId: string): Observable<FilmeResponse>{
    return this.http.get<FilmeResponse>(`${this.url}&i=${filmeId}`);
  }
}
