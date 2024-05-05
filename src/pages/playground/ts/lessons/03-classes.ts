// https://www.typescriptlang.org/docs/handbook/2/classes.html

const textAreas = document.getElementsByTagName('textarea')
if (textAreas.length > 0) {
  const textArea = textAreas[0]
  textArea.value = 'Class'
}

// Une classe est un modéle pour créer des objets.
//  - Une classe EST un type (comme Number, String, Boolean, Date...).
//  - Les classes définissent les membres (propriétés/champs et méthodes)
//  - Le constructeur FACULTATIF 'new()'
//      - crée une instance de la classe (appelé aussi un objet)
//      - peut recevoir des parametres pour initialiser l'objet
//  - Les objets assignent des valeurs aux membres de la classe
//    (chaque objet a ses propres valeurs)
//  - Les membres statiques sont communs à tous les objets/instances de la classe

class A {
  /** membre statique :
   *    - partagé par toutes les instances de la classe
   */
  static _instanceCount: number = 0

  /** membre public de la classe */
  _foo: string

  /** membre privé :
   *    - acessible uniquement à l'intérieur de la classe
   *    - utile pour cacher les détails de l'implémentation aux utilisateurs
   */
  private _bar: string = 'my_bar'

  /** membre protégé :
   *    - accessible aux héritiers de la classe A
   *   - utile pour cacher les détails de l'implémentation aux utilisateurs
   */
  protected _baz: string

  /**
   * Constructeur : utilisé pour créer une instance de la classe
   * @param foo variable, DOIT être passée
   * @param baz variable with a default value , PEUT être passée
   */
  constructor(foo: string, baz: string = 'baz-default') {
    A._instanceCount++
    console.log(`build object of type A with foo=${foo}, bar=${this._bar}, baz=${baz}.Instance no.${A._instanceCount}`)
    this._foo = foo // stocke la variable 'foo' reçue dans le membre '_foo'
    this._baz = baz
  }
}

const objA1 = new A('my_foo_A1') // crée l'objet en lui passant la valeur de foo mais pas baz
console.log('objA1:', objA1)

const objA2 = new A('my_foo_A2', 'my_baz') // crée l'objet en lui passant les valeurs de foo et baz
console.log('objA2:', objA2)

class B {
  /**
   * Constructeur : utilisé pour créer une instance de la classe
   * @param foo variable, 'public', 'protected' ou 'private' devant la déclaration DECLARE cette variable en tant que membre
   */
  constructor(public foo: string) {
    console.log(`build object of type A with foo = ${foo}`)
  }
}

const objB = new B('foo_B')
console.log('objB:', objB)

//-----------------------------------------------------------------------------

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

class Employee extends Person {
  constructor(
    name: string,
    address: string,
    private salary: number
  ) {
    super(name) // appelle le constructeur de la classe de base (Person) en lui passant le nom recu
    this.address = address
  }

  pay(month: string) {
    console.log(`Payment: ${this.name}, ${month}, ${this.salary} $`)
    this.sendMail(`Votre salaire de ${month} a été versé`)
  }
}

class Client extends Person {
  constructor(name: string) {
    super(name)
  }
  printInvoice(invoice: string) {
    console.log(`Print invoice: ${this.name}, ${invoice} `)
  }
}

class Manager extends Employee {
  readonly employees: Employee[] = []
  constructor(name: string, address: string, salary: number) {
    super(name, address, salary)
  }
  addEmployee(employee: Employee) {
    this.employees.push(employee)
    console.log(`add employee ${employee.name} to manager ${this.name}`)
  }
}

const arnaud = new Employee('Arnaud', 'Lyon', 1500)
console.log('arnaud:', arnaud)
arnaud.pay('may')

const thomas = new Client('Thomas')
thomas.address = 'Firminy'
console.log('thomas:', thomas)
thomas.printInvoice(`total price: 100$, date: ${new Date().toLocaleString('en-US')}`)
thomas.sendMail('Votre commande est arrivée')

const loïc = new Manager('Loïc', 'Limas', 4000)
loïc.addEmployee(arnaud)
