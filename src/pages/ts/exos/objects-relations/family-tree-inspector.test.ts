import { beforeEach, describe, expect, test } from 'vitest'
import { FamilyTree, Gender, Person, Relation } from './family-tree.model.ts'
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
//#endregion

describe('Family-tree-inspector', () => {
  let sut: FamilyTreeInspector

  beforeEach(() => {
    createBertholletTree()
    sut = new FamilyTreeInspector()
  })

  test('it creates the inspector', () => {
    expect(sut).toBeInstanceOf(FamilyTreeInspector)
  })

  test('it finds 0 siblings', () => {
    const actual = sut.findPeopleByRelationship(pierrot, 'sibling')
    expect(actual.length).toBe(0)
  })

  test('it finds 1 sibling', () => {
    const actual = sut.findPeopleByRelationship(arnaud, 'sibling')
    expect(actual.length).toBe(1)
    expect(actual[0]).toBe(thomas)
  })

  test('it finds 2 siblings', () => {
    const cat = new Person('Mojito', 'Cat', 'male')
    const rel: Relation = { person: cat, relationship: 'parent' }
    agnes.relations.push(rel)

    const actual = sut.findSiblings(arnaud)

    expect(actual.length).toBe(2)
    expect(actual[0]).toBe(thomas)
    expect(actual[1]).toBe(cat)
  })

  test('it finds 0 uncle-aunt', () => {
    const actual = sut.findPeopleByRelationship(loic, 'uncle-aunt')
    expect(actual.length).toBe(0)
  })

  test('it finds uncle(s) & aunt(s)', () => {
    const actual = sut.findPeopleByRelationship(arnaud, 'uncle-aunt')

    expect(actual.length).toBe(3)
    expect(actual).toContain(herve)
    expect(actual).toContain(xavier)
    expect(actual).toContain(philippe)
  })

  test('it finds 0 nephew-niece', () => {
    const actual = sut.findPeopleByRelationship(arnaud, 'nephew-niece')
    expect(actual.length).toBe(0)
  })

  test('it finds 2 nephews-nieces', () => {
    const actual = sut.findPeopleByRelationship(loic, 'nephew-niece')
    expect(actual.length).toBe(2)
    expect(actual).toContain(romain)
    expect(actual).toContain(anthony)
  })

  test('it finds 0 cousin', () => {
    const actual = sut.findPeopleByRelationship(loic, 'cousin')
    expect(actual.length).toBe(0)
  })

  test('it finds 6 cousins', () => {
    const actual = sut.findPeopleByRelationship(arnaud, 'cousin')
    expect(actual.length).toBe(6)
    expect(actual).toContain(romain)
    expect(actual).toContain(anthony)
    expect(actual).toContain(clement)
    expect(actual).toContain(julien)
    expect(actual).toContain(chloe)
    expect(actual).toContain(annah)
  })

  test('it finds 6 cousins', () => {
    const actual = sut.findPeopleByRelationship(chloe, 'cousin')
    expect(actual.length).toBe(4)
    expect(actual).toContain(clement)
    expect(actual).toContain(julien)
    expect(actual).toContain(arnaud)
    expect(actual).toContain(thomas)
  })

  test('it finds 0 grand-parent', () => {
    const actual = sut.findPeopleByRelationship(loic, 'grandParent')
    expect(actual.length).toBe(0)
  })

  test('it finds 4 grand-parents', () => {
    const actual = sut.findPeopleByRelationship(arnaud, 'grandParent')
    expect(actual.length).toBe(4)
    expect(actual).toContain(annick)
    expect(actual).toContain(jo)
    expect(actual).toContain(pierrot)
    expect(actual).toContain(millette)
  })

  test('it finds 2 grand-parents', () => {
    const actual = sut.findPeopleByRelationship(chloe, 'grandParent')
    expect(actual.length).toBe(2)
    expect(actual).toContain(pierrot)
    expect(actual).toContain(millette)
  })
})
