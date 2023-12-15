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
  const cap = capitalize(firstname);
  console.log(gender, cap, lastname.toUpperCase(), birthday.toLocaleDateString());

  // si la fonction passée en paramètre n'est pas nulle, alors on l'appelle en lui passant la valeur de la variable "cap"
  if (fn !== null) {
    fn(cap);
  }
};

/** Renvoi le titre du genre (Mr. pour true, Ms. pour false)
 * @param {boolean} m true pour un homme, false pour une femme
 * @returns le titre du genre
 */
const getGender = (m) => {
  if (m) {
    return "Mr.";
  } else {
    return "Ms.";
  }
};

/**
 * Met en majuscule la première lettre du mot passé
 * @param {string} s le mot qu'on veut capitalizer
 * @returns le mot passé, avec la 1ère lettre en majuscule
 */
const capitalize = (s) => {
  // renvoie toutes les lettres en partant de la lettre à la position "1", puis met en minuscule
  // ex.: si on passe "BOBBY", on obtient "obby"
  const tmp = s.slice(1).toLowerCase();

  // récupère la 1ère lettre et la passe en majuscule
  const firstLetter = s.charAt(0).toUpperCase();

  return firstLetter + tmp;
};

// ============================================== APPELS ==========================================

// appelle la fonction showPerson en lui passant l'objet "arnaud" en argument ET une fonction anonyme à rappeler
showPerson(arnaud, (identifier) => {
  // ici, on est dans la fonction anonyme "callback" : elle sera rappelée par "showPerson" qui lui passera le paramètre
  console.log("rappelé avec paramètre ", identifier);
});

// appelle la fonction showPerson en lui passant l'objet "arnaud" en argument SANS fonction à rappeler
showPerson(agnes);
