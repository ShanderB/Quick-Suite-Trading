import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MovieService } from 'src/app/services/movie/movie.service';
import { MovieTypes } from 'src/app/models/moviesTypes';

@Component({
  selector: 'app-input-filter-type',
  templateUrl: './input-filter.component.html',
  styleUrls: ['../input.component.scss']
})
export class InputFilterComponent implements OnInit {
  @Input() filterControl: FormControl = new FormControl();
  @Input() searchControl: FormControl = new FormControl();
  types = MovieTypes;

  constructor(
    private filmeService: MovieService
  ) { }

  ngOnInit(): void {
    /* Observar a searchBox de filtro.
    Caso seja alterado o tipo da mídia, emite um evento para que possa fazer o request baseado nos filtros de título e tipo. */
    this.filterControl.valueChanges.subscribe(
      (tipo: string) => { 
        this.filmeService.filterType = tipo;
        this.searchControl.enable();
      }
    )
  }
}
