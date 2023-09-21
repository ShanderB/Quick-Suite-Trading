import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subject, first, map, switchMap, takeUntil } from 'rxjs';
import { FilmeAPI, FilmeLista } from '../models/filmeAPI';
import { FilmeService } from '../filme.service';
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
    private filmeService: FilmeService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.filmes$ = this.searchControl.valueChanges
      .pipe(
        takeUntil(this.unsubscribe$),
        switchMap((filmeNome: string) => this.filmeService.fetchListaFilmesPorNome(filmeNome)),
        map((res: FilmeLista) => res?.Search?.filter(filme => filme?.Poster != "N/A"))
      ); 
  }

  onFilmeSelecionado(filme: FilmeAPI): void {
    this.filmeService
      .fetchFilmePorId(filme.imdbID)
      .pipe(first())
      .subscribe((item: FilmeResponse) => {
        this.dialog.open(ModalComponent, {
          data: item
        });
      });
  }

}
