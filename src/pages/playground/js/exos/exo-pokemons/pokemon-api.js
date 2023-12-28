/**
 * va chercher sur internet tous les pokémons
 * @returns {Promise<Pokemon[]>} promesse d'un tableau de pokémons
 */
export const fetchPokemons = async () => {
  // allez hop, va chercher...
  const response = await fetch("https://tyradex.tech/api/v1/pokemon");
  if (response.ok) {
    // transforme la réponse en un object de type JSON
    const pokemons = await response.json();
    console.log(`Fetched ${pokemons.length} pokemons`);
    return pokemons;
  }
  console.error("erreur fetch pokemons", response.status, response.statusText);
  return [];
};
