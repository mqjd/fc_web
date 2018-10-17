<template>
  <el-input
    resize = "none"
    :disabled="disabled||config.disabled"
    v-model="config.value"
    :placeholder="config.placeholder"
    type="textarea"
    :autosize="{ minRows: 2, maxRows: 4}"
  >
  </el-input>
</template>
<script>
const prop = ['type', 'text', 'allrow', 'cols', 'required', 'hidden', 'disabled', 'value', 'placeholder']
export default {
  name: 'DTextarea',
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
</style>
