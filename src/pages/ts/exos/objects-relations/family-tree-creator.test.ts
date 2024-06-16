import { beforeEach, describe, expect, test } from 'vitest'
import { FamilyTreeCreator, FamilyTreeCreatorError } from './family-tree-creator.ts'
import { Person, Physical } from './family-tree.model.ts'
import { createHeight, createWeight } from './units-helpers.ts'

//#region internal test data
let john: Person
let jack: Person
let jim: Person
let jenny: Person
let henry: Person
let mary: Person

function createMembers() {
  const birthdate = new Date(1980, 0, 1)
  const physicals = new Physical(createHeight(1.7), createWeight(51), 'blue')

  john = {
    firstname: 'John',
    lastname: 'Doe',
    gender: 'male',
    birthdate,
    physicals,
    relations: []
  }
  jack = {
    firstname: 'Jack',
    lastname: 'Doe',
    gender: 'male',
    birthdate,
    physicals,
    relations: []
  }
  jim = {
    firstname: 'Jim',
    lastname: 'Doe',
    gender: 'male',
    birthdate,
    physicals,
    relations: []
  }
  jenny = {
    firstname: 'Jenny',
    lastname: 'Doe',
    gender: 'female',
    birthdate,
    physicals,
    relations: []
  }
  henry = {
    firstname: 'Henry',
    lastname: 'Doe',
    gender: 'male',
    birthdate,
    physicals,
    relations: []
  }
  mary = {
    firstname: 'Mary',
    lastname: 'Doe',
    gender: 'female',
    birthdate,
    physicals,
    relations: []
  }
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

// import { FamilyCreator } from './family-creator.ts'
describe('FamilyTreeCreator', () => {
  let sut: FamilyTreeCreator
  let tree: Person[]

  beforeEach(() => {
    createMembers()
    sut = new FamilyTreeCreator(john)
    tree = sut.familyTree
  })

  test('it creates a family tree', () => {
    // Assert
    expect(tree.length).toBe(1)
    expect(tree).toContain(john)
  })

  test('it throws when adding an already existing member', () => {
    expect(() => {
      sut.addMember(john, 'parent', john)
    }).toThrow(FamilyTreeCreatorError)
  })

  test('it throws when adding a relation to an unknown member', () => {
    expect(() => {
      sut.addMember(jack, 'parent', jack)
    }).toThrow(FamilyTreeCreatorError)
  })

  describe(' it add parent', () => {
    test('it succeeds to add a father', () => {
      sut.addMember(henry, 'parent', john)

      expect(tree.length).toBe(2)
      expect(tree).toContain(henry)

      expectParentRelation(henry, john)
    })

    test('it succeeds to add a mother', () => {
      sut.addMember(mary, 'parent', john)

      expect(tree.length).toBe(2)

      expectParentRelation(mary, john, 'Mary to John')
    })

    test('it succeeds to add a father and a mother', () => {
      sut.addMember(henry, 'parent', john)
      sut.addMember(mary, 'parent', john)

      expect(tree.length).toBe(3)

      expectParentRelation(henry, john, 'Henry to John')
      expectParentRelation(mary, john, 'Mary to John')
    })

    test('it cannot add 2 fathers', () => {
      sut.addMember(henry, 'parent', john)

      expect(() => {
        sut.addMember(jim, 'parent', john)
      }).toThrow(FamilyTreeCreatorError)

      expect(tree.length).toBe(2)
    })

    test('it cannot add 2 mothers', () => {
      sut.addMember(mary, 'parent', john)

      expect(() => {
        sut.addMember(jenny, 'parent', john)
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
      sut.addMember(jack, 'child', john)

      expect(tree.length).toBe(2)
      expectChildRelation(jack, john)
    })

    // jack and jenny are john's children
    test('it succeeds to add a son and a daughter', () => {
      sut.addMember(jack, 'child', john)
      sut.addMember(jenny, 'child', john)

      expect(tree.length).toBe(3)
      expectChildRelation(jenny, john)
    })
  })

  describe('it add relation', () => {
    // john is henry's and mary's child
    test('it succeeds to add parents and child', () => {
      sut.addMember(henry, 'parent', john)
      sut.addMember(mary, 'parent', john)

      sut.addMember(jim, 'child', henry)

      expectParentRelation(henry, jim, 'Henry to Jim')
    })

    // john and jim are henry's and mary's children
    test('it succeeds to add a relation to an existing parent', () => {
      sut.addMember(henry, 'parent', john)
      sut.addMember(mary, 'parent', john)
      sut.addMember(jim, 'child', henry)

      sut.addRelationship(jim, 'child', mary)

      expectParentRelation(mary, jim, 'mary to jim')
    })

    // john is henry's and mary's child
    // jim is henry's and jenny's child
    test('it succeeds to add a stepbrother', () => {
      sut.addMember(henry, 'parent', john)
      sut.addMember(mary, 'parent', john)
      sut.addMember(jim, 'child', henry)
      sut.addMember(jenny, 'parent', jim)

      expectParentRelation(henry, john, 'henry to john')
      expectParentRelation(mary, john, 'mary to john')
      expectParentRelation(henry, jim, 'henry to jim')
      expectParentRelation(jenny, jim, 'jenny to jim')
    })
    //
  })
})
