import { Component, Input } from '@angular/core';
import { MovieService } from '../../services/movie/movie.service';
import { FormControl } from '@angular/forms';
import { MovieTypes } from '../../models/moviesTypes';

@Component({
  selector: 'app-input-filter-year',
  templateUrl: './input-filter-year.component.html'
})
export class InputFilterYearComponent {
  @Input() filterControl: FormControl = new FormControl();
  @Input() searchControl: FormControl = new FormControl();
  types = MovieTypes;

  constructor(
    private filmeService: MovieService
  ) { }

  ngOnInit(): void {
    this.filterControl.valueChanges.subscribe(
      (year: string) => { 
        this.filmeService.filterYear = year;
        this.searchControl.enable();
      }
    )
  }
}
