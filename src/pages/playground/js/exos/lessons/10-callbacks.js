// IIFE pour isoler les noms de variables
;(() => {
  /* eslint-disable n/no-callback-literal */

  /** ------------------------------------------------------------------------------------------------------
   * utilisation d'un "callback" (une fonction qui sera rappelée) :
   * ----------------------------------------------------------------------------------------------------
   * - on passe une fonction "cb" à la fonction "boo".
   * - "boo" rappellera la fonction "cb" quand elle le voudra
   * -------------------------------------------------------------------------------------------------------- */

  /**
   * Cette fonction utilise une fonction callback
   * @param {number} n le parametre qu'on attend
   * @param {function(number):void} cb la fonction callback qu'on va rappeler dans cette fonction
   */
  const foo = (n, cb) => {
    console.log('foo called with n=', n)
    cb(n * 3) // appelle la fonction callback qui a été passée à cette fonction
  }

  /**
   * définit la fonction callback qui devra etre rappelée par "foo"
   * @param {number} x le parametre qui devra etre passé par "foo"
   */
  const callback = (x) => {
    console.log("named function 'callback' called, x=", x)
  }

  // appelle la fonction "foo" en lui passant le callback (ici, une fontion nommée "callback")
  console.log('calling foo, callback: named function')
  foo(1, callback)

  // appelle la fonction "foo" en lui passant le callback (ici, une fontion anonyme d'une seule ligne)
  console.log('calling foo, callback: singleline anonymous function')
  foo(2, (x) => console.log('anonymous singleline callback called, x=', x))

  // appelle la fonction "boo" en lui passant le callback (ici, une fontion anonyme de plusieurs lignes possibles) LA FORME LA PLUS COURANTE
  console.log('calling foo, callback: multiline anonymous function')
  foo(3, (x) => {
    console.log('anonymous multiline callback called, x=', x)
  })

  // ----------------------------------------------------------
  // exo callback : filtre
  // --------------------------------------
  const notes = [5, 10, 8, -9, -25, 19, 6, -4]

  /**
   * Trie un tableau de nombres selon un critère déterminé par une callback
   * @param {number[]} numbers - le tableau de nombres à filtrer
   * @param {function(number):boolean} cb - la fonction qui filtre.
   * @returns le tableau filtré
   */
  const filter = (numbers, cb) => {
    // res contient le tableau filtré
    const res = []

    // parcours le tableau original : dans la boucle, "n" prendra successivement toutes les valeurs de "numbers"
    for (const n of numbers) {
      // "if" appelle "cb" en lui passant "n" et utilise le retour de cb pour tester le "if"
      if (cb(n)) {
        // si la callback (cb) a retourné true, alors on ajoute "n" au tableau filtré
        res.push(n)
      }
    }
    return res
  }

  // Appelle la fonction filter en lui passant le tableau de notes et la fonction qui va faire la comparaison.
  // Ici, la comparaison renvoie 'true' pour les nombres négatifs
  const negs = filter(notes, (n) => n < 0)
  console.log('filter negs:', negs)

  // Ici, la comparaison renvoie 'true' pour les nombres positifs
  const pos = filter(notes, (n) => n > 0)
  console.log('filter pos:', pos)

  // Ici, la comparaison renvoie 'true' pour les nombres entre -10 et 10
  const smol = filter(notes, (n) => n > -10 && n < 10)
  console.log('filter smol:', smol)

  // la meme chose que notre fonction filter, mais avec la fonction filter des tableaux JS
  const bigs = notes.filter((n) => n >= 10 || n <= -10)
  console.log('bigs:', bigs)

  // -------------------------------

  const family = [
    { firstname: 'Agnès', lastname: 'Berthollet', male: false, birthday: new Date(1967, 1, 27) },
    { lastname: 'Berthollet', firstname: 'Loïc', male: true, birthday: new Date(1967, 2, 17) },
    { firstname: 'Thomas', lastname: 'Berthollet', male: true, birthday: new Date(1994, 8, 25) },
    { firstname: 'Arnaud', lastname: 'Berthollet', male: true, birthday: new Date(1995, 7, 22) },
    { firstname: 'Pierre', lastname: 'Laurent', male: true, birthday: new Date(1940, 0, 27) },
    { firstname: 'Marie-Claude', lastname: 'Laurent', male: false, birthday: new Date(1945, 10, 26) }
  ]

  /**
   * Trie un tableau de objets selon un critère déterminé par une callback
   * @param {object[]} objects - le tableau de objets à filtrer
   * @param {function(object):boolean} cb - la fonction qui filtre.
   * @returns le tableau filtré
   */
  const filterObjects = (objects, cb) => {
    // res contient le tableau filtré (le résultat) qu'on retournera à la fin
    const res = []

    // parcours le tableau original : dans la boucle, "obj" prendra successivement toutes les valeurs de "objects"
    for (const obj of objects) {
      // "if" appelle "cb" en lui passant "obj" et utilise le retour de cb pour tester le "if"
      if (cb(obj)) {
        // si la callback (cb) a retourné true, alors on ajoute "obj" au tableau filtré
        res.push(obj)
      }
    }
    return res
  }

  const men = filterObjects(family, (obj) => {
    // role de cette fonction anonyme : retourner true si on veut garder l'objet passé
    return obj.male
  })
  console.log('men ~ men:', men)

  // ----------------------------------------------------------
  // exo callback : Map
  // --------------------------------------

  /**
   * transforme un tableau d'objets en un autre  tableau d'objets
   * @param {object[]} arr le tableau d'objets à transformer
   * @param {function(object): string} cb la fonction à appeler pour transformer un objet
   * @returns {string[]} tableau transformé
   */
  const map = (arr, cb) => {
    const res = []
    for (const obj of arr) {
      const transform = cb(obj)
      res.push(transform)
    }
    return res
  }

  // on appelle la fonction map en lui passant la famille et une callback qui transforme une personne en son nom et prénom
  const names = map(family, (person) => {
    return `${person.firstname} ${person.lastname}` // ou : person.firstname + " " + person.lastname;
  })
  console.log('mapped custom:', names)

  // la meme chose que notre fonction map, mais avec la fonction map des tableaux JS
  const mapped = family.map((person) => {
    return person.firstname
  })
  console.log('mapped JS:', mapped)
})()
