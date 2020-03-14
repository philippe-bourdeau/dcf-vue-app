import { round } from 'lodash'

/**
 *
 * @param rate
 * @param years
 */
export function rateOverYears (rate: number, years: number): number {
  return (1 + rate) ** years
}

/**
 *
 * @param currentValue
 * @param pastValue
 */
export function growthRate (currentValue: number, pastValue: number): number {
  return round((currentValue - pastValue) / pastValue * 100, 2)
}
