(async () => {
  // #region demo basique

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

  // #endregion

  // ===============================================================

  // Définition des types de données renvoyées par l'API
  // (on a crée manuellement ces types en observqnt le retour d'un appel à l'API)

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

  // ===============================================================

  /**
   * va chercher sur internet tous les pokémons
   * @returns {Promise<Pokemon[]>} promesse d'un tableau de pokémons
   */
  const fetchPokemons = async () => {
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

  // -------------------------------------------------
  // Définition d'une classe Inspector
  // -------------------------------------------------

  /**
   * Inspecte les pokemon
   */
  class PokemonInspector {
    /**
     * Instancie l'inspecteur avec un tableau de pokemens
     * @param {Pokemon[]} pokemons le tableau de pokemons à inspecter
     */
    constructor(pokemons) {
      /** @type {Pokemon[]} */
      this.pokemons = pokemons; // stocke le tableau de pokemon passé en arguments dans une variable propre à la classe
    }

    /**
     * cherche tous les id des pokemons qui ont une évolution mega
     * @return {number[]}
     */
    getMegasId = () => {
      const megas = this.pokemons.filter((poke) => poke.evolution?.mega).map((poke) => poke.pokedexId);
      console.log(`get ${megas.length} pokemons with a mega evolution`);
      return megas;
    };

    /**
     * cherche le pokemon dont on donne l'id
     * @param {number} id
     * @returns {Pokemon | undefined}
     */
    getPokemonById = (id) => this.pokemons.find((pokemon) => pokemon.pokedexId === id);
  }

  // -------------------------------------------------
  // Utilisation de la classe Inspector :
  //
  //   NB : Habitulellement la classe est défine dans un autre fichier
  // -------------------------------------------------

  // va chercher tous les pokemons...
  const pokemons = await fetchPokemons();
  // vérifie si pokemons est un tableau
  if (Array.isArray(pokemons)) {
    // vérifie si le tableau des pokemons contient au moins un élément
    if (pokemons.length) {
      // à partir d'ici, ON EST SUR  d'avoir un tableau de pokemons
      // ---------------------------------------------------------
      const inspector = new PokemonInspector(pokemons);

      // chope tous pokemons qui ont une evo mega
      const megasId = inspector.getMegasId();
      console.log("megasId:", megasId);

      // const id = megasId[0];
      // const pokemon = getPokemonById(pokemons, id);
      // console.log("pokemon:", pokemon?.name.fr, pokemon?.evolution?.mega?.[0]);
      for (const id of megasId) {
        const pokemon = inspector.getPokemonById(id);
        console.log("pokemon:", pokemon?.name.fr, pokemon?.evolution?.mega?.[0]);
      }
    }
  }
})();
