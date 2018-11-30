<template>
  <g class="end-event">
    <circle :r="r" :cx="x" :cy="y"></circle>
  </g>
</template>
<script>
import procmodel from '../mixins/procmodel'
export default {
  name: 'EndEvent',
  mixins: [procmodel],
  props: {
    r: {
      type: Number,
      default: 40
    }
  }
}
</script>
<style lang="scss" scoped>
.end-event{
  stroke-width: 0px;
  fill: red;
}
</style>
