<template>
  <el-form :model="config" label-width="80px">
    <el-form-item label="字段标签" v-if="config.hasOwnProperty('text')">
      <el-input v-model="config.text"></el-input>
    </el-form-item>
    <el-form-item label="输入提示" v-if="config.hasOwnProperty('placeholder')">
      <el-input v-model="config.placeholder"></el-input>
    </el-form-item>
    <el-form-item label="字段标识" >
      <el-input v-model="config.fieldCode"></el-input>
    </el-form-item>
    <el-form-item label="占一整行" v-if="config.hasOwnProperty('allrow')">
      <el-switch
        style="display: block"
        v-model="config.allrow">
      </el-switch>
    </el-form-item>
    <el-form-item label="是否必填" v-if="config.hasOwnProperty('required')">
      <el-switch
        style="display: block"
        v-model="config.required">
      </el-switch>
    </el-form-item>
    <el-form-item label="是否隐藏" v-if="config.hasOwnProperty('hidden')">
      <el-switch
        style="display: block"
        v-model="config.hidden">
      </el-switch>
    </el-form-item>
    <el-form-item label="是否禁用" v-if="config.hasOwnProperty('disabled')">
      <el-switch
        style="display: block"
        v-model="config.disabled">
      </el-switch>
    </el-form-item>
    <el-form-item label="字段宽度" v-if="config.hasOwnProperty('cols')">
      <el-select v-model="config.cols" placeholder="请选择">
        <el-option :value="1" label="25%"></el-option>
        <el-option :value="2" label="50%"></el-option>
        <el-option :value="3" label="75%"></el-option>
        <el-option :value="4" label="100%"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="日期类型" v-if="config.hasOwnProperty('datetype')">
      <el-select v-model="config.datetype" placeholder="请选择">
        <el-option value="year" label="年"></el-option>
        <el-option value="month" label="月"></el-option>
        <el-option value="week" label="周"></el-option>
        <el-option value="date" label="日"></el-option>
        <el-option value="datetime" label="秒"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="日期类型" v-if="config.hasOwnProperty('daterange')">
      <el-select v-model="config.daterange" placeholder="请选择">
        <el-option value="daterange" label="日期"></el-option>
        <el-option value="datetimerange" label="时间"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item v-if="config.hasOwnProperty('numberPrecision')" label="小数位">
      <el-input-number v-model="config.numberPrecision" :min="0" :max="4"></el-input-number>
    </el-form-item>
    <el-form-item v-if="config.hasOwnProperty('max')" label="最大值">
      <el-input-number v-model="config.max" :precision="config.numberPrecision" :min="config.min"></el-input-number>
    </el-form-item>
    <el-form-item v-if="config.hasOwnProperty('min')" label="最小值">
      <el-input-number v-model="config.min" :precision="config.numberPrecision" :max="config.max"></el-input-number>
    </el-form-item>
    <option-data :config="config" v-if="config.hasOwnProperty('data')" :dataRemoved="this.dataRemoved"></option-data>
  </el-form>
</template>

<script>
import OptionData from './option-data.vue'
export default {
  name: 'OptionForm',
  components: {
    OptionData
  },
  props: {
    config: {
      type: Object,
      required: true
    },
    dataRemoved: {
      type: Function
    }
  }
}
</script>

<style scoped>
</style>
