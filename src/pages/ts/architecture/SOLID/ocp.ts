/**
 * OCP = Open/Closed Principle
 *  (le O de SOLID)
 *
 * Principe : Une classe doit être ouverte à l'extension et fermée à la modification.
 *    - Une classe de base ne doit pas avoir besoin d'être modifiée quand on étend de nouveau cette classe
 *      (ex.: la classe Animal ne doit pas etre modifiée si on ajoute une classe 'Rabbit' )
 *
 * Conséquences:
 *    - Dans une fonction, tester le type de l'objet (if this instanceof ...),
 *      c'est ouvrir à la modification à chaque ajout de nouvelle classe => mauvais (cf BadAnimal)
 *    - Utiliser une énumération n'est valable que si on n'est sûr qu'elle ne bougera pas.
 *    - Utiliser une union de type n'est valable que si on n'est sur qu'elle ne bougera pas.
 */

const textAreas = document.getElementsByTagName('textarea')
if (textAreas.length > 0) {
  const textArea = textAreas[0]
  textArea.value = 'OCP - Open/Closed Principle\n\nThis is the "O" in "SOLID" principles'
}

//#region bad usage of instanceof

// ----------------------------------------------------------------------------
// Bad practice n°1 : instanceof
// ----------------------------------------------------------------------------

abstract class BadAnimal {
  constructor(private name: string) {}
  speak() {
    //! Ici, le code est ouvert a la modification: on doit modifier cette fonction à chaque nouvel animal => à ne pas faire.
    // Et ce serait pareil pour des fonctions 'manger', 'courir', 'dormir', ...
    // Le risque :
    //  Un confrere pourrait ajouter un animal sans savoir qu'il faut modifier cette fonction
    //  et aucune erreur ne serait signalée par VScode dans ce cas.
    //  L'erreur se verrait alors à l'exécution du code par le client = catastrophe

    if (this instanceof BadPig) {
      console.log(`${this.name} the bad pig says 'grruiik grruiik!'`)
    } else if (this instanceof BadRabbit) {
      console.log(`${this.name} the bad rabbit says 'What's up doc?'`)
    }
  }
}

class BadPig extends BadAnimal {
  constructor(name: string) {
    super(name)
  }
}

class BadRabbit extends BadAnimal {
  constructor(name: string) {
    super(name)
  }
}

const porky = new BadPig('Porky')
porky.speak()
const buggs = new BadRabbit('Buggs')
buggs.speak()

// ----------------------------------------------------------------------------
// Good practice
// ----------------------------------------------------------------------------

abstract class Animal {
  constructor(protected name: string) {}

  //* ici, la fonction est ouverte à l'extension MAIS fermée à la modification:
  // plus besoin de modifier cette fonction à chaque nouvel animal.
  //  Un confrere ne pourrait pas ajouter un animal sans savoir qu'il faut modifier cette fonction
  //  car une erreur serait signalée par VScode dans ce cas.
  //  L'erreur se verrait donc à la compilation du code par le développeur = génial
  abstract speak(): void
}

class Pig extends Animal {
  constructor(name: string) {
    super(name)
  }
  speak() {
    console.log(`${this.name} the good pig says 'grruiik grruiik !'`)
  }
}

const babe = new Pig('Babe')
babe.speak()

class Rabbit extends Animal {
  constructor(name: string) {
    super(name)
  }
  speak() {
    console.log(`${this.name} the good rabbit says 'What's up doc ?'`)
  }
}

const thumper = new Rabbit('Thumper')
thumper.speak()

//#endregion

//#region bad usage of enumeration/union type

enum Direction {
  Up,
  Down,
  Left,
  Right
}

type Sens = 'up' | 'down' | 'left' | 'right'

class RandomJoystick {
  get offsetX() {
    return Math.floor(Math.random() * 5)
  }
  get offsetY() {
    return Math.floor(Math.random() * 5)
  }
}

class Player {
  constructor(
    private x = 0,
    private y = 0
  ) {
    console.log(`Player initalized at position ${this.position}`)
  }

  //! Ici, le code est ouvert a la modification: on doit modifier cette fonction à chaque nouvelle direction => à ne pas faire.
  // Ce serait OK si on était sur de toujours avoir uniquement ces quatres direction (ex.: un jeu qui ne gère que les touches du clavier)
  // Ce serait mauvais si le jeu devait passer au déplacement avec joystick
  badMoveEnum(direction: Direction) {
    if (direction === Direction.Up) {
      this.y++
    } else if (direction === Direction.Down) {
      this.y--
    } else if (direction === Direction.Left) {
      this.x--
    } else if (direction === Direction.Right) {
      this.x++
    }
    console.log(`Player moved to ${this.position}`)
  }

  //! Ici, le code est ouvert a la modification: on doit modifier cette fonction à chaque nouvelle direction => à ne pas faire.
  badMoveUnion(sens: Sens) {
    if (sens === 'up') {
      this.y++
    } else if (sens === 'down') {
      this.y--
    } else if (sens === 'left') {
      this.x--
    } else if (sens === 'right') {
      this.x++
    }
    console.log(`Player moved to ${this.position}`)
  }

  //* */ Ici, la fonction est fermée à la modification (mais aussi fermée à l'extension ce qui n'est pas important ici).
  goodMove(offsetX: number, offsetY: number) {
    this.x += offsetX
    this.y += offsetY
    console.log(`Player moved to ${this.position}`)
  }

  //* Ici, la fonction est fermée à la modification et fermée à l'extension.
  goodMoveWithJoystick(joystick: RandomJoystick) {
    this.goodMove(joystick.offsetX, joystick.offsetY)
  }

  public get position(): string {
    return `x = ${this.x}, y = ${this.y}`
  }
}

const player = new Player()
player.badMoveEnum(Direction.Up)
player.goodMove(2, 3)

const joystick = new RandomJoystick()
player.goodMoveWithJoystick(joystick)

//#endregion
