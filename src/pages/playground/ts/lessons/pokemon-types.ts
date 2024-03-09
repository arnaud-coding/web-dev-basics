export interface Pokemon {
  pokedexId: number
  generation: number
  category: string
  name: PokemonName
  types: PokemonType[] | null
  sprites: { regular: string }
  evolution: PokemonEvolution | null
  resistances: PokemonResistance[]
  height: string
  weight: string
  catch_rate: number
  stats: PokemonStat
  talents: PokemonTalent[] | null
}

type PokemonName = {
  fr: string
  en: string
  jp: string
}

type PokemonType = {
  name: string
  image: string
}

type PokemonEvolution = {
  pre: PokemonEvolutionItem[] | null
  next: PokemonEvolutionItem[] | null
  mega: object[] | null
}

type PokemonEvolutionItem = {
  pokedexId: number
  name: string
  condition: string
}

type PokemonResistance = {
  name: string
  multiplier: number
}

type PokemonStat = {
  hp: number
  atk: number
  def: number
  spe_atk: number
  spe_def: number
  vit: number
}

type PokemonTalent = {
  name: string
  tc: boolean
}
