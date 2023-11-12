const clubs = ["OM", "OL", "PSG", "RC Lens", "LOSC"];
const family = [
  { firstname: "Agnès", lastname: "Berthollet", male: false, birthday: new Date(1967, 1, 27) },
  { lastname: "Berthollet", firstname: "Loïc", male: true, birthday: new Date(1967, 2, 17) },
  { firstname: "Thomas", lastname: "Berthollet", male: true, birthday: new Date(1994, 8, 25) },
  { firstname: "Arnaud", lastname: "Berthollet", male: true, birthday: new Date(1995, 7, 22) }
];

// exemples utilsation des tableaux
// ----------------------------------------------
const agnes = family[0]; // récupère le 1er membre de la famille
console.log("club:", clubs[1]); // récupère le 2e élément du tableau des clubs
console.log("length:", clubs.length);// récupère la longueur du tableau des clubs

// autre facon de récupérer la valeur d'une propriété (object + notation tableau avec index = nom propriété)
// - avantage: on peut utiliser une vqriqble pour comme index pour récupérer une propriété de l'objet
// eslint-disable-next-line dot-notation
console.log("x:", agnes["firstname"]);

/** ===========================================================================
 * * Loops (boucles)
 ============================================================================== */
//#region loops - for, for-in, for-of

/** ------------------------------------------------------
  * for
 --------------------------------------------------------- */
// exemple 1: boucle de 3 tours
for (let index = 0; index < 3; index++) {
  // ce bloc de code sera exécuté 3 fois (index va aller de 0 à 2: 0 au 1er passage, 1 au 2nd passage et 2 au dernier passage)
  console.log("ex.1 - index:", index);
}

// exemple 2: va de -10 à +10 compris, de 5 en cinq
for (let index = -10; index <= 10; index += 5) {
  console.log("ex.2 - index:", index);
}

// exemple 3: parcourt le tableau des clubs (clubs.length indique le nombre d'élements dans le tableau)
for (let index = 0; index < clubs.length; index++) {
  const club = clubs[index];
  console.log("ex.3 - index, club:", index, club);
}

// exemple 4: parcourt le tableau des membres de la famille (family.length indique le nombre d'élements dans le tableau)
for (let index = 0; index < family.length; index++) {
  const person = family[index];
  console.log("ex.3 - index, family:", index, person.firstname);
}

/** ------------------------------------------------------
  * for ... in
 --------------------------------------------------------- */
// parcours un tableau de strings (le for...in renvoie l'index du tableau)
for (const index in clubs) {
  console.log("club:", clubs[index]);
}

// parcours un tableau d'objets (le for...in renvoie l'index du tableau)
for (const index in family) {
  const person = family[index];
  console.log(`for...in family: index=${index}, person=${person.firstname} ${person.lastname}`);
}

// parcours un objet ( le for...in renvoie les noms de propriétés)
for (const propertyName in agnes) {
  console.log("person property/value:", propertyName, agnes[propertyName]);
}

/** ------------------------------------------------------
  * for ... of
 --------------------------------------------------------- */
// parcours un tableau (le for...of renvoie la valeur de l'élément)
for (const club of clubs) {
  console.log("for...of clubs:", club);
}

// parcours un tableau (le for...of renvoie la valeur de l'élément)
for (const person of family) {
  console.log("for...of family:", person.firstname);
}

//#endregion

//#region loops - do while

/** ------------------------------------------------------
  * do ... while
  --------------------------------------------------------- */
let r;
do {
  // bloc de code à éxécuter (toujours exécuté au moins 1 fois, car la condition est examinée APRES le bloc de code)
  r = Math.random();
  console.log("r:", r);
} while (r <= 0.5); // condition (fait des tours de boucle tant que la condition est vraie)

/** ------------------------------------------------------
  * while
  --------------------------------------------------------- */
r = Math.random();
while (r < 0.5) {
  // bloc de code à éxécuter (PAS toujours exécuté au moins 1 fois, car la condition est examiné AVANT le bloc de code)
  r = Math.random();
  console.log("r:", r);
}

//#endregion

//#region loops - break, continue

/** ------------------------------------------------------
  * break : permet de s'arrêter sur un élément du tableau
  --------------------------------------------------------- */
for (const person of family) {
  if (person.male) {
    console.log("break family: first male member is", person.firstname);
    break; // permet de stopper immédiatement une boucle
  }
}

/** ------------------------------------------------------
  * continue : permet d'ignorer certains éléments du tableau parcouru
  --------------------------------------------------------- */
for (const person of family) {
  const year = person.birthday.getFullYear();
  const age = new Date().getFullYear() - year;
  if (age > 40) {
    continue; // ignore tout le code qui suit, et retourne directement au for...
  }

  console.log("continue family: person under 40 is", person.firstname);
}

//#endregion

/** ===========================================================================
 * * Choices 
 ============================================================================== */

//#region choices (if-else if-else, switch) 

/** ------------------------------------------------------
  * if ... else if ... else 
 --------------------------------------------------------- */
const ifHour = (hours) => {
  if (hours < 6) {
    console.log(`il est ${hours} heures, bonne fin de nuit`);
  } else if (hours < 12) {
    console.log(`il est ${hours} heures, bonne matinée`);
  } else if (hours > 22) {
    console.log(`il est ${hours} heures, bonne nuit`);
  } else {
    console.log(`il est ${hours} heures, bonne après-midi`);
  }
};

ifHour(3);
ifHour(11);
ifHour(15);
ifHour(23);

/** ------------------------------------------------------
  * switch
 --------------------------------------------------------- */
const switchHour = (hours) => {
  switch (hours) {
    case 8:
    case 12:
    case 20:
      console.log(`il est ${hours} heures, à table !`);
      break;

    case 19:
      console.log(`il est ${hours} heures, go home !`);
      break;

    default:
      console.log(`il est ${hours} heures`);
  }
};

switchHour(8);
switchHour(10);
switchHour(19);
switchHour(20);

//#endregion

/** ===========================================================================
 * * Errors
 ============================================================================== */

/** ------------------------------------------------------
  * throw
 --------------------------------------------------------- */
// todo

/** ------------------------------------------------------
  * try .. catch ... finally
 --------------------------------------------------------- */
// todo
