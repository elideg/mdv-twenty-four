import { PokemonsFacade } from './pokemons.facade';
import { Injectable } from '@angular/core';

import { Actions, createEffect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';
import { map, tap, switchMap, withLatestFrom } from 'rxjs/operators';
import { of, iif, defer } from 'rxjs';

import * as pokemonsActions from './pokemons.actions';
import { Pokemon, PokemonsService, NotifyService } from '@mdv-twenty-four/core-data';
import { PokemonsPartialState } from './pokemons.reducer';
import { Store, select } from '@ngrx/store';
import { selectAllPokemons } from './pokemons.selectors';

@Injectable()
export class PokemonsEffects {
  loadPokemons$ = createEffect(() =>
    this.dataPersistence.fetch(pokemonsActions.loadPokemons, {
      run: (
        action: ReturnType<typeof pokemonsActions.loadPokemons>,
        state: PokemonsPartialState
      ) => {
        return this.pokemonsService.all().pipe(
          withLatestFrom(this.store.pipe(select(selectAllPokemons))),
          switchMap(([serviceData, localData]: any[]) => 
          iif(() => localData.length > 0,
              of(pokemonsActions.pokemonsLoadedFromStorage({pokemons: localData})),
              of(pokemonsActions.pokemonsLoadedFromService({pokemons: serviceData}))
          ))
        );
      },
      onError: (action: ReturnType<typeof pokemonsActions.loadPokemons>, error) => {
        console.log('Effect Error:', error);
      }
    })
  );

  addPokemon$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(pokemonsActions.createPokemon, {
      run: (
        action: ReturnType<typeof pokemonsActions.createPokemon>,
        state: PokemonsPartialState
      ) => {
        return this.pokemonsService.create(action.pokemon).pipe(
          tap((res) => console.log(res)),
          map((pokemon: Pokemon) => pokemonsActions.pokemonCreated({ pokemon })),
          tap(() => this.notify.notify('Successfully Added a Pokemon'))
        );
      },
      onError: (action: ReturnType<typeof pokemonsActions.createPokemon>, error) => {
        console.log('Effect Error:', error);
      }
    })
  );

  updatePokemon$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(pokemonsActions.updatePokemon, {
      run: (
        action: ReturnType<typeof pokemonsActions.updatePokemon>,
        state: PokemonsPartialState
      ) => {
        return of(action.pokemon).pipe(
          map((pokemon: Pokemon) => pokemonsActions.pokemonUpdated({ pokemon })),
          tap(() => this.notify.notify('Successfully Updated a Pokemon'))
        );
      },
      onError: (action: ReturnType<typeof pokemonsActions.updatePokemon>, error) => {
        console.log('Effect Error:', error);
      }
    })
  );

  deletePokemon$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(pokemonsActions.deletePokemon, {
      run: (
        action: ReturnType<typeof pokemonsActions.deletePokemon>,
        state: PokemonsPartialState
      ) => {
        return of(action.pokemon).pipe(
          map((pokemon: Pokemon) => pokemonsActions.pokemonDeleted({ pokemon })),
          tap(() => this.notify.notify('Successfully Deleted a Pokemon'))
        );
      },
      onError: (action: ReturnType<typeof pokemonsActions.deletePokemon>, error) => {
        console.log('Effect Error:', error);
      }
    })
  );

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<PokemonsPartialState>,
    private pokemonsService: PokemonsService,
    private pokemonFacade: PokemonsFacade,
    private notify: NotifyService,
    private store: Store<PokemonsPartialState>
  ) {}
}
