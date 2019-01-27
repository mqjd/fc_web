<template>
  <div class="start-event" :id="options.id" :style="position"></div>
</template>
<script>
import procmodel from '../../mixins/procmodel'
export default {
  mixins: [procmodel],
  name: 'StartEvent',
  data () {
    return {
    }
  }
}
</script>
<style scoped>
.start-event{
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  border: 1px solid #212121;
}
</style>
