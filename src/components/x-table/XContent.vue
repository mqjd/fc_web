<template>
  <div class="x-content">
    {{ text }}
  </div>
</template>
<script>
export default {
  name: 'x-content',
  props: {
    text: {
      type: String
    }
  }
}
</script>
<style lang="scss" scoped>
.x-content{
  display:block;
  overflow: hidden;
}
</style>
