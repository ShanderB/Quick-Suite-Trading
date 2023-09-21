import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FilmeService } from 'src/app/filme.service';
import { FilmesTipos } from 'src/app/models/filmesTipos';

@Component({
  selector: 'app-input-filter',
  templateUrl: './input-filter.component.html',
  styleUrls: ['../input.component.scss']
})
export class InputFilterComponent implements OnInit {
  @Input() filterControl: FormControl = new FormControl();
  @Input() searchControl: FormControl = new FormControl();
  tipos = FilmesTipos;

  constructor(
    private filmeService: FilmeService
  ) { }

  ngOnInit(): void {
    this.filterControl.valueChanges.subscribe(
      (tipo: string) => { 
        this.filmeService.filter = tipo;
        this.searchControl.enable();
      }
    )
  }
}
