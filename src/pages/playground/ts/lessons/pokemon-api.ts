import { Pokemon } from './pokemon-types.ts'

export const fetchPokemons = async (): Promise<Pokemon[]> => {
  // ----- si les pokemons sont deja stockés dans la session, on les utilise
  try {
    const pokemonsItems = sessionStorage.getItem('pokemons')
    if (pokemonsItems !== null) {
      const pokemons = JSON.parse(pokemonsItems)
      console.log(`get from session storage ${pokemons.length} pokemons`)
      return pokemons
    }
  } catch (error) {
    console.log('error while fetching pokemons', error)
  }

  // ----- les pokemons ne sont pas dans la session, on va les chercher sur internet
  const response = await fetch('https://tyradex.tech/api/v1/pokemon')
  if (response.ok) {
    // transforme la réponse en un object de type JSON
    const pokemons = await response.json()
    console.log(`Fetched ${pokemons.length} pokemons`)

    // stocke les pokemons dans la session courante
    sessionStorage.setItem('pokemons', JSON.stringify(pokemons))

    return pokemons
  }
  console.error('erreur fetch pokemons', response.status, response.statusText)
  return []
}
