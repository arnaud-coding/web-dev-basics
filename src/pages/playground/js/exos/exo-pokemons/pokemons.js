/**
 * ================================================================================================
 * Exo :
 * -------------------------------------------------------------------------------------
 * Plan :
 *    -
 *    -
 *    -
 * ================================================================================================
 */

import { fetchPokemons } from './pokemon-api'
import { PokemonInspector } from './pokemon-inspector'

/** Pokemon table: column index for the name */
const TABLE_COL_NAME = 0
/** Pokemon table: column index for the category */
const TABLE_COL_CATEGORY = 1
/** Pokemon table: column index for the generation */
const TABLE_COL_GENERATION = 2
/** Pokemon table: column index for the types */
const TABLE_COL_TYPES = 3
/** Pokemon table: column index for the evolutions */
const TABLE_COL_EVOLUTIONS = 4

// Charge les pokemons
const pokemons = await fetchPokemons()

// l'inspecteur pour manipuler les pokemons
const inspector = new PokemonInspector(pokemons)

// remplit la boite de sélection du filtre génération
setGenerationsFilterElements(inspector.getGenerationsNumber())

// Crée le tableau des pokemons
const tableBodyElement = document.getElementById('pokemon-tbody')
createPokemonTable()

//#region filters

// ----------------------------------------------------------------------------
// ajout gestionnaires d'évènement pour tous les filtres
// ----------------------------------------------------------------------------

// gestionnaire d'évènement pour filtre sur les noms
let nameFilter = ''
const nameFilterElement = document.getElementById('name-filter')
if (nameFilterElement instanceof HTMLInputElement) {
  nameFilterElement.addEventListener('input', () => {
    // cette fonction anonyme est appelée à chaque nouveau caractère tapé dans le filtre : on récupère le filtre
    nameFilter = nameFilterElement.value.toUpperCase()
    filterPokemons()
  })
}

// gestionnaire d'évènement pour filtre sur les gnérations
let generationFilter = 0
const generationFilterElement = document.getElementById('generation-filter')
if (generationFilterElement instanceof HTMLSelectElement) {
  generationFilterElement.addEventListener('input', () => {
    generationFilter = generationFilterElement.selectedIndex
    filterPokemons()
  })
}

// gestionnaire d'évènement pour filtre sur les types
let typesFilter = ''
const typesFilterElement = document.getElementById('types-filter')
if (typesFilterElement instanceof HTMLInputElement) {
  typesFilterElement.addEventListener('input', () => {
    typesFilter = typesFilterElement.value.toUpperCase()
    filterPokemons()
  })
}

/** @type {HTMLTableRowElement | null} */
let selectedRow = null

// gestionnaire d'évènement pour la sélection
if (tableBodyElement instanceof HTMLTableSectionElement) {
  // // sélectionne le premier pokémon au chargement de la page
  // setTimeout(() => {
  //   showPokemonDetails('Bulbizarre')
  // }, 500)

  tableBodyElement.addEventListener('click', (event) => {
    // récupère la cellule (nom, catégorie, types...) sur laquelle le client a cliqué
    const td = event.target
    if (td instanceof HTMLTableCellElement) {
      // récupère la ligne complète (le parent)
      const tr = td.parentElement
      if (tr instanceof HTMLTableRowElement) {
        // chqnge la ligne sélectionnée
        setRowSelection(tr)

        // récupérer cellule nom (1er enfant) et afficher détails
        const tdName = tr.firstElementChild
        if (tdName instanceof HTMLTableCellElement) {
          const name = tdName.innerText
          showPokemonDetails(name)
        }
      }
    }
  })
}

// gestionnaire d'évènement pour la fermeture de la carte détails
const close = document.getElementById('pokemon-close')
if (close instanceof HTMLElement) {
  close.addEventListener('click', () => {
    const details = document.getElementById('pokemon-details')
    if (details instanceof HTMLElement) {
      setRowSelection(null)
      details.hidden = true
    }
  })
}

//#endregion

// cache loading indicator
const loading = document.getElementById('loading')
if (loading instanceof HTMLElement) {
  loading.hidden = true
}

// show 'main'
const main = document.getElementById('main')
if (main instanceof HTMLElement) {
  main.hidden = false
}

// ----------------------------------------------------------------------------
// Private functions
// ----------------------------------------------------------------------------

