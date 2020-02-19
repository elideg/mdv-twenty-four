import { ActionReducerMap } from '@ngrx/store';

import * as fromPokemon from './pokemon/pokemon.reducer';

export interface AppState {
  pokemons: fromPokemon.FeatureState;
}

export const reducers: ActionReducerMap<AppState> = {
  pokemons: fromPokemon.reducer,
};

//---------------------------------------
// Common Selectors
//---------------------------------------
