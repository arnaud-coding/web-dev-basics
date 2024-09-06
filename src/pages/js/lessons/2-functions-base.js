console.log('---------------------------------------- JS')

console.log('But: Découvrir les fonctions')
console.log('---------------------------------------- JS')

/* ====================================================================================================================
Une fonction:
=============
    - est un bloc de code qui fait quelque chose (ex.: calculer un âge, afficher un texte, changer un élément html, changer une propriété css, ...)
    - peut renvoyer/retourner une valeur (pas obligatoire)
    - peut recevoir un ou plusieurs paramètres (des données qu'on lui passe)
    - a pour vocation d'être appelée (réutilisée) plusieurs fois (avec des paramètres différents).

    - doit être DÉCLARÉE :
    -----------------------------------------------------------------------------------------------
      - déclare à JavaScript qu'on crée une fonction dont on donne le nom, les paramètres qu'elle recevra, et le code à exécuter :
      - syntaxe déclaration 1 : function foo(a, b) {...}
      - syntaxe déclaration 2 : const foo = (a, b) => {...}
        - "foo" est le nom de la fonction
        - "a" et "b" sont 2 VARIABLES qui contiendront les valeurs des paramètres qu'on DOIT passer à la fonction lors de son appel.
        - "a" et "b" sont locales à la fonction (elles n'existent pas en dehors) : Elles sont crées quand on appelle la fonction et sont détruites
          quand on en sort (portée d'une variable = le bloc de code ou elle est définie)
        - les accolades contiennent le corps de la function (le code qui sera exécuté à l'appel de la fonction)   (accolades = bloc de code)
      - JavaScript crée alors un emplacement mémoire pour contenir cette fonction MAIS il n'exécute pas la fonction (elle doit être appelée)

    - doit être APPELÉE ( ou invoquée ou exécutée) :
    -----------------------------------------------------------------------------------------------
      - syntaxe appel : const ret = foo(12, false)
        =>  appelle la fonction "foo" en lui passant en arguments les VALEURS "12" et "false"
            - le 1er argument passé ("12") va dans la varible "a" (1er paramètre de la fonction appelée)
            - le 2nd argument passé ("false") va dans la varible "b" (2nd paramètre de la fonction appelée)
        => le retour de la fonction est assigné à la variable "ret"

        - syntaxe appel : const ret = foo(age, adult)
        =>  appelle la fonction "foo" en lui passant en arguments les valeurs des VARIABLES "age" et "adult"
            - la valeur de la variable "age" (1er argument de l'appelant) va dans la variable "a" (1er paramètre de la fonction appelée)
            - la valeur de la variable "adult" (2eme argument de l'appelant) va dans la variable "b" (2eme paramètre de la fonction appelée)

        => le retour de la fonction est assigné à la variable "ret"

    const foo = (a, b) => {...}   // la fonction travaille avec les VARIABLES "a" et "b"
                 ↑  ↑
             foo(c, d)            // lors de l'appel : valeur de "c" va dans "a", valeur de "d" va dans "b"

==================================================================================================================== */

console.log('... avant la définition de foo...')

// on DÉCLARE la fonction "foo" (elle n'est PAS exécutée). Ici, la fonction "foo" s'attend à recevoir 2 paramètres : "bar" et "baz"
// - JavaScript ne vérifie pas que l'on passe les bons paramètres (c'est au dévelopeur de passer les bons paramètres quand il appelle la fonction)
// - quand on l'appelera, on DEVRA lui passer 2 arguments que la fonction s'qttend à recevoir
// - si un des arguments n'est pas passé lors de l'appel de la fonction, il sera égal à "undefined" dans la fonction
function foo(bar, baz) {
  console.log("'foo' appelée avec paramètres: bar= " + bar + ', baz= ' + baz)
}

console.log('... après la définition MAIS avant les 2 appels de la fonction...')

// on APPELLE la fonction 3 fois de suite avec des arguments différents
foo(12, false)
foo('toto', 'le-blagueur')
foo(['riri', 'fifi', 'loulou']) // on passe seulement un paramètre de type tableau

console.log('... après les appels...\n')

