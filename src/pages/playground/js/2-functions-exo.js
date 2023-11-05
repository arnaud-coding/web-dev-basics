// ============================================== DEFINITIONS =====================================

const arnaud = {
  firstname: "ARNAUD",
  lastname: "berthollet",
  birthday: new Date(1995, 7, 22, 4, 30),
  male: true,
  weight: 55
};
const agnes = { firstname: "agnes", lastname: "berthollet", birthday: new Date(1967, 1, 27), male: false, weight: 60 };

/** Decrit une personne
 * @param {Object} person objet représentant la personne à décrire
 * @param {string} person.firstname prénom
 * @param {string} person.lastname nom
 * @param {Date} person.birthday date de naissance
 * @param {boolean} person.male vrai pour un homme, faux pour une fille
 * @param {*} fn (facultatif) la fonction à rappeler
 */
const showPerson = ({ firstname, lastname, birthday, male }, fn = null) => {
  const gender = getGender(male);
  const capFirst = capitalize(firstname);
  console.log(gender, capFirst, lastname.toUpperCase(), birthday.toLocaleDateString());

  if (fn !== null) {
    fn(capFirst);
  }
};

/** Renvoi le titre du genre (Mr. pour true, Ms. pour false)
 * @param {boolean} male true pour un homme, false pour une femme
 * @returns le titre du genre
 */
const getGender = (male) => {
  if (male) {
    return "Mr.";
  } else {
    return "Ms.";
  }
};

/**
 * Met en majuscule la première du mot passé
 * @param {string} s
 * @returns le mot passé,
 */
const capitalize = (s) => {
  const tmp = s.toLowerCase().slice(1);
  const firstLetter = s.charAt(0).toUpperCase();
  return firstLetter + tmp;
};

// ============================================== APPELS ==========================================

// appelle la fonction showPerson en lui passant l'objet "arnaud" en argument ET une fonction anonyme à rappeler
showPerson(arnaud, (identifier) => {
  // ici, on est dans la fonction "callback" : elle sera rappeler par "showPerson"
  console.log("rappelé avec " + identifier);
});
// appelle la fonction showPerson en lui passant l'objet "arnaud" en argument SANS fonction à rappeler
showPerson(agnes);
