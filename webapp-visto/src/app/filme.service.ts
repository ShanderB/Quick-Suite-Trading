import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { FilmeResponse } from './models/filmeResponse';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class FilmeService {

  constructor(private http: HttpClient) { }

  fetchListaFilmesPorNome(nomeFilme: string) {
    return this.http.get(`https://www.omdbapi.com/?apikey=${environment.apiKey}&s=${nomeFilme}`);
  }

  fetchFilmePorId(filmeId: string): Observable<FilmeResponse>{
    return this.http.get<FilmeResponse>(`https://www.omdbapi.com/?apikey=${environment.apiKey}&i=${filmeId}`);
  }
}
