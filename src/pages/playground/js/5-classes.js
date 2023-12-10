// https://www.w3schools.com/jsref/jsref_class.asp
// https://www.w3schools.com/js/js_classes.asp

// Une classe est un modéle pour créer des objets avec des propriétés et des méthodes.
//  - une classe est un type (comme Number, String, Boolean, Date...).
//  - on appelle instance de la classe un objet ceéé à partir de la classe.
//  - pour créer une instance de la classe, on utilise le mot-clé "new".
//  - à l'intérieur de la classe, on doit utiliser le mot clé "this" pour accéder aux propriétés de la classe.
// On dit qu'une classe encapsule les données (elle contient/regroupe toutes les données nécessaires pour travailler).

// -----------------------------------------------------
// définition de la classe
// -----------------------------------------------------
/**
 * cette classe sert a manipuler des rectangles.
 */
class Rectangle {
  /**
   * the constructor function is used to create instance of the class
   * @param {string} name
   * @param {number} length
   * @param {number} width
   */
  constructor(name, length, width) {
    // on crée les propriétés de l'objet à partir des paramètres reçus
    this.length = length;
    this.width = width;
    this.name = name;
  }

  /** calcule l'aire du rectangle */
  get area() {
    return this.length * this.width;
  }

  /**   fonction qui va loguer l'objet */
  log() {
    console.log(`${this.name} a une surface de ${this.area}`);
  }
}

/**
 * cette classe sert à manipuler des pavés droits.
 * cette classe ETEND la classe "Rectangle" : elle contient toutes les propriété/méthodes de rectangle , PLUS des nouvelles
 */
class RectangleCuboid extends Rectangle {
  constructor(name, length, width, height) {
    // on crée l'objet de base (ici, super appelle le constructeur de rectangle)
    super(name, length, width);
    // on crée la propriété spécifique au cake
    this.height = height;
  }

  /** calcule le volume */
  get volume() {
    // ici, on appelle "area", contenue dans l'objet de base (le rectangle)
    return this.area * this.height;
  }

  /**   fonction qui va loguer l'objet : elle REMPLACE la fonction "log" de l'objet de base (on dit qu'elle surcharge la fonction) */
  log() {
    console.log(`${this.name} a un volume de ${this.volume}`);
  }
}

// -----------------------------------------------------
// utilisation de la classe
// -----------------------------------------------------
// on instancie 2 objets (on crée 2 instances/objets)
const rect1 = new Rectangle("bill", 2, 4);
const rect2 = new Rectangle("bob", 1, 5);

// utilisation directe de l'objet
rect1.log();
rect2.log();

/**
 * Utilise le rectangle
 * @param {Rectangle} rectangle
 */
function demoRectangleUsage(rectangle) {
  rectangle.log();
}

// utilisation dans une fonction  d'un rectangle
demoRectangleUsage(rect1);
demoRectangleUsage(rect2);

const cake = new RectangleCuboid("cake", 2, 3, 8);
cake.log();
