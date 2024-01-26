;(() => {
  // ----------------------------------------------------------------------------
  // Types peronnalisés ( = 'custom types' | 'types utlilisateurs' )
  // ----------------------------------------------------------------------------

  // déclaration d'un type personnalisé
  type Person = {
    name: string
    age: number
    sexe: 'M' | 'F'
  }

  // déclaration d'une variable de type personnalisée
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
})()
