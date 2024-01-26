// TypeScript pour les Programmeurs JavaScript
// https://www.typescriptlang.org/fr/docs/handbook/typescript-in-5-minutes.html

//* Use Quokka to see the run-time behavior

;(() => {
  // ----------------------------------------------------------------------------
  // Types primitifs : types fournis par JS (number, string, date, ...)
  // ----------------------------------------------------------------------------
  let n: number // Déclaration type explicite (le dev dit que c'est un nombre).
  let age = 12 // Inférence de type (VScode devine le type  grace au "= 12", dans ce cas on ne met pas le ": number").
  let s: string
  let d: Date
  let b: boolean
  let o: object // déclaration inutile d'objet (aucune méthode ne sera proposée par intellisense)
  let p: {
    // déclaration utile d'objet (intellisense suggérera les prorpiétés de "p")
    name: string
    birthday: Date
  }
  let fn: (arg: string) => number

  //  Une fois qu'une variable est déclarée d'un certain type, on ne peut plus en changer. (ex: age = '' est interdit).
  //  VScode nous proposera alors avec "l'intellisense" (suggestions) les méthodes associées au type défini.

  // ----------------------------------------------------------------------------
  // Compositions de types primitifs
  // ----------------------------------------------------------------------------
  let ns: number | string
  let client: string | string[]
  let videoState: 'play' | 'pause' | 'stop' // ainsi, la valeur de la variable ne pourra etre qu'une seule des trois valeurs
  let prime: 3 | 5 | 7 | 11

  // ----------------------------------------------------------------------------
  // Exemples d'utilisation
  // ----------------------------------------------------------------------------

  // exemple de fonction avec déclaration explicite des types des arguments et du type du résultat
  function square(value: number): number {
    return value * value
  }
  n = square(age)
  n

  // exemple de fonction avec déclaration explicite des types des arguments et INFERENCE du type du résultat
  function cube(value: number) {
    return Math.pow(value, 3) // c'est grace au return que l'inférence de type se fait (et que l'intellisense peut dire que la fonction retourne un nombre)
  }
  n = cube(3)
  n

  // MAUVAIS exemple de fonction avec déclaration explicite du type de l' argument p
  //    bon : on  a une vérification de type
  //    mauvais : la déclaration du type est dupliquée (donc gros risque de modidifier une des déclarations et pas l'autre)
  //    solution : utiliser les types personnalisés (créer ses propres types)
  function getPersonNameBad(p: { name: string; birthday: Date }): string {
    return p.name
  }
  p = { name: 'John', birthday: new Date(1995, 7, 22) }
  s = getPersonNameBad(p)
  s

  function getNameBetter(o: { name: string }): string {
    return o.name
  }
  s = getNameBetter(p)
  s
  s = getNameBetter({ name: '208', brand: 'Peugeot', year: 2019 })
  s

  // exemple de fonction qui attend une fonction aved déclaration explicite du type de la fonction
  function sendMail(address: string, format: (message: string) => string) {
    const body = format('SALUT LES GENS')
    body
    console.log(`send mail to ${address} with body = ${body}`)
  }
  function defaultFormatter(msg: string): string {
    return msg.toLowerCase()
  }
  sendMail('toto@hotmail.ca', defaultFormatter) // appel avec fonction nommée
  sendMail('nono@hotmail.ru', (message) => message + ' !!!') // appel avec une fonction anonyme
})()
