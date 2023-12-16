(async () => {
  /**
   * enlève tout les espaces en début et en fin de chaque élément d'un tableau de strings
   * @param {string[]} sentences
   * @return {string[]}
   */
  const trimStrings = (sentences) => {
    const res = [];
    for (const sentence of sentences) {
      const clean = sentence.trim();
      res.push(clean);
    }
    return res;
  };

  /**
   * décompose une phrase en un tableau de mots
   * @param {string} sentence
   * @param {string} separator
   * @return {string[]}
   */
  const splitSentence = (sentence, separator) => sentence.split(separator);

  /**
   * décompose une phrase en un tableau de mots ET enlève tout les espaces en début et en fin de chaque élément d'un tableau de strings
   * @param {string} sentence
   * @param {string} separator
   * @return {string[]}
   */
  const trimSplit = (sentence, separator) => {
    const words = splitSentence(sentence, separator);

    const cleanWords = trimStrings(words);
    return cleanWords;
  };

  const arr = trimSplit("brian is in the kitchen, lives in london", "in");
  console.log("arr:", arr);

  // ===============================================================

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
   * @property {string} pre
   * @property {string} next
   * @property {string | null} mega
   */

  /**
   * @typedef Pokemon
   * @type {object}
   * @property {number} pokedexId
   * @property {number} generation
   * @property {string} category
   * @property {PokemonName} name
   * @property {PokemonEvolution | null} evolution
   */

  /**
   * va chercher sur internet tous les pokémons
   * @returns {Promise<Pokemon[]>} promesse d'un tableau de pokémons
   */
  const fetchPokemons = async () => {
    const response = await fetch("https://tyradex.tech/api/v1/pokemon");
    if (response.ok) {
      const pokemons = await response.json();
      console.log(`Fetched ${pokemons.length} pokemons`);
      return pokemons;
    }
    console.error("erreur fetch", response.statusText);
    return [];
  };

  /**
   * cherche tous les id des pokemons qui ont une évolution mega
   * @param {Pokemon[]} pokemons
   * @return {number[]}
   */
  const getMegasId = (pokemons) => {
    const megas = pokemons.filter((poke) => poke.evolution?.mega).map((poke) => poke.pokedexId);
    console.log(`get ${megas.length} pokemons with a mega evolution`);
    return megas;
  };

  /**
   * cherche le pokemon dont on donne l'id
   * @param {Pokemon[]} pokemons
   * @param {number} id
   * @returns {Pokemon | undefined}
   */
  const getPokemonById = (pokemons, id) => pokemons.find((pokemon) => pokemon.pokedexId === id);

  // vq chercher tous les pokemons...
  const pokemons = await fetchPokemons();
  // vérifie si pokemons est un tableau
  if (Array.isArray(pokemons)) {
    // vérifie si le tableau des pokemons contient au moins un élément
    if (pokemons.length) {
      // chope tous pk qui ont une evo mega
      const megasId = getMegasId(pokemons);
      console.log("megasId:", megasId);

      // const id = megasId[0];
      // const pokemon = getPokemonById(pokemons, id);
      // console.log("pokemon:", pokemon?.name.fr, pokemon?.evolution?.mega?.[0]);
      for (const id of megasId) {
        const pokemon = getPokemonById(pokemons, id);
        console.log("pokemon:", pokemon?.name.fr, pokemon?.evolution?.mega?.[0]);
      }
    }
  }
})();
