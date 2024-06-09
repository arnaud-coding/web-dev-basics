import { Person, Relationship } from './family.model.ts'

export class FamilyCreatorError extends Error {
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

/** utility object : manipulates a family (add members...) */
export class FamilyCreator {
  private _family: Person[]
  constructor(firstMember: Person) {
    this._family = [firstMember]
  }

  public get family(): Person[] {
    return this._family
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
   * @param newBrother the brother to add
   * @param existingBrother the existing brother which to add the new brother
   */
  private addBrotherRelationships(newBrother: Person, existingBrother: Person) {
    // add relations between new and existing brothers
    newBrother.relations.push({ relationship: 'brother', person: existingBrother })
    existingBrother.relations.push({ relationship: 'brother', person: newBrother })

    // retrieve all existing brothers of the existing brother
    const foundBrothers = this.findMembersByRelationship(existingBrother, 'brother')

    // add relationships between all brothers
    for (const brother of foundBrothers) {
      if (brother === newBrother || brother === existingBrother) {
        continue
      }

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

  private addDaughterRelationships(newDaughter: Person, existingDaughter: Person) {
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
