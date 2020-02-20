import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Pokemon } from '@mdv-twenty-four/core-data';

@Component({
  selector: 'mdv-twenty-four-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})

export class PokemonListComponent implements OnInit {
  pageIndex = 0;
  pageSize = 5;
  lowValue = 0;
  highValue = 5;

  @Input() pokemons: Pokemon[];
  @Output() selected = new EventEmitter;
  @Output() deleted = new EventEmitter;

  constructor() { }

  ngOnInit() {
  }

  select(pokemon: Pokemon) {
    this.selected.emit(pokemon);
  }

  delete(pokemon: Pokemon) {
    this.deleted.emit(pokemon);
  }

  getPaginatorData(event){
    if(event.pageIndex === this.pageIndex + 1){
        this.lowValue = this.lowValue + this.pageSize;
        this.highValue =  this.highValue + this.pageSize;
    }
    else if(event.pageIndex === this.pageIndex - 1){
      this.lowValue = this.lowValue - this.pageSize;
      this.highValue =  this.highValue - this.pageSize;
      }
      this.pageIndex = event.pageIndex;
  }
}
