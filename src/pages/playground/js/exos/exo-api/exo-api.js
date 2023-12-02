/**
 * Exercice :
 *  1°) Afficher les informations d'un utilisateur
 *  2°) Pouvoir afficher l'utilisateur précedent/suivant
 *
 * Méthodo pour l'exo 2 :
 *  => HTML :
 *    -> Mettre les boutons previous, next et le label pour le nom
 *    -> Désactiver par défaut le bouton Previous
 *  => JS :
 *    -> Sélectionner les élements et leur ajouter les gestionnaires d'évenements
 *    -> Quand les boutons sont cliqués :
 *      - Dévalider les boutons
 *      - effacer les affichages de l'utilisateur
 *      - incrémenter/décrémenter l'index de l'utilisateur courant
 *      - On "Fetch" les données
 *      - afficher ces données dans le label
 *      - Revalider les boutons
 */

(async () => {
  let indexUser = 1;
  // sélection boutons et label
  const btnPrev = document.getElementById("btn-prev");
  const btnNext = document.getElementById("btn-next");
  const userName = document.getElementById("user-name");
  const userElement = document.getElementById("api-result");
  // adresse de l'API
  const url = "https://jsonplaceholder.typicode.com/";

  if (userElement && btnNext && btnPrev && userName) {
    // ajout de gestionnaires d'évenements
    btnPrev.addEventListener("click", onUserButtonClick);
    btnNext.addEventListener("click", onUserButtonClick);

    await fetchAndDisplayUser(indexUser);
    disableButtons(false);
  }

  // requête et affiche l'utilisateur suivant/précedent
  async function onUserButtonClick(event) {
    if (btnNext instanceof HTMLButtonElement && btnPrev instanceof HTMLButtonElement && userName) {
      // dévalider les boutons
      disableButtons(true);

      //  effacer les affichages de l'utilisateur
      if (userElement && userName) {
        userElement.innerHTML = ``;
        userName.innerHTML = `Please wait...`;
      }
      // savoir quel bouton a été appuyé
      if (event.target === btnNext) {
        // boutton affiché = Next : incrémenter l'index utilisateurs
        indexUser++;
      } else {
        // bouton affiché = Previous : décrémenter l'index
        indexUser--;
      }

      // appel de la fonction fetchAndDisplayUser
      await fetchAndDisplayUser(indexUser);

      // valider les boutons
      disableButtons(false);
    }
  }

  /**
   * "fetcher" et afficher les données
   * @param {number} indexUser
   */
  async function fetchAndDisplayUser(indexUser) {
    // effectue la requête HTTP et attend la réponse
    const response = await fetch(url + "users/" + indexUser);
    console.log("response:", response);

    // si la requête est réussie, le "ok" sera true ...
    if (response.ok) {
      // la requête a réussi : on a une réponse JSON et on en extrait un objet JS (qu'on met dans "user")
      const user = await response.json();

      // juste pour débugger, on log l'objet qu'on a reçu
      const json = JSON.stringify(user);
      console.log("json:", json);

      // affiche l'utilisateur
      if (userElement && userName) {
        userElement.innerHTML = `${user.id} : ${user.name} lives in ${user.address.city} and works for ${user.company.name}.<br>
        Contact her/him at ${user.phone} or ${user.email}.`;
        userName.innerHTML = `${user.name}`;
      }
    }
  }

  /**
   * active/désactibe les boutons
   * @param {boolean} disabled
   */
  function disableButtons(disabled) {
    if (btnNext instanceof HTMLButtonElement && btnPrev instanceof HTMLButtonElement) {
      if (indexUser === 1) {
        btnPrev.disabled = true;
      } else {
        btnPrev.disabled = disabled;
      }
      btnNext.disabled = disabled;
    }
  }
})();
