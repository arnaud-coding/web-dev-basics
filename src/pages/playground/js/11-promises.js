(() => {
  /**
   * Les promesses sont une facon plus simple d'écrire CERTAINES callbacks.
   * Une promesse , ça se résout (en cas de succès) ou ça se rejete (en cas d'échec)
   * Il y a 2 façcons qui se valent de retourner une promesse (voir exemples simple/complex)
   *
   *  => les callbacks qui ne peuvent PAS etre remplacées :
   *    - les gestionnaires d'évenements liés aux éléments HTML (ex. : clic d'un bouton)
   *    - les callbacks qui font un travail (filter, map...)
   *
   *  => les callbacks qui peuvent et doivent etre remplacées (celles qui ne font que attendre)
   *    - ex. : lecture d'un fichier -> la fonction readFile fait tout le travail pour lire le fichier et envoie le fichier lu à la callback,
   *                                    la callback ne fait donc qu'attendre que le fichier soit lu.
   *
   * Les promesses servent très majoritairement pour appeler des fonctions asynchrones (ex. : lecture/écriture de fichiers, requêtes API)
   * Ici, on ne verra que des appels synchrones
   *  */

  /**
   * 1ere partie de la démo : renvoyer une promesse (comme le fait la fonction "fetch" pour la requête API)
   * @param {number} id identifiant de l'utilisateur recherché
   * @returns {Promise<string>} une promesse qui contiendra une string quant elle sera résolue
   */
  const returnPromiseSimple = (id) => {
    if (id > 0 && id <= 10) {
      return Promise.resolve("toto : " + id);
    } else {
      return Promise.reject(new Error("id doit etre compris entre 1 et 10"));
    }
  };

  /**
   * 2eme partie de la démo : utiliser une promesse renvoyée par une fonction
   * @param {number} id identifiant de l'utilisateur recherché
   */
  const usePromiseSimple = (id) => {
    const p = returnPromiseSimple(id); // "p" contient la promesse retournée par la fonction getUserName
    p.then((name) => {
      // ce code va etre exécuté uniquement quand la promesse sera résolue. ex.: quand la requete API sera terminée
      console.log("la promesse a été résolue : elle renvoie 'name'=", name);
    }).catch((reason) => {
      // ce code va etre exécuté uniquement si la promesse est rejetée, ex.: pas d'internet pour une requete API
      console.error("la promesse a été rejetée : elle renvoie 'reason'=", reason);
    });
  };

  usePromiseSimple(3);
  usePromiseSimple(12);

  // =======================================================================================================

  /**
   * 1ere partie de la démo : renvoyer une promesse (comme le fait la fonction "fetch" pour la requête API)
   * @param {number} id identifiant de l'utilisateur recherché
   * @returns {Promise<string>} une promesse qui contiendra une string quant elle sera résolue
   */
  const returnPromiseComplex = (id) => {
    const promise = new Promise((resolve, reject) => {
      if (id > 0 && id <= 10) {
        return resolve("toto : " + id);
      } else {
        return reject(new Error("id doit etre compris entre 1 et 10"));
      }
    });
    return promise;
  };

  /**
   * 2eme partie de la démo : utiliser une promesse renvoyée par une fonction
   * @param {number} id identifiant de l'utilisateur recherché
   */
  const usePromiseComplex = (id) => {
    const p = returnPromiseComplex(id); // "p" contient la promesse retournée par la fonction getUserName
    p.then((name) => {
      // ce code va etre exécuté uniquement quand la promesse sera résolue. ex.: quand la requete API sera terminée
      console.log("la promesse a été résolue : elle renvoie 'name'=", name);
    }).catch((reason) => {
      // ce code va etre exécuté uniquement si la promesse est rejetée, ex.: pas d'internet pour une requete API
      console.error("la promesse a été rejetée : elle renvoie 'reason'=", reason);
    });
  };

  usePromiseComplex(5);
  usePromiseComplex(15);
})();
