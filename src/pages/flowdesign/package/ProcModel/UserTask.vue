<template>
  <div class="user-task" :id="options.id" :style="position">{{options.text}}</div>
</template>
<script>
import procmodel from '../../mixins/procmodel'
export default {
  mixins: [procmodel],
  name: 'UserTask',
  data () {
    return {
    }
  }
}
</script>
<style scoped>
.user-task{
  width: 80px;
  height: 60px;
  border-color: #9E9E9E;
  background: url(/static/svg/person.svg);
  background-size: 14px 14px;
  background-position: 2px 2px;
  background-repeat: no-repeat;
}
</style>