// --------------------------------------------------------------------------------------------------------------------
// DECLARE une fonction qui retourne la surface d'un cercle. Le paramètre de la fonction contient le rayon
function getCircleArea(radius) {
  return Math.PI * radius * radius // surface = PI  x  R²
}

// on appelle la fonction en lui passant un rayon de 20, puis on stocke le retour dans une constante "area"
const radius = 20
const area = getCircleArea(radius) // appel la fonction en lui passant le contenu de la variable "radius". Stocke le résultat dans 'area'
const result = Math.round(area) // arrondi le résultat

// ancienne manière de construire une chaine
console.log('surface cercle de rayon ' + radius + 'cm = ' + result + 'cm²')
// manière plus simple de construire un texte avec des variables (string interpolation)
console.log(`surface cercle de rayon ${radius}cm = ${result}cm²`)

// --------------------------------------------------------------------------------------------------------------------
// On DECLARE une fonction qui additionne 2 paramètres.
// - le second parmètre est optionnel, sa valeur par défaut est 1 :
function addition(a, b = 1) {
  return a + b
}
console.log('2+3=' + addition(2, 3)) // appelle la fonction en lui passant les 2 paramètres
console.log('2+undefined=' + addition(2)) // appelle la fonction en lui passant le 1er paramètre (pour le 2nd, la valeur par défaut sera utilisé)

// --------------------------------------------------------------------------------------------------------------------
// DECLARE une fonction appelé 'foo' et qui ne fait qu'écrire dans la console.
// Note importante: Elle déclare un titre et un nombre variable d'arguments qui seront vu par la fonction comme un tableau
function bar(title, ...params) {
  console.log(`Fonction "bar" appelée avec title = "${title}" et params = [${params}]`)
  console.log(`. params est-il un tableau: ${Array.isArray(params)}, ${params?.length} arguments`)
}
// APPELLE la fonction en lui passant plusieurs arguments
bar('params', 2, undefined, 'bye', false, { name: 'Yohan' })
bar('array', [2, undefined, 'bye', false, { name: 'Yohan' }])
bar('string', 'toto')
bar('null', null)
bar('undefined')

// ----------------------------------------------------------------------------------------------------------------------
// Autre façon de déclarer une fonction (la plus utilisée!)
// ------------------------------------------------------------------------------------------------------------------

// DECLARE une variable qui est égale à une fonction (version intermédiaire)
const boo = function (firstname) {
  console.log(`Hey ${firstname}, BOO!`)
}
// APPELLE la fonction = on utilise le nom de la variable
boo('arnaud')

// DECLARE une variable qui est égale à une fonction (version finale : LA FORME LA PLUS UTILISEE) :
const meow = (firstname) => {
  console.log(`${firstname} says MEOW!`)
}
// APPELLE la fonction = on utilise le nom de la variable
meow('lenny')

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
  return a + b
}

/**
 * soustrait b de a
 * @param {Number} a
 * @param {Number} b
 * @returns b-a
 */
function sub(a, b = 0) {
  return a - b
}

/**
 * renvoie valeur moyenne de a et b
 * @param {Number} a
 * @param {Number} b
 * @returns valeur moyenne
 */
function mean(a, b) {
  // une fonction qui appele une fonction : "inception" ?
  const res = add(a, b) / 2
  return res
}

// declare une variable "value" et lui assigne le retour de la fonction "mean" à qui on passe 12 et 8
let value = mean(12, 8)
console.log(`moyenne entre 12 et 8 = ${value}`)

value = sub(4) // dans la fonction 'sub', le paramètre 'rien' sera remplacé par sa valeur par défaut (= 0)
console.log(`soustraction de 4 et "rien" = ${value}`)

// assigne à "value" la moyenne de "a" et "b" où:
//  - "a" = somme de 2+1
//  - "b" = soustraction de 9-4
value = mean(add(2, 1), sub(9, 4))
console.log(`moyenne entre (2+1) et (9-4) = ${value}`)

// la même chose mais sur plusieurs lignes (moins pratique)
const a = add(2, 1)
const b = sub(9, 4)
value = mean(a, b)
