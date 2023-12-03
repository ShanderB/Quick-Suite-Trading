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

  /* Ao clicar no X(limpar filtro), emite um evendo contendo valor vazio.
     Setar qualquer tipo de valor é sanitizado em string. Caso null ou undefined (por exemplo)
     ele buscará os filmes contendo esses termos. 
     Setando como vazio, ele não puxa nada.*/
  clearSearch() {
    this.searchControl.patchValue("");
  }

}
