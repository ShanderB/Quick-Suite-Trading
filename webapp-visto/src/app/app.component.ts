import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { first, map, switchMap, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

import { FilmeService } from './filme.service';
import { FilmeAPI, FilmeLista } from './models/filmeAPI';
import { FilmeResponse } from './models/filmeResponse';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from './modal/modal.component';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  searchControl: FormControl = new FormControl();
  filmes$: Observable<FilmeAPI[]> = new Observable();
  private readonly unsubscribe$ = new Subject<void>();

  constructor(
    private filmeService: FilmeService,
    private dialog: MatDialog
  ) { }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.filmes$ = this.searchControl.valueChanges
      .pipe(
        takeUntil(this.unsubscribe$),
        switchMap((filmeNome: string) => this.filmeService.fetchListaFilmesPorNome(filmeNome)),
        map((res: FilmeLista) => res?.Search?.filter(filme => filme?.Poster != "N/A"))
      );
    this.searchControl.patchValue("test");

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

  clearSearch() {
    this.searchControl.patchValue("");
  }
}
