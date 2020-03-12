import { BalanceSheet } from '@/business/shapes/BalanceSheet'
import { CashFlowStatement } from '@/business/shapes/CashFlowStatement'
import { IncomeStatement } from '@/business/shapes/IncomeStatement'

export interface FinancialStatement {
  readonly ticker: string;
  readonly fiscal_end_date: string;
  readonly balance_sheet: BalanceSheet;
  readonly cash_flow_statement: CashFlowStatement;
  readonly income_statement: IncomeStatement;
}
