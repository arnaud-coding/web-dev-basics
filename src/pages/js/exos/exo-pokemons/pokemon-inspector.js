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
  getPokemonById = (id) => this.pokemons.find((pokemon) => pokemon.pokedexId === id)

  /**
   * cherche un pokemon dont on donne le nom francais
   * @param {string} name le nom francais du pokemon qu'on cherche
   * @returns {Pokemon | undefined} le pokemon si trouvé, undefined sinon
   */
  getPokemonByName = (name) => this.pokemons.find((pokemon) => pokemon.name.fr.toLowerCase() === name.toLowerCase())

  /**
   * renvoie les évolutions sous la forme  "Herbizzare (16), Florizarre (32)"
   * @param {PokemonEvolution | null} evo
   * @returns {string} les évolutions
   */
  getEvolutionsDescription(evo) {
    if (evo === null) {
      return ''
    }

    return (
      evo?.next
        ?.map((item) => {
          let level
          if (item.condition.startsWith('Niveau')) {
            // on a condition = "Niveau 16", on veut extraire le lvl
            level = item.condition.split(' ')[1]
          } else {
            // on a condition = "Pierre soleil", on veut la garder telle qu'elle
            level = item.condition
          }
          const res = `${item.name} (${level})`
          return res
        })
        .join(', ') ?? ''
    )
  }

  /**
   * renvoie les évolutions sous la forme  "Herbizzare (16), Florizarre (32)"
   * @param {PokemonEvolution | null} evo
   * @returns {number} le nombre de megas
   */
  getMegasNumbers(evo) {
    if (evo === null || evo.mega === null) {
      return 0
    }
    return evo.mega.length
  }

  /**
   * renvoies les types sous la forme "plante, poison", ou ""
   * @param {PokemonType[] | null} types
   * @returns {string}
   */
  getTypesDescription(types) {
    // if (types === null) {
    //   return ''
    // }
    // const typeNames = types.map((t) => t.name) // transforme la tableau de types en un tableau de chaines
    // return typeNames.join(', ')
    return types?.map((type) => type.name).join(', ') ?? ''
  }

  /**
   * retourne le nombre de générations
   * @return {number}
   */
  getGenerationsNumber() {
    let gen = 0
    for (const pokemon of this.pokemons) {
      if (pokemon.generation > gen) {
        gen = pokemon.generation
      }
    }
    return gen
  }

  /**
   * renvoie la description du pokemon donné
   * Taille = 0,7 m ; poids = 6,9 kg ; taux de capture = 45 % ; méga-évo = ?
   * @param {Pokemon} pokemon
   * @returns {string}
   */
  getDescription(pokemon) {
    let mega = ''
    if (pokemon.evolution?.mega) {
      mega = ' ; méga-évo = ' + pokemon.evolution.mega.map((m) => m.orbe).join(',')
    }

    return `Taille = ${pokemon.height} ; poids = ${pokemon.weight} ; taux de capture = ${pokemon.catch_rate} %${mega}`
  }

  /**
   * renvoie les stats du pokemon donné
   * @param {Pokemon} pokemon
   * @returns {string}
   */
  getStats(pokemon) {
    return `Santé: ${pokemon.stats.hp} ; Attaque: ${pokemon.stats.atk} ; Défense: ${pokemon.stats.def} ; Vitesse: ${pokemon.stats.vit}`
  }

  /**
   * renvoie les talents d'un pokémon
   * @param {Pokemon} pokemon
   * @returns {string}
   */
  getTalents(pokemon) {
    const res = pokemon.talents?.map((talent) => talent.name).join(', ')
    res
    return `Talents: ${res ?? 'aucun'}`
  }
}
