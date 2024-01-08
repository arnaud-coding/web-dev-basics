/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */

import { PokemonInspector } from "./pokemon-inspector";

// #region

/** @type {Pokemon} */
const bulbi = JSON.parse('{"pokedexId":1,"generation":1,"category":"Pokémon Graine","name":{"fr":"Bulbizarre","en":"Bulbasaur","jp":"フシギダネ"},"sprites":{"regular":"https://raw.githubusercontent.com/Yarkis01/PokeAPI/images/sprites/1/regular.png","shiny":"https://raw.githubusercontent.com/Yarkis01/PokeAPI/images/sprites/1/shiny.png","gmax":null},"types":[{"name":"Plante","image":"https://raw.githubusercontent.com/Yarkis01/PokeAPI/images/types/plante.png"},{"name":"Poison","image":"https://raw.githubusercontent.com/Yarkis01/PokeAPI/images/types/poison.png"}],"talents":[{"name":"Engrais","tc":false},{"name":"Chlorophylle","tc":true}],"stats":{"hp":45,"atk":49,"def":49,"spe_atk":65,"spe_def":65,"vit":45},"resistances":[{"name":"Normal","multiplier":1},{"name":"Plante","multiplier":0.25},{"name":"Feu","multiplier":2},{"name":"Eau","multiplier":0.5},{"name":"Électrik","multiplier":0.5},{"name":"Glace","multiplier":2},{"name":"Combat","multiplier":0.5},{"name":"Poison","multiplier":1},{"name":"Sol","multiplier":1},{"name":"Vol","multiplier":2},{"name":"Psy","multiplier":2},{"name":"Insecte","multiplier":1},{"name":"Roche","multiplier":1},{"name":"Spectre","multiplier":1},{"name":"Dragon","multiplier":1},{"name":"Ténèbres","multiplier":1},{"name":"Acier","multiplier":1},{"name":"Fée","multiplier":0.5}],"evolution":{"pre":null,"next":[{"pokedexId":2,"name":"Herbizarre","condition":"Niveau 16"},{"pokedexId":3,"name":"Florizarre","condition":"Niveau 32"}],"mega":null},"height":"0,7 m","weight":"6,9 kg","egg_groups":["Monstrueux","Végétal"],"sexe":{"male":87.5,"female":12.5},"catch_rate":45,"level_100":1059862,"forme":null}')

/** @type {string | undefined} */
let s = ''

/** @type {any[] | undefined} */
let arr = []

/** @type {PokemonType | undefined} */
let t;

/** @type {PokemonResistance | undefined} */
let r;

/** @type {number | undefined} */
let n;

/** @type {boolean | undefined} */
let b;

// #endregion

// ---------- forEach() : permet d'exécuter une fonction donnée sur chaque élément du tableau
bulbi.types?.forEach((type, index) => {
  s = type.image
  s
  index
})

bulbi.types?.forEach(type => {
  s = type.name
  s
});

// ---------- map(): crée un nouveau tableau avec les résultats de l'appel d'une fonction fournie sur chaque élément du tableau appelant.
arr = bulbi.types?.map((type) => {      // crée un tableau de 12
  return 12
})
arr

arr = bulbi.types?.map((type) => {    // crée un tableau de chaines
  return type.name
})
arr
s = arr?.join(' & ')
s

arr = bulbi.types?.map((type) => {    // crée un tableau d'objets
  return {
    typeName: type.name.toLocaleUpperCase(),
    nameSize: type.name.length
  }
})
arr

// ---------- filter(): crée un nouveau tableau contenant les éléments du tableau d'origine remplissant une condition déterminée par la fonction callback
arr = bulbi.resistances.filter(resistance => {
  // l'elément est gardé si on retourne true, il est filtré/éliminé si on retourne false
  return false
})
arr

arr = bulbi.resistances.filter(resistance => {
  if (resistance.multiplier > 1) {
    return true
  }
  return false
})
arr

arr = bulbi.resistances.filter(resistance => resistance.multiplier < 1)
arr

s = bulbi.resistances.filter(res => res.multiplier < 1).map(res => res.name).join(', ')
s

// ---------- find() : renvoie le premier élément trouvé dans le tableau qui respecte la condition donnée
//                     par la fonction de test passée en argument. Sinon, la valeur undefined est renvoyée.
t = bulbi.types?.find(type => false)
t

t = bulbi.types?.find(type => true)
t

r = bulbi.resistances?.find(r => r.multiplier === 0.5)
r

n = bulbi.resistances?.findIndex(r => r.multiplier === 0.5)
n

// @ts-ignore
n = bulbi.resistances?.indexOf(r)  // trouve l'index de l'élément passé (résistance)
n

// ---------- some() : teste si au moins un élément du tableau passe le test implémenté par la fonction fournie
b = bulbi.resistances.some(res => res.multiplier === 2)
b

b = bulbi.resistances.some(res => res.multiplier === 3)
b

// ---------- every() : teste si TOUT les éléments du tableau passent le test implémenté par la fonction fournie
b = bulbi.resistances.every(res => res.multiplier === 2)
b

b = bulbi.resistances.every(res => res.multiplier <= 2)
b

// ---------- sort() : retourne un tableau trié (ex. : par ce qu'on veut)

// tri sur des tableaux simples (ne contenant que des chaines ou que des nombres)
arr = bulbi.resistances.map(res => res.name)
arr
arr = arr.sort()
arr

arr = bulbi.resistances.map(res => res.multiplier)
arr
arr = arr.sort()
arr

// tri sur des objets : la fonction anonyme définit la condition de tri
s = bulbi.resistances.sort((a, b) => a.multiplier - b.multiplier ).map(res => res.name).join(',')
s

s = bulbi.resistances.sort((a, b) => b.multiplier - a.multiplier ).map(res => res.name).join(',')
s

s = bulbi.resistances.sort((a, b) => b.name.length - a.name.length ).map(res => res.name).join(',')
s

s = bulbi.resistances.sort((a, b) => a.name.length - b.name.length ).map(res => res.name).join(',')
s

s = bulbi.resistances
      .sort((a, b) => a.name.localeCompare(b.name) )
      .sort((a, b) => a.name.length - b.name.length )
      .map(res => res.name).join(',')
s
