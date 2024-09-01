/* Cette page de code est faite pour apprendre le JavaScript.
    - Elle ne tourne pas dans un navigareur par souci de simplicité
    - On peut la faire tourner soit:
        - Dans VScode via le menu "run"
        - Dans un terminal en utilisant node js. Commandes:
            - "aller dans le dossier ou est le fichier js": cd ./src/pages/playground/js
            - "lancer node en lui indiquant quel fichier js exécuter": node 1-variables.js

Note: L'ordinateur et sa console ne savent pas exécuter un fichier JS. Pour cela, ils utilisent "node".
Note: On peut débuger avec VScode; on ne peut faire que des console.log avec node.
*/

console.log('---------------------------------------- JS')
console.log('But: Découvrir les variables')
console.log('---------------------------------------- JS')

/* ====================================================================================================================
Une variable:
    - contient une ou plusieurs valeurs.
    - n'existe uniquement dans la portée/le bloc ou elle est définie.
    - est d'un type: (JavaScript = language à typage FAIBLE ==> le type de la variable peut changer quand on la réassigne)
        - Type "chaine de caractère" (string) : "", "a", "arnaud", "quelle belle journée"
        - Type "booléen" (bool) : true, false
        - Type "nombre" (number) : entier ou décimal (à virgule), 0, -50, 350.123456
        - Type "date" ou "heure", ou les "deux" (Date)
        - Type "tableau"  (Array)) : ["marc", 22, 12:19]
        - Type "objet" (object) : {name:"peter", birthday:2001} ---> Ici, cet objet définit une personne: 2 propriétés (marc et birthday) et leurs valeurs
    - doit être DÉCLARÉE et INITIALISÉE (en une fois ou en deux fois)
        - DÉCLARÉE: - déclare à node qu'on veut utiliser une variable dont on donne le nom.
                      Ex.: let name;
                    - Node crée alors un emplacement mémoire pour contenir cette variable.
                    - Cette variable ne contient alors aucune valeur, elle est indéfinie (undefined)
        - INITIALISÉE ou ASSIGNÉE: donne une valeur à la variable
==================================================================================================================== */

// --------------------------------------------------------------------------------------------------------------------
// On DÉCLARE une variable SANS l'initialiser :  Ici on déclare une variable qui s'appelle firstname;
// note: déclarée mais sont assignée: sa valeur est 'undefined'.
let firstname
console.log("la valeur de la variable 'firstname' est égal à " + firstname) // écrit dans la console la VALEUR de firstname (cad 'undefined)

// On INITIALISE/ASSIGNE la valeur de la variable 'firstname'
firstname = 'Arnaud'
console.log("valeur variable 'firstname' = " + firstname) // écrit dans la console la VALEUR de firstname;

// On MODIFIE/REASSIGNE la valeur de la variable 'firstname'
firstname = 'Thomas'
console.log("valeur variable 'firstname' = " + firstname) // écrit dans la console la VALEUR de firstname;
// --------------------------------------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------------------------------------
// On DÉCLARE une variable ET on INITIALISE en même temps : la variable s'appelle "age" et contient la valeur 25
let age = 25
console.log("valeur variable 'age' = " + age)

// On MODIFIE/REASSIGNE la valeur de la variable "age". Ici on lui ajoute 10
age = age + 10
console.log("valeur variable 'age' = " + age)

// On DÉCLARE une variable ET on l'INITIALISE avec une partie fixe ET la valeur de la variable "firstname"
// le mot-clé "const" signifie que la valeur de la variable ne doit pas changer.
const welcome = 'Hello ' + firstname
console.log("valeur variable 'welcome' = " + welcome)

// Si on dé-commente la ligne suivante, cela va provoquer une erreur d'exécution car on tente de modifier une constante
// welcome = "toto";
// --------------------------------------------------------------------------------------------------------------------

// gender = 12;   ---------> Ici, erreur car la variable est initialisée sans avoir été déclarée préalablement.

console.log('\nAffichage type variable x, et valeur variable x:')

// --------------------------------------------------------------------------------------------------------------------
let x = true // La variable "x" est de type booléen, sa valeur est 'vraie'.
console.log(typeof x, x) // affiche dans la console le type de la variable "x", puis la valeur de "x"

// réassigne la valeur de la variable x en changeant aussi son type: valeur= date de maintenant; type= Date
x = new Date()
console.log(typeof x, x)

// réassigne la valeur de la variable x en changeant aussi son type: valeur= surface cercle rayon 4cm (s = PI x R²), type= number
x = Math.PI * 4 * 4
console.log(typeof x, x)

// réassigne la valeur de la variable x en changeant aussi son type: valeur= tableau de 7 éléments de types différents (le dernier est lui-même un tableau)
x = ['arnaud', 'thomas', 'loïc', 'agnès', 12, false, [1, 2, 3]]
console.log(typeof x, x)

// réassigne la valeur de la variable x en changeant aussi son type: valeur= un objet avec des propriétés "firstname" et "birthday"
x = { firstname: 'Arnaud', weight: 55, birthday: new Date(1995, 8, 25) } // Ce firstname n'est pas celui défini plus haut, car ici, il est dans le bloc de code de "x"
console.log(typeof x, x)

// calcul de l'age de toto (réutilise la variable 'toto' définie plus haut dans cette page)
// @ts-ignore
age = new Date().getFullYear() - x.birthday.getFullYear()
// affiche une phrase qui donne le poids et l'age de toto.
console.log(x.firstname + ' pèse ' + x.weight + ' kg, il a ' + age + ' ans.')
// même phrase, mais avec une technique différente (string interpolation)
console.log(`${x.firstname} pèse ${x.weight} kg, il a ${age} ans.`)
// --------------------------------------------------------------------------------------------------------------------
