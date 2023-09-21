import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { first, map, switchMap, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

import { FilmeService } from './filme.service';
import { FilmeAPI, FilmeLista } from './models/filmeAPI';
import { FilmeResponse } from './models/filmeResponse';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from './modal/modal.component';
import { FilmesTipos } from './models/filmesTipos';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  searchControl: FormControl = new FormControl();
  filterControl: FormControl = new FormControl();
  filmes$: Observable<FilmeAPI[]> = new Subject();
  private readonly unsubscribe$ = new Subject<void>();
  tipos = FilmesTipos;

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

    this.filterControl.valueChanges.subscribe(
      (tipo: string) => { 
        this.filmeService.filter = tipo;
        this.searchControl.enable();
      }
    )

    //! REMOVER ISSO. USADO APENAS PARA EVITAR FICAR ESCREVENDO
    //!
    //!
    //!
    //!
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
}
