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

  // slice() retourne une portion du tableau SANS l'enlever du tableau original (début et fin optionnels en arguments)
  const sliced = pokemons.slice(50, 55)
  console.log('; ~ sliced:', sliced)

  // splice() retourne une portion du tableau et l'ENLEVE du tableau original (début et fin optionnels en arguments)
  let spliced = names.splice(0, 1)
  console.log('; ~ spliced:', spliced)
  console.log(`${names.join(' + ')} are in the house`)

  // splice() enlève et remplace une portion du tableau
  spliced = names.splice(0, 1, 'Bob')
  console.log('; ~ spliced:', spliced)
  console.log(`${names.join(' + ')} are in the house`)

  //#endregion

  // -------------------------------------
  // map() : Crée un nouveu tableau avec les résultats de l'appel d'une fonction fournie sur chaque élément du tableau appelant
  // -------------------------------------
  const splittedNames = names.map((name) => name.split(''))
  console.log('; ~ splittedNames:', splittedNames)
  let x = pokemons.map((pokemon) => pokemon.name.en)
  x = pokemons.slice(1, 11).map((pokemon) => pokemon.name.jp)

  // resultat attentu: [ 'name (res 1, res n)', ...]
  x = pokemons.slice(1, 11).map((pokemon) => {
    const resistances = pokemon.resistances.map((resistance) => resistance.name).join(', ')
    return `${pokemon.name.fr} (${resistances})`
  })

  // resultat attentu: [ 'name (n resistances)', ...]
  x = pokemons.slice(1, 11).map((pokemon) => {
    return `${pokemon.name.fr} (${pokemon.resistances.length} resistances)`
  })

  // resultat attentu: [ 'name (type 1, type n)', ...]
  x = pokemons
    .slice(1, 11)
    .map((pokemon) => `${pokemon.name.fr} (${pokemon.types?.map((type) => type.name).join(', ')})`)

  // resultat attentu: [ 'name (previous evos: [evo 1, evo n], next evos: [evo 1, evo n]...)', ...]
  x = pokemons.slice(1, 11).map((pokemon) => {
    const prev = pokemon.evolution?.pre?.map((evo) => evo.name).join(', ')
    const next = pokemon.evolution?.next?.map((evo) => evo.name).join(', ')
    return `${pokemon.name.fr} (previous: [${prev ?? ''}], next: [${next ?? ''}])`
  })

  // -------------------------------------
  // filter() : Crée un nouveau tableau "filtré": contenant tous les éléments du tableau d'origine remplissant une condition déterminée par la fn cb
  // -------------------------------------
  const longNames = names.filter((name) => name.length >= 5)
  console.log('; ~ longNames:', longNames)

  x = pokemons.filter((pokemon) => pokemon.generation === 1).map((pokemon) => pokemon.name.fr)

  // tous les pokemons entre 25 et 30 kg
  x = pokemons
    .slice(1)
    .filter((pokemon) => {
      // extraire poids: '6,9 Kg' => '6.9'
      const ws = pokemon.weight.split(' ')[0].replace(',', '.')
      const w = Number(ws)
      // élimine ceux dont on n'arrive pas à extraire le poids
      if (Number.isNaN(w)) {
        return false
      }

      // filtrer poids < 25 && > 30
      // const res = w > 25 && w < 30
      const res = w > 700
      return res
    })
    .map((pokemon) => `${pokemon.name.fr}, gen ${pokemon.generation} , ${pokemon.weight}`)
  console.log('; ~ x:', x)
  return

  // -------------------------------------
  // find() : Renvoie la valeur du 1er élément trouvé dans le tableau qui respecte la condition donnée par la fonction de test passée en argument.
  //          Sinon, la valeur undefined est renvoyée
  // -------------------------------------
  const notes = [11, 15, 8, 3, 18]
  const found = notes.find((element) => element > 10)
  console.log('; ~ found:', found)

  // -------------------------------------
  // reduce() : applique une fonction qui "accumule" chaque valeur d'un tableau de gauche à droite afin de le réduire à une seule valeur.
  // -------------------------------------
  const array = [1, 2, 3, 4]

  // 0 + 1 + 2 + 3 + 4
  const initialValue = 0
  const sumWithInitial = array.reduce((accumulator, currentValue) => accumulator + currentValue, initialValue)
  console.log('; ~ sumWithInitial:', sumWithInitial)
  // expected output: 10
})()
