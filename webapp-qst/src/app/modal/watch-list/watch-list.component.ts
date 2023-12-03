import { Component, OnInit } from '@angular/core';
import {  MatDialogRef } from '@angular/material/dialog';
import { MovieAPI } from 'src/app/models/movieAPI';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-watch-list',
  templateUrl: './watch-list.component.html',
  styleUrls: ['./watch-list.component.scss']
})
export class WatchListModalComponent implements OnInit {
  watchListedMovies: MovieAPI[];
  
  constructor(
    private dialogRef: MatDialogRef<WatchListModalComponent>,
    private storage: StorageService
  ) { }

  ngOnInit(){
    this.watchListedMovies = this.storage.get('watchList')
    console.log(this.watchListedMovies)
  }

  close() {
    this.dialogRef.close();
  }

}
