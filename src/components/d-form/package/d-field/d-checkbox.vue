<template>
  <el-checkbox-group
    v-model="config.value"
    :disabled="disabled||config.disabled"
  >
    <el-checkbox v-for="(item,index) in config.data" :label="item.value" :key="index">{{item.text}}</el-checkbox>
  </el-checkbox-group>
</template>

<script>
const prop = ['type', 'text', 'allrow', 'cols', 'required', 'hidden', 'disabled', 'value', 'data']
export default {
  name: 'DCheckBox',
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
.el-checkbox-group{
  width: 100%;
}
</style>
