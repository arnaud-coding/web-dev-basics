import '@material/web/button/filled-button.js'
import '@material/web/textfield/outlined-text-field.js'
import '@material/web/list/list.js'
import '@material/web/list/list-item.js'
import { createBertholletTree } from './families/family-sample-1.ts'

/**
 * todo : (voir exemple dans pokemons)
 *
 *  - HTML :
 *    - create list-item template that will display one family member
 *  - JS :
 *    - pour chaque membre :
 *      - cloner le template
 *      - 'mettre' le membre dans le clone
 *      - ajouter le clone à la liste
 */

/**
 * loads the family to display
 */
const loadFamily = () => {
  const family = createBertholletTree().family
  console.log(`loaded family ${createBertholletTree().name}, contains ${family.length} members`)
  return family
}

const displayFamily = () => {
  for (const member of family) {
    console.log(`todo: display ${member.firstname}`)
  }
}

const family = loadFamily()
displayFamily()
