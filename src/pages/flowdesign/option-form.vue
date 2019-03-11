<template>
  <el-form :model="config" label-width="80px" label-position="left">
    <el-form-item :label="label" v-if="config.hasOwnProperty('text')">
      <el-input v-model="config.text"></el-input>
    </el-form-item>
    <el-form-item :label="flagName" v-if="config.hasOwnProperty('flag')">
      <el-input v-model="config.flag"></el-input>
    </el-form-item>
    <el-form-item label="经办人" v-if="config.hasOwnProperty('assign')">
      <el-input v-model="config.assign"></el-input>
    </el-form-item>
    <el-form-item label="表单" v-if="config.hasOwnProperty('formKey')">
      <el-input v-model="config.formKey"></el-input>
    </el-form-item>
    <el-form-item label="条件" v-if="config.type==='connection'" class="expression-state">
      <el-radio-group v-model="config.state" size="small">
        <el-radio label="1">通过</el-radio>
        <el-radio label="0">驳回</el-radio>
        <el-radio label="2">高级</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-button v-if="config.type==='flow'" type="primary" class="deploy" @click="deploy">部署</el-button>
  </el-form>
</template>
<script>
const labelName = {
  'flow': '流程名称',
  'connection': '条件',
  'user-task': '环节名称'
}
const flagName = {
  'flow': '流程标识',
  'user-task': '环节标识'
}
export default {
  name: 'OptionForm',
  props: {
    config: {
      type: Object,
      required: true
    },
    deploy: {
      type: Function
    }
  },
  inject: ['instance'],
  data () {
    return {
      stateLabel: {
        '0': '驳回',
        '1': '通过',
        '2': ''
      },
      stateClass: {
        '0': 'reject',
        '1': 'pass',
        '2': ''
      }
    }
  },
  computed: {
    label () {
      const label_ = labelName[this.config.type] || '标识'
      return label_
    },
    flagName () {
      const label_ = flagName[this.config.type] || '标签'
      return label_
    },
    state_ () {
      return this.config.state
    }
  },
  watch: {
    state_: {
      deep: true,
      handler (newVal, oldVal) {
        if (this.config.type === 'connection' && newVal !== undefined) {
          if (!this.config.text || ['通过', '驳回'].includes(this.config.text)) {
            this.config.text = this.stateLabel[newVal]
          }
          const connection = this.instance.getConnections({
            scope: 'default',
            source: this.config.sourceId,
            target: this.config.targetId
          }).filter(item => item.id === this.config.id)
          const overlay = connection[0].getOverlay('label')
          overlay.removeClass(this.stateClass['0'])
          overlay.removeClass(this.stateClass['1'])
          if (newVal !== '2') {
            overlay.addClass(this.stateClass[newVal])
          }
        }
      }
    }
  }
}
</script>
<style scoped>
.deploy{
  position: absolute;
  bottom: 20px;
  width: 50%;
  right: 25%;
  margin: auto;
}
</style>
