<template>
  <div>
    <history-table>
    </history-table>

    <b-col
      lg="10"
      offset-lg="1"
      v-if="$store.getters.getTicker"
    >
      <h3 class="text-center title-margin">Revenue and equity related growth</h3>
      <income-chart
        :width="1200"
        :height="900"
      >
      </income-chart>
    </b-col>
    <b-col
      lg="10"
      offset-lg="1"
      v-if="$store.getters.getTicker"
    >
      <h3 class="text-center title-margin">Cash Flow related growth</h3>
      <cash-flow-growth-chart
        :width="1200"
        :height="900"
      >
      </cash-flow-growth-chart>
    </b-col>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HistoryTable from '@/components/HistoryTable.vue'
import IncomeChart from '@/components/IncomeChart.vue'
import CashFlowGrowthChart from '@/components/CashFlowGrowthChart.vue'

@Component({
  components: {
    HistoryTable,
    IncomeChart,
    CashFlowGrowthChart
  }
})
export default class HistoryPage extends Vue {
}
</script>

<style>
  .title-margin {
    margin-bottom: 1em;
    margin-top: 2em;
  }
</style>
