import { Person, Relationship } from './family-tree.model.ts'

export class FamilyTreeCreatorError extends Error {
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
export class FamilyTreeCreator {
  private _tree: Person[]
  constructor(firstMember: Person) {
    this._tree = [firstMember]
  }

  public get familyTree(): Person[] {
    return this._tree
  }

  /**
   * add a new member in the family
   * @param newMember the member to add
   * @param relationship the relationship between new member and existing member
   * @param existingMember the other member which to add the relation
   */
  addMember(newMember: Person, relationship: Relationship, existingMember: Person) {
    // ----- check that the new member does NOT already exist in the family
    const newMemberExist = this.familyTree.some((member) => member === newMember)
    if (newMemberExist) {
      throw new FamilyTreeCreatorError('try to add an existing member', newMember)
    }

    // ----- check that relation is already in the family
    const relationExist = this.familyTree.some((member) => member === existingMember)
    if (!relationExist) {
      throw new FamilyTreeCreatorError('try to add relationship to an unknown member', existingMember)
    }

    // ----- add relationships
    switch (relationship) {
      case 'child':
        this.addParentRelationship(existingMember, newMember)
        break

      case 'parent':
        this.addParentRelationship(newMember, existingMember)
        break

      default:
        throw new FamilyTreeCreatorError('try to add an unknown relationship', newMember, relationship)
    }

    // ----- add member
    this.familyTree.push(newMember)
  }

  /**
   * add a relation from source to target
   * @param source source of the relation
   * @param relationship relation between source and target
   * @param target target of the relation
   */
  addRelationship(source: Person, relationship: Relationship, target: Person) {
    source.relations.push({ relationship, person: target })

    const inverse: Relationship = relationship === 'child' ? 'parent' : 'child'
    target.relations.push({ relationship: inverse, person: source })
  }

  /**
   * add all the relationships between a new parent and one of the existing children
   * @param parent the new parent
   * @param child the existing child
   */
  private addParentRelationship(parent: Person, child: Person) {
    // check that another parent of same gender does not already exist
    const existing = child.relations.find(
      (relation) => relation.relationship === 'child' && relation.person.gender === parent.gender
    )
    if (existing) {
      throw new FamilyTreeCreatorError('try to add a second parent of same gender', parent)
    }

    // add relations between new parent and existing child
    parent.relations.push({ relationship: 'parent', person: child })
    child.relations.push({ relationship: 'child', person: parent })
  }

  display(): string[] {
    const res: string[] = []
    for (const member of this.familyTree) {
      res.push(`${member.firstname} ${member.lastname} ${member.relations.length}`)
    }
    return res
  }
}
