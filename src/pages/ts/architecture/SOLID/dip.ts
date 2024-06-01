/**
 * DIP = Dependency Inversion Principle
 *  (le D de SOLID)
 *
 * Principe : - Les classes de haut nivau ne devraient pas dépendre de classes de bas niveau ; les deux devraient dépendre d'abstractions.
 *            - Les abstractions ne devraient pas dépendre de détails. Les détails devraient dépendre d'abstractions.
 */

const textAreas = document.getElementsByTagName('textarea')
if (textAreas.length > 0) {
  const textArea = textAreas[0]
  textArea.value = 'DIP - Dependency Inversion Principle\n\nThis is the "D" in "SOLID" principles'
}

// ----------------------------------------------------------------------------
// Bad practice : Principe générique
// ----------------------------------------------------------------------------

// low level class
class BadB {
  bar() {
    console.log('bar() called on B')
  }
}

// high level class
class BadA {
  //! A dépends de B, ils sont couplés.
  foo(b: BadB) {
    console.log('foo() called on A, using B')
    b.bar()
  }
}

const badA = new BadA()
//! On ne pourrait pas appeler badA.foo() avec un objet de type C, même s'il avait une méthode bar()
badA.foo(new BadB())

// ----------------------------------------------------------------------------
// Good practice : Principe générique
// ----------------------------------------------------------------------------

interface I {
  bar(): void
}

//* low level class: dépend de l'abstraction I
class B implements I {
  bar() {
    console.log('bar() called on B')
  }
}

//* low level class: dépend de l'abstraction I
class C implements I {
  bar() {
    console.log('bar() called on C')
  }
}

//* high level class :  dépend de "l'abstraction" I (ne dépend plus de A).
class A {
  foo(i: I) {
    console.log('foo() called on A, using I')
    i.bar()
  }
}

const a = new A()
//* Maintenant, on peut appeler a.foo() avec tous types d'objets impléméntant l'interface I (comme B et C).
a.foo(new B())
a.foo(new C())

// --------------------------
// Solution pure Javascript sans création de types
// --------------------------

class J {
  // accepte n'importe quel object qui a une méthode bar()
  foo(obj: { bar(): void }) {
    obj.bar()
  }
}

const objBar = {
  // un object qui a une méthode bar()
  bar() {}
}
const j = new J()
j.foo(objBar) // utilise la méthode bar() de l'object que l'on passe à la fonction

// --------------------------
// Solution pure Javascript avec création de types
// --------------------------
type Bar = {
  bar(): void
}

class JS {
  foo(obj: Bar) {
    obj.bar()
  }
}

const barBar: Bar = {
  // un object qui a une méthode bar()
  bar() {}
}
const js = new JS()
js.foo(barBar) // utilise la méthode bar() de l'object de type Bar que l'on passe à la fonction

// ------------------------------------------------------------------
// Exemple plus concret avec une application qui gère des gens
// ------------------------------------------------------------------

// classe de bas niveau
class BadUserFileRepository {
  save(person: string) {
    console.log(`save ${person} in a file`)
  }
}

// classe de haut niveau
class BadUserManagement {
  // sauve la personne passée
  constructor(private person: string) {}

  //! Crée un repo privé : crée une dépendance/couplage avec un objet de bas niveau
  // Conséquence : On ne pourrait pas remplacer le mode de sauvegarde sans retourner modifier cet objet
  private repo = new BadUserFileRepository()

  // utilise le repo privé pour sauver la personne passée dans le constructor
  save() {
    this.repo.save(this.person)
  }
}

const badUserManager = new BadUserManagement('bad-john')
badUserManager.save()

// Solution : Créer une abstraction dont les 2 classes vont dépendre

interface UserRepository {
  save(person: string): void
}

//* classe de bas niveau : dépends de l'abstraction
class UserFileRepository implements UserRepository {
  save(person: string) {
    console.log(`save ${person} in a file`)
  }
}

//* classe de bas niveau: dépends de l'abstraction
class UserDataBaseRepository implements UserRepository {
  save(person: string) {
    console.log(`save ${person} in a database`)
  }
}

// classe de haut niveau
class UserManagement {
  // sauve la personne passée
  //* et reçoit l'abstraction dont cette classe dépend
  constructor(
    private person: string,
    private repo: UserRepository
  ) {}

  // utilise le repo privé pour sauver la personne passée dans le constructor
  save() {
    this.repo.save(this.person)
  }
}

const fileRepo = new UserFileRepository()
const dbRepo = new UserDataBaseRepository()

new UserManagement('john', fileRepo).save()
new UserManagement('john', dbRepo).save()
