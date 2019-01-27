<template>
  <div class="exclusive" :id="options.id" :style="position"></div>
</template>
<script>
import procmodel from '../../mixins/procmodel'
export default {
  mixins: [procmodel],
  name: 'Exclusive',
  data () {
    return {
    }
  }
}
</script>
<style scoped>
.exclusive{
  background: url(/static/svg/Exclusive.svg);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  border: none;
}
</style>
