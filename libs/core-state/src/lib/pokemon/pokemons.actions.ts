import { createAction, props } from '@ngrx/store';

import { Pokemon } from '@mdv-twenty-four/core-data';

export const pokemonSelected = createAction(
  '[POKEMON] Pokemon Selected',
  props<{ selectedPokemonId: string }>()
);

// Load Actions
export const loadPokemons = createAction('[POKEMON] Load Pokemons');

export const pokemonsLoadedFromStorage = createAction(
  '[POKEMON] Pokemons Loaded From Local Storage',
  props<{ pokemons: Pokemon[] }>()
);

export const pokemonsLoadedFromService = createAction(
  '[POKEMON] Pokemons Loaded From Service',
  props<{ pokemons: Pokemon[] }>()
);

// Create Actions
export const createPokemon = createAction(
  '[POKEMON] Create Pokemon',
  props<{ pokemon: Pokemon }>()
);

export const pokemonCreated = createAction(
  '[POKEMON] Pokemon Created',
  props<{ pokemon: Pokemon }>()
);

// Update Actions
export const updatePokemon = createAction(
  '[POKEMON] Update Pokemon',
  props<{ pokemon: Pokemon }>()
);

export const pokemonUpdated = createAction(
  '[POKEMON] Pokemon Updated',
  props<{ pokemon: Pokemon }>()
);

// Delete Actions
export const deletePokemon = createAction(
  '[POKEMON] Delete Pokemon',
  props<{ pokemon: Pokemon }>()
);

export const pokemonDeleted = createAction(
  '[POKEMON] Pokemon Deleted',
  props<{ pokemon: Pokemon }>()
);
