<template>
  <g class="exclusive">
    <svg :width="width" :height="height" :x="x" :y="y" viewBox="0 0 1000 1000">
      <path d="M500 0 L1000 500 L500 1000 L0 500 Z" style="fill:#FFFFFF;stroke-width:25"></path>
      <line x1="350" y1="350" x2="650" y2="650" style="stroke-width:40"/>
      <line x1="350" y1="650" x2="650" y2="350" style="stroke-width:40"/>
    </svg>
  </g>
</template>
<script>
import procmodel from '../mixins/procmodel'
export default {
  name: 'Exclusive',
  mixins: [procmodel]
}
</script>
<style lang="scss" scoped>
</style>
