<template>
  <tr :style="{height: height + 'px'}">
    <x-cell
      v-for="column in columns"
      :key="column.key"
      :rowspan="column.rowspan"
      :colspan="column.colspan"
      :text="column.text"
      :style="column.style"
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
  provide () {
    return {
      rowHeight: this.height
    }
  },
  props: {
    columns: {
      type: Array,
      required: true
    },
    height: {
      type: Number,
      required: true
    }
  }
}
</script>
