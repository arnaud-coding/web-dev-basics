import { fetchPokemons } from './pokemon-api.ts'
import { Pokemon } from './pokemon-types.ts'
;(async () => {
  const pokemons = await fetchPokemons()
  // console.log(pokemons)

  // ---------------------------------------
  // But de ce fichier d'exercice : Manipuler les tableaux
  // ---------------------------------------------
  // fonctions "simples" : pop(), push(), at(), join(), splice(), slice(),
  // fonctions "complexes" : filter(), map(), reduce(), find()
  // ---------------------------------------

  const arr: Pokemon[] = []

  //#region fonctions simples

  // -------------------------------------
  // pop(), push(), at(), join(), splice(), slice(),
  // -------------------------------------

  // at(1) renvoie l'élément à l'index 1 du tableau de pokemon
  const first = pokemons.at(1)
  if (first !== undefined) {
    // push() ajoute un ou plusieurs éléments dans le tableau
    arr.push(first)
    console.log('added first:', first.name.fr)
  }

  // at(-1) renvoie le dernier élément du tableau de pokemon (-2 renvoie l'avant dernier...)
  const last = pokemons.at(-1)
  if (last !== undefined) {
    arr.push(last)
    console.log('added last:', last.name.fr)
  }
  console.log(`arr has ${arr.length} items`)

  // pop() extrait le dernier élément du tableau (ou undefined si tableau vide)
  const popped = arr.pop()
  console.log(`pop has extracted ${popped?.name.fr} items`)

  // join() joint les éléménts du tableau en les séparant avec le séparateur donné en argument
  let names = ['Arnaud', 'Loïc', 'Agnès', 'Joëlle']
  console.log(`${names.join(' + ')} are in the house`)

  // slice() renvoie une portion du tableau (début et fin optionnels en arguments)
  const sliced = pokemons.slice(50, 55)
  console.log('; ~ sliced:', sliced)

  // splice() enlève et retourne une portion du tableau
  let spliced = names.splice(0, 1)
  console.log('; ~ spliced:', spliced)
  console.log(`${names.join(' + ')} are in the house`)

  // splice() enlève et remplace une portion du tableau
  spliced = names.splice(0, 1, 'Bob')
  console.log('; ~ spliced:', spliced)
  console.log(`${names.join(' + ')} are in the house`)

  //#endregion

  // -------------------------------------
  // map() : crée un tableau depuis un autre tableau, puis le retourne
  // -------------------------------------
  // crée un tableau de noms de pokemons
  names = pokemons.map()

  // -------------------------------------
  // filter()
  // -------------------------------------

  // -------------------------------------
  // find()
  // -------------------------------------

  // -------------------------------------
  // reduce()
  // -------------------------------------
})()
