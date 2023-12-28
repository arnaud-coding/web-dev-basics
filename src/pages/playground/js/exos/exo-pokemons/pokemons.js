import { fetchPokemons } from './pokemon-api'
import { PokemonInspector } from './pokemon-inspector'

const pokemons = await fetchPokemons()
const inspector = new PokemonInspector(pokemons)

// debug tmp
const pokemon = inspector.getPokemonByName('Herbizarre')
const dbg = document.getElementById('dbg-area')
if (dbg instanceof HTMLTextAreaElement) {
  dbg.innerHTML = JSON.stringify(pokemon, null, 2)
}
