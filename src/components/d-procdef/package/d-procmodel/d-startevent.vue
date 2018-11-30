<template>
  <div class="startevent" :id="options.id" :style="position">{{options.text}}</div>
</template>
<script>
import procmodel from '../../mixins/procmodel'
export default {
  mixins: [procmodel],
  name: 'd-startevent',
  data () {
    return {
    }
  }
}
</script>
<style scoped>
.startevent{
  width: 60px;
  height: 60px;
  border: none;
  border-radius: 50%;
  background-color: green;
}
</style>
