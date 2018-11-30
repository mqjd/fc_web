<template>
  <div class="parallel" :id="options.id" :style="position"><i class="fc-icon-close"></i></div>
</template>
<script>
import procmodel from '../../mixins/procmodel'
export default {
  mixins: [procmodel],
  name: 'd-parallel',
  data () {
    return {
    }
  }
}
</script>
<style scoped>
i{
  font-size: 25px;
}
.parallel{
  transform:rotate(45deg);
  -ms-transform:rotate(45deg);
  -moz-transform:rotate(45deg);
  -webkit-transform:rotate(45deg);
  -o-transform:rotate(45deg);
}
</style>
