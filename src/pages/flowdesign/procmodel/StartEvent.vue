<template>
  <g class="start-event">
    <circle :r="r" :cx="x" :cy="y"></circle>
  </g>
</template>
<script>
import procmodel from '../mixins/procmodel'
export default {
  name: 'StartEvent',
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
.start-event{
  stroke-width: 0px;
  fill: green;
}
</style>
