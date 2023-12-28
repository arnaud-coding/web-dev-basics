(() => {
  // --------------------------------------------------------------------------------------------------------------
  // Exemple: Une fonction qui a plein de paramètres
  // --------------------------------------------------------------------------------------------------------------

  // #region fonction avec plein de paramètres: 3 façons de le faire et une mieux que les autres...

  const limas = {
    number: 160,
    street: "allée du coteau",
    zipCode: 69400,
    city: "Limas",
    country: "France"
  };

  // ----------------------------------------
  // 1ere facon d'écrire une fonction qui attend PLEIN (> 3) de paramètres: cool à définir, chiant à appeler
  // le plus important: cool à appeler (ici, objectif manqué!)
  // ----------------------------------------
  /**
   * retourne l'adresse sous la forme "43 rue malesherbes, 69006 LYON, France" (version pénible à appeler)
   * @param {number} number street number
   * @param {string} street street name
   * @param {number} zipCode boite postale
   * @param {string} city
   * @param {string} country
   * @returns l'adresse, en une seule ligne
   */
  function stringifyAdress(number, street, zipCode, city, country) {
    // expected return : 160 allée du coteau, 69400 LIMAS, France
    return `${number} ${street}, ${zipCode} ${city.toUpperCase()}, ${country}`;
  }

  // appel de la fonction PENIBLE et "error prone" : on repéte le "limas." pour chaque appel
  let deliveryAddress = stringifyAdress(limas.number, limas.street, limas.zipCode, limas.city, limas.country);
  console.log(deliveryAddress);

  // ----------------------------------------
  // 2eme facon d'écrire une fonction qui attend plein de paramètres: chiant à définir, cool à appeler
  // le plus important: cool à appeler (ici, objectif manqué!)
  // ----------------------------------------

  /**
   * retourne l'adresse sous la forme "43 rue malesherbes, 69006 LYON, France"  (version cool à appeler)
   * @param {Object} address - L'object qui contient l'adresse
   * @param {number} address.number - street number
   * @param {string} address.street - street name
   * @param {number} address.zipCode - zip code (code postal)
   * @param {string} address.city
   * @param {string} address.country
   * @returns l'adresse, en une seule ligne
   */
  function stringifyAdressObject(address) {
    return `${address.number} ${address.street}, ${address.zipCode} ${address.city.toUpperCase()}, ${address.country}`;
  }

  // appel de la fonction plus cool : on passe directment l'objet
  deliveryAddress = stringifyAdressObject(limas);
  console.log(deliveryAddress);

  // ----------------------------------------
  // 3eme facon d'écrire une fonction qui attend plein de paramètres: cool à définir, cool à utiliser, chiant à documenter
  // le plus important: cool à utiliser; cool à écrire  ==> SOLUTION GAGNANTE
  // ----------------------------------------

  /**
   * retourne l'adresse sous la forme "43 rue malesherbes, 69006 LYON, France": cool à appeler et cool à écrire
   * @param {Object} address - L'objet qui contient l'adresse
   * @param {number} address.number - street number
   * @param {string} address.street - street name
   * @param {number} address.zipCode - zip code (code postal)
   * @param {string} address.city
   * @param {string} address.country
   * @returns l'adresse, en une seule ligne
   */
  function stringifyAdressDestructured({ number, street, zipCode, city, country }) {
    return `${number} ${street}, ${zipCode} ${city.toUpperCase()}, ${country}`;
  }
  deliveryAddress = stringifyAdressDestructured(limas);
  console.log(deliveryAddress);

  // #endregion

  // --------------------------------------------------------------------------------------------------------------
  // Concept : Passer une fonction comme argument à une fonction
  // --------------------------------------------------------------------------------------------------------------

  /**
   * une fonction qui utilise une fonction passée en paramètre
   * @param {string} value paramètre qui sera passé à la fonction à appeler (cb)
   * @param {function(string): string} fn fonction à appeler (la fonction attend 1 paramètre type "string" et retourne une string)
   */
  const useFunction = (value, fn) => {
    console.log(`La fonction "useFunction" a été appelée avec "value" = ${value}`);
    // appelle la fonction "fn" passée en paramètre en lui passant le paramètre passé "value"; stocke la valeur retournée dans "ret"
    const ret = fn(value);
    console.log(`La fonction "fn" a renvoyé : ${ret}`);
  };

  /**
   * met en majuscules un texte donné
   * @param {string} text le texte à mettre en majuscules
   * @returns {string} le texte donné mis en majuscules
   */
  const upper = (text) => {
    console.log(`La fonction "upper" a été appelée avec bar = ${text}`);
    return text.toUpperCase();
  };

  /**
   * met en minuscules un texte donné
   * @param {string} text le texte à mettre en minuscules
   * @returns {string} le texte donné mis en minuscules
   */
  const lower = (text) => {
    console.log(`La fonction "lower" a été appelée avec bar = ${text}`);
    return text.toLowerCase();
  };

  // appels classiques où l'on passe une vraie fonction nommée (déclarée au préalable)
  useFunction("Bar", upper);
  useFunction("Bar", lower);

  // appels différents où l'on passe une fonction anonyme (la fonction est déclarée sur la même ligne)
  useFunction("   trop d'espaces...  ", (s) => {
    return s.trim();
  });

  // cas particulier de fonction anonyme (ne contient qu'UNE SEULE ligne): on peut enlever "{}" et le "return" ===> TRES UTILISEE !!
  useFunction("   trop d'espaces...  ", (s) => s.trim());
})();
