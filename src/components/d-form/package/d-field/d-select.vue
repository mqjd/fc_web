<template>
  <el-select
    filterable
    clearable
    v-model="config.value"
    :placeholder="config.placeholder"
    :disabled="disabled||config.disabled"
  >
    <el-option
      v-for="(item,index) in config.data"
      :key="index"
      :label="item.text"
      :value="item.value">
    </el-option>
  </el-select>
</template>
<script>
const prop = ['type', 'text', 'allrow', 'cols', 'required', 'hidden', 'disabled', 'value', 'data', 'placeholder']
export default {
  name: 'DSelect',
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
.el-select{
  width: 100%;
}
</style>
