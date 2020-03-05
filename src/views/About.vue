<template>
  <div class="about">
    <label for="discount_rate">Discount Rate</label>
    <input id="discount_rate" type="number" v-model="discount_rate">

    <label for="growth_rate">Growth Rate</label>
    <input id="growth_rate" type="number" v-model="growth_rate">

    <div v-if="discount_rate > 0 && growth_rate > 0">
      {{discountedCashFlow}}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { DiscountCashFlowCalculator } from '@/business/calculator/DiscountedCashFlow'

  @Component
export default class HelloWorld extends Vue {
    private growth_rate = 0;
    private discount_rate = 0;

    get discountedCashFlow (): number {
      const calculator = new DiscountCashFlowCalculator(this.discount_rate, this.growth_rate, 1000)

      return calculator.intrinsicValue()
    }
}
</script>
