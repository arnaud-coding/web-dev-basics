import { P } from 'vitest/dist/reporters-yx5ZTtEV.js'
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
      case 'sibling':
        this.addSiblingRelationships(newMember, existingMember)
        break

      case 'child':
        throw new Error('not implemented')
        break

      case 'parent':
        this.addParentRelationships(newMember, existingMember)
        break

      case 'spouse':
        throw new Error('not implemented')
        break

      default:
        throw new FamilyCreatorError('try to add an unknown relationship', newMember, relationship)
    }
  }

  /**
   * find all members that have a given relationship with an existing member
   * ex.: Search all siblings of a given member, search parent of a given member, ...
   * @param existingMember the existing member which to search the relationships
   * @param relationship the relationship to find
   * @returns the find members, that may include the existing member
   */
  private findMembersByRelationship(existingMember: Person, relationship: Relationship): Person[] {
    return this.family.filter((member) => {
      // check if the source member must be added to the list of found relations=ships
      if (relationship === 'sibling' || relationship === 'spouse') {
        if (member === existingMember) return true
      }

      // return true if the current member is a sibling of the given existing sibling
      return member.relations.some(
        (relation) => relation.relationship === relationship && relation.person === existingMember
      )
    })
  }

  /**
   * add all the relationships between a new sibling and one of the existing member(s)
   * @param newSibling the sibling to add
   * @param existingSibling the existing sibling which to add the new sibling
   */
  private addSiblingRelationships(newSibling: Person, existingSibling: Person) {
    // ---------- add relations between new and existing siblings
    newSibling.relations.push({ relationship: 'sibling', person: existingSibling })
    existingSibling.relations.push({ relationship: 'sibling', person: newSibling })

    // retrieve all existing siblings of the existing sibling
    const foundSiblings = this.findMembersByRelationship(existingSibling, 'sibling')

    // add relationships between all siblings
    for (const sibling of foundSiblings) {
      if (sibling === newSibling || sibling === existingSibling) {
        continue
      }

      //add new sibling to all existing siblings
      sibling.relations.push({ relationship: 'sibling', person: newSibling })

      // add existing siblings to new sibling
      newSibling.relations.push({ relationship: 'sibling', person: sibling })
    }

    // ---------- find parents
    // 1.) find one sibling
    const otherSibling = foundSiblings.find((sibling) => sibling !== newSibling)

    // 2.) ----- copy otherSibling parent relationships
    if (otherSibling !== undefined) {
      // 2.1) find otherSibling parent relationships
      const relations = otherSibling.relations.filter((relation) => relation.relationship === 'child')
      // 2.2) copy
      for (const relation of relations) {
        newSibling.relations.push({ relationship: 'child', person: relation.person })
        relation.person.relations.push({ relationship: 'parent', person: newSibling })
      }
    }

    // add child to parents
    //todo
    // add parent to added sibling
    //todo
  }

  /**
   * add all the relationships between a new parent and one of the existing children
   * @param parent the new parent
   * @param child the existing child
   */
  private addParentRelationships(parent: Person, child: Person) {
    // add relations between new parent and existing child
    parent.relations.push({ relationship: 'parent', person: child })
    child.relations.push({ relationship: 'child', person: parent })

    // retrieve all existing siblings of the existing child
    const foundSiblings = this.findMembersByRelationship(child, 'sibling')

    // add relationships between new parent and existing children
    for (const sibling of foundSiblings) {
      if (sibling === child) {
        continue
      }

      //add new sibling to all existing siblings
      sibling.relations.push({ relationship: 'child', person: parent })

      // add existing siblings to new sibling
      parent.relations.push({ relationship: 'parent', person: sibling })
    }
  }

  display(): string[] {
    const res: string[] = []
    for (const member of this.family) {
      res.push(`${member.firstname} ${member.lastname} ${member.relations.length}`)
    }
    return res
  }
}
