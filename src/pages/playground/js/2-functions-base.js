console.log("---------------------------------------- JS");

console.log("But: Découvrir les fonctions");
console.log("---------------------------------------- JS");

/* ==================================================================================================================== 
Une fonction:
    - est un bloc de code qui fait quelque chose (ex.: calculer un âge, afficher un texte, changer un élément html, changer une propriété css, ...)
    - peut renvoyer/retourner une valeur (pas obligatoire)
    - peut recevoir un ou plusieurs paramètres/arguments (i.e. des données qu'on lui passe)                 i.e. = Id est = c'est à dire
    - a pour vocation d'être appelée(réutilisée) plusieurs fois (avec des paramètres différents).
    
    - doit être DÉCLARÉE : 
      - "déclare" à node qu'on veut utiliser une fonction dont on donne le nom. 
      - format: function foo(param1, param2) { ... }
          - "foo" est nom de la fonction
          - param1 et param2 sont 2 paramètres  qu'on DOIT passer à la fonction (on peut en passer de 0 à plusieurs)
          - les accolades contiennent le code qui sera exécutée à l'appel de la fonction
      - Node crée alors un emplacement mémoire pour contenir cette fonction MAIS il n'exécute pas la fonction (elle doit être appelée)
    - doit être APPELÉE ( ou invoquée) :
      - syntaxe : foo(12, false)   =====>  apelle la fonction "foo" en lui passant les arguments 12 et false
    
==================================================================================================================== */

console.log("... avant la définition de foo...");

// on DÉCLARE la fonction "foo" (elle n'est PAS exécutée). Ici, la fonction "foo" s'attend à recevoir 2 paramètres : "bar" et "baz"
// - quand on l'appelera, on DEVRA lui passer 2 arguments
// - si un des arguments n'est pas passé lors de l'appel de la fonction, il sera égal à "undefined" dans la fonction
function foo(bar, baz) {
  console.log("foo appelée avec paramètres: bar= " + bar + ", baz= " + baz);
}

console.log("... après la définition MAIS avant les 2 appels...");

// on APPELLE la fonction 3 fois de suite avec des arguments différents
foo(12, false);
foo("toto", "le-blagueur");
foo(["riri", "fifi", "loulou"]); // on passe seulement un paramètre de type tableau

console.log("... après les appels...\n");

// --------------------------------------------------------------------------------------------------------------------
// DECLARE une fonction qui retourne la surface d'un cercle. Le paramètre de la fonction contient le rayon
function getCircleArea(radius) {
  return Math.PI * radius * radius; // surface = PI  x  R²
}

// on appelle la fonction en lui passant un rayon de 20, puis on stocke le retour dans une constante "area"
const radius = 20;
const area = getCircleArea(radius);
const result = Math.round(area);
console.log("la surface d'un cercle de rayon " + radius + "cm est égale à " + result + "cm²");
// manière plus simple de construire un texte avec des variables (string interpolation)
const msg = `surface cercle de rayon ${radius}cm = ${result}cm²`;
console.log(msg);

// --------------------------------------------------------------------------------------------------------------------
// On DECLARE une fonction qui additionne 2 paramètres.
// - le second parmètre est optionnel, sa valeur par défaut est 1 :
function addition(a, b = 1) {
  return a + b;
}
console.log("2+3=" + addition(2, 3));
console.log("2+undefined=" + addition(2));

// --------------------------------------------------------------------------------------------------------------------
// DECLARE une fonction appelé 'foo' et qui ne fait qu'écrire dans la console.
// Note importante: Elle déclare un message et un nombre variable d'arguments qui seront vu par la fonction comme un tableau
function bar(message, ...params) {
  console.log(`${message}: Fonction "bar" appelée avec params = [${params}]`);
  console.log(`. params est-il un tableau: ${Array.isArray(params)}, ${params?.length} arguments`);
}
// APPELLE la fonction en lui passant plusieurs arguments
bar("tableau", 2, undefined, "bye", false, { name: "Yohan" });
bar("string", "toto");
bar("null", null);
bar("nothing");

// ----------------------------------------------------------------------------------------------------------------------
// Autre façon de déclarer une fonction (la plus utilisée!)
// ------------------------------------------------------------------------------------------------------------------

// DECLARE une variable qui est égale à une fonction (version intermédiaire)
const boo = function (firstname) {
  console.log(`Hey ${firstname}, BOO!`);
};
// APPELLE la fonction = on utilise le nom de la variable
boo("arnaud");

// DECLARE une variable qui est égale à une fonction (version finale : LA FORME LA PLUS UTILISEE) :
const meow = (firstname) => {
  console.log(`${firstname} says MEOW!`);
};
// APPELLE la fonction = on utilise le nom de la variable
meow("lenny");

// --------------------------------------------------------------------------------------------------------------
// Exemple: des fonctions simples
// --------------------------------------------------------------------------------------------------------------

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
 * soustrait b de a
 * @param {Number} a
 * @param {Number} b
 * @returns b-a
 */
function sub(a, b = 0) {
  return a - b;
}

/**
 * renvoie valeur moyenne de a et b
 * @param {Number} a
 * @param {Number} b
 * @returns valeur moyenne
 */
function mean(a, b) {
  // une fonction qui appele une fonction : "inception" ?
  const res = add(a, b) / 2;
  return res;
}

// declare une variable "value" et lui assigne le retour de la fonction "mean" à qui on passe 12 et 8
let value = mean(12, 8);
console.log(`moyenne 12 et 8 = ${value}`);

value = sub(4); // dans la fonction 'sub', le paramètre 'rien' sera remplacé par sa valeur par défaut (= 0)
console.log(`soustraction de 4 et "rien" = ${value}`);

// assigne à "value" la moyenne de "a" et "b" où:
//  - "a" = somme de 2+1
//  - "b" = soustraction de 9-4
value = mean(add(2, 1), sub(9, 4));

// la même chose mais sur plusieurs lignes (moins pratique)
const a = add(2, 1);
const b = sub(9, 4);
value = mean(a, b);
