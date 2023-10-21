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

// eslint-disable-next-line no-unused-vars
// import * as util from "utils";

console.log("----------------------------------------");
console.log("But: Découvrir les variables");
console.log("----------------------------------------");

/* ==================================================================================================================== 
Une variable:
    - contient une ou plusieurs valeurs.
    - est d'un type: (JavaScript = language à typage FAIBLE ==> le type de la variable peut changer quand on la réassigne)
        - chaine de caractère: "", "a", "arnaud", "quelle belle journée"
        - booléen : true, false
        - nombre : entier ou décimal (à virgule), 0, -50, 350.123456
        - date ou heure, ou les deux
        - un tableau: ["marc", 22, 12:19]
        - un objet : {name:"peter", birthday:2001} --------> Ici, cet objet  définit une personne: 2 propriétés (marc et birthday) ainsi que leurs valeurs
    - doit être DÉCLARÉE et INITIALISÉE (en une fois ou en deux fois)
        - DÉCLARÉE: - déclare à node qu'on veut utiliser une variable dont on donne le nom. 
                    - Node crée alors un emplacement mémoire pour contenir cette variable.
                    - Cette variable ne contient alors aucune valeur, on dit qu'elle est indéfinie
        - INITIALISÉE: donne une valeur à la variable

    - existe uniquement dans la portée/bloc ou ellee est définie. 
==================================================================================================================== */

// --------------------------------------------------------------------------------------------------------------------
// On DÉCLARE une variable SANS l'initialiser :  Ici on déclare une variable qui s'appelle firstname;
let firstname;
console.log("la valeur de la variable 'firstname' = " + firstname); // écrit dans la console la VALEUR de firstname;

// On INITIALISE la valeur de la variable 'firstname'
firstname = "Arnaud";
console.log("la valeur de la variable 'firstname' = " + firstname); // écrit dans la console la VALEUR de firstname;

// On MODIFIE la valeur de la variable 'firstname'
firstname = "Loic";
console.log("la valeur de la variable 'firstname' = " + firstname); // écrit dans la console la VALEUR de firstname;
// --------------------------------------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------------------------------------
// On DÉCLARE une variable ET on INITIALISE :  Ici on déclare une variable qui s'appelle age et qui contient la valeur 25
let age = 25;
console.log("la valeur de la variable 'age' = " + age);

// On MODIFIE la valeur de la variable "age". Ici on lui ajoute 10
age = age + 10;
console.log("la valeur de la variable 'age' = " + age);

// On DÉCLARE une variable ET on l'INITIALISE avec une partie fixe ET la valeur de la variable "firstname"
// le mot-clé "cont" signifie que la valeur de la variable ne doit pas changer.
const welcome = "Hello " + firstname;
console.log("la valeur de la variable 'welcome' = " + welcome);
// Si on dé-commente la ligne suivante, cela va provoquer une erreur d'exécution (car on tente de modifier une constante)
// welcome = "toto";
// --------------------------------------------------------------------------------------------------------------------

// gender = 12;   ---------> Ici, erreur car la variable est initialisée sans avoir été déclarée préalablement.

// --------------------------------------------------------------------------------------------------------------------
let x = true; // La variable "x" est de type booléen, sa valeur est vraie.
console.log(typeof x, x); // affiche dans la console le type de la variable "x", puis la valeur de "x"

// réassigne la valeur de la variable x = date de maintenant
x = new Date();
console.log(typeof x, x);

// réassigne la valeur de la variable x = surface d'un cercle de rayon 4cm (s = PI x R²)
x = Math.PI * 4 * 4;
console.log(typeof x, x);

// réassigne la valeur de la variable x = un tableau avec 7 éléments de types différents (le dernier est lui-même un tableau)
x = ["arnaud", "thomas", "loïc", "agnès", 12, false, [1, 2, 3]];
console.log(typeof x, x);

// réassigne la valeur de la variable x = un objet avec des propriétés (firstname, birthday...)
x = { firstname: "toto", weight: 70, birthday: new Date(1970, 12, 31) }; // Ce firsname n'est pas celui défini plus haut, car ici, il est dans le bloc de code de "x"
console.log(typeof x, x);

// calcul de l'age de toto
age = new Date().getFullYear() - x.birthday.getFullYear();
// affiche une phrase qui donne le poids et l'age de toto.
console.log(x.firstname + " pèse " + x.weight + " kg. Il a " + age + " ans.");
// --------------------------------------------------------------------------------------------------------------------
