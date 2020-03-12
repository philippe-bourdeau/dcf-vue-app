import { rateOverYears, round } from '@/business/math'

test('Testing round function', () => {
  expect(round(1.005, 2)).toBe(1.01)
})

test('rate over 3 years', () => {
  expect(round(rateOverYears(0.10, 3), 2)).toBe(1.33)
})
