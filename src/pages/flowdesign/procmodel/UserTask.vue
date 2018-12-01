<template>
  <g class="user-task" :transform="transform">
    <rect :width="width" :height="height"></rect>
    <slot></slot>
  </g>
</template>
<script>
import procmodel from '../mixins/procmodel'
export default {
  name: 'UserTask',
  mixins: [procmodel]
}
</script>
<style lang="scss" scoped>

</style>
