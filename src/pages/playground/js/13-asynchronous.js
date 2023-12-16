// IIFE pour isoler les noms de variables
(() => {
  /* eslint-disable n/no-callback-literal */

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

  /**
   * A demo function to demonstrate the synchronous behavior
   * @param {number} n - the parameter to process
   * @returns the given parameter multiplied by 3
  */
  const foo = (n) => {
    console.log("synchronous foo called with n=", n);
    return (n *= 3);
  };

  // cet appel est bloquant : le console.log suivant sera executé seulement quand "foo" sera terminée ()
  console.log("BEFORE calling synchronous foo...");
  const triple = foo(1);
  console.log("AFTER foo synchronous call, triple=", triple);
  // ------------------------------------------------------------------------------------------------------------

  /** ---------------------------------------------------------------------------------------------
*  appel asynchrone  : Callback                                                       (old fashion)          
* -------------------------------------------------------------------------------------------------
* - on passe une fonction "cb" à une fonction "boo".
* - "boo" rappellera la fonction "cb" quand boo sera terminée
* ------------------------------------------------------------------------------------------------- */

  // exemple de fonction asynchrone : la fonction "setTimeout"
  console.log("BEFORE calling setTimeout...");
  setTimeout(() => {
    // ici, c'est la callback anonyme qui sera rappelée par setTimeout dans 1s
    console.log("setTimeout callback called");
  }, 1000);
  console.log("AFTER setTimeout synchronous call");

  /**
   * Une fonction asynchrone qui rappelera "cb" dans 2s sans bloquer l'appelant (qui lui-meme bloquerait le navigateur )
   * @param {number} n - the number to process
   * @param {function(number):void} cb - the callback to call, passing the given number
   */
  const boo = (n, cb) => {
    // simule une vraie action asynchrone (comme requêtes internet, lectures fichiers...)
    // => le callback du settimeout est une fonction anonyme qui appelle 'cb'
    setTimeout(() => cb(n * 3), 2000);
  };

  console.log("BEFORE calling boo...");
  boo(1, (x) => console.log("boo callback called, x=", x));
  console.log("AFTER boo call");

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
