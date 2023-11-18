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
*  appel asynchrone  : Callback                                                                            (old fashion)          
* ----------------------------------------------------------------------------------------------------
* - on passe une fonction "cb" à la fonction "boo".
* - "boo" rappellera la fonction "cb" quand boo sera terminée
------------------------------------------------------------------------------------------------------- */

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
