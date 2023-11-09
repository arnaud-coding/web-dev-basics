/* eslint-disable no-unused-vars */
const label = document.getElementById("values");

/**
 * log "bonjour" a un prénom
 * @param {string} firstname prénom à saluer
 */
function sayHello(firstname) {
  console.log("hello " + firstname.toUpperCase());
}

// gestionnaire d'évènement
function eventHandler(e) {
  console.log(`
  type event: ${e.type}
  target element: ${e.target}
  target element value: ${e.target.value}`);
  // console.log(e.target);

  if (label) {
    label.textContent = e.target.value.toUpperCase();
  }
}
