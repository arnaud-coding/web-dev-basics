/**
 * Un async/await est comme une promesse mais en BEAUCOUP plus simple à utiliser
 *
 * Un await peut appeler :
 *  - une fonction async
 *  - une fonction qui renvoie une promesse (les fonctions JS renvoient des promesses : "fetch", gestion des fichiers, ...)
 */

(async () => {
  /**
   * calcule le carré d'un nombre de donné et renvoie le résultat apres un délai
   * @param {number} value valeur dont on veut le carré
   * @param {number} delay délai (en ms) avant réponse
   * @returns {Promise<number>} une promesse qui contiendra le carré demandé quant elle sera résolue
   *
   */
  const getDelayedsquare = async (value, delay) => {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(value * value);
      }, delay);
    });
    return promise;
  };

  // exemple de 3 appels successifs qui utilisent les promesses (pour comparer avec le async/await)
  console.log("calling promise 1");
  let p = getDelayedsquare(2, 8000);
  p.then((square) => {
    // ----- 1er gros désavantage: Enfer des enchainements... (et encore: pas de p.catch ici !)
    console.log("square promise 1:", square);

    console.log("calling promise 2");
    p = getDelayedsquare(square, 100);
    p.then((square) => {
      console.log("square promise 2:", square);

      console.log("calling promise 3");
      p = getDelayedsquare(square, 100);
      p.then((square) => {
        console.log("square promise 3:", square);

        // ----- 2nd gros désavantage: autant de blocs d'erreur que d'appels
      }).catch((reason) => console.error("echec appel 3", reason));
    }).catch((reason) => console.error("echec appel 2", reason));
  }).catch((reason) => console.error("echec appel 1", reason));

  // ------------------------------------------------------------------------------------------------------------------
  // même code, mais en async/await :
  try {
    // ----- 1er gros avantage : tous le code asynchrone apparait aligné (plus d'enfer des enchainements...)
    console.log("calling async/await 1");
    let square = await getDelayedsquare(3, 1000);
    console.log("square async 1:", square);

    console.log("calling async/await 2");
    square = await getDelayedsquare(square, 1000);
    console.log("square async 2:", square);

    console.log("calling async/await 3");
    square = await getDelayedsquare(square, 1000);
    console.log("square async 3:", square);
  } catch (error) {
    // ----- 2nd gros avantage: 1 seul bloc d'erreur commun aux 3 appels
    console.error("echec appel", error);
  }
})();
