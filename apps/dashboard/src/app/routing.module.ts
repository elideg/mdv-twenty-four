import { PokemonItemComponent } from './pokemon/pokemon-item/pokemon-item.component';
import { PokemonComponent } from './pokemon/pokemon.component';
import { LoginComponent } from '@mdv-twenty-four/ui-lib';
import { WildComponent } from '@mdv-twenty-four/ui-lib';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'pokemon', children: [
    { path: '', component: PokemonComponent },
    { path: ':id', component: PokemonItemComponent }
  ] },
  { path: '404', component: WildComponent },
  { path: '', component: LoginComponent },
  { path: '**', redirectTo: '404' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class RoutingModule { }
