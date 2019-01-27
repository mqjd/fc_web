<template>
  <div class="mavon-editor">
    <mavon-editor style="height: 100%" placeholder=" "></mavon-editor>
  </div>
</template>
<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
export default {
  name: 'm-form',
  components: {
    'mavon-editor': mavonEditor
  }
}
</script>
<style lang="scss" scoped>
.mavon-editor{
  height: 100%;
  width: 100%;
}
</style>
