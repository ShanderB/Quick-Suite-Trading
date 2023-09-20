import { Component, Sanitizer } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

import { FilmeService } from './filme.service';
import { FilmeAPI } from './models/filmeAPI';
import { FilmeResponse } from './models/filmeResponse';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from './modal/modal.component';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  searchControl: FormControl = new FormControl();
  filmes$: Observable<any[]> = new Observable();
  filmeSelecionado$: Observable<any> = new Observable();
  private readonly unsubscribe$ = new Subject<void>();

  constructor(
    private filmeService: FilmeService,
    private dialog: MatDialog
  ) { }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit() {
    this.filmes$ = this.searchControl.valueChanges
      .pipe(
        takeUntil(this.unsubscribe$),
        switchMap(
          filmeNome => this.filmeService.fetchListaFilmesPorNome(filmeNome)
        ),
        map((res: any) => res.Search)
      );
  }

  onFilmeSelecionado(filme: FilmeAPI) {
    this.filmeService.fetchFilmePorId(filme.imdbID).subscribe((item: FilmeResponse) => {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.height = '400px'
      dialogConfig.width = '600px'
      dialogConfig.data = item
      this.dialog.open(ModalComponent, dialogConfig);

      
      // this.filmeSelecionado$ = 
    });
  }

}
