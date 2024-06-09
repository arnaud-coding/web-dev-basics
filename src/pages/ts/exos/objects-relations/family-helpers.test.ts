import { describe, expect, test } from 'vitest'
import { createHeight, createWeight } from './family-helpers.ts'

describe('Family helpers', () => {
  describe('CreateHeight', () => {
    test('it succeeds with 1.78 m', () => {
      // Arrange
      const expected = '1.78 m'

      // Act
      const sut = createHeight(1.78)
      const res = sut.value

      // Asset
      expect(res).toBe(expected)
    })

    test('it throws with 0 m', () => {
      expect(() => createHeight(0)).toThrow(RangeError)
    })

    test('it throws with -1.70 m', () => {
      expect(() => createHeight(-1.7)).toThrow()
    })

    test('it throws with NaN m', () => {
      expect(() => createHeight(NaN)).toThrow()
    })

    test('it throws with infinity m', () => {
      expect(() => createHeight(Number.POSITIVE_INFINITY)).toThrow()
    })

    test('it throws with 3m', () => {
      expect(() => createHeight(3)).toThrow()
    })
  })
  describe('CreateWeight', () => {
    test('it succeeds with 65 kg', () => {
      // Arrange
      const expected = '65 kg'

      // Act
      const sut = createWeight(65)
      const res = sut.value

      // Asset
      expect(res).toBe(expected)
    })

    test('it throws with 0 kg', () => {
      expect(() => createWeight(0)).toThrow()
    })

    test('it throws with -20 kg', () => {
      expect(() => createWeight(-20)).toThrow()
    })

    test('it throws with NaN kg', () => {
      expect(() => createWeight(NaN)).toThrow()
    })

    test('it throws with 1000 kg', () => {
      expect(() => createWeight(1000)).toThrow()
    })
  })
})
