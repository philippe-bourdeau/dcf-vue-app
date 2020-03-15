import { growthRate, rateOverYears } from '@/business/math'
import { round } from 'lodash'

test('rate over 3 years', () => {
  expect(round(rateOverYears(0.10, 3), 2)).toBe(1.33)
})

test('test growth rate', () => {
  expect(growthRate(420, 210)).toBe(100)
})

test('test negative growth rate', () => {
  const currentValue = -1014000000
  const pastValue = -137000000

  expect(currentValue - Math.abs(pastValue)).toBe(-1151000000)
  expect(growthRate(currentValue, pastValue)).toBe(-840.15)
})
