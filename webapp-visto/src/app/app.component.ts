import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';

import { FilmeAPI } from './models/filmeAPI';

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

  constructor(
  ) { }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
  }
}
