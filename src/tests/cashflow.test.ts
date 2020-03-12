import { DiscountCashFlowCalculator } from '@/business/calculator/DiscountedCashFlow'

const cashFlowCalculator = new DiscountCashFlowCalculator(
  10,
  6,
  1000
)

test('testing cash flow in 10 years', () => {
  expect(Math.round(cashFlowCalculator.cashFlowInYears(10))).toBe(1791)
})

test('discounted cash flow sum for first stage', () => {
  expect(Math.round(cashFlowCalculator.discountedCashFlowSumFirstStage())).toBe(8203)
})

test('intrinsic value', () => {
  expect(Math.round(cashFlowCalculator.intrinsicValue())).toBe(17993)
})