function createPokemonTable() {
  // parcours le tableau mémoire des pokémons pour les afficher dans le tableau HTML
  for (const pokemon of pokemons) {
    // filtrer les pokemon bug
    if (pokemon.types === null) {
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
  const row = cloneTemplate('pokemon-row-template')
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
  const cells = row.getElementsByTagName('td')
  if (cells instanceof HTMLCollection && cells.length > 1) {
    const setCellValue = (cellIndex, value) => {
      const cell = cells[cellIndex]
      if (cell instanceof HTMLTableCellElement) {
        cell.innerText = value
      }
    }
    setCellValue(TABLE_COL_NAME, pokemon.name.fr)
    setCellValue(TABLE_COL_CATEGORY, pokemon.category)
    setCellValue(TABLE_COL_GENERATION, pokemon.generation)
    setCellValue(TABLE_COL_TYPES, inspector.getTypesDescription(pokemon.types))
    setCellValue(TABLE_COL_EVOLUTIONS, inspector.getEvolutionsDescription(pokemon.evolution))
  }
}

/**
 * ajoute une ligne dans le tableau html des pokemons
 * @param {HTMLTableRowElement} row
 */
function addRowTemplate(row) {
  if (tableBodyElement !== null) {
    tableBodyElement.appendChild(row)
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
  const rows = tableBodyElement?.getElementsByTagName('tr') // récupère toutes les lignes du tableau
  if (rows instanceof HTMLCollection && rows.length > 1) {
    // si des lignes existent...
    for (const row of rows) {
      // parcours toutes les lignes une à une...

      // ----- récupère toutes les cellules de la ligne courante
      const cells = row.getElementsByTagName('td')
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
        row.style.display = matchNameFilter && matchGenerationFilter && matchTypesFilter ? '' : 'none'
      }
    }
  }
}

/**
 * ajoute les générations dans <select>
 * @param {number} generations le nombre de générations
 */
function setGenerationsFilterElements(generations) {
  for (let generation = 1; generation <= generations; generation++) {
    // ------ Créer une nouvelle <option>
    //    - trouver le <template> et  cloner l'<option>
    const option = cloneTemplate('generation-option-template')

    //    - mettre à jour les valeurs du clone
    if (option instanceof HTMLOptionElement) {
      option.value = generation.toString()
      option.innerText = generation.toString()

      // ----- ajouter l' <option> à <select>
      const filter = document.getElementById('generation-filter')
      if (filter instanceof HTMLSelectElement) {
        filter.appendChild(option)
      }
    }
  }
}

/**
 * affiche les détails d'un pokemon sélectionné
 * @param {string} pokemonName le nom du pokemon
 */
function showPokemonDetails(pokemonName) {
  const pokemon = inspector.getPokemonByName(pokemonName)
  if (pokemon) {
    console.log(`show ${pokemonName} details`)
    // montre la carte des détails
    const details = document.getElementById('pokemon-details')
    if (details instanceof HTMLElement) {
      details.hidden = false

      // affiche le nom
      const nameEl = document.getElementById('pokemon-name')
      if (nameEl instanceof HTMLElement) {
        nameEl.innerHTML = `<strong>${pokemonName}</strong> ${pokemon.name.en}`
      }

      // affiche l'image
      const img = document.getElementById('pokemon-img')
      if (img instanceof HTMLImageElement) {
        img.src = pokemon.sprites.regular
      }

      // affiche la description
      const desc = document.getElementById('pokemon-description')
      if (desc instanceof HTMLLabelElement) {
        desc.innerHTML = inspector.getDescription(pokemon)
      }

      // affiche les stats
      const stats = document.getElementById('pokemon-stats')
      if (stats instanceof HTMLLIElement) {
        stats.innerHTML = inspector.getStats(pokemon)
      }

      // affiche les talents
      const talents = document.getElementById('pokemon-talents')
      if (talents instanceof HTMLLIElement) {
        talents.innerHTML = inspector.getTalents(pokemon)
      }
    }
  } else {
    console.warn(`failed to show ${pokemon} details`)
  }
}

/**
 * colorie et mémorise la ligne sélectionnée
 * @param {HTMLTableRowElement | null} row
 */
function setRowSelection(row) {
  // effacer la sélection précédente
  if (selectedRow !== null) {
    selectedRow.classList.remove('w3-blue')
  }

  if (row) {
    // colorer le tr
    row.classList.add('w3-blue')
  }

  // mémoriser la nouvelle ligne sélectionnée ou nulle si pas de ligne sélectionnée
  selectedRow = row
}
