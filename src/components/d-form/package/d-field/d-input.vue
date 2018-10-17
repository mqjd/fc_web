<template>
  <el-input
    clearable
    :disabled="disabled||config.disabled"
    v-model="config.value"
    :placeholder="config.placeholder"
  >
  </el-input>
</template>

<script>
const prop = ['type', 'text', 'allrow', 'cols', 'required', 'hidden', 'disabled', 'value', 'placeholder']
export default {
  name: 'DInput',
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
