// Définition des types de données renvoyées par l'API
// (on a crée manuellement ces types en observant le résultat d'un appel à l'API)

/**
 * @typedef {object} PokemonName
 * @property {string} fr
 * @property {string} en
 * @property {string} jp
 */

/**
 * @typedef {object} PokemonEvolutionItem
 * @property {number} pokedexId
 * @property {string} name
 * @property {string} condition
 */

/**
 * @typedef {object} PokemonEvolution
 * @property {PokemonEvolutionItem[] | null} pre
 * @property {PokemonEvolutionItem[] | null} next
 * @property {object[] | null} mega
 */

/**
 * @typedef {object} PokemonType
 * @property {string} name
 * @property {string} image
 */

/**
 * @typedef {object} Sprites
 * @property {string} regular le chemin d'accès vers l'image normal
 * @property {string | null} shiny le chemin d'accès vers son image 'timide'
 * @property {string | null} gmax le chemin d'accès vers son image 'gmax'
 */

/**
 * @typedef {object} Pokemon
 * @property {number} pokedexId l'identifiant
 * @property {number} generation la génération
 * @property {string} category la catégorie (graine, lézard, ...)
 * @property {PokemonName} name le nom; en 3 langues (fr, en, jp)
 * @property {PokemonType[] | null} types les types (plante, poison, ...)
 * @property {Sprites} sprites les images
 * @property {PokemonEvolution | null} evolution
 */
