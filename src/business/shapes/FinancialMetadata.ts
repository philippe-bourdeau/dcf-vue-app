import { round } from '@/business/math'

export interface IFinancialMetadata {
  readonly ticker: string;
  readonly price: number;
  readonly market_cap: number;
}

export class FinancialMetadata implements IFinancialMetadata {
  price: number
  market_cap: number
  ticker: string

  constructor (ticker: string, price: number, market_cap: number) {
    this.price = price
    this.market_cap = market_cap
    this.ticker = ticker
  }

  get outstandingShares () {
    return round(this.market_cap / this.price, 0)
  }
}
