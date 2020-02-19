import { Pokemon } from './pokemon';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { map, mergeMap } from 'rxjs/operators';
import { of, forkJoin } from 'rxjs';
import * as uuid from 'uuid/v1';

const BASE_URL = 'https://pokeapi.co/api/v2'

@Injectable({
  providedIn: 'root'
})
export class PokemonsService {
model = 'pokemon'

  constructor(private httpClient: HttpClient) { }

  getUrl() {
    return `${BASE_URL}/${this.model}`;
  }

  getUrlForId(id) {
    return `${this.getUrl()}/${id}`;
  }

  all() {
    return this.httpClient.get(this.getUrl()).pipe(
      map(
        (pokemons: any) => pokemons.results.map(
          (pokemon: Pokemon) => this.stripPokeId(pokemon))),
      mergeMap((pokemon: Pokemoke[]) => (forkJoin((poke: Pokemon) => this.httpClient.get(this.getUrlForId(poke.id)))),
      map((pokemon: Pokemon) => pokemon.map((poke: Pokemon) => this.stripPokemonProperties(poke)))
      )
    )
  }

  create(pokemon: Pokemon) {
    return of({ id: uuid(), ...pokemon })
  }

  stripPokemonId(pokemon: Pokemon) {
    const pokemonId = pokemon.url.split('pokemon/')[1].split('/')[0];
    return { id: pokemonId, ...pokemon }
  }

  stripPokemonProperties(pokemon: Pokemon) {
    const { id, name, url, base_experience, height, weight, ...payload } = result;
    const newPokemonObj = { id, name, url, base_experience, height, weight };
    return { ...newPokemonObj };
  }

}
