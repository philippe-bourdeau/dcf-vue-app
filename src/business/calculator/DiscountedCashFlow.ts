export class DiscountCashFlowCalculator {
  /** long term growth rate **/
  private LTGR = 0.03
  /** number of years before perpetuity **/
  private YEARS = 10
  /** discount rate **/
  private readonly DR: number
  /** growth rate **/
  private readonly GR: number
  private readonly baseFreeCashFlow: number

  constructor(DR: number, GR: number, baseFreeCashFlow: number) {
    this.DR = DR
    this.GR = GR
    this.baseFreeCashFlow = baseFreeCashFlow
  }

  /**
   * Calculate the free cash flow in a number of years with determined GR
   * @param years
   */
  cashFlowInYears(years: number): number {
    return this.baseFreeCashFlow * this.rateOverYears(this.GR, years)
  }

  discountedCashFlowBeforePerpetuity(): number {
    return this.cashFlowInYears(this.YEARS) / this.rateOverYears(this.DR, this.YEARS)
  }

  discountedCashFlowPerpetuity(): number {
    return (this.cashFlowInYears(this.YEARS + 1) * (1 + this.LTGR) /
      (this.DR - this.LTGR)) * (1 / this.rateOverYears(this.DR, this.YEARS))
  }

  intrinsicValue(): number {
    return this.discountedCashFlowBeforePerpetuity() + this.discountedCashFlowPerpetuity()
  }

  /**
   * Calculate a factor over a number of years
   * @param years
   * @param rate
   */
  rateOverYears(rate: number, years: number): number {
    return (1 + rate) ** years
  }
}
