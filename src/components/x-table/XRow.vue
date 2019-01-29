<template>
  <tr>
    <x-cell
      v-for="(column, cellIndex) in columns"
      :key="column.key"
      :rowspan="column.rowspan"
      :colspan="column.colspan"
      :text="column.text"
      :cellIndex="cellIndex"
      :rowIndex="rowIndex"
      :width="column.width"
      :height="column.height"
      :textAlign="column.textAlign"
      :verticalAlign="column.verticalAlign"
    >
    </x-cell>
  </tr>
</template>
<script>
import XCell from './XCell.vue'
export default {
  name: 'x-row',
  components: {
    XCell
  },
  props: {
    columns: {
      type: Array,
      required: true
    },
    rowIndex: {
      type: Number,
      required: true
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
