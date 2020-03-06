import { BalanceSheet } from '@/business/shapes/BalanceSheet'

export interface FinancialStatement {
  ticker: string;
  year: string;
  balanceSheet: BalanceSheet;
}
