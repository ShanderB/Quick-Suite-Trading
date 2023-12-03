import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subject, first, map, switchMap, takeUntil } from 'rxjs';
import { MovieAPI, MovieList } from '../models/filmeAPI';
import { MovieService } from '../filme.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { MovieResponse } from '../models/filmeResponse';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  filmes$: Observable<MovieAPI[]> = new Subject();
  @Input() searchControl: FormControl = new FormControl();
  private readonly unsubscribe$ = new Subject<void>();

  constructor(
    private filmeService: MovieService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    /* Ao iniciar, ficará olhando o searchBox de título.
       Quando for escrito algo, fará o request puxando os filmes.
       Estou filtrando para remover todos os filmes sem poster para não deixar os cards brancos,
       ou ficar quebrando o código.*/
    this.filmes$ = this.searchControl.valueChanges
      .pipe(
        takeUntil(this.unsubscribe$),
        switchMap((movieName: string) => this.filmeService.fetchMovieListByName(movieName)),
        map((res: MovieList) => res?.Search?.filter(movieName => movieName?.Poster != "N/A"))
      ); 
  }

  /* Ao clicar no card, é feito o request para abrir
     a modal contendo os dados do filme.*/
  onFilmeSelecionado(filme: MovieAPI): void {
    this.filmeService
      .fetchMovieById(filme.imdbID)
      .pipe(first())
      .subscribe((item: MovieResponse) => {
        this.dialog.open(ModalComponent, {
          data: item
        });
      });
  }

}
