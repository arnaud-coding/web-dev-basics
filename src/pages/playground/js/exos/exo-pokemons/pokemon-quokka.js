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
const gallame = JSON.parse(
  '{"pokedexId":475,"generation":4,"category":"Pokémon Lame","name":{"fr":"Gallame","en":"Gallade","jp":"エルレイド"},"sprites":{"regular":"https://raw.githubusercontent.com/Yarkis01/PokeAPI/images/sprites/475/regular.png","shiny":"https://raw.githubusercontent.com/Yarkis01/PokeAPI/images/sprites/475/shiny.png","gmax":null},"types":[{"name":"Psy","image":"https://raw.githubusercontent.com/Yarkis01/PokeAPI/images/types/psy.png"},{"name":"Combat","image":"https://raw.githubusercontent.com/Yarkis01/PokeAPI/images/types/combat.png"}],"talents":[{"name":"Impassible","tc":false},{"name":"Incisif","tc":false},{"name":"Cœur Noble","tc":true}],"stats":{"hp":68,"atk":125,"def":65,"spe_atk":65,"spe_def":115,"vit":80},"resistances":[{"name":"Normal","multiplier":1},{"name":"Plante","multiplier":1},{"name":"Feu","multiplier":1},{"name":"Eau","multiplier":1},{"name":"Électrik","multiplier":1},{"name":"Glace","multiplier":1},{"name":"Combat","multiplier":0.5},{"name":"Poison","multiplier":1},{"name":"Sol","multiplier":1},{"name":"Vol","multiplier":2},{"name":"Psy","multiplier":1},{"name":"Insecte","multiplier":1},{"name":"Roche","multiplier":0.5},{"name":"Spectre","multiplier":2},{"name":"Dragon","multiplier":1},{"name":"Ténèbres","multiplier":1},{"name":"Acier","multiplier":1},{"name":"Fée","multiplier":2}],"evolution":{"pre":[{"pokedexId":280,"name":"Tarsal","condition":"Niveau 20"},{"pokedexId":281,"name":"Kirlia","condition":"Mâle + Pierre Aube"}],"next":null,"mega":[{"orbe":"Gallamite","sprites":{"regular":"https://raw.githubusercontent.com/Yarkis01/PokeAPI/images/sprites/475/mega-regular.png","shiny":"https://raw.githubusercontent.com/Yarkis01/PokeAPI/images/sprites/475/mega-shiny.png"}}]},"height":"1,6 m","weight":"52,0 kg","egg_groups":["Amorphe","Humanoïde"],"sexe":{"male":100,"female":0},"catch_rate":60,"level_100":1250000,"forme":null}'
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
gallame.types?.forEach((type, index) => {
  // corps de la fonction donnée : on peut faire quelque chose avec l'élément et l'index de cet élément
  s = type.image
  s
  index
})

gallame.types?.forEach((type) => {
  // corps de la fonction donnée : on peut faire quelque chose avec l'élément et l'index de cet élément
  s = type.name
  s
})

// ----------------------------------------------------------------------------
// map(): crée un nouveau tableau avec les résultats de l'appel de la fonction donnée.
// ----------------------------------------------------------------------------

// crée un tableau de 12 (à chaque appel, le type passé en argument est remplacé par 12)
arr = gallame.types?.map((_) => {
  return 12
})
arr

// crée un tableau de chaines (à chaque appel, le type passé en argument est remplacé par le nom du type)
arr = gallame.types?.map((type) => {
  return type.name
})
arr
s = arr?.join(' & ') // joint chaque chaine du tableau, en les sèparant avec ' & '
s

// crée un tableau d'objets (à chaque appel, le type passé en argument est remplacé par un object avec  props: 'typeName et 'nameSize')
arr = gallame.types?.map((type) => {
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
arr = gallame.resistances.filter((_) => {
  // l'elément est gardé si on retourne true, il est filtré/éliminé si on retourne false
  return false
})
arr

// retourne un tableau des résistances dont le multiplicateur est > 1
arr = gallame.resistances.filter((resistance) => {
  if (resistance.multiplier > 1) {
    // l'elément est gardé si multiplicateur > 1
    return true
  }

  // sinon, l'elément est éliminé
  return false
})
arr

// retourne un tableau des résistances dont le multiplicateur est < 1
arr = gallame.resistances.filter((resistance) => resistance.multiplier < 1)
arr

// retourne une chaine qui contient le nom de toutes les résistances qui ont un multiplicateur < 1
// et ou chaque nom est séparé par ', '
s = gallame.resistances
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
t = gallame.types?.find((_) => false)
t
// la fonction anonyme donnée renvoi toujours true : le premier élément sera renvoyé
t = gallame.types?.find((_) => true)
t
// la fonction anonyme donnée renvoi true si l'élément à un type dont le nom contient 'oi'. Ce type sera renvoyé
t = gallame.types?.find((t) => t.name.includes('oi'))
t

// la fonction anonyme donnée renvoi true si l'élément à une résistance dont le multiplicateur est égal à 0.5. Cette résistance sera renvoyée.
r = gallame.resistances?.find((r) => r.multiplier === 0.5)
r
// la fonction anonyme donnée renvoi true si l'élément à une résistance dont le nom contient 'oi'. Cette résistance sera renvoyée.
r = gallame.resistances?.find((r) => r.name.includes('oi'))
r

// la fonction anonyme donnée renvoi true si l'élément à une résistance dont le multiplicateur est égal à 0.5. L'index de cette résistance sera renvoyée.
n = gallame.resistances?.findIndex((r) => r.multiplier === 0.5)
n

// @ts-ignore
n = gallame.resistances?.indexOf(r) // trouve l'index de l'élément passé (résistance)
n

// ------------------------------------------------------------------------------------------------
// some() :
//  - Renvoie true si au moins un élément du tableau passe le test implémenté par la fonction
//    passée en argument.
//  - Renvoie false si aucun élément du tableau passe le test
// ------------------------------------------------------------------------------------------------
b = gallame.resistances.some((res) => res.multiplier === 2)
b

b = gallame.resistances.some((res) => res.multiplier === 3)
b

// ------------------------------------------------------------------------------------------------
// every() : teste si TOUT les éléments du tableau passent le test implémenté par la fonction donnée
// ------------------------------------------------------------------------------------------------

// renvoie true si tous les éléments ont une résistance dont le multiplicateur est égale à 2
b = gallame.resistances.every((res) => res.multiplier === 2)
b

// renvoie true si tous les éléments ont une résistance dont le multiplicateur est inférieure à 2
b = gallame.resistances.every((res) => res.multiplier <= 2)
b

// ------------------------------------------------------------------------------------------------
// sort() : retourne un tableau trié (ex. : par ce qu'on veut)
//          Note : la fonction donnée recoit deux eléments à comparer et doit retourner 1, 0 ou -1 (voir MDN)
// ------------------------------------------------------------------------------------------------

// tri sur des tableaux simples (ne contenant que chaines)
arr = gallame.resistances.map((res) => res.name) // crée le tableau simple : tableau de noms de résistances
arr
arr = arr.sort()
arr

// tri sur des tableaux simples (ne contenant que des nombres)
arr = gallame.resistances.map((res) => res.multiplier) // crée le tableau simple : tableau de multiplicateur de résistances
arr
arr = arr.sort()
arr

// tri sur des objets : la fonction anonyme définit la condition de tri
s = gallame.resistances
  .sort((a, b) => a.multiplier - b.multiplier) // la fonction donnée compare les multiplicateurs
  .map((res) => `${res.name} (${res.multiplier})`)
  .join(',')
s

// tri sur des objets : la fonction anonyme définit la condition de tri
s = gallame.resistances
  .sort((a, b) => b.multiplier - a.multiplier)
  .map((res) => `${res.name} (${res.multiplier})`)
  .join(',')
s

// tri sur des objets : la fonction anonyme définit la condition de tri
s = gallame.resistances
  .sort((a, b) => a.name.length - b.name.length) // la fonction donnée compare la taille des noms de résistance
  .map((res) => res.name)
  .join(',')
s

// tri sur des objets : tri inverse de la précédente
s = gallame.resistances
  .sort((a, b) => b.name.length - a.name.length)
  .map((res) => res.name)
  .join(',')
s

// DOUBLE tri sur des objets : les fonction anonymes définissent les conditions de tri
// ! surement un bug
s = gallame.resistances
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
  let mega = ''
  if (pokemon.evolution?.mega) {
    mega = ' ; méga-évo = ' + pokemon.evolution.mega.map((m) => m.orbe).join(',')
  }

  return `Taille = ${pokemon.height} ; poids = ${pokemon.weight} ; taux de capture = ${pokemon.catch_rate} %${mega}`
}
s = getDescription(gallame)
s
