import { FamilyTreeCreator } from '../family-tree-creator.ts'
import { Person, Gender, FamilyTree, Physical } from '../family-tree.model.ts'
import { LengthtUnit, ValueUnit } from '../units-helpers.ts'

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
export let denise: Person
export let gaston: Person
export let marie: Person
export let jean: Person
export let antoine: Person
export let antoinette: Person
export let eugenie: Person
export let claude: Person

const createMember = (
  firstname: string,
  lastname: string,
  gender: Gender,
  birthdate?: Date,
  height?: ValueUnit<LengthtUnit>
): Person => {
  const member = new Person(firstname, lastname, gender)
  member.birthdate = birthdate
  if (height !== undefined) {
    member.physicals = new Physical(height)
  }
  return member
}

function createMembers() {
  arnaud = createMember('Arnaud', 'Berthollet', 'male', new Date('1995-08-22T05:30'), new ValueUnit(1.72, 'm'))
  thomas = createMember('Thomas', 'Berthollet', 'male', new Date('1994-09-25'))
  loic = createMember('Loïc', 'Berthollet', 'male', new Date('1967-03-17'), new ValueUnit(1.78, 'm'))
  agnes = createMember('Agnès', 'Laurent', 'female', new Date('1967-02-27'), new ValueUnit(1.65, 'm'))
  jo = createMember('Georges', 'Berthollet', 'male', new Date('1947-10-04'))
  millette = createMember('Marie-Claude', 'Tholin', 'female', new Date('1945-11-26'))
  annick = createMember('Annick', 'Raynaud', 'female', new Date('1947-06-17'))
  pierrot = createMember('Pierre', 'Laurent', 'male', new Date('1940-01-27'))
  philippe = createMember('Philippe', 'Berthollet', 'male', new Date('1968-12-02'))
  xavier = createMember('Xavier', 'Laurent', 'male', new Date('1970-02-24'))
  herve = createMember('Hervé', 'Laurent', 'male', new Date('1966-02-13'))
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

  denise = createMember('Denise', 'Gullon', 'female')
  gaston = createMember('Gaston', 'Berthollet', 'male')
  marie = createMember('Marie', 'Charpentier', 'female')
  jean = createMember('Jean', 'Raynaud', 'male')
  antoine = createMember('Antoine', 'Tholin', 'male')
  antoinette = createMember('Antoinette', 'Vially', 'female')
  eugenie = createMember('Eugénie', 'Noyel', 'female', new Date('1914-09-25'))
  claude = createMember('Claude', 'Laurent', 'male')
}

export function createBertholletTree(): FamilyTree {
  createMembers()
  const creator = new FamilyTreeCreator('Arnaud Berthollet', arnaud)
  creator.addParent(loic, arnaud)
  creator.addParent(agnes, arnaud)
  creator.addChild(thomas, loic)
  creator.addRelationship(thomas, 'child', agnes)

  creator.addParent(jo, loic)
  creator.addParent(annick, loic)
  creator.addChild(philippe, jo)
  creator.addRelationship(philippe, 'child', annick)
  creator.addParent(jean, annick)
  creator.addParent(marie, annick)
  creator.addParent(denise, jo)
  creator.addParent(gaston, jo)

  creator.addParent(pierrot, agnes)
  creator.addParent(millette, agnes)
  creator.addChild(herve, pierrot)
  creator.addRelationship(herve, 'child', millette)
  creator.addChild(xavier, pierrot)
  creator.addRelationship(xavier, 'child', millette)
  creator.addParent(antoine, millette)
  creator.addParent(antoinette, millette)
  creator.addParent(eugenie, pierrot)
  creator.addParent(claude, pierrot)

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
