import { ActionReducerMap } from '@ngrx/store';

import * as fromPokemon from './pokemon/pokemons.reducer';

export interface AppState {
  pokemons: fromPokemon.PokemonsState;
}

export const reducers: ActionReducerMap<AppState> = {
  pokemons: fromPokemon.reducer,
};

//---------------------------------------
// Common Selectors
//---------------------------------------
