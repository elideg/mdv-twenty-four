import { Observable } from 'rxjs/internal/Observable';
import { Pokemon } from './model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { map, mergeMap, combineLatest, tap } from 'rxjs/operators';
import { of, forkJoin } from 'rxjs';
import * as uuid from 'uuid/v1';

const BASE_URL = 'https://pokeapi.co/api/v2'

@Injectable({
  providedIn: 'root'
})
export class PokemonsService {
model = 'pokemon'

  constructor(private http: HttpClient) { }

  getUrl() {
    return `${BASE_URL}/${this.model}`;
  }

  getUrlForId(id) {
    return `${this.getUrl()}/${id}`;
  }

  all(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(this.getUrl()).pipe(
      map((pokemon: any) => pokemon.results.map((poke: Pokemon ) => this.stripPokemonId(poke))),
      mergeMap(pokemon => (forkJoin(pokemon.map(poke => this.http.get(this.getUrlForId(poke.id)))))),
      map((pokemon: Pokemon[]) => pokemon.map((poke: Pokemon) => this.stripPokemonProperties(poke))) 
  )
}

  create(pokemon: Pokemon) {
    return of({ id: uuid(), ...pokemon })
  }

  stripPokemonId(pokemon: Pokemon) {
    const pokemonId = pokemon.url.split('pokemon/')[1].split('/')[0];
    return { id: pokemonId }
  }

  stripPokemonProperties(pokemon: Pokemon) {
    const { id, name, url, base_experience, height, weight } = pokemon
    const newPokemonObj = { id, name, url, base_experience, height, weight };
    return { ...newPokemonObj };
  }

}
