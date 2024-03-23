const baseUrl = 'https://swapi.dev/api/'

const planetsUrl = baseUrl + 'planets/'
const filmsUrl = baseUrl + 'films/'
const peopleUrl = baseUrl + 'people/'
const speciesUrl = baseUrl + 'species/'
const starshipsUrl = baseUrl + 'starships/'
const vehiclesUrl = baseUrl + 'vehicles/'

// type for planets API
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

// type generic
type SWApi<T> = SWApiItems<T>

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
  url: string
}

type ApiFilms = {
  title: string
}

type ApiPerson = {
  name: string
  vehicles: string[]
}

type ApiSpecie = {
  name: string
}

type ApiStarship = {
  name: string
}

type ApiVehicle = {
  name: string
}

async function fetchSWItems<T>(pageUrl: string): Promise<SWApi<T>> {
  const respnse = await fetch(pageUrl)
  const planets = await respnse.json()
  return planets
}

async function fetchAllItems<T>(url: string): Promise<T[]> {
  const sessionItems = sessionStorage.getItem(url)
  if (sessionItems !== null) {
    const items = JSON.parse(sessionItems)
    console.log(`get ${items.length} items from session storage key ${url}`)
    return items
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
  sessionStorage.setItem(url, JSON.stringify(items))

  return items
}

const planets = await fetchAllItems<ApiPlanet>(planetsUrl)
// console.log('planets:', planets.map((planet) => planet.name).join())

const films = await fetchAllItems<ApiFilms>(filmsUrl)
// console.log('films:', films.map((film) => film.title).join())

const people = await fetchAllItems<ApiPerson>(peopleUrl)
// console.log('people:', people.map((person) => person.name).join())

const species = await fetchAllItems<ApiSpecie>(speciesUrl)
// console.log('species:', species.map((specie) => specie.name).join())

const starships = await fetchAllItems<ApiStarship>(starshipsUrl)
// console.log('starships:', starships.map((starship) => starship.name).join())

const vehicles = await fetchAllItems<ApiVehicle>(vehiclesUrl)
// console.log('vehicles:', vehicles.map((vehicle) => vehicle.name).join())

const luke = people.find((person) => person.name.startsWith('Luke'))
console.log('luke:', luke)

const lukeVehicles = luke?.vehicles.map((vehicle) => {
  const section = vehicle.split('/')
  const s = section.at(-2)
  if (s === undefined) {
    return 'no vehicle index' + vehicle
  }
  const index = Number(s)
  return vehicles[index]
})
console.log('lukeVehicles ~ lukeVehicles:', lukeVehicles)
