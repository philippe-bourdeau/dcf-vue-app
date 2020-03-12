<template>
  <div>
    <b-table
      v-if="items.length > 0"
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

      <template v-slot:cell(equity)="data">
        {{data.value}}
      </template>
    </b-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { FinancialStatement } from '@/business/shapes/FinancialStatement'
import { round } from '@/business/math'

  @Component
export default class HistoryTable extends Vue {
  inMillions (value: number) {
    return round(value / 1000000, 0)
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
      },
      {
        key: 'equity',
        label: 'Equity (in M$)',
        formatter: (value: number, key: string, item: FinancialStatement) => {
          return this.inMillions(item.balance_sheet.equity)
        }
      }
    ]

    get items (): FinancialStatement[] {
      return this.$store.state.statements
    }
}
</script>

<style>
</style>
