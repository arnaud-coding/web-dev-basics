import { describe } from 'vitest'
import { expect, test, vi } from 'vitest'

// ================================================================================================
// Functions to test
// ================================================================================================

//#region functions to test

/**
 * sum of 2 operands
 * @param {number | string} a 1st operand
 * @param {number | string} b 2nd operand
 * @returns {number | string} sum
 */
let sum = (a, b) => {
  // @ts-ignore
  return a + b
}

/**
 * use the callBack to compute something
 * @param {function(number):number} cb the computation callback
 * @param {number} n number to compute
 * @returns {number} the computation result
 */
let useCallback = (cb, n) => {
  return cb(n)
}

/**
 * used to test the throw expectation...
 * @param {number} n positive numbetr
 * @returns exponential of n
 */
let crash = (n) => {
  if (n <= 0) {
    throw Error('crash test')
  }
  return Math.exp(n)
}

let getRandomWithDelay = async () => {
  return Promise.resolve(Math.random())
}

//#endregion

// ================================================================================================
// Test Functions
// ------------------------------------
// Pour voir tous les types de tests possibles : https://jestjs.io/docs/expect#tohavelengthnumber
// exemples: toHaveLength, toHaveProperty, toBeDefined, toBeFalsy, toBeGreaterThan, toBeInstanceOf,
//           toBeNull, toBeNan, toBeAnything, etc...
// ================================================================================================

test('add 2 and 3', () => {
  const res = sum(2, 3)
  expect(res).toBe(5)
  expect(res).not.toBe(0)
})

test('test decimal values', () => {
  //* toBe échoue parce que le résultat calculé = 0.30000000000000004 (erreur de calcul de l'ordinateur sur nombres flottants/décimaux)
  // expect(sum(0.2, 0.1)).toBe(0.3)

  // bonne façon de comparer des chiffres décimaux
  expect(sum(0.2, 0.1)).toBeCloseTo(0.3)
})

describe('types of test (par résultat / par comportement)', () => {
  test('teste le résultat', () => {
    const res = useCallback((x) => x * 2, 7)
    expect(res).toBe(14)
  })

  test('teste le comportement', () => {
    // Arrange: Crée une 'fausse'fonction de test (un "mock" ou "spy")
    const cb = vi.fn()

    // Act
    useCallback(cb, 7)

    // Assert: Vérifie que le mock 'cb' a bien été appelé (comportement vérifié)
    expect(cb).toHaveBeenCalledWith(7)
  })
})

test('use mock', () => {
  // crée une fausse fonction (mock) qui recoit un paramètre 'n' et qui retoutne 123456
  // eslint-disable-next-line no-unused-vars
  const mock = vi.fn((n) => 123456)
  const expected = 2502241630

  const res = useCallback(mock, expected)

  // vérifie que useCallback a bien appelé le mock en lui passant la valeur attentue
  expect(mock).toBeCalledWith(expected)
  // vérifie le résultat
  expect(res).toBe(123456)

  // NB : il n'est souvent pas recommandé de vérifier résultat et comportement en même temps (signe que la fonction est trop compliquée)
})

test('crash expected', () => {
  expect(() => {
    crash(0)
  }).toThrow()
})

test('contains', () => {
  const cake = 'The cake was so good! Thanks mom'

  expect(cake).toContain('good')
})

describe('async', () => {
  test('async 1st way', async () => {
    const r = await getRandomWithDelay()
    expect(r).toBeGreaterThanOrEqual(0)
  })

  test('async 2nd way', async () => {
    const p = getRandomWithDelay()
    await expect(p).resolves.toBeGreaterThanOrEqual(0)
  })
})
