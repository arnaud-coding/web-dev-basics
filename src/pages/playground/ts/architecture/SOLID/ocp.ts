const textAreas = document.getElementsByTagName('textarea')
if (textAreas.length > 0) {
  const textArea = textAreas[0]
  textArea.value = 'Open/Closed Principle\n\nThis is the "O" in "SOLID" principles'
}

// ----------------------------------------------------------------------------
// Bad practice
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
