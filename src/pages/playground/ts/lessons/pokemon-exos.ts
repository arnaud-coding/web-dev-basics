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

  //#region Fonctions utilitaires

  /**
   * convert weight from string to number
   * @param weight weight in kg, format: '6,9 kg'
   * @returns weight as number in Kg
   */
  const getWeightKg = (weight: string | null): number => {
    const ws = weight?.split(' ')[0].replace(',', '.')
    return Number(ws)
  }

  /**
   * convert height from string to number
   * @param height height in m, format: '0,7 m'
   * @returns height as number in m
   */
  const getHeightM = (height: string | null): number => {
    const hs = height?.split(' ')[0].replace(',', '.')
    return Number(hs)
  }

  /**
   * joint tous les noms d'un tableau d'objets
   * @param objects un tableau d'objets qui a au moins une propriété name
   * @returns les noms, séparés par ', '
   */
  const joinParametersName = (objects: { name: string }[] | null): string => {
    const names = objects?.map((obj) => obj.name).join(', ')
    return names ?? ''
  }

  /**
   * retourne tous les noms des pokémons qui respectent une condition de poids donné
   * @param cb la fonction qui accepte/rejette en fonction du poids donné
   * @returns le nouveu tableau
   */
  function GetByWeight(cb: (weight: number) => boolean) {
    return pokemons
      .filter((pokemon) => {
        // extraire poids: '6,9 Kg' => '6.9'
        const weight = getWeightKg(pokemon.weight)

        // élimine ceux dont on n'arrive pas à extraire le poids
        if (Number.isNaN(weight)) {
          console.error(`impossible d'extraire le poids de ${pokemon.name.fr}`)
          return false
        }

        // utilise cb pour savoir qui garder
        return cb(weight)
      })
      .map((pokemon) => `${pokemon.name.fr}, gen. ${pokemon.generation} , ${pokemon.weight}`)
  }

  //#endregion

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

  //#region map()

  // -------------------------------------
  // map() : Crée un nouveu tableau avec les résultats de l'appel d'une fonction fournie sur chaque élément du tableau appelant
  // -------------------------------------
  const splittedNames = names.map((name) => name.split(''))
  console.log('; ~ splittedNames:', splittedNames)
  let x = pokemons.map((pokemon) => pokemon.name.en)
  x = pokemons.slice(1, 11).map((pokemon) => pokemon.name.jp)

  // resultat attentu: [ 'name (resistances: res 1, res n)', ...]
  x = pokemons.slice(1, 11).map((pokemon) => {
    const resistances = joinParametersName(pokemon.resistances)
    return `${pokemon.name.fr} (resistances: ${resistances})`
  })

  // resultat attentu: [ 'name (n resistances)', ...]
  x = pokemons.slice(1, 11).map((pokemon) => {
    return `${pokemon.name.fr} (resistances: ${pokemon.resistances.length} resistances)`
  })

  // resultat attentu: [ 'name (types: type 1, type n)', ...]
  x = pokemons.slice(1, 11).map((pokemon) => `${pokemon.name.fr} (types: ${joinParametersName(pokemon.types)})`)

  // resultat attentu: [ 'name (talents: talent 1, talent n)', ...]
  x = pokemons.slice(1, 11).map((pokemon) => `${pokemon.name.fr} (talents: ${joinParametersName(pokemon.talents)})`)

  // resultat attentu: [ 'name (previous evos: [evo 1, evo n], next evos: [evo 1, evo n]...)', ...]
  x = pokemons.slice(1, 11).map((pokemon) => {
    const prev = pokemon.evolution?.pre?.map((evo) => evo.name).join(', ')
    const next = pokemon.evolution?.next?.map((evo) => evo.name).join(', ')
    return `${pokemon.name.fr} (previous: [${prev ?? ''}], next: [${next ?? ''}])`
  })

  //#endregion

  // -------------------------------------
  // filter() : Crée un nouveau tableau "filtré": contenant tous les éléments du tableau d'origine remplissant une condition déterminée par la fn cb
  // -------------------------------------

  const longNames = names.filter((name) => name.length >= 5)
  console.log('; ~ longNames:', longNames)

  // tout ceux de la génération 1
  x = pokemons.filter((pokemon) => pokemon.generation === 1).map((pokemon) => pokemon.name.fr)

  // tous les pokemons qui respectent une condition de poids donnée
  x = GetByWeight((weight: number) => weight >= 0.1 && weight <= 0.5)
  console.log('; ~ x:', x)

  // -------------------------------------
  // find() : Renvoie la valeur du 1er élément trouvé dans le tableau qui respecte la condition donnée par la fonction de test passée en argument.
  //          Sinon, la valeur undefined est renvoyée
  // -------------------------------------
  const notes = [11, 15, 8, 3, 18]
  const found = notes.find((element) => element > 12)
  console.log('; ~ found:', found)

  const s = pokemons.find((pokemon) => pokemon.generation === 2)?.name.fr
  console.log('; ~ s:', s)

  // -------------------------------------
  // reduce() : applique une fonction qui "accumule" chaque valeur d'un tableau de gauche à droite afin de le réduire à une seule valeur.
  // -------------------------------------
  const array = [1, 2, 3, 4]

  // 0 + 1 + 2 + 3 + 4
  // expected output: 10
  const initialValue = 0
  const sumWithInitial = array.reduce((accumulator, currentValue) => accumulator + currentValue, initialValue)
  console.log('; ~ sumWithInitial:', sumWithInitial)

  // trouver le poids cummulé de tous les pokémons
  let n = pokemons
    .map((pokemon) => getWeightKg(pokemon.weight))
    .filter((w) => !Number.isNaN(w))
    .reduce((previousValue, currentValue) => previousValue + currentValue, 0)
  console.log('; ~ n:', Math.floor(n) + ' kg')

  // trouver la taille cummulée de tous les pokémons
  n = pokemons
    .map((pokemon) => getHeightM(pokemon.height))
    .filter((h) => !Number.isNaN(h))
    .reduce((previousValue, currentValue) => previousValue + currentValue, 0)
  console.log('; ~ n:', Math.floor(n) + ' m')

  // taille moyenne des pokémons
  n = n / pokemons.length
  console.log('; ~ n:', n.toFixed(2) + ' m')

  // const z = pokemons
  //   .map((pokemon) => ({
  //     id: pokemon.pokedexId,
  //     height: getHeightM(pokemon.height)
  //   }))
  //   .filter((o) => !Number.isNaN(o.height))
  //   .reduce((prev, cur) => (prev.height > cur.height ? prev : cur))

  // console.log('; ~ z:', z)

  return
})()
