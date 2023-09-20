import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

import { FilmeService } from './filme.service';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
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
    public dialog: MatDialog
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

}
