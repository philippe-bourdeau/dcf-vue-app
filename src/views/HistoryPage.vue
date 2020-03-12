<template>
  <div>
    <history-table>
    </history-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HistoryTable from '@/components/HistoryTable.vue'

@Component({
  components: {
    HistoryTable
  }
})
export default class HistoryPage extends Vue {
}
</script>
