// https://www.w3schools.com/js/js_events.asp
// https://www.w3schools.com/jsref/dom_obj_event.asp

// https://developer.mozilla.org/en-US/docs/Web/API
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input

console.log("Script chargé!");

/**
 * activer le bouton add uniquement quant le titre et la date d'expiration sont remplis
 *    plan :
 *      - séléctionner les éléments titre et date
 *      - ajouter un évenement "quant la valeur du input change"
 *      - récupérer les valeurs de titre et date d'expiration
 *      - activer ou désactiver le bouton en fonction des valeurs récupérées
 *
 * fonctionnement du bouton add
 *    but : ajoute une activité à la liste des TODO
 *    plan :
 *      - sélectionner l'élément bouton add
 *      - ajouter un événement sur le clic du bouton
 *      - récupérer les valeurs de titre, description et date d'expiration
 *      - construire un objet de type TODO
 *      - ajouter cet objet à la liste
 *        - comment ?
 *
 * fonctionnement du show/hide
 *    plan :
 *      - sélectionner bouton hide
 *      - ajouter evenement clic
 *      - sélectionner liste
 *      - affiche/masquer liste
 *
 * fonctionnement du bouton delete
 *    plan :
 *
 * fonctionnement du bouton done
 *    plan :
 *
 */

/**
 * @typedef Todo
 * @type {object}
 * @property {string} title - title of the todo
 * @property {string | undefined} description - description of the todo
 * @property {string} expiryDate - expiry date of the todo
 * @property {boolean} done - true when todo is done
 */

/** -------------------------------------------------------------------------------------------------------------------
 * Select HTML elements
 * ----------------------------------------------------------------------------------------------------------------- */
const titleInput = document.getElementById("title");
const dateInput = document.getElementById("exp-date");
const descInput = document.getElementById("desc");
const addButton = document.getElementById("btn-add");
const hideListButton = document.getElementById("toggle-visibility");
const todoList = document.getElementById("todo-list");

/** -------------------------------------------------------------------------------------------------------------------
 * Add events to HTML elements
 * ----------------------------------------------------------------------------------------------------------------- */
if (addButton) {
  addButton.addEventListener("click", addTodo);
}
if (titleInput) {
  titleInput.addEventListener("input", setAddState);
}
if (dateInput) {
  dateInput.addEventListener("input", setAddState);
}
if (hideListButton) {
  hideListButton.addEventListener("click", hideList);
}

/** -------------------------------------------------------------------------------------------------------------------
 * Get/Set HTML element values
 * ----------------------------------------------------------------------------------------------------------------- */
/**
 * get a value from a given html element
 * @param {HTMLElement | null} element
 * @returns {string | undefined} the element value if it exists, otherwise undefined
 */
function getValue(element) {
  if (element instanceof HTMLInputElement) {
    const value = element.value;
    return value;
  }
  return undefined;
}

/**
 * clear value in given html element
 * @param {HTMLElement | null} element
 */
function clearValue(element) {
  if (element instanceof HTMLInputElement) {
    element.value = "";
  }
}

/** -------------------------------------------------------------------------------------------------------------------
 * Show/Hide HTML element
 * ----------------------------------------------------------------------------------------------------------------- */
function hideList() {
  if (todoList && hideListButton) {
    const hidden = todoList.hidden;
    if (hidden) {
      // liste cachée : montrer liste et texte bouton = hide
      todoList.hidden = false;
      hideListButton.textContent = "Hide list";
    } else {
      // liste affichée : caher la liste et texte bouton = show
      todoList.hidden = true;
      hideListButton.textContent = "Show list";
    }
  }
}

/** -------------------------------------------------------------------------------------------------------------------
 * Enable/Disable HTML element
 * ----------------------------------------------------------------------------------------------------------------- */
/**
 * enabled/desabled the addButton depending on title and expiry date
 */
function setAddState() {
  // get title and date
  const title = getValue(titleInput);
  const date = getValue(dateInput);

  // decide if activation or desactivation
  const enable = Boolean(title) && Boolean(date);

  // change the button state
  if (addButton && addButton instanceof HTMLButtonElement) {
    addButton.disabled = !enable;
  }
}

/** -------------------------------------------------------------------------------------------------------------------
 * Create HTML element
 * ----------------------------------------------------------------------------------------------------------------- */
/**
 * add a label containing a copyright at body end
 */
function addCopyright() {
  // create a <label> element (HTMLLabelElement)
  const label = document.createElement("label");
  // add a text into the label
  label.innerHTML = "Copyright (C) 2023 Arnaud SAS";
  // add a class to the label
  label.classList.add("copyright");
  // add the label at body end
  document.getElementsByTagName("body")[0].appendChild(label);
}
/** -------------------------------------------------------------------------------------------------------------------
 * Duplicate HTML template element
 * ----------------------------------------------------------------------------------------------------------------- */
// TODO Duplicate HTML template element

/** -------------------------------------------------------------------------------------------------------------------
 * Add TODO workflow
 * ----------------------------------------------------------------------------------------------------------------- */

/**
 * creates a todo and add it to the list
 */
function addTodo() {
  // get title, date and description
  const title = getValue(titleInput);
  const date = getValue(dateInput);
  const desc = getValue(descInput);

  // exit without creating the todo if title or date does not exist
  if (title === undefined || date === undefined) {
    // exit from the function
    return;
  }

  // create TODO object
  const todo = { title, description: desc, expiryDate: date, done: false };

  // add TODO to list
  addToList(todo);

  // clear the "add todo" form
  clearForm();
}

/**
 * add a given todo into the list of todos
 * @param {Todo} todo
 */
function addToList(todo) {
  // dupliquer un element <li> de la liste
  const template = document.getElementById("todo-row");
  if (template && template instanceof HTMLTemplateElement) {
    const li = template.content.cloneNode(true);
    console.log("addToList ~ li:", li);

    // écrire les valeurs du todo dans l'élement dupliqué
    li.querySelector(".todo-title").innerHTML = todo.title;
    li.querySelector(".todo-desc").innerHTML = todo.description;
    const options = { dateStyle: "medium" };
    const date = new Date(todo.expiryDate).toLocaleDateString(undefined, options);
    li.querySelector(".todo-exp-date").innerHTML = date;

    // ajouter l'élement dupliqué dans la liste
    todoList?.appendChild(li);
  }
}

/**
 * clear the "add todo" form
 */
function clearForm() {
  clearValue(titleInput);
  clearValue(dateInput);
  clearValue(descInput);
  setAddState();
}

// -----------------------------------

// todo : set default value temporarily
titleInput.value = "nono";
dateInput.value = "2023-11-24";
// todo end

addCopyright();
setAddState();
