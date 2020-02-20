import { PokemonsFacade } from './../../../../../../libs/core-state/src/lib/pokemon/pokemons.facade';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon } from '@mdv-twenty-four/core-data';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'mdv-twenty-four-pokemons-pokemon',
  templateUrl: './pokemon-item.component.html',
  styleUrls: ['./pokemon-item.component.scss']
})
export class PokemonItemComponent implements OnInit {
  pokemons$: Observable<Pokemon>;

  constructor(
    private route: ActivatedRoute,
    private pokemonsFacade: PokemonsFacade
  ) { }

  ngOnInit() {
    this.pokemonsFacade.loadPokemons();
    this.route.params.subscribe((param) => this.pokemonsFacade.selectPokemon(param['id']));
    this.pokemons$ = this.pokemonsFacade.selectedPokemon$
  }

}
