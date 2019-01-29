<template>
  <td
    :colspan="colspan"
    :rowspan="rowspan"
  >
    <x-content
      :text="text"
      :style="style"
      :textAlign="textAlign"
      :verticalAlign="verticalAlign"
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
  inject: ['cellSize'],
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
    },
    width: {
      type: Number
    },
    height: {
      type: Number
    },
    rowIndex: {
      type: Number,
      required: true
    },
    cellIndex: {
      type: Number,
      required: true
    },
    textAlign: {
      type: String,
      default: 'left'
    },
    verticalAlign: {
      type: String,
      default: 'top'
    }
  },
  computed: {
    style () {
      const style = {}
      if (this.height !== undefined) {
        style.height = this.height + 'px'
      } else if (this.cellIndex === 0) {
        style.height = this.cellSize.height + 'px'
      }
      if (this.width !== undefined) {
        style.width = this.width + 'px'
      } else if (this.rowIndex === 0) {
        style.width = this.cellSize.width + 'px'
      }
      return style
    }
  }
}
</script>
<style lang="scss" scoped>
td{
  border-right: 1px solid #EEEEEE;
  border-bottom: 1px solid #EEEEEE;
}
</style>
