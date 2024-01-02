import { fetchPokemons } from './pokemon-api'
import { PokemonInspector } from './pokemon-inspector'

const TABLE_COL_NAME = 0
const TABLE_COL_CATEGORY = 1
const TABLE_COL_GENERATION = 2
const TABLE_COL_TYPES = 3
const TABLE_COL_EVOLUTIONS = 4

const pokemonTableBodyElement = document.getElementById("pokemon-tbody")

/** Tableau de pokemons chargés en mémoire */
const pokemons = await fetchPokemons()

/** l'inspecteur pour manipuler les pokemons */
const inspector = new PokemonInspector(pokemons)

// remplit la boite de séléction du filtre génération
setGenerationsFilter(inspector.getGenerationsNumber())

createPokemonTable()

// ----------------------------------------------------------------------------
// ajout gestionnaires d'évènement pour tous les filtres
// ----------------------------------------------------------------------------

// gestionnaire d'évènement pour filtre sur les noms
let nameFilter = ""
const nameFilterElement = document.getElementById("name-filter")
if (nameFilterElement instanceof HTMLInputElement) {
  nameFilterElement.addEventListener("input", ()=>{
    // cette fonction anonyme est appelée à chaque nouveau caractère tapé dans le filtre : on récupère le filtre
    nameFilter = nameFilterElement.value.toUpperCase()
    filterPokemons()
  })
}

// gestionnaire d'évènement pour filtre sur les gnérations
let generationFilter = 0
const generationFilterElement = document.getElementById("generation-filter")
if (generationFilterElement instanceof HTMLSelectElement) {
  generationFilterElement.addEventListener("input", () => {
    generationFilter = generationFilterElement.selectedIndex
    filterPokemons()
  })
}

// gestionnaire d'évènement pour filtre sur les types
let typesFilter = ""
const typesFilterElement = document.getElementById("types-filter")
if (typesFilterElement instanceof HTMLInputElement) {
  typesFilterElement.addEventListener("input", () => {
    typesFilter = typesFilterElement.value.toUpperCase()
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
    setCellValue(TABLE_COL_NAME, pokemon.name.fr)
    setCellValue(TABLE_COL_CATEGORY, pokemon.category)
    setCellValue(TABLE_COL_GENERATION, pokemon.generation)
    setCellValue(TABLE_COL_TYPES,inspector.getTypesDescription(pokemon.types))
    setCellValue(TABLE_COL_EVOLUTIONS, inspector.getEvolutionsDescription(pokemon.evolution))
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

  // ---------- parcours chaque ligne du tableau
  const rows = pokemonTableBodyElement?.getElementsByTagName("tr")  // récupère toutes les lignes du tableau
  if (rows instanceof HTMLCollection && rows.length > 1) {          // si des lignes existent...
    for (const row of rows) {                                       // parcours toutes les lignes une à une...

      // ----- récupère toutes les cellules de la ligne courante
      const cells = row.getElementsByTagName("td")
      if (cells instanceof HTMLCollection && cells.length > 1) {

        // ----- vérifier si nom contient filtre de nom
        let matchNameFilter = true
        const name = cells[TABLE_COL_NAME].textContent
        if (typeof name === 'string') {
          matchNameFilter = name.toUpperCase().includes(nameFilter)
        }

        // -----vérifier si generation correspond au filtre de generation
        let matchGenerationFilter = true
        const generation = cells[TABLE_COL_GENERATION].textContent
        if (typeof generation === 'string') {
          matchGenerationFilter = generationFilter === 0 || generationFilter.toString() === generation
        }

        // -----vérifier si types correspond au filtre de types
        let matchTypesFilter = true
        const types = cells[TABLE_COL_TYPES].textContent
        if (typeof types === 'string') {
          matchTypesFilter = types.toUpperCase().includes(typesFilter)
        }

        // montrer/cacher la ligne courante
        row.style.display = (matchNameFilter && matchGenerationFilter && matchTypesFilter) ? "" : "none"
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