import { ValueUnit, WeightUnit, LengthtUnit } from './family.model.ts'

/**
 * returns a weight object in kg
 * @param weight weight in kg
 * @returns a generic value unit object of type WeightUnit
 * @throws {RangeError} if weight is not finite, or < 1 or > 700
 */
export function createWeight(weight: number): ValueUnit<WeightUnit> {
  if (weight < 1 || weight > 700 || Number.isNaN(weight)) {
    throw new RangeError('weight must be 1..700 ')
  }

  return new ValueUnit<WeightUnit>(weight, 'kg')
}

/**
 * returns a height  object in meter
 * @param height height in meter
 * @returns a generic value unit object of type LengthUnit
 * @throws {RangeError} if height is not finite, or < 0.4 or > 2.8
 */
export function createHeight(height: number): ValueUnit<LengthtUnit> {
  if (height < 0.4 || height > 2.8 || Number.isNaN(height)) {
    throw new RangeError('height must be 0,4..2,8 ')
  }

  return new ValueUnit<LengthtUnit>(height, 'm')
}
