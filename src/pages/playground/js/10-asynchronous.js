// IIFE pour isoler les noms de variables
(() => {
  /* eslint-disable n/no-callback-literal */

  // TODO callback, promise, async-await
  // https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous

  // https://developer.mozilla.org/en-US/docs/Glossary/Callback_function

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function

  /** ----------------------------------------------------------------------------
    * appel synchrone
    * ------------------------------------------------------------------------------------------------------
    * la fonction foo est dite synchrone car elle ne rend pas la main avant d'etre terminée
    * (la fonction qui appelle "foo" est bloquée jusqu'à ce que foo soit terminée)
    * 
    * IMPORTANT: On ne doit jamais bloquer longtemps un navaigateur !
    *            -> si une fonction dure logntemps, on doit l'appeler de manière ASYNCHRONE (appel non bloquant)
   --------------------------------------------------------------------------------------------------------------- */
  const foo = (n) => {
    return (n *= 3);
  };

  // cet appel est bloquant : le console.log suivant sera executé seulement quand "foo" sera terminée ()
  const triple = foo(1);
  console.log("triple:", triple);
  // ------------------------------------------------------------------------------------------------------------

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
    * appel asynchrone : callback                                                             (old fashion)
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

  /** ------------------------------------------------------------------------------------------------------
    * appel asynchrone : Promises                                         (less old fashion but still used)
    * ----------------------------------------------------------------------------------------------------
    * - 
    * - 
   ------------------------------------------------------------------------------------------------------- */

  /** ------------------------------------------------------------------------------------------------------
    * appel asynchrone : async/await                                                        (new fashion -> useful)
    * ----------------------------------------------------------------------------------------------------
    * - 
    * - 
   ------------------------------------------------------------------------------------------------------- */

  console.log("that's all folks!");
})();
