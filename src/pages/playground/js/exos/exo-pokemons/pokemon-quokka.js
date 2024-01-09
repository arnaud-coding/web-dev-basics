// import './pokemon-definitions'

// ================================================================================================
// Ce fichier est là pour s'entrainer à utiliser les méthodes des tableaux
//
// Exemple de méthode tableau: forEach, find, some, every, filter, map, sort...
// ------------------------------------------------------------------------------------------------
// Principe: La méthode du tableau appelle en boucle (UNE FOIS PAR élément du tableau) une fonction donnée :
//           La fonction donnée :
//            - Recoit en arguments : l'élément du tableau et l'index de cet élément
//            - Doit retourner:
//              - rien pour 'forEach'
//              - un booleen pour 'some', 'every' , 'find' et 'filter'
//              - un object pour 'map'
//              - ...
//
//           La méthode du tableau utilise le retour de la fonction donnée pour faire son travail
//
// Note: Il utilise l'extension Quokka (Ctrl+Shift+P, "start on current file")
// ================================================================================================

/* eslint-disable no-unused-expressions */

// #region les variables utilisées ici

/** @type {Pokemon} */
const bulbi = JSON.parse(
  '{"pokedexId":1,"generation":1,"category":"Pokémon Graine","name":{"fr":"Bulbizarre","en":"Bulbasaur","jp":"フシギダネ"},"sprites":{"regular":"https://raw.githubusercontent.com/Yarkis01/PokeAPI/images/sprites/1/regular.png","shiny":"https://raw.githubusercontent.com/Yarkis01/PokeAPI/images/sprites/1/shiny.png","gmax":null},"types":[{"name":"Plante","image":"https://raw.githubusercontent.com/Yarkis01/PokeAPI/images/types/plante.png"},{"name":"Poison","image":"https://raw.githubusercontent.com/Yarkis01/PokeAPI/images/types/poison.png"}],"talents":[{"name":"Engrais","tc":false},{"name":"Chlorophylle","tc":true}],"stats":{"hp":45,"atk":49,"def":49,"spe_atk":65,"spe_def":65,"vit":45},"resistances":[{"name":"Normal","multiplier":1},{"name":"Plante","multiplier":0.25},{"name":"Feu","multiplier":2},{"name":"Eau","multiplier":0.5},{"name":"Électrik","multiplier":0.5},{"name":"Glace","multiplier":2},{"name":"Combat","multiplier":0.5},{"name":"Poison","multiplier":1},{"name":"Sol","multiplier":1},{"name":"Vol","multiplier":2},{"name":"Psy","multiplier":2},{"name":"Insecte","multiplier":1},{"name":"Roche","multiplier":1},{"name":"Spectre","multiplier":1},{"name":"Dragon","multiplier":1},{"name":"Ténèbres","multiplier":1},{"name":"Acier","multiplier":1},{"name":"Fée","multiplier":0.5}],"evolution":{"pre":null,"next":[{"pokedexId":2,"name":"Herbizarre","condition":"Niveau 16"},{"pokedexId":3,"name":"Florizarre","condition":"Niveau 32"}],"mega":null},"height":"0,7 m","weight":"6,9 kg","egg_groups":["Monstrueux","Végétal"],"sexe":{"male":87.5,"female":12.5},"catch_rate":45,"level_100":1059862,"forme":null}'
)

/** @type {string | undefined} */
let s = ''

/** @type {any[] | undefined} */
let arr = []

/** @type {PokemonType | undefined} */
let t

/** @type {PokemonResistance | undefined} */
let r

/** @type {number | undefined} */
let n

/** @type {boolean | undefined} */
let b

// #endregion

// ----------------------------------------------------------------------------
// forEach() : permet d'exécuter une fonction donnée sur chaque élément du tableau
// ----------------------------------------------------------------------------
bulbi.types?.forEach((type, index) => {
  // corps de la fonction donnée : on peut faire quelque chose avec l'élément et l'index de cet élément
  s = type.image
  s
  index
})

