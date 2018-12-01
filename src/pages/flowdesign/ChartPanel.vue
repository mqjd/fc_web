<template>
  <div class="main" @mouseenter="dragover">
    <svg width="100%" height="100%" class="chart-panel">
      <defs>
        <marker id="arrowhead" markerUnits="userSpaceOnUse" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="12" markerHeight="12" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" stroke-width="0" stroke="#61B7CF" fill="#61B7CF"></path>
        </marker>
      </defs>
      <procmodel
        v-for="procmodel in procmodels"
        :key="procmodel.type"
        :options="procmodel"
        @start="start(procmodel, $event)"
        @drag="drag(procmodel, $event)"
      >
      </procmodel>
    </svg>
  </div>
</template>
<script>
import Procmodel from './procmodel'
export default {
  name: 'ChartPanel',
  components: {
    Procmodel
  },
  props: {
    procmodels: Array
  },
  data () {
    return {
      offset: {
        x: 0,
        y: 0
      }
    }
  },
  methods: {
    start (procmodel, event) {
      this.offset.x = event.x - procmodel.x
      this.offset.y = event.y - procmodel.y
    },
    drag (procmodel, event) {
      procmodel.x = event.x - this.offset.x
      procmodel.y = event.y - this.offset.y
    },
    dragover () {
    }
  }
}
</script>
<style lang="scss" scoped>
.chart-panel{
  display: block;
}
</style>
