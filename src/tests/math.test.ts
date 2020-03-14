import { growthRate, rateOverYears } from '@/business/math'
import { round } from 'lodash'

test('rate over 3 years', () => {
  expect(round(rateOverYears(0.10, 3), 2)).toBe(1.33)
})

test('test growth rate', () => {
  expect(growthRate(420, 210)).toBe(1)
})