bulbi.types?.forEach((type) => {
  // corps de la fonction donnée : on peut faire quelque chose avec l'élément et l'index de cet élément
  s = type.name
  s
})

// ----------------------------------------------------------------------------
// map(): crée un nouveau tableau avec les résultats de l'appel de la fonction donnée.
// ----------------------------------------------------------------------------

// crée un tableau de 12 (à chaque appel, le type passé en argument est remplacé par 12)
arr = bulbi.types?.map((_) => {
  return 12
})
arr

// crée un tableau de chaines (à chaque appel, le type passé en argument est remplacé par le nom du type)
arr = bulbi.types?.map((type) => {
  return type.name
})
arr
s = arr?.join(' & ')  // joint chaque chaine du tableau, en les sèparant avec ' & '
s

// crée un tableau d'objets (à chaque appel, le type passé en argument est remplacé par un object avec  props: 'typeName et 'nameSize')
arr = bulbi.types?.map((type) => {
  return {
    typeName: type.name.toLocaleUpperCase(),
    nameSize: type.name.length
  }
})
arr

// ----------------------------------------------------------------------------
// filter(): crée un nouveau tableau contenant uniquement les éléments du tableau
//           d'origine remplissant une condition déterminée par la fonction donnée
// ----------------------------------------------------------------------------

// retourne un tableau vide (à chaque appel, on retourne false: l'élément est filtré)
arr = bulbi.resistances.filter((_) => {
  // l'elément est gardé si on retourne true, il est filtré/éliminé si on retourne false
  return false
})
arr

// retourne un tableau des résistances dont le multiplicateur est > 1
arr = bulbi.resistances.filter((resistance) => {
  if (resistance.multiplier > 1) {
    // l'elément est gardé si multiplicateur > 1
    return true
  }

  // sinon, l'elément est éliminé
  return false
})
arr

// retourne un tableau des résistances dont le multiplicateur est < 1
arr = bulbi.resistances.filter((resistance) => resistance.multiplier < 1)
arr

// retourne une chaine qui contient le nom de toutes les résistances qui ont un multiplicateur < 1
// et ou chaque nom est séparé par ', '
s = bulbi.resistances
  .filter((res) => res.multiplier < 1) // ne conserve que les résistances dont le multiplicateur est < 1
  .map((res) => res.name) // puis, transforme chaque résistance en son nom
  .join(', ') // joint toutes les chaines ensemble, en les séparant avec ', '
s

// ------------------------------------------------------------------------------------------------
// find() :
//  - Renvoie le premier élément du tableau qui respecte la condition donnée par la fonction passée
//    en argument.
//  - Renvoie undefined si aucun élément ne respecte la condition.
// ------------------------------------------------------------------------------------------------

// la fonction anonyme donnée renvoi toujours false : undefined sera renvoyé
t = bulbi.types?.find((_) => false)
t
// la fonction anonyme donnée renvoi toujours true : le premier élément sera renvoyé
t = bulbi.types?.find((_) => true)
t
// la fonction anonyme donnée renvoi true si l'élément à un type dont le nom contient 'oi'. Ce type sera renvoyé
t = bulbi.types?.find((t) => t.name.includes('oi'))
t

// la fonction anonyme donnée renvoi true si l'élément à une résistance dont le multiplicateur est égal à 0.5. Cette résistance sera renvoyée.
r = bulbi.resistances?.find((r) => r.multiplier === 0.5)
r
// la fonction anonyme donnée renvoi true si l'élément à une résistance dont le nom contient 'oi'. Cette résistance sera renvoyée.
r = bulbi.resistances?.find((r) => r.name.includes('oi'))
r

// la fonction anonyme donnée renvoi true si l'élément à une résistance dont le multiplicateur est égal à 0.5. L'index de cette résistance sera renvoyée.
n = bulbi.resistances?.findIndex((r) => r.multiplier === 0.5)
n

