import { Component, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';

import { MovieAPI } from './models/movieAPI';
import { MatDialog } from '@angular/material/dialog';
import { WatchListModalComponent } from './modal/watch-list/watch-list.component';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  searchControl: FormControl = new FormControl();
  filterTypeControl: FormControl = new FormControl();
  filterYearControl: FormControl = new FormControl();
  filmes$: Observable<MovieAPI[]> = new Subject();
  private readonly unsubscribe$ = new Subject<void>();

  constructor(
    private dialog: MatDialog,
  ) { }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  openWatchList(): void {
    this.dialog.open(WatchListModalComponent);
    console.log('a')
  }
}
