import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subject, first, map, switchMap, takeUntil } from 'rxjs';
import { MovieAPI, MovieList } from '../models/movieAPI';
import { MovieService } from '../services/movie/movie.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/movie-info/movie-info.component';
import { MovieResponse } from '../models/movieResponse';
import { FormControl } from '@angular/forms';
import { StorageService } from '../services/storage/storage.service';
import { StorageKey } from '../constants/constants';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  movies$: Observable<MovieAPI[]> = new Subject();
  @Input() searchControl: FormControl = new FormControl();
  private readonly unsubscribe$ = new Subject<void>();

  constructor(
    private movieService: MovieService,
    private dialog: MatDialog,
    private storage: StorageService
  ) { }

  ngOnInit(): void {
    this.movies$ = this.searchControl.valueChanges
      .pipe(
        takeUntil(this.unsubscribe$),
        switchMap((movieName: string) => this.movieService.fetchMovieListByName(movieName)),
        map((res: MovieList) => res?.Search?.filter(movieName => movieName?.Poster != "N/A"))
      );
  }

  onMovieSelected(movie: MovieAPI): void {
    this.movieService
      .fetchMovieById(movie.imdbID)
      .pipe(first())
      .subscribe((item: MovieResponse) => {
        this.dialog.open(ModalComponent, {
          data: item
        });
      });
  }

  onClickWatchList(movieId: MovieAPI): void {
    let actualStorage = this.storage.get(StorageKey);

    if (!actualStorage.find((storedMovieId: any) => storedMovieId.imdbID == movieId.imdbID)) {
      this.storage.set(StorageKey, [...actualStorage, movieId])
    } else {
      this.storage.set(StorageKey, actualStorage.filter((item: any) => item.imdbID != movieId.imdbID))
    }
  }

  isOnWatchlist(movieId: MovieAPI): boolean {
    if (!this.storage.get(StorageKey).find((storedMovieId: any) => storedMovieId.imdbID == movieId.imdbID)) return false;
    return true;
  }
}
