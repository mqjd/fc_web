<template>
  <div class="startevent" :style="position"></div>
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
  border: none;
  border-radius: 50%;
  background-color: green;
}
</style>
