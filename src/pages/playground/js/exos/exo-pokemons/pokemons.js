import { fetchPokemons } from './pokemon-api'
import { PokemonInspector } from './pokemon-inspector'

const pokemonTableBodyElement = document.getElementById("pokemon-tbody")

// ajout gestionnaires d'évènement
const filterElement = document.getElementById("pokemon-search")
if (filterElement instanceof HTMLInputElement) {
  filterElement.addEventListener("input", ()=>{
    // cette fonction anonyme est appelée à chaque nouveau caractère tapé dans le filtre : on récupère le filtre
    const filter = filterElement.value
    filterPokemons(filter)
  })
}

/** Tableau de pokemons chargés en mémoire */
const pokemons = await fetchPokemons()

/** l'inspecteur pour manipuler les pokemons */
const inspector = new PokemonInspector(pokemons)

createPokemonTable()

// ----------------------------------------------------------------------------
// Private functions
// ----------------------------------------------------------------------------

function createPokemonTable() {
  // parcours le tableau mémoire des pokémons pour les afficher dans le tableau HTML
  // eslint-disable-next-line no-unreachable-loop
  for (const pokemon of pokemons) {
    // filtrer les pokemon bug
    if (pokemon.types === null){
      continue
    }

    // ajouter le pokémon courant dans une nouvelle ligne du tableau HTML
    addPokemonRow(pokemon)

    if (pokemon.name.fr === "Dracaufeu") {
      // break //! temporaire
    }
  }
}

/**
 * ajoute un pokemon dans le tableau HTML
 * @param {Pokemon} pokemon
 */
function addPokemonRow(pokemon) {
  // créer ligne tableau html
  const row = createEmptyPokemonRow()
  if (row === null) {
    return
  }

  // placer les données du pokemon courant dans la ligne
  setPokemonRow(pokemon, row)

  // ajouter ligne
  addRowTemplate(row)

}

/**
 * crée une ligne vide de pokemon
 * @returns {HTMLTableRowElement | null}
 */
function createEmptyPokemonRow() {
  const rowTemplate = document.getElementById("pokemon-row-template")

  // code qui marche, plus rapide mais pas tres propre :
  // return rowTemplate?.content?.firstElementChild

  if (rowTemplate instanceof HTMLTemplateElement) {
    const fragment = rowTemplate.content
    if (fragment instanceof DocumentFragment) {
      const child = fragment.firstElementChild
      if (child instanceof HTMLTableRowElement) {
        const clone = child.cloneNode(true)
        if (clone instanceof HTMLTableRowElement) {
          return clone
        }
      }
    }
  }

  console.error("pokemon row template not found")
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
 * @param {string} filter
 */
function filterPokemons(filter) {
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

      // récupère le nom du pokemon de cette ligne
      const cells = row.getElementsByTagName("td")
      if (cells instanceof HTMLCollection && cells.length > 1) {
        const name = cells[0].textContent

        // vérifier si nom contient filtre
        if (typeof name === 'string') {
          if (name.toUpperCase().includes(filter.toUpperCase())) {
            // montrer la ligne
            row.style.display = ""

          } else {
            // cacher la ligne
            row.style.display = "none"
          }
        }
      }

    }
  }

}