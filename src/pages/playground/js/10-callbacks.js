// IIFE pour isoler les noms de variables
(() => {
  /* eslint-disable n/no-callback-literal */

  /** ------------------------------------------------------------------------------------------------------
* utilisation d'un "callback" (une fonction qui sera rappelée)
* ----------------------------------------------------------------------------------------------------
* - on passe une fonction "cb" à la fonction "boo".
* - "boo" rappellera la fonction "cb" quand elle le voudra
------------------------------------------------------------------------------------------------------- */

  /**
   * la fonction qui va utiliser une fonction callback
   * @param {number} n le parametre qu'on attend
   * @param {*} cb la fonction callback qu'on va rappeler
   */
  const boo = (n, cb) => {
    cb(n * 3); // appelle la fonction callback
  };

  /**
   * définit la fonction callback qui devra etre rappelée par "boo"
   * @param {number} x le parametre qui devra etre passé par "boo"
   */
  const callback = (x) => {
    console.log("callback ~ x:", x);
  };

  // appelle la fonction "boo" en lui passant le callback (ici c'est une fontion nommée "callback")
  boo(1, callback);

  // appelle la fonction "boo" en lui passant le callback (ici c'est une fontion anonyme d'une seule ligne)
  boo(1, (x) => console.log("callback ~ x:", x));

  // appelle la fonction "boo" en lui passant le callback (ici c'est une fontion anonyme de plusieurs lignes possibles) LA FORME LA PLUS COURANTE
  boo(1, (x) => {
    console.log("boo callback ~ x:", x);
  });

  /** ------------------------------------------------------------------------------------------------------
*  Callback                                                (très utilisée avec les DOM events de l'html)
* ----------------------------------------------------------------------------------------------------
* - on passe une fonction "cb" à la fonction "boo".
* - "boo" rappellera la fonction "cb" quand boo sera terminée
------------------------------------------------------------------------------------------------------- */
  // exemple en utilisant la fonction asynchrone "setTimeout"
  console.log("calling setTimeout...");
  setTimeout(() => {
    console.log("setTimeout callback called"); // ici, c'est la callback anonyme qui sera rappelée par setTimeout dans 2s
  }, 2000);

  // moo est une fonction asynchrone : elle rappelera "cb" dans 5s sans bloquer l'appelant (qui lui-meme bloquerait le navigateur )
  const moo = (n, cb) => {
    setTimeout(() => cb(n * 3), 5000); // simule une vraie action asynchrone (comme requêtes internet, lectures fichiers...)
  };
  moo(1, (x) => console.log("moo callback ~ x:", x));
  // ----------------------------------------------------------
  // exo callback
  // --------------------------------------
  const notes = [5, 10, 8, -9, -25, 19, 6, -4];

  /**
   * Trie un tableau de nombres
   * @param {number[]} numbers le tableau de nombres à trier
   * @param {*} cb la fonction qui va faire la comparaison. recoit le nombre a tester en paramètres et doit retourner "true" pour garder le nombre
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

  // appelle la fonction filter en lui passant le tableau de notes et la fonction qui va faire la comparaison
  const negs = filter(notes, (n) => n < 0);
  console.log("negs:", negs);
  const pos = filter(notes, (n) => n > 0);
  console.log("pos:", pos);
  const smol = filter(notes, (n) => n > -10 && n < 10);
  console.log("smol:", smol);

  notes.filter((n) => n > 5);
})();
