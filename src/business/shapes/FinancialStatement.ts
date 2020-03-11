import { BalanceSheet } from '@/business/shapes/BalanceSheet'
import { CashFlowStatement } from '@/business/shapes/CashFlowStatement'
import { IncomeStatement } from '@/business/shapes/IncomeStatement'

export interface FinancialStatement {
  ticker: string;
  year: string;
  balanceSheet: BalanceSheet;
  cashFlowStatement: CashFlowStatement;
  incomeStatement: IncomeStatement;
}
