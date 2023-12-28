(() => {

  // ----------------------------------------------------------------
  // Arithmetic Operators
  // ----------------------------------------------------------------
  let n = 0;

  n = n + 3; // assignment: add 3
  n = n - 3; // assignment: substract 3

  n += 2; // assignment: add 2
  n -= 2; // assignment: substract 2

  ++n; // pre-increment  = increment (= add one) PUIS utilise la valeur
  n++; // post-increment = utilise la valeur PUIS incrémente
  --n; // pre-decrement  = decrement (= substract one) PUIS utilise la valeur
  n--; // post-decrement = utilise la valeur PUIS décrémente

  n = 2;
  n = n * 3;
  n = n / 3;

  n *= 3;
  n /= 3;

  n = 23 % 10; // remainder/modulo = reste de la division entière => 23 / 10 = 2.3, div entière = 2, calcul du reste = 23 - (10*2) = 3
  console.log(n)

  // ----------------------------------------------------------------
  // String Operators
  // ----------------------------------------------------------------
  let s = "abc";
  s = s + "def"; // concatène (ajoute) 2 chaines de caractère
  s += "ghi"; // idem

  // ----------------------------------------------------------------
  // Comparison Operators
  // ----------------------------------------------------------------
  const giveMeFive = () => 5; // une fonction qui retourne 5
  const five = giveMeFive(); // five = 5

  // eslint-disable-next-line eqeqeq
  let b = five == 8; // equal to (BY REFERENCE  ==> //* use with CAUTION!)
  b = five === 8; // b = true si five égal 8, sinon b = false
  b = five !== 8; // b = true si five est différent de 8 , sinon b = false
  b = five > 8; // b = true si five est supérieur à 8 , sinon b = false
  b = five < 8; // b = true si five est inférieur à 8 , sinon b = false
  b = five >= 8; // b = true si five est supérieur ou égal à 8 , sinon b = false
  b = five <= 8; // b = true si five est inférieur ou égal à 8 , sinon b = false

  b = s === "xyz"; // b = true si s égal "xyz", sinon b = false

  s = five === 8 ? "donald" : "daisy"; // Ternary Operators : s = "donald" si five égal 8, "daisy" sinon (forme plus rapide que "if...else")

  // ----------------------------------------------------------------
  // Logical Operators
  // ----------------------------------------------------------------
  b = five >= 5 && five < 10; // b = true si five est supérieur ou égal à 5 ET inférieur à 10
  b = five === 2 || five === 22; // b = true si five égal 2 OU 22
  b = !b; // b = NOT b  (ca inverse b)
  b = !five; // b= NOT five : transforme "five" en booléen (false pour 0, true pour toute autre valeur) ,puis inverse ce booleen

  // ----------------------------------------------------------------
  //  The Nullish Coalescing Operator: (??)

  // => returns the first argument if it is not nullish (null or undefined), otherwise it returns the second argument
  // ----------------------------------------------------------------
  const getWinner = () => "karim";
  const getNull = () => null;
  const psg = getNull();

  s = psg ?? "looser"; // s = valeur de psg si psg n'est pas nullish (nul ou undefined), sinon s = looser
  s = getWinner() ?? "looser"; // s = valeur retournée par la fonction "getWinner" si elle n'est pas nullish, sinon s = looser

  // ----------------------------------------------------------------
  //  The Optionnal Chaining Operator: (?.)
  // ----------------------------------------------------------------
  const car = { type: "fiat", model: "500", color: "yellow" };
  s = car.type.toUpperCase(); // s = "FIAT"
  s = car.name?.toUpperCase(); // "car.name" = undefined, "toUpperCase" n'est pas appelé grace à "?." (sinon, undefined.toUpperCase() = system error)

  // ----------------------------------------------------------------
  //  The Typeof Operator
  // ----------------------------------------------------------------
  s = typeof "arnaud"; // "string"
  s = typeof b; // "boolean"
  s = typeof five; // "number"
  s = typeof [1, 2, 3]; // "object"
  s = typeof car; // "object"
  s = typeof psg; // "object"
  s = typeof undefined; // "undefined"
  s = typeof null; // "object"
  s = typeof getNull; // "function"
  s = typeof getNull(); // "object"
  s = typeof getWinner(); // "string"
  s = typeof new Date(); // "object"

  // ----------------------------------------------------------------
  //  The Spread Operator (...)

  // => expands an iterable (ex.array, object) into more arguments for function calls
  // ----------------------------------------------------------------
  const q1 = ["jan", "feb", "mar"];
  const q2 = ["apr", "may", "jun"];
  const q3 = ["jul", "aug", "sep"];
  const q4 = ["oct", "nov", "dec"];
  const year = [...q1, ...q2, ...q3, ...q4]; // year = tableau constitué de (q1 développé en 3 chaines + q2 développé en 3 chaines + etc)
  console.log(year)

  const numbers = [16, 33, 9, 8];
  const max = Math.max(...numbers); // max = tableau constitué de (tableau "numbers" développé en 4 nombres)
  console.log(max)

  // ------------------------------------------------------------------------
  //  The in Operator :

  // => returns "true" if a property exists in an object
  // --------------------------------------------------------------------------------
  b = "type" in car; // true car la propriété "type" existe dans l'objet "car"
  b = "fiat" in car; // false car la propriété "fiat" n'existe pas dans l'objet "car" (fiat est la valeur de la propriété)

  // ----------------------------------------------------------------
  //  The instanceof Operator
  // ----------------------------------------------------------------
  // todo

})()
