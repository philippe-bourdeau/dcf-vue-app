<template>
  <div>
    <b-row>
      <b-col lg="3">
        <b-form-group
          description="Enter the rate to discount the intrinsic value over the next 10 years"
          label-align="left"
          label="Discount Rate"
          label-for="discount_rate"
          :state="state"
        >
          <b-form-input id="discount_rate" v-model="discount_rate" :state="state" trim></b-form-input>
        </b-form-group>
        <b-form-group
          description="Enter the estimated growth rate for the next 10 years"
          label-align="left"
          label="Growth rate"
          label-for="growth_rate"
          :state="state"
        >
          <b-form-input id="discount_rate" v-model="growth_rate" :state="state" trim></b-form-input>
        </b-form-group>
        <b-form-group
          description="Enter the current free cash flow to start the calculations with"
          label-align="left"
          label="Base cash flow"
          label-for="discount_rate"
          :state="state"
        >
          <b-form-input id="discount_rate" v-model="discount_rate" :state="state" trim></b-form-input>
        </b-form-group>
      </b-col>
      <b-col offset="1" lg="5">
        <b-card bg-variant="light" title="Intrinsic value calculation" sub-title="based on free cash flow">
          <p>
            Sum of cash flow in ten years:
            <code>{{this.discountedCashFlow.discountedCashFlowSumFirstStage()}}</code>
          </p>
          <p>
            Perpetuity cash flow :
            <code>
              {{this.discountedCashFlow.discountedCashFlowPerpetuity()}}
            </code>
          </p>
          <p>
            Intrinsic value :
            <code>
              {{this.discountedCashFlow.intrinsicValue()}}
            </code>
          </p>
          <p>
            Number of outstanding shares :
            <code>
              {{this.$store.state.metadata.outstandingShares}}
            </code>
          </p>
          <p>
            Intrinsic value per share :
            <code>
              {{ this.discountedCashFlow.intrinsicValue() / this.$store.state.metadata.outstandingShares}}
            </code>
          </p>
        </b-card>
      </b-col>
    </b-row>
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
