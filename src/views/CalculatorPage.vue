<template>
  <div class="about">
    <div>
      <label for="discount_rate">Discount Rate</label>
      <input id="discount_rate" type="number" v-model="discount_rate">
    </div>
    <div>
      <label for="growth_rate">Growth Rate</label>
      <input id="growth_rate" type="number" v-model="growth_rate">
    </div>
    <div>
      <label for="cash_flow">Cash Flow</label>
      <input id="cash_flow" type="number" v-model="cash_flow">
    </div>
    <table>
      <tr>
        <td>Sum of cash flow in ten years</td>
        <td>{{this.discountedCashFlow.discountedCashFlowSumFirstStage()}}</td>
      </tr>
      <tr>
        <td>Perpetuity cash flow</td>
        <td>{{this.discountedCashFlow.discountedCashFlowPerpetuity()}}</td>
      </tr>
      <tr>
        <td>Intrinsic value</td>
        <td>{{this.discountedCashFlow.intrinsicValue()}}</td>
      </tr>
      <tr>
        <td>Intrinsic value per share</td>
        <td>{{this.$store.state.metadata.outstandingShares}}</td>
      </tr>
      <tr>
        <td>Number of years for first stage</td>
        <td>{{this.discountedCashFlow.years}}</td
        ></tr>
      <tr></tr>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { DiscountCashFlowCalculator } from '@/business/calculator/DiscountedCashFlow'

  @Component
export default class CalculatorPage extends Vue {
    private growth_rate = 0;
    private discount_rate = 0;
    private cash_flow = 0;

    get discountedCashFlow (): DiscountCashFlowCalculator {
      return new DiscountCashFlowCalculator(this.discount_rate, this.growth_rate, this.cash_flow)
    }
}
</script>
