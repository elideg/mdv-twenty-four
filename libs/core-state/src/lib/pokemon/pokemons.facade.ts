import { Injectable } from '@angular/core';

import { Action, select, Store } from '@ngrx/store';

import * as fromPokemons from './pokemons.reducer';
import * as pokemonsActions from './pokemons.actions';
import * as pokemonsSelectors from './pokemons.selectors';
import { Pokemon } from '@mdv-twenty-four/core-data';

@Injectable({
  providedIn: 'root'
})
export class PokemonsFacade {
  allPokemons$ = this.store.pipe(select(pokemonsSelectors.selectAllPokemons));
  selectedPokemon$ = this.store.pipe(select(pokemonsSelectors.selectPokemon));
  pokemonLoading$ = this.store.pipe(select(pokemonsSelectors.selectPokemonsLoading));
  // getPokemonInState = this.store.pipe(select())

  constructor(private store: Store<fromPokemons.PokemonsPartialState>) {}

  selectPokemon(selectedPokemonId: string) {
    this.dispatch(pokemonsActions.pokemonSelected({ selectedPokemonId }));
  }

  loadPokemons() {
    this.dispatch(pokemonsActions.loadPokemons());
  }

  createPokemon(pokemon: Pokemon) {
    this.dispatch(pokemonsActions.createPokemon({ pokemon }));
  }

  updatePokemon(pokemon: Pokemon) {
    this.dispatch(pokemonsActions.updatePokemon({ pokemon }));
  }

  deletePokemon(pokemon: Pokemon) {
    this.dispatch(pokemonsActions.deletePokemon({ pokemon }));
  }

  private dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
