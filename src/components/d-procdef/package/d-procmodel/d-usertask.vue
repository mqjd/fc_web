<template>
  <div class="usertask" :style="position">{{this.options.text}}</div>
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

}
</style>
