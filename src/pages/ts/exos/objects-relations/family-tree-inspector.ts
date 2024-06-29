import { FamilyTree, Person, Relationship } from './family-tree.model.ts'

export type FamilyRelationShip = Relationship | 'sibling' | 'uncle-aunt' | 'nephew-niece' | 'cousin' | 'grandParent'

/**
 * allow to inspect family (find brother...)
 */
export class FamilyTreeInspector {
  constructor(private familyTree: FamilyTree) {}

  /**
   * find all relations for a given person
   * @param person the person whose family relationships we are looking for
   * @param relations the searched relation(s)
   * @returns an array of persons
   */
  findPeopleByRelationships(person: Person, relations: FamilyRelationShip | FamilyRelationShip[]): Person[] {
    if (Array.isArray(relations)) {
      // relations is an array of relationships
      const res: Person[] = []
      for (const relation of relations) {
        const people = this.findPeopleByRelationship(person, relation)
        res.push(...people)
      }
      return res
    } else {
      // relations is a single relationship
      return this.findPeopleByRelationship(person, relations)
    }
  }

  /**
   * find all relations for a given person
   * @param person the person whose family relationships we are looking for
   * @param relation the searched relation
   * @returns an array of persons
   */
  private findPeopleByRelationship(person: Person, relation: FamilyRelationShip): Person[] {
    switch (relation) {
      case 'sibling':
        return this.findSiblings(person)

      default:
        break
    }
    return []
  }

  findSiblings(sibling: Person): Person[] {
    // ajouter les enfants au resultat
    //    sauf si enfant = person
    //    sauf si enfant déja ajouté au résultat

    // ----- trouver les parents
    const parents = this.findPeople(sibling, 'parent')

    // ----- pour chaque parent, trouver les enfants
    const children: Person[] = []
    for (const parent of parents) {
      const kids = this.findPeople(parent, 'child')
      console.log('FamilyTreeInspector ~ findSiblings ~ kids:', parent, kids)
    }
    return []
  }

  findPeople(person: Person, relationship: Relationship): Person[] {
    return person.relations
      .filter((relation) => relation.relationship === relationship)
      .map((relation) => relation.person)
  }
}
