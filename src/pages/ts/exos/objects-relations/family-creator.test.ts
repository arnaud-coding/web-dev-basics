import { beforeEach, describe, expect, test } from 'vitest'
import { FamilyCreator, FamilyCreatorError } from './family-creator.ts'
import { Person, Physical } from './family.model.ts'
import { createHeight, createWeight } from './family-helpers.ts'

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
//#endregion

// import { FamilyCreator } from './family-creator.ts'
describe('FamilyCreator', () => {
  let sut: FamilyCreator
  let family: Person[]

  beforeEach(() => {
    createMembers()
    sut = new FamilyCreator(john)
    family = sut.family
  })

  test('FamilyCreator creates a family', () => {
    // Assert
    expect(family.length).toBe(1)
    expect(family).toContain(john)
  })

  test('it throws when adding an already existing member', () => {
    expect(() => {
      sut.addMember(john, 'sibling', john)
    }).toThrow(FamilyCreatorError)
  })

  test('it throws when adding a relation to an unknown member', () => {
    expect(() => {
      sut.addMember(jack, 'sibling', jack)
    }).toThrow(FamilyCreatorError)
  })

  describe('add sibling', () => {
    const expectSiblingRelation = (sibling1: Person, sibling2: Person) => {
      expect(
        sibling1.relations.filter((relation) => {
          return relation.relationship === 'sibling' && relation.person === sibling2
        }).length
      ).toBe(1)

      expect(
        sibling2.relations.filter((relation) => {
          return relation.relationship === 'sibling' && relation.person === sibling1
        }).length
      ).toBe(1)
    }

    test('it succeed to add jack', () => {
      sut.addMember(jack, 'sibling', john)

      expect(family.length).toBe(2)
      expect(family).toContain(jack)

      expectSiblingRelation(john, jack)
    })

    test('it succeed to add jack and jim', () => {
      sut.addMember(jack, 'sibling', john)
      sut.addMember(jim, 'sibling', john)

      expect(family.length).toBe(3)
      expect(family).toContain(jim)

      expectSiblingRelation(jim, jack)
      expectSiblingRelation(jim, john)
      expectSiblingRelation(john, jack)
    })

    test('it succeed to add jack, jim and jenny', () => {
      sut.addMember(jack, 'sibling', john)
      sut.addMember(jim, 'sibling', jack)
      sut.addMember(jenny, 'sibling', jim)

      expect(family.length).toBe(4)
      expect(family).toContain(jenny)

      expectSiblingRelation(jim, jack)
      expectSiblingRelation(jim, john)
      expectSiblingRelation(jim, jenny)

      expectSiblingRelation(john, jack)
      expectSiblingRelation(john, jenny)

      expectSiblingRelation(jack, jenny)
    })
  })

  describe('add parent', () => {
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

    test('it succeed to add Henry the father', () => {
      sut.addMember(henry, 'parent', john)

      expect(family.length).toBe(2)
      expect(family).toContain(henry)

      expectParentRelation(henry, john)
    })

    test('it succeed to add Henry to john', () => {
      sut.addMember(jenny, 'sibling', john)
      sut.addMember(henry, 'parent', john)

      expect(family.length).toBe(3)

      expectParentRelation(henry, john, 'Henry to John')
      expectParentRelation(henry, jenny, 'Henry to Jenny')
    })

    test('it succeed to add Henry to John and Jenny', () => {
      sut.addMember(henry, 'parent', john)
      sut.addMember(jenny, 'sibling', john)

      expect(family.length).toBe(3)

      expectParentRelation(henry, john, 'Henry to John')
      expectParentRelation(henry, jenny, 'Henry to Jenny')
    })

    test('it succeed to add Henry and Mary', () => {
      sut.addMember(henry, 'parent', john)
      sut.addMember(mary, 'parent', john)
      sut.addMember(jenny, 'sibling', john)

      expect(family.length).toBe(4)

      expectParentRelation(mary, john, 'Henry to John')
      expectParentRelation(mary, jenny, 'Henry to Jenny')
    })
  })
})
