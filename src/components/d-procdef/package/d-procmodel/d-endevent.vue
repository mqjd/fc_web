<template>
  <div class="endevent" :id="options.id" :style="position">{{options.text}}</div>
</template>
<script>
import procmodel from '../../mixins/procmodel'
export default {
  mixins: [procmodel],
  name: 'd-endevent',
  data () {
    return {
    }
  }
}
</script>
<style scoped>
.endevent{
  width: 60px;
  height: 60px;
  border: none;
  border-radius: 50%;
  background-color: red;
}
</style>
