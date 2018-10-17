<template>
  <el-radio-group
    v-model="config.value"
    :disabled="disabled||config.disabled"
  >
    <el-radio v-for="(item,index) in config.data" :label="item.value" :key="index">{{item.text}}</el-radio>
  </el-radio-group>
</template>
<script>
const prop = ['type', 'text', 'allrow', 'cols', 'required', 'hidden', 'disabled', 'value', 'data', 'placeholder']
export default {
  name: 'DRadio',
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
.el-radio-group{
  width: 100%;
}
</style>
