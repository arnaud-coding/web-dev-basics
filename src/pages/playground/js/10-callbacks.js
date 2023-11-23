// IIFE pour isoler les noms de variables
(() => {
  /* eslint-disable n/no-callback-literal */

  /** ------------------------------------------------------------------------------------------------------
   * utilisation d'un "callback" (une fonction qui sera rappelée)
   * ----------------------------------------------------------------------------------------------------
   * - on passe une fonction "cb" à la fonction "boo".
   * - "boo" rappellera la fonction "cb" quand elle le voudra
   * -------------------------------------------------------------------------------------------------------- */

  /**
   * The callback type expected, as expected by the foo function.
   * @callback fooCallback
   * @param {number} n the number to process
   * @returns {void}
   */

  /**
   * Cette fonction utilise une fonction callback
   * @param {number} n le parametre qu'on attend
   * @param {fooCallback} cb la fonction callback qu'on va rappeler dans cette fonction
   */
  const foo = (n, cb) => {
    console.log("foo called with n=", n);
    cb(n * 3); // appelle la fonction callback qui a été passée à cette fonction
  };

  /**
   * définit la fonction callback qui devra etre rappelée par "foo"
   * @param {number} x le parametre qui devra etre passé par "foo"
   */
  const callback = (x) => {
    console.log("named function 'callback' called, x=", x);
  };

  // appelle la fonction "foo" en lui passant le callback (ici, une fontion nommée "callback")
  console.log("calling foo, callback: named function");
  foo(1, callback);

  // appelle la fonction "foo" en lui passant le callback (ici, une fontion anonyme d'une seule ligne)
  console.log("calling foo, callback: singleline anonymous function");
  foo(2, (x) => console.log("anonymous singleline callback called, x=", x));

  // appelle la fonction "boo" en lui passant le callback (ici, une fontion anonyme de plusieurs lignes possibles) LA FORME LA PLUS COURANTE
  console.log("calling foo, callback: multiline anonymous function");
  foo(3, (x) => {
    console.log("anonymous multiline callback called, x=", x);
  });

  // ----------------------------------------------------------
  // exo callback : filtre
  // --------------------------------------
  const notes = [5, 10, 8, -9, -25, 19, 6, -4];

  /**
   * @callback filterCallback The comparison function : Receive a number and returns true to keept it, false to reject
   * @param {number} n the number to test
   * @returns {boolean} true to keep the number, false to reject the number
   */

  /**
   * Trie un tableau de nombres selon un critère de compqraison donné par une callback
   * @param {number[]} numbers - le tableau de nombres à trier
   * @param {filterCallback} cb - la fonction qui va faire la comparaison.
   * @returns le tableau trié
   */
  const filter = (numbers, cb) => {
    const res = [];
    for (const n of numbers) {
      // "if" appelle "cb" en lui passant n et utilise le retour de cb pour tester le "if"
      if (cb(n)) {
        res.push(n);
      }
    }
    return res;
  };

  // Appelle la fonction filter en lui passant le tableau de notes et la fonction qui va faire la comparaison.
  // Ici, la comparaison renvoie 'true' pour les nombres négatifs
  const negs = filter(notes, (n) => n < 0);
  console.log("filter negs:", negs);

  // Ici, la comparaison renvoie 'true' pour les nombres positifs
  const pos = filter(notes, (n) => n > 0);
  console.log("filter pos:", pos);

  // Ici, la comparaison renvoie 'true' pour les nombres entre -10 et 10
  const smol = filter(notes, (n) => n > -10 && n < 10);
  console.log("filter smol:", smol);

  // ----------------------------------------------------------
  // exo callback : Sort
  // --------------------------------------

  const family = [
    { firstname: "Agnès", lastname: "Berthollet", male: false, birthday: new Date(1967, 1, 27) },
    { lastname: "Berthollet", firstname: "Loïc", male: true, birthday: new Date(1967, 2, 17) },
    { firstname: "Thomas", lastname: "Berthollet", male: true, birthday: new Date(1994, 8, 25) },
    { firstname: "Arnaud", lastname: "Berthollet", male: true, birthday: new Date(1995, 7, 22) }
  ];

  /**
   * @callback mapCallback The conversion function : Receive a person and returns its name
   * @param {object} n the person to transorm
   * @returns {string} the person's name
   */

  /**
   * transforme un tableau de personnes en un tableau de noms
   * @param {object[]} people
   * @param {mapCallback} cb
   * @returns {string[]} tableau de noms
   */
  const map = (people, cb) => {
    const res = [];
    for (const person of people) {
      const name = cb(person);
      res.push(name);
    }
    return res;
  };

  const names = map(family, (person) => {
    return `${person.firstname} ${person.lastname}`; // ou : person.firstname + " " + person.lastname;
  });
  console.log("sorted:", names);
})();
