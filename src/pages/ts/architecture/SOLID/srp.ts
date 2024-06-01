/**
 * SRP = Single Responsability Principle
 *  (le S de SOLID)
 *
 * Principe :
 *    Une classe, une fonction ou une méthode doit avoir une et une seule unique raison d'être modifiée.
 *    Cela favorise la modularité et facilite la maintenance en évitant les classes surchargées de responsabilités.
 *
 * Ex.:
 *    Prenons l'exemple d'un module qui compile et imprime un rapport.
 *    Imaginons que ce module peut changer pour deux raisons:
 *      - D'abord, le contenu du rapport peut changer.
 *      - Ensuite, le format du rapport peut changer.
 *    Ces deux choses changent pour des causes différentes ; l'une substantielle, et l'autre cosmétique.
 *    Le principe de responsabilité unique dit que ces deux aspects du problème ont deux responsabilités distinctes,
 *    et devraient donc être dans des classes ou des modules séparés.
 *    -> Ce serait une mauvaise conception de coupler ces deux choses dans une même classe.
 *
 *    La raison pour laquelle il est important de garder une classe axée sur une seule préoccupation est que cela rend la classe plus robuste.
 *    En continuant avec l'exemple précédent, s'il y a un changement dans le processus de compilation du rapport,
 *    il y a un plus grand danger que le code d'impression se casse si elle fait partie de la même classe.
 *
 * Voir aussi :
 *    - Chaine de responsabilités : https://fr.wikipedia.org/wiki/Cha%C3%AEne_de_responsabilit%C3%A9
 *    - cohésion (informatique) : https://fr.wikipedia.org/wiki/Coh%C3%A9sion_(informatique)
 */

const textAreas = document.getElementsByTagName('textarea')
if (textAreas.length > 0) {
  const textArea = textAreas[0]
  textArea.value = 'Single Responsability Principle\n\nThis is the "S" in "SOLID" principles'
}

// ----------------------------------------------------------------------------
// Bad practice
// ----------------------------------------------------------------------------

/**
 * Cette classe a 2 responsabilités différentes
 *  - créer les objets BadWorkItem
 *  - gérer la persistance des objets (load and save)
 *
 * Ca ne va pas !
 */
class BadWorkItem {
  // identifiant de l'élement dans la base de données
  id!: number
  name!: string
  description!: string

  constructor() {}

  save() {
    // code pour sauver l'élement dans la base de données
    console.log(`bad : save item from WorkItem class`)
  }

  static getById(id: number) {
    // code pour charger lélément depuis la base de données
    console.log(`bad : load item from WorkItem class`)
    return new BadWorkItem()
  }
}

const badItem = BadWorkItem.getById(0)
badItem.name = 'BadName'
badItem.save()

// ----------------------------------------------------------------------------
// Good practice
// ----------------------------------------------------------------------------

/**
 * Une seule responsabilité :  Créer les objets WorkItem
 */
class WorkItem {
  name!: string
  description!: string
}

/**
 * Une seule responsabilité :  Gérer la persistance des objets WorkItem
 */
class WorkItemDataAccess {
  save(item: WorkItem) {
    // code pour sauver l'élement dans la base de données
    console.log(`save work ${item.name} to db`)
  }
  getById(id: number): WorkItem {
    // code pour charger lélément depuis la base de données
    console.log(`get work item ${id} from db`)
    return new WorkItem()
  }
}

// ex. de bonne utilisation : On a un objet par respnsabilité
const access = new WorkItemDataAccess()
const item = access.getById(0)
item.name = 'updated name'
access.save(item)

// ---------------------------------------------------------------------------------
// autre exemple
// ---------------------------------------------------------------------------------

class Report {
  content: string = 'empty'
  title: string = 'default'
}
// --------------------------------------------------
// bad way
// --------------------------------------------------

class ReportWorker {
  build(): Report {
    console.log('bad build report...')
    return new Report()
  }
  print(report: Report) {
    console.log('bad print report:', report)
  }
}

const worker = new ReportWorker()
let report = worker.build()
worker.print(report)

// --------------------------------------------------
// good way
// --------------------------------------------------

class ReportBuilder {
  static build(): Report {
    console.log('good build report...')
    return new Report()
  }
}
class ReportPrinter {
  static print(report: Report) {
    console.log('good print report:', report)
  }
}

report = ReportBuilder.build()
ReportPrinter.print(report)
