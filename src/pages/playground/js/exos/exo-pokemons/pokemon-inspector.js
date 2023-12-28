import './pokemon-definitions'

/**
 * Inspecte les pokemon
 */
export class PokemonInspector {

  /**
   * Instancie l'inspecteur avec un tableau de pokemons
   * @param {Pokemon[]} pokemons le tableau de pokemons à inspecter
   */
  constructor(pokemons) {
    this.pokemons = pokemons
  }

  /**
   * cherche un pokemon dont on donne l'identifiant
   * @param {number} id l'identifiant du pokemon qu'on cherche
   * @returns {Pokemon | undefined} le pokemon si trouvé, undefined sinon
   */
  getPokemonById = (id) => this.pokemons.find(pokemon => pokemon.pokedexId === id);

  /**
   * cherche un pokemon dont on donne le nom francais
   * @param {string} name le nom francais du pokemon qu'on cherche
   * @returns {Pokemon | undefined} le pokemon si trouvé, undefined sinon
   */
  getPokemonByName = (name) => this.pokemons.find(pokemon => pokemon.name.fr === name)
}