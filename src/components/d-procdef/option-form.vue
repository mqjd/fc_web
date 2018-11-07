<template>
  <el-form :model="config" label-width="80px">
    <el-form-item label="字段标签" v-if="config.hasOwnProperty('text')">
      <el-input v-model="config.text"></el-input>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  name: 'OptionForm',
  props: {
    config: {
      type: Object,
      required: true
    }
  }
}
</script>
<style scoped>
</style>
