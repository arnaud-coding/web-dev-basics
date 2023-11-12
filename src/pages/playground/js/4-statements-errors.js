// IIFE pour isoler les noms de variables
(() => {
  const u = undefined;

  /** ===========================================================================
   * * Errors
   ============================================================================== */

  /** ------------------------------------------------------
     * try .. catch ... finally
     * -----------------------------------------------------
     * ne doit etre utilisé que pour des erreurs imprévisibles. Ex.: échec écriture de fichiers , échec accès internet 
    --------------------------------------------------------- */
  try {
    console.log("on va provoquer une erreur...");
    // @ts-ignore
    u.toUpperCase(); // provoque une erreur dt type "TypeError" car toUpperCase n'est pas une méthode de undefined

    console.log("on a provoqué une erreur...");
  } catch (error) {
    // attrappe l'erreur dans une variable "error" pour permettre au code de continuer à tourner
    console.error(`on a attrapé une erreur de type "${error.name}". message = "${error.message}"`);
  } finally {
    // optionnel
    console.log("finalement, avec ou sans erreur, on exécute ce bloc de code  ");
  }

  // exemple d'un autre type d'erreur(RangeError)
  try {
    // @ts-ignore
    String.prototype.normalize(12); //  provoque une erreur dt type "RangeError"
  } catch (error) {
    console.error(`on a attrapé une erreur de type "${error.name}". message = "${error.message}"`);
  }

  // on va générer une erreur qui sera aléatoirement de type d'erreur TypeError pu RangeError ou ReferenceError
  try {
    const rnd = Math.random();
    if (rnd < 0.33) {
      // ---------- génère l'erreur de type "ReferenceError"
      // @ts-ignore
      // eslint-disable-next-line no-undef
      z.toto();
    } else if (rnd < 0.66) {
      // ---------- génère l'erreur de type RangeError
      // @ts-ignore
      String.prototype.normalize(12);
    } else {
      // ---------- génère l'erreur de type TypeError
      // @ts-ignore
      u.toUpperCase();
    }
  } catch (error) {
    // on commence le traitement de l'erreur qu'on vient d'attraper
    if (error instanceof TypeError) {
      console.error(`on a attrapé une erreur TypeError. message = "${error.message}"`);
    } else if (error instanceof ReferenceError) {
      console.error(`on a attrapé une erreur ReferenceError. message = "${error.message}"`);
    } else if (error instanceof RangeError) {
      console.error(`on a attrapé une erreur RangeError. message = "${error.message}"`);
    } else {
      console.error(`on a attrapé une erreur inconnue. message = "${error.message}"`);
    }
  }
  /** ------------------------------------------------------
    * throw
    * -----------------------------------------------
    * Permet de générer une erreur personnalisée
    * Pourquoi : de temps en temps (surtout lorsqu'on écrit une librairie, on  préfère provoquer une erreur personnalisée
   --------------------------------------------------------- */
  try {
    // throw " hello 12"; // déclenche une erreur
    throw Error("ceci est une erreur personnalisée");
  } catch (error) {
    if (error instanceof Error) {
      console.error(`on a attrapé une erreur de type "${error.name}". message = "${error.message}"`);
    } else {
      console.error(`on a attrapé une erreur inconnue`, error);
    }
  }
  console.log("that's all folks!");
})();
