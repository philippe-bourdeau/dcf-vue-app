export class DiscountCashFlowCalculator {
  /** long term growth rate **/
  private LTGR = 0.03
  /** number of years before perpetuity **/
  private YEARS = 10
  /** number of years to calculate perpetuity **/
  private PERPETUITY_YEARS = this.YEARS + 1
  /** discount rate **/
  private readonly DR: number
  /** growth rate **/
  private readonly GR: number
  private readonly baseFreeCashFlow: number

  /**
   * Rates to be used as percentages
   * @param DR
   * @param GR
   * @param baseFreeCashFlow
   */
  constructor (DR: number, GR: number, baseFreeCashFlow: number) {
    this.DR = DR / 100
    this.GR = GR / 100
    this.baseFreeCashFlow = baseFreeCashFlow
  }

  get years (): number {
    return this.YEARS
  }

  /**
   * Calculate the free cash flow in a number of years with determined GR
   * @param years
   */
  cashFlowInYears (years: number): number {
    return this.baseFreeCashFlow * this.rateOverYears(this.GR, years)
  }

  /**
   * Sum of all cash flow for the first stage of growth
   */
  discountedCashFlowSumFirstStage (): number {
    let sumOfCashFlow = 0
    for (let i = 1; i <= this.YEARS; i++) {
      sumOfCashFlow += this.cashFlowInYears(i) / this.rateOverYears(this.DR, i)
    }

    return sumOfCashFlow
  }

  /**
   * Cash flow for perpetuity
   */
  discountedCashFlowPerpetuity (): number {
    return (this.cashFlowInYears(this.PERPETUITY_YEARS) * (1 + this.LTGR) /
      (this.DR - this.LTGR)) * (1 / this.rateOverYears(this.DR, this.PERPETUITY_YEARS))
  }

  intrinsicValue (): number {
    return this.discountedCashFlowSumFirstStage() + this.discountedCashFlowPerpetuity()
  }

  /**
   * Calculate a factor over a number of years
   * @param years
   * @param rate
   */
  rateOverYears (rate: number, years: number): number {
    return (1 + rate) ** years
  }
}
