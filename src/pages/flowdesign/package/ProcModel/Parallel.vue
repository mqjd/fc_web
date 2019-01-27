<template>
  <div class="parallel" :id="options.id" :style="position"></div>
</template>
<script>
import procmodel from '../../mixins/procmodel'
export default {
  mixins: [procmodel],
  name: 'Parallel',
  data () {
    return {
    }
  }
}
</script>
<style scoped>
.parallel{
  background: url(/static/svg/Parallel.svg);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  border: none;
}
</style>
