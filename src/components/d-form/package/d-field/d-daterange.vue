<template>
  <el-date-picker
    :disabled="disabled||config.disabled"
    v-model="config.value"
    :type="config.daterange"
    range-separator="至"
    start-placeholder="开始"
    end-placeholder="结束"
    :value-format="format"
  >
  </el-date-picker>
</template>
<script>
const prop = ['type', 'text', 'allrow', 'cols', 'required', 'hidden', 'disabled', 'value', 'daterange']
const dateFormat = {
  daterange: 'yyyy-MM-dd',
  datetimerange: 'yyyy-MM-dd HH:mm:ss'
}
export default {
  name: 'DDateRange',
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
  },
  computed: {
    format () {
      return dateFormat[this.config.daterange]
    }
  }
}
</script>
<style scoped>
.el-date-editor{
  width: 100%;
}
</style>
