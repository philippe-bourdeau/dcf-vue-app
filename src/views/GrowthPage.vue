<template>
    <div>
        <line-chart :width="500" :height="500">
        </line-chart>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import LineChart from '@/components/LineChart.vue'

    @Component({
      components: {
        LineChart
      }
    })
export default class GrowthPage extends Vue {
}
</script>
