import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';

import { MovieAPI } from './models/movieAPI';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  searchControl: FormControl = new FormControl();
  filterTypeControl: FormControl = new FormControl();
  filterYearControl: FormControl = new FormControl();
  filmes$: Observable<MovieAPI[]> = new Subject();
  private readonly unsubscribe$ = new Subject<void>();

  constructor(
  ) { }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
  }
}
