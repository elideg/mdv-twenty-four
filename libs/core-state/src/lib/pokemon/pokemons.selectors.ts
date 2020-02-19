import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
  POKEMONS_FEATURE_KEY,
  pokemonsAdapter,
  PokemonsPartialState,
  PokemonsState
} from './pokemons.reducer';

// Lookup the 'Pokemons' feature state managed by NgRx
export const selectPokemonsState = createFeatureSelector<
  PokemonsPartialState,
  PokemonsState
>(POKEMONS_FEATURE_KEY);

const { selectAll, selectEntities } = pokemonsAdapter.getSelectors();

export const selectPokemonsLoading = createSelector(
  selectPokemonsState,
  (state: PokemonsState) => state.isLoading
);

export const selectAllPokemons = createSelector(
  selectPokemonsState,
  (state: PokemonsState) => selectAll(state)
);

export const selectPokemonsEntities = createSelector(
  selectPokemonsState,
  (state: PokemonsState) => selectEntities(state)
);

export const selectPokemonId = createSelector(
  selectPokemonsState,
  (state: PokemonsState) => state.selectedPokemonId
);

export const selectPokemon = createSelector(
  selectPokemonsEntities,
  selectPokemonId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
