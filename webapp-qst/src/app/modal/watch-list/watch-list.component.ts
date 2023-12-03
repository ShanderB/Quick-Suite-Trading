import { Component, OnInit } from '@angular/core';
import { MovieAPI } from 'src/app/models/movieAPI';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-watch-list',
  templateUrl: './watch-list.component.html'
})
export class WatchListModalComponent implements OnInit {
  watchListedMovies: MovieAPI[];

  constructor(
    private storage: StorageService
  ) { }

  ngOnInit() {
    this.watchListedMovies = this.storage.get('watchList')
  }
}
