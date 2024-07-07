import { beforeEach, describe, expect, test } from 'vitest'
import { Person, Relation } from './family-tree.model.ts'
import { FamilyTreeInspector } from './family-tree-inspector.ts'
import {
  createBertholletTree,
  pierrot,
  arnaud,
  thomas,
  agnes,
  loic,
  herve,
  xavier,
  philippe,
  romain,
  anthony,
  clement,
  julien,
  chloe,
  annah,
  annick,
  jo,
  millette
} from './families/family-sample-1.ts'

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
