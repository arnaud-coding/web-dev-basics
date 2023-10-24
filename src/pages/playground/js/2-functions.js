console.log("---------------------------------------- JS");
console.log("But: Découvrir les fonctions");
console.log("---------------------------------------- JS");

/* ==================================================================================================================== 
Une fonction:
    - est un bloc de code qui fait quelque chose (ex.: calculer un âge, afficher un texte, changer un élément html, changer une propriété css, ...)
    - peut renvoyer une valeur (pas obligatoire)
    - peut recevoir un ou plusieurs arguments (i.e. des données qu'on lui passe)                 i.e. = Id est = c'est à dire
    - a pour vocation d'être appelée(réutilisée) plusieurs fois (avec des paramètres différents).
    
    - doit être DÉCLARÉE : 
      - "déclare" à node qu'on veut utiliser une fonction dont on donne le nom. 
      - format: function foo(args) { ... }
          - foo est nom de la fonction
          - args est le ou les arguments qu'on passe à la fonction
          - les accolades contiennent le code qui sera exécutée à l'appel de la fonction
      - Node crée alors un emplacement mémoire pour contenir cette fonction MAIS il n'exécute pas la fonction (elle doit être appelée)
    - doit être APPELÉE ( ou invoquée) :
      - syntaxe : foo(12, false)   =====>    nom de la fonction suivie des arguments entre parenthèses
    
==================================================================================================================== */

console.log("... avant la définition de foo...");

// on DÉCLARE la fonction (elle n'est PAS exécutée). Ici, la fonction "foo" s'attend à recevoir 2 arguments : "bar" et "baz"
function foo(bar, baz) {
  console.log("la fonction foo a été appelée avec les paramètres: ", bar, baz);
}

console.log("... après la définition MAIS avant les 2 appels...");

// on APPELLE la fonction 2 fois de suite avec des paramètres différents
foo(12, false);
foo("toto", "le-blagueur");

console.log("... après les appels...\n");

// --------------------------------------------------------------------------------------------------------------------
// DECLARE une fonction qui retourne la surface d'un cercle. L'argument de la fonction contient le rayon
function getCircleArea(radius) {
  return Math.PI * radius * radius; // surface = PI  x  R²
}

// on appelle la fonction en lui passant un rayon de 20, puis on stocke le retour dans une constante "area"
const radius = 20;
const area = getCircleArea(radius);
const result = Math.round(area)
console.log(
  "la surface d'un cercle de rayon " +
  radius +
  "cm est égale à " +
  result + "cm²"
  );
  // manière plus simple de construire un texte avec des variables (string interpolation)
  const msg = `surface cercle de rayon ${radius}cm = ${result}cm²`;
  console.log(msg);
  
  // --------------------------------------------------------------------------------------------------------------------
  // DECLARE une fonction appelé 'foo' et qui ne fait qu'écrire dans la console.
  // Note importante: Elle déclare un message et un nombre variable d'arguments qui seront vu par la fonction comme un tableau
  function bar(message, ...params) {
    console.log(`${message}: Fonction "bar" appelée avec params = [${params}]`);
    console.log(`. params est-il un tableau: ${Array.isArray(params)}, ${params?.length} arguments`);
}
  // APPELLE la fonction en lui passant plusieurs arguments
bar("tableau", 2, undefined, "bye", false, {name: 'Yohan'});
bar("string", "toto")
bar("null", null)
bar("nothing")