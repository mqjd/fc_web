<template>
  <el-input-number
    v-model="config.value"
    label="请输入内容"
    :min="config.min"
    :max="config.max"
    :precision="config.numberPrecision"
    :disabled="disabled||config.disabled"
  >
  </el-input-number>
</template>

<script>
const prop = ['type', 'text', 'allrow', 'cols', 'required', 'hidden', 'disabled', 'value', 'numberPrecision', 'min', 'max']
export default {
  name: 'DNumber',
  props: {
    config: {
      type: Object,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  created: function () {
    this.clearProps()
  },
  methods: {
    clearProps () {
      for (var i in this.config) {
        if (prop.indexOf(i) === -1) {
          delete this.config[i]
        }
      }
    }
  }
}
</script>
<style scoped>
.el-input-number{
  width: 100%;
}
</style>
