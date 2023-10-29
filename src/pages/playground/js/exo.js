/**
 * additionne a et b
 * @param {Number} a
 * @param {Number} b
 * @returns somme de a et b
 */
function add(a, b) {
  return a + b;
}

/**
 * soustrait a et b
 * @param {Number} a
 * @param {Number} b
 * @returns résultat soustraction
 */
function sub(a, b = 0) {
  return a - b;
}

/**
 * renvoie valeur moyenne a et b
 * @param {Number} a
 * @param {Number} b
 * @returns valeur moyenne
 */
function mean(a, b) {
  const res = add(a, b) / 2;
  return res;
}

// declare une variable "value" et lui assigne le retour de la fonction "mean" à qui on passe 12 et 8
let value = mean(12, 8);
console.log(`moyenne 12 et 8 = ${value}`);

value = sub(4);
console.log(`soustraction de 4 et "rien" = ${value}`);

// assigne à "value" la moyenne de "a" et "b" où:
//  - "a" = somme de 2+1
//  - "b" = soustraction de 9-4
value = mean(add(2, 1), sub(9, 4));

// la même chose mais sur plusieurs lignes (moins pratique)
const a = add(2, 1);
const b = sub(9, 4);
value = mean(a, b);

// --------------------------------------------------------------------------------------------------------------

const limas = {
  number: 160,
  street: "allée du coteau",
  zipCode: 69400,
  city: "Limas",
  country: "France"
};

// --------------------
// 1ere facon d'écrire une fonction qui attend PLEIN (> 3) de paramètres (cool à écrire, chiant à utiliser)
// le plus important: cool à utiliser (ici; objectif manqué!)
// --------------------
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
let deliveryAddress = stringifyAdress(
  limas.number,
  limas.street,
  limas.zipCode,
  limas.city,
  limas.country
);
console.log(deliveryAddress);

// --------------------
// 2eme facon d'écrire une fonction qui attend plein de paramètres (chiant à écrire, cool à utiliser, chiant à documenter)
// le plus important: cool à utiliser
// --------------------

/**
 * retourne l'adresse sous la forme "43 rue malesherbes, 69006 LYON, France"  (version cool à appeler)
 * @param {{number: number, street: string, zipCode: string, city: string, country: string}} address un object de type adresse et qui contient les propriétés number, street, zipCode...
 * @returns l'adresse, en une seule ligne
 */
function stringifyAdressObject(address) {
  return `${address.number} ${address.street}, ${
    address.zipCode
  } ${address.city.toUpperCase()}, ${address.country}`;
}

// appel de la fonction plus cool : on passe directment l'objet
deliveryAddress = stringifyAdressObject(limas);

// --------------------
// 3eme facon d'écrire une fonction qui attend plein de paramètres (cool à écrire, cool à utiliser, chiant à documenter)
// le plus important: cool à utiliser; cool à écrire  ==> SOLUTION GAGNANTE
// --------------------

/**
 * retourne l'adresse sous la forme "43 rue malesherbes, 69006 LYON, France"  (version cool à appeler et cool à écrire)
 * @param {{number: number, street: string, zipCode: string, city: string, country: string}} address an object that must have the expected properties...
 * @returns
 */
function stringifyAdressDestructured({
  number,
  street,
  zipCode,
  city,
  country
}) {
  return `${number} ${street}, ${zipCode} ${city.toUpperCase()}, ${country}`;
}
deliveryAddress = stringifyAdressDestructured(limas);
