import { beforeEach, describe, expect, test } from 'vitest'
import { FamilyTree, Gender, Person } from './family-tree.model.ts'
import { FamilyTreeInspector } from './family-tree-inspector.ts'
import { FamilyTreeCreator } from './family-tree-creator.ts'

//#region internal test data
let arnaud: Person
let thomas: Person
let loic: Person
let agnes: Person
let jo: Person
let annick: Person
let millette: Person
let pierrot: Person
let philippe: Person
let nathalie: Person
let xavier: Person
let corinne: Person
let herve: Person
let agnesMeunier: Person
let romain: Person
let elodie: Person
let eloise: Person
let anthony: Person
let clement: Person
let julien: Person
let chloe: Person
let annah: Person
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

function createBertholletTree(): FamilyTree {
  createMembers()
  const x = new FamilyTreeCreator('Berthollet', arnaud)
  x.addParent(loic, arnaud)
  x.addParent(agnes, arnaud)
  x.addChild(thomas, loic)
  x.addRelationship(thomas, 'child', agnes)

  x.addParent(jo, loic)
  x.addParent(annick, loic)
  x.addChild(philippe, jo)
  x.addRelationship(philippe, 'child', annick)

  x.addParent(pierrot, agnes)
  x.addParent(millette, agnes)
  x.addChild(herve, pierrot)
  x.addRelationship(herve, 'child', millette)
  x.addChild(xavier, pierrot)
  x.addRelationship(xavier, 'child', millette)

  x.addChild(romain, philippe)
  x.addRelationship(romain, 'child', nathalie)
  x.addChild(anthony, philippe)
  x.addRelationship(anthony, 'child', nathalie)

  x.addChild(clement, herve)
  x.addRelationship(clement, 'child', agnesMeunier)
  x.addChild(julien, herve)
  x.addRelationship(julien, 'child', agnesMeunier)

  x.addChild(chloe, xavier)
  x.addRelationship(chloe, 'child', corinne)
  x.addChild(annah, xavier)
  x.addRelationship(annah, 'child', corinne)

  x.addChild(eloise, philippe)
  x.addRelationship(eloise, 'child', elodie)

  return x.familyTree
}
//#endregion

describe('Family-tree-inspector', () => {
  let sut: FamilyTreeInspector

  beforeEach(() => {
    sut = new FamilyTreeInspector(createBertholletTree())
  })

  test('it creates the inspector', () => {
    expect(sut).toBeInstanceOf(FamilyTreeInspector)
  })

  test('it finds siblings', () => {
    //! error : inversed family relationships

    const actual = sut.findPeopleByRelationships(arnaud, 'sibling')
    expect(actual.length).toBe(1)
    expect(actual[0]).toBe(thomas)
  })
})
