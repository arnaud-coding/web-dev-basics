/* eslint-disable no-unused-vars */

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

n = 23 % 10; // remainder = reste de la division entière => 23 / 10 = 2.3, div entière = 2, calcul du reste = 23 - (10*2) = 3

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

s = five === 8 ? "donald" : "daisy"; // Ternary Operators : s = "donald" si five égal 8, "daisy" sinon

// ----------------------------------------------------------------
// Logical Operators
// ----------------------------------------------------------------

b = five >= 5 && five < 10; // b = true si five est supérieur ou égal à 5 ET inférieur à 10
b = five === 2 || five === 22; // b = true si five égal 2 OU 22
b = !b; // b = NOT b  (ca inverse b)
b = !five; // transforme "five" en booleen (false pour 0, true pour toute autre valeur) ,puis inverse ce booleen

// ----------------------------------------------------------------
//  The Nullish Coalescing Operator: (??)
// ----------------------------------------------------------------

// todo

// ----------------------------------------------------------------
//  The Optionnal Chaining Operator: (?.)
// ----------------------------------------------------------------

// todo

// ----------------------------------------------------------------
//  The Typeof Operator
// ----------------------------------------------------------------

// todo

// ----------------------------------------------------------------
//  The Spread Operator (...)
// ----------------------------------------------------------------

// todo

// ----------------------------------------------------------------
//  The in Operator
// ----------------------------------------------------------------

// todo

// ----------------------------------------------------------------
//  The instanceof Operator
// ----------------------------------------------------------------

// todo
