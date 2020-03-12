<template>
  <div>
    <b-table
      striped
      hover
      :items="items"
      :fields="fields"
    >
      <template v-slot:cell(revenue)="data">
        {{data.value}}
      </template>

      <template v-slot:cell(net_income)="data">
        {{data.value}}
      </template>

      <template v-slot:cell(fiscal)="data">
        {{data.item.year}}
      </template>

      <template v-slot:cell(ocf)="data">
        {{data.value}}
      </template>

      <template v-slot:cell(capex)="data">
        {{data.value}}
      </template>
    </b-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { FinancialStatement } from '@/business/shapes/FinancialStatement'

  @Component
export default class HistoryTable extends Vue {
  inMillions (value: number) {
    return value / 1000000
  }

    fields: object[] = [
      {
        key: 'fiscal',
        label: 'Fiscal end date'
      },
      {
        key: 'revenue',
        label: 'Revenue (in M$)',
        formatter: (value: number, key: string, item: FinancialStatement) => {
          return this.inMillions(item.income_statement.revenue)
        }
      },
      {
        key: 'net_income',
        label: 'Net income (in M$)',
        formatter: (value: number, key: string, item: FinancialStatement) => {
          return this.inMillions(item.income_statement.net_income)
        }
      },
      {
        key: 'ocf',
        label: 'Operating Cash Flow (in M$)',
        formatter: (value: number, key: string, item: FinancialStatement) => {
          return this.inMillions(item.cash_flow_statement.operating_cash_flow)
        }
      },
      {
        key: 'capex',
        label: 'Capital expenditure (in M$)',
        formatter: (value: number, key: string, item: FinancialStatement) => {
          return this.inMillions(item.cash_flow_statement.capex)
        }
      }
    ]

    items: FinancialStatement[] = [
      {
        ticker: 'T:CA',
        year: '2010-12-31',
        cash_flow_statement: {
          operating_cash_flow: 2670000000,
          capex: -1721000000
        },
        income_statement: {
          revenue: 9742000000,
          net_income: 1048000000
        },
        balance_sheet: {
          long_term_debt: 0
        }
      },
      {
        ticker: 'T:CA',
        year: '2011-12-31',
        cash_flow_statement: {
          operating_cash_flow: 2550000000,
          capex: -1867000000
        },
        income_statement: {
          revenue: 10325000000,
          net_income: 1215000000
        },
        balance_sheet: {
          long_term_debt: 0
        }
      }
    ]
}
</script>

<style>
</style>
