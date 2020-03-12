/**
 *
 * @param rate
 * @param years
 */
export function rateOverYears (rate: number, years: number): number {
  return (1 + rate) ** years
}

/**
 * Found on numerous websites but here is one http://www.jacklmoore.com/notes/rounding-in-javascript/
 *
 * @param value
 * @param decimals
 */
export function round (value: number, decimals: number): number {
  return Number(
    Math.round(
      Number(value + 'e' + decimals)
    ) + 'e-' + decimals
  )
}
