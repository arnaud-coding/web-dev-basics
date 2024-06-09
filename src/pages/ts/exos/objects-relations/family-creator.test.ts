import { beforeEach, describe, expect, test } from 'vitest'
import { FamilyCreator, FamilyCreatorError } from './family-creator.ts'
import { Person, Physical } from './family.model.ts'
import { createHeight, createWeight } from './family-helpers.ts'

// import { FamilyCreator } from './family-creator.ts'
describe.only('FamilyCreator', () => {
  //#region internal test data
  const birthdate = new Date(1980, 0, 1)
  const physicals = new Physical(createHeight(1.7), createWeight(51), 'blue')
  const john: Person = {
    firstname: 'John',
    lastname: 'Doe',
    birthdate,
    physicals,
    relations: []
  }
  const jack: Person = {
    firstname: 'Jack',
    lastname: 'Doe',
    birthdate,
    physicals,
    relations: []
  }
  const jim: Person = {
    firstname: 'Jim',
    lastname: 'Doe',
    birthdate,
    physicals,
    relations: []
  }
  const james: Person = {
    firstname: 'James',
    lastname: 'Doe',
    birthdate,
    physicals,
    relations: []
  }
  //#endregion
  let sut: FamilyCreator
  let family: Person[]

  beforeEach(() => {
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

  describe('addBrother', () => {
    const expectBrotherRelation = (brother1: Person, brother2: Person) => {
      expect(
        brother1.relations.filter((brother) => {
          return brother.relationship === 'brother' && brother.person === brother2
        }).length
      ).toBe(1)

      expect(
        brother2.relations.filter((brother) => {
          return brother.relationship === 'brother' && brother.person === brother1
        }).length
      ).toBe(1)
    }

    test('it succeed to add jack', () => {
      sut.addMember(jack, 'brother', john)

      expect(family.length).toBe(2)
      expect(family).toContain(jack)

      expectBrotherRelation(jim, jack)
    })

    test('it succeed to add jack and jim', () => {
      sut.addMember(jack, 'brother', john)
      sut.addMember(jim, 'brother', john)

      expect(family.length).toBe(3)
      expect(family).toContain(jim)

      expectBrotherRelation(jim, jack)
      expectBrotherRelation(jim, john)
      expectBrotherRelation(john, jack)
    })

    test('it succeed to add jack, jim and james', () => {
      sut.addMember(jack, 'brother', john)
      sut.addMember(jim, 'brother', jack)
      sut.addMember(james, 'brother', jim)

      expect(family.length).toBe(4)
      expect(family).toContain(james)

      expectBrotherRelation(jim, jack)
      expectBrotherRelation(jim, john)
      expectBrotherRelation(jim, james)

      expectBrotherRelation(john, jack)
      expectBrotherRelation(john, james)

      expectBrotherRelation(jack, james)
    })

    test('it throws with already existing member', () => {
      expect(() => {
        sut.addMember(john, 'brother', john)
      }).toThrow(FamilyCreatorError)
    })

    test('it throws with unknown existing member', () => {
      expect(() => {
        sut.addMember(jack, 'brother', jack)
      }).toThrow(FamilyCreatorError)
    })
  })
})

describe.skip('addSister', () => {})
