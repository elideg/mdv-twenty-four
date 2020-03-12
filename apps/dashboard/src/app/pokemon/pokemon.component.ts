import { PokemonsFacade } from '@mdv-twenty-four/core-state';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Pokemon } from '@mdv-twenty-four/core-data';
import { FormGroup, FormGroupDirective, Validators, FormBuilder } from '@angular/forms';
// import { metaReducers } from 'libs/core-state/src/lib/core-state.module';

@Component({
  selector: 'mdv-twenty-four-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {

  form: FormGroup;
  selectedPokemon$: Observable<Pokemon> = this.pokemonsFacade.selectedPokemon$;
  pokemons$: Observable<Pokemon[]> = this.pokemonsFacade.allPokemons$;

  constructor(
      private fb: FormBuilder,
      private pokemonsFacade: PokemonsFacade
  ) { }

  ngOnInit() {
      this.initForm();
      this.pokemonsFacade.loadPokemons();
  }

  selectPokemon(pokemon: Pokemon) {
      this.form.patchValue(pokemon);
      this.pokemonsFacade.selectPokemon(pokemon.id);
      // console.log(metaReducers);
  }

  cancel() {
      this.selectPokemon({ id: null } as Pokemon);
      this.form.reset();
  }

  savePokemon(formDirective: FormGroupDirective) {
      if (this.form.invalid) return;
      if (this.form.value.id) {
          this.pokemonsFacade.updatePokemon(this.form.value);
          this.selectPokemon({ id: null } as Pokemon);
      } else {
          this.pokemonsFacade.createPokemon(this.form.value);
          this.selectPokemon({ id: null } as Pokemon);
      }
  }

  deletePokemon(pokemon: Pokemon) {
      this.pokemonsFacade.deletePokemon(pokemon);
      this.form.reset();
  }

  initForm() {
    this.form = this.fb.group({
      id: [''],
      name: ['', Validators.compose([Validators.required])],
      height: ['', Validators.compose([Validators.required])],
      base_experience: ['', Validators.required],
      weight: ['', Validators.required]
    })
  }

}
