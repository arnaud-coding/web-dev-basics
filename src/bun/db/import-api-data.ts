/**
 * But:
 *  - fetch all star wars data from API
 *  - save all API raw data in files on disk (one file per item type)
 */

const baseUrl = 'https://swapi.dev/api/'
const baseFolder = 'api-raw-data/'

const planetsFile = baseFolder + 'planets.json'
const filmsFile = baseFolder + 'films.json'
const peopleFile = baseFolder + 'people.json'
const speciesFile = baseFolder + 'species.json'
const starshipsFile = baseFolder + 'starships.json'
const vehiclesFile = baseFolder + 'vehicles.json'

const planetsUrl = baseUrl + 'planets/'
const filmsUrl = baseUrl + 'films/'
const peopleUrl = baseUrl + 'people/'
const speciesUrl = baseUrl + 'species/'
const starshipsUrl = baseUrl + 'starships/'
const vehiclesUrl = baseUrl + 'vehicles/'

// type for API items: represents planets / films / people / species / starships / vehicles
type SWApiItems<T> = {
  // total number of planets in the API
  count: number
  // planets next page adress
  next: string | null
  // planets previous page adress
  previous: string | null
  // planets for current page
  results: T[]
}

// type for planet API
type ApiPlanet = {
  climate: string
  diameter: string
  // array of films adresses
  films: string[]
  gravity: string
  name: string
  population: string
  orbital_period: string
  rotation_period: string
  // array of residents adresses
  residents: string[]
  surface_water: string
  terrain: string
}

type ApiFilms = {
  // array of person adresses
  characters: string[]
  title: string
  director: string
  episode_id: 4
  opening_crawl: string
  // array of planet adresses
  planets: string[]
  producer: string
  // array of species adresses
  species: string[]
  // array of starships adresses
  starships: string[]
  // array of vehicles adresses
  vehicles: string[]
}

type ApiPerson = {
  name: string
  birth_year: string
  eye_color: string
  // array of films adresses
  films: string[]
  gender: string
  hair_color: string
  height: string
  homeworld: string
  mass: string
  skin_color: string
  // array of species adresses
  species: string[]
  // array of starships adresses
  starships: string[]
  // array of vehicles adresses
  vehicles: string[]
}

type ApiSpecie = {
  name: string
  average_height: string
  average_lifespan: string
  classification: string
  designation: string
  eye_colors: string
  films: string[]
  hair_colors: string
  homeworld: string
  language: string
  skin_colors: string
}

type ApiMotor = {
  cargo_capacity: string
  consumables: string
  cost_in_credits: string
  crew: string
  films: string[]
  length: string
  manufacturer: string
  model: string
  passengers: string
  pilots: string[]
}

type ApiStarship = ApiMotor & {
  name: string
  MGLT: string
  hyperdrive_rating: string
  starship_class: string
}

type ApiVehicle = ApiMotor & {
  name: string
  max_atmosphering_speed: string
  vehicle_class: string
}

async function fetchSWItems<T>(pageUrl: string): Promise<SWApiItems<T>> {
  console.log('fetch: ', pageUrl)
  const respnse = await fetch(pageUrl)
  const items = await respnse.json()
  return items
}

async function fetchAllItems<T>(url: string, filename: string): Promise<T[]> {
  // return existing data if exist
  const file = Bun.file(filename)
  const exist = await file.exists()
  if (exist) {
    console.log(`get already exisiting data from file ${filename}`)
    return await file.json()
  }

  // fetch first items page
  let currentPage = await fetchSWItems<T>(url)

  // store first page items
  const items: T[] = [...currentPage.results]

  do {
    // get next page adresses
    const nextPage = currentPage.next

    // if no next , then  we got all existing items
    if (nextPage === null) {
      break
    }

    // fetch next page
    currentPage = await fetchSWItems(nextPage)

    // store next items
    items.push(...currentPage.results)
  } while (currentPage.next !== null)

  // store items in session storage
  // sessionStorage.setItem(url, JSON.stringify(items))
  Bun.write(filename, JSON.stringify(items))

  return items
}

const planets = await fetchAllItems<ApiPlanet>(planetsUrl, planetsFile)
// console.log('planets:', planets.map((planet) => planet.name).join())
console.log(`Fetched ${planets.length} planets`)

const films = await fetchAllItems<ApiFilms>(filmsUrl, filmsFile)
// console.log('films:', films.map((film) => film.title).join())
console.log(`Fetched ${films.length} films`)

const people = await fetchAllItems<ApiPerson>(peopleUrl, peopleFile)
// console.log('people:', people.map((person) => person.name).join())
console.log(`Fetched ${people.length} people`)

const species = await fetchAllItems<ApiSpecie>(speciesUrl, speciesFile)
// console.log('species:', species.map((specie) => specie.name).join())
console.log(`Fetched ${species.length} species`)

const starships = await fetchAllItems<ApiStarship>(starshipsUrl, starshipsFile)
// console.log('starships:', starships.map((starship) => starship.name).join())
console.log(`Fetched ${starships.length} starships`)

const vehicles = await fetchAllItems<ApiVehicle>(vehiclesUrl, vehiclesFile)
// console.log('vehicles:', vehicles.map((vehicle) => vehicle.name).join())
console.log(`Fetched ${vehicles.length} vehicles`)

console.log("That's all folks!")
