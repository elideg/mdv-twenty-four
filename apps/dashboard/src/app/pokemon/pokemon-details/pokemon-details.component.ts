import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { Pokemon } from '@mdv-twenty-four/core-data';

@Component({
  selector: 'mdv-twenty-four-pokemons-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss']
})
export class PokemonDetailsComponent implements OnInit {
  originalName;
  currentPokemon: Pokemon

  @Output() saved = new EventEmitter;
  @Output() cancelled = new EventEmitter;
  @Input() form: FormGroup;
  @Input() set pokemon(value) {
    if (value) this.originalName = value.name;
    this.currentPokemon = Object.assign({}, value)
  }
  
  constructor() {}

  ngOnInit() {
    this.form.patchValue(this.currentPokemon);
  }

  save(pokemon: Pokemon) {
    this.saved.emit(pokemon);
  }

  cancel() {
    this.cancelled.emit();
  }

  saveForm(formDirective: FormGroupDirective) {
    this.saved.emit(formDirective)
    formDirective.resetForm()
  }
}
