// ----------------------------------------------------------------------------
// ajout par js d'un gestionnaire d'évenements
// ----------------------------------------------------------------------------

// 1°) sélectionner l'élément html visé
//    - la fonction déclare qu'elle renvoie un élément de type HTMLElement | null
//    - en  fait le type exact n'est pas HTMLElement mais un des ses enfants (ex.:HTMLButtonElement, HTMLInputElement, HTMLLabelElement, ...)
//    - le type exact dépend du sélecteur ".btn-start"
//    - dans cet exemple, "btn" sera du type HTMLButtonElement
const btn = document.getElementById("btn-start");
console.log("btn:", btn);

// 2°) vérifier le type exact de "btn"
if (btn && btn instanceof HTMLButtonElement) {
  // ici, grace au "if", on est sur que "btn" existe et qu'il représent un bouton :
  //  - on peut donc utiliser les méthodes et propriétés du bouton
  //  - vs code va nous montrer les méthodes et propriétés de ce bouton
  //  - es lint ne signalera plus d'erreur quand on utilisera un méthode/propriété de HTMLButtonElement qui n'existe pas sur le HTMLElement

  // 3°) ajout du gestionnaire d'évènement au bouton
  // exemple : le gestionnaire d'évènements est une fonction anonyme
  btn.addEventListener("click", (event) => {
    console.log("bouton cliqué", event);
    alert("Bravo, tu as cliqué sur le bouton " + event);
  });
  // exemple : le gestionnaire d'évènements est une fonction nommée
  btn.addEventListener("mouseenter", mouseEnterCallback);
}

/**
 * fonction nommée  appelée quand la souris rentre dans la zone du bouton
 * @param {MouseEvent} event
 */
function mouseEnterCallback(event) {
  console.log("souris entré dans la zone du bouton", event);
}

/** -------------------------------------------------------------------------------------------------------------------
 *  accéder aux propriétés d'un élémént
 * ----------------------------------------------------------------------------------------------------------------- */

const lorem = document.getElementById("txt-lorem");
console.log("lorem:", lorem);

if (lorem && lorem instanceof HTMLTextAreaElement) {
  setTimeout(() => {
    lorem.value =
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. In blanditiis temporibus odio, asperiores accusamus maiores expedita fuga vitae repellendus consequatur at, adipisci corrupti qui dolor rerum ullam possimus fugit incidunt?";
  }, 3000);
}
