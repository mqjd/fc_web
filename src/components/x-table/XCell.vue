<template>
  <td
    :colspan="colspan"
    :rowspan="rowspan"
  >
    <x-content
      :text="text"
      :style="{'max-height': rowHeight + 'px'}"
    >
    </x-content>
  </td>
</template>
<script>
import XContent from './XContent.vue'
export default {
  name: 'x-cell',
  components: {
    XContent
  },
  inject: ['rowHeight'],
  props: {
    colspan: {
      type: Number,
      default: 1
    },
    rowspan: {
      type: Number,
      default: 1
    },
    text: {
      type: String
    }
  }
}
</script>
<style lang="scss" scoped>
td{
  border-right: 1px solid #EEEEEE;
  border-bottom: 1px solid #EEEEEE;
  word-break: break-all;
}
</style>
