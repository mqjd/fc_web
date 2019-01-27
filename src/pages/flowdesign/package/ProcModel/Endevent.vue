<template>
  <div class="end-event" :id="options.id" :style="position"></div>
</template>
<script>
import procmodel from '../../mixins/procmodel'
export default {
  mixins: [procmodel],
  name: 'EndEvent',
  data () {
    return {
    }
  }
}
</script>
<style scoped>
.end-event{
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  border: 3px solid #212121;
}
</style>
