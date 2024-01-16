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
 * @typedef {object} PokemonMega
 * @property {string} orbe nom du méga pokémon
 * @property {Sprites} sprites images (regular, shiny, gmax)
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
 * @property {string} image URL de l'image
 */

/**
 * @typedef {object} Sprites
 * @property {string} regular le chemin d'accès vers l'image normal
 * @property {string | null} shiny le chemin d'accès vers son image 'timide'
 * @property {string | null} gmax le chemin d'accès vers son image 'gmax'
 */

/**
 * @typedef {object} PokemonResistance
 * @property {string} name nom de la resistance
 * @property {number} multiplier
 */

/**
 * @typedef {object} PokemonStats
 * @property {number} hp
 * @property {number} atk
 * @property {number} def
 * @property {number} spe_atk
 * @property {number} spe_def
 * @property {number} vit
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
 * @property {PokemonResistance[]} resistances
 * @property {string} height
 * @property {string} weight
 * @property {number} catch_rate
 * @property {PokemonStats} stats
 */
