// https://www.typescriptlang.org/docs/handbook/2/classes.html

const textAreas = document.getElementsByTagName('textarea')
if (textAreas.length > 0) {
  const textArea = textAreas[0]
  textArea.value = 'This lesson is about Classes'
}

// Une classe est un modéle pour créer des objets.
//  - Une classe EST un type (comme Number, String, Boolean, Date...).
//  - Les classes définissent des membres (propriétés/champs et méthodes)
//  - Le constructeur FACULTATIF 'new()'
//      - crée une instance de la classe (appelé aussi un objet)
//      - peut recevoir des parametres pour initialiser l'objet
//  - Les objets assignent des valeurs aux membres de la classe
//    (chaque objet a ses propres valeurs)
//  - Les membres statiques sont communs à tous les objets/instances de la classe

// class is a type : it contains members that could be fields, constructors, methods and getters/setters

class A {
  /** champ statique : valeur partagée par toutes les instances de la classe */
  static _instanceCount: number = 0

  /** champ public de la classe : valeur accessible par toutes les instances */
  readonly _foo: string

  /** champ privé :
   *    - acessible uniquement aux instances de CETTE classe
   *    - utile pour cacher les détails de l'implémentation aux utilisateurs, ce qui est PRIMORDIAL.
   */
  private _bar: string = 'my_bar'

  /** champ protégé :
   *    - accessible aux instances de CETTE classe et aux héritiers de la classe A
   *    - utile pour cacher les détails de l'implémentation aux utilisateurs, ce qui est PRIMORDIAL.
   */
  protected _baz: string

  /**
   * Constructeur : utilisé pour créer une instance de la classe
   * @param foo variable, DOIT être passée
   * @param baz variable avec une valeur par défault, PEUT être passée
   */
  constructor(foo: string, baz: string = 'baz-default', bar?: string) {
    A._instanceCount++
    console.log(`build object of type A with foo=${foo}, bar=${this._bar}, baz=${baz}.Instance no.${A._instanceCount}`)
    this._foo = foo // stocke la variable 'foo' reçue dans le membre '_foo'
    this._baz = baz
    if (bar !== undefined) {
      this._bar = bar
    }
  }

  // methode de la classe
  doSomething() {
    console.log(`${this._foo} does something`)
  }

  // getter (avantage: utilisé comme un champ, mais permet d'exécuter du code privé)
  get randomValue(): number {
    return Math.round(Math.random() * 100)
  }

  // setter (avantage: utilisé comme un champ, mais permet d'exécuter du code privé pour VERIFIER la valeur à écrire)
  public set bar(value: string) {
    const l = value.length
    if (l < 3 || l > 6) {
      throw new Error('value is out of expected range (3..6)')
    }

    console.log(`${this._foo} set ${value} in field bar`)
    this._bar = value
  }
}

const objA1 = new A('my_foo_A1') // crée l'objet en lui passant la valeur de foo mais pas baz
console.log(objA1)
objA1.doSomething()
console.log(`random = ${objA1.randomValue}`)
objA1.bar = 'toto'

const objA2 = new A('my_foo_A2', 'my_baz') // crée l'objet en lui passant les valeurs de foo et baz
console.log(objA2)

class B {
  /**
   * Constructeur : utilisé pour créer une instance de la classe
   * @param foo  une variable de la classe.
   *            -> 'public', 'protected' ou 'private' devant la déclaration DECLARE cette variable en tant que membre
   *            -> évite déclaration champ et assignation dans constructeur = plus court => tout le monde fait comme ça !
   */
  constructor(public foo: string) {
    console.log(`build object of type A with foo = ${foo}`)
  }
}

const objB = new B('foo_B')
console.log('objB:', objB)

//-----------------------------------------------------------------------------

/**  classe abstraite : ne peut pas etre instanciée.
   -> on va donc déclarer d'autres classes qui héritent/dérivent de celle-ci
   -> une classe qui dérive d'une autre est aussi appelée sous-classe , classe dérivée, classe enfant, ou classe fille
    -> une classe dont d'autres classes héritent est appelée super-classe, classe de base, classe parent ou classe mère
*/
abstract class Person {
  address?: string

  constructor(public readonly name: string) {}

  sendMail(message: string) {
    if (this.address === undefined) {
      console.warn(`cannot send mail to ${this.name}: address is undefined`)
      return
    }

    console.log(`mail sent to ${this.name} at ${this.address}: "${message}"`)
  }
}

/**
 * Employee étend Person, ou Employee hérite de Person, ou ...
 */
class Employee extends Person {
  constructor(
    name: string,
    address: string,
    private salary: number //* Employee étends Person en ajoutant un champ 'salary'
  ) {
    super(name) //* appelle le constructeur de la classe de base (Person) en lui passant le nom recu
    this.address = address
  }

  //* Employee étends Person en ajoutant une méthode pay()
  pay(month: string) {
    console.log(`Payment: ${this.name}, ${month}, ${this.salary} $`)
    this.sendMail(`Votre salaire de ${month} a été versé`)
  }
}

enum ClientType {
  individual,
  professional
}

class Client extends Person {
  constructor(
    name: string,
    public readonly type: ClientType
  ) {
    super(name)
  }
  printInvoice(invoice: string) {
    console.log(`Print invoice: ${this.name}, ${invoice} `)
  }
}

// Manager étend Employee qui étend Person
class Manager extends Employee {
  //* étend Employee en ajoutant une liste d'Employee à Manager
  private readonly employees: Employee[] = [] // ici , 'private' est important pour que personne extérieur à la classe ne puisse modifier la liste d'employés.

  constructor(name: string, address: string, salary: number) {
    super(name, address, salary)
  }

  //* étend Employee en ajoutant une méthode d'ajout d'employés à Manager
  addEmployee(employee: Employee) {
    this.employees.push(employee)
    console.log(`add employee ${employee.name} to manager ${this.name}`)
  }
}

// ----------------------------------------------
// exemples : création d'instances de classe (objets) et utilisation des instances
// ----------------------------------------------

const arnaud = new Employee('Arnaud', 'Lyon', 1500)
console.log('arnaud:', arnaud)
arnaud.pay('may')

const thomas = new Client('Thomas', ClientType.individual)
thomas.address = 'Firminy'
console.log('thomas:', thomas)
thomas.printInvoice(`total price: 100$, date: ${new Date().toLocaleString('en-US')}`)
thomas.sendMail('Votre commande est arrivée')

const loïc = new Manager('Loïc', 'Limas', 4000)
loïc.addEmployee(arnaud)
