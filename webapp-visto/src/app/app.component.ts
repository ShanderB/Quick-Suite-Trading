import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

import { FilmeService } from './filme.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent  {
  searchControl: FormControl = new FormControl();
  filmes$: Observable<any[]> = new Observable();
  private readonly unsubscribe$ = new Subject<void>();

  constructor(private filmeService: FilmeService) {}

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit() {
    this.filmes$ = this.searchControl.valueChanges
      .pipe(
        takeUntil(this.unsubscribe$),
        switchMap(
          searchString => this.filmeService.fetchFilmePorNome(searchString)
        ),
        map((res:any) => res.Search)
      );

  }

}
