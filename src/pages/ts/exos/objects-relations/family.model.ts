/**
 * Family type model
 **/

export type Relationship = 'spouse' | 'parent' | 'child' | 'sibling'
export type WeightUnit = 'kg' | 'lb' | 'oz'
export type LengthtUnit = 'm' | 'in' | 'ft' | 'yd'
export type Gender = 'male' | 'female'
export type EyeColor = 'brown' | 'amber' | 'hazel' | 'green' | 'blue'
export type UnitConstraint = LengthtUnit | WeightUnit

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

/**
 * classe générique pour les unités de mesure
 */
export class ValueUnit<T extends UnitConstraint> {
  /**
   * Creates an instance of the Unit
   * @param _value numerical value
   * @param _unit unit type
   */
  constructor(
    private _value: number,
    private _unit: T
  ) {}

  /** return a description of value and unit. ex: '45 kg' */
  get value(): string {
    return `${this._value} ${this.unit}`
  }

  /** return the unit type. ex: 'kg' */
  get unit(): T {
    return this._unit
  }
}
