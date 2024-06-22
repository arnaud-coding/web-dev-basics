/**
 * Family type model
 **/

import { ValueUnit } from './units-helpers.ts'
import { LengthtUnit } from './units-helpers.ts'
import { WeightUnit } from './units-helpers.ts'

export type Relationship = 'parent' | 'child'
export type Gender = 'male' | 'female'
export type EyeColor = 'brown' | 'amber' | 'hazel' | 'green' | 'blue'

export class Person {
  public birthdate?: Date
  public deathdate?: Date
  public thumbnail?: Buffer
  public physicals?: Physical
  public readonly relations: Relation[] = []

  constructor(
    private _firstname: string,
    private _lastname: string,
    private _gender: Gender
  ) {}

  public get firstname(): string {
    return this._firstname
  }
  public get lastname(): string {
    return this._lastname
  }
  public get gender(): Gender {
    return this._gender
  }
}

export type Relation = {
  relationship: Relationship
  person: Person
}

/**
 * defines the physical characteristics of a human
 */
export class Physical {
  constructor(
    public height: ValueUnit<LengthtUnit>,
    public weight: ValueUnit<WeightUnit>,
    public eyeColor: EyeColor
  ) {}
}

// todo 2: transforme comme ci-dessous pour pouvoir écrire : john.addChild('joe')

class Member {
  public dob?: Date
  constructor(public firstname: string) {}
}

class MemberCreator extends Member {
  constructor(
    public firstname: string,
    private creator: FamilyCreator
  ) {
    super(firstname)
  }
  addChild(firstname: string) {
    this.creator.addChild(firstname)
  }
}

class FamilyCreator {
  addChild(firstname: string) {
    console.log(firstname)
  }
}

const creator = new FamilyCreator()
const john = new MemberCreator('John', creator)
john.addChild('joe')
