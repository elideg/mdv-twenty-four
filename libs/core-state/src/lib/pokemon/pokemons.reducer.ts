import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import * as pokemonsActions from './pokemons.actions';
import { Pokemon } from '@mdv-twenty-four/core-data';

export const POKEMONS_FEATURE_KEY = 'pokemons';

export interface PokemonsState extends EntityState<Pokemon> {
  selectedPokemonId?: string | number;
  isLoading: boolean;
}

export interface PokemonsPartialState {
  readonly [POKEMONS_FEATURE_KEY]: PokemonsState;
}

export const pokemonsAdapter: EntityAdapter<Pokemon> = createEntityAdapter<Pokemon>();

export const initialState: PokemonsState = pokemonsAdapter.getInitialState({
  // set initial required properties
  selectedPokemonId: null,
  isLoading: false
});

const pokemonsReducer = createReducer(
  initialState,
  on(pokemonsActions.pokemonSelected, (state, { selectedPokemonId }) =>
    Object.assign({}, state, { selectedPokemonId })
  ),
  on(pokemonsActions.pokemonsLoaded, (state, { pokemons }) =>
    pokemonsAdapter.addAll(pokemons, { ...state, isLoading: false })
  ),
  on(pokemonsActions.pokemonCreated, (state, { pokemon }) =>
    pokemonsAdapter.addOne(pokemon, { ...state, isLoading: false })
  ),
  on(pokemonsActions.pokemonUpdated, (state, { pokemon }) =>
    pokemonsAdapter.upsertOne(pokemon, { ...state, isLoading: false })
  ),
  on(pokemonsActions.pokemonDeleted, (state, { pokemon }) =>
    pokemonsAdapter.removeOne(pokemon.id, { ...state, isLoading: false })
  ),
  on(
    pokemonsActions.loadPokemons,
    pokemonsActions.createPokemon,
    pokemonsActions.updatePokemon,
    pokemonsActions.deletePokemon,
    (state) => ({
      ...state,
      isLoading: true
    })
  ),
);

export function reducer(state: PokemonsState | undefined, action: Action) {
  return pokemonsReducer(state, action);
}
