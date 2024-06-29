import { beforeEach, describe, expect, test } from 'vitest'
import { FamilyTreeCreator, FamilyTreeCreatorError } from './family-tree-creator.ts'
import { Gender, Person } from './family-tree.model.ts'

//#region internal test data
let john: Person
let jack: Person
let jim: Person
let jenny: Person
let henry: Person
let mary: Person

const createMember = (firstname: string, lastname: string, gender: Gender): Person => {
  return new Person(firstname, lastname, gender)
}

function createMembers() {
  john = createMember('John', 'Doe', 'male')
  jack = createMember('Jack', 'Doe', 'male')
  jim = createMember('Jim', 'Doe', 'male')
  jenny = createMember('Jenny', 'Doe', 'female')
  henry = createMember('Henry', 'Doe', 'male')
  mary = createMember('Mary', 'Doe', 'female')
}

const expectParentRelation = (parent: Person, child: Person, message?: string) => {
  const childrenRelations = parent.relations.filter((relation) => {
    return relation.relationship === 'parent' && relation.person === child
  })
  expect(childrenRelations.length, message + ' parent').toBe(1)

  const parentRelations = child.relations.filter((relation) => {
    return relation.relationship === 'child' && relation.person === parent
  })
  expect(parentRelations.length, message + ' child').toBe(1)
}
//#endregion

describe('FamilyTreeCreator', () => {
  let sut: FamilyTreeCreator
  let tree: Person[]

  beforeEach(() => {
    createMembers()
    sut = new FamilyTreeCreator('testFamily', john)
    tree = sut.familyTree.family
  })

  test('it creates a family tree', () => {
    // Assert
    expect(tree.length).toBe(1)
    expect(tree).toContain(john)
  })

  test('it throws when create a family with undefined first member', () => {
    expect(() => {
      new FamilyTreeCreator('Family-error', undefined as unknown as Person)
    }).toThrow(FamilyTreeCreatorError)
  })

  test('it throws when adding an undefined member', () => {
    expect(() => {
      sut.addParent(undefined as unknown as Person, john)
    }).toThrow(FamilyTreeCreatorError)
  })

  test('it throws when adding an already existing member', () => {
    expect(() => {
      sut.addParent(john, john)
    }).toThrow(FamilyTreeCreatorError)
  })

  test('it throws when adding a relation to an unknown member', () => {
    expect(() => {
      sut.addParent(jack, jack)
    }).toThrow(FamilyTreeCreatorError)
  })

  describe(' it add parent', () => {
    test('it succeeds to add a father', () => {
      sut.addParent(henry, john)

      expect(tree.length).toBe(2)
      expect(tree).toContain(henry)

      expectParentRelation(henry, john)
    })

    test('it succeeds to add a mother', () => {
      sut.addParent(mary, john)

      expect(tree.length).toBe(2)

      expectParentRelation(mary, john, 'Mary to John')
    })

    test('it succeeds to add a father and a mother', () => {
      sut.addParent(henry, john)
      sut.addParent(mary, john)

      expect(tree.length).toBe(3)

      expectParentRelation(henry, john, 'Henry to John')
      expectParentRelation(mary, john, 'Mary to John')
    })

    test('it cannot add 2 fathers', () => {
      sut.addParent(henry, john)

      expect(() => {
        sut.addParent(jim, john)
      }).toThrow(FamilyTreeCreatorError)

      expect(tree.length).toBe(2)
    })

    test('it cannot add 2 mothers', () => {
      sut.addParent(mary, john)

      expect(() => {
        sut.addParent(jenny, john)
      }).toThrow(FamilyTreeCreatorError)
    })
  })

  describe('it add child', () => {
    const expectChildRelation = (child: Person, parent: Person, message?: string) => {
      const childrenRelations = parent.relations.filter((relation) => {
        return relation.relationship === 'parent' && relation.person === child
      })
      expect(childrenRelations.length, message + ' parent').toBe(1)

      const parentRelations = child.relations.filter((relation) => {
        return relation.relationship === 'child' && relation.person === parent
      })
      expect(parentRelations.length, message + ' child').toBe(1)
    }

    // jack is the john's child
    test('it succeeds to add a son', () => {
      sut.addChild(jack, john)

      expect(tree.length).toBe(2)
      expectChildRelation(jack, john)
    })

    // jack and jenny are john's children
    test('it succeeds to add a son and a daughter', () => {
      sut.addChild(jack, john)
      sut.addChild(jenny, john)

      expect(tree.length).toBe(3)
      expectChildRelation(jenny, john)
    })
  })

  describe('it add relation', () => {
    // john is henry's and mary's child
    test('it succeeds to add parents and child', () => {
      sut.addParent(henry, john)
      sut.addParent(mary, john)

      sut.addChild(jim, henry)

      expectParentRelation(henry, jim, 'Henry to Jim')
    })

    // john and jim are henry's and mary's children
    test('it succeeds to add a relation to an existing parent', () => {
      sut.addParent(henry, john)
      sut.addParent(mary, john)
      sut.addChild(jim, henry)

      sut.addRelationship(jim, 'child', mary)

      expectParentRelation(mary, jim, 'mary to jim')
    })

    // john is henry's and mary's child
    // jim is henry's and jenny's child
    test('it succeeds to add a stepbrother', () => {
      sut.addParent(henry, john)
      sut.addParent(mary, john)
      sut.addChild(jim, henry)
      sut.addParent(jenny, jim)

      expectParentRelation(henry, john, 'henry to john')
      expectParentRelation(mary, john, 'mary to john')
      expectParentRelation(henry, jim, 'henry to jim')
      expectParentRelation(jenny, jim, 'jenny to jim')
    })
    //
  })
})
