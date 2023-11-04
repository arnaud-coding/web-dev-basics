// --------------------------------------------------------------------------------------------------------------
// Exemple: Une fonction qui a plein de paramètres
// --------------------------------------------------------------------------------------------------------------

const limas = {
  number: 160,
  street: "allée du coteau",
  zipCode: 69400,
  city: "Limas",
  country: "France"
};

// ----------------------------------------
// 1ere facon d'écrire une fonction qui attend PLEIN (> 3) de paramètres (cool à définir, chiant à appeler)
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
// 2eme facon d'écrire une fonction qui attend plein de paramètres (chiant à définir, cool à appeler)
// le plus important: cool à appeler (i, c'est manquéci)
// ----------------------------------------

/**
 * retourne l'adresse sous la forme "43 rue malesherbes, 69006 LYON, France"  (version cool à appeler)
 * @param {Object} address - L'object qui contient l'adresse
 * @param {number} address.number - street number
 * @param {string} address.street - street name
 * @param {string} address.zipCode - zip code (code postal)
 * @param {string} address.city
 * @param {string} address.country
 * @returns l'adresse, en une seule ligne
 */
function stringifyAdressObject(address) {
  return `${address.number} ${address.street}, ${address.zipCode} ${address.city.toUpperCase()}, ${address.country}`;
}

// appel de la fonction plus cool : on passe directment l'objet
deliveryAddress = stringifyAdressObject(limas);

// ----------------------------------------
// 3eme facon d'écrire une fonction qui attend plein de paramètres (cool à définir, cool à utiliser, chiant à documenter)
// le plus important: cool à utiliser; cool à écrire  ==> SOLUTION GAGNANTE
// ----------------------------------------

/**
 * retourne l'adresse sous la forme "43 rue malesherbes, 69006 LYON, France"  (version cool à appeler et cool à écrire)
 * @param {Object} address - L'object qui contient l'adresse
 * @param {number} address.number - street number
 * @param {string} address.street - street name
 * @param {string} address.zipCode - zip code (code postal)
 * @param {string} address.city
 * @param {string} address.country
 * @returns l'adresse, en une seule ligne
 */
function stringifyAdressDestructured({ number, street, zipCode, city, country }) {
  return `${number} ${street}, ${zipCode} ${city.toUpperCase()}, ${country}`;
}
deliveryAddress = stringifyAdressDestructured(limas);

// ----------------------------------------------------------------------------------------------
// autre exemple d'une fonction avec plein de paramètres'...
// ----------------------------------------------------------------------------------------------

const bladeRunner = {
  title: "Blade Runner",
  year: 1982,
  director: "Ridley Scott",
  category: "science fiction",
  starring: ["H.Ford", "R.Hauer", "E.J.Olmos", "..."]
};

/**
 * retourne les infos d'un film sous la forme  "Blade Runner is a 1982 science fiction film directed by R.Scott. Starring {actors}"
 * (version cool à appeler et cool à écrire)
 *
 * @param {Object} film - L'object qui contient le film
 * @param {string} film.title - street number
 * @param {number} film.year - street name
 * @param {string} film.director - zip code (code postal)
 * @param {string} film.category
 * @param {string[]} film.starring Arrays of actors
 * @returns l'adresse, en une seule ligne
 */
function getInfos({ title, year, director, category, starring }) {
  return `${title} is a ${year} ${category} film directed by ${director}. Starring ${starring.join(" / ")}`;
}
const film = getInfos(bladeRunner);
console.log(film);
