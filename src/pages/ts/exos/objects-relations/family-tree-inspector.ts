import { Person, Relationship } from './family-tree.model.ts'

export type FamilyRelationShip = Relationship | 'sibling' | 'uncle-aunt' | 'nephew-niece' | 'cousin' | 'grandParent'

/**
 * allow to inspect family (find brother...)
 */
export class FamilyTreeInspector {
  /**
   * find all relations for a given person
   * @param person the person whose family relationships we are looking for
   * @param relation the searched relation
   * @returns an array of persons
   */
  findPeopleByRelationship(person: Person, relation: FamilyRelationShip): Person[] {
    switch (relation) {
      case 'sibling':
        return this.findSiblings(person)

      case 'uncle-aunt':
        return this.findUnclesAunts(person)

      case 'nephew-niece':
        return this.findNephewsNieces(person)

      case 'cousin':
        return this.findCousins(person)

      case 'grandParent':
        return this.findGrandParents(person)

      default:
        throw new Error(`Not implemented: ${relation}`)
    }
  }

  findGrandParents(person: Person): Person[] {
    const res: Person[] = []
    const parents = this.findPeople(person, 'child')
    for (const parent of parents) {
      const grandParents = this.findPeople(parent, 'child')
      res.push(...grandParents)
    }
    return res
  }

  findCousins(person: Person): Person[] {
    const res: Person[] = []
    // find uncles-aunts
    const uncles = this.findUnclesAunts(person)

    // for each uncles-aunts, find children
    for (const uncle of uncles) {
      const children = this.findPeople(uncle, 'parent')
      res.push(...children)
    }

    // add found children to result
    return res
  }

  findNephewsNieces(person: Person): Person[] {
    const res: Person[] = []
    // find siblings
    const siblings = this.findSiblings(person)

    // for each sibling, find children
    for (const sibling of siblings) {
      const children = this.findPeople(sibling, 'parent')
      // add children to result
      res.push(...children)
    }

    return res
  }

  findUnclesAunts(person: Person): Person[] {
    const res: Person[] = []
    // ----- find parents
    const parents = this.findPeople(person, 'child')
    // ----- for each parent, find siblings
    for (const parent of parents) {
      const siblings = this.findSiblings(parent)
      res.push(...siblings)
    }
    return res
  }

  findSiblings(person: Person): Person[] {
    // ----- find parents
    const parents = this.findPeople(person, 'child')

    // ----- for each parent, find children
    const children: Person[] = []
    for (const parent of parents) {
      const kids = this.findPeople(parent, 'parent')

        // ----- filter to remove the sibling and the already found sibling
        .filter((kid) => {
          // ----- remove given person
          if (kid === person) {
            return false
          }

          // ----- remove already found sibling
          return !children.some((child) => child === kid)
        })

      // ----- add found kids to result (=children)
      children.push(...kids)
    }
    return children
  }

  private findPeople(person: Person, relationship: Relationship): Person[] {
    return person.relations
      .filter((relation) => relation.relationship === relationship)
      .map((relation) => relation.person)
  }
}
