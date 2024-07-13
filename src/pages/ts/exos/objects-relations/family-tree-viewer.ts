import '@material/web/button/filled-button.js'
import '@material/web/textfield/outlined-text-field.js'
import '@material/web/list/list.js'
import '@material/web/list/list-item.js'
import '@material/web/icon/icon.js'
import { createBertholletTree } from './families/family-sample-1.ts'
import { indexOfLine } from 'bun'
import { MdList } from '@material/web/list/list.js'
import { Person } from './family-tree.model.ts'
import { MdListItem } from '@material/web/list/list-item.js'

/**
 * todo : (voir exemple dans pokemons)
 *
 * 1) afficher tous les membres de la famille
 *    1.1) OK charger la famille
 *    1.2) WIP trouver quels éléments pour afficher
 *         - utlisation des list (https://github.com/material-components/material-web/blob/main/docs/components/list.md)
 *    1.3) afficher chaque membre
 *
 * 2) filtrer les membres par prénom ou par nom
 *    - utiliser les <chips> pour filtrer par nom des familles
 *
 * 3) afficher les relations du membre sélectionné
 *    - utiliser les <cards> pour afficher les relations
 *
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
  const sorted = family.sort((a, b) => a.firstname.localeCompare(b.firstname))
  for (const member of sorted) {
    // ----- clone the member list item  template
    const clone = cloneTemplate('member-list-item-template')
    if (clone === null) {
      continue
    }

    // ----- set the clone properties to member values
    setMemberProperties(clone, member)

    // ----- add the clone to the family list
    if (clone) {
      addClone(clone)
    }
  }
}

/**
 * clone le premier enfant du template dont on donne l'id
 * @param {string} id id of the template to clone
 * @returns the clone
 */
function cloneTemplate(id: string): MdListItem | null {
  const template = document.getElementById(id)

  if (template instanceof HTMLTemplateElement) {
    const fragment = template.content
    if (fragment instanceof DocumentFragment) {
      const child = fragment.firstElementChild
      if (child instanceof HTMLElement) {
        const clone = child.cloneNode(true)
        if (clone.nodeName === 'MD-LIST-ITEM') {
          return clone as MdListItem
        }
      }
    }
  }

  console.error(`template ${id} not found`)
  return null
}

function addClone(clone: HTMLElement) {
  if (list instanceof MdList) {
    list.appendChild(clone)
  }
}

function setMemberProperties(item: MdListItem, member: Person) {
  // set names
  const child = item.firstChild
  if (child) {
    child.textContent = `${member.firstname} ${member.lastname.toUpperCase()}`
  }

  // set icons
  const el = item.firstElementChild
  if (el && member.gender === 'female') {
    el.innerHTML = 'Female'
  }

  // set members description
  const ch = item.lastChild
  console.log('setMemberProperties ~ ch:', ch)
  const ele = item.lastElementChild
  if (ele instanceof HTMLDivElement) {
    ele.innerText = getMemberDescription(member)
  }
  console.log('setMemberProperties ~ ele:', ele)
}

function getMemberDescription(member: Person) {
  let desc = ''

  // age if exist
  if (member.birthdate) {
    const diff = Date.now() - member.birthdate.getTime()
    const age = new Date(diff).getFullYear() - 1970
    desc += `${age} y.o.`
  }

  // height if exist
  const height = member.physicals?.height
  if (height) {
    desc += `, ${height.value}`
  }

  return desc
}
// ********************************** start ***********************************
const lists = document.getElementsByTagName('md-list')
const list = lists[0]
const family = loadFamily()
displayFamily()
