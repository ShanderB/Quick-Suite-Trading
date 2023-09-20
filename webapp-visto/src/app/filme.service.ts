import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FilmeService {

  constructor(private http: HttpClient) { }

  fetchFilmePorNome(query: string) {
    return this.http.get(`https://www.omdbapi.com/?apikey=${environment.apiKey}&s=${query}`);
  }
}
