<template>
  <div class="exclusive" :id="options.id" :style="position"><i class="fc-icon-close"></i></div>
</template>
<script>
import procmodel from '../../mixins/procmodel'
export default {
  mixins: [procmodel],
  name: 'd-exclusive',
  data () {
    return {
    }
  }
}
</script>
<style scoped>
i{
  font-size: 30px;
  transform:rotate(45deg);
  -ms-transform:rotate(45deg);
  -moz-transform:rotate(45deg);
  -webkit-transform:rotate(45deg);
  -o-transform:rotate(45deg);
}
.exclusive{
  transform:rotate(45deg);
  -ms-transform:rotate(45deg);
  -moz-transform:rotate(45deg);
  -webkit-transform:rotate(45deg);
  -o-transform:rotate(45deg);
}
</style>
