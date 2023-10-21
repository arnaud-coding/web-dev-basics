console.log("----------------------------------------");
console.log("But: Découvrir les fonctions");
console.log("----------------------------------------");

/* ==================================================================================================================== 
Une fonction:
    - est un bloc de code qui fait quelque chose et peut renvoyer quelque chose d'autre
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

console.log("avant la définition");

// on DÉCLARE la fonction (elle n'est PAS exécutée)
function foo(bar, baz) {
  // La fonction "foo" s'attend à recevoir 2 arguments : "bar" et "baz"
  console.log("la fonction foo a été appelée avec les paramètres", bar, baz);
}

console.log("après la définition MAIS avant l'appel");
// on APPELLE la fonction 2 fois de suite avec des paramètres différents
foo(12, false);
foo("toto", "le-blagueur");
