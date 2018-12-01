<template>
  <g class="parallel" :transform="transform">
    <svg :width="width" :height="height" viewBox="0 0 1000 1000">
      <path d="M500 0 L1000 500 L500 1000 L0 500 Z" style="fill:#FFFFFF;stroke:#707070;;stroke-width:25"></path>
      <line x1="310" y1="500" x2="690" y2="500" style="stroke:#707070;stroke-width:40"/>
      <line x1="500" y1="310" x2="500" y2="690" style="stroke:#707070;stroke-width:40"/>
    </svg>
    <slot></slot>
  </g>
</template>
<script>
import procmodel from '../mixins/procmodel'
export default {
  name: 'Parallel',
  mixins: [procmodel]
}
</script>
<style lang="scss" scoped>
</style>
