import { fetchPokemons } from './pokemon-api'
import { PokemonInspector } from './pokemon-inspector'

const pokemonTableBodyElement = document.getElementById("pokemon-tbody")

/** Tableau de pokemons chargés en mémoire */
const pokemons = await fetchPokemons()

/** l'inspecteur pour manipuler les pokemons */
const inspector = new PokemonInspector(pokemons)

// remplit la boite de séléction du filtre génération
setGenerationsFilter(inspector.getGenerationsNumber())

createPokemonTable()

// ajout gestionnaires d'évènement
let nameFilter = ""
const nameFilterElement = document.getElementById("name-filter")
if (nameFilterElement instanceof HTMLInputElement) {
  nameFilterElement.addEventListener("input", ()=>{
    // cette fonction anonyme est appelée à chaque nouveau caractère tapé dans le filtre : on récupère le filtre
    nameFilter = nameFilterElement.value
    filterPokemons()
  })
}

let generationFilter = 0
const generationFilterElement = document.getElementById("generation-filter")
if (generationFilterElement instanceof HTMLSelectElement) {
  generationFilterElement.addEventListener("input", ()=>{
    generationFilter = generationFilterElement.selectedIndex
    filterPokemons()
  })
}

// ----------------------------------------------------------------------------
// Private functions
// ----------------------------------------------------------------------------

function createPokemonTable() {
  // parcours le tableau mémoire des pokémons pour les afficher dans le tableau HTML
  for (const pokemon of pokemons) {
    // filtrer les pokemon bug
    if (pokemon.types === null){
      continue
    }

    // ajouter le pokémon courant dans une nouvelle ligne du tableau HTML
    addPokemonRow(pokemon)
  }
}

/**
 * ajoute un pokemon dans le tableau HTML
 * @param {Pokemon} pokemon
 */
function addPokemonRow(pokemon) {
  // créer ligne tableau html
  const row = cloneTemplate("pokemon-row-template")
  if (row instanceof HTMLTableRowElement) {

    // placer les données du pokemon courant dans la ligne
    setPokemonRow(pokemon, row)

    // ajouter ligne
    addRowTemplate(row)
  }

}

/**
 * clone le premier enfant du template dont on donne l'id
 * @param {string} templateId
 * @returns
 */
function cloneTemplate(templateId) {
  const rowTemplate = document.getElementById(templateId)

  // code qui marche, plus rapide mais pas tres propre :
  // return rowTemplate?.content?.firstElementChild

  if (rowTemplate instanceof HTMLTemplateElement) {
    const fragment = rowTemplate.content
    if (fragment instanceof DocumentFragment) {
      const child = fragment.firstElementChild
      if (child instanceof HTMLElement) {
        const clone = child.cloneNode(true)
        if (clone instanceof HTMLElement) {
          return clone
        }
      }
    }
  }

  console.error(`template ${templateId} not found`)
  return null
}

/**
 * place les détails du pokemon courant dans la ligne html donnée
 * @param {Pokemon} pokemon
 * @param {HTMLTableRowElement} row la ligne html où mettre les données du pokemon
 */
function setPokemonRow(pokemon, row) {
  const cells = row.getElementsByTagName("td")
  if (cells instanceof HTMLCollection && cells.length > 1) {

    const setCellValue = (cellIndex, value) => {
      const cell = cells[cellIndex]
      if(cell instanceof HTMLTableCellElement) {
        cell.innerText = value
      }
    }
    setCellValue(0, pokemon.name.fr)
    setCellValue(1, pokemon.category)
    setCellValue(2, pokemon.generation)
    setCellValue(3,inspector.getTypesDescription(pokemon.types))
    setCellValue(4, inspector.getEvolutionsDescription(pokemon.evolution))
  }
}

/**
 * ajoute une ligne dans le tableau html des pokemons
 * @param {HTMLTableRowElement} row
 */
function addRowTemplate(row) {
  if (pokemonTableBodyElement !== null) {
    pokemonTableBodyElement.appendChild(row)
  }
}

/**
 * cache les lignes du tableau de pokemons en fonction du flitre
 */
function filterPokemons() {
  /**
   * algoritme :
   *  - parcourir chaque ligne du tableau
   *  - pour chaque ligne :
   *    - récupérer le nom du pokemon depuis son <td>
   *    - vérifier si le nom contient le filtre
   *    - montrer/cacher la ligne
   */

  // parcours chaque ligne du tableau
  const rows = pokemonTableBodyElement?.getElementsByTagName("tr")
  if (rows instanceof HTMLCollection && rows.length > 1) {
    for (const row of rows) {

      // récupère toutes les cellules de la ligne
      const cells = row.getElementsByTagName("td")
      if (cells instanceof HTMLCollection && cells.length > 1) {

        // vérifier si nom contient filtre
        let hasNameFilter = true
        const name = cells[0].textContent
        if (typeof name === 'string') {
          hasNameFilter = name.toUpperCase().includes(nameFilter.toUpperCase())
        }

        // vérifier si generation correspon au filtre
        let hasGenerationFilter = true
        const generation = cells[2].textContent
        if (typeof generation === 'string') {
          hasGenerationFilter = generationFilter === 0 || generationFilter.toString() === generation
        }

        // montrer/cacher la ligne
        row.style.display = (hasNameFilter && hasGenerationFilter) ? "" : "none"
      }

    }
  }

}

/**
 * ajoute les générations dans <select>
 * @param {number} generations le nombre de générations
 */
function setGenerationsFilter(generations) {
  for (let generation = 1; generation <= generations; generation++) {
    // ------ Créer une nouvelle <option>
    //    - trouver le <template> et  cloner l'<option>
    const option = cloneTemplate("generation-option-template")

    //    - mettre à jour les valeurs du clone
    if (option instanceof HTMLOptionElement) {
      option.value = generation.toString()
      option.innerText = generation.toString()

      // ----- ajouter l' <option> à <select>
      const filter = document.getElementById("generation-filter")
      if (filter instanceof HTMLSelectElement) {
        filter.appendChild(option)
      }
    }
  }
}