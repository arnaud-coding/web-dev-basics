/**
 * Family type model
 **/

import { ValueUnit } from './units-helpers.ts'
import { LengthtUnit } from './units-helpers.ts'
import { WeightUnit } from './units-helpers.ts'

export type Relationship = 'spouse' | 'parent' | 'child' | 'sibling'
export type Gender = 'male' | 'female'
export type EyeColor = 'brown' | 'amber' | 'hazel' | 'green' | 'blue'
export type Person = {
  // get fullName() {}
  firstname: string
  lastname: string
  birthdate: Date
  deathdate?: Date
  thumbnail?: Buffer
  physicals: Physical
  relations: Relation[]
  gender: Gender
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
