console.log("----------------------------------------");
console.log("But: Découvrir les fonctions");
console.log("----------------------------------------");

/* ==================================================================================================================== 
Une fonction:
    - est un bloc de code qui fait quelque chose et peut renvoyer une valeur
      (ex.: calculer un âge, afficher un texte, changer un élément html, changer une propriété css, ...)
    - peut recevoir un ou plusieurs arguments (i.e. des données qu'on lui passe)                 i.e. = Id est = c'est à dire
    - a pour vocation d'être appelée(réutilisée) plusieurs fois (avec des paramètres différents).
    - doit être DÉCLARÉE : 
        - déclare à node qu'on veut utiliser une fonction dont on donne le nom. 
        - Node crée alors un emplacement mémoire pour contenir cette fonction MAIS il n'exécute pas la fonction (elle doit être appelée)
        - syntaxe : function fctName(parameter1, parameter2) {...}
    - doit être APPELÉE ( ou invoquée) :
        - syntaxe : fctName(12, false)   =====>    nom de la fonction suivie des arguments entre parenthèses
        
==================================================================================================================== */

console.log("avant la définition...");

// on DÉCLARE la fonction (elle n'est PAS exécutée). Ici, la fonction "foo" s'attend à recevoir 2 arguments : "bar" et "baz"
function foo(bar, baz) {
  console.log("la fonction foo a été appelée avec les paramètres", bar, baz);
}

console.log("après la définition MAIS avant les appels...");
// on APPELLE la fonction 2 fois de suite avec des paramètres différents
foo(12, false);
foo("toto", "le-blagueur");

console.log("après les appels...");

// --------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------

// DECLARE une fonction qui retourne la surface d'un cercle dont on donne le rayon :
function getCircleArea(radius) {
  return Math.PI * radius * radius; // surface = PI  x  R²
}
// on appelle la fonction en lui passant un rayon de 20, puis on stocke le retour dans une constante "area"
const radius = console;
const area = getCircleArea(radius);
console.log(
  "la surface d'un cercle de rayon " +
    radius +
    " est égale à " +
    Math.round(area)
);
// manière plus simple de construire un texte avec des variables
const msg = `hello ${radius}, ta surface est égale à ${Math.round(area)}`;
console.log(msg);

function bar(...params) {
  console.log(params);
}
console.log(bar(2, 5, 3, 5));
