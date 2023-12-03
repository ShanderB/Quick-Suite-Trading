import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subject, first, map, switchMap, takeUntil } from 'rxjs';
import { FilmeAPI, FilmeLista } from '../models/filmeAPI';
import { MovieService } from '../filme.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { FilmeResponse } from '../models/filmeResponse';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  filmes$: Observable<FilmeAPI[]> = new Subject();
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
        switchMap((filmeNome: string) => this.filmeService.fetchMovieListByName(filmeNome)),
        map((res: FilmeLista) => res?.Search?.filter(filme => filme?.Poster != "N/A"))
      ); 
  }

  /* Ao clicar no card, é feito o request para abrir
     a modal contendo os dados do filme.*/
  onFilmeSelecionado(filme: FilmeAPI): void {
    this.filmeService
      .fetchMovieById(filme.imdbID)
      .pipe(first())
      .subscribe((item: FilmeResponse) => {
        this.dialog.open(ModalComponent, {
          data: item
        });
      });
  }

}
