<template>
  <table
    class="x-table-content"
    cellspacing="0"
    cellpadding="0"
    ref="table"
  >
    <tbody>
      <xtable-header :header="cellWidth"></xtable-header>
      <x-row
        v-for="(row,rowIndex) in table"
        :key="rowIndex"
        :columns="row"
        :height="cellHeight[rowIndex]"
      >
      </x-row>
    </tbody>
  </table>
</template>
<script>
import XRow from './XRow.vue'
import XtableHeader from './XtableHeader.vue'
export default {
  name: 'xtable-content',
  components: {
    XRow,
    XtableHeader
  },
  props: {
    table: {
      type: Array
    },
    cellWidth: {
      type: Array
    },
    cellHeight: {
      type: Array
    }
  }
}
</script>
<style lang="scss" scoped>
.x-table-content{
  font-size: 12px;
  table-layout:fixed;
  --webkit-touch-callout: none;
  --webkit-user-select: none;
  --khtml-user-select: none;
  --moz-user-select: none;
  --ms-user-select: none;
  user-select: none;
}
</style>
