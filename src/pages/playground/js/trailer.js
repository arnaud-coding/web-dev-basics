// déclare une fonction qui s'appelle "sayHello" et qui attend qu'on lui passe un paramètre "firstname"
// Note: le code n'est pas exécuté maintenant: il faut appeler la fonction pour l'exécuter.
// Note: "firstname" est un nom local (ceux qui appeleront la fonction utiliseront n'importe quel nom).
//       Il existe uniquement dans cette fonction.
function sayHello(firstname) {
  console.log("hello " + firstname.toUpperCase());
}

function sayGoodbye(name) {
  console.log("goodbye " + name);
}

// appelle la fonction (son code va être exécuté) en lui passant "lolo" comme paramètre.
sayHello("lolo");

// déclare la variable "prenom" et lui affecte la valeur "arnaud".
// Note: une variable doit TOUJOURS être déclarée avant d'être utilisée.
// Note: la variable est déclarée en tant que constante: sa valeur ne pourra pas changer.
const prenom = "arnaud";

// appelle la fonction (son code va être exécuté) en lui passant la variable "prenom" comme paramètre.
// Note: La fonction appelée utilisera la valeur de la variable.
sayHello(prenom);

// Cette affectation serait une erreur car la variable "prenom" est constante
// prenom = "agnes";

// déclare la variable "nickname" et lui affecte la valeur "nono".
// ici , la valeur de la variable peut changer
let nickname = "nono";
sayHello(nickname);

// affecte une nouvelle valeur à la variable "nickname"
nickname = "zamette";
sayHello(nickname);

sayGoodbye(nickname);

// Déclare une fonction qui s'appelle "multiply" et qui attend qu'on lui passe 2 paramètres "a" et "b"
// Cette fonction retourne le résultat de la multiplication
function multiply(a, b) {
  // Calcule et affecte le résultat dans la variable locale "result" ("result" n'existe QUE dans cette fonction)
  const result = a * b;
  // Retourne le résultat: Celui qui appelle cette fonction recevra ce résultat.
  return result;
}
// Appelle la fonction en lui passant 5 et 6 et affecte le retour à la variable stock.
const stock = multiply(5, 6);
console.log("le résultat de la multiplication est " + stock);
