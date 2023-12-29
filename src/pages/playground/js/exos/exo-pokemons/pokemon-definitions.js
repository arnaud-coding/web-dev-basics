// Définition des types de données renvoyées par l'API
// (on a crée manuellement ces types en observant le résultat d'un appel à l'API)

/**
 * @typedef PokemonName
 * @type {object}
 * @property {string} fr
 * @property {string} en
 * @property {string} jp
 */

/**
 * @typedef PokemonEvolution
 * @type {object}
 * @property {any} pre
 * @property {any} next
 * @property {object[] | null} mega
 */

/**
 * @typedef PokemonType
 * @type {object}
 * @property {string} name
 * @property {string} image
 */

/**
 * @typedef Sprites
 * @type {object}
 * @property {string} regular le chemin d'accès vers l'image normal
 * @property {string | null} shiny le chemin d'accès vers son image 'timide'
 * @property {string | null} gmax le chemin d'accès vers son image 'gmax'
 */

/**
 * @typedef Pokemon
 * @type {object}
 * @property {number} pokedexId l'identifiant
 * @property {number} generation la génération
 * @property {string} category la catégorie (graine, lézard, ...)
 * @property {PokemonName} name le nom; en 3 langues (fr, en, jp)
 * @property {PokemonType[] | null} types les types (plante, poison, ...)
 * @property {Sprites} sprites les images
 * @property {PokemonEvolution | null} evolution
 */
