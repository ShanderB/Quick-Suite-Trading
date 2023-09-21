import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FilmesTipos } from 'src/app/models/filmesTipos';

@Component({
  selector: 'app-input-filter',
  templateUrl: './input-filter.component.html',
  styleUrls: ['../input.component.scss']
})
export class InputFilterComponent implements OnInit {
  @Input() filterControl: FormControl = new FormControl();
  tipos = FilmesTipos;

  constructor() { }

  ngOnInit(): void {
  }

}
