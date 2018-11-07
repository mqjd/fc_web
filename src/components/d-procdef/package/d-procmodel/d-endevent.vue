<template>
  <div class="endevent" :style="position"></div>
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
  border: none;
  border-radius: 50%;
  background-color: red;
}
</style>
