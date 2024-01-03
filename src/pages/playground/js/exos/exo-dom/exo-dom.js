// ==========================================================================================================
// Exemples de manipulations du DOM par le JS
// ==========================================================================================================
//
// https://www.w3schools.com/whatis/whatis_htmldom.asp

//  - quand une page HTML est chargée, le navigateur construit un DOM qui la représente(Document Object Model)
//  - le DOM est une hiérarchie d'objets ou chaque élément HTML a une correspondance objet.
//  - le DOM permet au JS de trouver et manipuler les éléments HTML, leurs attributs, leurs styles, leurs évènements.
//  - En JS, le mot-clé pour accéder à la base du DOM est "document".
//
// Exemples de correspondances entre éléments HTML et le DOM JS :

// élément HTML       DOM JS objects
// ------------------------------------
// <button />         HTMLButtonElement
// <input />          HTMLInputElement
// <label />          HTMLLabelElement
//   ...                   ...

// Hiérarchie d'héritage des objets du DOM :
// EventTarget <== Node <== Element <== HTMLElement <== HTMLButtonElement, HTMLInputElement, HTMLLabelElement, ...
// ======================================================================================================================

// ----------------------------------------------------------------------------
// Ajout par JS d'un gestionnaire d'évenements
// ----------------------------------------------------------------------------

// 1°) sélectionner l'élément html visé
//    - la fonction déclare qu'elle renvoie un élément de type HTMLElement | null
//    - en  fait le type exact n'est pas HTMLElement mais un des ses enfants (ex.:HTMLButtonElement, HTMLInputElement, HTMLLabelElement, ...)
//    - le type exact dépend du sélecteur ".btn-start"
//    - dans cet exemple, "btn" sera du type HTMLButtonElement
const btn = document.getElementById('btn-start')

// 2°) vérifier le type exact de "btn"
if (btn instanceof HTMLButtonElement) {
  // ici, grace au "if", on est sur que "btn" existe et qu'il représent un bouton :
  //  - on peut donc utiliser les méthodes et propriétés du bouton
  //  - vs code va nous montrer les méthodes et propriétés de ce bouton
  //  - es lint ne signalera plus d'erreur quand on utilisera un méthode/propriété de HTMLButtonElement qui n'existe pas sur le HTMLElement

  // 3°) ajout du gestionnaire d'évènement au bouton (le gestionnaire d'évènements est une callback)
  // exemple : ici la callback est une fonction anonyme. elle recoit un parameter "event" qui ici est un "MousePointer" event
  btn.addEventListener('click', (event) => {
    // ce code sera appelé plus tard quand l'utilisateur cliquera sur le bouton
    console.log("bouton cliqué avec paramètre d'évènement = ", event)
    alert('Bravo, tu as cliqué sur le bouton ' + event)
  })
  // exemple : le gestionnaire d'évènements est une fonction nommée
  btn.addEventListener('mouseenter', mouseCallback)
  btn.addEventListener('mouseleave', mouseCallback)
}

/**
 * fonction nommée appelée quand la souris rentre/sort dans la zone du bouton
 * @param {MouseEvent} event
 */
function mouseCallback(event) {
  if (btn instanceof HTMLButtonElement) {
    if (event.type === 'mouseenter') {
      // la souris vient de rentrer dans la zone du bouton
      btn.style.background = '#F39678'
    } else if (event.type === 'mouseleave') {
      // la souris vient de rentrer dans la zone du bouton
      btn.style.background = '#CAEEB9'
    }
  }
}

/** -------------------------------------------------------------------------------------------------------------------
 *  Lire/écrire des propriétés d'un élémént
 * ----------------------------------------------------------------------------------------------------------------- */

// 1er exemple : ajout texte dans <textarea>
const lorem = document.getElementById('txt-lorem')
if (lorem instanceof HTMLTextAreaElement) {
  // la fonction setTimeOut rapellera sa callback au bout du délai (3s)
  setTimeout(() => {
    // code de la callback
    lorem.value =
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. In blanditiis temporibus odio, asperiores accusamus maiores expedita fuga vitae repellendus consequatur at, adipisci corrupti qui dolor rerum ullam possimus fugit incidunt?'
  }, 3000)
}

// 2e exemple : afficher l'heure dans un <label>
const timeLabel = document.getElementById('time')
if (timeLabel) {
  // la fonction setTimeInterval rapellera sa callback toutes les 1s
  setInterval(() => {
    // code de la callback
    const time = new Date().toLocaleTimeString(undefined, { timeStyle: 'medium' })
    timeLabel.innerHTML = time
  }, 1000)
}

/** -------------------------------------------------------------------------------------------------------------------
 *  Ajouter une classe à une élément
 * ----------------------------------------------------------------------------------------------------------------- */
const lblClass = document.getElementById('lbl-class')
if (lblClass) {
  lblClass.addEventListener('click', () => {
    // remove = true si ".highlight" est deja presente dans le bouton
    const remove = lblClass.classList.contains('highlight')
    if (remove) {
      // si classe deja presente, on l'enleve
      lblClass.classList.remove('highlight')
    } else {
      // si classe absente, on l'ajoute
      lblClass.classList.add('highlight')
    }
  })
}

/** -------------------------------------------------------------------------------------------------------------------
 *  Montrer/cacher un élément
 * ----------------------------------------------------------------------------------------------------------------- */
const toggleVisibility = document.getElementById('btn-toggle-vis')
if (toggleVisibility && lorem) {
  toggleVisibility.addEventListener('click', () => {
    lorem.hidden = !lorem.hidden
  })
}

/** -------------------------------------------------------------------------------------------------------------------
 *  Activer/désactiver un élément
 * ----------------------------------------------------------------------------------------------------------------- */
const toggleEnable = document.getElementById('btn-toggle-enable')
if (toggleEnable && toggleVisibility instanceof HTMLButtonElement) {
  toggleEnable.addEventListener('click', () => {
    toggleVisibility.disabled = !toggleVisibility.disabled
  })
}

/** -------------------------------------------------------------------------------------------------------------------
 *  Créer un élément
 * ----------------------------------------------------------------------------------------------------------------- */
for (let index = 0; index < 3; index++) {
  // 1°) Créer l'élément
  const line = document.createElement('li')
  line.innerHTML = `JS ligne ${index + 2}`

  // 2°) ajouter à l'élément liste
  const list = document.getElementById('list')
  if (list && line) {
    list.appendChild(line)
  }
}

/** -------------------------------------------------------------------------------------------------------------------
 *  Dupliquer un élément
 * ----------------------------------------------------------------------------------------------------------------- */
// sélectionne l'élément template à dupliquer
const tpl = document.getElementById('template')
if (tpl instanceof HTMLTemplateElement) {
  // duplique l'élément template
  const clone1 = tpl.content.cloneNode(true)
  const clone2 = tpl.content.cloneNode(true)

  // sélectionne l'élément dans lequel on veut ajouter l'élément dupliqué
  const tags = document.getElementsByTagName('body') // sélectionne tous les éléments <body> et les mets dans un tableau
  const body = tags[0] // sélectionne le 1er élément du tableau (= <body> du document)

  // ajouter l'élément dupliqué dans le body
  body.appendChild(clone1)
  body.appendChild(clone2)
}
