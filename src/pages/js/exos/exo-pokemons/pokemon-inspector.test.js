import { describe } from 'vitest'
import { expect, test } from 'vitest'
import { PokemonInspector } from './pokemon-inspector'

const bulbi = {
  pokedexId: 1,
  generation: 1,
  category: 'Pokémon Graine',
  name: { fr: 'Bulbizarre', en: 'Bulbasaur', jp: 'フシギダネ' },
  sprites: {
    regular: 'https://raw.githubusercontent.com/Yarkis01/PokeAPI/images/sprites/1/regular.png',
    shiny: 'https://raw.githubusercontent.com/Yarkis01/PokeAPI/images/sprites/1/shiny.png',
    gmax: null
  },
  types: [
    { name: 'Plante', image: 'https://raw.githubusercontent.com/Yarkis01/PokeAPI/images/types/plante.png' },
    { name: 'Poison', image: 'https://raw.githubusercontent.com/Yarkis01/PokeAPI/images/types/poison.png' }
  ],
  talents: [
    { name: 'Engrais', tc: false },
    { name: 'Chlorophylle', tc: true }
  ],
  stats: { hp: 45, atk: 49, def: 49, spe_atk: 65, spe_def: 65, vit: 45 },
  resistances: [
    { name: 'Normal', multiplier: 1 },
    { name: 'Plante', multiplier: 0.25 },
    { name: 'Feu', multiplier: 2 },
    { name: 'Eau', multiplier: 0.5 },
    { name: 'Électrik', multiplier: 0.5 },
    { name: 'Glace', multiplier: 2 },
    { name: 'Combat', multiplier: 0.5 },
    { name: 'Poison', multiplier: 1 },
    { name: 'Sol', multiplier: 1 },
    { name: 'Vol', multiplier: 2 },
    { name: 'Psy', multiplier: 2 },
    { name: 'Insecte', multiplier: 1 },
    { name: 'Roche', multiplier: 1 },
    { name: 'Spectre', multiplier: 1 },
    { name: 'Dragon', multiplier: 1 },
    { name: 'Ténèbres', multiplier: 1 },
    { name: 'Acier', multiplier: 1 },
    { name: 'Fée', multiplier: 0.5 }
  ],
  evolution: {
    pre: null,
    next: [
      { pokedexId: 2, name: 'Herbizarre', condition: 'Niveau 16' },
      { pokedexId: 3, name: 'Florizarre', condition: 'Niveau 32' }
    ],
    mega: null
  },
  height: '0,7 m',
  weight: '6,9 kg',
  egg_groups: ['Monstrueux', 'Végétal'],
  sexe: { male: 87.5, female: 12.5 },
  catch_rate: 45,
  level_100: 1059862,
  forme: null
}

const inspector = new PokemonInspector([])

describe('pokemon-inspector', () => {
  describe('getDescription', () => {
    test('with mega', () => {
      const flori = {
        evolution: {
          pre: [
            { pokedexId: 1, name: 'Bulbizarre', condition: 'Niveau 16' },
            { pokedexId: 2, name: 'Herbizarre', condition: 'Niveau 32' }
          ],
          next: null,
          mega: [
            {
              orbe: 'Florizarrite',
              sprites: {
                regular: 'https://raw.githubusercontent.com/Yarkis01/PokeAPI/images/sprites/3/mega-regular.png',
                shiny: 'https://raw.githubusercontent.com/Yarkis01/PokeAPI/images/sprites/3/mega-shiny.png'
              }
            }
          ]
        },
        height: '2,0 m',
        weight: '100,0 kg',
        catch_rate: 45
      }
      const expected = 'Taille = 2,0 m ; poids = 100,0 kg ; taux de capture = 45 % ; méga-évo = Florizarrite'

      // @ts-ignore
      const actual = inspector.getDescription(flori)

      expect(actual).toBe(expected)
    })

    test('without mega', () => {
      const expected = 'Taille = 0,7 m ; poids = 6,9 kg ; taux de capture = 45 %'

      const actual = inspector.getDescription(bulbi)

      expect(actual).toBe(expected)
    })
  })

  test('getStats with bulbi', () => {
    const expected = 'Santé: 45 ; Attaque: 49 ; Défense: 49 ; Vitesse: 45'

    const actual = inspector.getStats(bulbi)

    expect(actual).toBe(expected)
  })

  test('getTalents with bulbi', () => {
    const expected = 'Talents: Engrais, Chlorophylle'

    const actual = inspector.getTalents(bulbi)

    expect(actual).toBe(expected)
  })

  test('getEvolutionsDescription with bulbi', () => {
    const expected = 'Herbizarre (16), Florizarre (32)'

    const actual = inspector.getEvolutionsDescription(bulbi.evolution)

    expect(actual).toBe(expected)
  })

  describe('getTypesDescription', () => {
    test('with 2 types', () => {
      const expected = 'Plante, Poison'

      const actual = inspector.getTypesDescription(bulbi.types)

      expect(actual).toBe(expected)
    })

    test('with empty types array', () => {
      const expected = ''

      const actual = inspector.getTypesDescription([])

      expect(actual).toBe(expected)
    })

    test('with null types array', () => {
      const expected = ''

      const actual = inspector.getTypesDescription(null)

      expect(actual).toBe(expected)
    })
  })
})
