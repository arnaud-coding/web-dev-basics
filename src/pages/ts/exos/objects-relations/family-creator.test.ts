import { beforeEach, describe, expect, test } from 'vitest'
import { FamilyCreator, FamilyCreatorError } from './family-creator.ts'
import { Person, Physical } from './family.model.ts'
import { createHeight, createWeight } from './family-helpers.ts'

//#region internal test data
let john: Person
let jack: Person
let jim: Person
let jenny: Person
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
}
//#endregion

// import { FamilyCreator } from './family-creator.ts'
describe.only('FamilyCreator', () => {
  let sut: FamilyCreator
  let family: Person[]

  beforeEach(() => {
    createMembers()
    sut = new FamilyCreator(john)
    family = sut.family
  })

  test('creates a familyCreator', () => {
    //Assert
    expect(sut).toBeInstanceOf(FamilyCreator)
  })

  test('FamilyCreator creates a family', () => {
    // Assert
    expect(family.length).toBe(1)
    expect(family).toContain(john)
  })

  describe('addSibling', () => {
    const expectSiblingRelation = (sibling1: Person, sibling2: Person) => {
      expect(
        sibling1.relations.filter((sibling) => {
          return sibling.relationship === 'sibling' && sibling.person === sibling2
        }).length
      ).toBe(1)

      expect(
        sibling2.relations.filter((sibling) => {
          return sibling.relationship === 'sibling' && sibling.person === sibling1
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

    test('it throws with already existing member', () => {
      expect(() => {
        sut.addMember(john, 'sibling', john)
      }).toThrow(FamilyCreatorError)
    })

    test('it throws with unknown existing member', () => {
      expect(() => {
        sut.addMember(jack, 'sibling', jack)
      }).toThrow(FamilyCreatorError)
    })
  })
})
