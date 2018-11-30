<template>
  <g class="user-task">
    <rect :width="width" :height="height" :x="x" :y="y"></rect>
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
