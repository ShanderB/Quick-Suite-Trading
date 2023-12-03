import { Component, Input } from '@angular/core';
import { MovieService } from '../../services/movie/movie.service';
import { FormControl } from '@angular/forms';
import { FilmesTipos } from '../../models/moviesTypes';

@Component({
  selector: 'app-input-filter-year',
  templateUrl: './input-filter-year.component.html',
  styleUrls: ['./input-filter-year.component.scss']
})
export class InputFilterYearComponent {
  @Input() filterControl: FormControl = new FormControl();
  @Input() searchControl: FormControl = new FormControl();
  tipos = FilmesTipos;

  constructor(
    private filmeService: MovieService
  ) { }

  ngOnInit(): void {
    /* Observar a searchBox de filtro.
    Caso seja alterado o tipo da mídia, emite um evento para que possa fazer o request baseado nos filtros de título e tipo. */
    this.filterControl.valueChanges.subscribe(
      (year: string) => { 
        this.filmeService.filterYear = year;
        this.searchControl.enable();
      }
    )
  }

  handleSelection(event: any){
    console.log(event)
  }

}
