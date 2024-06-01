;(() => {
  // ----------------------------------------------------------------------------
  // Types peronnalisés ( = 'custom types' | 'types utlilisateurs' )
  // ----------------------------------------------------------------------------

  // déclaration d'un type personnalisé
  type Adress = {
    streetNumber: number
    streetName: string
    zipCode: string
    city: string
  }

  // déclaration d'un type personnalisé
  type Person = {
    name: string
    age: number
    sexe: 'M' | 'F'
    adress?: Adress
  }

  // déclaration d'une variable objet de type personnalisé (Person)
  const user: Person = {
    name: 'John Doeuf',
    age: 21,
    sexe: 'M'
  }

  // une fonction qui reçoit un paramètre de type personnalisé (plus de duplication de la déclaration du type)
  function getPersonName(person: Person) {
    return person.name
  }
  let s = getPersonName(user)
  s

  // ----------------------------------------------------------------------------
  // Composition de types peronnalisés
  // ----------------------------------------------------------------------------

  // le type 'Employee' EST le type 'Person' PLUS d'autres propriétés spécifiques aux employés (grâce au '&')
  type Employee = Person & {
    hiring: Date
    salary: number
  }

  const bob: Employee = {
    name: 'Bob',
    age: 25,
    sexe: 'M',
    hiring: new Date(2021, 0, 3),
    salary: 2000
  }

  s = getPersonName(bob)
  s

  // le type 'Manager' EST le type 'Person' PLUS le type Employee PLUS d'autres propriétés spécifiques aux managers (grâce au '&')
  type Manager = Employee & {
    employees: Employee[]
  }

  const jane: Manager = {
    name: 'Jane',
    age: 50,
    sexe: 'F',
    hiring: new Date(2000, 0, 1),
    salary: 5000,
    employees: [bob]
  }

  function showEmployees(manager: Manager) {
    for (const employee of manager.employees) {
      console.log(`${employee.name}, ${employee.salary} $`)
    }
  }
  showEmployees(jane)

  // --------------------------------------------

  // baad exemple de paramètres ambigus: Rien ne permet a Vscode de savoir quand error/data sont disponobles ou non --> risque d'erreur !
  type ApiResponse = {
    success: boolean
    error?: Error // existe si success = false
    data?: string // existe si success = true
  }
  const response: ApiResponse = { success: false, data: 'data' } // exemple d'erreur non détectée
  console.log('response data:', response.data) // erreur: 'data' pas définie --> erreur non détectée

  // goood exemple de résoudre l'ambiguité : 'Success' contient uniquement 'data' et 'failure' contient uniquement 'error'
  type Success = {
    success: true
    data: string
  }
  type Failure = {
    success: false
    error: Error
  }
  type Response = Success | Failure

  // les réponses ne peuvent contenir que les propriétés autorisées
  const goodResponse: Response = { success: true, data: 'the super data' } // ici Vscode n'autoriserait pas la propriété 'error' --> pas de risque d'erreur
  const badResponse: Response = { success: false, error: Error('Oops!') } // ici Vscode n'autoriserait pas la propriété 'data' --> pas de risque d'erreur

  function displayResponse(response: Response) {
    if (response.success) {
      console.log(response.data) // ici, impossible d'utiliser la propriété 'error' --> pas de risque d'erreur
    } else {
      console.log('call failed, no data to display. Error:', response.error.message)
    }
  }
  displayResponse(goodResponse)
  displayResponse(badResponse)
})()
