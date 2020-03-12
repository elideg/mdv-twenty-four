import { PokemonsEffects } from './pokemon/pokemons.effects';
import { pokemonsReducer } from './pokemon/pokemons.reducer';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataPersistence } from '@nrwl/angular';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RootStoreConfig, StoreModule, MetaReducer, ActionReducer, ActionReducerMap } from '@ngrx/store';
import { storageSync } from '@larscom/ngrx-store-storagesync';

import { CoreDataModule } from '@mdv-twenty-four/core-data';
import { reducers } from '.';

const storeConfig: RootStoreConfig<any> = {
  runtimeChecks: {
    strictActionImmutability: true,
    strictStateImmutability: true
  }
};

// export const reducers: ActionReducerMap<any> = {
//   pokemon: pokemonsReducer
// }

export function syncStateToStorage(reducer: ActionReducer<any>): ActionReducer<any> {
  const sync = storageSync<any>({
    features: [
      { stateKey: 'pokemons' }
    ],
    storage: window.localStorage
  })
  // console.log(reducer);
  return sync(reducer);
}

export const metaReducers: MetaReducer<any>[] = [syncStateToStorage]

@NgModule({
  imports: [
    CommonModule,
    CoreDataModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    EffectsModule.forRoot([
      PokemonsEffects
    ]),
    StoreDevtoolsModule.instrument({ name: 'mdv-twenty-four Store' })
  ],
  providers: [DataPersistence]
})
export class CoreStateModule {}
