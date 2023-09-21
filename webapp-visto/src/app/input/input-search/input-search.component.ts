import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['../input.component.scss']
})
export class InputSearchComponent implements OnInit {
  @Input() searchControl: FormControl = new FormControl();
  @Input() displayClear: boolean = false;


  constructor() { }

  ngOnInit(): void {
  }

  clearSearch() {
    this.searchControl.patchValue("");
  }

}