// @ts-ignore
n = bulbi.resistances?.indexOf(r) // trouve l'index de l'élément passé (résistance)
n

// ------------------------------------------------------------------------------------------------
// some() :
//  - Renvoie true si au moins un élément du tableau passe le test implémenté par la fonction
//    passée en argument.
//  - Renvoie false si aucun élément du tableau passe le test
// ------------------------------------------------------------------------------------------------
b = bulbi.resistances.some((res) => res.multiplier === 2)
b

b = bulbi.resistances.some((res) => res.multiplier === 3)
b

// ------------------------------------------------------------------------------------------------
// every() : teste si TOUT les éléments du tableau passent le test implémenté par la fonction donnée
// ------------------------------------------------------------------------------------------------

// renvoie true si tous les éléments ont une résistance dont le multiplicateur est égale à 2
b = bulbi.resistances.every((res) => res.multiplier === 2)
b

// renvoie true si tous les éléments ont une résistance dont le multiplicateur est inférieure à 2
b = bulbi.resistances.every((res) => res.multiplier <= 2)
b

// ------------------------------------------------------------------------------------------------
// sort() : retourne un tableau trié (ex. : par ce qu'on veut)
//          Note : la fonction donnée recoit deux eléments à comparer et doit retourner 1, 0 ou -1 (voir MDN)
// ------------------------------------------------------------------------------------------------

// tri sur des tableaux simples (ne contenant que chaines)
arr = bulbi.resistances.map((res) => res.name) // crée le tableau simple : tableau de noms de résistances
arr
arr = arr.sort()
arr

// tri sur des tableaux simples (ne contenant que des nombres)
arr = bulbi.resistances.map((res) => res.multiplier) // crée le tableau simple : tableau de multiplicateur de résistances
arr
arr = arr.sort()
arr

// tri sur des objets : la fonction anonyme définit la condition de tri
s = bulbi.resistances
  .sort((a, b) => a.multiplier - b.multiplier) // la fonction donnée compare les multiplicateurs
  .map((res) => `${res.name} (${res.multiplier})`)
  .join(',')
s

// tri sur des objets : la fonction anonyme définit la condition de tri
s = bulbi.resistances
  .sort((a, b) => b.multiplier - a.multiplier)
  .map((res) => `${res.name} (${res.multiplier})`)
  .join(',')
s

// tri sur des objets : la fonction anonyme définit la condition de tri
s = bulbi.resistances
  .sort((a, b) => a.name.length - b.name.length) // la fonction donnée compare la taille des noms de résistance
  .map((res) => res.name)
  .join(',')
s

// tri sur des objets : tri inverse de la précédente
s = bulbi.resistances
  .sort((a, b) => b.name.length - a.name.length)
  .map((res) => res.name)
  .join(',')
s

// DOUBLE tri sur des objets : les fonction anonymes définissent les conditions de tri
// ! surement un bug
s = bulbi.resistances
  .sort((a, b) => a.name.localeCompare(b.name)) // 1er tri: compare les noms
  .sort((a, b) => a.name.length - b.name.length) // 2nd tri: compare les tailles de noms
  .map((res) => `${res.name} (${res.name.length})`)
  .join(',')
s

// ------------------------------------------------------------------------------------------------
// Exercices
// ------------------------------------------------------------------------------------------------

/**
 * renvoie la description du pokemon
 * Taille = 0,7 m ; poids = 6,9 kg ; taux de capture = 45 % ; méga-évo = ?
 * @param {Pokemon} pokemon
 * @returns {string}
 */
function getDescription(pokemon) {
  // const mega = (pokemon.evolution?.mega) ? ` ; mega-evo = ${pokemon.evolution.mega.map()}` : ''
  // return `Taille = ${pokemon.height} ; poids = ${pokemon.weight} ; taux de capture = ${pokemon.catch_rate} %${mega}`
  return 'todo'
}
s = getDescription(bulbi)
s
