import { FamilyTreeCreator } from '../family-tree-creator.ts'
import { Person, Gender, FamilyTree } from '../family-tree.model.ts'

export let arnaud: Person
export let thomas: Person
export let loic: Person
export let agnes: Person
export let jo: Person
export let annick: Person
export let millette: Person
export let pierrot: Person
export let philippe: Person
export let nathalie: Person
export let xavier: Person
export let corinne: Person
export let herve: Person
export let agnesMeunier: Person
export let romain: Person
export let elodie: Person
export let eloise: Person
export let anthony: Person
export let clement: Person
export let julien: Person
export let chloe: Person
export let annah: Person

const createMember = (firstname: string, lastname: string, gender: Gender): Person => {
  return new Person(firstname, lastname, gender)
}

function createMembers() {
  arnaud = createMember('Arnaud', 'Berthollet', 'male')
  thomas = createMember('Thomas', 'Berthollet', 'male')
  loic = createMember('Loïc', 'Berthollet', 'male')
  agnes = createMember('Agnès', 'Berthollet', 'female')
  jo = createMember('Georges', 'Berthollet', 'male')
  millette = createMember('Marie-Claude', 'Laurent', 'female')
  annick = createMember('Annick', 'Berthollet', 'female')
  pierrot = createMember('Pierre', 'Laurent', 'male')
  philippe = createMember('Philippe', 'Berthollet', 'male')
  xavier = createMember('Xavier', 'Laurent', 'male')
  herve = createMember('Hervé', 'Laurent', 'male')
  romain = createMember('Romain', 'Berthollet', 'male')
  anthony = createMember('Anthony', 'Berthollet', 'male')
  clement = createMember('Clément', 'Laurent', 'male')
  julien = createMember('Julien', 'Laurent', 'male')
  chloe = createMember('Chloe', 'Laurent', 'female')
  annah = createMember('Annah', 'Laurent', 'female')
  nathalie = createMember('Nathalie', '?', 'female')
  corinne = createMember('Corinne', 'Souzy', 'female')
  agnesMeunier = createMember('Agnès', 'Meunier', 'female')
  elodie = createMember('Elodie', '?', 'female')
  eloise = createMember('Eloïse', 'Berthollet', 'female')
}

export function createBertholletTree(): FamilyTree {
  createMembers()
  const creator = new FamilyTreeCreator('Berthollet', arnaud)
  creator.addParent(loic, arnaud)
  creator.addParent(agnes, arnaud)
  creator.addChild(thomas, loic)
  creator.addRelationship(thomas, 'child', agnes)

  creator.addParent(jo, loic)
  creator.addParent(annick, loic)
  creator.addChild(philippe, jo)
  creator.addRelationship(philippe, 'child', annick)

  creator.addParent(pierrot, agnes)
  creator.addParent(millette, agnes)
  creator.addChild(herve, pierrot)
  creator.addRelationship(herve, 'child', millette)
  creator.addChild(xavier, pierrot)
  creator.addRelationship(xavier, 'child', millette)

  creator.addChild(romain, philippe)
  creator.addRelationship(romain, 'child', nathalie)
  creator.addChild(anthony, philippe)
  creator.addRelationship(anthony, 'child', nathalie)

  creator.addChild(clement, herve)
  creator.addRelationship(clement, 'child', agnesMeunier)
  creator.addChild(julien, herve)
  creator.addRelationship(julien, 'child', agnesMeunier)

  creator.addChild(chloe, xavier)
  creator.addRelationship(chloe, 'child', corinne)
  creator.addChild(annah, xavier)
  creator.addRelationship(annah, 'child', corinne)

  creator.addChild(eloise, romain)
  creator.addRelationship(eloise, 'child', elodie)

  return creator.familyTree
}
