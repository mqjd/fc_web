<template>
  <div class="usertask" :id="options.id" :style="position">{{this.options.text}}</div>
</template>
<script>
import procmodel from '../../mixins/procmodel'
export default {
  mixins: [procmodel],
  name: 'd-usertask',
  data () {
    return {
    }
  }
}
</script>
<style scoped>
.usertask{
  width: 80px;
  height: 60px;
  background-color: #BDBDBD;
}
</style>
