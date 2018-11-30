<template>
  <el-form :model="config" label-width="80px">
    <el-form-item label="标签" v-if="config.hasOwnProperty('text')">
      <el-input v-model="config.text"></el-input>
    </el-form-item>
    <el-form-item label="经办人" v-if="config.hasOwnProperty('assign')">
      <el-input v-model="config.assign"></el-input>
    </el-form-item>
    <el-form-item label="表单" v-if="config.hasOwnProperty('formKey')">
      <el-input v-model="config.formKey"></el-input>
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
