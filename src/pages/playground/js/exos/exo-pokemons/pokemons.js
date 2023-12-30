import { fetchPokemons } from './pokemon-api'
import { PokemonInspector } from './pokemon-inspector'

/** Tableau de pokemons chargés en mémoire */
const pokemons = await fetchPokemons()

/** l'inspecteur pour manipuler les pokemons */
const inspector = new PokemonInspector(pokemons)

// parcours le tableau mémoire des pokémons
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
    setCellValue(3, pokemon.types?.map((type) => type.name).join(", "))
    setCellValue(4, getEvolutionDescription(pokemon.evolution))
  }
}

/**
 * ajoute une ligne dans le tableau html des pokemons
 * @param {HTMLTableRowElement} row
 */
function addRowTemplate(row) {
  const tbody = document.getElementById("pokemon-tbody")
  if (tbody !== null) {
    tbody.appendChild(row)
  }
}

/**
 * renvoie les évolutions sous la forme  "Herbizzare (16), Florizarre (32)"
 * @param {PokemonEvolution | null} evo
 * @returns {string} les évolutions
 */
function getEvolutionDescription(evo) {

  if (evo === null) {
    return ""
  }

  return evo?.next?.map((item)=>{
    let level
    if (item.condition.startsWith("Niveau")) {
      // on a condition = "Niveau 16", on veut extraire le lvl
      level = item.condition.split(" ")[1]
    } else {
      // on a condition = "Pierre soleil", on veut la garder telle qu'elle
      level = item.condition
    }
    const res = `${item.name} (${level})`
    return res
  }).join(", ") ?? ''
}


// debug tmp
const pokemon = inspector.getPokemonByName('Mystherbe')
const dbg = document.getElementById('dbg-area')
if (dbg instanceof HTMLTextAreaElement) {
  dbg.innerHTML = JSON.stringify(pokemon, null, 2)
}
