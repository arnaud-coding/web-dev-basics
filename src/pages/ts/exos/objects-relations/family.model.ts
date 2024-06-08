/**
 * Family type model
 **/

type Relationship = 'spouse' | 'father' | 'mother' | 'son' | 'daughter' | 'brother' | 'sister'
type EyeColor = 'brown' | 'amber' | 'hazel' | 'green' | 'blue'
type WeightUnit = 'kg' | 'lb' | 'oz'
type LengthtUnit = 'm' | 'in' | 'ft' | 'yd'
type UnitConstraint = LengthtUnit | WeightUnit

type Person = {
  // get fullName() {}
  firstname: string
  lastname: string
  birthdate: Date
  deathdate?: Date
  thumbnail?: Buffer
  physicals: Physical
  relations: Relation[]
}

type Relation = {
  relationship: Relationship
  person: Person
}

/**
 * defines the physical characteristics of a human
 */
class Physical {
  constructor(
    public height: ValueUnit<LengthtUnit>,
    public weight: ValueUnit<WeightUnit>,
    public eyeColor: EyeColor
  ) {}
}

/**
 * classe générique pour les unités de mesure
 */
class ValueUnit<T extends UnitConstraint> {
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

/** returns a height in 'kg' */
function createWeight(weight: number): ValueUnit<WeightUnit> {
  if (weight < 1 || weight > 700) {
    throw new RangeError('weight must be 1..700 ')
  }

  return new ValueUnit<WeightUnit>(weight, 'kg')
}

/** returns a weight in 'm' */
function createHeight(height: number): ValueUnit<LengthtUnit> {
  if (height < 0.4 || height > 2.8) {
    throw new RangeError('height must be 0,4..2,8 ')
  }

  return new ValueUnit<LengthtUnit>(height, 'm')
}

/** utility object : manipulates a family (add members...) */
class FamilyCreator {
  private family: Person[]
  constructor(firstMember: Person) {
    this.family = [firstMember]
  }

  /**
   * add a new member in the family
   * @param newMember the member to add
   * @param relationship the relationship with an other member of the family
   * @param existingMember the other member which to add the relation
   */
  addMember(newMember: Person, relationship: Relationship, existingMember: Person) {
    // ----- check that the new member does NOT already exist in the family
    const newMemberExist = this.family.some((member) => member === newMember)
    if (newMemberExist) {
      throw new FamilyCreatorError('try to add an existing member', newMember)
    }

    // ----- check that relation is already in the family
    const relationExist = this.family.some((member) => member === existingMember)
    if (!relationExist) {
      throw new FamilyCreatorError('try to add relationship to an unknown member', existingMember)
    }

    // ----- add member
    this.family.push(newMember)

    // ----- add relationships
    switch (relationship) {
      case 'brother':
        this.addBrotherRelationships(newMember, existingMember)
        break

      case 'daughter':
        this.addDaughterRelationships(newMember, existingMember)
        break

      // case 'father':
      //   break

      // case 'mother':
      //   break

      // case 'sister':
      //   break

      // case 'son':
      //   break

      // case 'spouse':
      //   break

      default:
        throw new FamilyCreatorError('try to add an unknown relationship', newMember, relationship)
    }
  }

  /**
   * find all members that have a given relationship with an existing member
   * ex.: Search all brothers of a given member, search father of a given member, ...
   * @param existingMember the existing member which to search the relationships
   * @param relationship the relationship to find
   * @returns the find members, that may include the existing member
   */
  private findMembersByRelationship(existingMember: Person, relationship: Relationship): Person[] {
    return this.family.filter((member) => {
      // check if the source member must be added to the list of found relations=ships
      if (relationship === 'brother' || relationship === 'sister' || relationship === 'spouse') {
        if (member === existingMember) return true
      }

      // return true if the current member is a brother of the given existing brother
      return member.relations.some(
        (relation) => relation.relationship === relationship && relation.person === existingMember
      )
    })
  }

  /**
   * add all the relationships between a new brother and one of the existing member(s)
   * @param newBrother
   * @param existingMember
   */
  private addBrotherRelationships(newBrother: Person, existingMember: Person) {
    // retrieve all existing brothers of the existing brother
    const foundBrothers = this.findMembersByRelationship(existingMember, 'brother')

    // add relationships between all brothers
    for (const brother of foundBrothers) {
      //add new brother to all existing brothers
      brother.relations.push({ relationship: 'brother', person: newBrother })

      // add existing brothers to new brother
      newBrother.relations.push({ relationship: 'brother', person: brother })
    }

    // todo sisters

    // find mother and father
    //todo
    // add son to parents
    //todo
    // add parent to added brother
    //todo
  }

  addDaughterRelationships(newDaughter: Person, existingDaughter: Person) {
    throw new Error('Method addDaughterRelationships not implemented.')
  }

  display(): string[] {
    const res: string[] = []
    for (const member of this.family) {
      res.push(`${member.firstname} ${member.lastname} ${member.relations.length}`)
    }
    return res
  }
}

class FamilyCreatorError extends Error {
  constructor(
    message: string,
    public member: Person,
    public relationship?: Relationship
  ) {
    super(message)
    this.name = 'FamilyCreatorError'
    this.stack = `${this.message}\n${new Error().stack}`
  }
}

// -------------------------------------
// temporary try
// -------------------------------------

const arnaud: Person = {
  firstname: 'Arnaud',
  lastname: 'Berthollet',
  birthdate: new Date(1995, 7, 22),
  physicals: new Physical(createHeight(1.7), createWeight(51), 'blue'),
  relations: []
}

const thomas: Person = {
  firstname: 'Thomas',
  lastname: 'Berthollet',
  birthdate: new Date(1994, 8, 25),
  physicals: new Physical(createHeight(1.75), createWeight(60), 'brown'),
  relations: []
}

const fakeBro: Person = {
  firstname: 'Bob',
  lastname: 'Berthollet',
  birthdate: new Date(1997, 11, 31),
  physicals: new Physical(createHeight(1.75), createWeight(60), 'brown'),
  relations: []
}

const creator = new FamilyCreator(arnaud)
let s = creator.display()
s

try {
  creator.addMember(thomas, 'brother', arnaud)
  s = creator.display()
  s

  creator.addMember(fakeBro, 'brother', arnaud)
  s = creator.display()
  s
} catch (error) {
  if (error instanceof FamilyCreatorError) {
    console.error(`Error while adding relationship : ${error.message}`, error.member, error.relationship)
  } else {
    console.error(error)
  }
}
